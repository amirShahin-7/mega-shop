import { Suspense } from "react";
import HeroSlider from "../hero/HeroSlider";
import FlashDeals from "../flashDeals/FlashDeals";
import FeaturedProducts from "../featured/FeaturedProducts";
import CategoryCarousel from "../categories/CategoryCarousel";
import BrandCarousel from "../brands/BrandCarousel";
import WhyChooseUs from "../whyChooseUs/WhyChooseUs";
import Newsletter from "../newsletter/Newsletter";
import CategorySkeleton from "@/components/skeletons/CategorySkeleton";
import BrandSkeleton from "@/components/skeletons/BrandSkeleton";
import FlashDealsSkeleton from "@/components/skeletons/FlashDealsSkeleton";
import ProductsLoadingSkeleton from "@/components/skeletons/ProductsSkeleton";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function HomeScreen() {
  return (
    <div className="flex flex-col gap-10">
      <ScrollReveal variant="fade">
        <HeroSlider />
      </ScrollReveal>

      <ScrollReveal variant="slide-up">
        <WhyChooseUs />
      </ScrollReveal>

      <ScrollReveal variant="slide-up" delay={0.1}>
        <Suspense fallback={<CategorySkeleton />}>
          <CategoryCarousel />
        </Suspense>
      </ScrollReveal>

      <ScrollReveal variant="slide-up" delay={0.2}>
        <Suspense fallback={<FlashDealsSkeleton />}>
          <FlashDeals />
        </Suspense>
      </ScrollReveal>

      <ScrollReveal variant="slide-up">
        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </ScrollReveal>

      <ScrollReveal variant="slide-up" delay={0.1}>
        <Suspense fallback={<BrandSkeleton />}>
          <BrandCarousel />
        </Suspense>
      </ScrollReveal>

      <ScrollReveal variant="slide-up" delay={0.2}>
        <Newsletter />
      </ScrollReveal>
    </div>
  );
}
