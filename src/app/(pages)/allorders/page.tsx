import { redirect } from "next/navigation";

export default function OrderRedirect() {
  redirect("/profile/orders");
}
