import { BrandI } from "@/interfaces";
import { getAllBrands } from "@/server/shopActions/brand.actions";
import { Card, CardFooter, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../animations/ScrollReveal";

export default async function BrandCard() {
  const brands: BrandI[] = await getAllBrands();

  return (
    <main className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold py-6 ps-3">Brands</h2>
      <section className="flex flex-wrap justify-center">
        {brands.map((brand: BrandI, index: number) => (
          <ScrollReveal
            key={brand._id}
            variant="slide-up"
            delay={(index % 4) * 0.1}
            className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <Link href={`/brands/${brand._id}`}>
              <Card className="pt-0 border-sky-300 overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform">
                <div className="overflow-hidden w-full h-80">
                  <Image
                    width={500}
                    height={500}
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-80 object-contain"
                  />
                </div>
                <CardFooter>
                  <CardTitle>{brand.name}</CardTitle>
                </CardFooter>
              </Card>
            </Link>
          </ScrollReveal>
        ))}
      </section>
    </main>
  );
}
