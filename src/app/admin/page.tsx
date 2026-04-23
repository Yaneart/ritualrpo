import Link from "next/link";

const SECTIONS = [
  { href: "/admin/uslugi", label: "Услуги", desc: "Добавление и редактирование" },
  { href: "/admin/katalog", label: "Каталог товаров", desc: "Товары и категории" },
  { href: "/admin/zayavki", label: "Заявки", desc: "Заявки с сайта" },
  { href: "/admin/otzyvy", label: "Отзывы", desc: "Модерация отзывов" },
  { href: "/admin/faq", label: "FAQ", desc: "Вопросы и ответы" },
  { href: "/admin/nastroyki", label: "Настройки", desc: "Телефон, адрес, email" },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-10">
      <p className="text-xs uppercase tracking-widest text-[#8a9188] mb-1">
        Добро пожаловать
      </p>
      <h1 className="text-2xl font-heading mb-10">Панель управления</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="border border-[#1e2a22] bg-[#161b18] px-6 py-5 hover:border-[#c9a84c]/50 hover:bg-[#161b18]/80 transition-colors group"
          >
            <p className="text-sm font-medium text-[#f5f5f0] group-hover:text-[#c9a84c] transition-colors mb-1">
              {s.label}
            </p>
            <p className="text-xs text-[#8a9188]">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
