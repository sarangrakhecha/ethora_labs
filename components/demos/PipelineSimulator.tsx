"use client";
import { useState } from "react";
import { PIPELINE_STAGES, SCENARIOS, reachedStages, type StageStatus } from "@/lib/demos";
import { Icon } from "../Icons";

const tone: Record<StageStatus, { dot: string; ring: string; label: string }> = {
  pass: { dot: "bg-[#8fbf9f]", ring: "border-[#8fbf9f]/50", label: "Passed" },
  fail: { dot: "bg-[#e0a0a0]", ring: "border-[#e0a0a0]/70", label: "Failed" },
  unstable: { dot: "bg-gold", ring: "border-gold/70", label: "Unstable" },
  blocked: { dot: "bg-slate", ring: "border-ivory/20", label: "Not run" },
  pending: { dot: "bg-slate", ring: "border-ivory/20", label: "Pending" },
};

export default function PipelineSimulator() {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [stageId, setStageId] = useState<string | null>(null);
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const reached = reachedStages(scenario);
  const selected = stageId ? PIPELINE_STAGES.find((s) => s.id === stageId) : null;
  const selectedState = selected ? scenario.stages[selected.id] : null;

  return (
    <div className="rounded-xl border border-ivory/15 bg-navy-deep p-6 sm:p-8">
      <fieldset>
        <legend className="text-sm font-medium text-muted-dark">Choose a scenario</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SCENARIOS.map((s) => {
            const on = s.id === scenarioId;
            return (
              <button key={s.id} type="button" aria-pressed={on}
                onClick={() => { setScenarioId(s.id); setStageId(null); }}
                className={`min-h-11 rounded-md border px-4 text-[15px] transition-colors ${on ? "border-gold bg-gold/15 text-ivory" : "border-ivory/25 text-muted-dark hover:border-gold/60 hover:text-ivory"}`}>
                {s.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-5 text-muted-dark">{scenario.summary}</p>

      <ol className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {PIPELINE_STAGES.map((stage, i) => {
          const state = scenario.stages[stage.id];
          const t = tone[state.status];
          const dim = !reached.includes(stage.id);
          const on = stageId === stage.id;
          return (
            <li key={stage.id}>
              <button type="button" aria-expanded={on} aria-controls="pipeline-detail"
                onClick={() => setStageId(on ? null : stage.id)}
                className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-colors ${on ? "border-gold bg-navy" : `${t.ring} bg-navy/60 hover:border-gold/60`} ${dim ? "opacity-55" : ""}`}>
                <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${t.dot}`} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-slate">Stage {i + 1}</span>
                  <span className="block font-medium">{stage.name}</span>
                  <span className="mt-0.5 block text-sm text-muted-dark">{t.label}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div id="pipeline-detail" aria-live="polite" className="mt-5">
        {selected && selectedState ? (
          <div className="rounded-lg border border-gold/40 bg-navy p-5">
            <h4 className="font-medium">{selected.name} — {tone[selectedState.status].label}</h4>
            <p className="mt-2 text-muted-dark">{selectedState.note}</p>
            <p className="mt-3 border-t border-ivory/10 pt-3 text-sm text-slate">What this stage is for: {selected.what}</p>
          </div>
        ) : (
          <p className="text-sm text-slate">Select a stage to see what happened and why.</p>
        )}
      </div>

      <div className="mt-6 rounded-lg border border-ivory/15 bg-navy p-5">
        <h4 className="font-serif text-xl text-gold">{scenario.verdict.headline}</h4>
        <p className="mt-2 leading-relaxed text-muted-dark">{scenario.verdict.body}</p>
        {scenario.investigate.length > 0 && (
          <>
            <h5 className="mt-5 text-sm font-medium uppercase tracking-wider text-slate">How to investigate</h5>
            <ol className="mt-3 space-y-2">
              {scenario.investigate.map((step, i) => (
                <li key={step} className="flex gap-3 text-muted-dark">
                  <span className="font-serif text-gold" aria-hidden="true">{i + 1}.</span>{step}
                </li>
              ))}
            </ol>
          </>
        )}
        <p className="mt-5 flex items-start gap-2 border-t border-gold/20 pt-4 text-ivory">
          <Icon name="bulb" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />{scenario.lesson}
        </p>
      </div>
    </div>
  );
}
