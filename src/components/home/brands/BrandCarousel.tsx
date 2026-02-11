import { getAllBrands } from "@/server/shopActions/brand.actions";
import BrandCarouselClient from "./BrandCarouselClient";


export default async function BrandCarousel() {
  const brands = await getAllBrands();

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Brand</h2>
        <BrandCarouselClient brands={brands} />
      </div>
    </section>
  );
}
