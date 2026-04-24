"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteReviewAction } from "./actions";

interface Props {
  id: string;
  name: string;
}

export default function DeleteReviewButton({ id, name }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!window.confirm(`Удалить отзыв от «${name}»?`)) return;
    startTransition(async () => {
      const result = await deleteReviewAction(id);
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
