import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { internalMutation } from "./_generated/server";

type CartItemWithProduct = {
  id: Id<"carts">;
  productId: Id<"products">;
  quantity: number;
  name: string | undefined;
  image: string | undefined;
  price: number | undefined;
};

const updateCart = mutation({
  args: {
    sessionId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
  },

  handler: async (ctx, args) => {
    if (!Number.isInteger(args.quantity) || args.quantity < 0) {
      throw new ConvexError("Quantity must be a whole number, 0 or greater");
    }

    const cartItem = await ctx.db
      .query("carts")
      .withIndex("by_sessionId_productId", (q) =>
        q.eq("sessionId", args.sessionId).eq("productId", args.productId),
      )
      .unique();

    // Remove product from this session's cart
    if (args.quantity === 0) {
      if (cartItem) await ctx.db.delete(cartItem._id);

      return;
    }

    if (!cartItem) {
      await ctx.db.insert("carts", {
        sessionId: args.sessionId,
        productId: args.productId,
        quantity: args.quantity,
      });

      return;
    }

    // Product already exists, update quantity
    await ctx.db.patch(cartItem._id, {
      quantity: args.quantity,
    });
  },
});

const getCart = query({
  args: {
    sessionId: v.string(),
  },

  handler: async (ctx, { sessionId }): Promise<CartItemWithProduct[]> => {
    // Get only the cart items belonging to this session
    const items: Doc<"carts">[] = await ctx.db
      .query("carts")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", sessionId))
      .collect();

    const populatedCart = await Promise.all(
      items.map(async (item) => {
        const product = await ctx.db.get(item.productId);

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        return {
          id: item._id,
          productId: item.productId,
          quantity: item.quantity,
          name: product.name,
          image: product.image,
          price: product.price,
        };
      }),
    );

    return populatedCart;
  },
});

const updateQuantity = mutation({
  args: {
    sessionId: v.string(),
    id: v.id("carts"),
    direction: v.union(v.literal("increase"), v.literal("decrease")),
  },

  handler: async (ctx, { sessionId, id, direction }) => {
    const item = await ctx.db.get(id);

    if (!item) {
      throw new Error("Cart item not found");
    }

    // Make sure this cart item actually belongs to this session
    if (item.sessionId !== sessionId) {
      throw new Error("You cannot modify this cart item");
    }

    const quantity = item.quantity + (direction === "increase" ? 1 : -1);

    if (quantity <= 0) {
      await ctx.db.delete(id);
      return;
    }

    await ctx.db.patch(id, {
      quantity,
    });
  },
});

const clearCart = mutation({
  args: {
    sessionId: v.string(),
  },

  handler: async (ctx, { sessionId }) => {
    // Get only items belonging to this session
    const items = await ctx.db
      .query("carts")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", sessionId))
      .collect();

    await Promise.all(items.map((item) => ctx.db.delete(item._id)));
  },
});

// convex/carts.ts
export const clearStaleCarts = internalMutation({
  args: {},
  handler: async (ctx) => {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000; // 24h ago
    const stale = await ctx.db
      .query("carts")
      .filter((q) => q.lt(q.field("_creationTime"), cutoff))
      .collect();

    const stale_order = await ctx.db
    .query("order")
    .filter((q) => q.lt(q.field("_creationTime"), cutoff))
    .collect();

    await Promise.all(stale.map((item) => ctx.db.delete(item._id)));
    await Promise.all(stale_order.map((item) => ctx.db.delete(item._id)));
  },
});

export { updateCart, getCart, updateQuantity, clearCart };
