import Link from "next/link";
import { capabilities } from "@/lib/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

// Bento layout so cards are not all identical: wide / narrow alternate.
const layout = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4"];
const tone = ["bg-navy-deep", "bg-navy-deep/50", "bg-navy-deep/50", "bg-navy-deep"];

export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl">Our Capabilities</h2>
            <span className="gold-rule mt-5" />
          </div>
          <Link href="/capabilities" className="inline-flex min-h-11 items-center gap-2 rounded text-[15px] font-medium text-gold hover:text-ivory">
            View all capabilities <Icon name="arrow" />
          </Link>
        </Reveal>
        <ul className="mt-12 grid gap-4 lg:grid-cols-6">
          {capabilities.map((c, i) => (
            <li key={c.id} className={layout[i]}>
              <Reveal delay={i * 80} className="h-full">
                <Link href={`/capabilities/${c.slug}`} className={`group flex h-full flex-col rounded-xl border border-ivory/15 p-6 transition-colors hover:border-gold/70 ${tone[i]}`}>
                  <Icon name={c.icon} className="h-9 w-9 text-gold transition-transform group-hover:-translate-y-0.5" />
                  <h3 className="mt-5 font-serif text-2xl">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-dark">{c.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 self-start pt-5 text-[15px] font-medium text-gold">
                    Explore <Icon name="arrow" className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
