import type { Metadata } from "next";
import Link from "next/link";
import { stages } from "@/lib/content";
import { noWidow } from "@/lib/typography";
import PageHero, { CtaBand } from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Ethora Labs | Our Approach",
  description: "A problem-first, engineering-led approach to software: how Ethora Labs moves from an unclear problem to a working, reliable system.",
  alternates: { canonical: "https://ethoralabs.co/approach/" },
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }]}
        breadcrumbCurrent="Approach"
        eyebrow="Approach"
        title="Good engineering starts with the right decisions."
        intro="We don't start with a technology choice or a deadline — we start with the problem itself. Every engagement moves through the same four stages below, each one feeding evidence into the next, so decisions stay grounded in what we've actually learned rather than what we assumed at the start."
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
                      <div className="max-w-2xl">
                        <p className="leading-relaxed text-ink">{noWidow(s.long)}</p>
                        <p className="mt-3 leading-relaxed text-muted-light">{noWidow(s.detail)}</p>
                        {/* Concrete and scannable, rather than one more paragraph of prose. */}
                        <ul className="mt-4 space-y-2.5">
                          {s.points.map((point) => (
                            <li key={point} className="flex gap-3 leading-relaxed text-muted-light">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" aria-hidden="true" />
                              {noWidow(point)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
          <p className="mt-10 border-t border-gold-deep/30 pt-6 text-muted-light">
            See how this plays out across a specific engagement on our{" "}
            <Link href="/#capabilities" className="text-gold-deep underline underline-offset-4">capability pages</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
