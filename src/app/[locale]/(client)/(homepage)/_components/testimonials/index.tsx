import React from "react";
import Image from "next/image";
import CarouselSlider from "./components/comments-slider";

export default function TestimonialSection() {
  return (
    <>
      <section className="relative px-4 py-6 md:px-0 md:py-10 xl:py-20 my-6 md:my-10 xl:my-20">
        <div className="container mx-auto">
          <div>
            {/* Comments Slider */}
            <CarouselSlider />

            {/* Section Background Image */}
            <Image
              src={`/assets/images/testimonials-background.png`}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
