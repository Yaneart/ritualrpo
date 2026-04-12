"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Что делать в первую очередь при потере близкого?",
    answer:
      "Позвоните нам по номеру +7 (812) 660-51-51. Мы работаем круглосуточно и подскажем все необходимые шаги. Наш специалист приедет в течение часа и возьмёт на себя оформление документов и организацию.",
  },
  {
    question: "Какие документы нужны для организации похорон?",
    answer:
      "Паспорт умершего и паспорт заявителя. Медицинское свидетельство о смерти выдаётся в больнице или морге. Мы помогаем оформить гербовое свидетельство о смерти в ЗАГСе и все остальные документы.",
  },
  {
    question: "Сколько стоят ваши услуги?",
    answer:
      "Стоимость зависит от выбранных услуг. Мы предлагаем готовые пакеты от 35 000 рублей, а также индивидуальный подбор. Финальную сумму вы узнаете до начала работы — никаких скрытых наценок.",
  },
  {
    question: "Вы работаете ночью и в выходные?",
    answer:
      "Да, мы работаем 24 часа в сутки, 7 дней в неделю, включая праздничные дни. Звоните в любое время.",
  },
  {
    question: "Можно ли организовать кремацию?",
    answer:
      "Да, мы организуем кремацию в крематориях Санкт-Петербурга. Помогаем с выбором урны, проведением церемонии прощания и оформлением всех документов.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-bg-dark text-white py-32 md:py-44">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-sm uppercase tracking-widest text-white/40 mb-4">
          [ Вопросы ]
        </p>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-16">
          Частые <em className="italic font-normal">вопросы</em>
        </h2>

        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/10">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
              >
                <span className="text-lg md:text-xl font-semibold pr-8">
                  {faq.question}
                </span>

                <span
                  className={`text-white/40 text-2xl transition-transform duration-300 ${openIndex === index ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-96 pb-6" : "max-h-0"}`}
              >
                <p className="text-white/60 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
