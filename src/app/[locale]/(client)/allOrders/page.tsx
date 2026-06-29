import Ordersummary from "./_component/order-summary-wrapper";
import getToken from "@/lib/utils/get-token";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { locale: string } }) {
  const token = await getToken();

  if (!token) {
    redirect(`/${params.locale}`);
  }

  return (
    <div>
      <Ordersummary />
    </div>
  );
}
