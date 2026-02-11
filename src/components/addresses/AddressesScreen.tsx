import { getUserAddressesAction } from "@/server/addressActions/getUserAddress.actions";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import AddressEmpty from "./AddressEmpty";
import { GetUserAddressesResponse } from "@/interfaces";

export default async function AddressesScreen() {
  const response: GetUserAddressesResponse = await getUserAddressesAction();

  // Handle error case
  if ("statusMsg" in response) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Addresses</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-600">
              {response.message}
            </div>
          </div>
          <div className="lg:w-[400px] shrink-0">
            <AddressForm />
          </div>
        </div>
      </div>
    );
  }

  const addresses = response.data;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Addresses List */}
      <div className="flex-1 space-y-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <AddressCard key={address._id} address={address} />
          ))
        ) : (
          <AddressEmpty />
        )}
      </div>

      {/* Add Address Form Sidebar */}
      <div className="lg:w-[400px] shrink-0">
        <AddressForm />
      </div>
    </div>
  );
}
