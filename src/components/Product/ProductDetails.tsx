import { ProductI } from "@/interfaces";
import { Card } from "../ui/card";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import AddToCart from "../cart/AddToCart";
import RelatedProducts from "./RelatedProducts";
import { getRelatedProducts } from "@/server/shopActions/products.actions";
import FavoriteIcon from "../favorites/FavoriteIcon";
import ScrollReveal from "../animations/ScrollReveal";
import BuyNowBtn from "../cart/BuyNowBtn";

export default async function ProductDetails({
  product,
}: {
  product: ProductI;
}) {
  const relatedProducts = await getRelatedProducts(
    product.category._id,
    product.id,
    8
  );

  const finalPrice = product.priceAfterDiscount || product.price;

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-8 space-y-12">
      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-start space-y-4">
          {/* Image Gallery */}
          <ScrollReveal
            variant="fade"
            className="w-full lg:w-4/12 rounded-2xl overflow-hidden shadow-2xl"
          >
            {product.images && (
              <ProductImageGallery
                images={product.images}
                title={product.title}
              />
            )}
          </ScrollReveal>

          {/* Product Info & Actions */}
          <ScrollReveal
            variant="slide-up"
            delay={0.2}
            className="w-full lg:w-8/12 px-3"
          >
            <Card className="border-0 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 ">
              <ProductInfo product={product} />

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Actions Section */}
              <div className="space-y-4">
                <AddToCart
                  variant="detailed"
                  productPrice={finalPrice}
                  maxQuantity={product.quantity}
                  productId={product.id}
                />

                <div className="grid grid-cols-2 gap-3">
                  <BuyNowBtn productId={product.id} />
                  <FavoriteIcon productId={product._id} variant="button" />
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <ScrollReveal variant="slide-up" className="max-w-7xl mx-auto">
          <RelatedProducts products={relatedProducts} />
        </ScrollReveal>
      )}
    </div>
  );
}
