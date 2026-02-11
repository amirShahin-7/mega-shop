import FooterBrand from "./FooterBrand";
import FooterQuickLinks from "./FooterQuickLinks";
import FooterAccount from "./FooterAccount";
import FooterContact from "./FooterContact";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <FooterBrand />
          <FooterQuickLinks />
          <FooterAccount />
          <FooterContact />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Bottom Section */}
        <FooterBottom />
      </div>
    </footer>
  );
}
