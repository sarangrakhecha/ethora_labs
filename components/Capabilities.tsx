"use client";
import { useEffect, useState } from "react";
import { capabilities } from "@/lib/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

// Bento layout so cards are not all identical: wide / narrow alternate.
const layout = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4"];
const tone = ["bg-navy-deep", "bg-navy-deep/50", "bg-navy-deep/50", "bg-navy-deep"];

export default function Capabilities() {
  const [openId, setOpenId] = useState<string | null>(null);

  // Open a card when linked via #cap-<id> (e.g. header dropdown).
  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(/^#cap-(.+)$/);
      if (m && capabilities.some((c) => c.id === m[1])) setOpenId(m[1]);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <section id="capabilities" className="bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl">Our Capabilities</h2>
          <span className="gold-rule mt-5" />
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          {capabilities.map((c, i) => {
            const open = openId === c.id;
            return (
              <Reveal key={c.id} delay={i * 80} className={`h-full ${layout[i]}`}>
                <article id={`cap-${c.id}`} className={`group flex h-full flex-col rounded-xl border p-6 transition-colors hover:border-gold/70 ${open ? "border-gold/70" : "border-ivory/15"} ${tone[i]}`}>
                  <Icon name={c.icon} className="h-9 w-9 text-gold transition-transform group-hover:-translate-y-0.5" />
                  <h3 className="mt-5 font-serif text-2xl">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-dark">{c.description}</p>
                  <div id={`cap-more-${c.id}`} hidden={!open} className="mt-4 border-t border-gold/30 pt-4 leading-relaxed text-ivory">{c.more}</div>
                  <button type="button" aria-expanded={open} aria-controls={`cap-more-${c.id}`} onClick={() => setOpenId(open ? null : c.id)} className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded pt-5 text-[15px] font-medium text-gold hover:text-ivory">
                    {open ? "Show less" : "Learn more"}
                    <Icon name="plus" className={`transition-transform ${open ? "rotate-45" : ""}`} />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
