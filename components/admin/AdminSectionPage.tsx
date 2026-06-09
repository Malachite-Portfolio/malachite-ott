"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  adCampaigns,
  adminBanners,
  adminCategories,
  adminCompetitions,
  adminCoupons,
  adminMovies,
  adminParticipants,
  adminPlans,
  adminReferrals,
  adminShows,
  adminTransactions,
  adminUsers,
  genrePerformance,
  reportRows,
  sentNotifications,
  topMovies,
  watchHistory,
  type AdminSection,
} from "@/components/admin/adminData";
import { AdminShell } from "@/components/admin/AdminShell";

type Toast = {
  message: string;
  tone?: "success" | "warning";
};

type ConfirmState = {
  title: string;
  body: string;
  action: string;
} | null;

type ModalKind =
  | "movie"
  | "show"
  | "category"
  | "banner"
  | "plan"
  | "coupon"
  | "competition"
  | "advertisement"
  | "user"
  | null;

const statusOptions = ["All", "Published", "Draft", "Unpublished", "Active", "Inactive", "Pending", "Success", "Failed", "Refunded", "Paid"];

function StatusPill({ status }: { status: string }) {
  const isPositive = ["Published", "Active", "Success", "Paid", "Sent", "Ready", "Visible"].includes(status);
  const isWarning = ["Pending", "Draft", "Scheduled", "Review"].includes(status);

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] ${
        isPositive
          ? "bg-emerald-400/12 text-emerald-300"
          : isWarning
            ? "bg-yellow-400/12 text-yellow-300"
            : "bg-red-500/12 text-red-300"
      }`}
    >
      {status}
    </span>
  );
}

function StatCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <article className="rounded-lg border border-white/8 bg-white/[0.04] p-5 shadow-2xl">
      <p className="text-sm font-semibold text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
      {detail ? <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/80">{detail}</p> : null}
    </article>
  );
}

function Toolbar({
  search,
  setSearch,
  filter,
  setFilter,
  filterLabel = "Status",
  action,
}: {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  filterLabel?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-white/8 bg-[#101010] p-4 shadow-2xl xl:flex-row xl:items-center xl:justify-between">
      <div className="grid flex-1 gap-3 md:grid-cols-[1fr_220px]">
        <input
          className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300/55"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search..."
          value={search}
        />
        <select
          className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-300/55"
          onChange={(event) => setFilter(event.target.value)}
          value={filter}
        >
          {statusOptions.map((option) => (
            <option key={`${filterLabel}-${option}`}>{option}</option>
          ))}
        </select>
      </div>
      {action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
    </div>
  );
}

function ActionButton({ children, onClick, tone = "default" }: { children: ReactNode; onClick?: () => void; tone?: "default" | "danger" }) {
  return (
    <button
      className={`rounded border px-2.5 py-1.5 text-xs font-bold transition ${
        tone === "danger"
          ? "border-red-400/25 bg-red-500/10 text-red-200 hover:bg-red-500/18"
          : "border-emerald-300/20 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/18"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Toggle({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      aria-label={active ? "Deactivate" : "Activate"}
      className={`h-6 w-11 rounded-full p-1 transition ${active ? "bg-emerald-400" : "bg-slate-700"}`}
      onClick={onClick}
    >
      <span className={`block h-4 w-4 rounded-full bg-black transition ${active ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="block text-sm font-semibold text-slate-300">
      {label}
      <input
        className="mt-2 w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300/55"
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur">
      <div className="w-full max-w-3xl rounded-lg border border-emerald-300/16 bg-[#101010] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <h2 className="text-xl font-black text-white">{title}</h2>
          <button className="rounded border border-white/10 px-3 py-1 text-sm text-slate-300 hover:bg-white/10" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function ConfirmModal({ confirm, onClose, onConfirm }: { confirm: ConfirmState; onClose: () => void; onConfirm: () => void }) {
  if (!confirm) {
    return null;
  }

  return (
    <Modal title={confirm.title} onClose={onClose}>
      <p className="text-sm leading-6 text-slate-300">{confirm.body}</p>
      <div className="mt-5 flex justify-end gap-3">
        <button className="rounded-md border border-white/10 px-4 py-2 text-sm font-bold text-slate-300 hover:bg-white/8" onClick={onClose}>
          Cancel
        </button>
        <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-black text-white hover:bg-red-500" onClick={onConfirm}>
          {confirm.action}
        </button>
      </div>
    </Modal>
  );
}

function ToastMessage({ toast }: { toast: Toast | null }) {
  if (!toast) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-lg border border-emerald-300/20 bg-[#101010] px-4 py-3 text-sm font-bold text-emerald-100 shadow-2xl">
      {toast.message}
    </div>
  );
}

function FormGrid({ fields }: { fields: Array<{ label: string; placeholder: string; type?: string }> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {fields.map((field) => (
        <Field key={field.label} {...field} />
      ))}
      <label className="block text-sm font-semibold text-slate-300 md:col-span-2">
        Description / Message
        <textarea
          className="mt-2 min-h-28 w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300/55"
          placeholder="Enter description"
        />
      </label>
    </div>
  );
}

function ModalForm({ kind, onSaved }: { kind: Exclude<ModalKind, null>; onSaved: () => void }) {
  const fieldsByKind: Record<Exclude<ModalKind, null>, Array<{ label: string; placeholder: string; type?: string }>> = {
    movie: [
      { label: "Title", placeholder: "Movie title" },
      { label: "Category", placeholder: "Action" },
      { label: "Year", placeholder: "2026" },
      { label: "Duration", placeholder: "2h 10m" },
      { label: "Rating", placeholder: "PG-13" },
      { label: "Thumbnail URL", placeholder: "https://image.tmdb.org/..." },
      { label: "Trailer URL", placeholder: "YouTube embed URL" },
      { label: "Status", placeholder: "Published" },
    ],
    show: [
      { label: "Title", placeholder: "Show title" },
      { label: "Seasons", placeholder: "3" },
      { label: "Episodes", placeholder: "28" },
      { label: "Category", placeholder: "Drama" },
      { label: "Backdrop URL", placeholder: "https://image.tmdb.org/..." },
      { label: "Status", placeholder: "Published" },
    ],
    category: [
      { label: "Category Name", placeholder: "Action" },
      { label: "Sort Order", placeholder: "1" },
      { label: "Movie Count", placeholder: "12" },
      { label: "Status", placeholder: "Visible" },
    ],
    banner: [
      { label: "Title", placeholder: "Hero title" },
      { label: "Subtitle", placeholder: "Banner subtitle" },
      { label: "Image URL", placeholder: "https://image.tmdb.org/..." },
      { label: "Linked Movie/Show", placeholder: "Dune" },
      { label: "CTA Text", placeholder: "Watch Trailer" },
      { label: "Status", placeholder: "Active" },
    ],
    plan: [
      { label: "Plan Name", placeholder: "Premium" },
      { label: "Price", placeholder: "$14.99" },
      { label: "Devices", placeholder: "4" },
      { label: "Quality", placeholder: "4K HDR" },
    ],
    coupon: [
      { label: "Code", placeholder: "MALA30" },
      { label: "Discount Type", placeholder: "Percent" },
      { label: "Value", placeholder: "30%" },
      { label: "Usage Limit", placeholder: "500" },
      { label: "Expiry", placeholder: "2026-07-01", type: "date" },
      { label: "Status", placeholder: "Active" },
    ],
    competition: [
      { label: "Title", placeholder: "Weekend Watch Quest" },
      { label: "Prize", placeholder: "$500" },
      { label: "Start Date", placeholder: "2026-06-01", type: "date" },
      { label: "End Date", placeholder: "2026-06-14", type: "date" },
      { label: "Status", placeholder: "Active" },
      { label: "Participants", placeholder: "1840" },
    ],
    advertisement: [
      { label: "Campaign Name", placeholder: "Premium Summer" },
      { label: "Placement", placeholder: "Home Hero" },
      { label: "Image/Video URL", placeholder: "https://..." },
      { label: "Start Date", placeholder: "2026-06-01", type: "date" },
      { label: "End Date", placeholder: "2026-06-30", type: "date" },
      { label: "Status", placeholder: "Active" },
    ],
    user: [
      { label: "Name", placeholder: "Ava Stone" },
      { label: "Email", placeholder: "ava@example.com" },
      { label: "Plan", placeholder: "Premium" },
      { label: "Status", placeholder: "Active" },
    ],
  };

  return (
    <>
      <FormGrid fields={fieldsByKind[kind]} />
      <div className="mt-5 flex justify-end">
        <button className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black hover:bg-emerald-300" onClick={onSaved}>
          Save
        </button>
      </div>
    </>
  );
}

function MoviesPage({ openModal, askConfirm, notify }: PageTools) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const rows = adminMovies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || movie.status === filter || movie.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Movies" value={adminMovies.length.toString()} detail="Local catalog" />
        <StatCard label="Published" value={adminMovies.filter((movie) => movie.status === "Published").length.toString()} />
        <StatCard label="Revenue" value={`$${adminMovies.reduce((sum, movie) => sum + movie.revenue, 0).toLocaleString()}`} />
        <StatCard label="Featured" value={adminMovies.filter((movie) => movie.featured).length.toString()} />
      </section>
      <Toolbar
        action={
          <>
            <ActionButton onClick={() => notify("Bulk publish complete")}>Publish</ActionButton>
            <ActionButton onClick={() => notify("Bulk unpublish complete")}>Unpublish</ActionButton>
            <ActionButton tone="danger" onClick={() => askConfirm("Delete selected movies?", "This demo action will remove selected movies from the table view.", "Delete")}>
              Delete
            </ActionButton>
            <button className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black hover:bg-emerald-300" onClick={() => openModal("movie")}>
              Add Movie
            </button>
          </>
        }
        filter={filter}
        filterLabel="Movie status"
        search={search}
        setFilter={setFilter}
        setSearch={setSearch}
      />
      <article className="overflow-hidden rounded-lg border border-white/8 bg-[#101010] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.14em] text-slate-400">
              <tr>
                {["Movie", "Category", "Year", "Rating", "Status", "Views", "Revenue", "Featured", "Actions"].map((heading) => (
                  <th key={heading} className="px-4 py-3">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((movie) => (
                <tr key={movie.id} className="border-t border-white/8 transition hover:bg-white/[0.04]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img alt={movie.title} className="h-16 w-11 rounded object-cover" src={movie.posterUrl} />
                      <div>
                        <p className="font-bold text-white">{movie.title}</p>
                        <p className="text-xs text-slate-500">{movie.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{movie.category}</td>
                  <td className="px-4 py-3 text-slate-300">{movie.year}</td>
                  <td className="px-4 py-3 text-slate-300">{movie.rating}</td>
                  <td className="px-4 py-3"><StatusPill status={movie.status} /></td>
                  <td className="px-4 py-3 text-slate-300">{movie.views.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-300">${movie.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3"><Toggle active={movie.featured} onClick={() => notify(`${movie.title} featured state updated`)} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <ActionButton onClick={() => notify(`Viewing ${movie.title}`)}>View</ActionButton>
                      <ActionButton onClick={() => openModal("movie")}>Edit</ActionButton>
                      <ActionButton tone="danger" onClick={() => askConfirm("Delete movie?", `Delete ${movie.title} from this demo list?`, "Delete")}>Delete</ActionButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

type PageTools = {
  openModal: (kind: Exclude<ModalKind, null>) => void;
  askConfirm: (title: string, body: string, action: string) => void;
  notify: (message: string) => void;
};

function ShowsPage({ openModal, notify }: PageTools) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const rows = adminShows.filter((show) => (show.title.toLowerCase().includes(search.toLowerCase()) || show.category.toLowerCase().includes(search.toLowerCase())) && (filter === "All" || show.status === filter));

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Shows" value={adminShows.length.toString()} />
        <StatCard label="Episodes" value={adminShows.reduce((sum, show) => sum + show.episodes, 0).toString()} />
        <StatCard label="Views" value={adminShows.reduce((sum, show) => sum + show.views, 0).toLocaleString()} />
        <StatCard label="Published" value={adminShows.filter((show) => show.status === "Published").length.toString()} />
      </section>
      <Toolbar
        action={<button className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black hover:bg-emerald-300" onClick={() => openModal("show")}>Add Show</button>}
        filter={filter}
        filterLabel="Show status"
        search={search}
        setFilter={setFilter}
        setSearch={setSearch}
      />
      <article className="overflow-hidden rounded-lg border border-white/8 bg-[#101010] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.14em] text-slate-400">
              <tr>{["Title", "Seasons", "Episodes", "Category", "Status", "Views", "Actions"].map((heading) => <th key={heading} className="px-4 py-3">{heading}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((show) => (
                <tr key={show.title} className="border-t border-white/8 transition hover:bg-white/[0.04]">
                  <td className="px-4 py-3 font-bold text-white">{show.title}</td>
                  <td className="px-4 py-3 text-slate-300">{show.seasons}</td>
                  <td className="px-4 py-3 text-slate-300">{show.episodes}</td>
                  <td className="px-4 py-3 text-slate-300">{show.category}</td>
                  <td className="px-4 py-3"><StatusPill status={show.status} /></td>
                  <td className="px-4 py-3 text-slate-300">{show.views.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ActionButton onClick={() => notify(`Episode manager opened for ${show.title}`)}>Manage Episodes</ActionButton>
                      <Toggle active={show.status === "Published"} onClick={() => notify(`${show.title} status changed`)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

function CategoriesPage({ openModal, askConfirm, notify }: PageTools) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Categories" value={adminCategories.length.toString()} />
        <StatCard label="Featured" value={adminCategories.filter((category) => category.featured).length.toString()} />
        <StatCard label="Visible" value={adminCategories.filter((category) => category.status === "Visible").length.toString()} />
        <StatCard label="Movies Indexed" value={adminCategories.reduce((sum, category) => sum + category.count, 0).toString()} />
      </section>
      <div className="flex justify-end">
        <button className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black hover:bg-emerald-300" onClick={() => openModal("category")}>Add Category</button>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminCategories.map((category) => (
          <article key={category.name} className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">{category.name}</h2>
                <p className="mt-1 text-sm text-slate-400">{category.count} movies | Sort {category.sortOrder}</p>
              </div>
              <Toggle active={category.featured} onClick={() => notify(`${category.name} featured toggle updated`)} />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <StatusPill status={category.status} />
              <div className="flex gap-2">
                <ActionButton onClick={() => openModal("category")}>Edit</ActionButton>
                <ActionButton tone="danger" onClick={() => askConfirm("Delete category?", `Delete ${category.name}?`, "Delete")}>Delete</ActionButton>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function BannersPage({ openModal, notify }: PageTools) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Hero Banners" value={adminBanners.length.toString()} />
        <StatCard label="Active" value={adminBanners.filter((banner) => banner.status === "Active").length.toString()} />
        <StatCard label="Linked Titles" value={new Set(adminBanners.map((banner) => banner.linkedTitle)).size.toString()} />
      </section>
      <div className="flex justify-end">
        <button className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black hover:bg-emerald-300" onClick={() => openModal("banner")}>Add Banner</button>
      </div>
      <section className="grid gap-4 xl:grid-cols-2">
        {adminBanners.map((banner) => (
          <article key={banner.title} className="overflow-hidden rounded-lg border border-white/8 bg-[#101010] shadow-2xl">
            <img alt={banner.title} className="h-44 w-full object-cover" src={banner.imageUrl} />
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Order {banner.order}</p>
                  <h2 className="mt-1 text-xl font-black text-white">{banner.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">{banner.subtitle}</p>
                </div>
                <Toggle active={banner.status === "Active"} onClick={() => notify(`${banner.title} banner status changed`)} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <StatusPill status={banner.status} />
                <ActionButton onClick={() => openModal("banner")}>Edit</ActionButton>
                <ActionButton onClick={() => notify(`${banner.title} moved in sort order`)}>Drag Sort</ActionButton>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function UsersPage({ openModal, askConfirm }: PageTools) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const rows = adminUsers.filter((user) => (user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())) && (filter === "All" || user.status === filter));

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Users" value={adminUsers.length.toString()} />
        <StatCard label="Active" value={adminUsers.filter((user) => user.status === "Active").length.toString()} />
        <StatCard label="Subscribed" value={adminUsers.filter((user) => user.status === "Subscribed").length.toString()} />
        <StatCard label="Watch Time" value="441h" />
      </section>
      <Toolbar filter={filter} filterLabel="User status" search={search} setFilter={setFilter} setSearch={setSearch} />
      <article className="overflow-hidden rounded-lg border border-white/8 bg-[#101010] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.14em] text-slate-400">
              <tr>{["Name", "Email", "Plan", "Status", "Watch Time", "Joined", "Actions"].map((heading) => <th key={heading} className="px-4 py-3">{heading}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((user) => (
                <tr key={user.email} className="border-t border-white/8 transition hover:bg-white/[0.04]">
                  <td className="px-4 py-3 font-bold text-white">{user.name}</td>
                  <td className="px-4 py-3 text-slate-300">{user.email}</td>
                  <td className="px-4 py-3 text-slate-300">{user.plan}</td>
                  <td className="px-4 py-3"><StatusPill status={user.status} /></td>
                  <td className="px-4 py-3 text-slate-300">{user.watchTime}</td>
                  <td className="px-4 py-3 text-slate-300">{user.joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <ActionButton onClick={() => openModal("user")}>View Details</ActionButton>
                      <ActionButton tone={user.status === "Inactive" ? "default" : "danger"} onClick={() => askConfirm("Change user status?", `${user.status === "Inactive" ? "Activate" : "Suspend"} ${user.name}?`, user.status === "Inactive" ? "Activate" : "Suspend")}>
                        {user.status === "Inactive" ? "Activate" : "Suspend"}
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

function SubscriptionsPage({ openModal, notify }: PageTools) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active Users" value="1,426" />
        <StatCard label="Monthly Revenue" value="$14,540" />
        <StatCard label="Plans" value={adminPlans.length.toString()} />
      </section>
      <div className="flex justify-end">
        <button className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black hover:bg-emerald-300" onClick={() => openModal("plan")}>Add Plan</button>
      </div>
      <section className="grid gap-4 xl:grid-cols-3">
        {adminPlans.map((plan) => (
          <article key={plan.name} className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">{plan.name}</h2>
                <p className="mt-2 text-3xl font-black text-emerald-300">{plan.price}</p>
              </div>
              <Toggle active={plan.status === "Active"} onClick={() => notify(`${plan.name} plan status changed`)} />
            </div>
            <div className="mt-5 space-y-2 text-sm text-slate-300">
              <p>{plan.devices} device(s)</p>
              <p>{plan.quality}</p>
              <p>{plan.activeUsers} active users</p>
              <p>{plan.revenue} monthly revenue</p>
            </div>
            <ActionButton onClick={() => openModal("plan")}>Edit Plan</ActionButton>
          </article>
        ))}
      </section>
    </>
  );
}

function TransactionsPage({ askConfirm, notify }: PageTools) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const rows = adminTransactions.filter((txn) => (txn.id.toLowerCase().includes(search.toLowerCase()) || txn.user.toLowerCase().includes(search.toLowerCase())) && (filter === "All" || txn.status === filter));

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Transactions" value={adminTransactions.length.toString()} />
        <StatCard label="Success" value={adminTransactions.filter((txn) => txn.status === "Success").length.toString()} />
        <StatCard label="Pending" value={adminTransactions.filter((txn) => txn.status === "Pending").length.toString()} />
        <StatCard label="Refunded" value={adminTransactions.filter((txn) => txn.status === "Refunded").length.toString()} />
      </section>
      <Toolbar action={<ActionButton onClick={() => notify("CSV export prepared")}>Export CSV</ActionButton>} filter={filter} search={search} setFilter={setFilter} setSearch={setSearch} />
      <article className="overflow-hidden rounded-lg border border-white/8 bg-[#101010] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.14em] text-slate-400">
              <tr>{["ID", "User", "Plan", "Amount", "Method", "Status", "Date", "Action"].map((heading) => <th key={heading} className="px-4 py-3">{heading}</th>)}</tr>
            </thead>
            <tbody>{rows.map((txn) => <tr key={txn.id} className="border-t border-white/8 hover:bg-white/[0.04]"><td className="px-4 py-3 font-bold text-white">{txn.id}</td><td className="px-4 py-3 text-slate-300">{txn.user}</td><td className="px-4 py-3 text-slate-300">{txn.plan}</td><td className="px-4 py-3 text-slate-300">{txn.amount}</td><td className="px-4 py-3 text-slate-300">{txn.method}</td><td className="px-4 py-3"><StatusPill status={txn.status} /></td><td className="px-4 py-3 text-slate-300">{txn.date}</td><td className="px-4 py-3"><ActionButton tone="danger" onClick={() => askConfirm("Refund transaction?", `Refund ${txn.id}?`, "Refund")}>Refund</ActionButton></td></tr>)}</tbody>
          </table>
        </div>
      </article>
    </>
  );
}

function CouponsPage({ openModal, notify }: PageTools) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3"><StatCard label="Coupons" value={adminCoupons.length.toString()} /><StatCard label="Used" value={adminCoupons.reduce((sum, coupon) => sum + coupon.used, 0).toString()} /><StatCard label="Active" value={adminCoupons.filter((coupon) => coupon.status === "Active").length.toString()} /></section>
      <div className="flex justify-end"><button className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black hover:bg-emerald-300" onClick={() => openModal("coupon")}>Add Coupon</button></div>
      <section className="grid gap-4 xl:grid-cols-3">{adminCoupons.map((coupon) => <article key={coupon.code} className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl"><div className="flex items-start justify-between"><div><h2 className="text-2xl font-black text-white">{coupon.code}</h2><p className="mt-1 text-sm text-slate-400">{coupon.type} | {coupon.value}</p></div><Toggle active={coupon.status === "Active"} onClick={() => notify(`${coupon.code} status changed`)} /></div><p className="mt-4 text-sm text-slate-300">Used {coupon.used} / {coupon.limit}</p><p className="mt-1 text-sm text-slate-400">Expires {coupon.expiry}</p><div className="mt-4 flex gap-2"><ActionButton onClick={() => openModal("coupon")}>Edit</ActionButton><ActionButton onClick={() => notify(`${coupon.code} copied`)}>Copy Code</ActionButton></div></article>)}</section>
    </>
  );
}

function ReferralPage({ notify }: PageTools) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3"><StatCard label="Total Rewards" value="$8.2K" /><StatCard label="Pending" value="$1.4K" /><StatCard label="Paid" value="$6.8K" /></section>
      <article className="overflow-hidden rounded-lg border border-white/8 bg-[#101010] shadow-2xl"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-white/[0.04] text-xs uppercase tracking-[0.14em] text-slate-400"><tr>{["Referrer","Referred User","Reward","Status","Date","Action"].map((h)=><th key={h} className="px-4 py-3">{h}</th>)}</tr></thead><tbody>{adminReferrals.map((row)=><tr key={`${row.referrer}-${row.referred}`} className="border-t border-white/8 hover:bg-white/[0.04]"><td className="px-4 py-3 font-bold text-white">{row.referrer}</td><td className="px-4 py-3 text-slate-300">{row.referred}</td><td className="px-4 py-3 text-slate-300">{row.amount}</td><td className="px-4 py-3"><StatusPill status={row.status} /></td><td className="px-4 py-3 text-slate-300">{row.date}</td><td className="px-4 py-3"><ActionButton onClick={() => notify(`${row.referrer} marked ${row.status === "Paid" ? "unpaid" : "paid"}`)}>Mark {row.status === "Paid" ? "Unpaid" : "Paid"}</ActionButton></td></tr>)}</tbody></table></div></article>
    </>
  );
}

function AnalyticsPage({ notify }: PageTools) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><StatCard label="Total Views" value="1.8M" /><StatCard label="Watch Hours" value="284K" /><StatCard label="Top Movie" value="Dune" /><StatCard label="Trailer Plays" value="92K" /><StatCard label="Completion" value="68%" /></section>
      <section className="grid gap-5 xl:grid-cols-2"><article className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl"><h2 className="text-2xl font-black text-white">Top Movies</h2><div className="mt-5 space-y-3">{topMovies.map((movie)=><div key={movie.title} className="rounded border border-white/8 bg-black/24 p-3"><div className="flex justify-between gap-4"><span className="font-bold text-white">{movie.title}</span><button className="text-xs font-bold text-emerald-300" onClick={() => notify(`${movie.title} analytics opened`)}>Detail</button></div><div className="mt-2 h-2 rounded-full bg-white/8"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${Math.min(100, movie.views / 1000)}%` }} /></div><p className="mt-2 text-xs text-slate-400">{movie.views.toLocaleString()} views | {movie.watchHours.toLocaleString()} watch hours | {movie.completion}</p></div>)}</div></article><article className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl"><h2 className="text-2xl font-black text-white">Genre Performance</h2><div className="mt-5 space-y-3">{genrePerformance.map((genre)=><div key={genre.genre}><div className="flex justify-between text-sm"><span className="text-slate-300">{genre.genre}</span><span className="font-bold text-white">{genre.completion}%</span></div><div className="mt-2 h-2 rounded-full bg-white/8"><div className="h-full rounded-full bg-red-600" style={{ width: `${genre.completion}%` }} /></div></div>)}</div></article></section>
    </>
  );
}

