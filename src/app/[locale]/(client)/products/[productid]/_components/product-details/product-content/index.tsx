import React from "react";
import Content from "./_components/content";
import QuantitySelector from "./_components/quantity-selector";

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
  maxQuantity: number;
  productid: string;
};

export default function ProductContent({ product, maxQuantity, productid }: Productprops) {
  return (
    <>
      {/* Product content */}
      <Content product={product} />

      {/* Quantity selector */}
      <QuantitySelector maxQuantity={maxQuantity} productid={productid} />
    </>
  );
}
