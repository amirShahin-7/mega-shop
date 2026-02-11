"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, LogOut, ChevronRight, UserCircle2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { NavMenuProps } from "@/interfaces";
import { signOut, useSession } from "next-auth/react";
import { Separator } from "../ui/separator";

export function MobileMenu({ navLinks, pathName }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const user = session.data?.user;
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-sky-50 text-gray-700"
        >
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-75 sm:w-87.5 p-0 border-l border-gray-100 bg-white"
      >
        <SheetHeader className="px-6 py-6 bg-linear-to-br from-sky-50 to-white border-b border-gray-100 text-left">
          <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
          <SheetDescription className="sr-only">Navigation</SheetDescription>

          {session.status === "authenticated" ? (
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-xl ring-2 ring-white shadow-md">
                {user?.name?.[0].toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">
                  Hi, {user?.name?.split(" ")[0]}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-45">
                  {user?.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-xl text-gray-900">
                Welcome to MegaShop
              </h3>
              <p className="text-sm text-gray-500">
                Sign in to access your account
              </p>
              <div className="flex gap-3 mt-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  <Button className="w-full bg-sky-600 hover:bg-sky-700 shadow-md shadow-sky-200">
                    Login
                  </Button>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full border-gray-200 hover:bg-gray-50 hover:text-sky-600"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-140px)] overflow-y-auto">
          {/* Main Navigation */}
          <div className="px-4 py-6">
            <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Menu
            </p>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathName === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      ${isActive ? "bg-sky-50 text-sky-700 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                      flex items-center gap-3 p-3 rounded-xl transition-all group
                    `}
                  >
                    <Icon
                      size={20}
                      className={
                        isActive
                          ? "text-sky-600"
                          : "text-gray-400 group-hover:text-gray-600"
                      }
                    />
                    <span className="flex-1">{link.label}</span>
                    <ChevronRight
                      size={16}
                      className={`text-gray-300 ${isActive ? "text-sky-400" : ""}`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {session.status === "authenticated" && (
            <>
              <Separator className="bg-gray-100" />

              {/* User Account */}
              <div className="px-4 py-6">
                <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Account
                </p>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/profile/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all group"
                  >
                    <UserCircle2
                      size={20}
                      className="text-gray-400 group-hover:text-gray-600"
                    />
                    <span className="flex-1">My Profile</span>
                  </Link>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-all w-full text-left mt-2"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
