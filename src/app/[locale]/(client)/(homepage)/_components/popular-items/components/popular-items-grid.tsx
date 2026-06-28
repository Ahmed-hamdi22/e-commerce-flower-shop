import { getTranslations } from "next-intl/server";
import ProductCard from "@/components/features/product/product-card";
import React from "react";

type Product = {
  id: string;
  _id: string;
  imgCover: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  rating?: number;
};

type PopularItemsGridProps = {
  categoryId?: string;
  searchParams: SearchParams;
};

function getPopularProducts(payload: unknown): Product[] {
  if (!payload || typeof payload !== "object") return [];

  const responsePayload = payload as {
    products?: Product[];
    data?: { products?: Product[] };
  };

  if (Array.isArray(responsePayload.products)) return responsePayload.products;
  if (Array.isArray(responsePayload.data?.products)) return responsePayload.data.products;

  return [];
}

async function fetchProducts(searchParams: string) {
  try {
    const response = await fetch(`${process.env.API}/products?${searchParams}`, {
      cache: "no-store",
    });
    const payload: APIResponse<PaginatedResponse<{ products: Product[] }>> = await response.json();

    if (!response.ok || "error" in payload) {
      throw new Error("error" in payload ? payload.error : "Failed to fetch popular products");
    }
    return payload;
  } catch (error) {
    console.error("Error fetching popular products: ", error);
    return null;
  }
}

export default async function PopularItemsGrid({
  categoryId,
  searchParams,
}: PopularItemsGridProps) {
  // Translation
  const t = await getTranslations();
  const searchQuery = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((item) => searchQuery.append(key, item));
      return;
    }

    searchQuery.set(key, value);
  });

  if (categoryId) {
    searchQuery.set("category", categoryId);
  }

  searchQuery.set("sort", "-sold");

  const payload = await fetchProducts(searchQuery.toString());
  const products = getPopularProducts(payload);

  return (
    <div className="grid grid-cols-4 gap-6 justify-start">
      {/* Show a "Coming Soon" message if no products are available */}
      {products.length === 0 ? (
        <div className="col-span-4 min-h-80 flex items-center justify-center text-center text-xl font-semibold text-blue-gray-900">
          {t("coming-soon")}
        </div>
      ) : (
        // Grid displaying the popular products
        products.map((product: Product, index: number) => (
          <ProductCard product={product} key={index} />
        ))
      )}
    </div>
  );
}