function CompetitionsPage({ openModal, notify }: PageTools) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3"><StatCard label="Competitions" value={adminCompetitions.length.toString()} /><StatCard label="Participants" value={adminCompetitions.reduce((sum, item) => sum + item.participants, 0).toLocaleString()} /><StatCard label="Active" value={adminCompetitions.filter((item) => item.status === "Active").length.toString()} /></section>
      <div className="flex justify-end"><button className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black hover:bg-emerald-300" onClick={() => openModal("competition")}>Add Competition</button></div>
      <section className="grid gap-5 xl:grid-cols-[1fr_0.7fr]"><article className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl"><h2 className="text-2xl font-black text-white">Competition List</h2><div className="mt-5 space-y-3">{adminCompetitions.map((item)=><div key={item.title} className="rounded border border-white/8 bg-black/24 p-4"><div className="flex items-start justify-between gap-4"><div><h3 className="font-bold text-white">{item.title}</h3><p className="mt-1 text-sm text-slate-400">{item.start} to {item.end}</p></div><StatusPill status={item.status} /></div><p className="mt-3 text-sm text-slate-300">{item.prize} prize | {item.participants.toLocaleString()} participants</p><div className="mt-3 flex gap-2"><ActionButton onClick={() => openModal("competition")}>Edit</ActionButton><ActionButton onClick={() => notify(`Winner selected for ${item.title}`)}>Select Winner</ActionButton></div></div>)}</div></article><article className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl"><h2 className="text-2xl font-black text-white">Participants</h2><div className="mt-5 space-y-3">{adminParticipants.map((item)=><div key={item.name} className="flex items-center justify-between rounded border border-white/8 bg-black/24 p-3"><div><p className="font-bold text-white">{item.name}</p><p className="text-sm text-slate-400">{item.points} points</p></div><StatusPill status={item.status} /></div>)}</div></article></section>
    </>
  );
}

