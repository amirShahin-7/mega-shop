import OrdersScreen from "@/components/orders/OrdersScreen";
import OrdersSkeleton from "@/components/skeletons/OrdersSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Orders | MegaShop",
  description: "View your order history.",
};

export default function ProfileOrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersScreen />
      </Suspense>
    </div>
  );
}
