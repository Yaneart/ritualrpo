"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteFaqAction } from "./actions";

interface Props {
  id: string;
  question: string;
}

export default function DeleteFaqButton({ id, question }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!window.confirm(`Удалить вопрос «${question.slice(0, 40)}...»?`)) return;
    startTransition(async () => {
      const result = await deleteFaqAction(id);
      if (result?.error) alert(result.error);
      else router.refresh();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
    >
      {isPending ? "..." : "Удалить"}
    </button>
  );
}