function NotificationsPage({ notify }: PageTools) {
  return (
    <>
      <article className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl"><h2 className="text-2xl font-black text-white">Notification Composer</h2><div className="mt-5 grid gap-4 md:grid-cols-2"><Field label="Title" placeholder="New release alert" /><Field label="Target Audience" placeholder="All users" /><Field label="Schedule Time" placeholder="2026-06-10 18:00" /><Field label="Message" placeholder="Your message" /></div><button className="mt-5 rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black hover:bg-emerald-300" onClick={() => notify("Demo notification sent")}>Send Demo Notification</button></article>
      <article className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl"><h2 className="text-2xl font-black text-white">Sent Notifications</h2><div className="mt-5 space-y-3">{sentNotifications.map((item)=><div key={item.title} className="grid gap-3 rounded border border-white/8 bg-black/24 p-3 md:grid-cols-[1fr_auto_auto]"><span className="font-bold text-white">{item.title}</span><span className="text-sm text-slate-400">{item.audience} | {item.time}</span><StatusPill status={item.status} /></div>)}</div></article>
    </>
  );
}

function AdsPage({ openModal, notify }: PageTools) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3"><StatCard label="Campaigns" value={adCampaigns.length.toString()} /><StatCard label="Impressions" value={adCampaigns.reduce((sum, ad) => sum + ad.impressions, 0).toLocaleString()} /><StatCard label="Clicks" value={adCampaigns.reduce((sum, ad) => sum + ad.clicks, 0).toLocaleString()} /></section>
      <div className="flex justify-end"><button className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black hover:bg-emerald-300" onClick={() => openModal("advertisement")}>Add Campaign</button></div>
      <section className="grid gap-4 xl:grid-cols-3">{adCampaigns.map((ad)=><article key={ad.name} className="overflow-hidden rounded-lg border border-white/8 bg-[#101010] shadow-2xl"><img alt={ad.name} className="h-36 w-full object-cover" src={ad.mediaUrl} /><div className="p-4"><div className="flex justify-between gap-4"><h2 className="font-black text-white">{ad.name}</h2><Toggle active={ad.status === "Active"} onClick={() => notify(`${ad.name} toggled`)} /></div><p className="mt-2 text-sm text-slate-400">{ad.placement} | {ad.start} to {ad.end}</p><p className="mt-3 text-sm text-slate-300">{ad.impressions.toLocaleString()} impressions | {ad.clicks.toLocaleString()} clicks</p><ActionButton onClick={() => openModal("advertisement")}>Edit Campaign</ActionButton></div></article>)}</section>
    </>
  );
}

