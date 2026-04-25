import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ru">
      <body className="min-h-screen flex flex-col font-sans antialiased bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
