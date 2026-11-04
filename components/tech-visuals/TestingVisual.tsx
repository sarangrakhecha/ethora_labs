// Testing & QA technologies: deterministic, illustrative demonstrations -- no real
// browser session or external service is involved, and the node-test example is
// traced directly from this site's own, real lib/demos.ts logic and unit suite.

const BROWSER_STEPS = [
  { action: "Navigate to /services/test-automation/", result: "Page loaded" },
  { action: "Click the “Flaky test” scenario", result: "Scenario switched" },
  { action: "Assert the verdict reads “The test is wrong”", result: "Passed" },
];

const ASSERTIONS = [
  { expr: "riskScore(maxImpact, 0% coverage).band", expect: "\"critical\"" },
  { expr: "riskScore(maxImpact, 100% coverage).priority", expect: "0" },
  { expr: "reachedStages(infrastructureFailure)", expect: "[commit, build, unit, integration]" },
];

export default function TestingVisual({ id }: { id: string }) {
  if (id === "playwright") {
    return (
      <div>
        <p className="text-sm text-slate">An illustrative browser session — no live test is actually running</p>
        <div className="mt-3 overflow-hidden rounded-lg border border-ivory/15">
          <div className="flex items-center gap-1.5 border-b border-ivory/10 bg-navy px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-ivory/20" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-ivory/20" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-ivory/20" aria-hidden="true" />
          </div>
          <ul className="divide-y divide-ivory/10">
            {BROWSER_STEPS.map((s) => (
              <li key={s.action} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <span className="font-mono text-sm text-ivory/90">{s.action}</span>
                <span className="shrink-0 rounded-full border border-[#8fbf9f]/50 bg-[#8fbf9f]/10 px-2 py-0.5 text-xs text-[#8fbf9f]">{s.result}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // node-test
  return (
    <div>
      <p className="text-sm text-slate">Traced from this site&rsquo;s own unit suite (tests/unit.test.mjs)</p>
      <div className="mt-3 rounded-lg border border-ivory/15 bg-navy p-4">
        <ul className="space-y-2.5">
          {ASSERTIONS.map((a) => (
            <li key={a.expr} className="flex flex-wrap items-center gap-2 font-mono text-[13px]">
              <span className="text-ivory/90">{a.expr}</span>
              <span className="text-slate">&rarr;</span>
              <span className="text-gold">{a.expect}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
