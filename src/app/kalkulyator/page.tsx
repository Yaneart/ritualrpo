import CalculatorClient from "@/components/calculator/CalculatorClient";
import { getCalculatorGroups, getCalculatorServiceTypes } from "@/lib";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Калькулятор",
  description:
    "Рассчитайте стоимость ритуальных услуг в Санкт-Петербурге онлайн. Выберите тип услуги, комплектацию и дополнительные опции.",
  alternates: { canonical: "https://ritualrpo.ru/kalkulyator" },
  openGraph: { url: "https://ritualrpo.ru/kalkulyator" },
};

export const revalidate = 60;

export default async function CalculatorPage() {
  const [serviceTypes, groups] = await Promise.all([
    getCalculatorServiceTypes(),
    getCalculatorGroups(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: "https://ritualrpo.ru",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Калькулятор",
                item: "https://ritualrpo.ru/kalkulyator",
              },
            ],
          }),
        }}
      />
      <CalculatorClient serviceTypes={serviceTypes} groups={groups} />
    </>
  );
}
