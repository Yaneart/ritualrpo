import { fetchAPI } from "./client";
import type { Category } from "@/types";

export const getCategories = () => fetchAPI<Category[]>("categories");
