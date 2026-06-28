"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { addProductToCart } from "@/lib/actions/product.action";

export const useAddToCart = (productid: string) => {
  // Translations
  const t = useTranslations();
  const queryClient = useQueryClient();

  // Mutation
  const mutation = useMutation({
    mutationFn: async (quantity: number) => {
      const response = await addProductToCart(productid, quantity);
      return response;
    },
    
    // Handling success
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
      } else {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success(data.message);
      }
    },
    
    // Handling error
    onError: (error) => {
      toast.error(t("failed-to-add-product-to-cart"));
      console.error(error);
    },
  });

  return mutation;
};
