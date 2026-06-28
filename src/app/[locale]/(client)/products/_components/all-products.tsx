import PagePagination from "@/components/common/pagination";
import ProductCard from "@/components/features/product/product-card";
import { fetchProducts } from "@/lib/apis/product.api";
import { getTranslations } from "next-intl/server";

export default async function Products({ searchParams }: { searchParams: SearchParams }) {
  // Translation
  const t = await getTranslations();

  // Variables
  const payload = await fetchProducts(searchParams);

  if (payload.products.length === 0) {
    return <h1>{t("no-products-available-1")}</h1>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 grid-rows-[min-content] min-[375px]:grid-cols-2 sm:gap-5 xl:grid-cols-3">
      {payload.products
        .filter((product) => product.title && product.imgCover && product.price !== undefined)
        .map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

      <div className="min-w-0 min-[375px]:col-span-2 xl:col-span-3">
        <PagePagination metadata={payload.metadata} />
      </div>
    </div>
  );
}
