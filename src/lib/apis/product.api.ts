import { searchParamsToString } from "../utils/convert-search-params";
import { getTranslations } from "next-intl/server";

const EMPTY_PRODUCTS_PAYLOAD: PaginatedResponse<{ products: Product[] }> = {
  products: [],
  metadata: {
    currentPage: 1,
    limit: 0,
    totalPages: 0,
    totalItems: 0,
  },
};

export async function fetchProducts(searchParams: SearchParams) {
  if (!process.env.API) return EMPTY_PRODUCTS_PAYLOAD;

  try {
    const response = await fetch(
      `${process.env.API}/products?${searchParamsToString(searchParams)}`,
      {
        cache: "no-cache",
      },
    );

    const payload: APIResponse<PaginatedResponse<{ products: Product[] }>> = await response.json();

    if ("error" in payload || !response.ok) {
      return EMPTY_PRODUCTS_PAYLOAD;
    }

    return payload;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return EMPTY_PRODUCTS_PAYLOAD;
  }
}

// Function to fetch product details from the API
export const fetchProductDetails = async (productid: string) => {
  // Translations
  const t = await getTranslations();

  try {
    // Send request to fetch product details
    const response = await fetch(process.env.API + `/products/${productid}`);

    // If the response is not successful, throw an error
    if (!response.ok) throw new Error(t("product-not-found"));

    // Parse the response JSON
    const data = await response.json();

    return data;
  } catch (error) {
    // Return null in case of an error to indicate failure
    return null;
  }
};

// Handle related items function
export default async function fetchProductsByCategory(category: string) {
  if (!process.env.API) return [];

  // Fetch api
  const apiUrl = `${process.env.API}/products?category=${category}&limit=4`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      cache: "no-store",
    });

    // Parse the JSON response
    const payload: APIResponse<PaginatedResponse<{ products: Product[] }>> = await response.json();

    // Handle error
    if ("error" in payload || !response.ok) {
      return [];
    }
    return payload.products || [];
  } catch (error) {
    console.error("Error fetching related products: ", error);
    return [];
  }
}

