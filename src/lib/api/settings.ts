import { fetchAPI } from "./client";
import type { SiteSetting } from "@/types";

export const getSettings = () => fetchAPI<SiteSetting[]>("settings");

export async function getSettingsMap(): Promise<Record<string, string>> {
  const settings = await getSettings();
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}
