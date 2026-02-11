import CheckoutScreen from "@/components/orders/CheckoutScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | MegaShop",
  description: "Complete your purchase securely.",
};

export default function CheckoutPage() {
  return <CheckoutScreen />;
}
