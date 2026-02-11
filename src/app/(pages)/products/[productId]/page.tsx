import ProductDetails from "@/components/Product/ProductDetails";
import { getSpecificProduct } from "@/server/shopActions/products.actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";
import ProductDetailsLoadingSkeleton from "@/components/skeletons/ProductDetailsSkeletion";
import TopSidebarShop from "@/components/topSidebarShop/TopSidebarShop";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;

  try {
    const product = await getSpecificProduct(productId);
    return {
      title: `${product?.title} | Mega Shop`,
      description: product?.description?.slice(0, 160) || "Product details",
      openGraph: {
        title: product?.title,
        description: product?.description?.slice(0, 160),
        images: [
          {
            url: product?.imageCover!,
            width: 800,
            height: 600,
            alt: product?.title,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found",
    };
  }
}

async function ProductContent({ productId }: { productId: string }) {
  const product = await getSpecificProduct(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  if (!productId || typeof productId !== "string") {
    notFound();
  }
  const product = await getSpecificProduct(productId);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <TopSidebarShop
        name={product?.subcategory[0]?.name || ""}
        image={product?.imageCover || ""}
        path={"products"}
      />

      <Suspense fallback={<ProductDetailsLoadingSkeleton />}>
        <ProductContent productId={productId} />
      </Suspense>
    </div>
  );
}
