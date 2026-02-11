"use client";

import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/helpers/currencyHelper";
import Image from "next/image";

export default function OrderSummary() {
  const { cartData } = useCart();

  if (!cartData || !cartData?.products?.length) return null;

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Your Order</h2>

      <div className="space-y-4 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
        {cartData.products.map((item) => (
          <div
            key={item._id}
            className="flex flex-wrap gap-4 items-center py-3"
          >
            <div className="relative w-16 h-16 bg-white rounded-md border border-gray-100 p-1 shrink-0">
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                width={50}
                height={50}
                className="object-contain w-full h-full"
              />
              <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {item.count}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.product.title}
              </p>
              <p className="text-xs text-gray-500">
                {formatCurrency(item.price)}
              </p>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatCurrency(item.price * item.count)}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>{formatCurrency(cartData.totalCartPrice)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax</span>
          <span>{formatCurrency(cartData.totalCartPrice * 0.14)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span className="text-sky-600">
            {formatCurrency(
              cartData.totalCartPrice * 0.14 + cartData.totalCartPrice
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
