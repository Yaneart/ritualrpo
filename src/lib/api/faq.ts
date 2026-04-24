import { Faq } from "@/types";
import { fetchAPI } from "./client";

export const getFaqs = () => fetchAPI<Faq[]>("faq");

export const createFaq = (
  data: { question: string; answer: string; order?: number },
  token: string,
) =>
  fetchAPI<Faq>("faq", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

export const updateFaq = (
  id: string,
  data: { question?: string; answer?: string; order?: number },
  token: string,
) =>
  fetchAPI<Faq>(`faq/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

export const deleteFaq = (id: string, token: string) =>
  fetchAPI<void>(`faq/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
