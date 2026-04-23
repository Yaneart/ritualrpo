import type { Metadata } from "next";
import "./globals.css";
import { Inter, Cormorant_Garamond } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ritualrpo.ru"),
  title: {
    default: "RitualRPO — Ритуальные услуги в Санкт-Петербурге",
    template: "%s | RitualRPO",
  },
  description:
    "Ритуальные услуги в Санкт-Петербурге и Ленинградской области. Организация похорон, кремация, памятники. Круглосуточно, выезд в течение часа. Звоните: +7 (812) 660-51-51.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "RitualRPO",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "RitualRPO — Ритуальные услуги в Санкт-Петербурге",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
