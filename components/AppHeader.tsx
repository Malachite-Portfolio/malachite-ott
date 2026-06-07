"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { storageKeys } from "@/lib/storage";

type AppHeaderProps = {
  profile?: string | null;
};

export function AppHeader({ profile }: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  function signOut() {
    window.localStorage.removeItem(storageKeys.login);
    window.localStorage.removeItem(storageKeys.profile);
    router.push("/login");
  }

  const navItems = [
    { label: "Home", href: "/home" },
    { label: "Shows", href: "/home#shows" },
    { label: "Movies", href: "/movies" },
    { label: "Games", href: "/home#games" },
    { label: "New & Popular", href: "/home#new" },
    { label: "My List", href: "/home#my-list" },
    { label: "Browse by Languages", href: "/movies#languages" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-black/92 via-black/68 to-transparent backdrop-blur-sm">
      <nav className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8 lg:flex-nowrap lg:gap-5 lg:px-12">
        <div className="flex min-w-0 items-center gap-6">
          <Link href="/home" className="shrink-0 text-lg font-black uppercase tracking-[0.24em] text-emerald-300">
            Malachite Play
          </Link>
          <div className="no-scrollbar hidden items-center gap-4 overflow-x-auto text-sm font-medium text-emerald-50/68 lg:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/home" ? pathname === "/home" : item.href === "/movies" && pathname === "/movies";

              return (
                <Link
                  key={item.label}
                  className={`whitespace-nowrap transition hover:text-white ${
                    isActive ? "font-bold text-white" : "text-emerald-50/68"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-sm font-semibold text-emerald-50">
          <button aria-label="Search" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/10">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m16.5 16.5 4 4" />
            </svg>
          </button>
          <span className="hidden text-emerald-50/82 md:inline">Children</span>
          <button
            aria-label="Notifications"
            className="relative grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/10"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-black" />
          </button>
          <button
            onClick={signOut}
            aria-label="Open profile menu"
            className="flex items-center gap-2 rounded-md px-1 py-1 transition hover:bg-white/10"
          >
            <span className="grid h-8 w-8 place-items-center rounded bg-gradient-to-br from-emerald-300 to-emerald-800 text-sm font-black text-black">
              {(profile ?? "M").slice(0, 1)}
            </span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
        <div className="no-scrollbar flex w-full gap-4 overflow-x-auto text-xs font-semibold text-emerald-50/72 lg:hidden">
          {navItems.slice(0, 5).map((item) => (
            <Link key={item.label} href={item.href} className="whitespace-nowrap">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
