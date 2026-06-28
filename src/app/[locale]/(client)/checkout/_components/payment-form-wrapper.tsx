import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { PaymentForm } from "./payment";
import { fetchCartOrders } from "@/lib/apis/order.api";

export default async function PaymentWrapper() {
  // GetSession
  const session = await getServerSession(authOptions);

  const response = await fetchCartOrders();

  // Redirect if not logged in or cart is empty
  if (!session?.user || !response?.cart || response.cart.cartItems.length) {
    redirect("/");
  }

  // Default shipping address
  const defaultShippingAddress = {
    street: "",
    phone: "",
    city: "",
    lat: "",
    long: "",
  };
  return <PaymentForm shippingAddress={defaultShippingAddress} />;
}
