import ProductCard from "@/components/Product/ProductCard";
import {
  getAllProductBrand,
  getSpecificBrand,
} from "@/server/shopActions/brand.actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";
import ProductsLoadingSkeleton from "@/components/skeletons/ProductsSkeleton";
import NoProductFound from "@/components/Product/NoProductFound";
import TopSidebarShop from "@/components/topSidebarShop/TopSidebarShop";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brandId: string }>;
}): Promise<Metadata> {
  const { brandId } = await params;

  try {
    const brandData = await getSpecificBrand(brandId);

    if (!brandData) {
      return {
        title: "Brand Not Found",
      };
    }

    return {
      title: `${brandData.name} Products | Your Store Name`,
      description: `Shop all products from ${brandData.name}. Discover quality items and great deals.`,
      openGraph: {
        title: `${brandData.name} Products`,
        description: `Shop all products from ${brandData.name}`,
        images: brandData.image
          ? [
              {
                url: brandData.image,
                width: 800,
                height: 600,
                alt: brandData.name,
              },
            ]
          : undefined,
      },
    };
  } catch (error) {
    return {
      title: "Brand Not Found",
    };
  }
}

async function BrandProductsContent({ brandId }: { brandId: string }) {
  const productData = await getAllProductBrand(brandId);

  if (!productData || productData.length === 0) {
    return <NoProductFound textInfo={"brands"} />;
  }

  return <ProductCard productData={productData} />;
}

// Main Page Component
export default async function ProductBrandPage({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;

  if (!brandId || typeof brandId !== "string") {
    notFound();
  }

  const brandData = await getSpecificBrand(brandId);

  if (!brandData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header Section */}
      <TopSidebarShop
        name={brandData.name}
        image={brandData.image}
        path={"brands"}
      />
      {/* Products Grid */}
      <div className="max-w-7xl mx-auto py-8">
        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <BrandProductsContent brandId={brandData._id} />
        </Suspense>
      </div>
    </div>
  );
}
