import { v } from "convex/values";
import { mutation } from "./_generated/server";

const uploadOrderDetails = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    address: v.string(),
    zipCode: v.string(),
    city: v.string(),
    country: v.string(),
    paymentMethod: v.union(v.literal("e-money"), v.literal("cash")),
    eMoneyNumber: v.optional(v.string()),
    eMoneyPin: v.optional(v.string()),
  },

  handler: async (
    ctx,
    {
      name,
      email,
      phoneNumber,
      address,
      zipCode,
      city,
      country,
      paymentMethod,
      eMoneyNumber,
      eMoneyPin,
    },
  ) => {
    await ctx.db.insert("order", {
      name,
      email,
      phoneNumber,
      address,
      zipCode,
      city,
      country,
      paymentMethod,
      eMoneyNumber,
      eMoneyPin,
    });
  },
});

export { uploadOrderDetails };
