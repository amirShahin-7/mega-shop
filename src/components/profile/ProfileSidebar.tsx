"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Settings,
  Package,
  MapPin,
  Heart,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  {
    title: "Settings",
    href: "/profile/settings",
    icon: Settings,
  },
  {
    title: "My Orders",
    href: "/profile/orders",
    icon: Package,
  },
  {
    title: "My Addresses",
    href: "/profile/addresses",
    icon: MapPin,
  },
  {
    title: "My Favorites",
    href: "/profile/favorites",
    icon: Heart,
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
      <div className="p-6 border-b border-gray-50 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-linear-to-tr from-sky-400 to-sky-600 flex items-center justify-center text-white">
          <User size={24} />
        </div>
        <div>
          <h2 className="font-bold text-gray-900 line-clamp-1">My Account</h2>
          <p className="text-xs text-gray-500">Manage your profile</p>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-sky-50 text-sky-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={20}
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-sky-600"
                      : "text-gray-400 group-hover:text-gray-600",
                  )}
                />
                <span>{link.title}</span>
              </div>
              <ChevronRight
                size={16}
                className={cn(
                  "transition-transform",
                  isActive
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                )}
              />
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-gray-50">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
