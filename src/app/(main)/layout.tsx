import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import FloatingMessenger from "@/components/ui/FloatingMessenger";
import FloatingMaxMessenger from "@/components/ui/FloatingMaxMessenger";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
    </>
  );
}
