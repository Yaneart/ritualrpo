"use client";

import { useState, useTransition } from "react";
import type { Service } from "@/types";
import {
  createServiceAction,
  updateServiceAction,
  type ServiceFormData,
} from "./actions";

interface Props {
  service?: Service;
}

export default function ServiceForm({ service }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [slug, setSlug] = useState(service?.slug ?? "");
  const [title, setTitle] = useState(service?.title ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [fullText, setFullText] = useState(service?.fullText ?? "");
  const [image, setImage] = useState(service?.image ?? "");
  const [featuresText, setFeaturesText] = useState(
    service?.features.join("\n") ?? "",
  );
  const [price, setPrice] = useState(service?.price ?? "");
  const [order, setOrder] = useState(service?.order ?? 0);
  const [isActive, setIsActive] = useState(service?.isActive ?? true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const data: ServiceFormData = {
      slug,
      title,
      description,
      fullText,
      image,
      features: featuresText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      price: price ?? "",
      order: Number(order),
      isActive,
    };

    startTransition(async () => {
      const result = service
        ? await updateServiceAction(service.id, data)
        : await createServiceAction(data);
      if (result?.error) setError(result.error);
    });
  }

  const input =
    "w-full bg-[#0f1210] border border-[#1e2a22] text-[#f5f5f0] px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-[#8a9188]";
  const label = "block text-xs uppercase tracking-widest text-[#8a9188] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Название</label>
          <input
            className={input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={label}>Slug (URL)</label>
          <input
            className={input}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className={label}>Краткое описание</label>
        <textarea
          className={input}
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className={label}>Полный текст</label>
        <textarea
          className={input}
          rows={6}
          value={fullText}
          onChange={(e) => setFullText(e.target.value)}
          required
        />
      </div>

      <div>
        <label className={label}>Изображение (путь)</label>
        <input
          className={input}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="/images/services/..."
          required
        />
      </div>

      <div>
        <label className={label}>Особенности — каждая с новой строки</label>
        <textarea
          className={input}
          rows={4}
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          placeholder={"Транспортировка\nДокументы\nОрганизация"}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Цена</label>
          <input
            className={input}
            value={price ?? ""}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="от 15 000 ₽"
          />
        </div>
        <div>
          <label className={label}>Порядок</label>
          <input
            type="number"
            className={input}
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="accent-[#c9a84c]"
        />
        <label htmlFor="isActive" className="text-sm text-[#f5f5f0]">
          Активна (показывается на сайте)
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-[#c9a84c] text-[#0f1210] px-6 py-2.5 text-sm font-medium hover:bg-[#d4b568] disabled:opacity-50 transition-colors"
      >
        {isPending ? "Сохранение..." : service ? "Сохранить" : "Создать услугу"}
      </button>
    </form>
  );
}
