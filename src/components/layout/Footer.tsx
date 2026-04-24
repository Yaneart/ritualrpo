import { getSettingsMap } from "@/lib";

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
      <div className="max-w-7xl mx-auto w-full px-6 pt-20 md:pt-55">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-12 gap-x-16">
          <div>
            <h3 className="text-base uppercase tracking-widest text-bg mb-6">
              Контакты
            </h3>
            <div className="flex flex-col gap-4 text-base text-bg/60">
              <a
                href={phoneHref}
                className="hover:text-bg transition-colors duration-300"
              >
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="hover:text-bg transition-colors duration-300"
              >
                {email}
              </a>
              <p>{hours}</p>
            </div>
          </div>

          <div>
            <h3 className="text-base uppercase tracking-widest text-bg mb-6">
              Адрес
            </h3>
            <div className="flex flex-col gap-4 text-base text-bg/60">
              {address.split(", ").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base uppercase tracking-widest text-bg mb-6">
              Соцсети
            </h3>
            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  className="text-base text-bg/60 hover:text-bg transition-colors duration-300"
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
