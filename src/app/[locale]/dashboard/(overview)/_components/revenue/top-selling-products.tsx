"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";

type TopSellingProductsProps = {
  topSellingProducts: TopSellingProduct[];
};

export default function TopSellingProducts({ topSellingProducts }: TopSellingProductsProps) {
  // Translation
  const t = useTranslations();

  return (
    <div className="w-full rounded-xl bg-white p-4">
      {/* Text */}
      <h2 className="text-xl font-bold mb-4 text-black">{t("top-selling-products")}</h2>

      {/* Scrollarea */}
      <ScrollArea className="h-[200px]">
        <Table>
          <TableBody>
            {topSellingProducts.map((product, index) => (
              <TableRow
                key={index}
                className={
                  index === 0
                    ? "bg-yellow-500 bg-opacity-25 hover:bg-yellow-200" // 1st place
                    : index === 1
                      ? "bg-gray-500 bg-opacity-25 hover:bg-gray-300" // 2nd place
                      : index === 2
                        ? "bg-orange-900 bg-opacity-25 hover:bg-orange-200" // 3rd place
                        : ""
                }
              >
                {/* Product title and price */}
                <TableCell className="min-w-0 break-words text-black">
                  {product.title.split(" ").splice(0, 5).join(" ")}({product.price}EGP)
                </TableCell>

                {/* Product sold */}
                <TableCell className="text-right text-black font-bold">
                  {product.sold} {t("sales")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
