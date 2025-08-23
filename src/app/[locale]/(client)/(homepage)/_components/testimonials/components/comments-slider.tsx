"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import CommentIcon from "@/../public/assets/images/comments/comment-icon.png";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarDemo } from "./comment-avatar";
import { FaStar } from "react-icons/fa6";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/use-media-query";
import CarouselDots from "./carousel-dots";

export default function CarouselSlider() {
  const t = useTranslations();

  // States For Dots Implementation
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  // Handle dots count in various screens
  const isMedium = useMediaQuery("(min-width: 768px)");
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const isXLarge = useMediaQuery("(min-width: 1280px)");

  const getVisibleItems = () => {
    if (isXLarge) return 4;
    if (isLarge) return 3;
    if (isMedium) return 2;
    return 1;
  };

  const visibleItems = getVisibleItems();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api]);

  // Dots Click Handler
  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <>
      <Carousel opts={{ align: "start" }} className="w-full relative z-10" setApi={setApi}>
        {/* The Container of carousel content */}
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, i) => (
            // Carousel Items
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 ">
              <div className="p-1">
                <Card className="border-none rounded-[100px] ltr:rounded-tl-[50px] rtl:rounded-tr-[50px] bg-white">
                  <CardContent className="flex flex-col aspect-square p-6 box">
                    {/* User Avatar & User Name */}
                    <div className="flex justify-between items-center max-w-[223px] mb-6">
                      <div className="relative w-[60px] h-[60px] flex justify-center items-center">
                        {/* Avatar Rose Frame */}
                        <div className="avatar-frame absolute inset-[-1px] rounded-full bg-transparent"></div>
                        {/* Avatar */}
                        <span className="relative w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center overflow-hiddn">
                          <AvatarDemo
                            ImageSrc={`/assets/images/comments/comment-avatar-${i + 1}.jpg`}
                          />
                        </span>
                      </div>
                      {/* Name */}
                      <div>
                        <h3 className="text-[17px] text-blue-gray-900 font-inter font-bold">
                          Ahmed Mohamed
                        </h3>
                        <h4 className="text-[17px] text-custom-rose-900 font-inter font-bold">
                          {t("customer")}
                        </h4>
                      </div>
                    </div>

                    {/* Line as a decoration */}
                    <div className="bg-[#757F95] border-[0.5px]"></div>

                    {/* The Comment */}
                    <div className="py-6">
                      <p className="text-sm text-blue-gray-500 font-inter font-normal leading-[18px]">
                        {t(
                          "this-was-my-first-purchase-from-this-brand-and-i-am-very-happy-with-my-choice-the-product-exceeded-my-expectations-being-both-durable-and-easy-to-use-the-packaging-was-neat-and-the-instructions-were-clear-iwill-definitely-buy-again",
                        )}
                      </p>
                    </div>

                    {/* Stars & Comment Icon */}
                    <div className="flex justify-between items-center pe-4">
                      {/* List Rate Stars */}
                      <ul className="flex justify-start gap-1">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <li key={i}>
                            <FaStar className="text-custom-rose-900 w-[17px]" />
                          </li>
                        ))}
                      </ul>
                      {/* The Comment Icon */}
                      <div>
                        <Image src={CommentIcon || "/placeholder.svg"} alt="Comment Icon" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Scroll to Previous Button */}
        <CarouselPrevious className="absolute ltr:left-1 rtl:left-[97.25%] rtl:rotate-180 text-white bg-custom-rose-900 hover:bg-custom-rose-600 hover:text-none" />
        {/* Scroll to Next Button */}
        <CarouselNext className="absolute ltr:right-1 rtl:right-[97.25%] rtl:rotate-180 text-white bg-custom-rose-900 hover:bg-custom-rose-600 hover:text-none" />
      </Carousel>

      {/* Dots Buttons */}
      <CarouselDots
        totalItems={5}
        visibleItems={visibleItems}
        activeIndex={activeIndex}
        onDotClick={handleDotClick}
      />
    </>
  );
}
