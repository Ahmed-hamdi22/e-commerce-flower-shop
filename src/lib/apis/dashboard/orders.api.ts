"use server";

import getToken from "@/lib/utils/get-token";

export async function getAllOrders() {
  const token = await getToken();

  if (!token || !process.env.API) {
    return { statistics: { ordersByStatus: [], dailyRevenue: [], monthlyRevenue: [] } };
  }

  const apiUrl = `${process.env.API}/statistics/orders`;

  try {
  const response = await fetch(apiUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const payload: APIResponse<OrderStatisticsResponse> = await response.json();

    if (!response.ok || "error" in payload) {
      return { statistics: { ordersByStatus: [], dailyRevenue: [], monthlyRevenue: [] } };
  }
  return payload;
  } catch {
    return { statistics: { ordersByStatus: [], dailyRevenue: [], monthlyRevenue: [] } };
  }
}
