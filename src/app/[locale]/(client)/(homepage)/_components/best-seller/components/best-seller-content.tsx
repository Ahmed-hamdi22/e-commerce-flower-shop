import ArrowRight from "@/components/common/arrow-long-right";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function BestSellerContent() {
  // Translation
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-between gap-[28.7px]">
      {/* Best seller Headline */}
      <h2 className="text-custom-rose-900 text-[17px] font-bold tracking-[4px] m-0 p-0 uppercase font-roboto">
        {t("premium-gifts")}
      </h2>

      {/* Best seller description */}
      <div className="space-y-2">
        <p className="text-blue-gray-900 text-2xl font-bold capitalize leading-tight font-inter sm:text-[30px] sm:leading-[40.8px]">
          {/* Headline */}
          {t.rich("best-selling-headline", {
            span: (v) => <span className="text-custom-rose-900">{v}</span>,
          })}
        </p>

        {/* Description */}
        <p className="text-blue-gray-500 text-base font-normal leading-[28.8px] font-roboto">
          {t("best-seller-paragraph")}
        </p>
      </div>

      {/* Explore more button */}
      <Button
        asChild
        className="bg-custom-rose-900 h-[49px] w-[158px] rounded-[10px] py-[10px] px-5 hover:bg-custom-rose-800 font-roboto"
      >
        {/* Explore more link */}
        <Link href="/category">
          {/* Text */}
          {t("explore-more")}

          {/* Icon */}
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
