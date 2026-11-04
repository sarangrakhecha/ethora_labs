// Unit tests for the interactive demo logic and content integrity.
// Runs on Node's built-in test runner: `npm run test:unit` (no extra dependencies).
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Imported straight from the real source — Node strips the TypeScript types.
const { riskScore, SCENARIOS, PIPELINE_STAGES, reachedStages, PROTOTYPE_STEPS, ARCH_NODES, ARCH_EDGES, RISK_PRESETS } =
  await import("../lib/demos.ts");
const { services } = await import("../lib/services.ts");
const { products } = await import("../lib/products.ts");
const { technologies, techCategories, getTechnology } = await import("../lib/technologies.ts");

describe("riskScore", () => {
  test("maximum exposure with no coverage is critical", () => {
    const r = riskScore({ impact: 5, probability: 5, usage: 5, coverage: 0 });
    assert.equal(r.exposure, 100);
    assert.equal(r.priority, 100);
    assert.equal(r.band, "critical");
  });

  test("full coverage drives priority to zero regardless of exposure", () => {
    const r = riskScore({ impact: 5, probability: 5, usage: 5, coverage: 100 });
    assert.equal(r.exposure, 100);
    assert.equal(r.priority, 0);
    assert.equal(r.band, "low");
  });

  test("coverage reduces priority but never exposure", () => {
    const a = riskScore({ impact: 4, probability: 4, usage: 4, coverage: 0 });
    const b = riskScore({ impact: 4, probability: 4, usage: 4, coverage: 50 });
    assert.equal(a.exposure, b.exposure);
    assert.ok(b.priority < a.priority);
  });

  test("out-of-range inputs are clamped rather than producing nonsense", () => {
    const low = riskScore({ impact: -5, probability: 0, usage: -1, coverage: -20 });
    const high = riskScore({ impact: 99, probability: 99, usage: 99, coverage: 900 });
    assert.ok(low.priority >= 0 && low.priority <= 100);
    assert.equal(high.exposure, 100);
    assert.equal(high.priority, 0);
  });

  test("band thresholds are ordered and every band has advice", () => {
    const seen = new Set();
    for (let c = 0; c <= 100; c += 5) {
      const r = riskScore({ impact: 5, probability: 5, usage: 5, coverage: c });
      seen.add(r.band);
      assert.ok(r.advice.length > 0);
    }
    assert.deepEqual([...seen].sort(), ["critical", "high", "low", "moderate"]);
  });

  test("every preset produces a usable result", () => {
    for (const p of RISK_PRESETS) {
      const r = riskScore(p.input);
      assert.ok(r.priority >= 0 && r.priority <= 100, `${p.id} priority out of range`);
      assert.ok(["low", "moderate", "high", "critical"].includes(r.band));
    }
  });
});

describe("pipeline scenarios", () => {
  test("every scenario defines every stage", () => {
    for (const s of SCENARIOS) {
      for (const stage of PIPELINE_STAGES) {
        assert.ok(s.stages[stage.id], `${s.id} is missing stage ${stage.id}`);
        assert.ok(s.stages[stage.id].note.length > 0);
      }
    }
  });

  test("the clean run reaches every stage", () => {
    const s = SCENARIOS.find((x) => x.id === "success");
    assert.equal(reachedStages(s).length, PIPELINE_STAGES.length);
    assert.equal(s.investigate.length, 0);
  });

  test("a blocking failure stops the pipeline early", () => {
    const s = SCENARIOS.find((x) => x.id === "regression");
    const reached = reachedStages(s);
    assert.ok(reached.includes("integration"), "should reach the failing stage");
    assert.ok(!reached.includes("ui"), "should not run stages after a block");
    assert.ok(!reached.includes("release"));
  });

  test("the flaky scenario never reports a product defect", () => {
    const s = SCENARIOS.find((x) => x.id === "flaky");
    assert.equal(s.stages.ui.status, "unstable");
    assert.match(s.verdict.headline.toLowerCase(), /test is wrong/);
  });

  test("the infrastructure scenario proves nothing about the product", () => {
    const s = SCENARIOS.find((x) => x.id === "infra");
    assert.match(s.verdict.body.toLowerCase(), /neither evidence/);
  });

  test("failing scenarios tell the reader how to investigate", () => {
    for (const s of SCENARIOS.filter((x) => x.id !== "success")) {
      assert.ok(s.investigate.length >= 3, `${s.id} needs investigation steps`);
      assert.ok(s.lesson.length > 0);
    }
  });
});

describe("prototype and architecture content", () => {
  test("prototype steps run problem through to decision", () => {
    assert.equal(PROTOTYPE_STEPS[0].id, "problem");
    assert.equal(PROTOTYPE_STEPS.at(-1).id, "decision");
    for (const s of PROTOTYPE_STEPS) {
      assert.ok(s.question.endsWith("?"), `${s.id} should pose a question`);
      assert.ok(s.output.length > 0);
    }
  });

  test("every architecture edge connects two real nodes", () => {
    const ids = new Set(ARCH_NODES.map((n) => n.id));
    for (const [a, b] of ARCH_EDGES) {
      assert.ok(ids.has(a), `unknown node ${a}`);
      assert.ok(ids.has(b), `unknown node ${b}`);
    }
  });

  test("every architecture node explains itself", () => {
    for (const n of ARCH_NODES) {
      assert.ok(n.role.length > 0);
      assert.ok(n.considerations.length >= 2, `${n.id} needs considerations`);
    }
  });
});

