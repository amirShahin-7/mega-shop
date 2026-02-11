import ProductCard from "@/components/Product/ProductCard";
import { getAllProducts } from "@/server/shopActions/products.actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductsLoadingSkeleton from "@/components/skeletons/ProductsSkeleton";


export const metadata = {
  title: "Products | Mega Shop",
  description: "Browse our collection of quality products",
};

async function ProductsContent() {
  const data = await getAllProducts();

  if (!data || data.length === 0) {
    notFound();
  }

  return <ProductCard productData={data} />;
}
export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Products
            </h1>
            <p className="text-gray-600">
              Discover our wide range of quality products
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-8">
        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <ProductsContent />
        </Suspense>
      </div>
    </div>
  );
}

