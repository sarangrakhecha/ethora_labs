import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import PageHero, { CtaBand } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Ethora Labs | Engineering Capabilities",
  description: "Software engineering, quality engineering, test automation and CI/CD, and engineering innovation. The four areas Ethora Labs works in.",
  alternates: { canonical: "https://ethoralabs.co/services/" },
};

export default function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="What we do"
        intro="Four connected areas of engineering work. Most engagements draw on more than one, because quality, delivery and design are rarely separate problems."
      />
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <ul className="grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Reveal delay={i * 70} className="h-full">
                  <Link href={`/services/${s.slug}`} className="group flex h-full flex-col rounded-xl border border-ivory/15 bg-navy-deep p-7 transition-colors hover:border-gold/70">
                    <h2 className="font-serif text-2xl">{s.nav.label}</h2>
                    <p className="mt-2 font-serif text-lg italic text-gold">{s.headline}</p>
                    <p className="mt-4 leading-relaxed text-muted-dark">{s.nav.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-medium text-gold">
                      Explore service <Icon name="arrow" className="transition-transform group-hover:translate-x-0.5" />
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
