

import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/component/WhatsappWidget";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Sartawi Properties - Discover Your Dream Property",
  description: "Find premium real estate properties in Dubai with Sartawi. Trust. Resilience. Ambition.",
  icons: {
    icon: "/logo-sartawi.svg",
    shortcut: "/logo-sartawi.svg",
    apple: "/logo-sartawi.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-sartawi.svg" />
        <link rel="shortcut icon" href="/logo-sartawi.svg" />
        <link rel="apple-touch-icon" href="/logo-sartawi.svg" />

        {/* Vercel Project Logo */}
        <link rel="icon" type="image/svg+xml" href="/logo-sartawi.svg" />
        <meta property="og:image" content="/logo-sartawi.svg" />
        <meta name="twitter:image" content="/logo-sartawi.svg" />
      </head>
      <body className={`${urbanist.variable} antialiased`}>
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
