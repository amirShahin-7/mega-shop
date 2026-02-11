"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getFavoritesAction } from "@/server/favoriteActions/getFav.actions";
import { addToFavAction } from "@/server/favoriteActions/addFav.actions";
import { deleteFavAction } from "@/server/favoriteActions/deleteFav.actions";
import { ProductI } from "@/interfaces";
import { toast } from "react-toastify";

interface FavoritesContextType {
  favorites: string[];
  favoriteProducts: ProductI[];
  isLoading: boolean;
  isRemoving: string | null; // ✅ Added: ID of product being removed
  isAdding: string | null; // ✅ Added: ID of product being added
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => Promise<void>;
  addFavorite: (productId: string) => Promise<void>;
  removeFavorite: (productId: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<ProductI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState<string | null>(null); // ✅ Added
  const [isAdding, setIsAdding] = useState<string | null>(null); // ✅ Added

  // Load favorites on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  // Load favorites from server
  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const result = await getFavoritesAction();
      if (result.status === "success") {
        setFavoriteProducts(result.data);
        const ids = result.data.map((product: ProductI) => product._id);
        setFavorites(ids);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh favorites (for manual refresh)
  const refreshFavorites = async () => {
    await loadFavorites();
  };

  // Check if product is in favorites
  const isFavorite = (productId: string): boolean => {
    return favorites.includes(productId);
  };

  // Add to favorites
  const addFavorite = async (productId: string) => {
    setIsAdding(productId); // ✅ Set loading state

    try {
      const result = await addToFavAction(productId);

      if (result.status === "success") {
        // Refresh to get updated product list
        await loadFavorites();
        toast.success(result.message || "Added to favorites");
      } else {
        toast.error(result.message || "Failed to add to favorites");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsAdding(null); // ✅ Clear loading state
    }
  };

  // Remove from favorites
  const removeFavorite = async (productId: string) => {
    setIsRemoving(productId); // ✅ Set loading state

    try {
      const result = await deleteFavAction(productId);

      if (result.status === "success") {
        // ✅ Update UI after successful removal
        setFavorites(favorites.filter((id) => id !== productId));
        setFavoriteProducts(
          favoriteProducts.filter((p) => p._id !== productId),
        );
        toast.success(result.message || "Removed from favorites");
      } else {
        toast.error(result.message || "Failed to remove from favorites");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsRemoving(null); // ✅ Clear loading state
    }
  };

  // Toggle favorite (add or remove)
  const toggleFavorite = async (productId: string) => {
    if (isFavorite(productId)) {
      await removeFavorite(productId);
    } else {
      await addFavorite(productId);
    }
  };

  const value: FavoritesContextType = {
    favorites,
    favoriteProducts,
    isLoading,
    isRemoving, // ✅ Added
    isAdding, // ✅ Added
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    refreshFavorites,
    favoritesCount: favorites.length || 0,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}
