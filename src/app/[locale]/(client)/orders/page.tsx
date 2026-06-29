import { fetchOrders } from "@/lib/apis/orders.api";
import Orders from "./_components/order";

export default async function Page() {
  // Function
  const payload = await fetchOrders();

  return (
    <div className="flex flex-col">
      <div className="container m-auto flex gap-6 px-4 py-8 sm:px-6 lg:gap-[40px] lg:py-20">
        <Orders orders={payload?.orders || []} />
      </div>
    </div>
  );
}
