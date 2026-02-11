import React from "react";

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center relative overflow-hidden">
      <div className="text-center relative z-10">
        {/* Logo Animation */}
        <div className="relative mb-8 h-24 w-24 mx-auto">
          {/* Outer Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-sky-200 rounded-full animate-ping"></div>
          </div>

          {/* Middle Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          </div>

          {/* Logo */}
          <div className="relative flex items-center justify-center h-full">
            <div className="bg-sky-600 p-6 rounded-2xl shadow-lg animate-pulse">
              <span className="text-white font-bold text-4xl">M</span>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
          MegaShop
        </h1>

        {/* Loading Text */}
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <span className="text-lg">Loading</span>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-sky-600 rounded-full animate-bounce animate-delay-0"></span>
            <span className="w-2 h-2 bg-sky-600 rounded-full animate-bounce animate-delay-150"></span>
            <span className="w-2 h-2 bg-sky-600 rounded-full animate-bounce animate-delay-300"></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-sky-400 to-sky-600 rounded-full w-1/3 animate-slide-bar"></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-sky-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-sky-200 rounded-full blur-3xl opacity-30 animate-pulse animate-delay-1000"></div>
    </div>
  );
}
