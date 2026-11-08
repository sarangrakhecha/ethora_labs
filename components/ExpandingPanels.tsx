"use client";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Icon } from "./Icons";
import ProductArt from "./ProductArt";
import Reveal from "./Reveal";

export type Panel = {
  key: string;
  icon: string;
  /** Optional diagram shown as a band across the top of the panel, in place of the icon. */
  art?: "culprit" | "recurr" | "terminal";
  title: string;
  /** One short line, always visible. */
  subtitle: string;
  /** Longer copy, revealed when the panel is active. */
  detail: string;
  chip?: { label: string; highlight: boolean };
  href: string;
  cta: string;
  external?: boolean;
};

/**
 * A row of panels where the active one grows and the others shrink, so the row keeps
 * its width with no dead space. Hover or keyboard focus sets the active panel; clicking
 * follows the link. Stacks to a plain list below lg, where width animation makes no sense.
 */
export default function ExpandingPanels({ panels, heightClass = "lg:h-[38rem]" }: { panels: Panel[]; heightClass?: string }) {
  const [active, setActive] = useState(0);

  return (
    <ul className={`flex flex-col gap-4 lg:flex-row lg:gap-3 ${heightClass}`}>
      {panels.map((p, i) => {
        const isActive = i === active;
        const inner: ReactNode = (
          <>
            {/* The diagram spans the panel and grows with it, so the motion enlarges it. */}
            {p.art && (
              <span className="-mx-6 -mt-6 mb-5 block aspect-[400/150] max-h-56 shrink-0 overflow-hidden border-b border-ivory/10">
                <ProductArt name={p.art} />
              </span>
            )}
            {!p.art && <Icon name={p.icon} className="h-9 w-9 shrink-0 text-gold" />}
            <span className={`block font-serif text-2xl leading-tight ${p.art ? "" : "mt-5"}`}>
              {p.title}
            </span>
            <span className={`mt-2 block font-serif text-lg italic leading-snug text-muted-dark ${isActive ? "" : "lg:line-clamp-2"}`}>
              {p.subtitle}
            </span>
            <span
              // Inactive panels keep a clamped version rather than nothing, so a narrow
              // panel is not mostly empty; expanding simply lets it run to full length.
              className={`mt-4 block leading-relaxed transition-colors duration-500 lg:border-t lg:border-gold/30 lg:pt-4 ${
                isActive ? "text-ivory" : "text-muted-dark lg:line-clamp-4"
              }`}
            >
              {p.detail}
            </span>
            {/* No whitespace-nowrap on the chip below: the panel can be as narrow as
                ~210px when collapsed, and a long label (e.g. "Available on the Chrome
                Web Store") must be allowed to wrap rather than overflow the card. */}
            {p.chip && (
              <span className={`mt-4 inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1 text-sm ${p.chip.highlight ? "border-gold/50 bg-gold/10 text-ivory" : "border-ivory/25 text-muted-dark"}`}>
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${p.chip.highlight ? "bg-gold" : "bg-slate"}`} aria-hidden="true" />
                {p.chip.label}
              </span>
            )}
            <span data-cta className="mt-auto inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap pt-5 text-[15px] font-medium text-gold">
              {p.cta} <Icon name="arrow" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </>
        );

        const cls = `group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border p-6 transition-colors duration-500 ${
          isActive ? "border-gold/70 bg-navy-deep" : "border-ivory/15 bg-navy-deep/50 hover:border-gold/50"
        }`;

        const body: ReactNode = inner;

        return (
          <li
            key={p.key}
            style={{ flexGrow: isActive ? 2.6 : 1 }}
            className="min-w-0 transition-[flex-grow] duration-500 ease-out lg:basis-0"
          >
            {p.external ? (
              <a href={p.href} target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className={cls}>
                {body}
              </a>
            ) : (
              <Link href={p.href} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className={cls}>
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export { Reveal };
