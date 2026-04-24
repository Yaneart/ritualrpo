"use client";

import { useTransition } from "react";
import { markAsReadAction } from "./actions";

interface Props {
  id: string;
}

export default function MarkAsReadButton({ id }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await markAsReadAction(id);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-xs text-[#8a9188] hover:text-[#c9a84c] disabled:opacity-50 transition-colors"
    >
      {isPending ? "..." : "Прочитано"}
    </button>
  );
}
