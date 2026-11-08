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
              Ethora Labs is an engineering-led technology consultancy. We build and maintain web applications and APIs, design test strategy and automation, and tune CI/CD pipelines — work we document and hand off cleanly, not just ship.
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
