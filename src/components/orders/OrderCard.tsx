"use client";

import { UserOrdersData } from "@/interfaces";
import { formatCurrency } from "@/helpers/currencyHelper";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, Package, CreditCard, Banknote, MapPin } from "lucide-react";

interface OrderCardProps {
  order: UserOrdersData;
}

export default function OrderCard({ order }: OrderCardProps) {
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="bg-gray-50/50 p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
            <Package size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Order ID</p>
            <p className="font-bold text-gray-900">#{order.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {order.isPaid ? (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">
              Paid
            </Badge>
          ) : (
            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-0">
              Unpaid
            </Badge>
          )}
          {order.isDelivered ? (
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
              Delivered
            </Badge>
          ) : (
            <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
              Processing
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 grid gap-6 md:grid-cols-2">
        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Date Placed</p>
              <p className="text-sm text-gray-600">{date}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            {order.paymentMethodType === "card" ? (
              <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
            ) : (
              <Banknote className="w-5 h-5 text-gray-400 mt-0.5" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                Payment Method
              </p>
              <p className="text-sm text-gray-600 capitalize">
                {order.paymentMethodType}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Delivery Address
              </p>
              <p className="text-sm text-gray-600">
                {order.shippingAddress?.details}, {order.shippingAddress?.city}
              </p>
              <p className="text-xs text-gray-500">
                {order.shippingAddress?.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Items Preview & Total */}
        <div className="space-y-4 border-0 md:border-l md:border-l-gray-100 md:pl-6">
          <div className="flex -space-x-2 overflow-hidden py-1">
            {order.cartItems.slice(0, 7).map((item) => (
              <div
                key={item._id}
                className="relative w-12 h-12 rounded-full border-2 border-white bg-gray-50"
                title={item.product?.title || "Product"}
              >
                <Image
                  src={item.product?.imageCover}
                  alt="Product"
                  width={50}
                  height={50}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            ))}
            {order.cartItems.length > 7 && (
              <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                +{order.cartItems.length - 7}
              </div>
            )}
          </div>

          <div className="pt-2">
            <p className="text-sm font-medium text-gray-500">Total Amount</p>
            <p className="text-2xl font-bold text-sky-600">
              {formatCurrency(order.totalOrderPrice)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
