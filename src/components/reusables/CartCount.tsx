import { BsCart3 } from "react-icons/bs";

interface Props {
  itemCount: number;
  onOpen: () => void
}

const CartCount = ({ itemCount, onOpen }: Props) => {
  return (
    <div className="relative cursor-pointer" onClick={onOpen}>
      <BsCart3 size={24} color="white" />

      {itemCount > 0 ? (
        <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d87d4a] px-1 text-[11px] font-bold leading-none text-white ring-2 ring-black">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : (
        <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d87d4a] px-1 text-[11px] font-bold leading-none text-white ring-2 ring-black">
          0
        </span>
      )}
    </div>
  );
};

export default CartCount;
