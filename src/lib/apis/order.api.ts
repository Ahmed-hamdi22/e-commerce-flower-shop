"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { AUTH_COOKIE } from "@/lib/constants/auth.constant";

// Fetch cart order
export async function fetchCartOrders() {
  const tokenCookie = cookies().get(AUTH_COOKIE)?.value;

  if (!tokenCookie) {
    throw new Error("Authentication required");
  }

  const token = await decode({ token: tokenCookie, secret: process.env.NEXTAUTH_SECRET! });

  if (!token?.token) {
    throw new Error("Invalid authentication token");
  }

  const response = await fetch(process.env.API + "/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
    cache: "no-store",
  });

  const payload: APIResponse<{ cart: Cart }> = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }
  return payload;
}

// fetch latest order

function getOrdersFromPayload(payload: unknown): Order[] {
  if (!payload || typeof payload !== "object") return [];

  const responsePayload = payload as {
    orders?: Order[];
    data?: { orders?: Order[] };
  };

  if (Array.isArray(responsePayload.orders)) return responsePayload.orders;
  if (Array.isArray(responsePayload.data?.orders)) return responsePayload.data.orders;

  return [];
}

export async function fetchLatestOrder() {
  const tokenCookie = cookies().get(AUTH_COOKIE)?.value;

  if (!tokenCookie) {
    throw new Error("Authentication required");
  }

  const token = await decode({ token: tokenCookie, secret: process.env.NEXTAUTH_SECRET! });

  if (!token?.token) {
    throw new Error("Invalid authentication token");
  }

  const response = await fetch(process.env.API + `/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
    cache: "no-store",
  });

  const payload: APIResponse<PaginatedResponse<{ orders: Order[] }>> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  const orders = getOrdersFromPayload(payload);

  return orders.length > 0 ? orders[orders.length - 1] : null;
}
