import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-9 w-64 rounded-lg mb-8" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              {/* Image */}
              <Skeleton className="w-24 h-24 rounded-lg shrink-0" />

              {/* Info */}
              <div className="flex-1 space-y-2 w-full">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/3 rounded" />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6">
                <Skeleton className="h-9 w-28 rounded-lg" />
                <Skeleton className="h-5 w-20 rounded hidden sm:block" />
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:w-95 shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6 sticky top-24">
            <Skeleton className="h-6 w-40 rounded" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-12 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12 rounded" />
                <Skeleton className="h-4 w-36 rounded" />
              </div>
            </div>

            <div className="border-t border-gray-100 my-4" />

            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-14 rounded" />
              <Skeleton className="h-7 w-24 rounded" />
            </div>

            <Skeleton className="h-14 w-full rounded-xl" />

            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-10 rounded-xl" />
              <Skeleton className="h-10 rounded-xl" />
            </div>

            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
