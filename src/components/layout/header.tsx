"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LocaleToggle from "@/components/common/toggle-locale";
import { useSession } from "next-auth/react";
import AuthDialog from "../features/auth/auth-dialog";
import ProfileIcon from "../common/profile-icon";
import { Button } from "../ui/button";
import { PackageCheck, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

function getCartQuantity(cart?: Cart) {
  if (!cart?.cartItems?.length) return 0;

  return cart.cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
}

export default function Header() {
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
    <header>
      <div className="container m-auto flex items-center justify-between ps-20">
        {/* Logo */}
        <Link href="/" className="relative block w-[86px] h-[86px] p-2">
          <Image
            src="/assets/images/logo.png"
            alt="Flower App"
            fill
            sizes="86px"
            className="object-contain"
          />
        </Link>

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
