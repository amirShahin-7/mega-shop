import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ProductI } from "@/interfaces";
import Image from "next/image";
import { Star, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FavoriteIcon from "../favorites/FavoriteIcon";
import AddToCart from "../cart/AddToCart";
import { formatCurrency } from "@/helpers/currencyHelper";

import ScrollReveal from "../animations/ScrollReveal";

const ProductCard = ({ productData }: { productData: ProductI[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4">
      {productData?.map((product, index) => (
        <ScrollReveal
          key={product.id}
          variant="slide-up"
          delay={(index % 4) * 0.1}
        >
          <SingleProductCard product={product} />
        </ScrollReveal>
      ))}
    </div>
  );
};

export const SingleProductCard = ({ product }: { product: ProductI }) => {
  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100,
      )
    : 0;

  return (
    <Card className="group relative overflow-hidden bg-white border-gray-200/60 hover:border-sky-300/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 rounded-xl h-120 flex flex-col">
      {/* Image Section - Fixed Height */}
      <div className="relative overflow-hidden h-48">
        <Link href={`/products/${product.id}`}>
          <Image
            width={500}
            height={500}
            src={product.imageCover}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Linear Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <div className="bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
              <TrendingUp size={11} />
              {discountPercentage}%
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <FavoriteIcon productId={product._id} />

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/products/${product.id}`}
                className="bg-white/95 backdrop-blur-sm text-gray-700 p-2 rounded-full shadow-lg hover:bg-sky-500 hover:text-white transition-all duration-300"
              >
                <Eye size={16} />
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="bg-gray-900 text-white text-xs"
            >
              <p>Quick view</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Content Section - Flex Grow */}
      <CardContent className="p-3 flex-1 flex flex-col">
        {/* Brand & Category */}
        <div className="flex items-center gap-1.5 mb-2">
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            {product.brand.name}
          </Badge>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-gray-500">{product.category.name}</span>
        </div>

        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 hover:text-sky-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-auto">
          <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-gray-800">
              {product.ratingsAverage.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            ({product.ratingsQuantity})
          </span>
        </div>
      </CardContent>

      {/* Footer - Fixed at Bottom */}
      <CardFooter className="p-3 pt-0 flex flex-col gap-2">
        {/* Price */}
        <div className="flex items-baseline justify-between w-full">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-sky-600">
                {formatCurrency(product.priceAfterDiscount!)}
              </p>
              <p className="text-sm text-gray-400 line-through">
                {formatCurrency(product.price)}
              </p>
            </div>
          ) : (
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </p>
          )}
        </div>
        {/* Add to Cart Button */}
        <AddToCart variant="default" productId={product.id} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
