import UpdateUserForm from "@/components/auth/update-user-data/UpdateUserForm";
import UpdatePassForm from "@/components/auth/update-user-password/UpdatePassForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Settings | MegaShop",
  description: "Update your account details and password.",
};

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <UpdateUserForm />
      <UpdatePassForm />
    </div>
  );
}
