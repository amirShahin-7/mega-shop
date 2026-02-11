import { PackageX } from "lucide-react";

export default function OrderEmpty({ message }: { message?: string }) {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
        <PackageX size={32} />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {message ? message : "No orders yet"}
      </h1>
      <p className="text-gray-500">
        {!message && "Looks like you haven't placed any orders yet."}
      </p>
    </div>
  );
}
