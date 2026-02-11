"use client";

import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/helpers/currencyHelper";
import { Button } from "../ui/button";
import { ArrowRight, Loader, ShoppingBag } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export default function CartSummary() {
  const { cartData, clearCart, isLoading } = useCart();
  if (!cartData?.products) return null;
  const tax = formatCurrency(cartData.totalCartPrice * 0.14);
  const total = formatCurrency(
    cartData.totalCartPrice * 0.14 + cartData.totalCartPrice,
  );
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6 sticky top-24">
      <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>

      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({cartData.products.length} items)</span>
          <span className="font-medium">
            {formatCurrency(cartData.totalCartPrice)}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span className="text-gray-400">{tax}</span>
        </div>
      </div>

      <div className="border-t border-gray-100 my-4" />

      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-sky-600">{total}</span>
      </div>

      <Link
        href={"/checkout"}
        className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white py-3 text-lg rounded-xl shadow-lg shadow-sky-200 hover:translate-y-[-2px] transition-all"
      >
        Checkout
        <ArrowRight
          size={20}
          className="ml-2 group-hover:translate-x-1 transition-transform"
        />
      </Link>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <Link
          href={"/products"}
          className="w-full border rounded-xl text-sm flex items-center justify-center text-gray-600 border-gray-200"
        >
          Continue Shopping
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              disabled={isLoading}
              className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              {isLoading && <Loader className="animate-spin" />} Clear Cart
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white border-0 shadow-red-200 shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Clear Shopping Cart?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove all items from your cart. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-white bg-sky-500 hover:bg-sky-600 cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={clearCart}
                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                Clear Cart
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex justify-center items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <ShoppingBag size={14} />
        <span>Secure Checkout with Stripe</span>
      </div>
    </div>
  );
}
