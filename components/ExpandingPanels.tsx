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
  art?: "culprit" | "renewguard" | "terminal";
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
export default function ExpandingPanels({ panels, heightClass = "lg:h-[30rem] xl:h-[26rem]" }: { panels: Panel[]; heightClass?: string }) {
  const [active, setActive] = useState(0);

  return (
    <ul className={`flex flex-col gap-4 lg:flex-row lg:gap-3 ${heightClass}`}>
      {panels.map((p, i) => {
        const isActive = i === active;
        const inner: ReactNode = (
          <>
            {/* Mobile: the diagram sits above the text, where the panel is full width. */}
            {p.art && (
              <span className="-mx-6 -mt-6 mb-5 block h-24 shrink-0 overflow-hidden border-b border-ivory/10 lg:hidden">
                <ProductArt name={p.art} />
              </span>
            )}
            {(!p.art || !isActive) && (
              <Icon name={p.icon} className={`h-9 w-9 shrink-0 text-gold ${p.art ? "hidden lg:block" : ""}`} />
            )}
            <span className={`block font-serif text-2xl leading-tight ${!p.art ? "mt-5" : isActive ? "lg:mt-0" : "lg:mt-5"}`}>
              {p.title}
            </span>
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
            <span data-cta className="mt-auto inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap pt-5 text-[15px] font-medium text-gold">
              {p.cta} <Icon name="arrow" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </>
        );

        const cls = `group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border p-6 transition-colors duration-500 lg:flex-row lg:items-stretch lg:gap-8 ${
          isActive ? "border-gold/70 bg-navy-deep" : "border-ivory/15 bg-navy-deep/50 hover:border-gold/50"
        }`;

        // On wide screens the diagram moves beside the copy of the active panel, where the
        // panel is wide enough to show it without cropping and the space is otherwise dead.
        const body: ReactNode = (
          <>
            <span className="flex min-w-0 flex-1 flex-col">{inner}</span>
            {p.art && isActive && (
              <span data-art className="hidden shrink-0 self-start lg:block lg:w-[38%]">
                <span className="block aspect-[400/150] overflow-hidden rounded-lg border border-ivory/10">
                  <ProductArt name={p.art} />
                </span>
              </span>
            )}
          </>
        );

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
