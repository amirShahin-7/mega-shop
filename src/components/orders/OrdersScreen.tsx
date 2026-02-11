import OrderCard from "./OrderCard";
import OrderEmpty from "./OrderEmpty";
import { verifyTokenAction } from "@/server/authActions/verifyToken.Actions/verifyToken.action";
import { getUserOrderAction } from "@/server/ordersActions/getUserOrder.actions";
import { GetUserOrderResponse } from "@/interfaces";

export default async function OrdersScreen() {
  const { decoded } = await verifyTokenAction();
  const userId = await decoded?.id;
  const orders: GetUserOrderResponse = await getUserOrderAction(userId!);

  // Handle error case
  if ("statusMsg" in orders) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-600">
        {orders.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <OrderEmpty />
      )}
    </div>
  );
}
