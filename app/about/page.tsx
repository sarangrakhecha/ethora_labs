import type { Metadata } from "next";
import Link from "next/link";
import PageHero, { CtaBand } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { engagementSteps } from "@/lib/content";
import HeroMark from "@/components/about-visuals/HeroMark";
import NameMark from "@/components/about-visuals/NameMark";

// Three concepts the philosophy paragraph below already names (judgement, engineering
// rigour, honesty) -- made visible as a band rather than left as unbroken prose.
const principles = [
  { icon: "bulb", title: "Clear thinking", body: "Understand the real problem before proposing the answer." },
  { icon: "code", title: "Engineering rigour", body: "Build for maintainability, quality and considered trade-offs." },
  { icon: "shield", title: "Honest assessment", body: "Make uncertainty and risk visible, even when inconvenient." },
] as const;

export const metadata: Metadata = {
  title: "Ethora Labs | About",
  description: "Ethora Labs is an engineering-led technology consultancy built on ethics and ethos. Our philosophy, our values in practice, and who is behind the engineering.",
  alternates: { canonical: "https://ethoralabs.co/about/" },
};

// ETHORA — our own name, spelled out as six behaviours rather than slogans.
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
  // Organization JSON-LD already lives once, sitewide, in app/layout.tsx -- this page
  // doesn't repeat it, to avoid two structured-data blocks describing the same entity.
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built on principles. Driven by possibility."
        intro="Ethora Labs is an engineering-led technology consultancy built on a simple belief: great software comes from clear thinking, strong engineering, and thoughtful execution."
        aside={<HeroMark />}
      />

      {/* The name -- prose beside a large typographic treatment of the wordmark itself,
          using the full width instead of a short heading over empty space. */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">The name</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted-light">
              <p>
                Ethora comes from two Greek-rooted ideas: <span className="text-ink">ethics</span> and{" "}
                <span className="text-ink">ethos</span>. Ethics is how we choose to work. Ethos is the character and
                conviction behind that choice.
              </p>
              <p>
                Together they describe the company we are trying to build: one that is trusted for how it builds, not
                only for what it builds. In a field where it is easy to overstate, we would rather be known for saying
                what is actually true about software — including when that is inconvenient.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <NameMark />
          </Reveal>
        </div>
      </section>

      {/* Philosophy -- the intro pairs with the heading at the top, then an unboxed band
          makes visible three concepts the prose already names (judgement, engineering
          rigour, honesty) before the remaining prose continues below. */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl">Our philosophy</h2>
              <span className="gold-rule mt-5" />
            </div>
            <p className="text-lg leading-relaxed text-muted-dark">
              Most software problems are not really technology problems. They are problems of judgement: what to
              build, what to verify, what to leave alone, and when to say that an approach is not working.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-12 grid gap-8 border-y border-gold/20 py-10 sm:grid-cols-3">
            {principles.map((p, i) => (
              <div key={p.title} className={i > 0 ? "sm:border-l sm:border-gold/20 sm:pl-8" : ""}>
                <Icon name={p.icon} className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-serif text-2xl">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-dark">{p.body}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={120} className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-dark">
            <p>
              So we lead with engineering judgement rather than with tools. We would rather spend a day understanding
              why a system behaves the way it does than a week working around it. We would rather tell you that a
              rewrite is not justified than sell you one.
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
              Six behaviours, not six slogans — each one spelling out our own name, and each one
              something you could actually hold us to.
            </p>
          </Reveal>
          {/* 2 or 3 columns, so six items always fill the grid exactly: 3 rows of 2, or
              2 rows of 3. No breakpoint ever leaves a trailing, uneven row. */}
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {culture.map((v, i) => (
              <li key={v.letter}>
                <Reveal delay={i * 60} className="h-full">
                  <div className="h-full rounded-xl border border-gold-deep/25 bg-white/50 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-deep/60 hover:bg-white/80">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy font-serif text-xl text-gold" aria-hidden="true">
                      {v.letter}
                    </span>
                    <h3 className="mt-5 font-serif text-2xl leading-tight">{v.name}</h3>
                    <p className="mt-2 leading-relaxed text-muted-light">{v.behaviour}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work with clients -- paired with the same real engagement sequence
          published on /contact/, not a separately invented "process". */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl">How we work with clients</h2>
              <span className="gold-rule mt-5" />
            </div>
            <p className="text-lg leading-relaxed text-muted-dark">
              We treat a working relationship as a long one, even before it starts. That means answering honestly —
              including when we are not the right fit, or when you may not need us at all — and proposing a first
              step small enough for you to judge the approach on before committing to anything larger.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-12 grid gap-8 border-y border-ivory/15 py-10 sm:grid-cols-3">
            {engagementSteps.map((s, i) => (
              <div key={s.t} className={i > 0 ? "sm:border-l sm:border-ivory/15 sm:pl-8" : ""}>
                <span className="font-serif text-xl text-gold tabular-nums" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-serif text-2xl">{s.t}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-dark">{s.b}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={120} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Have a challenge in mind?</p>
              <p className="mt-2 max-w-md font-serif text-2xl text-ivory">See exactly what happens when you get in touch.</p>
            </div>
            <Link href="/contact" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-5 py-2.5 text-[15px] font-medium text-navy-deep transition-colors hover:bg-[#d4b98f]">
              Start a conversation <Icon name="arrow" />
            </Link>
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
