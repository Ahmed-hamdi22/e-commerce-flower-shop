import { Suspense } from "react";
import Products from "./_components/all-products";
import AllProductsSkeleton from "./_components/all-products-skeleton";
import { FilterStatus } from "./_components/filters/filter-status";
import { FilterStars } from "./_components/filters/filter-stars";
import PriceFilter from "./_components/filters/price-filter";
import CategoryFilterWrapper from "./_components/category-filter-wrapper";
import OccasionFilterWrapper from "./_components/filters/occasion-flter-wrapper";
import ProductsLayoutShell from "./_components/products-layout-shell";

export default async function AllCategoriesPage({ searchParams }: RouteProps) {
  return (
    <ProductsLayoutShell
      filters={
        <>
          {/* Status Filter */}
          <CategoryFilterWrapper />
          <OccasionFilterWrapper />
          <PriceFilter />
          <FilterStatus />
          <FilterStars />
        </>
      }
    >
      {/* Products */}
      <Suspense fallback={<AllProductsSkeleton />}>
        <Products searchParams={searchParams} />
      </Suspense>
    </ProductsLayoutShell>
  );
}
