import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";
import EmptyCart from "./_components/empty-cart";
import { getCart } from "@/app/api/get-cart";
import CardItemComponent from "./_components/card-item-component";
import CartSummary from "./_components/cart-summary";
import CartItemMobileCard from "./_components/cart-item-mobile-card";

export default async function Cart() {
  // Translation
  const t = await getTranslations();

  // Get cart
  const { cart } = await getCart();

  if (!cart?.cartItems.length) return <EmptyCart />;

  return (
    <section className="container flex flex-col justify-between gap-6 px-4 my-8 sm:px-6 lg:flex-row lg:gap-3 lg:px-0 lg:my-10">
      <div className="flex min-w-0 flex-col flex-1 gap-4 lg:gap-3">
        <div className="flex flex-col gap-3 lg:hidden">
          {cart?.cartItems.map(
            (item: { product: Product; price: number; quantity: number; _id: string }) => (
              <CartItemMobileCard key={item.product._id} item={item} />
            ),
          )}
        </div>

        {/* Table */}
        <table className="hidden min-w-[55rem] text-center lg:table">
          {/* Header */}
          <thead>
            <tr className="  uppercase   font-semibold space-x-2 ">
              <th>
                <p className=" text-sm border-b-2 pb-2 mx-2 border-gray-300">{t("image")}</p>
              </th>
              <th>
                <p className=" text-sm border-b-2 pb-2 mx-2 border-gray-300">{t("name")}</p>
              </th>
              <th>
                <p className=" text-sm border-b-2 pb-2 mx-2 border-gray-300">{t("price")}</p>
              </th>
              <th>
                <p className=" text-sm border-b-2 pb-2 mx-2 border-gray-300"> {t("quantity")}</p>
              </th>
              <th>
                <p className=" text-sm border-b-2 pb-2 mx-2 border-gray-300"> {t("total-0")}</p>
              </th>
              <th>
                <p className=" text-sm border-b-2 pb-2 mx-2 border-gray-300"> {t("remove")}</p>
              </th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {cart?.cartItems.map(
              (item: { product: Product; price: number; quantity: number; _id: string }) => (
                <CardItemComponent key={item.product._id} item={item} />
              ),
            )}
          </tbody>
        </table>
        {/* Button */}
        <div className="flex justify-center">
          <Link
            href="/all-products"
            className="w-full h-[50px] text-white text-base rounded-lg font-medium bg-custom-rose-900 text-center flex justify-center items-center gap-1 sm:w-[200px]"
          >
            <ArrowLeft size={20} className="rtl:-scale-x-100" />
            {t("continue-shopping")}
          </Link>
        </div>
      </div>
      <CartSummary cart={cart!} />
    </section>
  );
}
