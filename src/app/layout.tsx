import type { Metadata } from "next";
import "./globals.css";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import FloatingMessenger from "@/components/ui/FloatingMessenger";
import FloatingMaxMessenger from "@/components/ui/FloatingMaxMessenger";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FuneralHome",
              name: "RitualRPO",
              url: "https://ritualrpo.ru",
              telephone: "+7-812-660-51-51",
              email: "info@ritualrpo.ru",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Санкт-Петербург",
                addressRegion: "Санкт-Петербург",
                addressCountry: "RU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 59.9343,
                longitude: 30.3351,
              },
              areaServed: ["Санкт-Петербург", "Ленинградская область"],
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <FloatingMessenger />
        <FloatingMaxMessenger />
      </body>
    </html>
  );
}
