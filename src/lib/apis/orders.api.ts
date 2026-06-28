import { JSON_HEADER } from "@/lib/constants/api.constant";
import getToken from "@/lib/utils/get-token";

export async function fetchOrders() {
  const token = await getToken();

  if (!token || !process.env.API) {
    return { orders: [] };
  }

  try {
    const response = await fetch(process.env.API + `/orders`, {
      headers: { ...JSON_HEADER, Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const payload: APIResponse<PaginatedResponse<{ orders: Order[] }>> = await response.json();

    if (!response.ok || "error" in payload) {
      return { orders: [] };
    }

    return payload;
  } catch {
    return { orders: [] };
  }
}
