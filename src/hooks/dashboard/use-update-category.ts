"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { updatecategory } from "@/lib/apis/dashboard/category.api";

type UpdateCategoryParams = {
  id: string;
  data: FormData;
};

export function UseUpdateCategory() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Mutation
  const mutation = useMutation({
    mutationFn: ({ id, data }: UpdateCategoryParams) => updatecategory(id, data),
    onSuccess: () => {
      toast.success(t("category-updated"));
      router.push("/dashboard/categories");
    },
    onError: (error: Error) => {
      toast.error(error.message || t("category-update-failed"));
    },
  });

  return {
    updateCategory: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
}
