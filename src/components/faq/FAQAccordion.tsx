"use client";

import { useState } from "react";
import { Faq } from "@/types";

interface FAQAccordionProps {
  faqs: Faq[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col">
      {faqs.map((faq, index) => (
        <div key={faq.id} className="border-b border-white/10">
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
  );
}
