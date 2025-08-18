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
  categoryId: string;
  searchParams: SearchParams;
};

async function fetchProducts(categoryId: string, searchParams: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/filtered-products?${searchParams}`,
    );
    const payload: APIResponse<PaginatedResponse<{ products: Product[] }>> = await response.json();

    if ("error" in payload) {
      throw new Error(payload.error);
    }
    return payload;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return null;
  }
}

export default async function PopularItemsGrid({
  categoryId,
  searchParams,
}: PopularItemsGridProps) {
  // Translation
  const t = await getTranslations();
  const searchQuery = new URLSearchParams({
    category: categoryId,
    sort: "-sold",
    ...searchParams,
  });

  const payload = await fetchProducts(categoryId, searchQuery.toString());

  return (
    <div className="grid grid-cols-4 gap-6 justify-start">
      {/* Show a "Coming Soon" message if no products are available */}
      {payload?.products.length === 0 ? (
        <div className="col-span-4 min-h-80 flex items-center justify-center text-center text-xl font-semibold text-blue-gray-900">
          {t("coming-soon")}
        </div>
      ) : (
        // Grid displaying the popular products
        payload?.products.map((product: Product, index: number) => (
          <ProductCard product={product} key={index} />
        ))
      )}
    </div>
  );
}
