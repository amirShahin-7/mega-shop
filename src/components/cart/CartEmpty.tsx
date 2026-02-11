import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <div className="bg-sky-50 p-6 rounded-full inline-flex">
        <ShoppingCart size={48} className="text-sky-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 max-w-sm mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our
          products and find something you love!
        </p>
      </div>
      <Link
        href="/products"
        className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg shadow-sky-200 hover:translate-y-[-2px] transition-all"
      >
        Start Shopping
      </Link>
    </div>
  );
}
