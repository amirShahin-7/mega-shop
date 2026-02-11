import { HelpCircle, MapPin, Phone, Mail } from "lucide-react";

export default function FooterContact() {
  return (
    <div>
      <h3 className="text-gray-900 font-semibold text-lg mb-6 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-sky-600" />
        Contact Us
      </h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3 text-sm text-gray-500">
          <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <span>
            123 Commerce St, Tech City,
            <br />
            Cairo, Egypt
          </span>
        </li>
        <li className="flex items-center gap-3 text-sm text-gray-500">
          <Phone className="w-5 h-5 text-sky-600 shrink-0" />
          <span>+20 110 044 5395</span>
        </li>
        <li className="flex items-center gap-3 text-sm text-gray-500">
          <Mail className="w-5 h-5 text-sky-600 shrink-0" />
          <span>support@megashop.com</span>
        </li>
      </ul>
    </div>
  );
}
