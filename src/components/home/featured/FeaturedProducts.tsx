import { getAllProducts } from "@/server/shopActions/products.actions";
import ProductCard from "@/components/Product/ProductCard";
import { Star } from "lucide-react";

export default async function FeaturedProducts() {
  const products = await getAllProducts();
  const featuredProducts = products?.slice(0, 8) || [];

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600">
              Featured Products
            </h2>
            <Star className="text-yellow-400 fill-yellow-400" />
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our handpicked selection of top-rated products tailored to
            your taste and lifestyle.
          </p>
        </div>

        <ProductCard productData={featuredProducts} />
      </div>
    </section>
  );
}
