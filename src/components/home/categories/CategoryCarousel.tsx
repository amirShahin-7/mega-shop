import { getAllCategories } from "@/server/shopActions/category.actions";

import { LayoutGrid } from "lucide-react";
import CategoryCarouselClient from "./CategoryCarouselClient";

export default async function CategoryCarousel() {
  const categories = await getAllCategories();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-100 rounded-lg">
            <LayoutGrid className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
        </div>

        <CategoryCarouselClient categories={categories} />
      </div>
    </section>
  );
}
