import CatalogFilter from "@/components/catalog/CatalogFilter";
import { getCategories, getProducts } from "@/lib";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Ритуальные товары: гробы, венки, цветы, памятники. Каталог с ценами, доставка по Санкт-Петербургу.",
};

export default async function KatalogPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <CatalogFilter products={products} categories={categories} />;
}
