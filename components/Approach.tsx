import { stages } from "@/lib/content";
import Reveal from "./Reveal";

export default function Approach() {
  return (
    <section id="approach" className="on-light bg-ivory text-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal>
            <h2 className="font-serif text-4xl sm:text-5xl">Our Approach</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-3xl text-lg leading-relaxed text-ink/90">
              We take a problem-first, engineering-led approach — combining thoughtful design, solid implementation, rigorous quality practices, and continuous improvement to deliver software that works, scales, and creates real value.
            </p>
          </Reveal>
        </div>

        {/* Numbered timeline: deliberately different from the hero's circular canvas */}
        <ol className="relative mt-14 border-l border-gold-deep/40 pl-8 sm:pl-12">
          {stages.map((s, i) => (
            <li key={s.id} className="relative pb-12 last:pb-0">
              <Reveal>
                <span className="absolute -left-[2.95rem] top-0 flex h-10 w-10 items-center justify-center rounded-full border border-gold-deep bg-ivory font-serif text-lg text-gold-deep sm:-left-[4.15rem] sm:h-12 sm:w-12 sm:text-xl" aria-hidden="true">{i + 1}</span>
                <div className="grid gap-2 md:grid-cols-[14rem_1fr] md:gap-10">
                  <div>
                    <h3 className="font-serif text-3xl">{s.title}</h3>
                    <p className="mt-1 text-sm font-medium text-gold-deep">{s.short}</p>
                  </div>
                  <p className="max-w-2xl leading-relaxed text-muted-light">{s.long} {s.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-10 border-t border-gold-deep/30 pt-6 text-muted-light">Then the cycle repeats: what we learn in Improve shapes the next Design.</p>
      </div>
    </section>
  );
}
