import { ProductI } from "@/interfaces";
import { Badge } from "@/components/ui/badge";
import { Star, Package, TrendingUp } from "lucide-react";

interface ProductInfoProps {
  product: ProductI;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0;

  const rating = product.ratingsAverage || 0;
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={18}
        className={
          i < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300 fill-gray-300"
        }
      />
    ));
  };

  return (
    <div className="space-y-5">
      {/* Brand & Category */}
      <div className="flex flex-wrap items-center gap-2">
        {product.brand?.name && (
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {product.brand.name}
          </Badge>
        )}
        {product.category?.name && (
          <>
            <span className="text-gray-400">•</span>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {product.category.name}
            </Badge>
          </>
        )}
        {product.subcategory[0]?.name && (
          <>
            <span className="text-gray-400">•</span>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {product.subcategory[0]?.name}
            </Badge>
          </>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
        {product.title}
      </h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">{renderStars(rating)}</div>
          <span className="text-sm font-semibold text-gray-700">
            {rating.toFixed(1)}
          </span>
        </div>
        {product.ratingsQuantity > 0 && (
          <span className="text-sm text-gray-500">
            ({product.ratingsQuantity}{" "}
            {product.ratingsQuantity === 1 ? "review" : "reviews"})
          </span>
        )}
      </div>

      {/* Price Section */}
      <div className="bg-linear-to-r from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
        <div className="flex items-center gap-3 flex-wrap">
          {hasDiscount ? (
            <>
              <span className="text-4xl font-bold text-sky-600">
                {product.priceAfterDiscount?.toFixed(2)} EGP
              </span>
              <span className="text-2xl text-gray-400 line-through">
                {product.price} EGP
              </span>
              <Badge className="bg-linear-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1">
                Save {discountPercentage}%
              </Badge>
            </>
          ) : (
            <span className="text-4xl font-bold text-gray-900">
              {product.price} EGP
            </span>
          )}
        </div>
      </div>

      {/* Stock & Sold Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="bg-green-500 p-2 rounded-lg">
            <Package className="text-white" size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-600 font-medium">In Stock</p>
            <p className="text-lg font-bold text-green-700">
              {product.quantity} units
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
          <div className="bg-orange-500 p-2 rounded-lg">
            <TrendingUp className="text-white" size={24} />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs text-gray-600 font-medium">Total Sold</p>
            <p className="text-lg font-bold text-orange-700">
              {product.sold && product.sold.toString().includes("e+")
                ? Math.floor(
                    product.sold
                      .toString()
                      .split("e+")
                      .reduce(
                        (a: number, b: number) => Number(a) + Number(b),
                        0
                      )
                  )
                : product.sold || 0}
              units
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">Description</h3>
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
}
