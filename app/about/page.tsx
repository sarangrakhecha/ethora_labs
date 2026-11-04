import type { Metadata } from "next";
import Link from "next/link";
import PageHero, { CtaBand } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Ethora Labs | About",
  description: "Ethora Labs is an engineering-led technology consultancy built on ethics and ethos. Our philosophy, our values in practice, and who is behind the engineering.",
  alternates: { canonical: "https://ethoralabs.co/about/" },
};

// ETHORA \u2014 our own name, spelled out as six behaviours rather than slogans.
// The name itself comes from ethics + ethos (see the section above); this is that
// idea made concrete and checkable, not a separate framework bolted on top of it.
const culture = [
  { letter: "E", name: "Excellence", behaviour: "We build verification into development rather than bolting it on before a release." },
  { letter: "T", name: "Trust", behaviour: "We report engineering risks honestly, including when the news is unwelcome or reflects badly on our own estimate." },
  { letter: "H", name: "Humility", behaviour: "We question assumptions, including our own, and investigate alternatives before committing." },
  { letter: "O", name: "Ownership", behaviour: "We build maintainable systems and write decisions down, so the work outlives our involvement." },
  { letter: "R", name: "Rigour", behaviour: "We understand the problem before choosing a solution, and we are willing to say the problem is not what you thought." },
  { letter: "A", name: "Adaptability", behaviour: "We let what verification and real use reveal shape what we build next, rather than treating a release as a finish line." },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ethora Labs",
    legalName: "Ethora Labs Private Limited",
    url: "https://ethoralabs.co",
    slogan: "Built on Principles. Driven by Possibility.",
    description: "An engineering-led technology consultancy specialising in software engineering, quality engineering and test automation.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="About"
        title="Built on principles. Driven by possibility."
        intro="Ethora Labs is an engineering-led technology consultancy built on a simple belief: great software comes from clear thinking, strong engineering, and thoughtful execution."
      />

      {/* The name -- heading stacked above the prose (not paired side-by-side in a
          narrow column that runs out of content well before the text does). */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">The name</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
          </Reveal>
          <Reveal delay={80} className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-muted-light">
            <p>
              Ethora comes from two Greek-rooted ideas: <span className="text-ink">ethics</span> and{" "}
              <span className="text-ink">ethos</span>. Ethics is how we choose to work. Ethos is the character and
              conviction behind that choice.
            </p>
            <p>
              Together they describe the company we are trying to build: one that is trusted for how it builds, not only
              for what it builds. In a field where it is easy to overstate, we would rather be known for saying what is
              actually true about software — including when that is inconvenient.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">Our philosophy</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <Reveal delay={80} className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-muted-dark">
            <p>
              Most software problems are not really technology problems. They are problems of judgement: what to build,
              what to verify, what to leave alone, and when to say that an approach is not working.
            </p>
            <p>
              So we lead with engineering judgement rather than with tools. We would rather spend a day understanding why
              a system behaves the way it does than a week working around it. We would rather tell you that a rewrite is
              not justified than sell you one.
            </p>
            <p>
              The long-term ambition is to build technology that matters — our own products alongside our consulting
              work — and to be the kind of company engineers want to work with twice.
            </p>
            <p className="text-ivory">
              <Link href="/approach" className="text-gold underline underline-offset-4 hover:text-ivory">See how that works in practice</Link>{" "}
              in our Design, Build, Verify, Improve cycle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Culture, spelled out as our own name */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">ETHORA, as a practice</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
            <p className="mt-6 max-w-2xl text-muted-light">
              Six behaviours, not six slogans \u2014 each one spelling out our own name, and each one
              something you could actually hold us to.
            </p>
          </Reveal>
          {/* 2 or 3 columns, so six items always fill the grid exactly: 3 rows of 2, or
              2 rows of 3. No breakpoint ever leaves a trailing, uneven row. */}
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {culture.map((v, i) => (
              <li key={v.letter}>
                <Reveal delay={i * 60} className="h-full">
                  <div className="flex h-full gap-4 rounded-xl border border-gold-deep/25 bg-white/50 p-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy font-serif text-xl text-gold" aria-hidden="true">
                      {v.letter}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl leading-tight">{v.name}</h3>
                      <p className="mt-2 leading-relaxed text-muted-light">{v.behaviour}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work with clients */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">How we work with clients</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <Reveal delay={80} className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-muted-dark">
            <p>
              We treat a working relationship as a long one, even before it starts. That means answering honestly —
              including when we are not the right fit, or when you may not need us at all — and proposing a first
              step small enough for you to judge the approach on before committing to anything larger.
            </p>
            <p className="text-ivory">
              See exactly what happens when you{" "}
              <Link href="/contact" className="text-gold underline underline-offset-4 hover:text-ivory">get in touch</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founder section removed at the client's request for now.
          To restore: a heading, optional portrait (public/founder.jpg), name and role, and a
          short bio. Keep the founder's own professional experience clearly separate from
          Ethora Labs' delivery record, and publish only details the founder has confirmed. */}

      {/* Honest status */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-4 rounded-xl border border-gold-deep/30 bg-white/50 p-7 sm:flex-row sm:items-start">
            <Icon name="shield" className="h-7 w-7 shrink-0 text-gold-deep" />
            <div>
              <h2 className="font-serif text-2xl">Where we are today</h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-light">
                Ethora Labs is a new, small and senior company. We have no client logos to show you, no case studies and
                no success percentages, because inventing them would contradict the first value on this page. What we can
                show is how we think — in our{" "}
                <Link href="/#capabilities" className="text-gold-deep underline underline-offset-4">capability pages</Link>,
                the working demonstrations inside them, and the products we are building.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
