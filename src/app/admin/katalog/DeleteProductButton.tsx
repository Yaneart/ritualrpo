"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteProductAction } from "./actions";

interface Props {
  id: string;
  name: string;
}

export default function DeleteProductButton({ id, name }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!window.confirm(`Удалить товар «${name}» ?`)) return;
    startTransition(async () => {
      const result = await deleteProductAction(id);

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
