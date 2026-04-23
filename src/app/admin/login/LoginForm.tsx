"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка входа");
        return;
      }

      window.location.href = "/admin";
    } catch {
      setError("Сервер не доступен");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs uppercase tracking-widest text-[#8a9188]">
          email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(q) => setEmail(q.target.value)}
          placeholder="admin@ritualrpo.ru"
          className="bg-[#161b18] border border-[#2d4a3e] px-4 py-3 text-sm text-[#f5f5f0] outline-none focus:border-[#c9a84c] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs uppercase tracking-widest text-[#8a9188]">
          Пароль
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="bg-[#161b18] border border-[#2d4a3e] px-4 py-3 text-sm text-[#f5f5f0] outline-none focus:border-[#c9a84c] transition-colors"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 border border-red-400/30 bg-red-400/10 px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 bg-[#c9a84c] text-[#0f1210] px-6 py-3 text-sm uppercase tracking-widest font-medium hover:bg-[#b8973e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Вход..." : "Войти"}
      </button>
    </form>
  );
}
