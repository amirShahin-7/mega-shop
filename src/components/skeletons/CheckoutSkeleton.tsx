import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-9 w-40 rounded-lg mb-8" />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
          <Skeleton className="h-6 w-40 rounded" />

          <div className="space-y-4">
            {/* 3 Input Fields */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ))}
          </div>

          {/* Payment Method */}
          <div className="pt-4 space-y-4">
            <Skeleton className="h-5 w-36 rounded" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-20 rounded-md" />
              <Skeleton className="h-20 rounded-md" />
            </div>
          </div>

          {/* Submit Button */}
          <Skeleton className="h-12 w-full rounded-xl mt-6" />
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-6">
          <Skeleton className="h-6 w-28 rounded" />

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 items-center py-3">
                <Skeleton className="w-16 h-16 rounded-md shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-3/4 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between">
              <Skeleton className="h-5 w-14 rounded" />
              <Skeleton className="h-6 w-24 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
