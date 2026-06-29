import FooterInput from "@/components/layout/footer/components/subscribe";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  // Translation
  const t = useTranslations();

  // Variables
  const discount = 20;

  return (
    <footer className="relative overflow-hidden px-4 pb-12 sm:px-6 lg:px-0 lg:pb-24">
      {/* Image */}
      <Image
        src="/assets/images/cover.png"
        alt="Footer image"
        sizes="100vw"
        fill
        className="-z-[1] object-cover opacity-30"
      />

      {/* Content */}
      <div className="flex flex-col items-center justify-center gap-8 sm:gap-10">
        {/* Footer Header Contents */}
        <div className="grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-4 pt-8 text-center text-sm font-bold sm:grid-cols-3 sm:text-base lg:flex lg:justify-center lg:gap-20 lg:pt-10 lg:ps-20">
          <p>{t("about-us")}</p>
          <p>{t("store-location")}</p>
          <p>{t("contact")}</p>
          <p>
            <Link href="/delivery"> {t("delivery")}</Link>{" "}
          </p>
          <p>
            <Link href="/policy">{t("policy")}</Link>
          </p>
          <p>
            <Link href="/faq">{t("faqs")}</Link>
          </p>
        </div>

        {/* Subscribe */}
        <div className="flex max-w-2xl flex-col gap-2 text-center">
          {/* Discount part */}

          {/* Headline */}
          <p className="text-2xl font-bold leading-tight text-blue-gray-900 sm:text-[30px]">
            {t.rich("discount-offer", {
              discount,
              span: (v) => <span className="text-custom-rose-900">{v}</span>,
            })}
          </p>

          {/* Description */}
          <p className="text-base font-medium text-blue-gray-500 sm:text-xl">
            {t("by-subscribe-our-newsletter")}
          </p>
        </div>

        {/* Subscribe input */}
        <FooterInput />
      </div>
    </footer>
  );
}
