"use server";

import getToken from "@/lib/utils/get-token";

const emptyStatistics = {
  overall: {
    totalProducts: 0,
    totalOrders: 0,
    totalCategories: 0,
    totalRevenue: 0,
  },
  products: {
    productsByCategory: [],
    topSellingProducts: [],
    lowStockProducts: [],
  },
  orders: {
    ordersByStatus: [],
    dailyRevenue: [],
    monthlyRevenue: [],
  },
  categories: [],
};

export async function getAllStatistics() {
  const token = await getToken();

  if (!token || !process.env.API) return emptyStatistics;

  const apiUrl = `${process.env.API}/statistics`;

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
  const payload = await response.json();

    if (!response.ok || "error" in payload) return emptyStatistics;

    return payload.statistics || emptyStatistics;
  } catch {
    return emptyStatistics;
  }
}
