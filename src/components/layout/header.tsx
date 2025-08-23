"use client";

import Image from "next/image";
import { IoLockClosedOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LocaleToggle from "@/components/common/toggle-locale";
import { useSession } from "next-auth/react";
import AuthDialog from "../features/auth/auth-dialog";
import { BsCartCheck } from "react-icons/bs";
import ProfileIcon from "../common/profile-icon";
import { Button } from "../ui/button";

export default function Header() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { data: session } = useSession();

  return (
    <header>
      <div className="container m-auto flex items-center justify-between ps-20">
        {/* Logo */}
        <Image
          src="/assets/images/logo.png"
          alt="Flower App"
          width={86}
          height={0}
          className="p-2"
        />

        {/* Navigation links */}
        <div className="flex gap-6 text-base font-medium text-blue-gray-900">
          <Link href="/" className="transition-colors text-custom-rose-900">
            {t("home")}
          </Link>
          <Link href="/products" className="transition-colors hover:text-custom-rose-900">
            {t("all-products")}
          </Link>
          <Link href="/about" className="transition-colors hover:text-custom-rose-900">
            {t("about-us")}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-custom-rose-900">
            {t("contact")}
          </Link>
        </div>

        <div className="flex gap-5">
          {/* Icons if session is exist */}
          {session && (
            <>
              <Link href="/orders">
                <BsCartCheck className="w-5 h-5 text-custom-rose-900" />
              </Link>
              <Link href="/cart">
                <IoLockClosedOutline className="w-[30px] h-5 text-custom-rose-900" />
              </Link>
              <LocaleToggle />
              <ProfileIcon
                links={[
                  { href: "/profile", label: "profile" },
                  { href: "/order", label: "orders" },
                  { href: "/dashboard", label: "dashboard" },
                ]}
                showSignOut={true}
              />
            </>
          )}

          {/* Login button and search icon if session is not exist) */}
          <div className="flex items-center gap-5">
            {!session && (
              <>
                <LocaleToggle />
                <AuthDialog>
                  <Button
                    variant="outline"
                    className="text-custom-rose-900 hover:bg-custom-rose-900 hover:text-white"
                  >
                    {t("login")}
                  </Button>
                </AuthDialog>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
