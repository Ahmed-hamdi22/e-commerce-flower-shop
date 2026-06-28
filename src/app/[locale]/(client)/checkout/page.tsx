import React from "react";
import CheckoutContent from "./_components";
import { fetchCartOrders } from "@/lib/apis/order.api";
import { redirect } from "next/navigation";

type CheckoutPageProps = {
  params: {
    locale: string;
  };
};

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const locale = params.locale === "ar" ? "ar" : "en";
  const payload = await fetchCartOrders();

  if (!payload?.cart) {
    redirect(`/${locale}`);
  }

  const { cart } = payload;

  // Redirect to homepage if the cart is empty
  if (cart.cartItems.length === 0) {
    redirect(`/${locale}`);
  }
  return <CheckoutContent cart={cart} />;
}
