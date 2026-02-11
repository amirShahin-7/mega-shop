import { Skeleton } from "../ui/skeleton";


export default function CategorySkeleton() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </div>

        <div className="flex gap-4 md:gap-8 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex-[0_0_33.33%] md:flex-[0_0_20%] lg:flex-[0_0_14.28%] min-w-0"
            >
              <div className="flex flex-col items-center gap-3">
                <Skeleton className="aspect-square w-full rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
