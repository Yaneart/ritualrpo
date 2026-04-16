"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/katalog", label: "Каталог" },
  { href: "/kalkulyator", label: "Калькулятор" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const [isOnHero, setIsOnHero] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const hero = document.getElementById("hero");
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        setIsOnHero(heroBottom > 80);
      } else {
        setIsOnHero(false);
      }

      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        setIsOverFooter(footerTop <= 80);
      }
    };

    requestAnimationFrame(() => {
      handleScroll();
    });
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const headerBg = isOverFooter
    ? "bg-bg-dark"
    : isScrolled || isMenuOpen
      ? "bg-bg/95 backdrop-blur-md shadow-sm"
      : "bg-transparent";

  const needsLight = isOverFooter || (!isScrolled && isOnHero && !isMenuOpen);
  const textColor = needsLight ? "text-white" : "text-text";
  const mutedColor = needsLight ? "text-white/70" : "text-text-muted";
  const accentColor = needsLight ? "text-white" : "text-accent";
  const borderColor = needsLight ? "border-white/50" : "border-accent";
  const burgerBg = needsLight ? "bg-white" : "bg-text";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className={`text-2xl font-heading font-bold transition-colors duration-500 ${textColor}`}
        >
          RitualRPO
        </Link>

        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={`text-sm uppercase tracking-widest transition-colors duration-500 ${mutedColor} ${needsLight ? "hover:text-white" : "hover:text-accent"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:+78126605151"
          className={`hidden md:flex items-center gap-2 border ${borderColor} ${accentColor} hover:bg-accent hover:text-white px-5 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all duration-500`}
        >
          +7 (812) 660-51-51
        </a>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Открыть меню"
        >
          <span
            className={`block w-6 h-0.5 ${burgerBg} transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 ${burgerBg} transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 ${burgerBg} transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {isMenuOpen && (
        <nav
          className={`md:hidden px-6 py-6 flex flex-col gap-5 border-t ${isOverFooter ? "bg-bg-dark border-white/10" : "bg-bg border-border"}`}
        >
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg transition-colors duration-300 ${mutedColor}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+78126605151"
            className={`border ${borderColor} ${accentColor} hover:bg-accent hover:text-white px-5 py-2.5 rounded-full text-center text-sm uppercase tracking-wider transition-all duration-300`}
          >
            +7 (812) 660-51-51
          </a>
        </nav>
      )}
    </header>
  );
}
