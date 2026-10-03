import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    category: v.string(),
    description: v.string(),
    price: v.number(),
    image: v.string(),
    stock_quantity: v.number(),
  }),
  carts: defineTable({
    sessionId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
  })
    .index("by_sessionId", ["sessionId"])
    .index("by_sessionId_productId", ["sessionId", "productId"]),
  order: defineTable({
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
  }),
});
