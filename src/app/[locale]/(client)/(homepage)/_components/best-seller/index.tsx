import React from "react";
import BestSellerContent from "./components/best-seller-content";
import BestSellerCarousel from "./components/best-seller-carousel";

export default function BestSeller() {
  return (
    <div className="grid grid-cols-1 gap-6 my-10 container px-4 sm:px-0 lg:grid-cols-4 lg:my-20">
      {/* About best sellers products */}
      <BestSellerContent />

      {/* Best seller products carousel */}
      <BestSellerCarousel />
    </div>
  );
}
