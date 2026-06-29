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
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import Heading from "@/components/common/heading";
import useAddOccasion from "@/hooks/occasion/use-add-occasion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useRouter } from "@/i18n/routing";
import { FileUpload, FileUploadHandle } from "./file-upload";

export default function AddOccasionForm() {
  // Translation
  const t = useTranslations();

  // Router
  const router = useRouter();

  // Mutation
  const { isPending, AddOccasion } = useAddOccasion();

  // Form & Validation
  const schema = z.object({
    name: z
      .string({ required_error: t("name-is-required") })
      .min(2, t("name-must-be-at-least-2-characters-0")),
    image: z
      .instanceof(File, { message: t("image-is-required") })
      .refine((file) => file.size <= 5 * 1024 * 1024, t("image-must-be-less-than-5mb"))
      .refine(
        (file) => ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type),
        t("only-jpeg-png-jpg-and-gif-are-allowed"),
      ),
  });
  type Inputs = z.infer<typeof schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      image: undefined,
    },
    resolver: zodResolver(schema),
  });

  const fileUploadRef = useRef<FileUploadHandle>(null);

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);

    AddOccasion(formData, {
      onSuccess: () => {
        form.reset();
        fileUploadRef.current?.reset();
        router.push("/dashboard/occasions");
      },
    });
  };

  return (
    <div>
      {/* Title */}
      <Heading>{t("add-a-new-occasion-0")}</Heading>

      <div className="bg-white p-4 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full lg:w-[746px]">
                  {/* Label */}
                  <FormLabel>
                    {t("name")} <span className="text-red-500">*</span>
                  </FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter occasion name"
                      {...field}
                      className="h-[49px] w-full px-4 rounded-lg border border-input"
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="image">
                    {t("occasion-image")} <span className="text-red-500">*</span>
                  </FormLabel>

                  {/* Input */}
                  <FormControl>
                    <FileUpload
                      ref={fileUploadRef}
                      onFileSelect={(file) => {
                        field.onChange(file);
                      }}
                      accept="image/*"
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <div className="pt-10 lg:pt-28">
              <Button
                disabled={isPending}
                type="submit"
                className="h-[41px] w-full rounded-lg bg-custom-rose-900 hover:bg-custom-rose-900 lg:w-[746px]"
              >
                {isPending ? t("adding") : t("add-occasion-0")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
