"use server";

import { createFaq, updateFaq, deleteFaq } from "@/lib/api/faq";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface FaqFormData {
  question: string;
  answer: string;
  order: number;
}

async function getToken(): Promise<string> {
  const store = await cookies();
  const token = store.get("admin_token")?.value;
  if (!token) redirect("/admin/login");
  return token;
}

export async function createFaqAction(
  data: FaqFormData,
): Promise<{ error?: string } | void> {
  const token = await getToken();
  try {
    await createFaq(data, token);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка создания" };
  }
  revalidatePath("/admin/faq");
  revalidatePath("/");
  redirect("/admin/faq");
}

export async function updateFaqAction(
  id: string,
  data: FaqFormData,
): Promise<{ error?: string } | void> {
  const token = await getToken();
  try {
    await updateFaq(id, data, token);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка сохранения" };
  }
  revalidatePath("/admin/faq");
  revalidatePath("/");
  redirect("/admin/faq");
}

export async function deleteFaqAction(
  id: string,
): Promise<{ error?: string } | void> {
  const token = await getToken();
  try {
    await deleteFaq(id, token);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка удаления" };
  }
  revalidatePath("/admin/faq");
  revalidatePath("/");
}
