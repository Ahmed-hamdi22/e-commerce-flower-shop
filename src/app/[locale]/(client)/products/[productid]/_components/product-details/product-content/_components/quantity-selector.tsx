"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoLockClosedOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { useAddToCart } from "@/hooks/products/use-add-to-cart";
import { useSession } from "next-auth/react";
import AuthDialog from "@/components/features/auth/auth-dialog";

type QuantitySelectorProps = {
  maxQuantity: number;
  productid: string;
};

export default function QuantitySelector({ productid, maxQuantity }: QuantitySelectorProps) {
  // Translations
  const t = useTranslations();

  // State
  const [quantity, setQuantity] = useState(1);

  // Hooks
  const { data: session } = useSession();

  // Mutation
  const { mutate: addtoCart, isPending } = useAddToCart(productid);

  // Functions
  const increaseQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
      {/* Quantity selector ui*/}
      <div className="flex flex-col gap-[16px]">
        <p className="text-[16px] font-medium text-blue-gray-500 ">{t("quantity")}</p>
        <div className="flex items-center ">
          {/* Decrease quantity button */}
          <button
            type="button"
            className=" w-[35px] h-[35px] rounded-[50px] bg-main-color "
            onClick={decreaseQuantity}
          >
            <span className="text-custom-rose-900 w-[12.46px] h-[1.4px] rounded-full">−</span>
          </button>

          {/* Quantity */}
          <span className="w-[30.8px] h-[30.8px] text-[16px] font-normal  text-custom-rose-900 flex items-center justify-center">
            {quantity}
          </span>

          {/* Increase quantity button */}
          <button
            type="button"
            className=" w-[35px] h-[35px] rounded-[50px] bg-main-color"
            onClick={increaseQuantity}
          >
            <span className="text-custom-rose-900 w-[12.46px] h-[1.4px] rounded-full">+</span>
          </button>
        </div>
      </div>

      {/* Add to cart button */}
      <div className="w-full sm:w-auto">
        {session ? (
          <Button
            disabled={isPending}
            onClick={() => addtoCart(quantity)}
            className="w-full h-[45px] bg-custom-rose-900 text-[16px] font-medium rounded-[10px] flex items-center justify-center gap-2 sm:mt-7 sm:w-[144px]"
          >
            <IoLockClosedOutline className="w-[14px] h-[16px]" />
            {t("add-to-cart")}
          </Button>
        ) : (
          <AuthDialog>
            <Button
              disabled={isPending}
              className="w-full h-[45px] bg-custom-rose-900 text-[16px] font-medium rounded-[10px] flex items-center justify-center gap-2 sm:mt-7 sm:w-[144px]"
            >
              <IoLockClosedOutline className="w-[14px] h-[16px]" />
              {t("add-to-cart")}
            </Button>
          </AuthDialog>
        )}
      </div>
    </div>
  );
}
