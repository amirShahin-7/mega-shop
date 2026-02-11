"use client";

import React from "react";
import { Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("Thank you for subscribing!");
  };

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl mix-blend-screen animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl mix-blend-screen animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 backdrop-blur-sm mb-4 ring-1 ring-white/20">
              <Mail className="w-6 h-6 text-sky-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Subscribe to our Newsletter
            </h2>
            <p className="text-gray-400 text-lg">
              Get the latest updates on new products and upcoming sales directly
              in your inbox.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 rounded-full px-6 focus-visible:ring-sky-500 focus-visible:border-sky-500 transition-all"
              required
            />
            <Button
              type="submit"
              className="h-12 rounded-full px-8 bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-lg hover:shadow-sky-500/25 transition-all duration-300 group"
            >
              Subscribe
              <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Terms & Conditions and Privacy
            Policy.
          </p>
        </div>
      </div>
    </section>
  );
}
