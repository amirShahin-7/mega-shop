export default function ProductDetailsLoadingSkeleton() {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Skeleton */}
          <div className="w-full h-125 bg-gray-200 rounded-xl animate-pulse" />

          {/* Info Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-32 bg-gray-200 rounded w-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
