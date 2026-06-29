import ProductCard from "@/components/features/product/product-card";
import fetchProductsByCategory from "@/lib/apis/product.api";

import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

type TProps = {
  category: string;
  productid: string;
  width?: string;
  height?: string;
};

export default async function RelatedItems({ category, productid, width, height }: TProps) {
  // Translations
  const t = await getTranslations();

  // Function
  const products = await fetchProductsByCategory(category);

  return (
    <div className="flex w-full min-w-0 flex-col">
      {/* Items details */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div className="relative">
          {/* Section title */}
          <h3 className="text-blue-gray-900 text-2xl font-bold z-10 font-inter sm:text-[25px]">
            {t("related-items")}
          </h3>

          {/* Underline decoration */}
          <div className="bg-custom-purple-900 w-[33.4px] h-[3px] z-10"></div>
          <div
            className="bg-main-color w-[133.59px] h-[30px] absolute bottom-0 -z-10
            rounded-e-full rtl:rounded-s-none"
          ></div>
        </div>

        {/* View more */}
        <div className="flex items-center gap-1">
          <Link
            href={`/products?category=${category}`}
            className="text-blue-gray-500 text-[16px] font-medium"
          >
            {t("view-more")}
          </Link>
          <FaArrowRightLong className="w-[14px] h-[16px] text-blue-gray-500" />
        </div>
      </div>

      {/* Display products */}
      <div className="grid grid-cols-1 gap-5 justify-start min-[375px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Show a "Coming Soon" message if no products are available */}
        {products.length === 0 ? (
          <div className="min-h-80 flex items-center justify-center text-center text-xl font-semibold text-blue-gray-900 min-[375px]:col-span-2 lg:col-span-4">
            {t("coming-soon")}
          </div>
        ) : (
          products.map((product: any, index: number) =>
            product?.title ? (
              <ProductCard key={index} product={product as any} width={width} height={height} />
            ) : null,
          )
        )}
      </div>
    </div>
  );
}
