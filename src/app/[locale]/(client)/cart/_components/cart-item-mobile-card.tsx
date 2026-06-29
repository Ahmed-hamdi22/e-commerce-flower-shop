import Image from "next/image";
import { Link } from "@/i18n/routing";
import QuantityComponent from "./quantity-component";
import RemoveButton from "./remove-button";

export default function CartItemMobileCard({
  item,
}: {
  item: { product: Product; price: number; quantity: number; _id: string };
}) {
  return (
    <div className="rounded-2xl border border-custom-rose-100 bg-white p-3 shadow-sm">
      <div className="flex gap-3">
        <Link
          href="/all-products"
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-main-color"
        >
          {item.product.imgCover && (
            <Image
              src={item.product.imgCover}
              alt={item.product.title || "Product Image"}
              fill
              sizes="96px"
              className="object-cover"
            />
          )}
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="line-clamp-2 text-sm font-semibold text-custom-blue-900">
              {item.product.title}
            </p>
            <RemoveButton productId={item.product._id ?? ""} />
          </div>

          <div className="mt-2 space-y-2 text-sm text-custom-blue-900">
            <div className="flex justify-between gap-3">
              <span className="text-gray-500">${item.product.price}</span>
              <span className="font-semibold">${item.quantity * (item.product.price ?? 0)}</span>
            </div>
            <QuantityComponent quantity={item.quantity} productId={item.product._id ?? ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
