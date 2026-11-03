import { noWidow } from "./typography.ts";

/**
 * Pure logic behind the interactive demonstrations on the service pages.
 * Kept free of React so it can be unit-tested directly (see tests/unit.test.mjs).
 * Everything here is illustrative teaching material — not a prediction engine,
 * not a real pipeline, and not derived from any client's systems.
 */

/* ---------------------------------------------------------------- CI pipeline */

export type StageId = "commit" | "build" | "unit" | "integration" | "ui" | "release";
export type StageStatus = "pass" | "fail" | "unstable" | "blocked" | "pending";

export const PIPELINE_STAGES: { id: StageId; name: string; what: string }[] = [
  { id: "commit", name: "Code commit", what: "A change lands on a branch and triggers the pipeline." },
  { id: "build", name: "Build", what: "The application is compiled and packaged. Nothing else can run until this succeeds." },
  { id: "unit", name: "Unit tests", what: "Fast, isolated checks on individual pieces of logic." },
  { id: "integration", name: "Integration tests", what: "Components are exercised together, usually against real dependencies or close stand-ins." },
  { id: "ui", name: "UI regression", what: "End-to-end journeys through the running application, in a browser." },
  { id: "release", name: "Release decision", what: "A human or a rule decides whether this build is fit to ship." },
];

export type Scenario = {
  id: string;
  name: string;
  summary: string;
  stages: Record<StageId, { status: StageStatus; note: string }>;
  verdict: { headline: string; body: string };
  investigate: string[];
  /** The point the scenario is there to teach. */
  lesson: string;
};

export const SCENARIOS: Scenario[] = [
  {
    id: "success",
    name: "Clean run",
    summary: "Everything passes and the build is a genuine release candidate.",
    stages: {
      commit: { status: "pass", note: "Change picked up from the branch." },
      build: { status: "pass", note: "Compiled and packaged without errors." },
      unit: { status: "pass", note: "All unit tests passed on the first attempt." },
      integration: { status: "pass", note: "Services talked to each other as expected." },
      ui: { status: "pass", note: "Critical journeys completed end to end." },
      release: { status: "pass", note: "No blocking signals. The decision is a judgement call, not an automatic yes." },
    },
    verdict: { headline: "Green, and worth trusting", body: "A green pipeline is only as meaningful as what it actually covers. The useful question after a clean run is not “did it pass?” but “would this have caught the failure we care about?”" },
    investigate: [],
    lesson: "Green means nothing failed — not that everything was checked.",
  },
  {
    id: "regression",
    name: "Real product regression",
    summary: "A genuine defect was introduced and the suite caught it.",
    stages: {
      commit: { status: "pass", note: "Change picked up from the branch." },
      build: { status: "pass", note: "Compiled and packaged without errors." },
      unit: { status: "pass", note: "Unit tests passed — the fault only appears once components interact." },
      integration: { status: "fail", note: "A downstream call now receives a field in the wrong shape." },
      ui: { status: "blocked", note: "Not run. There is no point exercising the UI on a build already known to be broken." },
      release: { status: "blocked", note: "Blocked. This is the pipeline doing its job." },
    },
    verdict: { headline: "The product is broken, not the test", body: "The failure is reproducible, points at a specific change, and fails for the same reason every time. That is the signature of a real defect." },
    investigate: [
      "Re-run the failing test alone to confirm it fails consistently",
      "Read the diff for the change that triggered the run",
      "Check whether the contract between the two components changed",
      "Reproduce locally before proposing a fix",
    ],
    lesson: "A failure that reproduces reliably and points at a recent change is usually the product, not the suite.",
  },
  {
    id: "flaky",
    name: "Flaky test",
    summary: "The same build passes and fails without any change to the product.",
    stages: {
      commit: { status: "pass", note: "Change picked up from the branch." },
      build: { status: "pass", note: "Compiled and packaged without errors." },
      unit: { status: "pass", note: "All unit tests passed." },
      integration: { status: "pass", note: "All integration tests passed." },
      ui: { status: "unstable", note: "One journey failed, then passed on retry with no code change — a timing assumption, not a defect." },
      release: { status: "unstable", note: "Technically green after a retry, which is exactly why flakiness is dangerous." },
    },
    verdict: { headline: "The test is wrong, not the product", body: "A test that changes its answer without the product changing is giving you no information. Left alone, it trains the team to re-run until green — and that habit is what lets real failures through." },
    investigate: [
      "Run the test repeatedly on an unchanged build to measure how often it fails",
      "Look for waits tied to fixed delays rather than to a condition",
      "Check for shared state or ordering assumptions between tests",
      "Fix or quarantine it — never normalise the retry",
    ],
    lesson: "Retrying until green is not a fix. It is how teams stop believing their own tests.",
  },
  {
    id: "infra",
    name: "Infrastructure failure",
    summary: "The pipeline failed for reasons that have nothing to do with the code.",
    stages: {
      commit: { status: "pass", note: "Change picked up from the branch." },
      build: { status: "pass", note: "Compiled and packaged without errors." },
      unit: { status: "pass", note: "All unit tests passed." },
      integration: { status: "fail", note: "The test environment could not be reached. No assertion was ever evaluated." },
      ui: { status: "blocked", note: "Not run." },
      release: { status: "blocked", note: "Blocked, but the build itself has not been judged either way." },
    },
    verdict: { headline: "Nothing was proven about the product", body: "This run tells you the environment was unavailable. It is neither evidence that the change is good nor that it is bad, and it should not be recorded as a product failure." },
    investigate: [
      "Confirm the failure is environmental — no assertion ran",
      "Check dependency and environment availability at the time of the run",
      "Re-run once the environment is healthy",
      "Track these separately so they do not pollute product failure rates",
    ],
    lesson: "Separate 'the product failed' from 'the pipeline could not run'. Mixing them hides both.",
  },
];

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

