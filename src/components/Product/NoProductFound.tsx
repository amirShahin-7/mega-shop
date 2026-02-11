import { Package } from "lucide-react";


export default function NoProductFound({textInfo}:{textInfo:string}) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <Package size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          There are currently no products available in this {textInfo}. Check
          back later!
        </p>
      </div>
    );
}
