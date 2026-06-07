import Link from "next/link";
import { movies } from "@/data/movies";

export default function LandingPage() {
  const featured = movies.slice(0, 5);

  return (
    <main className="min-h-screen overflow-hidden bg-[#020403] text-emerald-50">
      <section className="relative min-h-screen border-b border-emerald-300/10">
        <div className="absolute inset-0 grid grid-cols-2 gap-2 opacity-32 sm:grid-cols-5">
          {featured.map((movie) => (
            <img key={movie.title} src={movie.posterUrl} alt="" className="h-full w-full object-cover" />
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#020403_0%,rgba(2,4,3,0.94)_42%,rgba(2,4,3,0.52)_100%)]" />
        <div className="absolute inset-0 malachite-grid opacity-70" />
        <div className="relative flex min-h-screen max-w-4xl flex-col justify-center px-5 py-20 sm:px-10 lg:px-16">
          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-emerald-300">
            Malachite Play
          </p>
          <h1 className="text-5xl font-black leading-none text-emerald-50 sm:text-7xl lg:text-8xl">
            Stream a premium OTT demo.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-100/78">
            A Netflix-inspired, original dark emerald experience with profiles, fake OTP login, trailer modals, and fully scrollable movie rows.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="rounded-md bg-emerald-400 px-7 py-3 text-sm font-black uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
            >
              Start Demo
            </Link>
            <Link
              href="/movies"
              className="rounded-md border border-emerald-300/25 bg-black/45 px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-50 backdrop-blur transition hover:bg-emerald-500/18"
            >
              View Movies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
