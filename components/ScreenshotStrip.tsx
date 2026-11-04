"use client";
import Image from "next/image";
import { useRef } from "react";
import { Icon } from "./Icons";

type Shot = { src: string; alt: string; caption: string; w: number; h: number };

/**
 * A compact horizontal filmstrip of screenshots. Native scroll-snap does the work;
 * the arrow buttons are a convenience on top of it, not a replacement for it, so the
 * strip stays usable with touch, trackpad, or keyboard (focus it and use arrow keys).
 */
export default function ScreenshotStrip({ shots }: { shots: Shot[] }) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const amount = (card?.clientWidth ?? 320) + 16; // card width + gap
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Culprit screenshots"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]"
      >
        {shots.map((s) => (
          <li
            key={s.src}
            className="w-[82vw] shrink-0 snap-start overflow-hidden rounded-xl border border-ivory/15 bg-navy sm:w-[26rem]"
          >
            <Image src={s.src} alt={s.alt} width={s.w} height={s.h} className="h-auto w-full" />
            <p className="border-t border-ivory/10 px-4 py-3 text-sm leading-snug text-muted-dark">{s.caption}</p>
          </li>
        ))}
      </ul>

      {/* Desktop convenience controls; the strip itself works without them. */}
      <div className="mt-3 hidden items-center gap-2 sm:flex">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous screenshot"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold"
        >
          <Icon name="arrow" className="h-4 w-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next screenshot"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold"
        >
          <Icon name="arrow" className="h-4 w-4" />
        </button>
        <span className="ml-1 text-sm text-slate">Scroll or use the arrows</span>
      </div>
    </div>
  );
}
