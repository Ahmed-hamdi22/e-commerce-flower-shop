import Ordersummary from "./_component/order-summary-wrapper";
import getToken from "@/lib/utils/get-token";
import { redirect } from "next/navigation";

type AllOrdersPageProps = {
  params: {
    locale: string;
  };
};

export default async function page({ params }: AllOrdersPageProps) {
  const locale = params.locale === "ar" ? "ar" : "en";
  const token = await getToken();

  if (!token) {
    redirect(`/${locale}`);
  }

  return (
    <div>
      <Ordersummary />
    </div>
  );
}
