"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/katalog", label: "Каталог" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-bold">
          RitualRPO
        </Link>

        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="hover:text-accent-light transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:+78126605151"
          className="hidden md:flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          ☎ +7 (812) 660-51-51
        </a>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Открыть меню"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-primary-dark px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg hover:text-accent-light transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+78126605151"
            className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-lg transition-colors duration-200 text-center"
          >
            ☎ +7 (812) 660-51-51
          </a>
        </nav>
      )}
    </header>
  );
}
