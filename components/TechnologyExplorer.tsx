"use client";
import Link from "next/link";
import { useState } from "react";
import { techCategories, technologies, getTechnology } from "@/lib/technologies";
import { services } from "@/lib/services";

/**
 * Category groups of technology buttons, with a shared detail panel below --
 * progressive disclosure instead of a wall of always-visible text. Pattern
 * mirrors ArchitectureExplorer's list-plus-detail-panel interaction for
 * consistency, rather than inventing a new one.
 */
export default function TechnologyExplorer() {
  const [id, setId] = useState(technologies[0].id);
  const tech = getTechnology(id)!;
  const related = tech.relatedServices.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean);

  return (
    <div>
      <div className="space-y-10">
        {techCategories.map((cat) => (
          <div key={cat.id}>
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
                      className={`min-h-11 rounded-full border px-4 text-[15px] transition-colors ${
                        on ? "border-gold bg-gold/15 text-ivory" : "border-ivory/20 bg-navy-deep/60 text-muted-dark hover:border-gold/60 hover:text-ivory"
                      }`}
                    >
                      {t.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div aria-live="polite" className="mt-10 rounded-xl border border-gold/40 bg-navy-deep p-6 sm:p-8">
        <h4 className="font-serif text-2xl">{tech.name}</h4>
        <p className="mt-3 leading-relaxed text-ivory/90">{tech.usedFor}</p>

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
