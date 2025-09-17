

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
  keywords: ["real estate", "Dubai properties", "Sartawi Properties", "property investment", "luxury homes"],
  authors: [{ name: "Sartawi Properties" }],
  creator: "Sartawi Properties",
  publisher: "Sartawi Properties",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo-sartawi.svg", type: "image/svg+xml" },
      { url: "/logo-sartawi.png", type: "image/png", sizes: "32x32" },
      { url: "/srtvi-blck-logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/logo-sartawi.svg",
    apple: [
      { url: "/logo-sartawi.svg", type: "image/svg+xml" },
      { url: "/logo-sartawi.png", type: "image/png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "icon",
        type: "image/x-icon",
        url: "/favicon.ico",
      },
    ],
  },
  openGraph: {
    title: "Sartawi Properties - Discover Your Dream Property",
    description: "Find premium real estate properties in Dubai with Sartawi. Trust. Resilience. Ambition.",
    url: "https://www.sartawiproperties.com",
    siteName: "Sartawi Properties",
    images: [
      {
        url: "https://www.sartawiproperties.com/srtvi-blck-logo.svg",
        width: 176,
        height: 170,
        alt: "Sartawi Properties Logo",
        type: "image/svg+xml",
      },
      {
        url: "https://www.sartawiproperties.com/logo-sartawi.png",
        width: 512,
        height: 512,
        alt: "Sartawi Properties Logo",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sartawi Properties - Discover Your Dream Property",
    description: "Find premium real estate properties in Dubai with Sartawi. Trust. Resilience. Ambition.",
    images: [
      "https://www.sartawiproperties.com/srtvi-blck-logo.svg",
      "https://www.sartawiproperties.com/logo-sartawi.png",
    ],
    creator: "@sartawiproperties",
    site: "@sartawiproperties",
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
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
        {/* Primary favicon - multiple formats for better browser support */}
        <link rel="icon" type="image/svg+xml" href="/logo-sartawi.svg" />
        <link rel="icon" type="image/png" href="/logo-sartawi.png" />
        <link rel="shortcut icon" href="/logo-sartawi.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-sartawi.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo-sartawi.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/logo-sartawi.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/logo-sartawi.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/logo-sartawi.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/logo-sartawi.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/logo-sartawi.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/logo-sartawi.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/logo-sartawi.png" />

        {/* Android Chrome icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/logo-sartawi.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo-sartawi.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/logo-sartawi.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo-sartawi.png" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/logo-sartawi.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Additional meta for better SEO */}
        <meta name="application-name" content="Sartawi Properties" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-navbutton-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sartawi Properties" />

        {/* Structured Data for better Google recognition */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sartawi Properties",
              "url": "https://www.sartawiproperties.com",
              "logo": "https://www.sartawiproperties.com/logo-sartawi.svg",
              "description": "Find premium real estate properties in Dubai with Sartawi. Trust. Resilience. Ambition.",
              "sameAs": [
                "https://www.facebook.com/sartawiproperties",
                "https://www.instagram.com/sartawiproperties",
                "https://www.linkedin.com/company/sartawi-properties"
              ]
            })
          }}
        />
      </head>
      <body className={`${urbanist.variable} antialiased`}>
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
