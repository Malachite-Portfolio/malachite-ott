"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

type AdminShellProps = {
  title: string;
  eyebrow?: string;
  primaryAction?: {
    label: string;
    href?: string;
  };
  children: ReactNode;
};

export function AdminShell({ title, eyebrow = "Admin Panel", primaryAction, children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      {sidebarOpen ? (
        <button
          aria-label="Close admin menu overlay"
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <section className="lg:pl-80">
        <header className="sticky top-0 z-20 border-b border-white/8 bg-[#070707]/86 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-start gap-3">
              <button
                aria-label="Open admin menu"
                className="mt-1 rounded-md border border-white/10 bg-white/[0.04] p-2 text-slate-200 hover:bg-white/10 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="block h-0.5 w-5 bg-current" />
                <span className="mt-1.5 block h-0.5 w-5 bg-current" />
                <span className="mt-1.5 block h-0.5 w-5 bg-current" />
              </button>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.26em] text-emerald-300">{eyebrow}</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/home"
                className="rounded-md border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-100 transition hover:bg-emerald-400/20"
              >
                View OTT Site
              </Link>
              {primaryAction ? (
                <Link
                  href={primaryAction.href ?? "#add"}
                  className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black transition hover:bg-emerald-300"
                >
                  {primaryAction.label}
                </Link>
              ) : null}
            </div>
          </div>
        </header>

        <div className="space-y-8 px-5 py-6 sm:px-8">{children}</div>
      </section>
    </main>
  );
}
