"use client";
import { useState } from "react";
import { PROTOTYPE_STEPS, DECISIONS, type Decision } from "@/lib/demos";
import { Icon } from "../Icons";

export default function PrototypeExplorer() {
  const [index, setIndex] = useState(0);
  const [decision, setDecision] = useState<Decision>("go");
  const step = PROTOTYPE_STEPS[index];
  const isLast = index === PROTOTYPE_STEPS.length - 1;

  return (
    <div className="rounded-xl border border-gold-deep/30 bg-white/60 p-6 sm:p-8">
      {/* Step rail */}
      <ol className="flex flex-wrap gap-2">
        {PROTOTYPE_STEPS.map((s, i) => {
          const on = i === index;
          const done = i < index;
          return (
            <li key={s.id} className="flex items-center gap-2">
              <button type="button" aria-current={on ? "step" : undefined} onClick={() => setIndex(i)}
                className={`min-h-11 rounded-md border px-3 text-sm transition-colors ${
                  on ? "border-navy bg-navy text-ivory" : done ? "border-gold-deep/50 text-gold-deep" : "border-gold-deep/30 text-muted-light hover:border-navy"}`}>
                <span className="tabular-nums">{i + 1}.</span> {s.name}
              </button>
              {i < PROTOTYPE_STEPS.length - 1 && <span aria-hidden="true" className="hidden h-px w-3 bg-gold-deep/40 sm:block" />}
            </li>
          );
        })}
      </ol>

      <div aria-live="polite" className="mt-7 rounded-lg border border-gold-deep/25 bg-white/70 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">Step {index + 1} of {PROTOTYPE_STEPS.length}</p>
        <h4 className="mt-2 font-serif text-2xl">{step.name}</h4>
        <p className="mt-1 font-serif text-lg italic text-muted-light">{step.question}</p>
        <p className="mt-4 leading-relaxed text-muted-light">{step.body}</p>
        <p className="mt-5 flex items-start gap-2 border-t border-gold-deep/20 pt-4 text-ink">
          <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
          <span><span className="font-medium">What it produces:</span> {step.output}</span>
        </p>

        {isLast && (
          <div className="mt-6 border-t border-gold-deep/20 pt-5">
            <fieldset>
              <legend className="text-sm font-medium">Which way does the evidence point?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {(Object.keys(DECISIONS) as Decision[]).map((d) => (
                  <button key={d} type="button" aria-pressed={decision === d} onClick={() => setDecision(d)}
                    className={`min-h-11 rounded-md border px-4 text-[15px] transition-colors ${decision === d ? "border-navy bg-navy text-ivory" : "border-gold-deep/40 hover:border-navy"}`}>
                    {DECISIONS[d].label}
                  </button>
                ))}
              </div>
            </fieldset>
            <p className="mt-4 leading-relaxed text-muted-light">{DECISIONS[decision].body}</p>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}
          className="min-h-11 rounded-md border border-navy/40 px-5 text-[15px] font-medium transition-colors hover:bg-navy hover:text-ivory disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink">
          Previous
        </button>
        <button type="button" onClick={() => setIndex((i) => Math.min(PROTOTYPE_STEPS.length - 1, i + 1))} disabled={isLast}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-navy px-5 text-[15px] font-medium text-ivory transition-colors hover:bg-navy-deep disabled:opacity-40">
          Next step <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}
