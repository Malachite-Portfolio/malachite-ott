import Link from "next/link";
import { genreRows, movies } from "@/data/movies";
import { AdminShell } from "@/components/admin/AdminShell";

const statCards = [
  { label: "Total Movies", value: movies.length.toString(), detail: "TMDB posters connected" },
  { label: "Genres", value: genreRows.length.toString(), detail: "Active content rows" },
  { label: "Active Users", value: "12.8K", detail: "+18% this month" },
  { label: "Revenue", value: "$42.6K", detail: "Demo subscription sales" },
];

const quickRows = [
  { label: "Published movies", value: movies.length },
  { label: "Trending titles", value: movies.filter((movie) => movie.isTrending).length },
  { label: "Popular titles", value: movies.filter((movie) => movie.isPopular).length },
  { label: "New releases", value: movies.filter((movie) => movie.isNew).length },
];

const moduleCards = [
  { id: "movies", href: "/admin/movies", group: "Content", title: "Movies", value: movies.length.toString(), note: "Catalog, trailers, publishing, and featured placement" },
  { id: "shows", href: "/admin/shows", group: "Content", title: "Shows", value: "28", note: "Season and episode manager" },
  { id: "categories", href: "/admin/categories", group: "Content", title: "Categories", value: genreRows.length.toString(), note: "Genre taxonomy and sort order" },
  { id: "banners", href: "/admin/banners", group: "Content", title: "Banners", value: "9", note: "Homepage hero placements" },
  { id: "users", href: "/admin/users", group: "Management", title: "Users", value: "12.8K", note: "Subscriber status and watch history" },
  { id: "subscriptions", href: "/admin/subscriptions", group: "Management", title: "Subscriptions", value: "1,426", note: "Plans, prices, devices, and revenue" },
  { id: "transactions", href: "/admin/transactions", group: "Management", title: "Transactions", value: "342", note: "Payments, refunds, and exports" },
  { id: "coupons", href: "/admin/coupons", group: "Management", title: "Coupons", value: "14", note: "Trial and discount codes" },
  { id: "referral-earnings", href: "/admin/referral-earnings", group: "Management", title: "Referral Earnings", value: "$8.2K", note: "Partner referral ledger" },
  { id: "movie-analytics", href: "/admin/movie-analytics", group: "Management", title: "Movie Analytics", value: "89", note: "Views, completion, and genre performance" },
  { id: "competitions", href: "/admin/competitions", group: "Management", title: "Competitions", value: "5", note: "Campaign and contest tools" },
  { id: "notifications", href: "/admin/notifications", group: "Marketing", title: "Notifications", value: "31", note: "Push and email campaigns" },
  { id: "advertisements", href: "/admin/advertisements", group: "Marketing", title: "Advertisements", value: "12", note: "Ad slot inventory" },
  { id: "settings", href: "/admin/settings", group: "System", title: "Settings", value: "Ready", note: "Platform configuration" },
  { id: "reports", href: "/admin/reports", group: "System", title: "Reports", value: "18", note: "Exportable admin reports" },
];

export function AdminPanel() {
  const featuredMovies = movies.slice(0, 6);

  return (
    <AdminShell title="Dashboard" primaryAction={{ label: "Add Movie", href: "/admin/movies#add" }}>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((stat) => (
              <article key={stat.label} className="rounded-lg border border-white/8 bg-white/[0.04] p-5 shadow-2xl">
                <p className="text-sm font-semibold text-slate-400">{stat.label}</p>
                <p className="mt-3 text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/80">{stat.detail}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <article id="movies" className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Content</p>
                  <h2 className="mt-1 text-2xl font-black text-white">Movies</h2>
                </div>
                <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                  Active
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {featuredMovies.map((movie) => (
                  <div key={movie.id} className="flex gap-3 rounded-md border border-white/8 bg-black/35 p-3">
                    <img
                      alt={`${movie.title} poster`}
                      className="h-20 w-14 rounded object-cover"
                      src={movie.posterUrl}
                    />
                    <div className="min-w-0">
                      <h3 className="line-clamp-1 text-sm font-bold text-white">{movie.title}</h3>
                      <p className="mt-1 text-xs text-slate-400">{movie.genre}</p>
                      <p className="mt-2 text-xs font-semibold text-emerald-300">
                        {movie.year} | {movie.rating} | {movie.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article id="movie-analytics" className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Management</p>
              <h2 className="mt-1 text-2xl font-black text-white">Movie Analytics</h2>
              <div className="mt-5 space-y-4">
                {quickRows.map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">{row.label}</span>
                      <span className="font-bold text-white">{row.value}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{ width: `${Math.min(100, Math.max(12, (row.value / movies.length) * 100))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="grid gap-5 xl:grid-cols-3">
            {["Users", "Subscriptions", "Transactions"].map((title, index) => (
              <article
                id={title.toLowerCase()}
                key={title}
                className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl"
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Management</p>
                <h2 className="mt-1 text-xl font-black text-white">{title}</h2>
                <p className="mt-4 text-3xl font-black text-emerald-300">{["8,240", "1,426", "342"][index]}</p>
                <p className="mt-2 text-sm text-slate-400">Demo admin module placeholder with matching menu anchor.</p>
              </article>
            ))}
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {moduleCards.map((module) => (
              <Link
                href={module.href}
                id={module.id}
                key={module.id}
                className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl transition hover:border-emerald-300/30 hover:bg-white/[0.06]"
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">{module.group}</p>
                <h2 className="mt-2 text-lg font-black text-white">{module.title}</h2>
                <p className="mt-4 text-2xl font-black text-emerald-300">{module.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{module.note}</p>
              </Link>
            ))}
          </section>
    </AdminShell>
  );
}
