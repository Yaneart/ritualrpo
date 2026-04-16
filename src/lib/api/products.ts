import { fetchAPI } from "./client";
import type { Product } from "@/types";

export const getProducts = () => fetchAPI<Product[]>("products");

export const getProductsByCategory = (slug: string) =>
  fetchAPI<Product[]>(`products/category/${slug}`);

export const getProductBySlug = (slug: string) =>
  fetchAPI<Product>(`products/slug/${slug}`);
