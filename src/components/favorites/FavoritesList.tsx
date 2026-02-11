"use client";
import FavoritesLoadingSkeleton from "../skeletons/FavoritesSkeleton";
import FavoriteItemCard from "./FavoriteItemCard";
import FavoritesEmpty from "./FavoritesEmpty";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesList() {
  const { favoriteProducts, favoritesCount, isLoading } = useFavorites();

  // Loading state
  if (isLoading) {
    return FavoritesLoadingSkeleton();
  }

  // Empty state
  if (favoriteProducts.length === 0) {
    return <FavoritesEmpty />;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {favoriteProducts.map((product) => (
          <FavoriteItemCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
