"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Shot = { src: string; alt: string; caption: string; w: number; h: number };

/**
 * A compact horizontal filmstrip of screenshots. Native scroll-snap does the work,
 * with the browser's own scrollbar hidden; dots show position and double as controls,
 * and a soft edge fade hints there is more to scroll. Still fully usable with touch,
 * trackpad, or keyboard (focus the strip and use arrow keys).
 */
export default function ScreenshotStrip({ shots, label = "Screenshots" }: { shots: Shot[]; label?: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  // Which card indices represent a genuinely distinct scroll position, at the current
  // width. Near the end, several trailing cards can share one position because there
  // is not enough track left to left-align each one separately — a dot for each of
  // those would promise a stop that does not exist, so only one dot (the real last
  // card) stands for that shared position.
  const [dotIndices, setDotIndices] = useState<number[]>(() => shots.map((_, i) => i));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const recomputeDots = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const last = shots.length - 1;
      if (maxScroll <= 0) { setDotIndices(shots.map((_, i) => i)); return; }
      const reachable: number[] = [];
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        if (el.offsetLeft < maxScroll || i === last) reachable.push(i);
      });
      setDotIndices(reachable.length ? reachable : [last]);
    };

    const intersecting = new Map<Element, boolean>();
    // Tracks which card is most visible, rather than computing it from scroll offsets,
    // so it stays correct regardless of card width or gap. Each IntersectionObserver
    // callback only reports entries whose ratio changed since the last check, not every
    // observed element — so intersection state is kept per element in a map and the
    // active card is recomputed from the whole map, not just the latest batch.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) intersecting.set(e.target, e.isIntersecting);

        // Near the very end, the last couple of cards can share one scroll position —
        // there isn't enough trailing track to left-align each one separately — so
        // there is no real distinction to detect. The honest answer is the last card.
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll > 0 && track.scrollLeft >= maxScroll - 2) {
          setActive(shots.length - 1);
          return;
        }

        // Otherwise, cards snap to the leading (left) edge, so with several cards
        // fully visible at once, "active" means the one sitting at that edge.
        const rootLeft = track.getBoundingClientRect().left;
        let bestIndex = -1;
        let bestDist = Infinity;
        cardRefs.current.forEach((el, i) => {
          if (!el || !intersecting.get(el)) return;
          const dist = Math.abs(el.getBoundingClientRect().left - rootLeft);
          if (dist < bestDist) { bestDist = dist; bestIndex = i; }
        });
        if (bestIndex >= 0) setActive(bestIndex);
      },
      { root: track, threshold: [0, 0.5, 0.75, 1] }
    );
    cardRefs.current.forEach((el) => el && io.observe(el));

    const onScroll = () => {
      setAtStart(track.scrollLeft <= 4);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
    };
    onScroll();
    recomputeDots();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recomputeDots);
    return () => {
      io.disconnect();
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recomputeDots);
    };
  }, [shots]);

  const goTo = (i: number) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label={`${label} screenshots`}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto"
      >
        {shots.map((s, i) => (
          <li
            key={s.src}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="w-[82vw] shrink-0 snap-start overflow-hidden rounded-xl border border-ivory/15 bg-navy sm:w-[26rem]"
          >
            <Image src={s.src} alt={s.alt} width={s.w} height={s.h} className="h-auto w-full" />
            <p className="border-t border-ivory/10 px-4 py-3 text-sm leading-snug text-muted-dark">{s.caption}</p>
          </li>
        ))}
      </ul>

      {/* Edge fades hint there is more to scroll, without text saying so. */}
      <span aria-hidden="true" className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-navy-deep to-transparent transition-opacity ${atStart ? "opacity-0" : "opacity-100"}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-navy-deep to-transparent transition-opacity ${atEnd ? "opacity-0" : "opacity-100"}`} />

      {/* Dots: one per genuinely reachable stop, not one per image. */}
      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label={`${label} position`}>
        {dotIndices.map((i) => (
          <button
            key={shots[i].src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Screenshot ${i + 1} of ${shots.length}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-gold" : "w-2 bg-ivory/25 hover:bg-ivory/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