function SettingsPage({ notify }: PageTools) {
  const [maintenance, setMaintenance] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem("malaflix:admin-settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { maintenance?: boolean; autoplay?: boolean };
        setMaintenance(Boolean(parsed.maintenance));
        setAutoplay(parsed.autoplay !== false);
      } catch {
        setMaintenance(false);
      }
    }
  }, []);

  function save() {
    window.localStorage.setItem("malaflix:admin-settings", JSON.stringify({ maintenance, autoplay }));
    notify("Settings saved to localStorage");
  }

  return (
    <article className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl"><h2 className="text-2xl font-black text-white">Platform Settings</h2><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3"><Field label="App Name" placeholder="MALAFLIX" /><Field label="Support Email" placeholder="support@malaflix.demo" /><Field label="Currency" placeholder="USD" /><Field label="Default Language" placeholder="English" /><Field label="Logo URL" placeholder="https://..." /><Field label="Primary Color" placeholder="#10b981" /><Field label="Accent Color" placeholder="#dc2626" /><Field label="Max Profiles" placeholder="4" /><Field label="Default Video Quality" placeholder="4K HDR" /></div><div className="mt-5 flex flex-wrap gap-5"><label className="flex items-center gap-3 text-sm font-bold text-slate-300">Maintenance Mode <Toggle active={maintenance} onClick={() => setMaintenance((value) => !value)} /></label><label className="flex items-center gap-3 text-sm font-bold text-slate-300">Autoplay <Toggle active={autoplay} onClick={() => setAutoplay((value) => !value)} /></label></div><button className="mt-5 rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black hover:bg-emerald-300" onClick={save}>Save Settings</button></article>
  );
}

