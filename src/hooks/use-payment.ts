"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { checkoutWithStripe, createCashOrder } from "@/lib/apis/payment.api";

const LOCAL_ALL_ORDERS_URL = ["http://localhost:3000", "allOrders"].join("/");
const FALLBACK_APP_URL = "https://e-commerce-flower-shop-ulqj.vercel.app";

function getAppUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    FALLBACK_APP_URL
  ).replace(/\/$/, "");
}

function normalizePaymentUrl(paymentUrl: string, locale: string) {
  const safeLocale = locale === "ar" ? "ar" : "en";
  const allOrdersUrl = `${getAppUrl()}/${safeLocale}/allOrders`;

  return paymentUrl
    .replaceAll(LOCAL_ALL_ORDERS_URL, allOrdersUrl)
    .replaceAll(encodeURIComponent(LOCAL_ALL_ORDERS_URL), encodeURIComponent(allOrdersUrl));
}

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

      router.push(normalizePaymentUrl(result.data.url, locale));
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
    checkoutWithStripe: stripeMutation.mutate,
    createCashOrder: cashMutation.mutate,
  };
}