/** Stages up to and including the first blocking failure; the rest never execute. */
export function reachedStages(scenario: Scenario): StageId[] {
  const out: StageId[] = [];
  for (const stage of PIPELINE_STAGES) {
    const st = scenario.stages[stage.id].status;
    if (st === "blocked") break;
    out.push(stage.id);
  }
  return out;
}

/* ------------------------------------------------------------ risk-based testing */

export type RiskInput = { impact: number; probability: number; usage: number; coverage: number };
export type RiskResult = { exposure: number; priority: number; band: "low" | "moderate" | "high" | "critical"; advice: string };

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/**
 * Deliberately simple and fully visible to the reader: exposure is how much it would
 * matter, priority is how much of that is still unguarded by existing tests.
 * This is a way of structuring a conversation, not a measurement.
 */
export function riskScore({ impact, probability, usage, coverage }: RiskInput): RiskResult {
  const i = clamp(impact, 1, 5), p = clamp(probability, 1, 5), u = clamp(usage, 1, 5);
  const c = clamp(coverage, 0, 100);
  const exposure = Math.round(((i * p * u) / 125) * 100);
  const priority = Math.round(exposure * (1 - c / 100));

  let band: RiskResult["band"] = "low";
  if (priority >= 60) band = "critical";
  else if (priority >= 35) band = "high";
  else if (priority >= 15) band = "moderate";

  const advice = {
    critical: "Test this deliberately and automate the core paths. This is where unguarded failure would cost the most.",
    high: "Worth structured test design and regression cover. Review it every release.",
    moderate: "Cover the main path. Exploratory testing is usually a better use of effort here than heavy automation.",
    low: "Light checks are enough. Spending heavily here takes effort away from areas that matter more.",
  }[band];

  return { exposure, priority, band, advice };
}

export const RISK_PRESETS: { id: string; name: string; note: string; input: RiskInput }[] = [
  { id: "payment", name: "Payment checkout", note: "Used constantly, and failure costs money and trust.", input: { impact: 5, probability: 3, usage: 5, coverage: 40 } },
  { id: "login", name: "Sign-in", note: "Everyone passes through it; failure locks everyone out.", input: { impact: 5, probability: 2, usage: 5, coverage: 70 } },
  { id: "report", name: "Monthly report export", note: "Rarely used, but wrong numbers are hard to spot.", input: { impact: 4, probability: 3, usage: 1, coverage: 10 } },
  { id: "admin", name: "Admin theme setting", note: "Low impact, low usage, rarely changed.", input: { impact: 1, probability: 2, usage: 1, coverage: 0 } },
];

/* -------------------------------------------------------------- idea to prototype */

export type PrototypeStep = { id: string; name: string; question: string; body: string; output: string };

