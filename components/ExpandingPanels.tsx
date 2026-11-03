"use client";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export type Panel = {
  key: string;
  icon: string;
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
export default function ExpandingPanels({ panels, heightClass = "lg:h-[26rem]" }: { panels: Panel[]; heightClass?: string }) {
  const [active, setActive] = useState(0);

  return (
    <ul className={`flex flex-col gap-4 lg:flex-row lg:gap-3 ${heightClass}`}>
      {panels.map((p, i) => {
        const isActive = i === active;
        const inner: ReactNode = (
          <>
            <Icon name={p.icon} className="h-9 w-9 shrink-0 text-gold" />
            <span className="mt-5 block font-serif text-2xl leading-tight">{p.title}</span>
            <span className={`mt-2 block font-serif text-lg italic leading-snug text-muted-dark ${isActive ? "" : "lg:line-clamp-2"}`}>
              {p.subtitle}
            </span>
            <span
              className={`mt-4 block leading-relaxed text-ivory transition-opacity duration-500 lg:border-t lg:border-gold/30 lg:pt-4 ${
                isActive ? "lg:opacity-100" : "lg:mt-0 lg:h-0 lg:overflow-hidden lg:border-0 lg:pt-0 lg:opacity-0"
              }`}
            >
              {p.detail}
            </span>
            {p.chip && (
              <span className={`mt-4 inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1 text-sm ${p.chip.highlight ? "border-gold/50 bg-gold/10 text-ivory" : "border-ivory/25 text-muted-dark"}`}>
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${p.chip.highlight ? "bg-gold" : "bg-slate"}`} aria-hidden="true" />
                {p.chip.label}
              </span>
            )}
            <span className="mt-auto inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap pt-5 text-[15px] font-medium text-gold">
              {p.cta} <Icon name="arrow" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </>
        );

        const cls = `group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border p-6 transition-colors duration-500 ${
          isActive ? "border-gold/70 bg-navy-deep" : "border-ivory/15 bg-navy-deep/50 hover:border-gold/50"
        }`;

        return (
          <li
            key={p.key}
            style={{ flexGrow: isActive ? 2.6 : 1 }}
            className="min-w-0 transition-[flex-grow] duration-500 ease-out lg:basis-0"
          >
            {p.external ? (
              <a href={p.href} target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className={cls}>
                {inner}
              </a>
            ) : (
              <Link href={p.href} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className={cls}>
                {inner}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export { Reveal };
