"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { problems } from "@/lib/content";
import { ButtonLink } from "./Button";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

const icons = ["layers", "check", "gear"];

export default function ProblemFirst() {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = problems[index];

  // WAI-ARIA tabs: arrow keys / Home / End move selection and focus.
  const onKey = (e: KeyboardEvent) => {
    const n = problems.length;
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setIndex(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="problems" className="on-light bg-ivory text-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl">What needs to work better?</h2>
          <span className="gold-rule mt-5 bg-gold-deep" />
          <p className="mt-6 max-w-2xl text-lg text-muted-light">Start from the problem, not the service list. Choose the one closest to where you are.</p>
        </Reveal>

        <div role="tablist" aria-label="What needs to work better?" onKeyDown={onKey} className="mt-10 grid gap-3 md:grid-cols-3">
          {problems.map((t, i) => {
            const sel = i === index;
            return (
              <button
                key={t.id} ref={(el) => { tabs.current[i] = el; }}
                role="tab" id={`tab-${t.id}`} aria-selected={sel} aria-controls={`panel-${t.id}`} tabIndex={sel ? 0 : -1}
                onClick={() => setIndex(i)}
                className={`flex items-start gap-4 rounded-xl border p-5 text-left transition-colors ${sel ? "border-navy bg-navy text-ivory" : "border-gold-deep/40 bg-white/50 hover:border-navy"}`}
              >
                <Icon name={icons[i]} className={`mt-1 h-7 w-7 shrink-0 ${sel ? "text-gold" : "text-gold-deep"}`} />
                <span>
                  <span className="block text-[17px] font-semibold">{t.label}</span>
                  <span className={`mt-1 block text-sm leading-snug ${sel ? "text-muted-dark" : "text-muted-light"}`}>{t.summary}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={`panel-${p.id}`} aria-labelledby={`tab-${p.id}`} tabIndex={0} className="mt-4 grid gap-10 rounded-xl border border-gold-deep/30 bg-white/60 p-6 md:p-10 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-2xl">Common problems</h3>
            <ul className="mt-4 space-y-3">
              {p.problems.map((x) => (
                <li key={x} className="flex gap-3 leading-relaxed text-muted-light">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" aria-hidden="true" />{x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-2xl">Relevant capabilities</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.capabilities.map((c) => <li key={c} className="rounded-full border border-navy/30 px-3 py-1 text-sm">{c}</li>)}
            </ul>
            <h3 className="mt-8 font-serif text-2xl">How an engagement typically starts</h3>
            <p className="mt-3 leading-relaxed text-muted-light">{p.start}</p>
            <ButtonLink href="#contact" variant="outline-dark" className="mt-6">Talk to us about this</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
