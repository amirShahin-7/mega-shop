"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { CartProducts } from "@/interfaces";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/helpers/currencyHelper";
import { Button } from "../ui/button";
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

interface CartItemProps {
  item: CartProducts;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateCount, removeItem, isUpdating, isRemoving } = useCart();

  const isItemUpdating = isUpdating === item.product.id;
  const isItemRemoving = isRemoving === item.product.id;

  const handleIncrement = () => {
    updateCount(item.product.id, item.count + 1);
  };

  const handleDecrement = () => {
    if (item.count > 1) {
      updateCount(item.product.id, item.count - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
      {/* Image */}
      <Link
        href={`/products/${item.product.id}`}
        className="shrink-0 w-24 h-24 bg-gray-50 rounded-lg p-2 flex items-center justify-center overflow-hidden"
      >
        <Image
          src={item.product.imageCover}
          alt={item.product.title}
          width={96}
          height={96}
          className="object-contain w-full h-full mix-blend-multiply"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left space-y-1">
        <Link
          href={`/products/${item.product.id}`}
          className="font-semibold text-gray-900 line-clamp-2 hover:text-sky-600 transition-colors"
        >
          {item.product.title}
        </Link>
        <p className="text-sm text-gray-500">
          {item.product.brand.name} • {item.product.category.name}
        </p>
        <div className="text-lg font-bold text-sky-600 sm:hidden">
          {formatCurrency(item.price)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto mt-2 sm:mt-0">
        {/* Quantity */}
        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
          <button
            onClick={handleDecrement}
            disabled={isItemUpdating || isItemRemoving || item.count <= 1}
            className="p-2 text-gray-500 hover:text-sky-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Minus size={16} />
          </button>
          <div className="w-10 text-center font-semibold text-gray-700 text-sm flex items-center justify-center">
            {isItemUpdating ? (
              <Loader2 size={14} className="animate-spin text-sky-600" />
            ) : (
              item.count
            )}
          </div>
          <button
            onClick={handleIncrement}
            disabled={isItemUpdating || isItemRemoving}
            className="p-2 text-gray-500 hover:text-sky-600 disabled:opacity-50 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Price (Desktop) */}
        <div className="hidden sm:block text-lg font-bold text-gray-900 w-24 text-right">
          {formatCurrency(item.price * item.count)}
          <p className="text-xs font-normal text-gray-400">
            {formatCurrency(item.price)} / unit
          </p>
        </div>

        {/* Remove with Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              disabled={isItemUpdating || isItemRemoving}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg sm:ml-2"
            >
              {isItemRemoving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white border-0 shadow-red-200 shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Item?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove <b>{item.product.title}</b> from
                your cart?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-white bg-sky-500 hover:bg-sky-600 cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => removeItem(item.product.id)}
                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
