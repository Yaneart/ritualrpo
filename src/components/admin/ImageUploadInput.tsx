"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (path: string) => void;
  placeholder?: string;
}

export default function ImageUploadInput({
  value,
  onChange,
  placeholder,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Ошибка загрузки");

      onChange(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const inputClass =
    "w-full bg-[#0f1210] border border-[#1e2a22] text-[#f5f5f0] px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-[#8a9188]";

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          className={inputClass + " flex-1"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "/images/..."}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="shrink-0 border border-[#1e2a22] text-[#8a9188] hover:text-[#f5f5f0] hover:border-[#c9a84c]/50 px-3 py-2 text-xs transition-colors disabled:opacity-50"
        >
          {uploading ? "Загрузка..." : "Загрузить файл"}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      {value && (
        <div className="relative h-24 w-40 border border-[#1e2a22]">
          <Image
            src={value}
            alt="Превью"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
