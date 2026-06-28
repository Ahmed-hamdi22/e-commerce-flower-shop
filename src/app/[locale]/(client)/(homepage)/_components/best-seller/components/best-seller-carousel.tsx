import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import { getTranslations } from "next-intl/server";
import ProductCard from "@/components/features/product/product-card";
import { ProductType } from "@/lib/types/product";

function getProductsFromPayload(payload: unknown): ProductType[] {
  if (!payload || typeof payload !== "object") return [];

  const responsePayload = payload as {
    products?: ProductType[];
    data?: { products?: ProductType[] };
  };

  if (Array.isArray(responsePayload.products)) return responsePayload.products;
  if (Array.isArray(responsePayload.data?.products)) return responsePayload.data.products;

  return [];
}

async function fetchProducts(url: string) {
  if (!url) return null;

  try {
    const response = await fetch(url, { cache: "no-store" });
    const payload: APIResponse<PaginatedResponse<{ products: ProductType[] }>> =
      await response.json();

    if (!response.ok || "error" in payload) {
      throw new Error("error" in payload ? payload.error : "Failed to fetch products");
    }

    return payload;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return null;
  }
}

async function fetchBestSellerProducts() {
  if (!process.env.API) return [];

  const bestSellerPayload = await fetchProducts(`${process.env.API}/products?sort=-sold&limit=6`);
  const bestSellerProducts = getProductsFromPayload(bestSellerPayload);

  if (bestSellerProducts.length > 0) return bestSellerProducts;

  const fallbackPayload = await fetchProducts(`${process.env.API}/products?limit=6`);
  return getProductsFromPayload(fallbackPayload);
}

export default async function BestSellerCarousel() {
  // Translation
  const t = await getTranslations();

  // Variables
  const products = await fetchBestSellerProducts();

  return (
    <div className="overflow-hidden flex justify-center items-center lg:col-span-3">
      {/* Show a "Coming Soon" message if no products are available */}
      {products.length === 0 ? (
        <div className="min-h-80 text-center text-xl font-semibold text-blue-gray-900">
          {t("coming-soon")}
        </div>
      ) : (
        // Carousel displaying the best seller products
        <Carousel
          opts={{
            loop: true,
            slidesToScroll: 1,
            align: "start",
          }}
          className="w-full relative"
        >
          {/* Carousel content */}
          <CarouselContent>
            {products.map((product: ProductType, index: number) => (
              <CarouselItem key={product.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <ProductCard product={product} key={index} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel navigation */}
          <CarouselPrevious className="hidden text-white left-[0.1rem] top-[8.5rem] border-0 bg-custom-rose-900 hover:bg-custom-rose-800 sm:flex" />
          <CarouselNext className="hidden text-white right-[0.45rem] top-[8.5rem] border-0 bg-custom-rose-900 hover:bg-custom-rose-800 sm:flex" />
        </Carousel>
      )}
    </div>
  );
}
