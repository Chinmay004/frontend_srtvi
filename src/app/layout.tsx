

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
  keywords: "Sartawi Properties, Dubai Real Estate, Properties for Sale, Properties for Rent, Commercial Properties",
  authors: [{ name: "Sartawi Properties" }],
  creator: "Sartawi Properties",
  publisher: "Sartawi Properties",
  robots: "index, follow",
  openGraph: {
    title: "Sartawi Properties - Discover Your Dream Property",
    description: "Find premium real estate properties in Dubai with Sartawi. Trust. Resilience. Ambition.",
    url: "https://sartawiproperties.com",
    siteName: "Sartawi Properties",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sartawi Properties - Discover Your Dream Property",
    description: "Find premium real estate properties in Dubai with Sartawi. Trust. Resilience. Ambition.",
  },
  icons: {
    icon: [
      { url: "/logo-sartawi.png", sizes: "any" },
      { url: "/logo-sartawi.svg", type: "image/svg+xml" },
    ],
    shortcut: "/logo-sartawi.png",
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
        {/* Favicon links using your existing logo files */}
        <link rel="icon" href="/logo-sartawi.png" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/logo-sartawi.svg" />
        <link rel="shortcut icon" href="/logo-sartawi.png" />

        {/* Preload favicon for faster loading */}
        <link rel="preload" href="/logo-sartawi.png" as="image" />
      </head>
      <body className={`${urbanist.variable} antialiased`}>
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
