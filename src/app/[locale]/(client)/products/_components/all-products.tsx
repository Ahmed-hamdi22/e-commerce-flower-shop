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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 grid-rows-[min-content]">
      {payload.products
        .filter((product) => product.title && product.imgCover && product.price !== undefined)
        .map((product) => (
          <ProductCard width="400" height="400" key={product._id} product={product} />
        ))}

      <div className="col-span-3">
        <PagePagination metadata={payload.metadata} />
      </div>
    </div>
  );
}
