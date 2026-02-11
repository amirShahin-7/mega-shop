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
      className="relative hover:bg-rose-50 text-gray-600 hover:text-rose-500 rounded-full w-10 h-10"
    >
      <Link href="/profile/favorites">
        <Heart size={22} strokeWidth={2} />
        <Badge className="h-5 min-w-5 flex items-center justify-center rounded-full bg-rose-500 text-white px-1 text-[10px] font-bold absolute -top-1 -right-1 border-2 border-white shadow-sm hover:bg-rose-600">
          {isLoading ? (
            <Loader size={10} className="animate-spin" />
          ) : (
            favoritesCount || 0
          )}
        </Badge>
      </Link>
    </Button>
  );
};

export default FavoriteIcon;
