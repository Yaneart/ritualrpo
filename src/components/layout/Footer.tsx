import Link from "next/link";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/katalog", label: "Каталог" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white ">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-heading font-bold mb-4">RitualRPO</h3>
          <p className="text-gray-300 leading-relaxed">
            Мы оказываем профессиональные ритуальные услуги с уважением и
            заботой. Круглосуточная поддержка в трудную минуту.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-heading font-bold mb-4">Навигация</h3>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="text-gray-300 hover:text-accent-light transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-xl font-heading font-bold mb-4">Контакты</h3>
          <div className="flex flex-col gap-3 text-gray-300">
            <p>📍 г. Санкт-Петербург, ул. Примерная, д. 1</p>
            <a
              href="tel:+78126605151"
              className="hover:text-accent-light transition-colors duration-200"
            >
              📞 +7 (812) 660-51-51
            </a>
            <a
              href="mailto:info@ritualrpo.ru"
              className="hover:text-accent-light transition-colors duration-200"
            >
              ✉ info@ritualrpo.ru
            </a>
            <p>🕐 Круглосуточно, без выходных</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-gray-400 text-sm">
          © 2026 RitualRPO. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
