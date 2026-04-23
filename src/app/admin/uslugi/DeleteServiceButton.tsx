"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteServiceAction } from "./actions";

interface Props {
  id: string;
  title: string;
}

export default function DeleteServiceButton({ id, title }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!window.confirm(`Удалить услугу «${title}» ?`)) return;
    startTransition(async () => {
      const result = await deleteServiceAction(id);

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
