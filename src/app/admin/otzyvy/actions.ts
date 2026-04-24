"use server";

import { approveReview, deleteReview } from "@/lib/api/reviews";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getToken(): Promise<string> {
  const store = await cookies();
  const token = store.get("admin_token")?.value;
  if (!token) redirect("/admin/login");
  return token;
}

export async function approveReviewAction(
  id: string,
): Promise<{ error?: string } | void> {
  const token = await getToken();
  try {
    await approveReview(id, token);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка" };
  }
  revalidatePath("/admin/otzyvy");
  revalidatePath("/otzyvy");
}

export async function deleteReviewAction(
  id: string,
): Promise<{ error?: string } | void> {
  const token = await getToken();
  try {
    await deleteReview(id, token);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка удаления" };
  }
  revalidatePath("/admin/otzyvy");
  revalidatePath("/otzyvy");
}
