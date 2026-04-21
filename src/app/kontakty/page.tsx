import ContactForm from "@/components/contacts/ContactForm";
import SectionAnchor from "@/components/ui/SectionAnchor";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с нами: +7 (812) 660-51-51. Работаем круглосуточно. Выезд специалиста в течение часа по Санкт-Петербургу.",
};

const contacts = [
  {
    num: "01",
    label: "Телефон",
    value: "+7 (812) 660-51-51",
    href: "tel:+78126605151",
  },
  {
    num: "02",
    label: "Email",
    value: "info@ritualrpo.ru",
    href: "mailto:info@ritualrpo.ru",
  },
  {
    num: "03",
    label: "Адрес",
    value: "г. Санкт-Петербург, ул. Примерная, д. 1",
  },
  { num: "04", label: "График", value: "Круглосуточно, без выходных" },
  { num: "05", label: "Выезд", value: "Специалист приедет в течение часа" },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-bg">
        <SectionAnchor
          num="00 / Контакты"
          label="— круглосуточно"
          tagline={
            <>
              <span>Свяжитесь с</span>{" "}
              <span className="italic-heading text-text-muted">нами</span>
              <span>.</span>
            </>
          }
        />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-28 md:pb-36">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-16 items-start">
            <div className="md:col-span-5 md:sticky md:top-28">
              <AnimateOnScroll>
                <a
                  href="tel:+78126605151"
                  className="block font-heading text-[clamp(28px,3.2vw,48px)] leading-[1.0] tracking-[-0.02em] text-text hover:text-gold transition-colors duration-300 mb-6 md:mb-8 whitespace-nowrap"
                >
                  +7 (812) 660-51-51
                </a>

                <div className="border-t border-border">
                  {contacts.map((item) => (
                    <div
                      key={item.num}
                      className="flex items-start gap-6 py-3 border-b border-border"
                    >
                      <span className="label text-text-muted shrink-0 min-w-[3.5rem] pt-0.5">
                        [ {item.num} ]
                      </span>
                      <div>
                        <p className="label text-text-muted mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-text hover:text-gold transition-colors duration-300"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-text">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-text-muted leading-relaxed mt-10 max-w-xs">
                  Позвоните или напишите — ответим сразу. Выезд специалиста по
                  всему Санкт-Петербургу.
                </p>
              </AnimateOnScroll>
            </div>

            <div className="md:col-span-7">
              <AnimateOnScroll>
                <ContactForm />
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg border-t border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 md:py-32 text-center">
          <AnimateOnScroll>
            <h2 className="font-heading text-[clamp(44px,7vw,110px)] leading-[0.95] tracking-[-0.02em] text-text">
              Круглосуточно.{" "}
              <span className="italic-heading text-text-muted">Мы рядом.</span>
            </h2>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
