"use client";

import { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RiVisaLine } from "react-icons/ri";
import ArrowLeft from "@/components/common/arrow-long-left";
import ArrowRight from "@/components/common/arrow-right";
import { GiTakeMyMoney } from "react-icons/gi";
import { cn } from "@/lib/utils";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { usePayment } from "@/hooks/use-payment";

//  Type
type PaymentFormProps = {
  shippingAddress: ShippingAddress;
};

export function PaymentForm({ shippingAddress }: PaymentFormProps) {
  // Translation
  const t = useTranslations();

  // Navgation
  const router = useRouter();

  // State
  const [paymentType, setPaymentType] = useState<"cash" | "card">("cash");

  // HandelSubmit
  const { checkoutWithStripe, createCashOrder } = usePayment();
  const onSubmit = () => {
    if (paymentType === "card") {
      checkoutWithStripe(shippingAddress);
    } else {
      createCashOrder(shippingAddress);
    }
  };

  return (
    <AccordionItem value="paymentform">
      <AccordionTrigger
        className="text-custom-rose-900 font-inter fw-600 text-base
          leading-[19.2px] capitalize border rounded-[5px] py-4 px-5"
      >
        {t("your-payment-info")}
      </AccordionTrigger>
      <AccordionContent>
        {/* Card */}
        <Card className="p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-3 mb-6 sm:flex sm:gap-4">
            <button
              type="button"
              onClick={() => setPaymentType("cash")}
              className={cn(
                "flex h-[112px] w-full flex-col items-center justify-center gap-1 border-2 rounded-[20px] p-3 sm:h-[125px] sm:w-[129px] sm:p-4",
                paymentType === "cash"
                  ? "border-custom-rose-500 text-custom-rose-900 bg-custom-rose-50"
                  : "border-gray-300 text-gray-500 hover:border-gray-400",
              )}
            >
              {/* Icon Cash */}
              <GiTakeMyMoney className="w-8 h-8 text-mint-green-900" />
              <span className="text-sm font-medium">{t("cash")}</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentType("card")}
              className={cn(
                "flex h-[112px] w-full flex-col items-center justify-center gap-1 border-2 rounded-[20px] p-3 sm:h-[125px] sm:w-[129px] sm:p-4",
                paymentType === "card"
                  ? "border-custom-rose-500 text-custom-rose-900 bg-custom-rose-50"
                  : "border-gray-300 text-gray-500 hover:border-gray-400",
              )}
            >
              {/* Icon Visa */}
              <RiVisaLine className="w-8 h-8 text-[#051244]" />
              <span className="text-sm font-medium">{t("card")}</span>
            </button>
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:justify-between">
            <Button className="w-full bg-custom-rose-900 rounded-xl sm:w-auto" onClick={() => router.back()}>
              <ArrowLeft /> {t("previous")}
            </Button>

            <Button
              className="w-full bg-custom-rose-900 hover:bg-custom-rose-700 rounded-xl sm:w-auto"
              onClick={onSubmit}
            >
              {t("pay-now")} <ArrowRight />
            </Button>
          </div>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
}
