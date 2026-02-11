"use client";

import { usePathname } from "next/navigation";
import { ShoppingBag, ShieldCheck, Zap, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const contentMap: Record<
  string,
  { title: string; subtitle: string; icon: any }
> = {
  login: {
    title: "Welcome Back to MegaShop",
    subtitle:
      "Unlock exclusive deals and personal recommendations by signing in.",
    icon: ShoppingBag,
  },
  register: {
    title: "Join the MegaShop Community",
    subtitle: "Create an account to start your premium shopping journey today.",
    icon: Star,
  },
  "forgot-password": {
    title: "Account Recovery",
    subtitle: "Don't worry, we'll help you get back into your account safely.",
    icon: ShieldCheck,
  },
  "verify-code": {
    title: "Verify Your Identity",
    subtitle: "Enter the code we sent to your email to continue.",
    icon: Zap,
  },
  "reset-password": {
    title: "Create New Password",
    subtitle: "Choose a strong password to keep your account secure.",
    icon: ShieldCheck,
  },
};

export default function AuthHero() {
  const pathname = usePathname();
  const currentKey =
    Object.keys(contentMap).find((key) => pathname.includes(key)) || "login";
  const content = contentMap[currentKey as keyof typeof contentMap];

  return (
    <div className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden bg-linear-to-br from-sky-600 via-sky-700 to-indigo-800 p-12 text-white">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-300 rounded-full blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentKey}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center space-y-8 max-w-md"
        >
          <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl mx-auto ring-4 ring-white/5">
            <content.icon size={48} className="text-sky-300" />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-tight">
              {content.title}
            </h1>
            <p className="text-sky-100/80 text-lg font-medium leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-xs text-sky-200">Secure Checkout</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-xs text-sky-200">Expert Support</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Decorative Elements */}
      <div className="absolute bottom-12 left-12 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
        <span className="text-xs font-semibold tracking-wide uppercase">
          MegaShop Platform Active
        </span>
      </div>
    </div>
  );
}
