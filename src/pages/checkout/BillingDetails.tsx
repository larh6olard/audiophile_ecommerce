import React from "react";
import { useFormContext } from "react-hook-form";
import type { CheckoutFormData } from "../Checkout";

const BillingDetails: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>();

  return (
    <div>
      <h2 className="mb-8 text-lg font-bold uppercase tracking-wider text-orange-500">
        BILLING DETAILS
      </h2>

      <div className="md:grid md: grid-cols-2 md:gap-x-5">
        {/* Name */}
        <label htmlFor="name" className="block font-bold mb-7 text-lg">
          {" "}
          Name
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-lg px-6 py-7 font-bold mt-2"
            placeholder="Alexei Ward"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </label>

        {/* Email Address */}
        <label htmlFor="email" className="block font-bold mb-7 text-lg">
          Email Address
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email",
              },
            })}
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-lg px-6 py-7 font-bold mt-2"
            placeholder="alexei@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </label>

        {/* Phone Number */}
        <label htmlFor="phone-number" className="block font-bold text-lg">
          Phone Number
          <input
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            type="tel"
            id="phone-number"
            className="w-full border border-gray-300 rounded-lg px-6 py-7 font-bold mt-2"
            placeholder="+1202-555-0136"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </label>
      </div>
    </div>
  );
};

export default BillingDetails;
