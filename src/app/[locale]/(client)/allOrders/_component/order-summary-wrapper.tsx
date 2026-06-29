import { fetchLatestOrder } from "@/lib/apis/order.api";
import OrderMessage from "./order-mesage";
import OrderDetails from "./order-summary";
import { getTranslations } from "next-intl/server";

export default async function Ordersummary() {
  const t = await getTranslations();
  const order = await fetchLatestOrder();

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6">
      {order ? (
        <>
          <OrderMessage order={order} />
          <OrderDetails order={order} />
        </>
      ) : (
        <div className="max-w-3xl mx-auto py-10 px-4">
          <div className="rounded-2xl border border-custom-rose-900 bg-main-color p-6 text-center text-blue-gray-900">
            {t("you-do-not-have-an-order")}
          </div>
        </div>
      )}
    </div>
  );
}
