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
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-20 px-4 sm:px-6">
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
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Search Input Area */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <div
                className={`p-3 rounded-2xl transition-colors ${
                  searchMode === "price"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-sky-50 text-sky-600"
                }`}
              >
                <Search size={24} />
              </div>
              <div className="flex-1 flex flex-col">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Try '500' for products under 500 EGP..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent text-xl font-medium text-gray-900 placeholder-gray-400 outline-none"
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
                <X size={24} />
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="animate-spin text-sky-600" size={32} />
                  <p className="text-gray-500 font-medium">
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
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-sky-50 group transition-all"
                      >
                        <div className="relative h-16 w-16 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                          <Image
                            src={product.imageCover}
                            alt={product.title}
                            width={200}
                            height={200}
                            className="object-contain p-2 group-hover:scale-110 transition-transform w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate group-hover:text-sky-600 transition-colors">
                            {product.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {product.brand.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sky-600">
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
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <ShoppingBag size={48} className="text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    No products found
                  </h3>
                  <p className="text-gray-500 max-w-62.5 mx-auto mt-2">
                    {searchMode === "price"
                      ? `We couldn't find any products under ${formatCurrency(
                          parseInt(query)
                        )}.`
                      : `We couldn't find anything matching "${query}". Try searching by price (e.g., "1000").`}
                  </p>
                </div>
              )}

              {query.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                  <Search size={40} className="mb-4 opacity-20" />
                  <p className="text-sm font-medium">
                    Search by name or type a number for price range
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest">
              <div className="flex items-center gap-4">
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
