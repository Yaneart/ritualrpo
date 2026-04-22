import { getProducts, getServices } from "@/lib";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ritualrpo.ru";

  const staticPages = [
    "",
    "/uslugi",
    "/katalog",
    "/o-kompanii",
    "/kontakty",
    "/kalkulyator",
    "/otzyvy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const [services, products] = await Promise.all([
    getServices(),
    getProducts(),
  ]);

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/uslugi/${service.slug}`,
    lastModified: new Date(),
  }));

  const productPages = products.map((product) => ({
    url: `${baseUrl}/katalog/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...servicePages, ...productPages];
}
