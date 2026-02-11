"use client";
import { Loader, ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCart } from "@/context/CartContext";

export function CartIcon() {
  const { isLoading, isRemoving, cartData } = useCart();

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      disabled={isLoading}
      className="relative hover:bg-sky-50 text-gray-600 rounded-full w-10 h-10 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Link href="/cart">
        <ShoppingCart size={22} strokeWidth={2} />
        <Badge className="h-5 min-w-5 flex items-center justify-center rounded-full bg-sky-600 text-white px-1 text-[10px] font-bold absolute -top-1 -right-1 border-2 border-white shadow-sm hover:bg-sky-700">
          {isLoading || isRemoving ? (
            <Loader className="animate-spin" />
          ) : (
            cartData?.products.length || 0
          )}
        </Badge>
      </Link>
    </Button>
  );
}
