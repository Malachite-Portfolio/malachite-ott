"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  continueWatchingDefaults,
  genreRows,
  hollywoodBlockbusters,
  movies,
  trendingNow,
  type Movie,
} from "@/data/movies";
import {
  readContinueWatching,
  readStringArray,
  storageKeys,
  writeJson,
  type ContinueWatchingEntry,
} from "@/lib/storage";
import { AppHeader } from "@/components/AppHeader";
import { HeroBanner } from "@/components/HeroBanner";
import { MovieRow } from "@/components/MovieRow";
import { TrailerModal } from "@/components/TrailerModal";

type BrowseExperienceProps = {
  variant: "home" | "movies";
};

export function BrowseExperience({ variant }: BrowseExperienceProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<string | null>(null);
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [myListTitles, setMyListTitles] = useState<string[]>([]);
  const [continueWatching, setContinueWatching] = useState<ContinueWatchingEntry[]>(
    continueWatchingDefaults.map((movie) => ({
      title: movie.title,
      progress: movie.continueProgress ?? 30,
    }))
  );

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem(storageKeys.login) === "true";
    const selectedProfile = window.localStorage.getItem(storageKeys.profile);

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (!selectedProfile) {
      router.push("/profiles");
      return;
    }

    setProfile(selectedProfile);
    setMyListTitles(readStringArray(storageKeys.myList));

    const savedProgress = readContinueWatching();
    if (savedProgress.length) {
      setContinueWatching(savedProgress);
      return;
    }

    const defaults = continueWatchingDefaults.map((movie) => ({
      title: movie.title,
      progress: movie.continueProgress ?? 30,
    }));
    setContinueWatching(defaults);
    writeJson(storageKeys.continueWatching, defaults);
  }, [router]);

  const progressByTitle = useMemo(
    () =>
      continueWatching.reduce<Record<string, number>>((acc, entry) => {
        acc[entry.title] = entry.progress;
        return acc;
      }, {}),
    [continueWatching]
  );

  const continueWatchingMovies = useMemo(
    () =>
      continueWatching
        .map((entry) => movies.find((movie) => movie.title === entry.title))
        .filter((movie): movie is Movie => Boolean(movie)),
    [continueWatching]
  );

  const myListMovies = useMemo(() => {
    const savedMovies = myListTitles
      .map((title) => movies.find((movie) => movie.title === title))
      .filter((movie): movie is Movie => Boolean(movie));

    return savedMovies.length ? savedMovies : movies.slice(24, 30);
  }, [myListTitles]);

  function openTrailer(movie: Movie) {
    const nextProgress = [...continueWatching.filter((entry) => entry.title !== movie.title)];
    nextProgress.unshift({ title: movie.title, progress: Math.max(progressByTitle[movie.title] ?? 18, 18) });
    const trimmed = nextProgress.slice(0, 12);

    setContinueWatching(trimmed);
    writeJson(storageKeys.continueWatching, trimmed);
    setActiveMovie(movie);
  }

  function toggleMyList(movie: Movie) {
    const next = myListTitles.includes(movie.title)
      ? myListTitles.filter((title) => title !== movie.title)
      : [movie.title, ...myListTitles];

    setMyListTitles(next);
    writeJson(storageKeys.myList, next);
  }

  const heroMovie = movies.find((movie) => movie.title === "Dune") ?? movies[0];
  const continueTitle = `Continue Watching${profile ? ` for ${profile}` : ""}`;
  const rows =
    variant === "home"
      ? [
          { title: "Trending Now", movies: trendingNow },
          { title: continueTitle, movies: continueWatchingMovies, progress: true },
          { title: "Hollywood Blockbusters", movies: hollywoodBlockbusters },
          ...genreRows,
          { title: "My List", movies: myListMovies, id: "my-list" },
        ]
      : [
          { title: "Trending Now", movies: trendingNow },
          { title: continueTitle, movies: continueWatchingMovies, progress: true },
          { title: "Hollywood Blockbusters", movies: hollywoodBlockbusters },
          ...genreRows,
          { title: "My List", movies: myListMovies, id: "my-list" },
        ];

  return (
    <main className="min-h-screen bg-[#020403] text-emerald-50">
      <AppHeader profile={profile} />
      <HeroBanner
        movie={heroMovie}
        onPlay={openTrailer}
        onToggleMyList={toggleMyList}
        isInMyList={myListTitles.includes(heroMovie.title)}
      />
      <div className="relative z-20 -mt-8 space-y-6 pb-16">
        {rows.map((row) => (
          <MovieRow
            key={row.title}
            id={"id" in row ? row.id : undefined}
            title={row.title}
            movies={row.movies}
            progressByTitle={"progress" in row && row.progress ? progressByTitle : undefined}
            myListTitles={myListTitles}
            onPlay={openTrailer}
            onToggleMyList={toggleMyList}
          />
        ))}
      </div>
      <TrailerModal movie={activeMovie} onClose={() => setActiveMovie(null)} />
    </main>
  );
}
