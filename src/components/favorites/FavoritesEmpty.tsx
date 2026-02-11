import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavoritesEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <Heart size={48} className="text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        Your Favorites is Empty
      </h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Start adding products to your favorites by clicking the heart icon on
        any product.
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors"
      >
        Browse Products
      </Link>
    </div>
  );
}
