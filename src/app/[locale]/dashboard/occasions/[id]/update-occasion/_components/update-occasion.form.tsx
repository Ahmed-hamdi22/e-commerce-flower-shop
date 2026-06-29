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
import useUpdateOccasion from "@/hooks/occasion/use-update-occasion";
import Heading from "@/components/common/heading";
import { GalleryCarouselDialog } from "@/components/features/dashboard/dialog/gallery-dialog";
import { useState } from "react";
import { GoImage } from "react-icons/go";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export default function UpdateOccasionForm({
  initialData,
  occasionId,
}: {
  initialData?: OccasionUpdateFields;
  occasionId: string;
}) {
  // Translation
  const t = useTranslations();

  // Router
  const router = useRouter();

  // Mutation
  const { isPending, updateOccasion } = useUpdateOccasion();

  // State
  const [galleryOpen, setGalleryOpen] = useState(false);

  // Form & Validation
  const Schema = z.object({
    name: z
      .string({ required_error: t("name-is-required") })
      .min(2, t("name-must-be-at-least-2-characters-0")),
  });
  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      name: initialData?.name,
    },
    resolver: zodResolver(Schema),
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (values) => {
    const fields: OccasionUpdateFields = {
      name: values.name,
    };

    if (values.name !== initialData?.name) {
      fields.name = values.name;
    }
    updateOccasion(
      { fields, occasionId },
      {
        onSuccess: () => {
          router.push("/dashboard/occasions");
        },
      },
    );
  };

  return (
    <div>
      {/* Title */}
      <Heading name={initialData?.name || ""}>{t("update-occasion")}:</Heading>

      <div className="bg-white p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full lg:w-[746px]">
                  {/* Label */}
                  <FormLabel htmlFor="name">
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

                  <div className="mt-2 flex justify-end ">
                    {/* Button */}
                    <button
                      type="button"
                      onClick={() => setGalleryOpen(true)}
                      className="text-blue-600 text-sm border border-gray-300 p-2 rounded-lg flex items-center gap-x-1 mt-2"
                    >
                      <GoImage className="w-5 h-5" />
                      {t("view-occasion-image")}
                    </button>
                  </div>

                  {/* Renders the image gallery dialog */}
                  <GalleryCarouselDialog
                    isOpen={galleryOpen}
                    onClose={() => setGalleryOpen(false)}
                    images={initialData?.image ? [initialData.image] : []}
                  />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <div className="pt-28">
              <Button
                disabled={isPending || !form.formState.isDirty}
                type="submit"
                className="h-[41px] w-full rounded-lg bg-custom-rose-900 hover:bg-custom-rose-900 lg:w-[746px]"
              >
                {isPending ? t("updating-0") : t("update-occasion")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
