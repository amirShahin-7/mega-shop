"use client";

import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { AddToCartProps } from "@/interfaces";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

const AddToCart = ({ variant = "default", productId }: AddToCartProps) => {
  const { addToCart, isAdding } = useCart();

  const isLoading = isAdding === productId;

  const handleAddToCart = async () => {
    if (!productId) {
      toast.error("Product ID missing");
      return;
    }
    await addToCart(productId);
  };

  // Button Styles
  const baseButtonStyles =
    "w-full text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 group disabled:opacity-70 disabled:cursor-not-allowed";
  const defaultVariantStyles =
    "bg-linear-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 py-3 rounded-xl";
  const detailedVariantStyles =
    "bg-linear-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 py-5 font-medium rounded-xl shadow-lg shadow-sky-200";

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`${baseButtonStyles} ${
        variant === "detailed" ? detailedVariantStyles : defaultVariantStyles
      }`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <ShoppingCart
          size={variant === "detailed" ? 22 : 20}
          className="group-hover:animate-bounce"
        />
      )}
      Add to Cart
    </Button>
  );
};

export default AddToCart;
