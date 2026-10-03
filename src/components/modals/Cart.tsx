import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useCartContext from "../../hooks/useCartContext";
import { motion } from "motion/react";

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { sessionId } = useCartContext();
  const carts = useQuery(api.carts.getCart, { sessionId });
  const updateQuantity = useMutation(api.carts.updateQuantity);
  const clearCart = useMutation(api.carts.clearCart);

  const count = carts?.length ?? 0;

  const total =
    carts?.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0) ??
    0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center md:items-start md:justify-end md:px-8 md:pt-18 lg:pr-24"
      onClick={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="flex max-h-[85dvh] w-full flex-col rounded-t-2xl bg-white p-5 shadow-xl sm:max-w-md sm:rounded-xl sm:p-6 md:max-h-[calc(100dvh-8rem)] md:w-[377px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.15,
          }}
          className="flex items-center justify-between gap-4"
        >
          <h3 className="text-base font-bold tracking-[1.29px] sm:text-lg">
            CART ({count})
          </h3>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className="cursor-pointer text-sm text-gray-500 underline transition-colors hover:text-[#D87D4A] sm:text-[15px]"
            onClick={async () => await clearCart({ sessionId })}
          >
            Remove all
          </motion.button>
        </motion.div>

        {/* Scrollable items */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.08,
              },
            },
          }}
          className="-mx-1 mt-6 flex-1 space-y-5 overflow-y-auto px-1 sm:mt-8 sm:space-y-6"
        >
          {count === 0 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.2,
              }}
              className="py-8 text-center text-sm text-gray-500"
            >
              Your cart is empty.
            </motion.p>
          )}

          {carts?.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2,
                  }}
                  src={item.image}
                  alt={item.name}
                  className="size-12 shrink-0 rounded-lg object-cover sm:size-16"
                />

                <p className="min-w-0 text-sm font-bold sm:text-base">
                  <span className="block truncate">{item.name}</span>

                  <span className="text-gray-500">
                    $ {item.price?.toLocaleString()}
                  </span>
                </p>
              </div>

              <div className="flex shrink-0 items-center bg-[#f1f1f1] text-sm font-bold sm:text-base">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  aria-label="Decrease quantity"
                  className="cursor-pointer px-3 py-2 transition-colors hover:bg-gray-500 hover:text-white sm:px-4 sm:py-3"
                  onClick={async () =>
                    await updateQuantity({
                      sessionId,
                      id: item.id,
                      direction: "decrease",
                    })
                  }
                >
                  -
                </motion.button>

                <motion.span
                  key={item.quantity}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 text-center sm:w-8"
                >
                  {item.quantity}
                </motion.span>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  aria-label="Increase quantity"
                  className="cursor-pointer px-3 py-2 transition-colors hover:bg-gray-500 hover:text-white sm:px-4 sm:py-3"
                  onClick={async () =>
                    await updateQuantity({
                      sessionId,
                      id: item.id,
                      direction: "increase",
                    })
                  }
                >
                  +
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.3,
          }}
          className="my-5 flex items-center justify-between sm:my-6"
        >
          <p className="text-sm font-bold text-gray-500">TOTAL</p>

          <motion.p
            key={total}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="text-base font-bold sm:text-lg"
          >
            $ {total.toLocaleString()}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.35,
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to="/checkout"
            onClick={onClose}
            className="block w-full cursor-pointer rounded-lg bg-[#d87d4a] py-3 text-center text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#fbaf85] sm:text-base"
          >
            CHECKOUT
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
