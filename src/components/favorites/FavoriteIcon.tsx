"use client";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useFavorites } from "@/context/FavoritesContext";
import { FavoriteIconProps } from "@/interfaces";

export default function FavoriteIcon({
  productId,
  variant = "icon",
}: FavoriteIconProps) {
  const {
    isFavorite: checkIsFavorite,
    toggleFavorite,
    isAdding,
    isRemoving,
    isLoading: contextLoading,
  } = useFavorites();

  const [isLoadingIcon, setIsLoadingIcon] = useState(true);

  const isFavorite = checkIsFavorite(productId);

  const isProcessing = isAdding === productId || isRemoving === productId;

  useEffect(() => {
    if (!contextLoading) {
      setIsLoadingIcon(false);
    }
  }, [contextLoading]);

  const handleToggle = async () => {
    await toggleFavorite(productId);
  };
  //  Icon in Product details
  if (variant === "button") {
    return (
      <Button
        disabled={isProcessing || isLoadingIcon}
        onClick={handleToggle}
        size={"lg"}
        className={`flex items-center justify-center group  gap-2 w-full rounded-xl font-semibold cursor-pointer border-2 border-red-200  hover:bg-red-50 transition-all group ${
          isFavorite ? "bg-red-200 " : " text-red-500 "
        }${isProcessing && "opacity-50 cursor-not-allowed"}`}
      >
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all`}
        >
          {isProcessing ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Heart
              size={20}
              fill={isFavorite ? "currentColor" : "none"}
              className={`${
                isFavorite && "text-red-500"
              } group-hover:animate-ping duration-1000 transition-all`}
            />
          )}
        </div>
        <span className="text-sm text-red-800">
          {isFavorite ? "In Wishlist" : "Add to Wishlist"}
        </span>
      </Button>
    );
  }

  //  Icon in Product card
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleToggle}
          disabled={isProcessing || isLoadingIcon}
          className={`${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/95 backdrop-blur-sm text-gray-700 hover:text-red-500"
          } p-2 rounded-full shadow-lg hover:scale-110 transition-all cursor-pointer ${
            isProcessing ? "opacity-50 cursor-not-allowed scale-100" : ""
          }`}
        >
          {isProcessing ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="left"
        className="bg-gray-900 text-white text-xs border-0"
      >
        {isProcessing ? (
          <p>Processing...</p>
        ) : isFavorite ? (
          <p>Remove from favorites</p>
        ) : (
          <p>Add to favorites</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
