"use client";

import ArrowRight from "@/components/common/arrow-long-right";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFormatter, useTranslations } from "next-intl";

// Type
type CartProps = {
  cart: Cart;
};

export default function CartSummary({ cart }: CartProps) {
  // Translations
  const t = useTranslations();

  // Formatter
  const formatter = useFormatter();

  //  Calculating values
  const subtotal = cart.totalPrice;
  const total = cart.totalPriceAfterDiscount;
  const discount = subtotal - total;

  return (
    <div className="w-[304px] h-80 py-2 px-4 bg-main-color rounded-2xl shadow-sm">
      <div key={cart._id}>
        {/* Cart Card */}
        <Card>
          <CardContent className="p-6">
            {/* Cart Header */}
            <div className="mb-6">
              <h5 className="mb-3 text-blue-gray-900 font-bold">{t("cart-summary")}</h5>
            </div>

            {/* Cart Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-2 text-sm">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-blue-gray-900 font-bold">{t("subtotal")}</span>
                  <span className="text-custom-gray">
                    {formatter.number(subtotal, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>

                {/* Discount */}
                <div className="flex justify-between">
                  <span className="text-blue-gray-900 font-bold">{t("discount")}</span>
                  <span className="text-red-600">
                    -
                    {formatter.number(discount, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between">
                  <span className="text-blue-gray-900 font-bold">{t("shipping")}</span>
                  <span className="text-custom-gray">{t("free")}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-blue-gray-900 font-bold">{t("total")}</span>
                  <span className="text-custom-rose-900 font-bold">
                    {formatter.number(total, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Button */}
        <Button className="bg-custom-rose-900 rounded-xl mt-4">
          {t("checkout-now")}
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
