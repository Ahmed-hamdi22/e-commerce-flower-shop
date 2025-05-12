import { CircleDollarSign, ClipboardList, Package, ReceiptText } from "lucide-react";
import { getAllStatistics } from "@/lib/apis/dashboard/statistics.api";
import { getTranslations } from "next-intl/server";
import { StatsComp } from "@/components/common/stat-comp";

export async function AllStatsComp() {
  // Translations
  const t = await getTranslations();

  // Data
  const data = await getAllStatistics();

  // Formatting
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumSignificantDigits: 9,
  }).format(data?.overall?.totalRevenue ?? 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-[326px] gap-3 p-5 bg-white rounded-xl">
      {/* Stats comp total products */}
      <StatsComp
        icon={Package}
        color="text-stats-products-primary"
        bgColor="bg-stats-products-bg"
        value={data?.overall.totalProducts}
        text={t("total-products")}
      />

      {/* Stats comp total orders */}
      <StatsComp
        icon={ReceiptText}
        color="text-stats-orders-primary"
        bgColor="bg-stats-orders-bg"
        value={data?.overall.totalOrders}
        text={t("total-orders")}
      />

      {/* Stats comp total categories */}
      <StatsComp
        icon={ClipboardList}
        color="text-stats-categories-primary"
        bgColor="bg-stats-categories-bg"
        value={data?.overall.totalCategories}
        text={t("total-categories")}
      />

      {/* Stats comp total revenue */}
      <StatsComp
        icon={CircleDollarSign}
        color="text-stats-revenue-primary"
        bgColor="bg-stats-revenue-bg"
        value={formattedNumber}
        text={t("total-revenue")}
        currency={t("egp")}
      />
    </div>
  );
}
