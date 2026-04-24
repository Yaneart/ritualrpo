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

interface Props {
  phone: string;
  phoneHref: string;
}

export default function Header({ phone, phoneHref }: Props) {
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

    requestAnimationFrame(() => handleScroll());
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
  const mutedColor = needsLight ? "text-white/60" : "text-text-muted";
  const borderColor = needsLight ? "border-white/40" : "border-border";
  const burgerBg = needsLight ? "bg-white" : "bg-text";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <Link
          href="/"
          className={`font-heading text-2xl font-normal transition-colors duration-500 ${textColor}`}
        >
          <em className="italic">Ritual</em>RPO
        </Link>

        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={`relative text-xm uppercase tracking-widest transition-colors duration-500 ${mutedColor} ${needsLight ? "hover:text-white" : "hover:text-text"} after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:transition-all after:duration-300 ${needsLight ? "after:bg-white" : "after:bg-text"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={phoneHref}
          className={`hidden md:flex items-center border ${borderColor} ${textColor} px-5 py-2 text-xs uppercase tracking-widest transition-all duration-500 ${needsLight ? "hover:bg-white hover:text-bg-dark" : "hover:bg-text hover:text-bg hover:border-text"}`}
        >
          {phone}
        </a>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Открыть меню"
        >
          <span
            className={`block w-6 h-px ${burgerBg} transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-6 h-px ${burgerBg} transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-px ${burgerBg} transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {isMenuOpen && (
        <nav
          className={`md:hidden px-6 py-8 flex flex-col gap-6 border-t ${isOverFooter ? "bg-bg-dark border-white/10" : "bg-bg border-border"}`}
        >
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`font-heading text-2xl font-normal transition-colors duration-300 ${isOverFooter ? "text-white/70 hover:text-white" : "text-text-muted hover:text-text"}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={phoneHref}
            className={`mt-2 border ${borderColor} ${textColor} px-5 py-3 text-xs uppercase tracking-widest text-center transition-all duration-300`}
          >
            {phone}
          </a>
        </nav>
      )}
    </header>
  );
}
