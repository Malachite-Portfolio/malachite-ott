"use client";

import type { Movie } from "@/data/movies";

type TrailerModalProps = {
  movie: Movie | null;
  onClose: () => void;
};

export function TrailerModal({ movie, onClose }: TrailerModalProps) {
  if (!movie) {
    return null;
  }

  const separator = movie.trailerUrl.includes("?") ? "&" : "?";
  const source = `${movie.trailerUrl}${separator}autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-xl">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-emerald-300/20 bg-[#020806] shadow-glow">
        <div className="flex items-center justify-between gap-4 border-b border-emerald-300/10 px-4 py-3 sm:px-5">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-300/80">Now playing</p>
            <h2 className="text-xl font-semibold text-emerald-50">{movie.title}</h2>
          </div>
          <button
            aria-label="Close trailer"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-emerald-300/20 bg-white/5 text-xl text-emerald-50 transition hover:bg-emerald-500/20"
          >
            x
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          <iframe
            title={`${movie.title} trailer`}
            src={source}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
