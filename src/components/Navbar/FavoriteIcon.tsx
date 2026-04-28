"use client";
import Link from "next/link";
import { Heart, Loader } from "lucide-react";
import { Badge } from "../ui/badge";
import { useFavorites } from "@/context/FavoritesContext";
import { Button } from "../ui/button";

const FavoriteIcon = () => {
  const { favoritesCount, isLoading } = useFavorites();

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="relative hover:bg-rose-50 text-gray-600 hover:text-rose-500 rounded-full w-8 h-8 sm:w-10 sm:h-10 transition-colors"
    >
      <Link href="/profile/favorites">
        <Heart className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" strokeWidth={2} />
        <Badge className="h-4 min-w-4 sm:h-5 sm:min-w-5 flex items-center justify-center rounded-full bg-rose-500 text-white px-0.5 sm:px-1 text-[9px] sm:text-[10px] font-bold absolute -top-1 -right-1 border-2 border-white shadow-sm hover:bg-rose-600">
          {isLoading ? (
            <Loader className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin" />
          ) : (
            favoritesCount || 0
          )}
        </Badge>
      </Link>
    </Button>
  );
};

export default FavoriteIcon;
