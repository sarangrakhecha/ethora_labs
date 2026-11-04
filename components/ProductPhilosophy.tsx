"use client";
import { useState } from "react";
import { PHILOSOPHY_STAGES } from "@/lib/products";
import { Icon } from "./Icons";

/**
 * Observe -> Question -> Simplify -> Build -> Validate -> Improve.
 *
 * Deliberately a different interaction from the homepage Engineering Canvas: a vertical
 * accordion with a connecting rule, one stage open at a time, rather than a row of
 * circular stages with a shared description panel. Works identically at every width
 * (no separate mobile/desktop layout needed), so there is nothing to break on narrow
 * screens -- each <button> is a native disclosure control, reachable and operable by
 * keyboard alone.
 */
export default function ProductPhilosophy() {
  const [open, setOpen] = useState(PHILOSOPHY_STAGES[0].id);

  return (
    <ol className="mx-auto max-w-2xl">
      {PHILOSOPHY_STAGES.map((s, i) => {
        const isOpen = s.id === open;
        const last = i === PHILOSOPHY_STAGES.length - 1;
        return (
          <li key={s.id} className="relative pl-12">
            {!last && <span aria-hidden="true" className="absolute left-[15px] top-9 h-[calc(100%-1.25rem)] w-px bg-gold/25" />}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border font-serif text-sm transition-colors ${isOpen ? "border-gold bg-gold text-navy-deep" : "border-gold/50 text-gold"}`}
            >
              {i + 1}
            </span>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`philosophy-${s.id}`}
              onClick={() => setOpen(isOpen ? "" : s.id)}
              className="flex w-full items-center justify-between gap-3 rounded py-1 text-left"
            >
              <span className={`font-serif text-2xl transition-colors ${isOpen ? "text-gold" : "text-ivory"}`}>{s.name}</span>
              <Icon name="chevron" className={`shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div id={`philosophy-${s.id}`} className={`overflow-hidden transition-[max-height,opacity] duration-300 ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
              <p className="pb-3 pt-1 font-serif text-lg italic leading-snug text-muted-dark">{s.question}</p>
              <p className="pb-8 leading-relaxed text-ivory/90">{s.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
