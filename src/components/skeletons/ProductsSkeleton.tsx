export default function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-105 bg-gray-100 rounded-xl animate-pulse" />
      ))}
    </div>
  );
}
