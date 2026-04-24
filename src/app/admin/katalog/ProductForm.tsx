"use client";

import { useState, useTransition } from "react";
import type { Category, Product } from "@/types";
import ImageUploadInput from "@/components/admin/ImageUploadInput";
import {
  createProductAction,
  updateProductAction,
  type ProductFormData,
} from "./actions";

interface Props {
  product?: Product;
  categories: Category[];
}

export default function ProductForm({ product, categories }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [slug, setSlug] = useState(product?.slug ?? "");
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price ?? 0);
  const [image, setImage] = useState(product?.image ?? "");
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");
  const [isActive, setIsActive] = useState(product?.isActive ?? true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const data: ProductFormData = {
      slug,
      name,
      description,
      price: Number(price),
      image,
      categoryId,
      isActive,
    };

    startTransition(async () => {
      const result = product
        ? await updateProductAction(product.id, data)
        : await createProductAction(data);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <label className={label}>Описание (необязательно)</label>
        <textarea
          className={input}
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Цена (₽)</label>
          <input
            type="number"
            min={0}
            className={input}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className={label}>Категория</label>
          <select
            className={input}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">— выберите —</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label}>Изображение</label>
        <ImageUploadInput
          value={image}
          onChange={setImage}
          placeholder="/images/catalog/..."
        />
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
          Активен (показывается в каталоге)
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-[#c9a84c] text-[#0f1210] px-6 py-2.5 text-sm font-medium hover:bg-[#d4b568] disabled:opacity-50 transition-colors"
      >
        {isPending ? "Сохранение..." : product ? "Сохранить" : "Создать товар"}
      </button>
    </form>
  );
}
