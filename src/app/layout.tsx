

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
    icon: "/logo-sartawi.png",
    shortcut: "/logo-sartawi.png",
    apple: "/logo-sartawi.png",
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
        {/* Force favicon update with multiple declarations */}
        <link rel="icon" href="/logo-sartawi.png" />
        <link rel="icon" type="image/png" href="/logo-sartawi.png" />
        <link rel="shortcut icon" href="/logo-sartawi.png" />
        <link rel="apple-touch-icon" href="/logo-sartawi.png" />
        <link rel="apple-touch-icon-precomposed" href="/logo-sartawi.png" />

        {/* Alternative SVG version */}
        <link rel="icon" type="image/svg+xml" href="/logo-sartawi.svg" />

        {/* Preload favicon for faster loading */}
        <link rel="preload" href="/logo-sartawi.png" as="image" />

        {/* Force cache busting */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className={`${urbanist.variable} antialiased`}>
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
