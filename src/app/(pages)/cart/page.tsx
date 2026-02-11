import CartScreen from "@/components/cart/CartScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | MegaShop",
  description: "View and manage your shopping cart items.",
};

export default function CartPage() {
  return <CartScreen />;
}
