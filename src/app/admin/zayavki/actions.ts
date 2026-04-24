"use server";

import { markRequestAsRead, deleteRequest } from "@/lib/api/requests";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getToken(): Promise<string> {
  const store = await cookies();
  const token = store.get("admin_token")?.value;

  if (!token) redirect("/admin/login");

  return token;
}

export async function markAsReadAction(
  id: string,
): Promise<{ error?: string } | void> {
  const token = await getToken();

  try {
    await markRequestAsRead(id, token);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка" };
  }

  revalidatePath("/admin/zayavki");
}

export async function deleteRequestAction(
  id: string,
): Promise<{ error?: string } | void> {
  const token = await getToken();

  try {
    await deleteRequest(id, token);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка удаления" };
  }

  revalidatePath("/admin/zayavki");
}
