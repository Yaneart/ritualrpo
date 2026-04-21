"use client";

import { useState } from "react";
import type { Faq } from "@/types";

interface FAQAccordionProps {
  faqs: Faq[];
  theme?: "light" | "dark";
}

export default function FAQAccordion({
  faqs,
  theme = "dark",
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isDark = theme === "dark";
  const borderColor = isDark ? "border-white/15" : "border-border";
  const numColor = isDark ? "text-white/50" : "text-text-muted";
  const questionColor = isDark ? "text-white" : "text-text";
  const plusColor = isDark ? "text-white/50" : "text-text-muted";
  const answerColor = isDark ? "text-white/60" : "text-text-muted";

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`border-t ${borderColor}`}>
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;

        return (
          <div key={faq.id} className={`border-b ${borderColor}`}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full flex items-start gap-4 md:gap-6 py-6 text-left cursor-pointer pe-12 md:pe-0"
            >
              <span className={`label ${numColor} pt-2 shrink-0`}>
                [ {String(i + 1).padStart(2, "0")} ]
              </span>
              <h3
                className={`font-heading text-2xl md:text-3xl leading-tight tracking-[-0.01em] ${questionColor} flex-1`}
              >
                {faq.question}
              </h3>
              <span
                className={`font-heading text-2xl ${plusColor} shrink-0 mt-1 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>

            <div
              className={`grid transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100 pb-6"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`pl-[68px] pr-10 ${answerColor} leading-relaxed max-w-3xl`}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
