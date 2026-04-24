import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import FloatingMessenger from "@/components/ui/FloatingMessenger";
import FloatingMaxMessenger from "@/components/ui/FloatingMaxMessenger";
import { getSettingsMap } from "@/lib";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = await getSettingsMap();
  const phone = s.phone ?? "+7 (812) 660-51-51";
  const phoneHref = s.phone_href ?? "tel:+78126605151";
  const email = s.email ?? "info@ritualrpo.ru";

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
            telephone: phoneHref
              .replace("tel:", "")
              .replace(
                /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
                "+$1-$2-$3-$4-$5",
              ),
            email: email,
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
      <Header phone={phone} phoneHref={phoneHref} />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
      <FloatingMessenger />
      <FloatingMaxMessenger />
    </>
  );
}
