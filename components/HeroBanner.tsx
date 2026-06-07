"use client";

import { fallbackBackdropUrl, type Movie } from "@/data/movies";

type HeroBannerProps = {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onToggleMyList: (movie: Movie) => void;
  isInMyList: boolean;
};

export function HeroBanner({ movie, onPlay, onToggleMyList, isInMyList }: HeroBannerProps) {
  return (
    <section className="relative min-h-[76vh] overflow-hidden border-b border-emerald-300/10">
      <img
        src={movie.backdropUrl}
        alt={`${movie.title} cinematic background`}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-72"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackBackdropUrl;
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#020403_0%,rgba(2,4,3,0.96)_28%,rgba(2,4,3,0.48)_62%,rgba(2,4,3,0.22)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020403] to-transparent" />
      <div className="relative flex min-h-[76vh] max-w-4xl flex-col justify-end px-4 pb-20 pt-32 sm:px-8 lg:px-12">
        <p className="mb-4 w-fit rounded border border-emerald-300/25 bg-emerald-400/12 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.26em] text-emerald-200">
          Featured on Malachite Play
        </p>
        <h1 className="max-w-3xl text-4xl font-black leading-none text-white sm:text-6xl lg:text-7xl">
          {movie.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-50/82 sm:text-lg">
          {movie.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-emerald-50/78">
          <span>{movie.year}</span>
          <span>{movie.duration}</span>
          <span className="rounded border border-emerald-300/25 bg-black/32 px-2 py-0.5 text-emerald-100">{movie.rating}</span>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onPlay(movie)}
            className="rounded bg-emerald-400 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-emerald-300"
          >
            Play Trailer
          </button>
          <button
            onClick={() => onToggleMyList(movie)}
            className="rounded border border-emerald-300/25 bg-black/44 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-emerald-50 backdrop-blur transition hover:bg-emerald-500/18"
          >
            {isInMyList ? "Remove" : "My List"}
          </button>
        </div>
      </div>
    </section>
  );
}
