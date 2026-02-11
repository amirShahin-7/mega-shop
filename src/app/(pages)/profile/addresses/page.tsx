import AddressesScreen from "@/components/addresses/AddressesScreen";
import AddressesSkeleton from "@/components/skeletons/AddressesSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Addresses | MegaShop",
  description: "Manage your shipping addresses.",
};

export default function ProfileAddressesPage() {
  return (
    <Suspense fallback={<AddressesSkeleton />}>
      <AddressesScreen />
    </Suspense>
  );
}
