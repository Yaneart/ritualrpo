import Link from "next/link";
import { getSettingsMap } from "@/lib";

const navLinks = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/katalog", label: "Каталог" },
  { href: "/kalkulyator", label: "Калькулятор" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
];

const socialLinks = [
  { href: "#", label: "VK" },
  { href: "#", label: "Telegram" },
  { href: "#", label: "WhatsApp" },
];

export default async function Footer() {
  const s = await getSettingsMap();
  const phone = s.phone ?? "+7 (812) 660-51-51";
  const phoneHref = s.phone_href ?? "tel:+78126605151";
  const email = s.email ?? "info@ritualrpo.ru";
  const address = s.address ?? "г. Санкт-Петербург";
  const hours = s.hours ?? "Круглосуточно, без выходных";

  return (
    <footer className="bg-bg-dark text-bg md:min-h-screen flex flex-col justify-between">
      <div className="max-w-[1600px] mx-auto w-full px-6 md:pt-55">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-12 gap-x-16 py-14 border-b border-white/10">
          <div>
            <p className="text-lg uppercase tracking-widest text-white/25 mb-6">
              [ Контакты ]
            </p>
            <div className="flex flex-col gap-4">
              <a
                href={phoneHref}
                className="font-heading text-5xl font-normal text-bg/80 hover:text-gold transition-colors duration-300"
              >
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="text-2xl text-bg/40 hover:text-bg/80 transition-colors duration-300"
              >
                {email}
              </a>
              <p className="text-2xl text-bg/30">{hours}</p>
            </div>
          </div>

          <div>
            <p className="text-lg uppercase tracking-widest text-white/25 mb-6">
              [ Адрес ]
            </p>
            <p className="text-xl text-bg/40 leading-relaxed">{address}</p>
          </div>

          <div>
            <p className="text-lg uppercase tracking-widest text-white/25 mb-6">
              [ Соцсети ]
            </p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-2xl text-bg/40 hover:text-bg/80 transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="w-full overflow-hidden px-4">
          <p className="font-heading text-[13vw] font-bold leading-none text-bg/10 select-none whitespace-nowrap text-center uppercase">
            &copy;RitualRPO
          </p>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 pt-6 pb-20 md:pb-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-bg/30 text-xs">
            &copy; 2026 RitualRPO. Все права защищены.
          </p>
          <p className="text-bg/30 text-xs">Санкт-Петербург, Россия</p>
        </div>
      </div>
    </footer>
  );
}
