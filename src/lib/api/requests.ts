import { fetchAPI } from "./client";
import type { CreateRequestData } from "@/types";

export const submitRequest = (data: CreateRequestData) =>
  fetchAPI<{ id: string }>("requests", {
    method: "POST",
    body: JSON.stringify(data),
  });
