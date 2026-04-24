import { CreateReviewData, Review } from "@/types";
import { fetchAPI } from "./client";

export const getReviews = (limit?: number) => {
  const query = limit ? `?limit=${limit}` : "";
  return fetchAPI<Review[]>(`reviews${query}`);
};

export const submitReview = (data: CreateReviewData) => {
  return fetchAPI<Review>("reviews", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getAdminReviews = (token: string) =>
  fetchAPI<Review[]>("reviews/admin", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const approveReview = (id: string, token: string) =>
  fetchAPI<Review>(`reviews/${id}/approve`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteReview = (id: string, token: string) =>
  fetchAPI<void>(`reviews/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
