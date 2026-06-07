"use client";

type ProfileCardProps = {
  name: string;
  accent: string;
  onSelect: (name: string) => void;
};

export function ProfileCard({ name, accent, onSelect }: ProfileCardProps) {
  return (
    <button
      onClick={() => onSelect(name)}
      className="group flex flex-col items-center gap-4 rounded-xl border border-emerald-300/12 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-emerald-300/55 hover:bg-emerald-400/10"
    >
      <div
        aria-hidden="true"
        className="grid h-28 w-28 place-items-center rounded-xl text-4xl font-black text-black shadow-glow"
        style={{ background: accent }}
      >
        {name.slice(0, 1)}
      </div>
      <span className="text-sm font-semibold text-emerald-50 group-hover:text-emerald-200">{name}</span>
    </button>
  );
}
