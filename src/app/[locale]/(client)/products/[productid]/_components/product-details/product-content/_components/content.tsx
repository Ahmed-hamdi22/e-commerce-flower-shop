import React from "react";
import { getFormatter, getTranslations } from "next-intl/server";
import QuantitySelector from "./quantity-selector";

type Product = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  priceAfterDiscount?: number;
  discount?: number;
  quantity: number;
};

type Productprops = {
  product: Product;
};

export default async function Content({ product }: Productprops) {
  const t = await getTranslations();
  const format = await getFormatter();

  return (
    <div className="flex flex-col w-[550px]">
      <div className="flex flex-col">
        {/* Product title */}
        <h2 className="text-[25px] font-semibold">{product.title}</h2>

        {/* Details */}
        <div className="flex gap-[5px] items-center mt-4">
          {/* Product price */}
          <p className="text-gray-600 line-through text-[18px] font-medium">
            {format.number(product.price ?? 0, {
              currency: "USD",
              style: "currency",
            })}
          </p>

          {/* Price after discount */}
          {product.priceAfterDiscount !== undefined && (
            <p className="text-custom-rose-900 text-[23px] font-medium">
              {format.number(product.priceAfterDiscount ?? 0, {
                currency: "USD",
                style: "currency",
              })}
            </p>
          )}

          {/* Product discount */}
          {product.discount !== undefined && (
            <p className="text-red-500 text-[15px] font-medium">
              {format.number(product.discount ?? 0, {
                style: "percent",
              })}
              {t("off")}
            </p>
          )}
        </div>

        {/* Product description */}
        {product.description && (
          <p className="text-[#757F95] text-[16px] font-normal leading-[28.8px] mt-5">
            {product.description}
          </p>
        )}

        {/* Stock status */}
        <li className="text-[16px] font-medium gap-2 text-blue-gray-500 mt-4">
          {t("stock")}:{" "}
          {product.quantity > 0 ? (
            <span className="text-[16px] font-normal text-blue-gray-500">{t("in-stock")}</span>
          ) : (
            <span className="text-red-500">{t("out-of-stock")}</span>
          )}
        </li>
      </div>

      {/* Check quantity && Quantity selector */}
      <div className="mt-4">
        {product.quantity > 0 && (
          <QuantitySelector maxQuantity={product.quantity ?? 0} productid={product._id} />
        )}
      </div>
    </div>
  );
}
