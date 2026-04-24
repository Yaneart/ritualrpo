"use client";

import { useState, useTransition } from "react";
import type { Faq } from "@/types";
import { createFaqAction, updateFaqAction, type FaqFormData } from "./actions";

interface Props {
  faq?: Faq;
}

export default function FaqForm({ faq }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [question, setQuestion] = useState(faq?.question ?? "");
  const [answer, setAnswer] = useState(faq?.answer ?? "");
  const [order, setOrder] = useState(faq?.order ?? 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const data: FaqFormData = { question, answer, order: Number(order) };

    startTransition(async () => {
      const result = faq
        ? await updateFaqAction(faq.id, data)
        : await createFaqAction(data);
      if (result?.error) setError(result.error);
    });
  }

  const input =
    "w-full bg-[#0f1210] border border-[#1e2a22] text-[#f5f5f0] px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-[#8a9188]";
  const label =
    "block text-xs uppercase tracking-widest text-[#8a9188] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={label}>Вопрос</label>
        <input
          className={input}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>

      <div>
        <label className={label}>Ответ</label>
        <textarea
          className={input}
          rows={5}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
      </div>

      <div className="w-32">
        <label className={label}>Порядок</label>
        <input
          type="number"
          className={input}
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-[#c9a84c] text-[#0f1210] px-6 py-2.5 text-sm font-medium hover:bg-[#d4b568] disabled:opacity-50 transition-colors"
      >
        {isPending ? "Сохранение..." : faq ? "Сохранить" : "Создать вопрос"}
      </button>
    </form>
  );
}
