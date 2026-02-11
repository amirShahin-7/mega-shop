import { ShoppingBag, ShieldCheck, Truck, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MegaShop",
  description: "Learn more about MegaShop and our mission.",
};

const features = [
  {
    icon: ShoppingBag,
    title: "Wide Selection",
    description:
      "Thousands of products across multiple categories from top brands.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Your transactions are always safe and encrypted with the latest technology.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "We deliver your orders to your doorstep as quickly as possible.",
  },
  {
    icon: Users,
    title: "Excellent Support",
    description: "Our customer service team is here to help you 24/7.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-sky-600 to-sky-700 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Welcome to MegaShop
          </h1>
          <p className="text-xl text-sky-50 leading-relaxed">
            Your one-stop destination for a premium shopping experience. We
            bridge the gap between quality products and seamless digital
            commerce.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 underline decoration-sky-500 decoration-4 underline-offset-8">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4 text-lg">
              Started in 2024, MegaShop was built with a simple goal: to create
              an e-commerce platform that is as beautiful as it is functional.
              We believe that shopping should be a joy, not a chore.
            </p>
            <p className="text-gray-600 text-lg">
              Today, we serve thousands of customers, offering a curated
              selection of products that meet our high standards for quality and
              value.
            </p>
          </div>
          <div className="bg-sky-50 rounded-3xl p-8 aspect-video flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-300 shadow-xl shadow-sky-100/50">
            <div className="text-center">
              <div className="text-6xl font-black text-sky-600 mb-2">10k+</div>
              <div className="text-gray-500 font-medium">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
            <p className="text-gray-500 mt-4">
              We are committed to providing the best service in the industry.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