function ReportsPage({ notify }: PageTools) {
  return (
    <>
      <div className="grid gap-3 rounded-lg border border-white/8 bg-[#101010] p-4 shadow-2xl md:grid-cols-[1fr_1fr_auto]"><Field label="From" placeholder="2026-06-01" type="date" /><Field label="To" placeholder="2026-06-30" type="date" /><button className="self-end rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black hover:bg-emerald-300" onClick={() => notify("Date range applied")}>Apply</button></div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{reportRows.map((report)=><article key={report.name} className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl"><h2 className="text-xl font-black text-white">{report.name}</h2><p className="mt-3 text-2xl font-black text-emerald-300">{report.total}</p><p className="mt-2 text-sm text-slate-400">{report.date}</p><div className="mt-4 flex gap-2"><ActionButton onClick={() => notify(`${report.name} CSV exported`)}>Export CSV</ActionButton><ActionButton onClick={() => notify(`${report.name} downloaded`)}>Download Report</ActionButton></div></article>)}</section>
    </>
  );
}

function GenericPage({ section, openModal, notify }: PageTools & { section: AdminSection }) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Records" value={section.metric} /><StatCard label="Active" value="Demo" /><StatCard label="Pending Review" value="7" /><StatCard label="Last Updated" value="Today" /></section>
      <article className="rounded-lg border border-white/8 bg-[#101010] p-5 shadow-2xl"><p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">{section.group}</p><h2 className="mt-1 text-2xl font-black text-white">{section.title}</h2><p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">{section.description}</p><div className="mt-6 grid gap-3 md:grid-cols-3">{["Create", "Review", "Export"].map((action)=><button key={action} className="rounded-md border border-white/10 bg-black/35 px-4 py-3 text-left text-sm font-bold text-slate-200 transition hover:border-emerald-300/30 hover:bg-emerald-400/10" onClick={() => action === "Create" ? openModal("category") : notify(`${action} ${section.title}`)}>{action} {section.title}</button>)}</div></article>
    </>
  );
}

