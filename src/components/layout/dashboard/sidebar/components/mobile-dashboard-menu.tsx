"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import NavigationSection from "./navigation-section";
import UserSection from "./user-section";

export default function MobileDashboardMenu({ userData }: { userData?: User }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-custom-rose-100 bg-white px-4">
        <Link href="/dashboard" className="flex items-center">
          <Image src="/assets/images/logo.png" alt="rose-app-logo" width={54} height={54} />
        </Link>

        <button
          type="button"
          aria-label={isOpen ? "Close dashboard menu" : "Open dashboard menu"}
          className="rounded-lg border border-custom-rose-100 p-2 text-custom-rose-900"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 pt-16" onClick={() => setIsOpen(false)}>
          <div
            className="flex h-[calc(100vh-4rem)] w-[min(20rem,88vw)] flex-col justify-between overflow-y-auto border-r border-custom-rose-100 bg-custom-rose-25 p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <NavigationSection />
            <UserSection userData={userData} />
          </div>
        </div>
      )}
    </div>
  );
}
