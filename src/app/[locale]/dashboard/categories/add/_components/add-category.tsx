"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileUp, Loader } from "lucide-react";
import { UseAddCategory } from "@/hooks/dashboard/use-add-category";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Heading from "@/components/common/header";

export default function AddCategory() {
  //  Translations
  const t = useTranslations();

  // Validation schema
  const Schema = z.object({
    name: z.string({ required_error: t("name-min-length") }).min(2, {
      message: t("name-min-length"),
    }),
    image: z
      .instanceof(File, { message: t("image-required") })
      .refine((file) => file.size > 0, { message: t("image-required") }),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(Schema),
  });

  // Mutation
  const { addCategory, isLoading } = UseAddCategory();

  // Function
  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);
    await addCategory(formData);
  };

  return (
    <>
      {/* Heading */}
      <Heading>{t("add-category")}</Heading>

      <div className="w-full rounded-lg bg-white p-4 shadow-sm sm:p-6">
        {/* Form add category*/}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Category name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-6">
                  {/* Label */}
                  <FormLabel className="captalize font-medium text-sm font-inter">
                    {t("category-name")}
                    <span className="text-custom-rose-900 ps-1">*</span>
                  </FormLabel>

                  <FormControl>
                    {/* Input */}
                    <Input
                      placeholder={t("category-name-placeholder")}
                      {...field}
                      type="text"
                      className="w-full rounded-lg border-2 border-blue-gray-100 lg:w-4/5"
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image field */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="captalize font-medium text-sm font-inter h-12">
                    {t("category-image")}
                    <span className="text-custom-rose-900 ps-1">*</span>
                  </FormLabel>

                  <FormControl>
                    <div className="relative w-full lg:w-4/5">
                      {/* Label */}
                      <FormLabel
                        htmlFor="image-upload"
                        className="flex items-center justify-between cursor-pointer border h-12 border-gray-300 rounded-md px-4 py-2"
                      >
                        {/* Show selected file name */}
                        <div className="flex-1 min-w-0 text-left">
                          {field.value ? (
                            <p className="text-sm text-gray-600 truncate">
                              {t("selected-file")}: {field.value.name}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-400 truncate sr-only">
                              {t("no-file-selected")}
                            </p>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-sm">
                          {/* File icon */}
                          <FileUp className="w-4 h-4 text-custom-gray" />

                          {/* Upload image */}
                          <span className="text-custom-rose-900  font-normal text-sm">
                            {t("upload-image")}
                          </span>
                        </span>
                      </FormLabel>
                      {/* Input */}
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </div>
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <Button
              disabled={!form.formState.isValid}
              type="submit"
              className="mt-10 h-10 w-full rounded-lg bg-custom-rose-900 text-sm font-semibold capitalize text-white lg:mt-16 lg:w-4/5"
            >
              {isLoading ? <Loader className="text-center" /> : t("add-category")}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
