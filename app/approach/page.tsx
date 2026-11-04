import type { Metadata } from "next";
import Link from "next/link";
import { stages } from "@/lib/content";
import { noWidow } from "@/lib/typography";
import PageHero, { CtaBand } from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Ethora Labs | Our Approach",
  description: "A problem-first, engineering-led approach: Design, Build, Verify, Improve. How we work, step by step, and why the cycle repeats.",
  alternates: { canonical: "https://ethoralabs.co/approach/" },
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }]}
        eyebrow="Approach"
        title="Design. Build. Verify. Improve."
        intro="We take a problem-first, engineering-led approach — combining thoughtful design, solid implementation, rigorous quality practices, and continuous improvement to deliver software that works, scales, and creates real value."
      />

      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          {/* Equal-height rows for every step but the last, so the circles stay evenly
              spaced even when one description wraps to an extra line. */}
          <ol className="grid" style={{ gridTemplateRows: `repeat(${stages.length - 1}, 1fr) auto` }}>
            {stages.map((s, i) => {
              const last = i === stages.length - 1;
              return (
                <li key={s.id} className="grid grid-cols-[2.5rem_1fr] gap-x-5 sm:grid-cols-[3rem_1fr] sm:gap-x-8">
                  <div className="flex flex-col items-center" aria-hidden="true">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-deep bg-ivory font-serif text-lg text-gold-deep sm:h-12 sm:w-12 sm:text-xl">{i + 1}</span>
                    {!last && <span className="w-px flex-1 bg-gold-deep/40" />}
                  </div>
                  <Reveal className={last ? "" : "pb-12"}>
                    <div className="grid gap-2 md:grid-cols-[14rem_1fr] md:gap-10">
                      <div>
                        <h2 className="font-serif text-3xl leading-tight">{s.title}</h2>
                        <p className="mt-1 text-sm font-medium text-gold-deep">{noWidow(s.short)}</p>
                      </div>
                      <p className="max-w-2xl leading-relaxed text-muted-light">{noWidow(`${s.long} ${s.detail}`)}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
          <p className="mt-10 border-t border-gold-deep/30 pt-6 text-muted-light">
            Then the cycle repeats: what we learn in Improve shapes the next Design.
          </p>
          <p className="mt-6 text-muted-light">
            See how this plays out across a specific engagement on our{" "}
            <Link href="/services" className="text-gold-deep underline underline-offset-4">capability pages</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
