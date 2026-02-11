import Link from "next/link";
import { Facebook, X, Instagram, Linkedin } from "lucide-react";
import { SocialLink } from "@/helpers/footerHelper";
import { FaXTwitter } from "react-icons/fa6";

export default function FooterBrand() {
  return (
    <div className="space-y-6">
      <Link href={"/"} className="flex items-center gap-2 group">
        <span className="bg-sky-600 p-2 rounded-xl text-white font-bold text-sm shadow-lg shadow-sky-200 group-hover:scale-105 transition-transform duration-300">
          M
        </span>
        <span className="font-bold text-2xl text-gray-800 tracking-tight group-hover:text-sky-600 transition-colors duration-300">
          MegaShop
        </span>
      </Link>
      <p className="text-gray-500 text-sm leading-relaxed">
        Your one-stop destination for all things fashion, electronics, and
        lifestyle. Quality products, fast shipping, and exceptional service.
      </p>
      <div className="flex gap-4">
        <SocialLink
          hover="hover:bg-blue-600 hover:text-white"
          href="/"
          icon={Facebook}
        />
        <SocialLink
          hover="hover:bg-black hover:text-white"
          href="/"
          icon={FaXTwitter}
        />
        <SocialLink
          hover="hover:bg-rose-500 hover:text-white"
          href="/"
          icon={Instagram}
        />
        <SocialLink
          hover="hover:bg-sky-600 hover:text-white"
          href="/"
          icon={Linkedin}
        />
      </div>
    </div>
  );
}
