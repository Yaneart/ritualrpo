import Link from "next/link";
import { getProducts } from "@/lib/api/products";
import DeleteProductButton from "./DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminKatalogPage() {
  const products = await getProducts();
  const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#8a9188] mb-1">
            Управление
          </p>
          <h1 className="text-2xl font-heading">Каталог товаров</h1>
        </div>
        <Link
          href="/admin/katalog/new"
          className="bg-[#c9a84c] text-[#0f1210] px-5 py-2 text-sm font-medium hover:bg-[#d4b568] transition-colors"
        >
          + Добавить товар
        </Link>
      </div>

      <div className="border border-[#1e2a22]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1e2a22] bg-[#161b18]">
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-[#8a9188]">
                Название
              </th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-[#8a9188] hidden md:table-cell">
                Категория
              </th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-[#8a9188] hidden lg:table-cell">
                Цена
              </th>
              <th className="px-4 py-3 w-36"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[#1e2a22] hover:bg-[#161b18]/40 transition-colors"
              >
                <td className="px-4 py-3 text-[#f5f5f0]">{product.name}</td>
                <td className="px-4 py-3 text-[#8a9188] hidden md:table-cell">
                  {product.category?.name ?? "—"}
                </td>
                <td className="px-4 py-3 text-[#8a9188] hidden lg:table-cell">
                  {product.price.toLocaleString("ru-RU")} ₽
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/katalog/${product.id}`}
                      className="text-xs text-[#8a9188] hover:text-[#c9a84c] transition-colors"
                    >
                      Редактировать
                    </Link>
                    <DeleteProductButton id={product.id} name={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sorted.length === 0 && (
          <p className="text-center text-[#8a9188] text-sm py-12">
            Товары не найдены
          </p>
        )}
      </div>
    </div>
  );
}
