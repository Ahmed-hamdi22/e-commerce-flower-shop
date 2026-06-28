"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { FaLocationDot, FaPhoneVolume } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

export default function ContactIcons() {
  // Translation
  const t = useTranslations();

  return (
    <div className="w-[348px] h-[440px] shadow-[0px_1px_30px_0px_rgba(122,30,34,0.1)] rounded-[20px] pl-6 pt-10 flex flex-col gap-16 ">
      {/* Call */}
      <div className="flex gap-4">
        {/* Icon */}
        <div className="w-[70px] h-[70px] border-[1px] rounded-[10px] border-custom-rose-900 flex justify-center items-center ">
          <FaPhoneVolume className="w-[30px] h-[41px] text-custom-rose-900 " />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold text-custom-rose-900">{t("call-anytime")} </p>
          <p className="text-base font-medium text-[#111111]">241-373-2123</p>
        </div>
      </div>

      {/* Email */}
      <div className="flex gap-4">
        {/* Icon */}
        <div className="w-[70px] h-[70px] border-[1px] rounded-[10px] border-custom-rose-900 flex justify-center items-center ">
          <HiOutlineMail className="w-[30px] h-[41px] text-custom-rose-900 " />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold text-custom-rose-900">{t("send-email")}</p>
          <p className="text-base font-medium text-[#111111]">{t("dwight63-gmail-com")}</p>
        </div>
      </div>

      {/* Location part */}
      <div className="flex gap-4">
        {/* Icon */}
        <div className="w-[70px] h-[70px] border-[1px] rounded-[10px] border-custom-rose-900 flex justify-center items-center ">
          <FaLocationDot className="w-[30px] h-[41px] text-custom-rose-900 " />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xl font-bold text-custom-rose-900">{t("visit-us")}</p>
          <p className="text-base font-medium text-[#111111]">
            {t("20-island-park-road")}
            <br />
            {t("new-jearsy-new-york-usa")}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
