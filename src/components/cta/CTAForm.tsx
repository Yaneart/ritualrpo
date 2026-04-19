"use client";

import { useState } from "react";
import { submitRequest } from "@/lib";

export default function CTAForm() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};

    if (!form.name.trim()) newErrors.name = "Введите имя";

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) newErrors.phone = "Введите телефон";
    else if (phoneDigits.length < 10) newErrors.phone = "Номер слишком короткий";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitRequest({
        type: "cta",
        name: form.name,
        phone: form.phone,
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
      <div className="border border-border rounded-2xl p-10 md:p-12 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-gold text-gold text-2xl"
          >
            ✓
          </span>
          <p className="label text-gold">[ Заявка принята ]</p>
        </div>

        <p className="font-heading text-3xl md:text-4xl leading-[1.05] tracking-[-0.02em] text-text">
          Перезвоним в течение <span className="italic-heading">3 минут</span>.
        </p>

        <p className="text-text-muted leading-relaxed">
          Если сейчас ночь — позвоним сразу, как сможете говорить. Линия работает
          круглосуточно.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label htmlFor="cta-name" className="label text-text-muted block mb-3">
          [ Как к вам обращаться ]
        </label>
        <input
          type="text"
          id="cta-name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Имя"
          className={`w-full bg-transparent border-b focus:border-gold outline-none py-3 font-heading text-2xl text-text placeholder:text-text-muted/50 transition-colors ${
            errors.name ? "border-red-500" : "border-border"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-2">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="cta-phone" className="label text-text-muted block mb-3">
          [ Телефон ]
        </label>
        <input
          type="tel"
          id="cta-phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+7 (___) ___-__-__"
          className={`w-full bg-transparent border-b focus:border-gold outline-none py-3 font-heading text-2xl text-text placeholder:text-text-muted/50 transition-colors ${
            errors.phone ? "border-red-500" : "border-border"
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
        )}
      </div>

      {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group w-full mt-4 inline-flex items-center justify-between px-6 py-5 rounded-full bg-text text-white label hover:bg-gold hover:text-text disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-300 cursor-pointer"
      >
        <span>{isSubmitting ? "Отправляем..." : "Оставить заявку"}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>

      <p className="text-text-muted text-xs leading-relaxed">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных. Мы не
        передаём номера третьим лицам.
      </p>
    </form>
  );
}
