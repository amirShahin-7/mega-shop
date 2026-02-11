"use client";
import { useCart } from "@/context/CartContext";
import ShippingForm from "./ShippingForm";
import OrderSummary from "./OrderSummary";
import CheckoutSkeleton from "@/components/skeletons/CheckoutSkeleton";
import { useRouter } from "next/navigation";

export default function CheckoutScreen() {
  const { cartData, isLoading } = useCart();
  const router = useRouter();
  if (isLoading) {
    return <CheckoutSkeleton />;
  }

  if (!cartData || cartData.products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-8">
          Add some products before checking out.
        </p>
        <button
          onClick={() => router.push("/products")}
          className="text-sky-600 hover:underline"
        >
          Go to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <ShippingForm cartId={cartData._id!} />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
