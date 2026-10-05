import { useFormContext } from "react-hook-form";
import type { CheckoutFormData } from "../Checkout";

const PaymentDetails: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<CheckoutFormData>();

  const paymentMethod = watch("paymentMethod");

  return (
    <section>
      <h2 className="mb-8 text-lg font-bold uppercase tracking-wider text-orange-500">
        Payment Details
      </h2>

      <div>
        <div className="md:grid md:grid-cols-2">
          <h3 className="mb-5 text-lg font-semibold sm:hidden md:block">
            Payment Method
          </h3>
          <div className="space-y-6">
            {/* e-Money */}
            <label
              htmlFor="e-money"
              className={`
                flex cursor-pointer items-center gap-6
                rounded-xl border px-6 py-7
                transition
                ${
                  paymentMethod === "e-money"
                    ? "border-orange-500"
                    : "border-gray-300"
                }
              `}
            >
              <input
                {...register("paymentMethod")}
                type="radio"
                value="e-money"
                id="e-money"
                checked={paymentMethod === "e-money"}
                className="peer sr-only"
              />

              {/* Custom radio circle */}
              <span
                className={`
                  flex h-7 w-7 items-center justify-center
                  rounded-full border border-gray-300
                `}
              >
                {paymentMethod === "e-money" && (
                  <span className="h-4 w-4 rounded-full bg-orange-500" />
                )}
              </span>

              <span className="text-xl font-semibold">e-Money</span>
            </label>

            {/* Cash on Delivery */}
            <label
              htmlFor="cash"
              className={`
                flex cursor-pointer items-center gap-6
                rounded-xl border px-6 py-7
                transition
                ${
                  paymentMethod === "cash"
                    ? "border-orange-500"
                    : "border-gray-300"
                }
              `}
            >
              <input
                {...register("paymentMethod")}
                type="radio"
                value="cash"
                id="cash"
                checked={paymentMethod === "cash"}
                className="sr-only"
              />

              {/* Custom radio circle */}
              <span
                className="
                  flex h-7 w-7 items-center justify-center
                  rounded-full border border-gray-300
                "
              >
                {paymentMethod === "cash" && (
                  <span className="h-4 w-4 rounded-full bg-orange-500" />
                )}
              </span>

              <span className="text-xl font-semibold">Cash on Delivery</span>
            </label>
          </div>
        </div>

        {paymentMethod === "e-money" && (
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-5 md:mt-10">
            {/* E-Money Number */}
            <label
              htmlFor="eMoneyNumber"
              className="block mt-10 md:mt-0 font-bold text-lg"
            >
              e-Money Number
              <input
                type="text"
                inputMode="numeric"
                maxLength={9}
                {...register("eMoneyNumber", {
                  required:
                    paymentMethod === "e-money"
                      ? "e-Money number is required"
                      : false,
                  minLength: {
                    value: 9,
                    message: "Number must be 9 digits",
                  },
                  maxLength: {
                    value: 9,
                    message: "Number must be 9 digits",
                  },
                })}
                className="w-full border border-gray-300 rounded-lg px-8 py-7 font-bold mt-2"
                placeholder="238521993"
              />
              {errors.eMoneyNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.eMoneyNumber.message}
                </p>
              )}
            </label>

            {/* E-Money PIN */}
            <label
              htmlFor="eMoneyPin"
              className="block font-bold mb-4 text-lg md:mb-0"
            >
              e-Money PIN
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                {...register("eMoneyPin", {
                  required:
                    paymentMethod === "e-money" ? "PIN is required" : false,
                  pattern: {
                    value: /^\d{4}$/,
                    message: "PIN must be exactly 4 digits",
                  },
                })}
                className="w-full border border-gray-300 rounded-lg px-8 py-7 font-bold mt-2"
                placeholder="6891"
              />
              {errors.eMoneyPin && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.eMoneyPin.message}
                </p>
              )}
            </label>
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentDetails;
