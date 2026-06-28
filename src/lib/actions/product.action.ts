"use server";

import { getTranslations } from "next-intl/server";
import getToken from "../utils/get-token";

// Add to cart function
export const addProductToCart = async (productid: string, quantity: number) => {
  // Translations
  const t = await getTranslations();

  const token = await getToken();

  if (!token) {
    return { success: false, message: t("invalid-or-expired-token") };
  }

  try {
    // Fetch api
    const response = await fetch(process.env.API + "/cart", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),

      body: JSON.stringify({
        product: productid,
        quantity: quantity,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: data?.error || t("failed-to-add-product"),
      };
    }

    // Parse the response JSON from the API
    const data: APIResponse<PaginatedResponse<{ product: Product[] }>> = await response.json();

    // If successful, return a success message
    return {
      data,
      success: true,
      quantity,
      message: t("product-added-to-cart-successfully", { count: quantity }),
    };
  } catch (error) {
    // Catch any errors during the API call and return an error message
    return { success: false, message: t("an-error-occurred-while-adding-the-product") };
  }
};
