import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSettings } from "@/lib/api/settings";
import SettingsForm from "./SettingsForm";

export default async function AdminNastroyкiPage() {
  const store = await cookies();
  const token = store.get("admin_token")?.value;
  if (!token) redirect("/admin/login");

  const settings = await getSettings();
  const initialValues = Object.fromEntries(
    settings.map((s) => [s.key, s.value]),
  );

  return (
    <div className="p-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-[#8a9188] mb-1">
          Управление
        </p>
        <h1 className="text-2xl font-heading">Настройки сайта</h1>
        <p className="text-sm text-[#8a9188] mt-2">
          Контактные данные отображаются в шапке, подвале и на странице
          контактов.
        </p>
      </div>

      <SettingsForm initialValues={initialValues} />
    </div>
  );
}
