import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "../globals.css";
import AdminSidebar from "./AdminSidebar";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Админ-панель | RitualRPO",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${inter.variable} min-h-screen bg-[#0f1210] text-[#f5f5f0] font-sans antialiased flex`}
    >
      <AdminSidebar />
      <main className="flex-1 md:ml-56 min-h-screen pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}
