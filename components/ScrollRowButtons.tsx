"use client";

type ScrollRowButtonsProps = {
  onPrevious: () => void;
  onNext: () => void;
};

export function ScrollRowButtons({ onPrevious, onNext }: ScrollRowButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Scroll row left"
        onClick={onPrevious}
        className="grid h-10 w-10 place-items-center rounded-full border border-emerald-300/20 bg-black/55 text-lg text-emerald-50 transition hover:border-emerald-300/60 hover:bg-emerald-500/20"
      >
        &lt;
      </button>
      <button
        aria-label="Scroll row right"
        onClick={onNext}
        className="grid h-10 w-10 place-items-center rounded-full border border-emerald-300/20 bg-black/55 text-lg text-emerald-50 transition hover:border-emerald-300/60 hover:bg-emerald-500/20"
      >
        &gt;
      </button>
    </div>
  );
}
