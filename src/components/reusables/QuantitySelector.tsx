import type React from "react";
import useCartContext from "../../hooks/useCartContext";
import type { Id } from "../../../convex/_generated/dataModel";

const QuantitySelector: React.FC<{ productId: Id<"products"> }> = ({
  productId,
}) => {
  const { cart, setCartQuantity, addToCart } = useCartContext();

  const quantity =
    cart?.find((item) => item.productId === productId)?.quantity ?? 0;

  return (
    <div className="flex space-x-3 md:flex md:space-x-2 lg:space-x-5">
      <div className="flex md:flex bg-[#f1f1f1] md:justify-evenly md:items-center font-bold">
        <button
          className="hover:bg-gray-500 py-4 px-6 hover:text-white transition-colors cursor-pointer"
          onClick={() => setCartQuantity(productId, "decrease")}
        >
          -
        </button>
        <p className="py-4 px-6 border-x border-x-gray-300 w-17 text-center">
          {quantity}
        </p>
        <button
          className="hover:bg-gray-500 py-4 px-6 hover:text-white transition-colors cursor-pointer"
          onClick={() => setCartQuantity(productId, "increase")}
        >
          +
        </button>
      </div>

      <button className="text-white md:w-40 bg-[#D87D4A] text-[13px] font-bold tracking-[1px] py-4 px-8 cursor-pointer hover:bg-[#fbaf85] transition-colors lg:mx-auto md:mx-0" onClick={() => addToCart(productId, quantity)}>
        ADD TO CART
      </button>
    </div>
  );
};

export default QuantitySelector;
