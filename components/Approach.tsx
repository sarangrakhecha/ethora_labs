"use client";
import Link from "next/link";
import { useState } from "react";
import { stages } from "@/lib/content";
import { noWidow } from "@/lib/typography";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

/**
 * A short teaser, not the full write-up — that lives at /approach, which the nav
 * links to directly. The hero's circular canvas already shows these four stages in
 * detail; this is a compact third view with the same expand-on-hover motion used
 * for Capabilities and Products, adapted to this section's light background.
 */
export default function Approach() {
  const [active, setActive] = useState(0);

  return (
    <section id="approach" className="on-light bg-ivory text-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl">Our Approach</h2>
          <span className="gold-rule mt-5" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/90">
            We take a problem-first, engineering-led approach — combining thoughtful design, solid implementation, rigorous quality practices, and continuous improvement to deliver software that works, scales, and creates real value.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12 block">
          <ul className="flex flex-col gap-4 lg:h-[20rem] lg:flex-row lg:gap-3">
            {stages.map((s, i) => {
              const isActive = i === active;
              return (
                <li
                  key={s.id}
                  style={{ flexGrow: isActive ? 2.6 : 1 }}
                  className="min-w-0 transition-[flex-grow] duration-500 ease-out lg:basis-0"
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group flex h-full w-full min-w-0 flex-col rounded-xl border p-5 text-left transition-colors duration-500 ${
                      isActive ? "border-gold-deep/70 bg-white" : "border-gold-deep/25 bg-white/50 hover:border-gold-deep/50"
                    }`}
                  >
                    <span className="font-serif text-xl text-gold-deep" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-serif text-2xl leading-tight">{s.title}</h3>
                    <p className={`mt-2 leading-snug text-muted-light ${isActive ? "" : "lg:line-clamp-2"}`}>{noWidow(s.short)}</p>
                    <p
                      className={`mt-3 leading-relaxed text-ink transition-opacity duration-500 lg:border-t lg:border-gold-deep/20 lg:pt-3 ${
                        isActive ? "lg:opacity-100" : "lg:mt-0 lg:h-0 lg:overflow-hidden lg:border-0 lg:pt-0 lg:opacity-0"
                      }`}
                    >
                      {noWidow(s.long)}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={160}>
          <Link href="/approach" className="mt-10 inline-flex min-h-11 items-center gap-2 rounded text-[15px] font-medium text-gold-deep hover:text-ink">
            Read our full approach <Icon name="arrow" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
