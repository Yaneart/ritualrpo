import CatalogFilter from "@/components/catalog/CatalogFilter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Ритуальные товары: гробы, венки, цветы, памятники. Каталог с ценами, доставка по Санкт-Петербургу.",
};

export default function KatalogPage() {
  return <CatalogFilter />;
}
