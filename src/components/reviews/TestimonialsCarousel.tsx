"use client";

import { useState } from "react";
import type { Review } from "@/types";

interface TestimonialsCarouselProps {
  reviews: Review[];
}

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

function formatDate(iso: string) {
  const date = new Date(iso);
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export default function TestimonialsCarousel({
  reviews,
}: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  if (!review) return null;

  const initial = review.name.charAt(0).toUpperCase();
  const hasMultiple = reviews.length > 1;

  const next = () => setIndex((index + 1) % reviews.length);
  const prev = () => setIndex((index - 1 + reviews.length) % reviews.length);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 pb-16 text-center">
      <div className="font-heading italic-heading text-gold text-7xl leading-none">
        “
      </div>

      <div className="grid py-6">
        {reviews.map((r, i) => (
          <blockquote
            key={r.id}
            style={{ gridArea: "1 / 1" }}
            className={`font-heading text-2xl sm:text-4xl md:text-6xl leading-[1.15] md:leading-[1.1] tracking-[-0.01em] text-text break-words hyphens-auto transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            lang="ru"
          >
            {r.text}
          </blockquote>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mb-12">
        <div className="w-12 h-12 rounded-full bg-text text-white flex items-center justify-center font-heading text-lg">
          {initial}
        </div>
        <div className="text-left">
          <div className="font-heading text-xl text-text">{review.name}</div>
          <div className="label text-text-muted mt-1">
            {formatDate(review.createdAt)}
          </div>
        </div>
      </div>

      {hasMultiple && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3 label text-text-muted">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="w-16 h-px bg-border" />
            <span className="tabular-nums">
              {String(reviews.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Предыдущий отзыв"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text hover:bg-text hover:text-white hover:border-text transition-colors duration-300"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Следующий отзыв"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text hover:bg-text hover:text-white hover:border-text transition-colors duration-300"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
