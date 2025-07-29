import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/lib/apis/category.api";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { SearchBar } from "@/components/common/search-bar";
import { CategoriesTable } from "./_components/categories-table";
import Heading from "@/components/common/heading";
import PagePagination from "@/components/common/pagination";

export default async function CategoriesPage({ searchParams }: { searchParams: SearchParams }) {
  // Translations
  const t = await getTranslations();

  // Locale
  const locale = await getLocale();

  // Data
  const data = await fetchCategories(searchParams);

  return (
    <div className="px-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Heading>{t("all-categoires")}</Heading>

        <Button className="bg-custom-rose-900 hover:bg-custom-rose-900/80" asChild>
          <Link href={`/${locale}/dashboard/categories/add`}>
            <Plus /> {t("add-a-new-category")}
          </Link>
        </Button>
      </div>

      {/* Search bar */}
      <SearchBar placeholder="search-for-a-category" />

      {/* Table */}
      <CategoriesTable data={data?.categories || []} />

      <PagePagination metadata={data?.metadata} />
    </div>
  );
}
