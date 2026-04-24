import Link from "next/link";
import FaqForm from "../FaqForm";

export default function NewFaqPage() {
  return (
    <div className="p-10 max-w-3xl">
      <div className="mb-8">
        <Link
          href="/admin/faq"
          className="text-xs text-[#8a9188] hover:text-[#c9a84c] transition-colors"
        >
          ← Все вопросы
        </Link>
        <p className="text-xs uppercase tracking-widest text-[#8a9188] mt-4 mb-1">
          Создание
        </p>
        <h1 className="text-2xl font-heading">Новый вопрос</h1>
      </div>

      <FaqForm />
    </div>
  );
}
