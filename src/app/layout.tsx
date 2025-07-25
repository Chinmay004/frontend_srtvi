

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
  description: "Find premium real estate properties in Dubai with Sartawi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-sartawi.svg" sizes="any" />
        {/* Optional for PNG */}
        {/* <link rel="icon" type="image/png" href="/logo-sartawi.png" /> */}
        <title>Sartawi Properties</title>
        <meta name="description" content="Trust. Resilience. Ambition. Sartawi Properties." />
      </head>
      <body className={`${urbanist.variable} antialiased`}>
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}


// app/layout.tsx
// import type { Metadata } from "next";
// import { Urbanist } from "next/font/google";
// import "./globals.css";

// import Navbar from "../component/layout/Navbar";
// import Footer from "../component/layout/Footer";
// import WhatsAppWidget from "../component/WhatsappWidget";

// const urbanist = Urbanist({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   display: "swap",
//   variable: "--font-urbanist",
// });

// export const metadata: Metadata = {
//   title: "Sartawi Properties - Discover Your Dream Property",
//   description: "Find premium real estate properties in Dubai with Sartawi.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${urbanist.variable} antialiased flex flex-col min-h-screen`}>
//         {/* <Navbar /> */}
//         <main className="flex-grow">{children}</main>
//         <WhatsAppWidget />
//         <Footer />
//       </body>
//     </html>
//   );
// }
