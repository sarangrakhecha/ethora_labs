import Link from "next/link";
import { stages } from "@/lib/content";
import { noWidow } from "@/lib/typography";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

/**
 * A short teaser, not the full write-up — that lives at /approach, which the nav
 * links to directly. The hero's circular canvas already shows these four stages in
 * detail; this is a compact third view (stage name + one line each) rather than a
 * second full copy of the same long paragraphs.
 */
export default function Approach() {
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

        <Reveal delay={100} className="mt-12">
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => (
              <li key={s.id} className="rounded-xl border border-gold-deep/25 bg-white/50 p-5">
                <span className="font-serif text-xl text-gold-deep" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-serif text-2xl leading-tight">{s.title}</h3>
                <p className="mt-2 leading-snug text-muted-light">{noWidow(s.short)}</p>
              </li>
            ))}
          </ol>
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
