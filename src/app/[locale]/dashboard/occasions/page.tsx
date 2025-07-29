import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { fetchOccasions } from "@/lib/apis/occasion.api";
import { SearchBar } from "@/components/common/search-bar";
import { OcassionsTable } from "./_components/occasions-table";
import Heading from "@/components/common/heading";

export default async function OccasionPage({ searchParams }: { searchParams: SearchParams }) {
  // Translations
  const t = await getTranslations();

  // Locale
  const locale = await getLocale();

  // Data
  const data = await fetchOccasions(searchParams);

  return (
    <div className="px-10">
      <div className="flex justify-between items-center">
        {/* Header */}
        <Heading>{t("all-occasions")}</Heading>

        <Button className="bg-custom-rose-900" asChild>
          <Link href={`/${locale}/dashboard/occasions/add-occasion`}>
            <Plus /> {t("add-a-new-occassion")}
          </Link>
        </Button>
      </div>

      {/* Search bar */}
      <SearchBar placeholder="search-for-a-occasion" />

      {/* Table */}
      <OcassionsTable data={data?.occasions || []} />
    </div>
  );
}
