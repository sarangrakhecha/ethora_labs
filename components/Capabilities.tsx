"use client";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/services";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

/**
 * Desktop: four panels in a row. The active one grows and reveals its detail while the
 * others shrink, so the row stays the same width with no dead space. Hover or keyboard
 * focus sets the active panel; clicking opens the full capability page.
 * Mobile: a plain stacked list — no width animation to fight with.
 */
export default function Capabilities() {
  const [active, setActive] = useState(0);
  const capabilities = services;

  return (
    <section id="capabilities" className="bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl">Our Capabilities</h2>
          <span className="gold-rule mt-5" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-dark">
            Four connected areas of engineering work. Most engagements draw on more than one.
          </p>

        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-12 flex flex-col gap-4 lg:h-[24rem] xl:h-[22.5rem] lg:flex-row lg:gap-3">
            {capabilities.map((c, i) => {
              const isActive = i === active;
              return (
                <li
                  key={c.slug}
                  style={{ flexGrow: isActive ? 2.6 : 1 }}
                  className="min-w-0 transition-[flex-grow] duration-500 ease-out lg:basis-0"
                >
                  <Link
                    href={`/services/${c.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border p-6 transition-colors duration-500 ${
                      isActive ? "border-gold/70 bg-navy-deep" : "border-ivory/15 bg-navy-deep/50 hover:border-gold/50"
                    }`}
                  >
                    <Icon name={["laptop","shield","loop","bulb"][i]} className="h-9 w-9 shrink-0 text-gold" />
                    <h3 className="mt-5 font-serif text-2xl leading-tight">{c.nav.label}</h3>
                    {/* Narrow panels clamp the description so "Explore" always stays in view. */}
                    <p className={`mt-3 leading-relaxed text-muted-dark ${isActive ? "" : "lg:line-clamp-3"}`}>{c.nav.description}</p>

                    {/* Detail: always visible on mobile, revealed with the active panel on desktop */}
                    <p
                      className={`mt-4 leading-relaxed text-ivory transition-opacity duration-500 font-serif text-lg italic lg:border-t lg:border-gold/30 lg:pt-4 ${
                        isActive ? "lg:opacity-100" : "lg:mt-0 lg:h-0 lg:overflow-hidden lg:border-0 lg:pt-0 lg:opacity-0"
                      }`}
                    >
                      {c.headline}
                    </p>

                    <span className="mt-auto inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap pt-5 text-[15px] font-medium text-gold">
                      Explore service <Icon name="arrow" className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