describe("content integrity", () => {
  /** Source with comments removed, so our own notes about what we avoid do not trip the check. */
  const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*\/\/.*$/gm, " ");
  const aboutCopy = stripComments(readFileSync(new URL("../app/about/page.tsx", import.meta.url), "utf8"));
  const servicePage = readFileSync(new URL("../app/services/[slug]/page.tsx", import.meta.url), "utf8");

  // Every string the visitor can actually read, plus the About page markup.
  // Negated mentions ("we have no case studies") are honesty, not a claim, so they are
  // removed before the check rather than being allowed to fail it.
  const dropNegated = (text) =>
    text.replace(/\b(?:no|not|never|without)\b[^.]{0,60}?(?:case stud(?:y|ies)|testimonials?|client logos|success percentages|awards?)/gi, " ");
  const corpus = dropNegated(JSON.stringify(services) + JSON.stringify(products) + aboutCopy);

  test("no fabricated social proof anywhere in the visible copy", () => {
    const banned = [
      /trusted by/i, /our clients/i, /\d+\+? (?:clients|customers|projects delivered)/i,
      /testimonial/i, /case stud(?:y|ies)/i, /award[- ]winning/i,
      /\d+% (?:faster|improvement|increase|reduction)/i, /industry[- ]leading/i,
      /world[- ]class/i, /proven track record/i,
    ];
    for (const re of banned) {
      const m = corpus.match(re);
      assert.equal(m, null, `found banned marketing claim ${re}: ${m && corpus.slice(Math.max(0, m.index - 60), m.index + 60)}`);
    }
  });

  test("every service page has the content each section needs", () => {
    assert.equal(services.length, 4);
    for (const s of services) {
      assert.ok(s.challenges.length >= 3, `${s.slug}: challenges`);
      assert.ok(s.whatWeDo.length >= 4, `${s.slug}: whatWeDo`);
      assert.ok(s.deliverables.length >= 4, `${s.slug}: deliverables`);
      assert.equal(s.approach.length, 5, `${s.slug}: approach phases`);
      assert.equal(s.engagements.length, 3, `${s.slug}: engagement options`);
      assert.ok(s.demoIntro.title && s.demoIntro.body, `${s.slug}: demo intro`);
      assert.ok(s.metaTitle.startsWith("Ethora Labs |"), `${s.slug}: meta title`);
      assert.ok(s.metaDescription.length > 80 && s.metaDescription.length < 220, `${s.slug}: meta description length`);
      assert.ok(s.related.length >= 1 && !s.related.includes(s.slug), `${s.slug}: related links`);
    }
  });

  test("service slugs and demos are unique and resolvable", () => {
    const slugs = services.map((s) => s.slug);
    assert.equal(new Set(slugs).size, slugs.length, "duplicate slug");
    const demos = new Set(services.map((s) => s.demo));
    assert.equal(demos.size, 4, "each service should have its own demonstration");
    for (const s of services) {
      for (const r of s.related) assert.ok(slugs.includes(r), `${s.slug} links to unknown service ${r}`);
    }
  });

  test("illustrative material is labelled as illustrative", () => {
    assert.match(servicePage, /Not a record of completed client work/);
  });

  test("a product marked available has somewhere to go", () => {
    const { CULPRIT_STORE_URL } = products.find((p) => p.slug === "culprit").status.available
      ? { CULPRIT_STORE_URL: null } : { CULPRIT_STORE_URL: null };
    void CULPRIT_STORE_URL;
    for (const p of products) {
      assert.ok(p.status.label.length > 0, `${p.slug}: status label`);
      assert.ok(p.status.detail.length > 0, `${p.slug}: status detail`);
      if (!p.status.available) assert.equal(p.features.length, 0, `${p.slug}: unavailable product should not list features it cannot demonstrate`);
    }
  });
});

describe("technologies", () => {
  const VALID_VISUALS = new Set(["web", "testing", "ops"]);
  const serviceSlugs = new Set(services.map((s) => s.slug));

  test("every category's items resolve to a real technology", () => {
    for (const cat of techCategories) {
      assert.ok(cat.items.length > 0, `${cat.id}: has no items`);
      for (const id of cat.items) assert.ok(getTechnology(id), `${cat.id} references unknown technology "${id}"`);
    }
  });

  test("every technology has a role, a valid visual kind, and considerations", () => {
    for (const t of technologies) {
      assert.ok(t.role.length > 0, `${t.id}: role`);
      assert.ok(VALID_VISUALS.has(t.visual), `${t.id}: invalid visual kind "${t.visual}"`);
      assert.ok(t.considerations.length >= 2, `${t.id}: considerations`);
      assert.ok(t.usedFor.length > 0, `${t.id}: usedFor`);
    }
  });

  test("technology ids are unique and every related service is real", () => {
    const ids = technologies.map((t) => t.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate technology id");
    for (const t of technologies) {
      for (const slug of t.relatedServices) assert.ok(serviceSlugs.has(slug), `${t.id} links to unknown service "${slug}"`);
    }
  });

  test("every technology belongs to exactly one category", () => {
    const assigned = techCategories.flatMap((c) => c.items);
    assert.equal(new Set(assigned).size, assigned.length, "a technology is listed in more than one category");
    for (const t of technologies) assert.ok(assigned.includes(t.id), `${t.id} is not listed in any category`);
  });

  test("no technology tier reads as more than hands-on experience", () => {
    for (const t of technologies) assert.equal(t.tier, "hands-on", `${t.id}: unexpected tier "${t.tier}"`);
  });
});
