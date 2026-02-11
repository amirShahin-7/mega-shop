import HomeScreen from "@/components/home/homeScreen/HomeScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mega Shop | Home",
  description:
    "Welcome to Mega Shop. Discover the best deals on Electronics, Fashion, and more.",
  openGraph: {
    title: "Mega Shop | Home",
    description:
      "Welcome to Mega Shop. Discover the best deals on Electronics, Fashion, and more.",
  },
};

export default function HomePage() {
  return <HomeScreen />;
}
