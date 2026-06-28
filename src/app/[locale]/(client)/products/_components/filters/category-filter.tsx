"use client";

import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { usePathname, useRouter } from "@/i18n/routing";

// Types
type CategoryFilterProps = {
  categories: Category[];
};

// Schema
const schema = z.object({
  category: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get initial category
  const initialCategory = searchParams.get("category") || "";

  // Validation
  const { setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { category: initialCategory },
  });

  // Watch the category value
  const category = watch("category");

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setValue("category", value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    // Update  URL
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Card className="w-full p-5 rounded-[20px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.05)] space-y-4 rtl:space-x-reverse py-6 sm:p-6 sm:py-8 lg:w-[302px]">
      {/*Title */}
      <h3 className="font-bold text-blue-gray-900 leading-[44px] border-b pb-3 last:border-b-0 capitalize ">
        {t("category")}
      </h3>
      {/* Radio */}
      <RadioGroup
        className="text-custom-rose-900 "
        value={category || ""}
        onValueChange={handleCategoryChange}
      >
        <div className="space-y-3">
          {/* All option */}
          <div className="flex items-center space-x-2 w-full">
            <RadioGroupItem value="" id="category-all" />
            <Label
              htmlFor="category-all"
              className="capitalize text-blue-gray-600 leading-5 font-semibold font-inter flex-1 rtl:ps-2"
            >
              {t("all-categories")}
            </Label>
          </div>

          {/* Map categories */}
          {categories.map((cat) => (
            <div key={cat._id} className="flex items-center justify-between w-full ">
              <div className="flex items-center space-x-2 w-full">
                {/* Radio button */}
                <RadioGroupItem value={cat._id} id={`category-${cat._id}`} />

                {/* Label */}
                <Label
                  htmlFor={`category-${cat._id}`}
                  className="capitalize text-blue-gray-500 leading-5 text-sm font-inter flex-1 rtl:ps-2"
                >
                  {cat.name}
                </Label>
              </div>

              {/* Products count */}
              <span className="text-blue-gray-500">({cat.productsCount})</span>
            </div>
          ))}
        </div>
      </RadioGroup>
    </Card>
  );
}
