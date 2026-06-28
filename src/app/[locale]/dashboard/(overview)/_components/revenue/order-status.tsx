// components/order-status.tsx
import { getTranslations } from "next-intl/server";
import { getAllOrders } from "@/lib/apis/dashboard/orders.api";
import { OrderStatusChart } from "./order-stats-chart";

export async function OrderStatus() {
  const data = await getAllOrders();

  const rawOrders = data?.statistics.ordersByStatus || [];
  const filteredOrders = rawOrders.filter(
    (item: { _id: string | null }) => item._id !== null && item._id !== "pending"
  );

  const totalCount = filteredOrders.reduce(
    (sum: number, item: { count: number }) => sum + item.count,
    0,
  );

  const customColors = ["#12B76A", "#0063D0", "#D50000"];

  const chartData = filteredOrders.map(
    (item: { _id: string | null; count: number }, index: number) => {
      const percentage = Math.round((item.count / totalCount) * 100);
      return {
        status: item._id ?? "unknown",
        count: item.count,
        percentage,
        fill: customColors[index % customColors.length],
      };
    },
  );

  return <OrderStatusChart data={chartData} />;
}
