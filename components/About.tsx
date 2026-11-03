import Link from "next/link";
import Reveal from "./Reveal";
import { Icon } from "./Icons";

export default function About() {
  return (
    <section id="about" className="bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal>
            <h2 className="font-serif text-4xl sm:text-5xl">About Ethora</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <Reveal delay={100} className="max-w-3xl space-y-6 text-lg leading-relaxed">
            <p className="font-serif text-2xl leading-snug sm:text-3xl">
              Ethora Labs is an engineering-led technology consultancy built on a simple belief: great software comes from clear thinking, strong engineering, and thoughtful execution.
            </p>
            <p className="text-muted-dark">
              The name comes from two Greek-rooted ideas: <em className="not-italic text-ivory">ethics</em> and <em className="not-italic text-ivory">ethos</em>. Ethics is how we choose to work; ethos is the character and conviction behind it. Together they describe a company that wants to be trusted for how it builds, not only for what it builds.
            </p>
            <p className="text-muted-dark">
              Ethora Labs is a new company, founded by an engineer with a background in software quality and automation.
              We would rather say that plainly than imply a history we do not have.
            </p>
            <p>
              <Link href="/about" className="inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-gold hover:text-ivory">
                More about Ethora <Icon name="arrow" />
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
