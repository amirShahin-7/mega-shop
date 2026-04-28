"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, ArrowRight, ShoppingBag } from "lucide-react";
import { ProductI } from "@/interfaces";
import { searchProducts } from "@/server/shopActions/products.actions";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/helpers/currencyHelper";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState<"text" | "price">("text");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
      setSearchMode("text");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(async () => {
      const cleanQuery = query.trim();

      // Auto-detect price mode
      const isPrice = /^\d+$/.test(cleanQuery);
      setSearchMode(isPrice ? "price" : "text");

      if (cleanQuery.length >= 1) {
        setIsLoading(true);
        try {
          const searchKeyword = isPrice ? undefined : cleanQuery;
          const searchPrice = isPrice ? parseInt(cleanQuery) : undefined;

          const data = await searchProducts(searchKeyword, searchPrice);
          setResults(data);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
          />

          {/* Search Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Search Input Area */}
            <div className="p-3 sm:p-6 border-b border-gray-100 flex items-center gap-2 sm:gap-4">
              <div
                className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-colors ${
                  searchMode === "price"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-sky-50 text-sky-600"
                }`}
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 flex flex-col">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products or type a price..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent text-base sm:text-xl font-medium text-gray-900 placeholder-gray-400 outline-none w-full"
                />
                {searchMode === "price" && query.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mt-1"
                  >
                    Filtering by price: Under {formatCurrency(parseInt(query))}
                  </motion.p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto p-2 sm:p-4 custom-scrollbar">
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12 space-y-3 sm:space-y-4">
                  <Loader2 className="animate-spin text-sky-600 w-6 h-6 sm:w-8 sm:h-8" />
                  <p className="text-gray-500 font-medium text-sm sm:text-base">
                    Searching MegaShop...
                  </p>
                </div>
              )}

              {!isLoading && results.length > 0 && (
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
                    Found {results.length} results
                  </p>
                  {results.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={`/products/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-sky-50 group transition-all"
                      >
                        <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-lg sm:rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                          <Image
                            src={product.imageCover}
                            alt={product.title}
                            width={200}
                            height={200}
                            className="object-contain p-2 group-hover:scale-110 transition-transform w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-1 group-hover:text-sky-600 transition-colors">
                            {product.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {product.brand.name}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-xs sm:text-base text-sky-600">
                            {formatCurrency(
                              product.priceAfterDiscount || product.price
                            )}
                          </p>
                          <div className="flex items-center gap-1 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold uppercase">
                              View
                            </span>
                            <ArrowRight size={12} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {!isLoading && query.length >= 1 && results.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-full mb-3 sm:mb-4">
                    <ShoppingBag className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    No products found
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base max-w-62.5 mx-auto mt-2 px-2">
                    {searchMode === "price"
                      ? `No products under ${formatCurrency(
                          parseInt(query)
                        )}.`
                      : `Nothing matching "${query}". Try a price (e.g., "1000").`}
                  </p>
                </div>
              )}

              {query.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center text-gray-400">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4 opacity-20" />
                  <p className="text-xs sm:text-sm font-medium px-2">
                    Search by name or type a number for price range
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-2.5 sm:p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[9px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider sm:tracking-widest">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="bg-white px-1.5 py-0.5 rounded border border-gray-200">
                    ESC
                  </span>{" "}
                  Close
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="bg-white px-1.5 py-0.5 rounded border border-gray-200">
                    ENTER
                  </span>{" "}
                  View Product
                </span>
              </div>
              <div className="hidden sm:block">
                Powered by <span className="text-sky-600">MegaShop AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
