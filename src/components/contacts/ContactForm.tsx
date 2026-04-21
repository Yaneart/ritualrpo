"use client";

import { submitRequest } from "@/lib";
import { useState } from "react";
import Marker from "@/components/ui/Marker";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    const newErrors: { name?: string; phone?: string } = {};

    if (!form.name.trim()) newErrors.name = "Введите ваше имя";

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) {
      newErrors.phone = "Введите номер телефона";
    } else if (phoneDigits.length < 10) {
      newErrors.phone = "Номер телефона слишком короткий";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitRequest({
        type: "contact",
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        message: form.message || undefined,
      });
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Не удалось отправить заявку",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="border-t border-border pt-10">
        <Marker>Спасибо</Marker>
        <p className="font-heading text-3xl md:text-4xl leading-[1.05] tracking-[-0.01em] text-text mt-6 mb-4">
          Заявка принята.
        </p>
        <p className="text-text-muted leading-relaxed">
          Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <Marker>Обратная связь</Marker>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div>
          <label htmlFor="name" className="label text-text-muted block mb-1.5">
            Ваше имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className={`w-full bg-transparent border-b py-2 text-base outline-none transition-colors duration-300 ${
              errors.name ? "border-red-400" : "border-border focus:border-text"
            }`}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="label text-text-muted block mb-1.5">
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            className={`w-full bg-transparent border-b py-2 text-base outline-none transition-colors duration-300 ${
              errors.phone ? "border-red-400" : "border-border focus:border-text"
            }`}
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="label text-text-muted block mb-1.5">
            Email <span className="text-text-muted/50">(необязательно)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-border py-2 text-base outline-none focus:border-text transition-colors duration-300"
          />
        </div>

        <div>
          <label htmlFor="message" className="label text-text-muted block mb-1.5">
            Сообщение
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-border py-2 text-base outline-none focus:border-text transition-colors duration-300 resize-none"
          />
        </div>

        {submitError && <p className="text-red-400 text-sm">{submitError}</p>}

        <div className="pt-2 flex justify-center md:justify-start">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-block bg-text hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed text-white hover:text-text px-7 py-4 rounded-full text-sm uppercase tracking-wider transition-colors duration-300 cursor-pointer"
          >
            {isSubmitting ? "Отправляем..." : "Отправить заявку"}
          </button>
        </div>
      </form>
    </div>
  );
}
