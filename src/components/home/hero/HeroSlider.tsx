"use client";

import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import heroImg1 from "@/schemas/assets/images/women.webp";
import heroImg2 from "@/schemas/assets/images/Electronics.webp";
import heroImg3 from "@/schemas/assets/images/men's.webp";
import heroImg4 from "@/schemas/assets/images/sony.webp";

// Static slides data
const slides = [
  {
    id: "6439d58a0049ad0b52b9003f",
    title: "Women's Fashion",
    description: "Discover the latest trends in women's fashion",
    image: heroImg1,
    ctaText: "Shop Now",
    pathLink: "/categories/6439d58a0049ad0b52b9003f",
    bgGradient: "from-rose-500/80 to-orange-500/80",
  },
  {
    id: "6439d2d167d9aa4ca970649f",
    title: "New Arrivals in Electronics",
    description: "Discover the latest gadgets and tech",
    image: heroImg2,
    ctaText: "Explore",
    pathLink: "/categories/6439d2d167d9aa4ca970649f",
    bgGradient: "from-blue-600/80 to-cyan-500/80",
  },
  {
    id: "6439d5b90049ad0b52b90048",
    title: "Men's Fashion Week",
    description: "Upgrade your wardrobe properly",
    image: heroImg3,
    ctaText: "View Collection",
    pathLink: "/categories/6439d5b90049ad0b52b90048",
    bgGradient: "from-emerald-600/80 to-teal-500/80",
  },
  {
    id: "64089f5824b25627a25315c7",
    title: "Sony Products",
    description: "Best prices on Sony products",
    image: heroImg4,
    ctaText: "Shop Sony",
    pathLink: "/brands/64089f5824b25627a25315c7",
    bgGradient: "from-violet-600/80 to-purple-500/80",
  },
];

export default function HeroSlider() {
  return (
    <section className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gray-100">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="relative pl-0 h-full">
              {/* Background Image */}
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slide.id === "6439d58a0049ad0b52b9003f"}
                  className="object-cover"
                />

                {/* Overlay Gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-r ${slide.bgGradient} opacity-60 mix-blend-multiply`}
                />
                <div className="absolute inset-0 bg-black/20" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
                  <div className="text-center max-w-3xl space-y-4 md:space-y-6 animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-10">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-100 font-medium drop-shadow-md max-w-xl mx-auto">
                      {slide.description}
                    </p>
                    <div>
                      <Button
                        asChild
                        size="lg"
                        className="bg-white text-gray-900 border-none hover:bg-white/90 hover:scale-105 transition-all duration-300 font-semibold rounded-full px-8 py-6 text-lg shadow-xl"
                      >
                        <Link
                          href={slide.pathLink}
                          className="flex items-center gap-2"
                        >
                          {slide.ctaText}
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
