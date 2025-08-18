import React from "react";
import AddProductForm from "./_components/add-product-form";
import { fetchCategories } from "@/lib/apis/category.api";
import { fetchOccasions } from "@/lib/apis/occasion.api";
import { fetchProductDetails } from "@/lib/apis/product.api";

export default async function AddProductpage({ params }: { params: { id: string } }) {
  const data = await fetchProductDetails(params.id);
  const categoriesData = await fetchCategories({});
  const occasionsData = await fetchOccasions({});

  return (
    <>
      {/* Add product page */}
      <AddProductForm
        params={{ id: params.id }}
        product={data?.product}
        categories={categoriesData?.categories || []}
        occasions={occasionsData?.occasions || []}
      />
    </>
  );
}
