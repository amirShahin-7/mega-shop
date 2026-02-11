import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import MySessionProvider from "@/components/mySessionProvider/MySessionProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CartProvider } from "@/context/CartContext";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mega Shop",
  description:
    "Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent custmer service.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <MySessionProvider>
          <CartProvider>
            <FavoritesProvider>
              <TooltipProvider>
                <Navbar />
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover={false}
                  theme="light"
                  transition={Bounce}
                />
                <main className="min-h-screen py-24">{children}</main>
                <Footer />
              </TooltipProvider>
            </FavoritesProvider>
          </CartProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}
