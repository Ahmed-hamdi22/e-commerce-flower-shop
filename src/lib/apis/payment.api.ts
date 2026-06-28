"use server";
import { headers } from "next/headers";
import getToken from "@/lib/utils/get-token";

type PaymentActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; message: string };

function paymentError<T = unknown>(message = "Please login first"): PaymentActionResult<T> {
  return { success: false, message };
}

async function getAuthenticatedToken() {
  return getToken();
}

function getAppUrl() {
  const fallbackUrl = "https://e-commerce-flower-shop-ulqj.vercel.app";
  const configuredUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
  const requestOrigin = headers().get("origin");
  const appUrl = requestOrigin || configuredUrl || fallbackUrl;

  if (process.env.NODE_ENV === "production" && appUrl.includes("localhost")) {
    return fallbackUrl;
  }

  return appUrl.replace(/\/$/, "");
}

function getPaymentRedirectUrls(locale: string) {
  const safeLocale = locale === "ar" ? "ar" : "en";
  const appUrl = getAppUrl();

  return {
    success_url: `${appUrl}/${safeLocale}/allOrders`,
    cancel_url: `${appUrl}/${safeLocale}/checkout`,
  };
}
// checkoutWithStripe

export async function checkoutWithStripe(
  payload: { shippingAddress: ShippingAddress; locale: string },
): Promise<PaymentActionResult<{ url: string }>> {
  const token = await getAuthenticatedToken();

  if (!token || !process.env.API) {
    return paymentError();
  }

  try {
    const res = await fetch(`${process.env.API}/orders/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      body: JSON.stringify({
        shippingAddress: payload.shippingAddress,
        ...getPaymentRedirectUrls(payload.locale),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return paymentError(getErrorMessage(data, "Failed to create order"));
    }

    // session.url
    if (!data?.session?.url) {
      return paymentError("Payment gateway URL not provided by server");
    }

    return { success: true, data: { url: data.session.url } };
  } catch {
    return paymentError("Failed to create order");
  }
}

// CashOrder
function getErrorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== "object") return fallback;

  const errorPayload = payload as {
    error?: string;
    message?: string;
    errors?: string[] | string;
  };

  if (typeof errorPayload.error === "string") return errorPayload.error;
  if (typeof errorPayload.message === "string") return errorPayload.message;
  if (typeof errorPayload.errors === "string") return errorPayload.errors;
  if (Array.isArray(errorPayload.errors)) return errorPayload.errors.join(", ");

  return fallback;
}

function hasCreatedOrder(payload: unknown) {
  if (!payload || typeof payload !== "object") return false;

  const responsePayload = payload as {
    order?: unknown;
    data?: unknown;
  };

  const dataPayload = responsePayload.data;
  const possibleOrder =
    responsePayload.order ||
    (dataPayload && typeof dataPayload === "object" && "order" in dataPayload
      ? (dataPayload as { order?: unknown }).order
      : dataPayload);

  if (!possibleOrder || typeof possibleOrder !== "object") return false;

  const order = possibleOrder as {
    _id?: unknown;
    id?: unknown;
    orderNumber?: unknown;
  };

  return Boolean(order._id || order.id || order.orderNumber);
}

export async function createCashOrder(
  orderPayload: { shippingAddress: ShippingAddress; locale: string },
): Promise<PaymentActionResult<unknown>> {
  const token = await getAuthenticatedToken();

  if (!token || !process.env.API) {
    return paymentError();
  }

  try {
    const res = await fetch(process.env.API + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      body: JSON.stringify({
        shippingAddress: orderPayload.shippingAddress,
      }),
    });

    const payload = await res.json();

    if (!res.ok) {
      return paymentError(getErrorMessage(payload, "Failed to create order"));
    }

    if (payload && typeof payload === "object" && "error" in payload) {
      return paymentError(getErrorMessage(payload, "Failed to create order"));
    }

    if (!hasCreatedOrder(payload)) {
      return paymentError("Order was not created. Please try again.");
    }

    return { success: true, data: payload };
  } catch {
    return paymentError("Failed to create order");
  }
}
