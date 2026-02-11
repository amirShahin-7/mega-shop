"use client";
import Link from "next/link";
import { ArrowLeftCircle, Home, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const backPath = useRouter();
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-gray-200 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-sky-600 p-6 rounded-full shadow-2xl animate-bounce-slow drop-shadow-2xl">
              <Search size={60} className="text-white" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={() => backPath.back()}
            className="flex items-center gap-2 cursor-pointer bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            <ArrowLeftCircle size={20} />
            <span>Back step</span>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/products"
              className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
            >
              Products
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/brands"
              className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
            >
              Brands
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/categories"
              className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
            >
              Categories
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/cart"
              className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
            >
              Cart
            </Link>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-sky-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-sky-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
}
