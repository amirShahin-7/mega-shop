import { Building2 } from "lucide-react";
import { FooterLink } from "@/helpers/footerHelper";

export default function FooterQuickLinks() {
  return (
    <div>
      <h3 className="text-gray-900 font-semibold text-lg mb-6 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-sky-600" />
        Quick Links
      </h3>
      <ul className="space-y-4">
        <FooterLink href="/" label="Home" />
        <FooterLink href="/products" label="Shop" />
        <FooterLink href="/brands" label="Brands" />
        <FooterLink href="/categories" label="Categories" />
        <FooterLink href="/about" label="About Us" />
        <FooterLink href="/contact" label="Contact Us" />
      </ul>
    </div>
  );
}
