"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type IconName =
  | "dashboard"
  | "movies"
  | "series"
  | "live"
  | "tag"
  | "image"
  | "users"
  | "crown"
  | "card"
  | "gift"
  | "referral"
  | "analytics"
  | "trophy"
  | "bell"
  | "ad"
  | "settings"
  | "reports"
  | "logout";

type MenuItem = {
  label: string;
  icon: IconName;
  href: string;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

type AdminSidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const menuGroups: MenuGroup[] = [
  {
    title: "Main",
    items: [{ label: "Dashboard", icon: "dashboard", href: "/admin" }],
  },
  {
    title: "Content",
    items: [
      { label: "Movies", icon: "movies", href: "/admin/movies" },
      { label: "Shows", icon: "series", href: "/admin/shows" },
      { label: "Categories", icon: "tag", href: "/admin/categories" },
      { label: "Banners", icon: "image", href: "/admin/banners" },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Users", icon: "users", href: "/admin/users" },
      { label: "Subscriptions", icon: "crown", href: "/admin/subscriptions" },
      { label: "Transactions", icon: "card", href: "/admin/transactions" },
      { label: "Coupons", icon: "gift", href: "/admin/coupons" },
      { label: "Referral Earnings", icon: "referral", href: "/admin/referral-earnings" },
      { label: "Movie Analytics", icon: "analytics", href: "/admin/movie-analytics" },
      { label: "Competitions", icon: "trophy", href: "/admin/competitions" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { label: "Notifications", icon: "bell", href: "/admin/notifications" },
      { label: "Advertisements", icon: "ad", href: "/admin/advertisements" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", icon: "settings", href: "/admin/settings" },
      { label: "Reports", icon: "reports", href: "/admin/reports" },
      { label: "Logout", icon: "logout", href: "/login" },
    ],
  },
];

function AdminIcon({ name }: { name: IconName }) {
  const shared = {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "dashboard":
      return (
        <svg {...shared}>
          <path d="M12 3v9h9" />
          <path d="M21 12a9 9 0 1 1-9-9" />
        </svg>
      );
    case "movies":
      return (
        <svg {...shared}>
          <rect height="14" rx="2" width="18" x="3" y="5" />
          <path d="M7 5v14M17 5v14M3 10h4M17 10h4M3 14h4M17 14h4" />
        </svg>
      );
    case "series":
      return (
        <svg {...shared}>
          <rect height="11" rx="1.5" width="18" x="3" y="4" />
          <path d="M8 20h8M12 15v5" />
        </svg>
      );
    case "live":
      return (
        <svg {...shared}>
          <path d="M8 7a6 6 0 0 0 0 10M5 4a10 10 0 0 0 0 16M16 7a6 6 0 0 1 0 10M19 4a10 10 0 0 1 0 16" />
          <path d="M12 10v4" />
        </svg>
      );
    case "tag":
      return (
        <svg {...shared}>
          <path d="m20 13-7 7-9-9V4h7l9 9Z" />
          <path d="M7.5 7.5h.01" />
        </svg>
      );
    case "image":
      return (
        <svg {...shared}>
          <rect height="14" rx="2" width="18" x="3" y="5" />
          <path d="m3 16 5-5 4 4 2-2 7 7" />
          <path d="M14 9h.01" />
        </svg>
      );
    case "users":
      return (
        <svg {...shared}>
          <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
          <circle cx="12" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M2 21v-2a4 4 0 0 1 3-3.87M8 3.13a4 4 0 0 0 0 7.75" />
        </svg>
      );
    case "crown":
      return (
        <svg {...shared}>
          <path d="m3 8 4 3 5-7 5 7 4-3-2 11H5L3 8Z" />
        </svg>
      );
    case "card":
      return (
        <svg {...shared}>
          <rect height="14" rx="2" width="18" x="3" y="5" />
          <path d="M3 10h18M7 15h2" />
        </svg>
      );
    case "gift":
      return (
        <svg {...shared}>
          <rect height="12" width="18" x="3" y="9" />
          <path d="M12 9v12M3 13h18M7.5 9A2.5 2.5 0 1 1 12 7v2M16.5 9A2.5 2.5 0 1 0 12 7v2" />
        </svg>
      );
    case "referral":
      return (
        <svg {...shared}>
          <circle cx="8" cy="8" r="4" />
          <path d="M2 21a6 6 0 0 1 12 0" />
          <path d="M16 11h5l-2-2M21 11l-2 2" />
        </svg>
      );
    case "analytics":
      return (
        <svg {...shared}>
          <path d="M4 19V5M4 19h17" />
          <path d="m7 15 4-4 3 3 5-7" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...shared}>
          <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
          <path d="M5 6H3a4 4 0 0 0 4 4M19 6h2a4 4 0 0 1-4 4" />
        </svg>
      );
    case "bell":
      return (
        <svg {...shared}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case "ad":
      return (
        <svg {...shared}>
          <rect height="14" rx="2" width="18" x="3" y="5" />
          <path d="M8 15V9l4 6V9M16 15V9" />
        </svg>
      );
    case "settings":
      return (
        <svg {...shared}>
          <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.05V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.05-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06A2 2 0 1 1 7.03 3.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.05V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.15.37.35.7.6 1 .31.25.68.39 1.05.4H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
        </svg>
      );
    case "reports":
      return (
        <svg {...shared}>
          <path d="M4 3v18M8 7h11M8 12h8M8 17h11" />
        </svg>
      );
    case "logout":
      return (
        <svg {...shared}>
          <path d="M10 17l5-5-5-5M15 12H3" />
          <path d="M21 3v18h-7" />
        </svg>
      );
  }
}

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 h-full w-80 overflow-y-auto border-r border-white/8 bg-[#101010] shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/8 bg-[#101010]/95 px-7 py-5 backdrop-blur">
        <div>
        <Link href="/admin" className="block text-lg font-black uppercase tracking-[0.22em] text-emerald-300">
          MALAFLIX Admin
        </Link>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Demo control panel</p>
        </div>
        <button
          aria-label="Close admin menu"
          className="rounded border border-white/10 px-2 py-1 text-sm font-bold text-slate-300 hover:bg-white/10 lg:hidden"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <nav className="space-y-6 px-0 py-7">
        {menuGroups.map((group) => (
          <section key={group.title}>
            <h2 className="px-7 text-xs font-black uppercase tracking-[0.22em] text-slate-400">{group.title}</h2>
            <div className="mt-3 space-y-1">
              {group.items.map((item) => {
                const isActive = item.href === "/admin" ? pathname === "/admin" : pathname === item.href;

                return (
                  <Link
                    key={`${group.title}-${item.label}`}
                    href={item.href}
                    onClick={onClose}
                    className={`group relative flex min-h-14 items-center gap-5 px-7 text-base transition ${
                      isActive
                        ? "bg-red-950/45 font-semibold text-white"
                        : "text-slate-400 hover:bg-red-950/22 hover:text-white"
                    }`}
                  >
                    {isActive ? <span className="absolute left-0 top-0 h-full w-1 bg-red-600" /> : null}
                    <span className={isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-200"}>
                      <AdminIcon name={item.icon} />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
}
