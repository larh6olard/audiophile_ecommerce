import { mutation, query } from "./_generated/server";
import productData from "../src/products_data/productData";
import { v } from "convex/values";

const createProducts = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").first();

    if (existing) return "Already seeded";

    const ids = await Promise.all(
      productData.map((product) =>
        ctx.db.insert("products", {
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          image: product.image,
          stock_quantity: product.stock_quantity,
        }),
      ),
    );

    return ids;
  },
});

const getProducts = query({
  args: {},
  handler: async (ctx) => {
    const data = await ctx.db.query("products").collect();

    if (!data) return { success: false, message: "Products not found" };

    return { success: true, data: data };
  },
});

const getProductById = query({
  args: { id: v.id("products") },

  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export {
  createProducts,
  getProducts,
  getProductById,
};
