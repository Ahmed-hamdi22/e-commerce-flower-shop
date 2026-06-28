"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import * as React from "react";

export default function SpecialGifts() {
  // Translation
  const t = useTranslations();

  return (
    <div className="grid  grid-cols-12 gap-5 mt-5">
      {/* First gift box */}
      <div className="col-span-4 relative rounded-[.9rem] h-[272px] overflow-hidden flex flex-col justify-center items-end  rtl:items-start">
        {/* Gift box image */}
        <Image className="flex" src="/img3.png" alt="" fill sizes="400px" />

        {/* Overlay content for the first gift box */}
        <div className="z-10 relative text-white  text-right mr-3">
          {/* Text First */}
          <h3 className="text-custom-rose-900">{t("gifts-box")}</h3>

          {/* Text Sec */}
          <h2 className="text-[20px] font-semibold  text-gray-900 capitalize leading-tight mt-4">
            {t.rich("gift-box-text", {
              br: () => <br />,
            })}
          </h2>

          {/* Button */}
          <Link href={`/products`}>
            <button className=" px-2 py-2 bg-custom-rose-900 text-white rounded-full mt-4">
              {t("shop-now")}
            </button>
          </Link>
        </div>
      </div>

      {/* Second gift box */}
      <div className="col-span-4 relative rounded-[.9rem] h-[272px] overflow-hidden  flex flex-col justify-center items-end rtl:items-start">
        {/* Gift box image */}
        <Image className="object-cover w-full" src="/img2.png" alt="" fill sizes="400px" />

        {/* Overlay content for the second gift box */}
        <div className="z-10 relative text-white text-right mr-3">
          {/* Text First */}
          <h3 className="text-custom-rose-900 mb-3">{t("occasion-gifts")}</h3>

          {/* Text Sec */}
          <h2 className="text-[20px] font-semibold text-gray-900 capitalize leading-tight">
            {t.rich("best occasion gifts", {
              br: () => <br />,
            })}
          </h2>

          {/* Button */}
          <Link href={`/products`}>
            <button className="px-2 py-2 bg-custom-rose-900 text-white rounded-full mt-8">
              {t("discover-now")}
            </button>
          </Link>
        </div>
      </div>

      {/* Third gift box */}
      <div className="col-span-4 relative rounded-[.9rem] h-[272px] overflow-hidden  flex flex-col justify-center items-end rtl:items-start">
        {/* Gift box image */}
        <Image className="object-cover w-full" src="/img1.png" alt="" fill sizes="400px" />

        {/* Overlay content for the third gift box */}
        <div className="z-10 relative text-white text-right mr-3">
          {/* Text First */}
          <h3 className="text-white mb-3">{t("occasion-gifts")}</h3>

          {/* Text Sec */}
          <h2 className="text-[20px] font-semibold text-gray-900 capitalize leading-tight">
            {t.rich("combo sets gift box", {
              br: () => <br />,
            })}
          </h2>

          {/* Button */}
          <Link href={`/products`}>
            <button className="px-2 py-2 bg-custom-rose-900 text-white rounded-full mt-8">
              {t("discover-now")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
