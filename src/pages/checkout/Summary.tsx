import SummaryRow from "./SummaryRow";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useCartContext from "../../hooks/useCartContext";

const Summary = () => {
  const { sessionId } = useCartContext();

  const cartItems = useQuery(api.carts.getCart, { sessionId }) ?? [];

  const total =
    cartItems?.reduce(
      (sum, item) => sum + (item.price ?? 0) * item.quantity,
      0,
    ) ?? 0;

  const shipping = 50;
  const vat = (0.025 * (total ?? 0)).toFixed(2);
  const grandTotal = total + shipping;

  const formatPrice = (price: number) => `$ ${price.toLocaleString()}`;

  return (
    <aside className="w-full rounded-lg bg-white">
      <h2 className="mb-8 text-lg font-bold uppercase tracking-wider">
        Summary
      </h2>

      {/* PRODUCTS */}
      <div className="space-y-6">
        {cartItems?.map((item) => (
          <div key={item.id} className="flex items-center">
            {/* Product image */}
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Product information */}
            <div className="ml-4 flex-1">
              <h3 className="font-bold">{item.name}</h3>

              <p className="mt-1 font-medium text-gray-500">
                $ {item.price?.toLocaleString()}
              </p>
            </div>

            {/* Quantity */}
            <span className="font-bold text-gray-500">x{item.quantity}</span>
          </div>
        ))}
      </div>

      {/* PRICE SUMMARY */}
      <div className="mt-8 space-y-2">
        <SummaryRow label="Total" value={formatPrice(total)} />

        <SummaryRow label="Shipping" value={formatPrice(shipping)} />

        <SummaryRow label="VAT (Included)" value={`$ ${vat}`} />
      </div>

      {/* GRAND TOTAL */}
      <div className="mt-6 flex items-center justify-between">
        <span className="uppercase text-gray-500">Grand Total</span>

        <span className="text-lg font-bold text-[#D87D4A]">
          {formatPrice(grandTotal)}
        </span>
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="mt-8 w-full bg-[#D87D4A] py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors cursor-pointer hover:bg-[#FBAF85]"
      >
        Continue & Pay
      </button>
    </aside>
  );
};

export default Summary;
