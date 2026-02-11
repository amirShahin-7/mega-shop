"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SidebarProps {
  name: string;
  image: string;
  path: string;
}
export default function TopSidebarShop({ name, image, path }: SidebarProps) {
  const backPath = useRouter();
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {image && (
              <div className="relative size-40 md:size-16 bg-white rounded-lg border border-gray-200 p-2">
                <Image
                  src={image}
                  alt={name}
                  width={100}
                  height={100}
                  className="object-contain w-full h-full"
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              {path !== "products" && (
                <p className="text-gray-600 mt-1">
                  Explore all products from this {path}
                </p>
              )}
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => backPath.back()}
            className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-sky-600 hover:border-sky-300 transition-all"
          >
            <ArrowLeft size={16} />
            <span>Back step</span>
          </button>
        </div>
      </div>
    </div>
  );
}
