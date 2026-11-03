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

// Values expressed as behaviours rather than slogans.
const values = [
  { name: "Integrity", behaviour: "We report engineering risks honestly, including when the news is unwelcome or reflects badly on our own estimate." },
  { name: "Quality", behaviour: "We build verification into development rather than bolting it on before a release." },
  { name: "Intelligence", behaviour: "We understand the problem before choosing a solution, and we are willing to say the problem is not what you thought." },
  { name: "Curiosity", behaviour: "We question assumptions, including our own, and investigate alternatives before committing." },
  { name: "Ownership", behaviour: "We build maintainable systems and write decisions down, so the work outlives our involvement." },
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

      {/* The name */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">The name</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
          </Reveal>
          <Reveal delay={80} className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted-light">
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">Our philosophy</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <Reveal delay={80} className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted-dark">
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
              <Link href="/#approach" className="text-gold underline underline-offset-4 hover:text-ivory">See how that works in practice</Link>{" "}
              in our Design, Build, Verify, Improve cycle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values as behaviours */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">What our values look like in practice</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
            <p className="mt-6 max-w-2xl text-muted-light">
              Values are only worth stating if they describe a behaviour someone could hold you to.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.name}>
                <Reveal delay={i * 60} className="h-full">
                  <div className="h-full rounded-xl border border-gold-deep/25 bg-white/50 p-6">
                    <h3 className="font-serif text-2xl">{v.name}</h3>
                    <p className="mt-3 leading-relaxed text-muted-light">{v.behaviour}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Founder — personal background, kept separate from company history */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">Who is behind the engineering</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 grid gap-8 rounded-xl border border-ivory/15 bg-navy-deep p-7 sm:p-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
              <div>
                {/* TODO(founder-photo): add a portrait at public/founder.jpg and render it here. */}
                <div className="flex h-32 w-32 items-center justify-center rounded-full border border-gold/40 bg-navy font-serif text-4xl text-gold" aria-hidden="true">SR</div>
                <h3 className="mt-6 font-serif text-2xl">Sarang Rakhecha</h3>
                <p className="mt-1 text-sm uppercase tracking-wider text-gold">Founder</p>
                {/* TODO(founder-links): add LinkedIn / GitHub when ready. */}
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-muted-dark">
                <p>
                  Ethora Labs was founded by Sarang Rakhecha, whose background is in software quality, testing and
                  automation — built working with engineering teams at{" "}
                  <span className="text-ivory">Apple</span>, <span className="text-ivory">Qualtrics</span> and{" "}
                  <span className="text-ivory">NetApp</span>.
                </p>
                <p className="rounded-lg border border-ivory/15 bg-navy p-5 text-base">
                  <span className="font-medium text-ivory">A deliberate distinction:</span> that is personal
                  professional experience. It is not a delivery record for Ethora Labs, and nothing on this site should
                  be read as client work done by the company.
                </p>
                <p>
                  Ethora Labs itself is new. We would rather say that plainly than imply a history we do not have. What
                  we offer from the start is a clear way of working, the engineering discipline behind it, and the
                  judgement that comes from having seen how software fails in large organisations.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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
                <Link href="/services" className="text-gold-deep underline underline-offset-4">capability pages</Link>,
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
