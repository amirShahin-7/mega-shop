import Link from "next/link";
import { FooterLinkProps, SocialLinkProps } from "@/interfaces";

export function SocialLink({ href, icon: Icon, hover }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className={`p-2 bg-white shadow-sm border border-gray-200 rounded-full text-gray-600 transition-all duration-300 group ${
        hover || "hover:bg-sky-600 hover:text-white hover:border-sky-600"
      }`}
    >
      <Icon className="w-5 h-5" />
    </Link>
  );
}

export function FooterLink({ href, label }: FooterLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-gray-600 hover:text-sky-600 hover:translate-x-1 transition-all duration-300 inline-block"
      >
        {label}
      </Link>
    </li>
  );
}
