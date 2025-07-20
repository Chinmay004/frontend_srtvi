import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppWidget from "../WhatsappWidget";


export const metadata: Metadata = {
  title: "Sartawi Properties - Discover Your Dream Property",
  description: "Find premium real estate properties in Dubai with Sartawi.",
  // icons: "/srtvi-brand.png",

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow px-6 py-4">{children}</main>

        {/* WhatsApp floating button */}
        <WhatsAppWidget />

        <Footer />
      </body>
    </html>
  );
}
