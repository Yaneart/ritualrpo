"use server";

import { fetchAPI } from "@/lib/api/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getToken(): Promise<string> {
  const store = await cookies();
  const token = store.get("admin_token")?.value;
  if (!token) redirect("/admin/login");
  return token;
}

export async function updateSettingsAction(
  data: Record<string, string>,
): Promise<{ error?: string } | void> {
  const token = await getToken();

  try {
    await Promise.all(
      Object.entries(data).map(([key, value]) =>
        fetchAPI(`settings/${key}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ value }),
        }),
      ),
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ошибка сохранения" };
  }

  revalidatePath("/admin/nastroyki");
  revalidatePath("/");
}
