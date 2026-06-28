import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CompaniesSection() {
  // Translation
  const t = useTranslations();

  return (
    <>
      <section className="my-6 md:my-10 xl:my-20 px-6 md:px-0">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-8 bg-main-color rounded-[20px] py-8 px-4 sm:gap-10 sm:py-10 sm:px-6">
            {/* Companies Section Heading */}
            <div className=" relative z-10 max-w-[509px] mx-auto">
              <h2 className="text-blue-gray-900 font-inter font-bold text-[20px] md:text-[30px] leading-[24.2px] md:leading-[30.31px] relative z-10  after:absolute after:top-[35px] after:start-0 after:w-[151px] after:h-[3px] after:bg-custom-rose-900">
                {t("trusted-by-over")} <span className="text-custom-rose-900">{t("4-5k")}</span>{" "}
                {t("companies")}
              </h2>
            </div>

            {/* Companies Logos List */}
            <ul className="w-full flex flex-wrap justify-center items-center gap-6 lg:flex-nowrap lg:justify-between">
              {Array.from({ length: 6 }).map((image, i) => (
                <li key={i} className="w-[110px] relative sm:w-[147px]">
                  <Image
                    src={`/assets/images/companies/company-${i + 1}.png`}
                    alt={`Company's Logo`}
                    width={147}
                    height={0}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
