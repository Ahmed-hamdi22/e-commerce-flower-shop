"use client";

import { TfiReload } from "react-icons/tfi";
import { BsHeadset, BsTruck } from "react-icons/bs";
import { LuWalletMinimal } from "react-icons/lu";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import * as React from "react";
import SpecialGifts from "@/app/[locale]/(client)/(homepage)/_components/categories/special-gifts";
import CarouselDotsSlider from "./carousel-dots-slider";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type CategoriesPropes = {
  categories: Category[];
};

export default function Categories({ categories }: CategoriesPropes) {
  // Translation
  const t = useTranslations();

  return (
    <div className="container px-4 sm:px-0">
      {/* Categories Carousel */}
      <Carousel>
        <CarouselContent className="flex flex-row py-5">
          {categories.map((category) => (
            <CarouselItem key={category._id} className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
              <Link href={`/products/${category.slug}`}>
                <div className="bg-custom-rose-50 rounded-xl  flex items-center p-4 gap-3">
                  {/* Category icon */}
                  <div className="w-16 h-16  bg-custom-rose-900 rounded-full flex items-center justify-center">
                    <Image
                      height={400}
                      width={400}
                      src={category.image}
                      alt={category.name}
                      className="w-10 h-10 ilter brightness-0 invert"
                    />
                  </div>

                  {/* Category details */}
                  <div>
                    <h3 className="text-sm font-semibold capitalize">{category.name}</h3>
                    <p className="text-xs text-gray-500">
                      {t("items", {
                        count: category.productsCount,
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Section Special Gifts  and  slider */}
      <CarouselDotsSlider />

      {/* Section  Gift*/}
      <SpecialGifts />

      {/* Section Features */}
      <div className="bg-custom-rose-50 mt-12 grid grid-cols-1 gap-5 p-5 rounded-[.9rem] sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:p-10">
        {/* Feature 1 */}
        <div className="flex items-center gap-3">
          <div className="bg-custom-rose-900 p-3 rounded-full ">
            {/* Icon */}
            <BsTruck className="w-6 h-6 text-white" />
          </div>

          {/* Text */}
          <p className="text-gray-500">
            <span className="font-bold text-gray-800">{t("free-delivery")}</span>
            <br /> <span className="text-sm"> {t("orders-over-120")}</span>
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center gap-3">
          <div className="bg-custom-rose-900 p-3 rounded-full">
            {/* Icon */}
            <TfiReload className="w-6 h-6 text-white " />
          </div>

          {/* Text */}
          <p className="text-gray-500">
            <span className="font-bold text-gray-800">{t("get-refund")}</span>
            <br />
            <span className="text-sm"> {t("within-30-days-returns")}</span>
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center gap-3">
          <div className="bg-custom-rose-900 p-3 rounded-full ">
            {/* Icon */}
            <LuWalletMinimal className="w-6 h-6  text-white" />
          </div>

          {/* Text */}
          <p className="text-gray-500">
            <span className="font-bold text-gray-800">{t("safe-payment")}</span>
            <br /> <span className="text-sm"> {t("100-secure-payment")}</span>
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex items-center gap-3">
          <div className="bg-custom-rose-900 p-3 rounded-full ">
            {/* Icon */}
            <BsHeadset className="w-6 h-6  text-white" />
          </div>

          {/* Text */}
          <p className="text-gray-500">
            <span className="font-bold text-gray-800">{t("24-7-support")}</span>
            <br /> <span className="text-sm"> {t("feel-free-to-call-us")}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
