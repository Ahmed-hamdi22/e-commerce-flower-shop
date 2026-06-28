import ProductSkeleton from "@/components/skeletons/product/product.skeleton";

export default function AllProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 min-[375px]:grid-cols-2 sm:gap-5 xl:grid-cols-3">
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </div>
  );
}
