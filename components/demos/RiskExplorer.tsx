"use client";
import { useState } from "react";
import { riskScore, RISK_PRESETS, type RiskInput } from "@/lib/demos";

const bandTone = {
  critical: "border-[#e0a0a0]/70 text-[#f0b4b4]",
  high: "border-gold/70 text-gold",
  moderate: "border-ivory/30 text-ivory",
  low: "border-ivory/20 text-muted-dark",
} as const;

const sliders: { key: keyof RiskInput; label: string; min: number; max: number; help: string; suffix?: string }[] = [
  { key: "impact", label: "Failure impact", min: 1, max: 5, help: "How much damage if this breaks?" },
  { key: "probability", label: "Probability", min: 1, max: 5, help: "How likely is it to break?" },
  { key: "usage", label: "Usage frequency", min: 1, max: 5, help: "How often is it used?" },
  { key: "coverage", label: "Existing coverage", min: 0, max: 100, help: "How much is already tested?", suffix: "%" },
];

export default function RiskExplorer() {
  const [input, setInput] = useState<RiskInput>(RISK_PRESETS[0].input);
  const [presetId, setPresetId] = useState<string | null>(RISK_PRESETS[0].id);
  const result = riskScore(input);
  const preset = RISK_PRESETS.find((p) => p.id === presetId);

  const set = (k: keyof RiskInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((v) => ({ ...v, [k]: Number(e.target.value) }));
    setPresetId(null); // values are now the reader's own
  };

  return (
    <div className="rounded-xl border border-gold-deep/30 bg-white/60 p-6 sm:p-8">
      <fieldset>
        <legend className="text-sm font-medium text-muted-light">Start from an example</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {RISK_PRESETS.map((p) => {
            const on = p.id === presetId;
            return (
              <button key={p.id} type="button" aria-pressed={on}
                onClick={() => { setInput(p.input); setPresetId(p.id); }}
                className={`min-h-11 rounded-md border px-4 text-[15px] transition-colors ${on ? "border-navy bg-navy text-ivory" : "border-gold-deep/40 hover:border-navy"}`}>
                {p.name}
              </button>
            );
          })}
        </div>
      </fieldset>
      {preset && <p className="mt-3 text-sm text-muted-light">{preset.note}</p>}

      <div className="mt-7 grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          {sliders.map((s) => (
            <div key={s.key}>
              <label htmlFor={`risk-${s.key}`} className="flex items-baseline justify-between gap-3">
                <span className="font-medium">{s.label}</span>
                <span className="font-mono text-sm tabular-nums text-gold-deep">{input[s.key]}{s.suffix ?? ` / ${s.max}`}</span>
              </label>
              <input id={`risk-${s.key}`} type="range" min={s.min} max={s.max} value={input[s.key]}
                onChange={set(s.key)} aria-describedby={`risk-${s.key}-help`}
                className="mt-2 w-full accent-[#7a5f33]" />
              <p id={`risk-${s.key}-help`} className="mt-1 text-sm text-muted-light">{s.help}</p>
            </div>
          ))}
        </div>

        <div>
          <div aria-live="polite" className={`rounded-lg border-2 bg-white/70 p-6 ${bandTone[result.band]}`}>
            <p className="text-xs font-medium uppercase tracking-[0.2em]">Testing priority</p>
            <p className="mt-2 font-serif text-5xl tabular-nums text-ink">{result.priority}</p>
            <p className="mt-1 font-medium capitalize text-ink">{result.band}</p>
            <p className="mt-4 leading-relaxed text-muted-light">{result.advice}</p>
          </div>

          {/* The arithmetic stays visible on purpose. */}
          <div className="mt-5 rounded-lg border border-gold-deep/25 bg-white/40 p-5 text-sm text-muted-light">
            <p className="font-medium text-ink">How this number is produced</p>
            <p className="mt-2 font-mono text-[13px] leading-relaxed">
              exposure = impact × probability × usage = <span className="text-gold-deep">{result.exposure}</span>
              <br />priority = exposure × (1 − coverage) = <span className="text-gold-deep">{result.priority}</span>
            </p>
            <p className="mt-3">
              Deliberately crude, and shown rather than hidden. It is a way to structure a conversation about where testing
              effort should go — not a measurement, and not a prediction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