export function AdminSectionPage({ section }: { section: AdminSection }) {
  const [modal, setModal] = useState<ModalKind>(null);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  function notify(message: string) {
    setToast({ message });
    window.setTimeout(() => setToast(null), 1800);
  }

  function askConfirm(title: string, body: string, action: string) {
    setConfirm({ title, body, action });
  }

  const tools: PageTools = {
    openModal: (kind) => setModal(kind),
    askConfirm,
    notify,
  };
  const action =
    section.slug === "movies"
      ? { label: "Add Movie", href: "#add" }
      : section.slug === "shows"
        ? { label: "Add Show", href: "#add" }
        : undefined;

  return (
    <AdminShell title={section.title} eyebrow={section.group} primaryAction={action}>
      {section.slug === "movies" ? <MoviesPage {...tools} /> : null}
      {section.slug === "shows" ? <ShowsPage {...tools} /> : null}
      {section.slug === "categories" ? <CategoriesPage {...tools} /> : null}
      {section.slug === "banners" ? <BannersPage {...tools} /> : null}
      {section.slug === "users" ? <UsersPage {...tools} /> : null}
      {section.slug === "subscriptions" ? <SubscriptionsPage {...tools} /> : null}
      {section.slug === "transactions" ? <TransactionsPage {...tools} /> : null}
      {section.slug === "coupons" ? <CouponsPage {...tools} /> : null}
      {section.slug === "referral-earnings" ? <ReferralPage {...tools} /> : null}
      {section.slug === "movie-analytics" ? <AnalyticsPage {...tools} /> : null}
      {section.slug === "competitions" ? <CompetitionsPage {...tools} /> : null}
      {section.slug === "notifications" ? <NotificationsPage {...tools} /> : null}
      {section.slug === "advertisements" ? <AdsPage {...tools} /> : null}
      {section.slug === "settings" ? <SettingsPage {...tools} /> : null}
      {section.slug === "reports" ? <ReportsPage {...tools} /> : null}
      {!["movies", "shows", "categories", "banners", "users", "subscriptions", "transactions", "coupons", "referral-earnings", "movie-analytics", "competitions", "notifications", "advertisements", "settings", "reports"].includes(section.slug) ? (
        <GenericPage section={section} {...tools} />
      ) : null}

      {modal ? (
        <Modal title={modal === "show" ? "Add / Edit Show" : modal === "user" ? "User Details" : `Add / Edit ${modal}`} onClose={() => setModal(null)}>
          {modal === "user" ? (
            <div>
              <h3 className="text-lg font-black text-white">Watch History</h3>
              <div className="mt-4 space-y-2">
                {watchHistory.map((item) => (
                  <div key={item} className="rounded border border-white/8 bg-black/30 px-3 py-2 text-sm text-slate-300">{item}</div>
                ))}
              </div>
            </div>
          ) : (
            <ModalForm kind={modal} onSaved={() => { setModal(null); notify("Demo form saved"); }} />
          )}
        </Modal>
      ) : null}
      <ConfirmModal confirm={confirm} onClose={() => setConfirm(null)} onConfirm={() => { setConfirm(null); notify("Demo action completed"); }} />
      <ToastMessage toast={toast} />
    </AdminShell>
  );
}
