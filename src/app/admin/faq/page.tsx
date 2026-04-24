import Link from "next/link";
import { getFaqs } from "@/lib/api/faq";
import DeleteFaqButton from "./DeleteFaqButton";

export default async function AdminFaqPage() {
  const faqs = await getFaqs();
  const sorted = [...faqs].sort((a, b) => a.order - b.order);

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#8a9188] mb-1">
            Управление
          </p>
          <h1 className="text-2xl font-heading">FAQ</h1>
        </div>
        <Link
          href="/admin/faq/new"
          className="bg-[#c9a84c] text-[#0f1210] px-5 py-2 text-sm font-medium hover:bg-[#d4b568] transition-colors"
        >
          + Добавить вопрос
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
                Вопрос
              </th>
              <th className="px-4 py-3 w-36"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((faq) => (
              <tr
                key={faq.id}
                className="border-b border-[#1e2a22] hover:bg-[#161b18]/40 transition-colors"
              >
                <td className="px-4 py-3 text-[#8a9188]">{faq.order}</td>
                <td className="px-4 py-3 text-[#f5f5f0]">
                  <p className="truncate max-w-xl">{faq.question}</p>
                  <p className="text-xs text-[#8a9188] mt-0.5 truncate max-w-xl">
                    {faq.answer}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/faq/${faq.id}`}
                      className="text-xs text-[#8a9188] hover:text-[#c9a84c] transition-colors"
                    >
                      Редактировать
                    </Link>
                    <DeleteFaqButton id={faq.id} question={faq.question} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sorted.length === 0 && (
          <p className="text-center text-[#8a9188] text-sm py-12">
            Вопросы не найдены
          </p>
        )}
      </div>
    </div>
  );
}
