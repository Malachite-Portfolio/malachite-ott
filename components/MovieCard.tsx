"use client";

import { fallbackPosterUrl, type Movie } from "@/data/movies";

type MovieCardProps = {
  movie: Movie;
  progress?: number;
  isInMyList?: boolean;
  onPlay: (movie: Movie) => void;
  onToggleMyList?: (movie: Movie) => void;
};

export function MovieCard({
  movie,
  progress,
  isInMyList = false,
  onPlay,
  onToggleMyList,
}: MovieCardProps) {
  return (
    <article className="group relative aspect-[2/3] shrink-0 basis-[calc((100%-1rem)/2)] snap-start overflow-hidden rounded-md border border-white/8 bg-black shadow-2xl transition duration-300 hover:z-30 hover:-translate-y-1 hover:scale-[1.045] hover:border-emerald-300/45 md:basis-[calc((100%-2rem)/3)] xl:basis-[calc((100%-4rem)/5)]">
      <img
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackPosterUrl;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/18 to-transparent opacity-92" />
      <div className="absolute inset-x-0 bottom-0 translate-y-[4.15rem] p-3 transition duration-300 group-hover:translate-y-0">
        <div className="rounded-md border border-white/10 bg-black/68 p-3 shadow-2xl backdrop-blur-md">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="line-clamp-1 text-sm font-bold leading-tight text-white">{movie.title}</h3>
              <p className="mt-1 line-clamp-1 text-[0.68rem] font-medium text-emerald-200/85">{movie.genre}</p>
            </div>
            <span className="shrink-0 rounded border border-emerald-300/25 bg-emerald-300/10 px-1.5 py-0.5 text-[0.6rem] font-bold text-emerald-100">
              {movie.rating}
            </span>
          </div>
          <p className="mt-2 text-[0.68rem] font-medium text-emerald-50/76">
            {movie.year} | {movie.duration}
          </p>
          <p className="mt-1 hidden text-[0.68rem] leading-4 text-emerald-50/58 lg:line-clamp-2">
            {movie.description}
          </p>
          {typeof progress === "number" ? (
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/18">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          ) : null}
          <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
            <button
              onClick={() => onPlay(movie)}
              className="rounded bg-emerald-400 px-3 py-2 text-[0.66rem] font-black uppercase tracking-[0.14em] text-black transition hover:bg-emerald-300"
            >
              Play Trailer
            </button>
            {onToggleMyList ? (
              <button
                aria-label={isInMyList ? "Remove from my list" : "Add to my list"}
                onClick={() => onToggleMyList(movie)}
                className="grid h-8 w-8 place-items-center rounded border border-emerald-300/25 bg-white/10 text-xs font-black text-emerald-50 transition hover:bg-emerald-500/24"
              >
                {isInMyList ? "-" : "+"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
