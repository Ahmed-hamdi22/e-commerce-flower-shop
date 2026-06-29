"use client";

import Image from "next/image";
import React from "react";
import { Link, usePathname } from "@/i18n/routing";
import {
  LuFlower,
  LuClipboardList,
  LuLayoutDashboard,
  LuCalendarHeart,
  LuPackage,
} from "react-icons/lu";
import { useTranslations } from "next-intl";

export default function NavigationSection() {
  // Translation
  const t = useTranslations();

  // Variables
  const p = usePathname();
  const iconClassName = "w-6 h-6";
  const navigationItems = [
    {
      icon: <LuLayoutDashboard className={iconClassName} />,
      label: t("overview"),
      href: "/dashboard",
    },
    {
      icon: <LuClipboardList className={iconClassName} />,
      label: t("categories"),
      href: "/dashboard/categories",
    },
    {
      icon: <LuCalendarHeart className={iconClassName} />,
      label: t("occasions"),
      href: "/dashboard/occasions",
    },
    {
      icon: <LuPackage className={iconClassName} />,
      label: t("products"),
      href: "/dashboard/products",
    },
  ];

  return (
    <div className="flex w-full items-center justify-center flex-col lg:w-56">
      {/* Logo */}
      <Link href="/dashboard" className="hidden lg:block">
        <Image src="/assets/images/logo.png" alt="rose-app-logo" width={86} height={0} />
      </Link>

      {/* Preview website */}
      <div className="mt-4 flex w-full flex-col gap-3 lg:mt-9 lg:w-56 lg:gap-4">
        <Link
          href="/"
          className="bg-custom-rose-900 capitalize mb-2 text-base flex justify-center items-center p-2 rounded-lg font-semibold text-white transition duration-300 hover:text-custom-rose-900 hover:bg-custom-rose-50"
        >
          <LuFlower className="w-6 h-6 mr-2 ml-0 rtl:ml-2 rtl:mr-0" />
          {t("preview-website")}
        </Link>

        {/* Navigation list */}
        {navigationItems.map((i, index) => {
          const isActive = p === i.href || (i.href !== "/dashboard" && p.startsWith(`${i.href}/`));
      
          return (
            <Link
              href={i.href}
              key={index}
              className={`
              text-base capitalize flex items-center p-2 rounded-lg font-bold
              transition duration-300
              ${
                isActive
                  ? "text-custom-rose-900 bg-custom-rose-50"
                  : "text-custom-black hover:text-custom-rose-900 hover:bg-custom-rose-50"
              }
            `}
            >
              <span
                className={`
                mr-2 ml-0 rtl:mr-0 rtl:ml-2
                ${isActive ? "text-custom-rose-900" : "text-current"}
              `}
              >
                {i.icon}
              </span>
              {i.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
