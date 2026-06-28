/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getTranslations } from "next-intl/server";
import PopularItemsTabs from "./components/popular-items-tabs";
import PopularItemsGrid from "./components/popular-items-grid";

type PopularItemsProps = {
  categories: Category[];
  searchParams: SearchParams;
};

export default async function PopularItems({ searchParams, categories }: PopularItemsProps) {
  // Translation
  const t = await getTranslations();

  // Determine the selected category from search parameters or default to the first category
  const selectedCategory = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category || categories[0]?._id;

  return (
    <div className="mb-10 container px-4 sm:px-0 lg:mb-20">
      {/* Section header */}
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          {/* Section title */}
          <h3 className="text-custom-blue-gray-600 font-bold text-2xl z-10 font-inter sm:text-[30px]">
            {t("popular-items")}
          </h3>

          {/* Underline decoration */}
          <div className="bg-custom-rose-900 w-[53px] h-[2px] z-10"></div>
          <div
            className="bg-main-color w-[136px] h-[17px] absolute bottom-0 -z-10 
            rounded-e-full rtl:rounded-s-none"
          ></div>
        </div>

        {/* Tabs for categories */}
        <PopularItemsTabs tabsData={categories} />
      </div>

      {/* Grid to display items in the selected category */}
      <PopularItemsGrid categoryId={selectedCategory} searchParams={searchParams} />
    </div>
  );
}
