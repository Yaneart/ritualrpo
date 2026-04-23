import { fetchAPI } from "./client";
import type { Service } from "@/types";

export const getServices = () => fetchAPI<Service[]>("services");

export const getServiceBySlug = (slug: string) =>
  fetchAPI<Service>(`services/slug/${slug}`);

export const getServiceById = (id: string) =>
  fetchAPI<Service>(`services/${id}`);
