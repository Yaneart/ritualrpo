import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import ProductForm from "../ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) notFound();

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
          Редактирование
        </p>
        <h1 className="text-2xl font-heading">{product.name}</h1>
      </div>

      <ProductForm product={product} categories={categories} />
    </div>
  );
}
