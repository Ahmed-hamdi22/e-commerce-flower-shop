"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { checkoutWithStripe, createCashOrder } from "@/lib/apis/payment.api";

export function usePayment() {
  // Translations
  const t = useTranslations();

  // Navgation
  const router = useRouter();

  // Stripe mutation
  const stripeMutation = useMutation({
    mutationFn: checkoutWithStripe,
    onSuccess: (url: string) => {
      router.push(url);
    },
    onError: (error) => {
      toast.error(error.message || t("payment-failed"));
    },
  });

  // Cash mutation
  const cashMutation = useMutation({
    mutationFn: createCashOrder,
    onSuccess: () => {
      toast.success(t("order-placed-successfully"));
      router.replace("/allOrders");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : t("payment-failed"));
    },
  });

  return {
    checkoutWithStripe: stripeMutation.mutate,
    createCashOrder: cashMutation.mutate,
  };
}
