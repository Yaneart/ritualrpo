"use client";

import { submitReview } from "@/lib";
import { useState } from "react";

export default function ReviewForm() {
  const [form, setForm] = useState({ name: "", text: "" });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState<{
    name?: string;
    rating?: string;
    text?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!form.name.trim()) newErrors.name = "Введите ваше имя";
    if (rating === 0) newErrors.rating = "Укажите оценку";
    if (!form.text.trim()) newErrors.text = "Напишите текст отзыва";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitReview({
        name: form.name,
        rating,
        text: form.text,
      });
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Не удалось отправить отзыв",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="border border-border rounded-2xl p-12 text-center bg-bg">
        <p className="font-heading text-2xl font-bold mb-4">
          Спасибо за отзыв!
        </p>
        <p className="text-text-muted">
          Ваш отзыв появится на сайте после модерации.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label htmlFor="name" className="block text-sm text-text-muted mb-2">
          Ваше имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className={`w-full bg-transparent border-b py-3 text-lg outline-none transition-colors duration-300 ${
            errors.name ? "border-red-500" : "border-border focus:border-accent"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-text-muted mb-2">Оценка</label>
        <div className="flex gap-1 text-3xl">
          {Array.from({ length: 5 }).map((_, i) => {
            const starNumber = i + 1;
            const active = starNumber <= (hoverRating || rating);
            return (
              <button
                type="button"
                key={i}
                onClick={() => {
                  setRating(starNumber);
                  if (errors.rating) {
                    setErrors({ ...errors, rating: undefined });
                  }
                }}
                onMouseEnter={() => setHoverRating(starNumber)}
                onMouseLeave={() => setHoverRating(0)}
                className={`transition-colors cursor-pointer ${
                  active ? "text-gold" : "text-accent/40"
                }`}
                aria-label={`Оценка ${starNumber} из 5`}
              >
                ★
              </button>
            );
          })}
        </div>
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
        )}
      </div>

      <div>
        <label htmlFor="text" className="block text-sm text-text-muted mb-2">
          Отзыв
        </label>
        <textarea
          id="text"
          name="text"
          required
          rows={5}
          value={form.text}
          onChange={handleChange}
          className={`w-full bg-transparent border-b py-3 text-lg outline-none transition-colors duration-300 resize-none ${
            errors.text ? "border-red-500" : "border-border focus:border-accent"
          }`}
        />
        {errors.text && (
          <p className="text-red-500 text-sm mt-1">{errors.text}</p>
        )}
      </div>

      {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-accent hover:bg-accent-hover disabled:bg-accent/50 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-colors
duration-300 mt-4 cursor-pointer md:w-fit"
      >
        {isSubmitting ? "Отправляем..." : "Оставить отзыв"}
      </button>
    </form>
  );
}
