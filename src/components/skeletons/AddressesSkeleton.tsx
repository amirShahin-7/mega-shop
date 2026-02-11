import { Skeleton } from "@/components/ui/skeleton";

export default function AddressesSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-9 w-48 rounded-lg mb-8" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Addresses List Skeleton */}
        <div className="flex-1 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="h-5 w-32 rounded" />
                </div>
                <Skeleton className="w-9 h-9 rounded-lg" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5 rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5 rounded" />
                  <Skeleton className="h-4 w-1/3 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Skeleton */}
        <div className="lg:w-[400px] shrink-0">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <Skeleton className="h-6 w-48 rounded" />

            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16 rounded" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16 rounded" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>
            </div>

            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
