"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { addcategory } from "@/lib/apis/dashboard/category.api";
import { useRouter } from "@/i18n/routing";

export function UseAddCategory() {
  // Translations
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Mutation for adding category
  const mutation = useMutation({
    mutationFn: addcategory,
    onSuccess: () => {
      toast.success(t("category-added-successfully"));
      router.push("/dashboard/categories");
    },
    onError: (error: Error) => {
      toast.error(error.message || t("category-add-failed"));
    },
  });

  return {
    addCategory: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
}
