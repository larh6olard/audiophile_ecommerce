import { Check } from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";
import { useState } from "react";
import { motion } from "motion/react";

interface CartItemWithProduct {
  id: Id<"carts">;
  productId: Id<"products">;
  name: string | undefined;
  price: number | undefined;
  quantity: number;
  image: string | undefined;
}

interface OrderModalProps {
  cartItems: CartItemWithProduct[];
  grandTotal: number;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  cartItems,
  grandTotal,
  onClose,
}) => {
  const [expanded, setExpanded] = useState(false);

  const otherCount = cartItems.length - 1;
  const visibleItems = expanded ? cartItems : cartItems.slice(0, 1);

  const formatPrice = (price: number) => {
    return `$ ${price.toLocaleString()}`;
  };

  return (
    // OVERLAY
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
    >
      {/* MODAL */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="w-full max-w-[400px] rounded-lg bg-white p-7 md:max-w-[525px] md:p-12 lg:max-w-[550px] lg:p-12"
      >
        {/* CHECK ICON */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.45,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D87D4A] md:h-16 md:w-16"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.3,
            }}
          >
            <Check className="h-7 w-7 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* TITLE */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.25,
          }}
          className="mt-5 font-manrope text-2xl font-bold uppercase leading-[1.15] tracking-wide md:mt-6 md:text-3xl"
        >
          Thank you
          <br />
          for your order
        </motion.h2>

        {/* MESSAGE */}
        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.35,
          }}
          className="mt-5 text-sm leading-6 text-gray-500"
        >
          You will receive an email confirmation shortly.
        </motion.p>

        {/* ORDER INFORMATION */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.45,
            ease: "easeOut",
          }}
          className="mt-5 overflow-hidden rounded-lg md:grid md:grid-cols-[1.3fr_1fr] lg:grid-cols-[1.25fr_1fr]"
        >
          {/* PRODUCTS */}
          <div className="bg-[#F1F1F1] p-5">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className={`space-y-4 ${
                expanded ? "max-h-28 overflow-y-auto pr-1 md:max-h-30" : ""
              }`}
            >
              {visibleItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 10,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <Product item={item} formatPrice={formatPrice} />
                </motion.div>
              ))}
            </motion.div>

            {otherCount > 0 && (
              <>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4,
                  }}
                  className="my-3 border-t border-gray-300"
                />

                <motion.button
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3,
                  }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  aria-expanded={expanded}
                  className="block w-full cursor-pointer text-center text-xs font-medium text-gray-500 transition-colors hover:text-[#D87D4A]"
                >
                  {expanded ? "View less" : `and ${otherCount} other item(s)`}
                </motion.button>
              </>
            )}
          </div>

          {/* GRAND TOTAL */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.4,
              ease: "easeOut",
            }}
            className="flex bg-black p-5 text-white md:items-end md:p-6
            "
          >
            <div>
              <p className="text-sm uppercase text-gray-400">Grand Total</p>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.65,
                }}
                className="mt-2 text-lg font-bold"
              >
                {formatPrice(grandTotal)}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* BACK TO HOME */}
        <motion.button
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.4,
          }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onClose}
          className="mt-6 w-full bg-[#D87D4A] py-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#FBAF85] md:mt-10
          "
        >
          Back to Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default OrderModal;

type ProductProps = {
  item: {
    id: Id<"carts">;
    name: string | undefined;
    productId: Id<"products">;
    price: number | undefined;
    quantity: number;
    image: string | undefined;
  };
  formatPrice: (price: number) => string;
};

const formatPrice = (price: number) => {
  return `$ ${price.toLocaleString()}`;
};

const Product = ({ item }: ProductProps) => {
  return (
    <div className="flex items-center">
      <motion.img
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.3,
        }}
        src={item.image}
        alt={item.name}
        className="h-12 w-12 object-contain"
      />

      <div className="ml-4 min-w-0 flex-1">
        <h3 className="text-sm font-bold">{item.name}</h3>

        <p className="mt-1 text-sm font-medium text-gray-500">
          {item.price !== undefined ? formatPrice(item.price) : "—"}
        </p>
      </div>

      <span className="ml-3 text-sm font-bold text-gray-500">
        x{item.quantity}
      </span>
    </div>
  );
};
