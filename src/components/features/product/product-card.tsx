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
    <Card className="rounded-[20px] flex-col flex " key={product.id}>
      {/* Card header */}
      <CardHeader className="group min-h-60 bg-main-color rounded-[20px] flex justify-center items-center mb-4 overflow-hidden relative flex-grow">
        {/* Image overlay */}
        <div className="absolute inset-0 bg-custom-rose-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"></div>

        {/* Product image */}
        <Image
          src={product.imgCover || "/placeholder.jpg"}
          alt={product.title || "Product Image"}
          {...(isFixedSize
            ? { width: Number(width), height: Number(height) }
            : {
                fill: true,
                sizes: "(max-width: 640px) 100px, (max-width: 1024px) 150px, 222px",
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
      <CardContent className="px-4">
        <div className="flex justify-between items-center">
          {/* Product information */}
          <div className="flex flex-col justify-start gap-[9px]">
            {/* Product title */}
            <h6 className="text-start text-[17px] font-semibold text-blue-gray-900 font-inter line-clamp-1">
              {product.title}
            </h6>

            {/* Product rating */}
            <div className="flex text-xl text-rate-color">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < (product?.rating || 4) ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>

            {/* Product price */}
            <p className="text-base text-flamingo font-medium text-start font-roboto">
              {format.number(product.priceAfterDiscount ?? product.price ?? 0, {
                style: "currency",
                currency: "USD",
              })}
              {product.priceAfterDiscount && (
                <span className="line-through text-blue-gray-50">
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
              className="text-white bg-custom-purple-900 w-[42px] h-[42px] rounded-full flex justify-center items-center hover:bg-custom-purple-800"
              disabled={isPending}
              onClick={() => addtoCart(1)}
            >
              <BsHandbag />
            </Button>
          ) : (
            <AuthDialog>
              <Button
                className="text-white bg-custom-purple-900 w-[42px] h-[42px] rounded-full flex justify-center items-center hover:bg-custom-purple-800"
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
