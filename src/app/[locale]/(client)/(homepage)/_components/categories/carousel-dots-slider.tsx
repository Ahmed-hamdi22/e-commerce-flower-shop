"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import * as React from "react";
import { CarouselDots } from "@/components/ui/carousel-dots";
import { cn } from "@/lib/utils";
import ArrowRight from "@/components/common/arrow-right";

export default function CarouselDotsSlider() {
  // Translation
  const t = useTranslations();

  // State
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Initialize state and event listener when API is available
  React.useEffect(() => {
    if (!api) {
      return;
    }
    // Set the total number of slides
    setCount(api.scrollSnapList().length);
    // Set the initially selected slide
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Card */}
      <div className="relative rounded-[.9rem] overflow-hidden flex min-h-[220px] flex-col justify-end lg:col-span-3 lg:min-h-0">
        {/* Image */}
        <Image
          className="object-cover"
          src="/red-christmas-gifts-with-white-ribbon.png"
          alt=""
          fill
          sizes="400px"
        />

        {/* Content */}
        <div className="z-10 relative px-4 py-5 text-white space-y-2 sm:py-6">
          {/* Start price */}
          <span className="text-md font-semibold text-custom-rose-900 ltr:tracking-[0.25em]">
            {t("start-10-99")}
          </span>

          {/* Text */}
          <p className="text-xl font-bold text-gray-800 capitalize sm:text-2xl">
            {t.rich("landing-slider-card-title", {
              br: () => <br />,
            })}
          </p>

          {/* Button */}
          <Link
            href={`/products`}
            className="w-fit flex items-center gap-2 px-4 py-2.5 bg-custom-rose-900 text-white rounded-lg sm:px-5 sm:py-3"
          >
            {t("shop-now")} <ArrowRight />
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ align: "start", loop: true }}
        setApi={setApi}
        className="overflow-hidden rounded-[.9rem] w-full lg:col-span-9"
      >
        <CarouselContent>
          {/* Map for img slider  */}
          {["/slider1.jpg", "/slider2.png", "/slider3.jpg"].map((img, idx) => (
            <CarouselItem key={idx} className="relative min-w-full">
              {/* Image */}
              <Image
                className="w-full h-[340px] object-cover sm:h-[380px] lg:h-[428px]"
                src={img}
                alt="Slide"
                width={400}
                height={400}
                priority={idx === 0}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-start px-5 text-white sm:px-8 lg:px-10">
                {/* Text Gift Shop */}
                <span className="text-md font-bold text-custom-rose-900 ltr:tracking-[0.25em]">
                  {t("best-gift-shop")}
                </span>
                <p className="font-bold text-blue-gray-900 text-[2rem] max-w-full capitalize leading-tight mt-4 sm:text-[2.35rem] lg:text-[2.75rem] lg:max-w-[55%] lg:mt-5">
                  {t.rich("landing-slider-title", {
                    span: (v) => <span className="text-custom-rose-900">{v}</span>,
                  })}
                </p>

                {/* Text */}
                <p className="text-gray-600 mb-2 mt-4 max-w-[92%] text-sm sm:text-base lg:mt-5">
                  {t("we-have-the-best-gifts-and-the-best-departments")}
                </p>

                {/* Text */}
                <p className="text-gray-600 mb-2 max-w-[92%] text-sm sm:text-base">
                  {t("choose-the-best-gifts-for-occasions-from-several-categories")}
                </p>

                {/* Button */}
                <Link
                  href={`/products`}
                  className="px-4 py-2.5 bg-custom-rose-900 text-white rounded-lg flex items-center gap-2 mt-5 sm:px-5 sm:py-3 lg:mt-[2rem]"
                >
                  {t("shop-now")} <ArrowRight />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute hidden rtl:-bottom-1 rtl:ms-12 -left-15 right-12 me-12 -top-15 bottom-3 bg-white text-black p-2 rounded-full sm:flex" />
        <CarouselNext className="hidden right-12 -top-15 bottom-3 rtl:-bottom-1 bg-white text-black p-2 rounded-full sm:flex" />

        {/* Dots Buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center ">
          <CarouselDots
            totalSlides={count}
            currentSlide={current}
            onDotClick={(index) => api?.scrollTo(index)}
            className="my-4"
            dotClassName={(index) =>
              cn(
                "w-2 h-2 rounded-full transition-all  rtl:m-2 ",
                current === index ? "bg-custom-rose-900 w-5  " : "bg-custom-rose-900 ",
              )
            }
          />
        </div>
      </Carousel>
    </div>
  );
}
