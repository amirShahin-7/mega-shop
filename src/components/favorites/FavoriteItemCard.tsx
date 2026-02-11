"use client";
import { FavoriteItemCardProps, ProductI } from "@/interfaces";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Star, Trash2, Eye, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoriteItemCard({ product }: FavoriteItemCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const { removeFavorite } = useFavorites();

  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeFavorite(product._id);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Card className="group overflow-hidden border-gray-200 hover:border-sky-300 transition-all duration-300 hover:shadow-lg lg:max-w-4xl">
      <div className="flex flex-wrap gap-4 p-4">
        {/* Image */}
        <div className="relative aspect-square sm:aspect-auto sm:h-48 bg-gray-100 rounded-lg overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.imageCover}
              alt={product.title}
              width={400}
              height={400}
              className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          </Link>
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -
              {Math.round(
                ((product.price - product.priceAfterDiscount!) /
                  product.price) *
                  100,
              )}
              %
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-0 flex flex-col lg:w-[80%] justify-between">
          <div className="space-y-3">
            {/* Brand & Category */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-medium">{product.brand.name}</span>
              <span>•</span>
              <span>{product.category.name}</span>
            </div>

            {/* Title */}
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 hover:text-sky-600 transition-colors">
                {product.title}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-gray-800">
                  {product.ratingsAverage.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                ({product.ratingsQuantity} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-bold text-sky-600">
                    {product.priceAfterDiscount} EGP
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {product.price} EGP
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  {product.price} EGP
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Link
              href={`/products/${product.id}`}
              className="w-full border-2 hover:border-sky-500 hover:text-sky-600 flex justify-center items-center rounded-lg"
            >
              <Eye size={16} className="mr-1" />
              <span>View</span>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isRemoving}
                  className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 size={16} className="mr-1" />
                  {isRemoving ? <Loader className="animate-spin" /> : "Remove"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white border-0 shadow-red-200 shadow-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove from Favorites?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove "
                    {product.title.slice(0, 30)}" from your favorites? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-white bg-sky-500 hover:bg-sky-600 cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleRemove}
                    className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                  >
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
