import { useTranslations } from "next-intl";
import Image from "next/image";

export default function GallerySection() {
  return (
    <>
      <section className="my-6 md:my-10 xl:my-20 px-6 md:px-0">
        <div className="container mx-auto">
          <GalleryHeading />
          {/* Gallery Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 5 }).map((image, i) => (
              <div
                key={i}
                className={`w-full h-[411px] relative ${
                  i === 3 ? "sm:col-span-2" : ""
                }  rounded-[40px] overflow-hidden`}
              >
                <Image
                  src={`/assets/images/gallery/gallery-${i + 1}.jpg`}
                  alt={`Gallery's Photo ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function GalleryHeading() {
  // Translation
  const t = useTranslations();

  return (
    <>
      {/* HeadLine of Gallery Section. */}
      <div className="flex flex-col sm:items-center gap-2 mb-10 relative z-10 max-w-[442px] mx-auto py-[5px]">
        <h2 className="text-custom-rose-900 uppercase font-roboto font-bold text-[17px] leading-[30.6px] tracking-[4px]">
          {t("our-gallery")}
        </h2>

        <p
          className={`text-blue-gray-900 font-inter font-bold text-[20px] md:text-[30px] leading-[24.2px] md:leading-[30.31px] relative z-10`}
        >
          {t("let-and-39-s-check-our-photo-gallery")}
        </p>

        {/* The Decorate Line */}
        <div className="absolute start-0 top-[61px] z-0 w-[338px] h-[17px] bg-main-color ltr:rounded-tr-[20px] ltr:rounded-br-[20px] rtl:rounded-tl-[20px] rtl:rounded-bl-[20px]  after:absolute after:bottom-0 after:start-0 after:w-[161px] after:h-[2px] after:bg-custom-rose-900"></div>
      </div>
    </>
  );
}
