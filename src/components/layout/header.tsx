"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LocaleToggle from "@/components/common/toggle-locale";
import { useSession } from "next-auth/react";
import AuthDialog from "../features/auth/auth-dialog";
import ProfileIcon from "../common/profile-icon";
import { Button } from "../ui/button";
import { Menu, PackageCheck, ShoppingCart, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function getCartQuantity(cart?: Cart) {
  if (!cart?.cartItems?.length) return 0;

  return cart.cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Translation
  const t = useTranslations();

  // Hooks
  const { data: session } = useSession();
  const { data: cartPayload } = useQuery<{ cart?: Cart }>({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");

      if (!response.ok) throw new Error("Failed to fetch cart");

      return response.json();
    },
    enabled: Boolean(session),
  });

  const cartQuantity = getCartQuantity(cartPayload?.cart);

  return (
    <header className="relative z-40 bg-white">
      <div className="container m-auto flex min-h-[72px] items-center justify-between px-4 sm:px-6 lg:min-h-[86px] lg:ps-20 lg:pe-0">
        {/* Logo */}
        <Link href="/" className="relative block h-16 w-16 shrink-0 p-2 lg:h-[86px] lg:w-[86px]">
          <Image
            src="/assets/images/logo.png"
            alt="Flower App"
            fill
            sizes="86px"
            className="object-contain"
          />
        </Link>

        {/* Navigation links */}
        <div className="hidden gap-6 text-base font-medium text-blue-gray-900 lg:flex">
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

        <div className="flex items-center gap-3 lg:gap-5">
          {/* Icons if session is exist */}
          {session && (
            <>
              <Link href="/orders" aria-label={t("orders")}>
                <PackageCheck className="w-5 h-5 text-custom-rose-900" />
              </Link>
              <Link href="/cart" aria-label={t("view-cart")} className="relative">
                <ShoppingCart className="w-5 h-5 text-custom-rose-900" />
                {cartQuantity > 0 && (
                  <span className="absolute -right-2 -top-3 flex min-w-5 h-5 items-center justify-center rounded-full bg-custom-rose-900 px-1 text-[11px] font-semibold leading-none text-white">
                    {cartQuantity}
                  </span>
                )}
              </Link>
              <LocaleToggle />
              <ProfileIcon
                links={[
                  { href: "/profile", label: "profile" },
                  { href: "/orders", label: "orders" },
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
                    className="hidden text-custom-rose-900 hover:bg-custom-rose-900 hover:text-white sm:inline-flex"
                  >
                    {t("login")}
                  </Button>
                </AuthDialog>
              </>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
            className="h-10 w-10 rounded-xl border-custom-rose-200 text-custom-rose-900 lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={`border-t border-custom-rose-100 bg-white px-4 py-4 shadow-sm lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="container flex flex-col gap-1 text-base font-medium text-blue-gray-900">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-xl px-3 py-3 text-custom-rose-900 transition-colors hover:bg-custom-rose-50"
          >
            {t("home")}
          </Link>
          <Link
            href="/products"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-xl px-3 py-3 transition-colors hover:bg-custom-rose-50 hover:text-custom-rose-900"
          >
            {t("all-products")}
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-xl px-3 py-3 transition-colors hover:bg-custom-rose-50 hover:text-custom-rose-900"
          >
            {t("about-us")}
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-xl px-3 py-3 transition-colors hover:bg-custom-rose-50 hover:text-custom-rose-900"
          >
            {t("contact")}
          </Link>

          {session ? (
            <>
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3 transition-colors hover:bg-custom-rose-50 hover:text-custom-rose-900"
              >
                {t("profile")}
              </Link>
              <Link
                href="/orders"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3 transition-colors hover:bg-custom-rose-50 hover:text-custom-rose-900"
              >
                {t("orders")}
              </Link>
            </>
          ) : (
            <AuthDialog>
              <Button
                variant="outline"
                className="mt-2 w-full justify-center rounded-xl text-custom-rose-900 hover:bg-custom-rose-900 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("login")}
              </Button>
            </AuthDialog>
          )}
        </nav>
      </div>
    </header>
  );
}
