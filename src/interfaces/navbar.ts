export interface NavLink {
  href: string;
  label: string;
  icon: any;
}

export interface NavMenuProps {
  navLinks: NavLink[];
  pathName: string;
}