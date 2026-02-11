"use client";
import { ProductI } from "@/interfaces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SingleProductCard } from "./ProductCard";
import Autoplay from "embla-carousel-autoplay";
import ScrollReveal from "../animations/ScrollReveal";

export default function RelatedProducts({
  products,
}: {
  products: ProductI[];
}) {
  if (!products || products.length === 0) return null;

  return (
    <div className="w-full space-y-6 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          You May Also Like
        </h2>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product, index) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <ScrollReveal
                variant="slide-up"
                delay={(index % 5) * 0.1}
                threshold={0.05}
              >
                <SingleProductCard product={product} />
              </ScrollReveal>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-8 rounded-full bg-black text-white hover:scale-110 cursor-pointer" />
        <CarouselNext className="hidden md:flex -right-8 rounded-full bg-black text-white hover:scale-110 cursor-pointer" />
      </Carousel>
    </div>
  );
}
