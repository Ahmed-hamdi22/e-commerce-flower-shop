"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { checkoutWithStripe, createCashOrder } from "@/lib/apis/payment.api";
import { useLocale } from "next-intl";

export function usePayment() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Navgation
  const router = useRouter();

  // Stripe mutation
  const stripeMutation = useMutation({
    mutationFn: checkoutWithStripe,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message || t("payment-failed"));
        return;
      }

      router.push(result.data.url);
    },
    onError: (error) => {
      toast.error(error.message || t("payment-failed"));
    },
  });

  // Cash mutation
  const cashMutation = useMutation({
    mutationFn: createCashOrder,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message || t("payment-failed"));
        return;
      }

      toast.success(t("order-placed-successfully"));
      router.replace("/allOrders");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : t("payment-failed"));
    },
  });

  return {
    checkoutWithStripe: (shippingAddress: ShippingAddress) =>
      stripeMutation.mutate({ shippingAddress, locale }),
    createCashOrder: (shippingAddress: ShippingAddress) =>
      cashMutation.mutate({ shippingAddress, locale }),
  };
}
