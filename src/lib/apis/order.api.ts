"use server";

import getToken from "@/lib/utils/get-token";

// Fetch cart order
export async function fetchCartOrders() {
  const token = await getToken();

  if (!token || !process.env.API) return null;

  try {
    const response = await fetch(process.env.API + "/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const payload: APIResponse<{ cart: Cart }> = await response.json();
    if (!response.ok || "error" in payload) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
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
  const token = await getToken();

  if (!token || !process.env.API) return null;

  try {
    const response = await fetch(process.env.API + `/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const payload: APIResponse<PaginatedResponse<{ orders: Order[] }>> = await response.json();

    if (!response.ok || "error" in payload) {
      return null;
    }

    const orders = getOrdersFromPayload(payload);

    return orders.length > 0 ? orders[orders.length - 1] : null;
  } catch {
    return null;
  }
}
