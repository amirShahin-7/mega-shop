import { getProductsOnSale } from "@/server/shopActions/products.actions";
import CountDown from "./CountDown";
import { Timer, Zap } from "lucide-react";
import FlashDealsCarousel from "./FlashDealsCarousel";
import { addHoursToDate } from "@/helpers/dateHelper";

export default async function FlashDeals() {
  const saleProducts = await getProductsOnSale(10);
  const targetDate = addHoursToDate(new Date(), 2);

  return (
    <section className="py-12 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <Zap
                className="text-red-600 fill-red-600 animate-pulse"
                size={28}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Flash Deals</h2>
              <p className="text-gray-500 text-sm">
                Limited time offers, don't miss out!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl shadow-xs border border-gray-100">
            <div className="flex flex-wrap items-center gap-2 text-red-500 font-semibold">
              <Timer size={20} />
              <span className="uppercase text-xs tracking-wider">
                Ending in:
              </span>
            </div>
            <CountDown targetDate={targetDate} />
          </div>
        </div>

        <FlashDealsCarousel products={saleProducts} />
      </div>
    </section>
  );
}
