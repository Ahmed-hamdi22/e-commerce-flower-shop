"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Props for the PopularItemsTabs component
type PopularItemsTabsProps = {
  tabsData: Category[];
};

export default function PopularItemsTabs({ tabsData }: PopularItemsTabsProps) {
  // Navigation
  const router = useRouter();

  // Get the current search parameters
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || tabsData[0]?._id;

  /**
   * Handles tab click events.
   * Updates the active tab index and appends the selected category ID to the query string.
   *
   * @param categoryId - The ID of the selected category
   */
  const handleTabClick = (categoryId: string) => {
    // Get the current URL query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Set the "category" parameter to the selected category ID
    params.set("category", categoryId);

    // Update the URL with the new query string
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="categories w-full overflow-x-auto pb-2 sm:w-auto sm:overflow-visible sm:pb-0">
      {/* Render the list of category tabs */}
      <ul className="list-none flex min-w-max gap-4 text-base font-normal text-blue-gray-900 font-inter sm:gap-6 sm:text-xl">
        {tabsData.slice(0, 4).map((tab: Category) => (
          // Category tab
          <li
            key={tab._id}
            onClick={() => handleTabClick(tab._id)}
            className={`cursor-pointer transition-all rounded-md text-blue-gray-900 capitalize ${
              selectedCategory === tab._id
                ? "text-custom-rose-900 underline underline-offset-[10%] decoration-2"
                : "hover:text-custom-rose-900"
            }`}
          >
            {/* Category name */}
            {tab.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
