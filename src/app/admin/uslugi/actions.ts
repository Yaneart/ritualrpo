"use server";

import { fetchAPI } from "@/lib/api/client";
import { Service } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface ServiceFormData {
  slug: string;
  title: string;
  description: string;
  fullText: string;
  image: string;
  features: string[];
  price: string;
  order: number;
  isActive: boolean;
}

async function getToken(): Promise<string> {
  const store = await cookies();
  const token = store.get("admin_token")?.value;

  if (!token) redirect("/admin/login");

  return token;
}

export async function createServiceAction(
  data: ServiceFormData,
): Promise<{ error?: string } | void> {
  const token = await getToken();

  try {
    await fetchAPI<Service>("services", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка создания" };
  }

  revalidatePath("/admin/uslugi");
  revalidatePath("/uslugi");
  redirect("/admin/uslugi");
}

export async function updateServiceAction(
  id: string,
  data: ServiceFormData,
): Promise<{ error?: string } | void> {
  const token = await getToken();

  try {
    await fetchAPI<Service>(`services/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка сохрaнения" };
  }

  revalidatePath("/admin/uslugi");
  revalidatePath("/uslugi");
  redirect("/admin/uslugi");
}

export async function deleteServiceAction(
  id: string,
): Promise<{ error?: string } | void> {
  const token = await getToken();

  try {
    await fetchAPI<void>(`services/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка удаления" };
  }

  revalidatePath("/admin/uslugi");
  revalidatePath("/uslugi");
}
