"use client";

import { removeCartItem } from "@/lib/actions/cart.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useRemoveCartItem() {
  // Translation
  const t = useTranslations();
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ productId }: { productId: string }) => {
      const response = await removeCartItem({ productId });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(t("delete-successfully"));
    },
    onError: () => {
      toast.error(t("delete-failed"));
    },
  });

  return { isPending, error, removeCartItem: mutate };
}
