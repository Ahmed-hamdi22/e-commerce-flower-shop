"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

type BreadcrumbPath = {
  title: string;
  href: string;
};

type HeaderProps = {
  paths?: BreadcrumbPath[];
};

export default function Header({ paths = [] }: HeaderProps) {
  // Translations
  const t = useTranslations();

  return (
    // Header container
    <div className="h-16 border-b border-custom-rose-100 bg-white flex items-center px-4">
      {/* Breadcrumb */}
      <Breadcrumb>
        {/* Breadcrumb list */}
        <BreadcrumbList>
          {paths.map((path, index) => {
            const isLast = index === paths.length - 1;
            const isOnly = paths.length === 1;

            if (isLast) {
              return (
                <BreadcrumbItem key={path.href}>
                  <BreadcrumbPage className={isOnly ? "text-gray-600" : "text-custom-rose-900"}>
                    {t(path.title)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              );
            }

            // Render item
            return (
              <React.Fragment key={path.href}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={path.href} className="text-gray-600 hover:text-gray-900">
                      {t(path.title)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
