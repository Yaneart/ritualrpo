import { Advantage } from "@/types";
import { fetchAPI } from "./client";

export const getAdvantages = () => {
  return fetchAPI<Advantage[]>('advantages');
};
