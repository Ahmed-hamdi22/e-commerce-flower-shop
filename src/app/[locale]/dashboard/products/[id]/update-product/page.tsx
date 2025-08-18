import React from "react";
import UpdateProductform from "./_components/update-product-form";
import { fetchProductDetails } from "@/lib/apis/product.api";
import { fetchCategories } from "@/lib/apis/category.api";
import { fetchOccasions } from "@/lib/apis/occasion.api";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetchProductDetails("67d727af836ee8be706225dc");
  const categoriesData = await fetchCategories({});
  const occasionsData = await fetchOccasions({});

  return (
    <div>
      <UpdateProductform
        params={{ id: params.id }}
        product={data?.product}
        categories={categoriesData?.categories || []}
        occasions={occasionsData?.occasions || []}
      />
    </div>
  );
}
