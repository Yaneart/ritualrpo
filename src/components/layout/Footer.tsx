import Link from "next/link";

const navLinks = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/katalog", label: "Каталог" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
];

export default function Footer() {
  return (
    <footer className="bg-bg-alt text-text">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-sm uppercase tracking-widest text-text-muted mb-6">
            О нас
          </h3>
          <p className="text-text-muted leading-relaxed">
            Мы оказываем профессиональные ритуальные услуги с уважением и
            заботой. Круглосуточная поддержка в трудную минуту.
          </p>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-text-muted mb-6">
            Навигация
          </h3>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="text-text-muted hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-text-muted mb-6">
            Контакты
          </h3>
          <div className="flex flex-col gap-4 text-text-muted">
            <p>г. Санкт-Петербург, ул. Примерная, д. 1</p>
            <a
              href="tel:+78126605151"
              className="hover:text-accent transition-colors duration-300"
            >
              +7 (812) 660-51-51
            </a>
            <a
              href="mailto:info@ritualrpo.ru"
              className="hover:text-accent transition-colors duration-300"
            >
              info@ritualrpo.ru
            </a>
            <p>Круглосуточно, без выходных</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-center font-heading text-6xl md:text-8xl font-bold text-text-muted/20 select-none">
            RitualRPO
          </p>
          <p className="text-center text-text-muted text-sm mt-4">
            &copy; 2026 RitualRPO. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
