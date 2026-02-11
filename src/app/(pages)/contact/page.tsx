import ContactScreen from "@/components/contact/ContactScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | MegaShop",
  description: "Get in touch with us for any inquiries or support.",
};

export default function ContactPage() {
  return <ContactScreen />;
}
