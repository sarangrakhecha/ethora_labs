"use client";
import { useState } from "react";
import { ARCH_NODES, ARCH_EDGES } from "@/lib/demos";

export default function ArchitectureExplorer() {
  const [id, setId] = useState(ARCH_NODES[0].id);
  const node = ARCH_NODES.find((n) => n.id === id)!;
  const connected = new Set(
    ARCH_EDGES.filter(([a, b]) => a === id || b === id).flat().filter((n) => n !== id)
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      {/* Diagram: a flat, evenly-divisible grid (8 nodes), so it reflows on small
          screens instead of scaling to nothing, and every tile is the same size.
          Each side carries its own border sized to its own content, rather than one
          shared box whose height is forced to match whichever side is taller. */}
      <div className="rounded-xl border border-ivory/15 bg-navy-deep p-6 sm:p-8">
        <p className="mb-4 text-sm text-slate">Illustrative architecture — not a client system.</p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ARCH_NODES.map((n) => {
            const on = n.id === id;
            const near = connected.has(n.id);
            return (
              <li key={n.id}>
                <button type="button" onClick={() => setId(n.id)} aria-pressed={on}
                  className={`h-full w-full rounded-lg border p-3 text-left text-sm transition-colors ${
                    on ? "border-gold bg-gold/15 text-ivory"
                      : near ? "border-gold/40 bg-navy text-ivory hover:border-gold"
                      : "border-ivory/20 bg-navy/60 text-muted-dark hover:border-gold/60 hover:text-ivory"}`}>
                  {n.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div aria-live="polite" className="rounded-lg border border-gold/40 bg-navy p-6">
        <h4 className="font-serif text-2xl">{node.name}</h4>
        <p className="mt-3 leading-relaxed text-muted-dark">{node.role}</p>
        <h5 className="mt-6 text-sm font-medium uppercase tracking-wider text-slate">Engineering considerations</h5>
        <ul className="mt-3 space-y-2.5">
          {node.considerations.map((c) => (
            <li key={c} className="flex gap-3 leading-relaxed text-ivory">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />{c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
