import ProductCard from "@/components/Product/ProductCard";
import {
  getAllProductCategory,
  getSpecificCategory,
} from "@/server/shopActions/category.actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";
import ProductsLoadingSkeleton from "@/components/skeletons/ProductsSkeleton";
import NoProductFound from "@/components/Product/NoProductFound";
import TopSidebarShop from "@/components/topSidebarShop/TopSidebarShop";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}): Promise<Metadata> {
  const { categoryId } = await params;

  try {
    const categoryData = await getSpecificCategory(categoryId);

    if (!categoryData) {
      return {
        title: "Category Not Found",
      };
    }

    return {
      title: `${categoryData.name} | Your Store Name`,
      description: `Shop ${categoryData.name} products. Find the best deals and quality items.`,
      openGraph: {
        title: categoryData.name,
        description: `Shop ${categoryData.name} products`,
        images: categoryData.image
          ? [
              {
                url: categoryData.image,
                width: 800,
                height: 600,
                alt: categoryData.name,
              },
            ]
          : undefined,
      },
    };
  } catch (error) {
    return {
      title: "Category Not Found",
    };
  }
}
async function CategoryProductsContent({ categoryId }: { categoryId: string }) {
  const productData = await getAllProductCategory(categoryId);

  if (!productData || productData.length === 0) {
    return <NoProductFound textInfo={"category"} />;
  }

  return <ProductCard productData={productData} />;
}

// Main Page Component
export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  if (!categoryId || typeof categoryId !== "string") {
    notFound();
  }

  const categoryData = await getSpecificCategory(categoryId);

  if (!categoryData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header Section */}
      <TopSidebarShop
        name={categoryData.name}
        image={categoryData.image}
        path={"categories"}
      />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto py-8">
        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <CategoryProductsContent categoryId={categoryData._id} />
        </Suspense>
      </div>
    </div>
  );
}
