"use client";
import { useState } from "react";
import { stages } from "@/lib/content";
import { noWidow } from "@/lib/typography";
import { Icon } from "./Icons";

const icons = ["pen", "code", "check", "chart"];

/**
 * Interactive Design -> Build -> Verify -> Improve loop.
 * Short label is always visible; hover / focus / tap reveals the longer description.
 * <xl: vertical stepper (tap to expand). >=xl: circles + shared description panel.
 */
export default function EngineeringCanvas() {
  const [active, setActive] = useState(0);
  const cur = stages[active];

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-gold/50" />
        <h2 className="text-center text-xs font-medium uppercase tracking-[0.3em] text-gold">The Engineering Canvas</h2>
        <span className="h-px flex-1 bg-gold/50" />
      </div>
      <p className="mb-8 text-center font-serif text-lg italic text-muted-dark">A continuous, outcome-focused engineering approach.</p>

      <ol className="flex flex-col gap-3 xl:grid xl:grid-cols-4 xl:gap-0">
        {stages.map((s, i) => {
          const isActive = i === active;
          return (
            <li
              key={s.id}
              // Fixed-width circular labels: wrapping is required here, so the
              // no-orphan rule is deliberately not applied (see tests/e2e.mjs).
              data-allow-widow
              className="relative xl:flex xl:justify-center"
            >
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={`stage-desc-${s.id}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors xl:aspect-square xl:w-[76%] xl:max-w-[150px] xl:flex-col xl:items-center xl:justify-center xl:gap-1 xl:rounded-full xl:p-3 xl:text-center ${isActive ? "border-gold bg-navy-deep" : "border-ivory/20 bg-navy-deep/60 hover:border-gold/70"}`}
              >
                <Icon name={icons[i]} className="mt-0.5 h-6 w-6 shrink-0 text-gold xl:mt-0" />
                <span className="block">
                  <span className="block font-serif text-2xl leading-tight xl:text-xl">{s.title}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted-dark xl:text-[12px]">{s.short}</span>
                  {/* Mobile: expanded text inline */}
                  <span id={`stage-desc-${s.id}`} className={`mt-3 block text-sm leading-relaxed text-ivory xl:hidden ${isActive ? "" : "hidden"}`}>{noWidow(s.long)}</span>
                </span>
              </button>
              {i < stages.length - 1 && (
                <>
                  <Icon name="arrow" className="absolute right-0 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 translate-x-1/2 text-gold xl:block" />
                  <span aria-hidden="true" className="ml-8 block h-3 w-px bg-gold/50 xl:hidden" />
                </>
              )}
            </li>
          );
        })}
      </ol>

      {/* Desktop shared description + loop */}
      <div className="relative mt-2 hidden xl:block" aria-hidden="true">
        <svg viewBox="0 0 100 18" preserveAspectRatio="none" className="h-12 w-full overflow-visible">
          <path d="M87.5 0 V10 Q87.5 14 83.5 14 H16.5 Q12.5 14 12.5 10 V1" fill="none" stroke="#C4A77A" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity=".8" />
          <path d="M11 3.5 L12.5 0.8 L14 3.5" fill="none" stroke="#C4A77A" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-muted-dark xl:hidden"><Icon name="loop" className="h-5 w-5 text-gold" />Improve feeds back into Design, and the loop continues.</p>

      <div role="status" aria-live="polite" className="mt-4 hidden min-h-[4.5rem] rounded-lg border border-ivory/10 bg-navy-deep/60 px-5 py-4 text-center xl:block">
        <span className="font-serif text-lg text-gold">{cur.title}.</span>{" "}
        <span className="text-[15px] text-ivory">{noWidow(cur.long)}</span>
      </div>
    </div>
  );
}
