import { useTranslations } from "next-intl";
import Image from "next/image";

export default function EmptyCart() {
  // Translation
  const t = useTranslations();

  return (
    <div className="container flex min-h-[50vh] flex-col justify-center items-center px-4 text-center">
      <Image src="/assets/images/coming-soon.png" alt="empty-cart" width={180} height={180} />
      <h2 className="text-2xl font-bold text-custom-blue-900 sm:text-3xl">
        {t("your-cart-is-empty")}
      </h2>
    </div>
  );
}
