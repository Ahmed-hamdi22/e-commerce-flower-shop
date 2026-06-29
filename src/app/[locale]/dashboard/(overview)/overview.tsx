import { getAllStatistics } from "@/lib/apis/dashboard/statistics.api";
import RevenueChart from "./_components/revenue";
import TopSellingProducts from "./_components/revenue/top-selling-products";
import LowStockProducts from "./_components/revenue/low-stock-products";
import { OrderStatus } from "./_components/revenue/order-status";
import { AllStatsComp } from "./_components/revenue/all-stats-comp";
import { AllCategories } from "./_components/revenue/all-categories";
import Header from "@/components/layout/dashboard/header";

export default async function Overview() {
  // Variables
  const breadcrumbPaths = [{ title: "dashboard", href: "/dashboard" }];

  // Function
  const statistics = await getAllStatistics();

  return (
    <>
      <Header paths={breadcrumbPaths} />
      <div className="bg-custom-white px-4 py-7">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Allstatscomp */}
          <AllStatsComp />

          {/* Allcategories */}
          <AllCategories />
        </div>

        <div className="mt-6 flex w-full flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-[276px] xl:shrink-0">
            {/* order statue */}
            <OrderStatus />
          </div>

          <div className="min-w-0 flex-1">
            {/* Revenue chart */}
            <RevenueChart
              dailyRevenue={statistics.orders.dailyRevenue || []}
              monthlyRevenue={statistics.orders.monthlyRevenue || []}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Top-selling products */}
          <TopSellingProducts topSellingProducts={statistics.products.topSellingProducts || []} />

          {/* Low-stock products */}
          <LowStockProducts lowStockProducts={statistics.products.lowStockProducts || []} />
        </div>
      </div>
    </>
  );
}
