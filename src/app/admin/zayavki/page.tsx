import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRequests } from "@/lib/api/requests";
import MarkAsReadButton from "./MarkAsReadButton";
import DeleteRequestButton from "./DeleteRequestButton";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  contact: "Контакты",
  calculator: "Калькулятор",
  cta: "CTA",
};

export default async function AdminZayavkiPage() {
  const store = await cookies();
  const token = store.get("admin_token")?.value;

  if (!token) redirect("/admin/login");

  const requests = await getRequests(token);
  const unread = requests.filter((r) => !r.isRead).length;

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#8a9188] mb-1">
            Управление
          </p>
          <h1 className="text-2xl font-heading">
            Заявки
            {unread > 0 && (
              <span className="ml-3 text-sm font-normal bg-[#c9a84c] text-[#0f1210] px-2 py-0.5">
                {unread} новых
              </span>
            )}
          </h1>
        </div>
      </div>

      <div className="border border-[#1e2a22] divide-y divide-[#1e2a22]">
        {requests.map((req) => (
          <div
            key={req.id}
            className={`px-6 py-5 transition-colors ${
              !req.isRead ? "bg-[#161b18]" : "hover:bg-[#161b18]/30"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                {!req.isRead && (
                  <span className="shrink-0 w-2 h-2 rounded-full bg-[#c9a84c]" />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs uppercase tracking-widest text-[#8a9188] border border-[#1e2a22] px-1.5 py-0.5">
                      {TYPE_LABELS[req.type] ?? req.type}
                    </span>
                    <span className="text-sm text-[#f5f5f0] font-medium">
                      {req.name}
                    </span>
                    <a
                      href={`tel:${req.phone}`}
                      className="text-sm text-[#c9a84c] hover:underline"
                    >
                      {req.phone}
                    </a>
                    {req.email && (
                      <a
                        href={`mailto:${req.email}`}
                        className="text-sm text-[#8a9188] hover:text-[#f5f5f0] transition-colors"
                      >
                        {req.email}
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-[#8a9188]">
                    {new Date(req.createdAt).toLocaleString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                {!req.isRead && <MarkAsReadButton id={req.id} />}
                <DeleteRequestButton id={req.id} />
              </div>
            </div>

            {req.message && (
              <div className="mt-3 pl-5 border-l border-[#1e2a22]">
                <p className="text-sm text-[#8a9188] whitespace-pre-wrap">
                  {req.message}
                </p>
              </div>
            )}
          </div>
        ))}

        {requests.length === 0 && (
          <p className="text-center text-[#8a9188] text-sm py-12">
            Заявок пока нет
          </p>
        )}
      </div>
    </div>
  );
}
