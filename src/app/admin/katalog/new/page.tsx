import Link from "next/link";
import { getCategories } from "@/lib/api/categories";
import ProductForm from "../ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="p-10 max-w-3xl">
      <div className="mb-8">
        <Link
          href="/admin/katalog"
          className="text-xs text-[#8a9188] hover:text-[#c9a84c] transition-colors"
        >
          ← Все товары
        </Link>
        <p className="text-xs uppercase tracking-widest text-[#8a9188] mt-4 mb-1">
          Создание
        </p>
        <h1 className="text-2xl font-heading">Новый товар</h1>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
