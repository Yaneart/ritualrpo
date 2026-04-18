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
