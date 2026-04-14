"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollOnTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollOnTop}
      className={`fixed bottom-24 right-6 z-50 w-12 h-12 bg-bg-dark text-white ring-2 ring-white/30 hover:ring-white/60 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Наверх"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 17V3m0 0l-5 5m5-5l5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
