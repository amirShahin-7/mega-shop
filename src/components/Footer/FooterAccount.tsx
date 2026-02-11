import { User } from "lucide-react";
import { FooterLink } from "@/helpers/footerHelper";

export default function FooterAccount() {
  return (
    <div>
      <h3 className="text-gray-900 font-semibold text-lg mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-sky-600" />
        My Account
      </h3>
      <ul className="space-y-4">
        <FooterLink href="/profile/settings" label="My Profile" />
        <FooterLink href="/profile/orders" label="Order History" />
        <FooterLink href="/profile/favorites" label="Wishlist" />
        <FooterLink href="/profile/addresses" label="My Addresses" />
        <FooterLink href="/" label="Help Center" />
        <FooterLink href="/" label="Returns & Refunds" />
      </ul>
    </div>
  );
}
