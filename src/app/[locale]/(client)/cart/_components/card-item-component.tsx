import Image from "next/image";
import RemoveButton from "./remove-button";
import QuantityComponent from "./quantity-component";
import { Link } from "@/i18n/routing";

export default function CardItemComponent({
  item,
}: {
  item: { product: Product; price: number; quantity: number; _id: string };
}) {
  return (
    <tr key={item.product._id}>
      {/* Product Image */}
      <td>
        <Link
          href="/all-products"
          className="relative flex md:h-28 h-32 rounded-lg border border-gray-400 w-28 mx-auto"
        >
          {item.product.imgCover && (
            <Image src={item.product.imgCover} alt="Product Image" fill sizes="100vw" />
          )}
        </Link>
      </td>

      {/* Product Title */}
      <td>
        <p className="font-semibold text-custom-blue-900 text-center">{item.product.title}</p>
      </td>

      {/* Product Quantity */}
      <td className="font-semibold text-custom-blue-900">${item.product.price}</td>
      <td>
        <QuantityComponent quantity={item.quantity} productId={item.product._id ?? ""} />
      </td>
      <td className="font-semibold text-custom-blue-900">
        ${item.quantity * (item.product.price ?? 0)}
      </td>

      {/* Remove Product Button */}
      <td>
        <RemoveButton productId={item.product._id ?? ""} />
      </td>
    </tr>
  );
}
