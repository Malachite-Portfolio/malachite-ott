"use client";

import { useRef } from "react";
import type { Movie } from "@/data/movies";
import { MovieCard } from "@/components/MovieCard";
import { ScrollRowButtons } from "@/components/ScrollRowButtons";

type MovieRowProps = {
  id?: string;
  title: string;
  movies: Movie[];
  progressByTitle?: Record<string, number>;
  myListTitles?: string[];
  onPlay: (movie: Movie) => void;
  onToggleMyList?: (movie: Movie) => void;
};

export function MovieRow({
  id,
  title,
  movies,
  progressByTitle = {},
  myListTitles = [],
  onPlay,
  onToggleMyList,
}: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "previous" | "next") {
    const row = rowRef.current;
    if (!row) {
      return;
    }

    const card = row.querySelector("article");
    const rowStyles = window.getComputedStyle(row);
    const gap = Number.parseFloat(rowStyles.columnGap || rowStyles.gap || "0");
    const cardWidth = card?.getBoundingClientRect().width ?? row.clientWidth;
    const visibleCards = Math.max(1, Math.floor((row.clientWidth + gap) / (cardWidth + gap)));
    const distance = visibleCards * (cardWidth + gap);
    const maxScroll = row.scrollWidth - row.clientWidth;
    const nextScroll =
      direction === "next"
        ? Math.min(maxScroll, row.scrollLeft + distance)
        : Math.max(0, row.scrollLeft - distance);
    const previousSnapType = row.style.scrollSnapType;

    row.style.scrollSnapType = "none";
    row.scrollBy({
      left: nextScroll - row.scrollLeft,
      behavior: "smooth",
    });
    window.setTimeout(() => {
      row.style.scrollSnapType = previousSnapType;
    }, 450);
  }

  if (!movies.length) {
    return null;
  }

  return (
    <section id={id} className="space-y-3">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        <h2 className="text-xl font-semibold text-emerald-50 sm:text-2xl">{title}</h2>
        <ScrollRowButtons onPrevious={() => scroll("previous")} onNext={() => scroll("next")} />
      </div>
      <div
        data-movie-row={title}
        ref={rowRef}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto scroll-smooth px-4 pb-5 pt-1 sm:px-8 sm:scroll-px-8 lg:px-12 lg:scroll-px-12"
      >
        {movies.map((movie, index) => (
          <MovieCard
            key={`${title}-${movie.title}-${index}`}
            movie={movie}
            progress={progressByTitle[movie.title]}
            isInMyList={myListTitles.includes(movie.title)}
            onPlay={onPlay}
            onToggleMyList={onToggleMyList}
          />
        ))}
      </div>
    </section>
  );
}
