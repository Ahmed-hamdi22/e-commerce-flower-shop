"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { updateProduct } from "@/lib/apis/dashboard/product.api";

type UpdateProductParams = {
  id: string;
  data: FormData;
};

export function useUpdateProduct() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Mutation
  const mutation = useMutation({
    mutationFn: ({ id, data }: UpdateProductParams) => updateProduct(id, data),
    onSuccess: () => {
      toast.success(t("product-updated"));
      router.push("/dashboard/products");
    },
    onError: (error: Error) => {
      toast.error(error.message || t("product-update-failed"));
    },
  });

  return {
    updateProduct: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
}
