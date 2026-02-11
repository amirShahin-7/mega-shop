import Link from "next/link";
import { CreditCard } from "lucide-react";

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
      <p>
        © {currentYear} <span className="text-sky-600">MegaShop</span>. All
        rights reserved.
      </p>
      <div className="flex items-center gap-6">
        <Link href="/privacy" className="hover:text-sky-600 transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-sky-600 transition-colors">
          Terms of Service
        </Link>
        <div className="flex items-center gap-2 ml-4 opacity-70">
          <CreditCard className="w-6 h-6 text-gray-400" />
          <span className="text-xs">Secure Payment</span>
        </div>
      </div>
    </div>
  );
}
