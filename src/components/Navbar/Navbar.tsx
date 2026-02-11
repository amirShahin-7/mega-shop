"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Tag, Grid3x3, Home, Search } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { UserDropdown } from "./UserDropdown";
import { CartIcon } from "./CartIcon";
import { NavLinks } from "./NavLinks";
import FavoriteIcon from "./FavoriteIcon";
import { useSession } from "next-auth/react";
import { SearchOverlay } from "./SearchOverlay";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

const Navbar = () => {
  const pathName = usePathname();
  const session = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut CMD+K or CTRL+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Shop", icon: Package },
    { href: "/brands", label: "Brands", icon: Tag },
    { href: "/categories", label: "Categories", icon: Grid3x3 },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm transition-all duration-300">
        <section className="flex flex-wrap md:space-y-4 xl:space-y-0 md:items-center justify-between md:justify-center lg:justify-between items-center px-4 py-3 md:max-w-[85%] mx-auto transition-all">
          {/* Left Side: Logo & Search */}
          <div className="flex items-center gap-6">
            <Link href={"/"} className="flex items-center gap-2 group">
              <span className="bg-sky-600 p-2 rounded-xl text-white font-bold text-sm shadow-lg shadow-sky-200 group-hover:scale-105 transition-transform duration-300">
                M
              </span>
              <span className="font-bold text-2xl text-gray-800 tracking-tight group-hover:text-sky-600 transition-colors duration-300">
                MegaShop
              </span>
            </Link>

            <Button
              onClick={() => setIsSearchOpen(true)}
              variant="ghost"
              className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-100 text-gray-400 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all group"
            >
              <Search
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-sm font-medium">Quick Search...</span>
              <span className="ml-4 text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border border-gray-200 shadow-xs">
                ⌘K
              </span>
            </Button>
          </div>

          {/* Desktop Menu */}
          <NavLinks navLinks={navLinks} pathName={pathName} />

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Trigger */}
            <Button
              onClick={() => setIsSearchOpen(true)}
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-sky-50 text-gray-600"
            >
              <Search size={22} />
            </Button>

            {session.status == "authenticated" && (
              <>
                <h4 className="text-gray-600 font-medium text-sm hidden lg:block">
                  Hi,
                  <span className="text-sky-600 font-bold">
                    {session.data?.user.name?.split(" ")[0] || "User"}
                  </span>
                </h4>
                <div className="h-6 w-px bg-gray-300 hidden sm:block" />
                {/* Favorite page */}
                <FavoriteIcon />
                {/* cart page */}
                <CartIcon />
              </>
            )}

            <div className="hidden md:block ml-2">
              <UserDropdown />
            </div>

            <MobileMenu navLinks={navLinks} pathName={pathName} />
          </div>
        </section>
      </nav>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
