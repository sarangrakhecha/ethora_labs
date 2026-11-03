import type { Metadata } from "next";
import Link from "next/link";
import { capabilities } from "@/lib/content";
import { Icon } from "@/components/Icons";
import PageHero, { CtaBand } from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Capabilities | Ethora Labs",
  description: "Software engineering, quality engineering, test automation and CI/CD, and engineering innovation — the four areas Ethora Labs works in.",
};

export default function CapabilitiesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="What we do"
        intro="Four connected areas of engineering work. Most engagements draw on more than one of them, because quality, delivery and design are rarely separate problems."
      />

      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <ul className="grid gap-5 md:grid-cols-2">
            {capabilities.map((c, i) => (
              <li key={c.id}>
                <Reveal delay={i * 70} className="h-full">
                  <Link href={`/capabilities/${c.slug}`} className="group flex h-full flex-col rounded-xl border border-ivory/15 bg-navy-deep p-7 transition-colors hover:border-gold/70">
                    <Icon name={c.icon} className="h-9 w-9 text-gold transition-transform group-hover:-translate-y-0.5" />
                    <h2 className="mt-5 font-serif text-2xl">{c.title}</h2>
                    <p className="mt-3 leading-relaxed text-muted-dark">{c.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-medium text-gold">
                      Explore <Icon name="arrow" className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-muted-dark">
            Not sure which applies? The{" "}
            <Link href="/#problems" className="text-gold underline underline-offset-4 hover:text-ivory">problem-first guide</Link>{" "}
            starts from what needs to work better instead of from a service list.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
