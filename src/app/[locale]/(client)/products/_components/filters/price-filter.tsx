"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { useFormatter, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function PriceFilter() {
  // Translations
  const t = useTranslations();

  // Variables
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const formatter = useFormatter();

  // Validation
  const priceFilterSchema = z.object({
    priceRange: z
      .tuple([z.number().nonnegative(), z.number().nonnegative()])
      .refine(([min, max]) => min <= max, {
        message: t("price-range-error"),
      }),
  });
  type PriceFilterFormType = z.infer<typeof priceFilterSchema>;

  // Max price
  const maxPrice = 10000;

  // Get initial values from URL
  const initialMin = Number(searchParams.get("price[gte]")) || 0;
  const initialMax = Number(searchParams.get("price[lte]")) || maxPrice;

  // Init form
  const { watch, setValue } = useForm<PriceFilterFormType>({
    resolver: zodResolver(priceFilterSchema),
    defaultValues: {
      priceRange: [initialMin, initialMax],
    },
  });

  // Watch the price range value
  const priceRange = watch("priceRange");

  // Update URL on change (debounced)
  const debouncedReplace = useDebouncedCallback((range: [number, number]) => {
    const [min, max] = range;
    const params = new URLSearchParams(searchParams.toString());
    params.set("price[gte]", String(min));
    params.set("price[lte]", String(max));
    // Update the URL
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  // On slider change
  const handleSliderChange = (value: [number, number]) => {
    setValue("priceRange", value, { shouldValidate: true });
    debouncedReplace(value);
  };

  return (
    <Card className="w-full p-5 rounded-[20px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.05)] space-y-4 rtl:space-x-reverse sm:p-6 lg:w-[302px]">
      {/* Title */}
      <h3 className="font-bold text-blue-gray-900 leading-[44px] border-b pb-3 last:border-b-0  cupitalize rtl:text-right">
        {t("price-rating")}
      </h3>

      {/* Price range */}
      <div className="flex text-sm text-custom-rose-900 font-bold rtl:text-right">
        <span className="me-1">
          {formatter.number(priceRange[0], {
            style: "currency",
            currency: "USD",
          })}
        </span>
        {" - "}
        <span className="ms-1">
          {formatter.number(priceRange[1], {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
      {/* Slider */}
      <Slider
        className="w-full h-[16px] text-custom-rose-900 lg:w-[254px]"
        min={0}
        max={maxPrice}
        step={10}
        value={priceRange}
        onValueChange={handleSliderChange}
      />
    </Card>
  );
}
