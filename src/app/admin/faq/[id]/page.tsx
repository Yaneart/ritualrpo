import Link from "next/link";
import { notFound } from "next/navigation";
import { getFaqs } from "@/lib/api/faq";
import FaqForm from "../FaqForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditFaqPage({ params }: Props) {
  const { id } = await params;
  const faqs = await getFaqs();
  const faq = faqs.find((f) => f.id === id);

  if (!faq) notFound();

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
          Редактирование
        </p>
        <h1 className="text-2xl font-heading truncate">{faq.question}</h1>
      </div>

      <FaqForm faq={faq} />
    </div>
  );
}
