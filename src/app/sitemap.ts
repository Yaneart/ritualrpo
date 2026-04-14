import { services } from "@/data/services";
import { products } from "@/data/products";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ritualrpo.ru";

  const staticPages = [
    "",
    "/uslugi",
    "/katalog",
    "/o-kompanii",
    "/kontakty",
    "/kalkulyator",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

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