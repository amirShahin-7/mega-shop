import Link from "next/link";
import { NavMenuProps } from "@/interfaces";

export function NavLinks({ navLinks, pathName }: NavMenuProps) {
  return (
    <ul className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
      {navLinks.map((link) => {
        const isActive = pathName === link.href;
        const Icon = link.icon;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`
                relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                ${
                  isActive
                    ? "bg-white text-sky-600 shadow-sm"
                    : "text-gray-600 hover:text-sky-600 hover:bg-white/50"
                }
              `}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              <span>{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
