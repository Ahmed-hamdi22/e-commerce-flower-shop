import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FaArrowLeftLong, FaArrowRightLong, FaCheck } from "react-icons/fa6";

export default function AboutUsContent() {
  // Translation
  const t = useTranslations();

  // Common style for the check icon in the features/offers section
  const checkIconStyles =
    "bg-custom-purple-900 text-white w-[42px] h-[42px] rounded-full flex justify-center items-center";

  // List of features/offers to be displayed in the about us section
  const aboutUsOffers = [
    t("streamlined-shipping-experience"),
    t("affordable-modern-design"),
    t("competitive-price-and-easy-to-shop"),
    t("we-made-awesome-products"),
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Section title */}
      <h6
        className="text-[17px] font-bold uppercase text-custom-rose-900"
        style={{ letterSpacing: "4px" }}
      >
        {t("about-us")}
      </h6>

      {/* Introductory content */}
      <div>
        {/* Main title with highlighted words */}
        <p className="text-blue-gray-900 text-2xl font-bold max-w-full sm:text-3xl lg:w-[603px]">
          {t.rich("about-us-headline", {
            span: (v) => <span className="text-custom-rose-900">{v}</span>,
          })}
        </p>

        {/* Subtitle/Description */}
        <p className="text-blue-gray-500 max-w-full mt-2 lg:w-[631px]">{t("about-us-paragraph")}</p>
      </div>

      {/* Discover more button */}
      <Button
        asChild
        className="bg-custom-rose-900 h-[49px] w-[167px] rounded-[10px] py-[10px] px-5 hover:bg-custom-rose-800"
      >
        <Link href="/about">
          {t("discover-more")}
          {/* Arrow right icon for ltr */}
          <span className="ltr:inline rtl:hidden">
            <FaArrowRightLong />
          </span>

          {/* Arrow left icon for rtl */}
          <span className="rtl:inline ltr:hidden">
            <FaArrowLeftLong />
          </span>
        </Link>
      </Button>

      {/* About us features/offers */}
      <div className="about-us-offers grid grid-cols-1 gap-2 sm:grid-cols-2">
        {aboutUsOffers.map((offer, index) => (
          <div key={index} className="mb-2 flex justify-start items-center">
            {/* Check Icon */}
            <div className={`${checkIconStyles} mr-[13.5px] rtl:ml-[13.5px]`}>
              <FaCheck />
            </div>

            {/* Feature text */}
            <p className="text-xs font-medium">{offer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
