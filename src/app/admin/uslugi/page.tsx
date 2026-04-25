import Link from "next/link";
import { getServices } from "@/lib/api/services";
import DeleteServiceButton from "./DeleteServiceButton";

export const dynamic = "force-dynamic";

export default async function AdminUslugiPage() {
  const services = await getServices();
  const sorted = [...services].sort((a, b) => a.order - b.order);

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#8a9188] mb-1">
            Управление
          </p>
          <h1 className="text-2xl font-heading">Услуги</h1>
        </div>
        <Link
          href="/admin/uslugi/new"
          className="bg-[#c9a84c] text-[#0f1210] px-5 py-2 text-sm font-medium hover:bg-[#d4b568] transition-colors"
        >
          + Добавить услугу
        </Link>
      </div>

      <div className="border border-[#1e2a22]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1e2a22] bg-[#161b18]">
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-[#8a9188] w-12">
                #
              </th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-[#8a9188]">
                Название
              </th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-[#8a9188] hidden md:table-cell">
                Slug
              </th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-[#8a9188] hidden lg:table-cell">
                Цена
              </th>
              <th className="px-4 py-3 w-36"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((service) => (
              <tr
                key={service.id}
                className="border-b border-[#1e2a22] hover:bg-[#161b18]/40 transition-colors"
              >
                <td className="px-4 py-3 text-[#8a9188]">{service.order}</td>
                <td className="px-4 py-3 text-[#f5f5f0]">{service.title}</td>
                <td className="px-4 py-3 text-[#8a9188] hidden md:table-cell font-mono text-xs">
                  {service.slug}
                </td>
                <td className="px-4 py-3 text-[#8a9188] hidden lg:table-cell">
                  {service.price ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/uslugi/${service.id}`}
                      className="text-xs text-[#8a9188] hover:text-[#c9a84c] transition-colors"
                    >
                      Редактировать
                    </Link>
                    <DeleteServiceButton
                      id={service.id}
                      title={service.title}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sorted.length === 0 && (
          <p className="text-center text-[#8a9188] text-sm py-12">
            Услуги не найдены
          </p>
        )}
      </div>
    </div>
  );
}
