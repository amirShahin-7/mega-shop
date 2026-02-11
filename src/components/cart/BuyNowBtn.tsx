"use client";

import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const BuyNowBtn = ({ productId }: { productId: string }) => {
  const { addToCart, isAdding } = useCart();

  const isLoading = isAdding === productId;
  const router = useRouter();
  const handleBuyNow = async () => {
    if (!productId) {
      toast.error("Product ID missing");
      return;
    }
    await addToCart(productId);
    await router.push("/checkout");
  };

  // Button Styles
  const baseButtonStyles =
    "transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 group disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed";
  const defaultVariantStyles =
    "bg-linear-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 py-3 rounded-xl";
  const detailedVariantStyles =
    "bg-linear-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 py-5 font-medium rounded-xl shadow-lg shadow-sky-200";

  return (
    <Button
      onClick={handleBuyNow}
      disabled={isLoading}
      className={`bg-linear-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 py-5 font-medium rounded-xl shadow-md shadow-green-200 ${baseButtonStyles}`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <CheckCircle2 size={20} className="group-hover:animate-bounce" />
      )}
      Buy Now
    </Button>
  );
};

export default BuyNowBtn;
