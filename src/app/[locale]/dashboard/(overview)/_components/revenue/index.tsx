"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ChartTooltip from "./chart-tooltip";
import ChartDot from "./chart-dot";
import ChartToggle from "./chart-toggle";

type RevenueChartProps = {
  dailyRevenue: DailyRevenue[];
  monthlyRevenue: MonthlyRevenue[];
};

export default function RevenueChart({ dailyRevenue, monthlyRevenue }: RevenueChartProps) {
  // Translation
  const t = useTranslations();

  // State
  const [isMonthly, setIsMonthly] = useState(true);

  // Format number as currency (EGP) without decimal places
  const formatMonth = (dateStr: string) =>
    new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(dateStr));
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-EG", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(
      value,
    );

  // Get the relevant dataset based on toggle (monthly or weekly)
  const data = (isMonthly ? monthlyRevenue : dailyRevenue).map((entry) => ({
    name: formatMonth(entry._id),
    value: entry.revenue,
  }));

  // Find the highest revenue value for dot highlighting
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="min-w-0">
      <Card>
        <CardContent className="h-[381px] w-full rounded-xl bg-white p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Text */}
            <h2 className="text-xl font-semibold sm:text-2xl">{t("revenue")}</h2>

            {/* Toggle button */}
            <ChartToggle isMonthly={isMonthly} setIsMonthly={setIsMonthly} />
          </div>

          <div dir="ltr">
            <ResponsiveContainer width="100%" height={315}>
              <AreaChart data={data} margin={{ top: 30, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={true} horizontal={false} />

                {/* Y-axis */}
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatCurrency}
                  fontSize={12}
                  orientation="left"
                  className="font-bold"
                />

                {/* X-axis */}
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  className="font-bold"
                />

                {/* Tooltip on hover */}
                <Tooltip content={<ChartTooltip formatCurrency={formatCurrency} />} />

                {/* Area */}
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0063D0"
                  fill="url(#dashboard-revenue)"
                  strokeWidth={2}
                  dot={<ChartDot maxValue={maxValue} formatCurrency={formatCurrency} />}
                />

                {/* Linear gradient */}
                <defs>
                  <linearGradient id="dashboard-revenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0063D0" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0063D0" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
