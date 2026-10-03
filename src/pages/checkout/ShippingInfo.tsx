import React from "react";
import { useFormContext } from "react-hook-form";
import type { CheckoutFormData } from "../Checkout";

const ShippingInfo: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>();

  return (
    <div>
      <h2 className="mb-8 text-lg font-bold uppercase tracking-wider text-orange-500">
        SHIPPING INFO
      </h2>

      <div>
        {/* Address */}
        <label htmlFor="address" className="block font-bold mb-7 text-lg">
          {" "}
          Your Address
          <input
            {...register("address", { required: "Address is required" })}
            type="text"
            id="address"
            className="w-full border border-gray-300 rounded-lg px-8 py-7 font-bold mt-2"
            placeholder="1137 Williams Avenue"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </label>

        <div className="md:grid md:grid-cols-2 md:gap-x-5">
          {/* ZIP Code */}
          <label htmlFor="zip-code" className="block font-bold mb-7 text-lg">
            {" "}
            ZIP Code
            <input
              {...register("zipCode", { required: "zip-code is required" })}
              type="text"
              id="zip-code"
              className="w-full border border-gray-300 rounded-lg px-8 py-7 font-bold mt-2"
              placeholder="10001"
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.zipCode.message}
              </p>
            )}
          </label>

          {/* City */}
          <label htmlFor="city" className="block font-bold mb-7 text-lg">
            {" "}
            City
            <input
              {...register("city", { required: "City is required" })}
              type="text"
              id="city"
              className="w-full border border-gray-300 rounded-lg px-8 py-7 font-bold mt-2"
              placeholder="New York"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
            )}
          </label>

          {/* Country */}
          <label htmlFor="country" className="block font-bold mb-7 text-lg">
            {" "}
            Country
            <input
              {...register("country", { required: "Country is required" })}
              type="text"
              id="country"
              className="w-full border border-gray-300 rounded-lg px-8 py-7 font-bold mt-2"
              placeholder="United States"
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-500">
                {errors.country.message}
              </p>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
