import Link from "next/link";
import ServiceForm from "../ServiceForm";

export default function NewServicePage() {
  return (
    <div className="p-10 max-w-3xl">
      <div className="mb-8">
        <Link
          href="/admin/uslugi"
          className="text-xs text-[#8a9188] hover:text-[#c9a84c] transition-colors"
        >
          ← Все услуги
        </Link>
        <p className="text-xs uppercase tracking-widest text-[#8a9188] mt-4 mb-1">
          Создание
        </p>
        <h1 className="text-2xl font-heading">Новая услуга</h1>
      </div>

      <ServiceForm />
    </div>
  );
}
