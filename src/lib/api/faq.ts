import { Faq } from "@/types";
import { fetchAPI } from "./client";

export const getFaqs = () => {
  return fetchAPI<Faq[]>("faq");
};
