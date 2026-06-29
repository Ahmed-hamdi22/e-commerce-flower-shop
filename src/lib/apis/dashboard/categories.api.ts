"use server";

import getToken from "@/lib/utils/get-token";

export async function getAllCategories() {
  const token = await getToken();

  if (!token || !process.env.API) return { categories: [], metadata: {} as Metadata };

  const apiUrl = `${process.env.API}/categories`;

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
  const payload: APIResponse<CategoryStatistics> = await response.json();

    if (!response.ok || "error" in payload) return { categories: [], metadata: {} as Metadata };

  return payload;
  } catch {
    return { categories: [], metadata: {} as Metadata };
  }
}
