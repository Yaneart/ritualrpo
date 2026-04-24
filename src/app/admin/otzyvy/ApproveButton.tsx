"use client";

import { useTransition } from "react";
import { approveReviewAction } from "./actions";

interface Props {
  id: string;
}

export default function ApproveButton({ id }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await approveReviewAction(id);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-xs text-[#c9a84c] hover:text-[#d4b568] disabled:opacity-50 transition-colors"
    >
      {isPending ? "..." : "Одобрить"}
    </button>
  );
}
