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
    <>
      <div className="flex flex-col">
        {/* Items details */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            {/* Section title */}
            <h3 className="text-blue-gray-900 text-[25px] font-bold z-10 font-inter">
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
        <div className="grid grid-cols-4 gap-6 justify-start">
          {/* Show a "Coming Soon" message if no products are available */}
          {products.length === 0 ? (
            <div className="col-span-4 min-h-80 flex items-center justify-center text-center text-xl font-semibold text-blue-gray-900"></div>
          ) : (
            products.map((product: Product, index: number) => (
              <ProductCard product={product} key={index} width={width} height={height} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
