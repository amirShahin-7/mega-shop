"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Settings, UserCircle } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export function UserDropdown() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-sky-50 text-gray-600"
        >
          <UserCircle size={26} strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 mt-2 border-gray-100 shadow-xl bg-white/95 backdrop-blur-sm rounded-xl p-2"
        align="end"
      >
        <DropdownMenuLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 py-1.5">
          Account
        </DropdownMenuLabel>

        {session.status == "authenticated" ? (
          <>
            <div className="px-2 py-1.5 mb-2 bg-sky-50/50 rounded-lg">
              <p className="text-sm font-bold text-gray-900 truncate">
                {session.data.user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session.data.user.email}
              </p>
            </div>

            <DropdownMenuItem
              asChild
              className="cursor-pointer rounded-lg focus:bg-sky-50 focus:text-sky-700 text-gray-600 py-2.5"
            >
              <Link
                href="/profile/settings"
                className="flex items-center gap-2.5"
              >
                <Settings size={16} />
                <span className="font-medium">Settings</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-gray-100 my-1" />

            <DropdownMenuItem
              asChild
              className="text-rose-600 focus:text-rose-700 focus:bg-rose-50 cursor-pointer rounded-lg py-2.5"
            >
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2.5 w-full"
              >
                <LogOut size={16} />
                <span className="font-medium">Log Out</span>
              </button>
            </DropdownMenuItem>
          </>
        ) : (
          <div className="flex flex-col gap-1">
            <DropdownMenuItem
              asChild
              className="cursor-pointer rounded-lg focus:bg-gray-50"
            >
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="cursor-pointer rounded-lg focus:bg-gray-50"
            >
              <Link href="/register">Register</Link>
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
