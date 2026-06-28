"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { addProducts } from "@/lib/apis/dashboard/product.api";

export function useAddProduct() {
  // Translations
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Mutation
  const mutation = useMutation({
    mutationFn: addProducts,
    onSuccess: () => {
      toast.success(t("product-added-successfully"));
      router.push("/dashboard/products");
    },
    onError: (error: Error) => {
      toast.error(error.message || t("product-added-failed"));
    },
  });

  return {
    addProducts: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
}
