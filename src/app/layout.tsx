

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
  openGraph: {
    title: "Sartawi Properties",
    description: "Discover Your Dream Property",
    images: ["/srtvi-blck-logo.svg"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sartawi Properties",
    description: "Discover Your Dream Property",
    images: ["/srtvi-blck-logo.svg"],
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

        {/* Vercel Project Logo - Multiple formats */}
        <link rel="icon" type="image/svg+xml" href="/logo-sartawi.svg" />
        <link rel="icon" type="image/png" href="/logo-sartawi.svg" />

        {/* Force Vercel to recognize the logo */}
        <meta property="og:image" content="https://www.sartawiproperties.com/srtvi-blck-logo.svg" />
        <meta property="og:image:type" content="image/svg+xml" />
        <meta property="og:image:width" content="176" />
        <meta property="og:image:height" content="170" />
        <meta name="twitter:image" content="https://www.sartawiproperties.com/srtvi-blck-logo.svg" />

        {/* Additional Vercel-specific meta */}
        <meta name="application-name" content="Sartawi Properties" />
        <meta name="msapplication-TileImage" content="/logo-sartawi.svg" />
      </head>
      <body className={`${urbanist.variable} antialiased`}>
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
