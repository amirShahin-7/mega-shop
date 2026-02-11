import React from "react";
import { Truck, ShieldCheck, Headset, CircleDollarSign } from "lucide-react";

const features = [
  {
    title: "Free Shipping",
    description: "On all orders over $200",
    icon: Truck,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Secure Payment",
    description: "100% secure payment",
    icon: ShieldCheck,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "24/7 Support",
    description: "Dedicated support",
    icon: Headset,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "Money Back",
    description: "If goods have problems",
    icon: CircleDollarSign,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`p-3 rounded-full ${feature.bg}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
