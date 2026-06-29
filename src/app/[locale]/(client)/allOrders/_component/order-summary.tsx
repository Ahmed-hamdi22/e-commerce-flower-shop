"use client";

import ArrowRight from "@/components/common/arrow-long-right";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "@/i18n/routing";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";

// Type

type OrderDetailsProps = {
  order: Order | null;
};

export default function OrderDetails({ order }: OrderDetailsProps) {
  // Translations
  const t = useTranslations();

  // Formatter
  const formatter = useFormatter();

  // Navigation
  const router = useRouter();

  const orderItems = Array.isArray(order?.orderItems) ? order.orderItems : [];

  // Calculate subtotal
  const subtotal = orderItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );

  const discount = subtotal - Number(order?.totalPrice || 0);

  const total = subtotal;

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <div className="rounded-2xl border border-custom-rose-900 bg-main-color p-6 text-center text-blue-gray-900">
          {t("you-do-not-have-an-order")}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl py-2">
      {/* Order Card */}
      <div key={order._id} className="mb-6 rounded-2xl border-2 border-custom-rose-900 p-2 sm:p-4">
        <Card className="bg-main-color rounded-2xl shadow-sm">
          <CardContent className="p-4 sm:p-6">
            {/* Order Header */}
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              {/* Date order and Number */}
              <div className="min-w-0">
                <p className="text-sm text-blue-gray-500">
                  {formatter.dateTime(new Date(order.createdAt), {
                    dateStyle: "medium",
                })}
                </p>
                {order.orderNumber && (
                  <p className="mt-1 break-words text-sm text-blue-gray-500">
                    {t("order-number")}: {order.orderNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h5 className="font-bold mb-3 text-blue-gray-900">{t("order-items")}</h5>
              <div className="space-y-4">
                {orderItems.map((item) => {
                  const itemTotal = Number(item.price) * Number(item.quantity);

                  return (
                    <div
                      key={item._id}
                      className="flex cursor-pointer flex-col gap-3 py-3 sm:flex-row sm:items-start sm:gap-4"
                    >
                      <div className="flex min-w-0 gap-3 sm:flex-1 sm:gap-4">
                        {/* Image */}
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={item.product.imgCover || "/assets/images/coming-soon.png"}
                            alt={item.product.title || "Product Image"}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        {/* Quantity */}
                        <div className="min-w-0 flex-1 space-y-1">
                          <h6 className="line-clamp-2 font-medium text-gray-900">
                            {item.product?.title || "Unknown Product"}
                          </h6>
                          <p className="text-sm text-gray-500">
                            {t("quantity")}: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatter.number(Number(item.price), {
                              style: "currency",
                              currency: "USD",
                            })}
                          </p>
                        </div>
                      </div>
                      {/* Item total */}
                      <div className="text-left sm:text-right">
                        <span className="text-sm font-medium">
                          {formatter.number(itemTotal, {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart summary	 */}
            <div className="border-t border-gray-200 pt-4">
              <h5 className="mb-3 text-blue-gray-900 font-bold">{t("cart-summary")}</h5>
              <div className="space-y-2 text-sm">
                {/* Subtotal */}
                <div className="flex justify-between gap-3">
                  <span className="text-blue-gray-900 font-bold">{t("subtotal")}</span>
                  <span className="text-custom-gray">
                    {formatter.number(subtotal, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>

                {/* Discount */}
                <div className="mb-2 flex justify-between gap-3">
                  <span className="text-blue-gray-900 font-bold">{t("discount")}</span>
                  <span className="text-red-600 font-semibold">
                    {discount > 0 ? "-" : ""}
                    {formatter.number(discount, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between gap-3">
                  <span className="text-blue-gray-900 font-bold">{t("shipping")}</span>
                  <span className="text-custom-gray">{t("free")}</span>
                </div>

                {/* 	Total */}
                <div className="flex justify-between gap-3 border-t border-gray-200 pt-2">
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
      </div>

      {/* Button Continue Shopping */}
      <div className="w-full">
        <Button
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-custom-rose-900 sm:w-auto"
          onClick={() => router.push("/")}
        >
          {t("back-home")}
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
