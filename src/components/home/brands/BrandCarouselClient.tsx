"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { BrandI } from "@/interfaces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function BrandCarouselClient({ brands }: { brands: BrandI[] }) {
  if (!brands || brands.length === 0) return null;

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
      <CarouselContent className="">
        {brands.map((brand) => (
          <CarouselItem
            key={brand._id}
            className="basis-2/5 sm:basis-1/4 md:basis-1/5 lg:basis-[12.5%]"
          >
            <Link
              href={`/brands/${brand._id}`}
              className="block opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <div className="relative h-16 w-full">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
