"use server";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { AUTH_COOKIE } from "@/lib/constants/auth.constant";
async function getAuthenticatedToken() {
  const tokenCookie = cookies().get(AUTH_COOKIE)?.value;
  if (!tokenCookie) {
    throw new Error("Authentication required");
  }
  const token = await decode({
    token: tokenCookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  if (!token?.token) {
    throw new Error("Invalid authentication token");
  }
  return token.token;
}
// checkoutWithStripe

export async function checkoutWithStripe(shippingAddress: ShippingAddress) {
  const token = await getAuthenticatedToken();
  const res = await fetch(`${process.env.API}/orders/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify({
      shippingAddress,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || "Failed to create order");
  }

  const data = await res.json();

  // session.url
  if (!data?.session?.url) {
    throw new Error("Payment gateway URL not provided by server");
  }

  return data.session.url;
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

export async function createCashOrder(shippingAddress: ShippingAddress) {
  const token = await getAuthenticatedToken();
  const res = await fetch(process.env.API + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify({
      shippingAddress,
    }),
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(getErrorMessage(payload, "Failed to create order"));
  }

  if (payload && typeof payload === "object" && "error" in payload) {
    throw new Error(getErrorMessage(payload, "Failed to create order"));
  }

  if (!hasCreatedOrder(payload)) {
    throw new Error("Order was not created. Please try again.");
  }

  return payload;
}
