"use client";

import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { CategoryI } from "@/interfaces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function CategoryCarouselClient({
  categories,
}: {
  categories: CategoryI[];
}) {
  if (!categories || categories.length === 0) return null;

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {categories.map((category) => (
          <CarouselItem
            key={category._id}
            className="pl-4 basis-1/3 md:basis-1/5 lg:basis-[14.28%]"
          >
            <Link
              href={`/categories/${category._id}`}
              className="group block text-center"
            >
              <div className="relative aspect-square rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-sky-500 transition-all duration-300 shadow-xs group-hover:shadow-lg mb-3">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="font-medium text-gray-700 group-hover:text-sky-600 transition-colors text-sm md:text-base">
                {category.name}
              </h3>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
