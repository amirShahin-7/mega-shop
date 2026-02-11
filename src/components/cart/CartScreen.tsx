"use client";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import CartEmpty from "@/components/cart/CartEmpty";
import CartSkeleton from "@/components/skeletons/CartSkeleton";

export default function CartScreen() {
  const { cartData, isLoading } = useCart();

  if (isLoading && !cartData) {
    return <CartSkeleton />;
  }

  if (!cartData || cartData.products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <CartEmpty />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-baseline gap-4">
        Shopping Cart
        <span className="text-lg font-normal text-gray-500">
          ({cartData.products.length}{" "}
          {cartData.products.length === 1 ? "item" : "items"})
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1 space-y-4">
          {cartData.products.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:w-[380px] shrink-0">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
