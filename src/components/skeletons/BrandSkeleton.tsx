import { Skeleton } from "../ui/skeleton";

export default function BrandSkeleton() {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <Skeleton className="h-8 w-40 mb-8" />

        <div className="flex gap-8 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex-[0_0_40%] sm:flex-[0_0_25%] md:flex-[0_0_20%] lg:flex-[0_0_12.5%] min-w-0"
            >
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
