import { getCategoryById } from "@/lib/apis/dashboard/category.api";
import UpdateCategory from "./update-category";
import UpdateCategorySkeleton from "@/components/skeletons/dashboard/update-category-skeleton";
import { Suspense } from "react";

export default async function UpdateCategoryWrapper({ params }: { params: { id: string } }) {
  // Fetch category data server-side
  const category = await getCategoryById(params.id);

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-10">
      <Suspense fallback={<UpdateCategorySkeleton />}>
        <UpdateCategory params={{ id: params.id }} category={category} />
      </Suspense>
    </div>
  );
}
