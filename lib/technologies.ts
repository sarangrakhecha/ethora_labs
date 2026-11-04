import { noWidow } from "./typography.ts";

/**
 * Technology content for /technologies/. Deliberately narrow: every entry here is a
 * technology Ethora Labs has genuine, demonstrable hands-on experience with -- the
 * stack this very website and its test suite are built with. We do not list
 * technologies we have not actually used (cloud platforms beyond our own deployment
 * target, testing tools beyond the one we run, databases, mobile platforms, AI/ML
 * tooling) just to look broader. As real project experience grows, so will this list.
 */

export type TechTier = "hands-on";

export type Technology = {
  id: string;
  name: string;
  tier: TechTier;
  usedFor: string;
  considerations: string[];
  relatedServices: string[]; // service slugs, see lib/services.ts
};

export const technologies: Technology[] = [
  {
    id: "nextjs", name: "Next.js", tier: "hands-on",
    usedFor: "A React framework for building and statically exporting web applications, including this site.",
    considerations: ["Choosing between static export, server rendering and client rendering per route, not by default", "Route structure that stays predictable as a site grows", "Keeping bundle size and client-side JavaScript deliberate, not accidental"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "react", name: "React", tier: "hands-on",
    usedFor: "The component model behind our interactive interfaces and technical demonstrations.",
    considerations: ["State kept close to where it is used, not centralised by default", "Accessible components first — keyboard and focus support is not an afterthought", "Server and client components used deliberately, not everywhere"],
    relatedServices: ["software-engineering", "innovation"],
  },
  {
    id: "typescript", name: "TypeScript", tier: "hands-on",
    usedFor: "Static typing across the codebase, including this site's content and component layer.",
    considerations: ["Types that describe real constraints, not decoration", "Strict mode on, so mistakes surface at compile time", "Shared types between data and the components that render it"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "tailwind", name: "Tailwind CSS", tier: "hands-on",
    usedFor: "Utility-first styling with design tokens for color, spacing and typography.",
    considerations: ["A small set of design tokens, reused everywhere, rather than one-off values", "Consistent spacing and type scale across every page", "Dark and light sections sharing the same token set"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "nodejs", name: "Node.js", tier: "hands-on",
    usedFor: "The JavaScript runtime behind our build tooling, scripts and backend services.",
    considerations: ["Dependencies kept minimal and deliberate", "Build and test scripts that run the same way locally and in deployment", "Clear separation between build-time and runtime code"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "playwright", name: "Playwright", tier: "hands-on",
    usedFor: "Browser automation for end-to-end checks: real pages, real navigation, real rendering.",
    considerations: ["Tests that check behaviour a user would notice, not implementation detail", "Keeping a suite fast enough that people actually run it", "Treating flaky results as a defect in the test, not something to re-run past"],
    relatedServices: ["quality-engineering", "test-automation"],
  },
  {
    id: "node-test", name: "Node's test runner", tier: "hands-on",
    usedFor: "Fast, dependency-free unit tests for pure logic, run without a browser.",
    considerations: ["Unit tests for logic that does not need a browser to verify", "No test framework dependency beyond what the language already ships with", "Fast enough to run on every change, not just before a release"],
    relatedServices: ["quality-engineering", "test-automation"],
  },
  {
    id: "cloudflare", name: "Cloudflare", tier: "hands-on",
    usedFor: "Static deployment and hosting for this site, via Cloudflare Workers.",
    considerations: ["A deployment pipeline simple enough to reason about end to end", "Static export where it genuinely fits, rather than paying for a server by default", "Deploys that are reproducible from a clean checkout"],
    relatedServices: ["software-engineering", "test-automation"],
  },
  {
    id: "git", name: "Git & GitHub", tier: "hands-on",
    usedFor: "Version control and the history behind every decision made on a codebase.",
    considerations: ["Commits that explain why a change was made, not just what changed", "A history a new engineer could actually read to understand a project", "Branching kept simple enough that it does not become its own source of risk"],
    relatedServices: ["software-engineering", "test-automation"],
  },
  {
    id: "pipeline", name: "Scripted build & release pipeline", tier: "hands-on",
    usedFor: "A deliberate, scripted sequence — typecheck, test, build, deploy — run the same way every time.",
    considerations: ["Each step fails fast and says why, rather than failing silently later", "The same commands run locally as in deployment, so \"works on my machine\" is not a category of bug", "Nothing in the sequence depends on a step being done manually and remembered"],
    relatedServices: ["test-automation"],
  },
];

export type TechCategory = { id: string; name: string; blurb: string; items: string[] };

export const techCategories: TechCategory[] = [
  {
    id: "web", name: "Web & Application Development",
    blurb: "The languages and framework behind building and shipping an application.",
    items: ["nextjs", "react", "typescript", "tailwind", "nodejs"],
  },
  {
    id: "qe", name: "Quality Engineering & Testing",
    blurb: "How we check that software actually does what it is supposed to.",
    items: ["playwright", "node-test"],
  },
  {
    id: "infra", name: "Deployment & Infrastructure",
    blurb: "Where and how an application actually runs once it is built.",
    items: ["cloudflare"],
  },
  {
    id: "ops", name: "Engineering Operations",
    blurb: "The practices that keep a codebase's history and release process trustworthy.",
    items: ["git", "pipeline"],
  },
];

export function getTechnology(id: string): Technology | undefined {
  return technologies.find((t) => t.id === id);
}

for (const t of technologies) {
  t.usedFor = noWidow(t.usedFor);
}
