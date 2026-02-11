import { MapPin } from "lucide-react";

export default function AddressEmpty() {
  return (
    <div className="container mx-auto px-4 py-8 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
        <MapPin size={32} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        No addresses found
      </h2>
      <p className="text-gray-500">
        Add your first address to make checkout faster and easier!
      </p>
    </div>
  );
}
