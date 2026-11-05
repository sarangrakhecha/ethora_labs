"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { techCategories, technologies, getTechnology } from "@/lib/technologies";
import { services } from "@/lib/services";
import { TechVisual } from "./tech-visuals";
import { Icon } from "./Icons";

/**
 * Two-column technology playground: a compact selector on the left, a preview that
 * updates immediately on the right. On large screens the preview is `sticky`, so a
 * selection never requires scrolling to see its result. Below `lg` the two columns
 * stack; selecting a technology scrolls the (now out-of-view) preview into view with
 * `scrollIntoView({ block: "nearest" })`, which is a no-op whenever it is already
 * visible (always true on desktop, thanks to the sticky panel) and otherwise brings
 * it in gently -- one mechanism serves both layouts, instead of a separate mobile
 * bottom-sheet component.
 */
export default function TechnologyExplorer() {
  const [id, setId] = useState(technologies[0].id);
  const tech = getTechnology(id)!;
  const related = tech.relatedServices.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean);
  const previewRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    // Only below `lg`: on large screens the preview is already `sticky` and always
    // visible, so scrolling there too could nudge the page by a few pixels whenever
    // a taller/shorter preview changes what "nearest" means -- an unwanted jump this
    // mechanism exists specifically to avoid.
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    previewRef.current?.scrollIntoView({ block: "nearest" });
  }, [id]);

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start lg:gap-10">
      {/* Selector */}
      <div className="space-y-8">
        {techCategories.map((cat) => (
          // Anchor target for the "Jump to a category" links in the intro above.
          <div key={cat.id} id={cat.id} className="scroll-mt-24">
            <h3 className="font-serif text-xl text-ivory">{cat.name}</h3>
            <p className="mt-1 text-sm text-muted-dark">{cat.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cat.items.map((itemId) => {
                const t = getTechnology(itemId)!;
                const on = t.id === id;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setId(t.id)}
                      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[15px] transition-colors ${
                        on ? "border-gold bg-gold/15 text-ivory" : "border-ivory/20 bg-navy-deep/60 text-muted-dark hover:border-gold/60 hover:text-ivory"
                      }`}
                    >
                      <Icon name={t.icon} className={`h-4 w-4 shrink-0 ${on ? "text-gold" : "text-slate"}`} />
                      {t.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Preview -- sticky on large screens, so a selection is always visible without scrolling */}
      <div ref={previewRef} aria-live="polite" className="scroll-mt-24 rounded-xl border border-gold/40 bg-navy-deep p-6 sm:p-8 lg:sticky lg:top-24">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h4 className="font-serif text-3xl">{tech.name}</h4>
          <span className="shrink-0 rounded-full border border-ivory/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-dark">{tech.role}</span>
        </div>
        <p className="mt-3 leading-relaxed text-ivory/90">{tech.usedFor}</p>

        <div className="mt-6 rounded-lg border border-ivory/10 bg-navy p-5">
          <TechVisual id={tech.id} visual={tech.visual} />
        </div>

        <h5 className="mt-6 text-sm font-medium uppercase tracking-wider text-slate">Engineering considerations</h5>
        <ul className="mt-3 space-y-2.5">
          {tech.considerations.map((c) => (
            <li key={c} className="flex gap-3 leading-relaxed text-muted-dark">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />{c}
            </li>
          ))}
        </ul>

        {related.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-ivory/10 pt-5 text-sm">
            <span className="text-slate">Related to:</span>
            {related.map((s) => s && (
              <Link key={s.slug} href={`/services/${s.slug}`} className="font-medium text-gold underline underline-offset-4 hover:text-ivory">
                {s.nav.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
