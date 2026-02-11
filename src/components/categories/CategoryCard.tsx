import { getAllCategories } from "@/server/shopActions/category.actions";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { CategoryI } from "@/interfaces";
import Link from "next/link";
import ScrollReveal from "../animations/ScrollReveal";

export default async function CategoryCard() {
  const categories = await getAllCategories();

  return (
    <main className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold py-6 ps-3">Categories</h2>
      <section className="flex flex-wrap justify-center">
        {categories.map((category: CategoryI, index: number) => (
          <ScrollReveal
            key={category._id}
            variant="slide-up"
            delay={(index % 4) * 0.1}
            className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <Link href={`/categories/${category._id}`}>
              <Card className="pt-0 border-sky-300 overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform">
                <div className="overflow-hidden  h-80">
                  <Image
                    width={500}
                    height={500}
                    src={category.image}
                    alt={category.name}
                    className="w-full h-80 object-contain"
                  />
                </div>
                <CardFooter>
                  <CardTitle>{category.name}</CardTitle>
                </CardFooter>
              </Card>
            </Link>
          </ScrollReveal>
        ))}
      </section>
    </main>
  );
}
