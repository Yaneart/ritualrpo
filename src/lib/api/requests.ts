import { fetchAPI } from "./client";
import type { CreateRequestData, Request } from "@/types";

export const submitRequest = (data: CreateRequestData) =>
  fetchAPI<{ id: string }>("requests", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getRequests = (token: string) =>
  fetchAPI<Request[]>("requests", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const markRequestAsRead = (id: string, token: string) =>
  fetchAPI<Request>(`requests/${id}/read`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteRequest = (id: string, token: string) =>
  fetchAPI<void>(`requests/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
