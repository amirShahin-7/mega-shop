"use client";

import { SingleProductCard } from "@/components/Product/ProductCard";
import { ProductI } from "@/interfaces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function FlashDealsCarousel({
  products,
}: {
  products: ProductI[];
}) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No flash deals available at the moment.
      </div>
    );
  }

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <SingleProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
