"use server"

import { fetchAPI } from "@/lib/api/client";
import { Product } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface ProductFormData {
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  isActive: boolean;
}

async function getToken(): Promise<string> {
  const store = await cookies();
  const token = store.get("admin_token")?.value;

  if (!token) redirect("/admin/login");

  return token;
}

export async function createProductAction(
  data: ProductFormData,
): Promise<{ error?: string } | void> {
  const token = await getToken();

  try {
    await fetchAPI<Product>("products", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка создания" };
  }

  revalidatePath("/admin/katalog");
  revalidatePath("/katalog");
  redirect("/admin/katalog");
}

export async function updateProductAction(
  id: string,
  data: ProductFormData,
): Promise<{ error?: string } | void> {
  const token = await getToken();

  try {
    await fetchAPI<Product>(`products/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка сохрaнения" };
  }

  revalidatePath("/admin/katalog");
  revalidatePath("/katalog");
  redirect("/admin/katalog");
}

export async function deleteProductAction(
  id: string,
): Promise<{ error?: string } | void> {
  const token = await getToken();

  try {
    await fetchAPI<void>(`products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка удаления" };
  }

  revalidatePath("/admin/katalog");
  revalidatePath("/katalog");
}
