import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface CartItem {
  productId: Id<"products">;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: Id<"products">, quantity: number) => Promise<void>;
  setCartQuantity: (
    productId: Id<"products">,
    delta: "increase" | "decrease",
  ) => void;
  placeOrder: () => void;
  sessionId: string;
}

const STORAGE_KEY = "audiophile_cart";
const SESSION_ID_KEY = "cartSessionId";

const CartContext = createContext<CartContextType | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [sessionId] = useState<string>(getSessionId);
  const updateCart = useMutation(api.carts.updateCart);
  const clearCart = useMutation(api.carts.clearCart);

  const navigate = useNavigate();

  // Persist after every committed state change (always the latest value)
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable; ignore */
    }
  }, [cart]);

  const addToCart = useCallback(
    async (productId: Id<"products">, quantity: number) => {
      try {
        await updateCart({ sessionId, productId, quantity });

        toast.loading("Adding...", {
          id: "action-toast",
        });

        toast.success("Item added to cart!", { id: "action-toast" });
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
        throw error;
      }
    },
    [updateCart, sessionId],
  );

  const setCartQuantity = (
    productId: Id<"products">,
    delta: "increase" | "decrease",
  ) => {
    setCart((currentItems) => {
      const existing = currentItems.find(
        (item) => item.productId === productId,
      );

      if (delta === "increase") {
        if (existing) {
          return currentItems.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...currentItems, { productId, quantity: 1 }];
      }

      // decrease
      if (!existing) return currentItems;

      return currentItems
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const placeOrder = useCallback(async () => {
    try {
      await clearCart({ sessionId });
      navigate("/");
      setCart([]);
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }, [clearCart, navigate, sessionId]);

  const value = useMemo(
    () => ({ cart, sessionId, setCartQuantity, addToCart, placeOrder }),
    [cart, addToCart, placeOrder, sessionId],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext };
export default CartProvider;
