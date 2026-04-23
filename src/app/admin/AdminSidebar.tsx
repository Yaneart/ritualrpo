"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/admin", label: "Дашборд" },
  { href: "/admin/uslugi", label: "Услуги" },
  { href: "/admin/katalog", label: "Каталог товаров" },
  { href: "/admin/zayavki", label: "Заявки" },
  { href: "/admin/otzyvy", label: "Отзывы" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/nastroyki", label: "Настройки" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0a0d0b] border-b border-[#1e2a22] flex items-center justify-between px-4 z-30">
        <p className="text-sm font-medium text-[#f5f5f0]">RitualRPO Admin</p>
        <button
          onClick={() => setOpen(true)}
          className="flex flex-col gap-1.5 p-1"
          aria-label="Открыть меню"
        >
          <span className="block w-5 h-px bg-[#f5f5f0]" />
          <span className="block w-5 h-px bg-[#f5f5f0]" />
          <span className="block w-5 h-px bg-[#f5f5f0]" />
        </button>
      </header>

      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-56 bg-[#0a0d0b] border-r border-[#1e2a22] flex flex-col z-40 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        <div className="px-6 py-6 border-b border-[#1e2a22] flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8a9188] mb-1">
              Панель
            </p>
            <p className="text-sm font-medium text-[#f5f5f0]">RitualRPO</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-[#8a9188] hover:text-[#f5f5f0] text-lg leading-none"
            aria-label="Закрыть меню"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-2.5 text-sm transition-colors ${
                isActive(link.href)
                  ? "text-[#c9a84c] border-l-2 border-[#c9a84c] bg-[#c9a84c]/5"
                  : "text-[#8a9188] hover:text-[#f5f5f0] border-l-2 border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-[#1e2a22]">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full text-left text-sm text-[#8a9188] hover:text-red-400 transition-colors disabled:opacity-50"
          >
            {loggingOut ? "Выход..." : "Выйти"}
          </button>
        </div>
      </aside>
    </>
  );
}
