"use client";

import { useState, useTransition } from "react";
import { updateSettingsAction } from "./actions";

interface Props {
  initialValues: Record<string, string>;
}

const FIELDS = [
  {
    key: "phone",
    label: "Телефон (отображение)",
    placeholder: "+7 (812) 660-51-51",
  },
  {
    key: "phone_href",
    label: "Телефон (ссылка href)",
    placeholder: "tel:+78126605151",
  },
  { key: "email", label: "Email", placeholder: "info@ritualrpo.ru" },
  {
    key: "address",
    label: "Адрес",
    placeholder: "г. Санкт-Петербург, ул. Примерная, д. 1",
  },
  {
    key: "hours",
    label: "График работы",
    placeholder: "Круглосуточно, без выходных",
  },
];

export default function SettingsForm({ initialValues }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(initialValues);

  function handleChange(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    startTransition(async () => {
      const result = await updateSettingsAction(values);
      if (result?.error) setError(result.error);
      else setSaved(true);
    });
  }

  const input =
    "w-full bg-[#0f1210] border border-[#1e2a22] text-[#f5f5f0] px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-[#8a9188]";
  const label = "block text-xs uppercase tracking-widest text-[#8a9188] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      {FIELDS.map((field) => (
        <div key={field.key}>
          <label className={label}>{field.label}</label>
          <input
            className={input}
            value={values[field.key] ?? ""}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        </div>
      ))}

      {error && <p className="text-sm text-red-400">{error}</p>}
      {saved && <p className="text-sm text-[#c9a84c]">Настройки сохранены.</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-[#c9a84c] text-[#0f1210] px-6 py-2.5 text-sm font-medium hover:bg-[#d4b568] disabled:opacity-50 transition-colors"
      >
        {isPending ? "Сохранение..." : "Сохранить настройки"}
      </button>
    </form>
  );
}