export const PROTOTYPE_STEPS: PrototypeStep[] = [
  { id: "problem", name: "Problem definition", question: "What problem are we actually solving?", body: "Before anything is built, the problem is written down in plain language, along with who has it and what they do today instead. Most ideas get sharper, smaller or abandoned at this step — which is the cheapest place for it to happen.", output: "A written problem statement everyone agrees on" },
  { id: "assumptions", name: "Assumptions", question: "What has to be true for this to work?", body: "We list what the idea depends on: technical, commercial and behavioural. Each assumption is marked by how damaging it would be if it turned out false, and how confident we are today.", output: "A ranked list of assumptions, riskiest first" },
  { id: "feasibility", name: "Feasibility", question: "Can this be built, and at what cost?", body: "The riskiest technical assumptions get a time-boxed investigation — reading documentation, testing a library, measuring a limit. The aim is an answer, not a finished component.", output: "A feasibility note with evidence and limits" },
  { id: "prototype", name: "Prototype", question: "What is the smallest thing that answers the question?", body: "We build only enough to test the assumption. A prototype is allowed to be rough, hard-coded and narrow, because it exists to produce evidence and is kept clearly separate from production code.", output: "A working prototype, scoped to the question" },
  { id: "test", name: "Testing", question: "What did we actually learn?", body: "The prototype is put in front of the reality it claims to handle: real data volumes, real users or real constraints. Results are recorded as they are, including the inconvenient ones.", output: "Findings, including what the prototype does not prove" },
  { id: "decision", name: "Decision", question: "Go, revise, or stop?", body: "Evidence meets the original question. Go means build it properly, with a plan. Revise means the idea survives but the shape changes. Stop means the evidence says no — and a well-run experiment that ends here has saved far more than it cost.", output: "A recommendation with the reasoning behind it" },
];

export type Decision = "go" | "revise" | "stop";

export const DECISIONS: Record<Decision, { label: string; body: string }> = {
  go: { label: "Go", body: "The assumptions held and the cost is understood. Work moves into a proper build, with architecture, tests and a delivery plan — not by promoting the prototype into production." },
  revise: { label: "Revise", body: "The problem is real but the approach is not. Something changes — scope, technology, or the user being served — and the next experiment tests the new version." },
  stop: { label: "Stop", body: "The evidence says this will not work, or not for enough value. Stopping here is a successful outcome: the cost was one experiment rather than a full build." },
};

/* ------------------------------------------------------------- architecture nodes */

export type ArchNode = {
  id: string; name: string; role: string;
  considerations: string[];
  /** Column and row in the illustrative diagram. */
  col: number; row: number;
};

export const ARCH_NODES: ArchNode[] = [
  { id: "client", name: "Client application", role: "What the user actually touches — a web app, an internal tool, or both.", considerations: ["Keeping state predictable as screens multiply", "Accessibility and keyboard support as first-class, not retrofitted", "Behaving sensibly when the network is slow or absent"], col: 0, row: 1 },
  { id: "gateway", name: "API gateway", role: "One front door for the services behind it.", considerations: ["Authentication and rate limiting in one place rather than scattered", "Versioning, so clients do not break when a service changes", "Clear error shapes that clients can actually handle"], col: 1, row: 1 },
  { id: "services", name: "Backend services", role: "Where the business rules live.", considerations: ["Boundaries drawn around business capabilities, not database tables", "Explicit contracts between services", "Idempotency, so a retried request does not cause damage twice"], col: 2, row: 0 },
  { id: "db", name: "Data store", role: "The record of what is true.", considerations: ["Schema changes that can be deployed without downtime", "Backup and restore that has actually been tested", "Indexes driven by real query patterns, not guesses"], col: 3, row: 0 },
  { id: "external", name: "External integrations", role: "Systems you depend on but do not control.", considerations: ["Timeouts and fallbacks for when the third party is down", "A stand-in so your tests do not depend on someone else's uptime", "Watching for contract changes you will not be warned about"], col: 3, row: 2 },
  { id: "tests", name: "Test harness", role: "The checks that tell you whether any of this still works.", considerations: ["Fast checks close to the code, slower ones reserved for real journeys", "Test data that can be created and torn down reliably", "Results a developer can read without guessing"], col: 2, row: 2 },
  { id: "observability", name: "Monitoring", role: "How you find out there is a problem before your users tell you.", considerations: ["Logs with enough context to trace one request end to end", "Alerts on symptoms users feel, not on every metric", "Knowing what 'normal' looks like before an incident"], col: 1, row: 2 },
];

export const ARCH_EDGES: [string, string][] = [
  ["client", "gateway"], ["gateway", "services"], ["services", "db"],
  ["services", "external"], ["gateway", "observability"], ["services", "tests"],
];

// Trailing single words tied up for the demo copy as well.
for (const s of SCENARIOS) {
  s.verdict.body = noWidow(s.verdict.body);
  s.lesson = noWidow(s.lesson);
  s.summary = noWidow(s.summary);
}
for (const s of PROTOTYPE_STEPS) s.body = noWidow(s.body);
for (const n of ARCH_NODES) n.role = noWidow(n.role);
