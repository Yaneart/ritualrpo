import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/api/services";
import ServiceForm from "../ServiceForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;

  let service;
  try {
    service = await getServiceById(id);
  } catch {
    notFound();
  }

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
          Редактирование
        </p>
        <h1 className="text-2xl font-heading">{service.title}</h1>
      </div>

      <ServiceForm service={service} />
    </div>
  );
}
