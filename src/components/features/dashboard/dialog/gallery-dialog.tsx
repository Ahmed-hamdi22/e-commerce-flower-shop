"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CarouselDots } from "@/components/ui/carousel-dots";
import { useTranslations } from "use-intl";

// Type
type GalleryProps = {
  isOpen: boolean;
  onClose: () => void;
  images: string | string[];
};
export function GalleryCarouselDialog({ isOpen, onClose, images }: GalleryProps) {
  // Translation
  const t = useTranslations();
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  const dialogImages = typeof images === "string" ? [images] : images;

  // UseEffect to handle carousel
  useEffect(() => {
    if (!api) return;
    // Get current index
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };
    //Listen change events
    api.on("select", onSelect);
    onSelect();
    // Clenup event listener
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Main dialog content */}
      <DialogContent className="max-w-4xl bg-white rounded-3xl shadow-lg rtl:flex-row-reverse">
        {/* Header read on server only */}
        <DialogHeader className="sr-only">
          <DialogTitle>{t("image-gallery")}</DialogTitle>
          <DialogDescription>{t("image-description")}</DialogDescription>
        </DialogHeader>
        {/* Image carousel */}
        <Carousel
          opts={{
            align: "center",
          }}
          setApi={setApi}
          className="w-full"
        >
          <div className="relative  my-8">
            {/* Carousel images */}
            <CarouselContent className="w-[789px] h-[480px]">
              {dialogImages.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={src}
                      alt={`category-image-${index}`}
                      fill
                      sizes="(max-width: 1024px) 90vw, 789px"
                      className="object-contain rounded-2xl "
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Controls */}
            <div className="relative mt-5  ">
              {/* Navigation dots*/}
              <CarouselDots
                totalSlides={images.length}
                currentSlide={currentIndex}
                onDotClick={(index) => api?.scrollTo(index)}
                dotClassName={(index) =>
                  `w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-custom-rose-900" : "bg-gray-300"
                  }`
                }
                className="mb-4 rtl:flex-row-reverse"
              />
              {/* Arrows */}
              <div className="absolute end-12 rtl:flex-row-reverse">
                <CarouselPrevious className="gap-0 rounded-full border border-rose-300 text-rose-500 hover:bg-rose-100" />
                <CarouselNext className="gap-0 rounded-full border border-rose-300 text-rose-500 hover:bg-rose-100" />
              </div>
            </div>
          </div>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
