"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { BsHandbag } from "react-icons/bs";
import { FaRegEye, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa6";
import { useFormatter } from "next-intl";
import { Link } from "@/i18n/routing";
import { useAddToCart } from "@/hooks/products/use-add-to-cart";
import { useSession } from "next-auth/react";
import AuthDialog from "../auth/auth-dialog";
import { ProductType } from "@/lib/types/product";

type ProductCardProps = {
  product: ProductType;
  width?: string;
  height?: string;
};

export default function ProductCard({ product, width, height }: ProductCardProps) {
  // Translation
  const format = useFormatter();

  const isFixedSize = width && height;

  // Hooks
  const { data: session } = useSession();

  // Mutation
  const { mutate: addtoCart, isPending } = useAddToCart(product._id || "fallback-id");

  return (
    <Card className="h-full overflow-hidden rounded-[20px] flex-col flex" key={product.id}>
      {/* Card header */}
      <CardHeader className="group min-h-40 bg-main-color rounded-[20px] flex justify-center items-center mb-3 overflow-hidden relative flex-grow sm:min-h-60 sm:mb-4">
        {/* Image overlay */}
        <div className="absolute inset-0 bg-custom-rose-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"></div>

        {/* Product image */}
        <Image
          src={product.imgCover || "/assets/images/coming-soon.png"}
          alt={product.title || "Product Image"}
          {...(isFixedSize
            ? { width: Number(width), height: Number(height) }
            : {
                fill: true,
                sizes:
                  "(max-width: 374px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 150px, 222px",
              })}
          className="object-cover group-hover:opacity-70 transition-opacity duration-300"
        />

        {/* Action buttons */}
        <div className="absolute inset-0 flex justify-center items-center gap-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          {/*View Product Button */}
          <Link
            href={`/products/${product._id}`}
            className="bg-custom-rose-900 text-2xl w-10 h-10 rounded-full flex justify-center items-center text-white hover:bg-custom-rose-800"
          >
            <FaRegEye />
          </Link>

          {/* Add to wishlist button */}
          <Button className="bg-custom-rose-900 text-2xl w-10 h-10 rounded-full flex justify-center items-center text-white hover:bg-custom-rose-800">
            <FaRegHeart />
          </Button>
        </div>
      </CardHeader>

      {/* Product details */}
      <CardContent className="px-3 pb-4 sm:px-4">
        <div className="flex items-center justify-between gap-2">
          {/* Product information */}
          <div className="min-w-0 flex flex-col justify-start gap-1.5 sm:gap-[9px]">
            {/* Product title */}
            <h6 className="text-start text-sm font-semibold text-blue-gray-900 font-inter line-clamp-1 sm:text-[17px]">
              {product.title}
            </h6>

            {/* Product rating */}
            <div className="flex text-sm text-rate-color sm:text-xl">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < (product?.rating || 4) ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>

            {/* Product price */}
            <p className="text-sm text-flamingo font-medium text-start font-roboto sm:text-base">
              {format.number(product.priceAfterDiscount ?? product.price ?? 0, {
                style: "currency",
                currency: "USD",
              })}
              {product.priceAfterDiscount && (
                <span className="ms-1 line-through text-blue-gray-50">
                  {format.number(product.price ?? 0, {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              )}
            </p>
          </div>

          {/* TODO:Add to cart button */}
          {session ? (
            <Button
              className="text-white bg-custom-purple-900 w-9 h-9 shrink-0 rounded-full flex justify-center items-center hover:bg-custom-purple-800 sm:w-[42px] sm:h-[42px]"
              disabled={isPending}
              onClick={() => addtoCart(1)}
            >
              <BsHandbag />
            </Button>
          ) : (
            <AuthDialog>
              <Button
                className="text-white bg-custom-purple-900 w-9 h-9 shrink-0 rounded-full flex justify-center items-center hover:bg-custom-purple-800 sm:w-[42px] sm:h-[42px]"
                disabled={isPending}
                onClick={() => addtoCart(1)}
              >
                <BsHandbag />
              </Button>
            </AuthDialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
