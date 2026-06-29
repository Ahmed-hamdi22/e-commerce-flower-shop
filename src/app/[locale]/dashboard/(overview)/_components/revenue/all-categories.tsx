import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { getAllCategories } from "@/lib/apis/dashboard/categories.api";

export async function AllCategories() {
  // Translations
  const t = await getTranslations();

  // Data
  const data = await getAllCategories();

  return (
    <div className="h-[326px] w-full rounded-xl bg-white">
      {/* Title */}
      <h1 className="px-4 pt-5 pb-2 text-xl font-bold text-black sm:px-5 sm:text-2xl">
        {t("all-catgories")}
      </h1>

      {/* Scroll area */}
      <ScrollArea className=" h-[260px] bg-white p-5 ">
        <div>
          {data.categories.map((item) => {
            return (
              <div className="flex gap-3 border-b p-2 last:border-b-0 justify-between" key={item._id}>
                {/* Item title / Left side */}
                <h1 className="min-w-0 break-words text-black capitalize">{item.name}</h1>

                {/* Item count / Right side*/}
                <Badge className="bg-gray-100 text-black hover:bg-gray-300">
                  {item.productsCount} {t("products")}
                </Badge>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
