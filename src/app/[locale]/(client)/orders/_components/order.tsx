"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";

type OrdersPropes = {
  orders: Order[];
};

export default function Orders({ orders }: OrdersPropes) {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {orders.length === 0 ? (
        <div className="space-y-4 rounded-lg border border-custom-rose-900 px-4 py-14 text-center text-blue-gray-800 sm:py-20">
          <p className="text-sm">{t("you-do-not-have-an-order")}</p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="space-y-4 rounded-lg border border-custom-rose-900 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              {/* Order number */}
              <h2 className="break-words text-base font-semibold text-blue-gray-800 sm:text-lg">
                {t("order-number")}: {order.orderNumber}
              </h2>

              {/* Order date */}
              <div className="text-sm text-blue-gray-500">
                {t("order-date")}:{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>

            {/* Products */}
            <div className="space-y-3 sm:hidden">
              <span className="block text-sm font-medium text-custom-rose-900">
                {t("order-state")}: {order.state}
              </span>

              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex cursor-pointer gap-3 rounded-xl border border-custom-rose-100 p-3"
                  onClick={() => router.push(`/products/${item.product._id}`)}
                >
                  {/* Product image */}
                  <Image
                    src={item.product.imgCover || "/assets/images/coming-soon.png"}
                    alt={item.product.title || "Product image"}
                    width={80}
                    height={80}
                    className="h-20 w-20 shrink-0 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1 space-y-1 text-sm">
                    {/* Product title */}
                    <span className="line-clamp-2 font-medium text-blue-gray-800">
                      {(item.product.title ?? "").split(" ").splice(0, 3).join(" ")}
                    </span>

                    {/* Order items price */}
                    <span className="block text-custom-rose-900">
                      {t("price")}: ${item.price}
                    </span>

                    {/* Orderitems discount */}
                    <span className="block text-custom-rose-900">
                      {t("discount")}: ${item.product.discount}
                    </span>

                    {/* Orderitems quantity */}
                    <span className="block text-custom-rose-900">
                      {t("quantity")}: {item.quantity}
                    </span>
                  </div>
                </div>
              ))}

              {/* Order total price */}
              <span className="block rounded-lg border border-custom-rose-900 p-2 text-center font-semibold text-custom-rose-900">
                {t("total-price")}: ${order.totalPrice}
              </span>
            </div>

            <div className="hidden sm:flex">
              <div className="flex flex-col mt-4">
                {order.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => router.push(`/products/${item.product._id}`)}
                  >
                    {/* Product image */}
                    <Image
                      src={item.product.imgCover || "/assets/images/coming-soon.png"}
                      alt={item.product.title || "Product image"}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />

                    {/* Product title */}
                    <span className="font-medium text-blue-gray-800">
                      {(item.product.title ?? "").split(" ").splice(0, 3).join(" ")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-end ml-auto gap-4 rtl:ml-0 rtl:mr-auto">
                {/* Order status */}
                <span className="text-custom-rose-900">
                  {t("order-state")}: {order.state}
                </span>

                {/* Map for order items */}
                {order.orderItems.map((item) => (
                  <div key={item._id} className="flex flex-col items-end gap-2">
                    {/* Order items price */}
                    <span className="text-custom-rose-900">
                      {t("price")}: ${item.price}
                    </span>

                    {/* Orderitems discount */}
                    <span className="text-custom-rose-900">
                      {t("discount")}: ${item.product.discount}
                    </span>

                    {/* Orderitems quantity */}
                    <span className="text-custom-rose-900">
                      {t("quantity")}: {item.quantity}
                    </span>
                  </div>
                ))}

                {/* Order total price */}
                <span className="border border-custom-rose-900 font-semibold text-custom-rose-900 p-2 rounded-lg">
                  {t("total-price")}: ${order.totalPrice}
                </span>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        {/* Button */}
        <Link
          href={`/`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-custom-rose-900 px-5 py-3 text-white sm:w-fit"
        >
          {t("continue-shopping")}
        </Link>

        {/* Button */}
        <Link
          href={`/cart`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-custom-rose-900 px-8 py-3 text-white sm:w-fit sm:py-2"
        >
          {t("view-cart")}
        </Link>
      </div>
    </div>
  );
}
