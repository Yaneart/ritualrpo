import CatalogFilter from "@/components/catalog/CatalogFilter";
import { getCategories, getProducts } from "@/lib";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Ритуальные товары в Санкт-Петербурге: гробы, венки, цветы, памятники. Каталог с ценами, доставка по СПб и Ленинградской области.",
  alternates: { canonical: "https://ritualrpo.ru/katalog" },
  openGraph: { url: "https://ritualrpo.ru/katalog" },
};

export default async function KatalogPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
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
                name: "Каталог",
                item: "https://ritualrpo.ru/katalog",
              },
            ],
          }),
        }}
      />
      <CatalogFilter products={products} categories={categories} />
    </>
  );
}
