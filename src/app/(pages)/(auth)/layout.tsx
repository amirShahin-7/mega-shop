"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AuthHero from "@/components/auth/AuthHero";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-[calc(100vh-6rem)] grid lg:grid-cols-2 bg-white overflow-hidden rounded-3xl mx-4 lg:mx-12 shadow-2xl border border-gray-100 my-8">
      {/* Left Side: Hero */}
      <AuthHero />

      {/* Right Side: Forms with Animation */}
      <div className="relative flex flex-col justify-center items-center py-12 px-6 sm:px-12 bg-gray-50/30 backdrop-blur-sm">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 },
            }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {/* Footer Brand (shown on mobile, subtle on desktop) */}
        <div className="absolute bottom-8 text-center pointer-events-none">
          <p className="text-sm font-medium text-gray-400">
            Powered by <span className="text-sky-600 font-bold">MegaShop</span>
          </p>
        </div>
      </div>
    </div>
  );
}
