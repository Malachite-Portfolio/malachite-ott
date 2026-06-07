"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileCard } from "@/components/ProfileCard";
import { storageKeys } from "@/lib/storage";

const profiles = [
  { name: "Ava", accent: "linear-gradient(135deg, #34d399, #d1fae5)" },
  { name: "Noah", accent: "linear-gradient(135deg, #10b981, #064e3b)" },
  { name: "Mira", accent: "linear-gradient(135deg, #6ee7b7, #047857)" },
  { name: "Guest", accent: "linear-gradient(135deg, #ecfdf5, #059669)" },
];

export default function ProfilesPage() {
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem(storageKeys.login) !== "true") {
      router.push("/login");
    }
  }, [router]);

  function selectProfile(name: string) {
    window.localStorage.setItem(storageKeys.profile, name);
    router.push("/home");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#020403] px-4 py-12 text-emerald-50 malachite-grid">
      <p className="text-sm font-black uppercase tracking-[0.34em] text-emerald-300">Malachite Play</p>
      <h1 className="mt-8 text-center text-4xl font-black sm:text-6xl">Choose a profile</h1>
      <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
        {profiles.map((profile) => (
          <ProfileCard key={profile.name} name={profile.name} accent={profile.accent} onSelect={selectProfile} />
        ))}
      </div>
    </main>
  );
}
