import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import BillingDetails from "./checkout/BillingDetails";
import ShippingInfo from "./checkout/ShippingInfo";
import PaymentDetails from "./checkout/PaymentDetails";
import Summary from "./checkout/Summary";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import useCartContext from "../hooks/useCartContext";
import Alert from "../components/alert/Alert";
import OrderModal from "../components/modals/OrderModal";
import { motion } from "motion/react";

export type CheckoutFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: "e-money" | "cash";
  eMoneyNumber: string;
  eMoneyPin: string;
};

const Checkout: React.FC = () => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);

  const methods = useForm<CheckoutFormData>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
      paymentMethod: "e-money",
      eMoneyNumber: "",
      eMoneyPin: "",
    },
  });

  const navigate = useNavigate();
  const { sessionId, placeOrder } = useCartContext();

  const cartItems = useQuery(api.carts.getCart, { sessionId }) ?? [];
  const uploadOrder = useMutation(api.order_details.uploadOrderDetails);

  const total =
    cartItems?.reduce(
      (sum, item) => sum + (item.price ?? 0) * item.quantity,
      0,
    ) ?? 0;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const onSubmit: SubmitHandler<CheckoutFormData> = async (
    data: CheckoutFormData,
  ) => {
    const orderData = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      zipCode: data.zipCode,
      city: data.city,
      country: data.country,
      paymentMethod: data.paymentMethod,

      ...(data.paymentMethod === "e-money" && {
        eMoneyNumber: data.eMoneyNumber,
        eMoneyPin: data.eMoneyPin,
      }),
    };

    if (!cartItems || cartItems.length === 0) {
      setShowToast(true);
      return;
    } else {
      await uploadOrder(orderData);
      setShowOrderModal(true);
    }
  };

  const closeToast = useCallback(() => setShowToast(false), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-100 px-5 py-5 md:px-10 lg:px-25 lg:pb-14"
    >
      {/* Go Back */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        whileTap={{ scale: 0.97 }}
        className="text-gray-500 text-[15px] md:text-lg hover:text-[#d87d4a] cursor-pointer mt-5 mb-10"
        onClick={handleBack}
      >
        Go Back
      </motion.button>

      {showToast && (
        <Alert
          message="Your cart is empty. Add items to continue."
          onClose={closeToast}
        />
      )}

      {/* Order Modal */}
      {showOrderModal && (
        <OrderModal
          cartItems={cartItems}
          grandTotal={total}
          onClose={placeOrder}
        />
      )}

      <FormProvider {...methods}>
        <form action="" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="lg:grid lg:gap-8 lg:grid-cols-[2fr_1fr] lg:items-start">
            {/* Checkout Details */}
            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              className="bg-white rounded-2xl p-10"
            >
              <motion.h1
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
                  delay: 0.2,
                }}
                className="font-manrope font-bold text-3xl tracking-wider mb-10"
              >
                CHECKOUT
              </motion.h1>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      delayChildren: 0.25,
                      staggerChildren: 0.12,
                    },
                  },
                }}
                className="space-y-12"
              >
                {/* Billing Details */}
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 25,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <BillingDetails />
                </motion.div>

                {/* Shipping Info */}
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 25,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <ShippingInfo />
                </motion.div>

                {/* Payment Details */}
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 25,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <PaymentDetails />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: "easeOut",
              }}
              className="bg-white rounded-2xl p-10 mt-10 mb-20 lg:mt-0"
            >
              <Summary />
            </motion.div>
          </div>
        </form>
      </FormProvider>
    </motion.div>
  );
};

export default Checkout;
