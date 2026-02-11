"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "react-toastify";
import { getCartAction } from "@/server/cartActions/getCart.actions";
import { addToCartAction } from "@/server/cartActions/AddToCart.actions";
import { updateCountAction } from "@/server/cartActions/updateCount.actions";
import { deleteItemAction } from "@/server/cartActions/deleteItem.actions";
import { clearCartAction } from "@/server/cartActions/clearCart.actions";
import { CartType } from "@/interfaces";
import { useSession } from "next-auth/react";

interface CartContextType {
  cartData: CartType | null;
  numOfCartItems: number;
  isLoading: boolean;
  isAdding: string | null;
  isUpdating: string | null;
  isRemoving: string | null;
  addToCart: (productId: string) => Promise<void>;
  updateCount: (productId: string, count: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartData, setCartData] = useState<CartType | null>(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      loadCart();
    } else {
      setCartData(null);
      setNumOfCartItems(0);
      setIsLoading(false);
    }
  }, [status]);

  const loadCart = async () => {
    setIsLoading(true);
    try {
      const result = await getCartAction();
      if (result.status === "success") {
        if (result.numOfCartItems === 0) {
          setCartData(null);
          setNumOfCartItems(0);
        } else {
          setCartData(result.data); // TS should be happy now as data matches CartType
          setNumOfCartItems(result.numOfCartItems);
        }
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCart = async () => {
    await loadCart();
  };

  const addToCart = async (productId: string) => {
    setIsAdding(productId);
    try {
      const result = await addToCartAction(productId);
      if (result.status === "success") {
        toast.success(result.message || "Added to cart successfully");
        await loadCart();
      } else {
        toast.error(result.message || "Failed to add to cart");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsAdding(null);
    }
  };

  const updateCount = async (productId: string, count: number) => {
    if (count < 1) return;
    setIsUpdating(productId);
    try {
      const result = await updateCountAction(productId, count);
      if (result.status === "success") {
        toast.success("Cart updated successfully");
        setCartData(result.data);
        setNumOfCartItems(result.numOfCartItems);
      } else {
        toast.error(result.message || "Failed to update cart");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(null);
    }
  };

  const removeItem = async (productId: string) => {
    setIsRemoving(productId);
    try {
      const result = await deleteItemAction(productId);
      if (result.status === "success") {
        toast.success("Item removed from cart");
        setCartData(result.data);
        setNumOfCartItems(result.numOfCartItems);
      } else {
        toast.error(result.message || "Failed to remove item");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsRemoving(null);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      const result = await clearCartAction();
      if (
        result.message === "Cart cleared successfully" ||
        result.message === "success"
      ) {
        toast.success("Cart cleared");
        setCartData(null);
        setNumOfCartItems(0);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    cartData,
    numOfCartItems,
    isLoading,
    isAdding,
    isUpdating,
    isRemoving,
    addToCart,
    updateCount,
    removeItem,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
