"use client";

import { UserAddress } from "@/interfaces";
import { MapPin, Phone, User, Trash2, Loader2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteAddressAction } from "@/server/addressActions/deleteAddress.actions";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface AddressCardProps {
  address: UserAddress;
}

export default function AddressCard({ address }: AddressCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!address._id) {
      toast.error("Invalid address ID");
      return;
    }

    setIsDeleting(true);
    try {
      const res = await deleteAddressAction(address._id);
      if (res.status === "success") {
        toast.success("Address deleted successfully");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to delete address");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow relative group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
            <Home size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{address.name}</h3>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              disabled={isDeleting}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
            >
              {isDeleting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white border-0 shadow-red-200 shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Address?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete <b>{address.name}</b>? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-white bg-sky-500 hover:bg-sky-600 cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-600">
            {address.details}, {address.city}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-gray-400 shrink-0" />
          <p className="text-sm text-gray-600">{address.phone}</p>
        </div>
      </div>
    </div>
  );
}
