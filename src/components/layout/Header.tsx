"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/katalog", label: "Каталог" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-bg/80 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-bold text-text">
          RitualRPO
        </Link>

        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="text-sm uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:+78126605151"
          className="hidden md:flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-bg px-5 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all duration-300"
        >
          +7 (812) 660-51-51
        </a>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Открыть меню"
        >
          <span
            className={`block w-6 h-0.5 bg-text transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-bg px-6 py-6 flex flex-col gap-5 border-t border-border">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg text-text-muted hover:text-accent transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+78126605151"
            className="border border-accent text-accent hover:bg-accent hover:text-bg px-5 py-2.5 rounded-full text-center text-sm uppercase tracking-wider transition-all duration-300"
          >
            +7 (812) 660-51-51
          </a>
        </nav>
      )}
    </header>
  );
}
