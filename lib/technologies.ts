import { noWidow } from "./typography.ts";

/**
 * Technology content for /technologies/. Every entry here is a technology Ethora Labs
 * has genuine, hands-on experience with: the stack this very website and its test
 * suite are built with, plus the cloud, data and mobile tooling we use in client
 * engagements beyond the site itself. We do not list a tool just to look broader --
 * only ones we have actually shipped work with.
 */

export type TechTier = "hands-on";
/** Which preview visual this technology uses -- grouped by what it actually does,
 * not one generic illustration for everything. See components/tech-visuals/.
 * "web"/"testing"/"ops" show real, verifiable evidence from this site itself
 * (its routes, its pipeline, its deploy target); "role" is for technologies used
 * in client engagements that this site does not itself run, so it describes the
 * role honestly instead of implying it powers ethoralabs.co. */
export type VisualKind = "web" | "testing" | "ops" | "role";

export type Technology = {
  id: string;
  name: string;
  tier: TechTier;
  /** Short, accurate noun phrase -- stops e.g. Cloudflare or Node.js from reading
   * as something that changes the interface, when its real role is elsewhere. */
  role: string;
  icon: string;
  visual: VisualKind;
  usedFor: string;
  considerations: string[];
  relatedServices: string[]; // service slugs, see lib/services.ts
};

export const technologies: Technology[] = [
  {
    id: "nextjs", name: "Next.js", tier: "hands-on", role: "Framework", icon: "layers", visual: "web",
    usedFor: "A React framework for building and statically exporting web applications, including this site.",
    considerations: ["Choosing between static export, server rendering and client rendering per route, not by default", "Route structure that stays predictable as a site grows", "Keeping bundle size and client-side JavaScript deliberate, not accidental"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "react", name: "React", tier: "hands-on", role: "UI library", icon: "code", visual: "web",
    usedFor: "The component model behind our interactive interfaces and technical demonstrations.",
    considerations: ["State kept close to where it is used, not centralised by default", "Accessible components first — keyboard and focus support is not an afterthought", "Server and client components used deliberately, not everywhere"],
    relatedServices: ["software-engineering", "innovation"],
  },
  {
    id: "typescript", name: "TypeScript", tier: "hands-on", role: "Language", icon: "code", visual: "web",
    usedFor: "Static typing across the codebase, including this site's content and component layer.",
    considerations: ["Types that describe real constraints, not decoration", "Strict mode on, so mistakes surface at compile time", "Shared types between data and the components that render it"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "tailwind", name: "Tailwind CSS", tier: "hands-on", role: "Styling system", icon: "pen", visual: "web",
    usedFor: "Utility-first styling with design tokens for color, spacing and typography.",
    considerations: ["A small set of design tokens, reused everywhere, rather than one-off values", "Consistent spacing and type scale across every page", "Dark and light sections sharing the same token set"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "nodejs", name: "Node.js", tier: "hands-on", role: "Runtime", icon: "gear", visual: "web",
    usedFor: "The JavaScript runtime behind our build tooling, scripts and backend services.",
    considerations: ["Dependencies kept minimal and deliberate", "Build and test scripts that run the same way locally and in deployment", "Clear separation between build-time and runtime code"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "playwright", name: "Playwright", tier: "hands-on", role: "Testing tool", icon: "shield", visual: "testing",
    usedFor: "Browser automation for end-to-end checks: real pages, real navigation, real rendering.",
    considerations: ["Tests that check behaviour a user would notice, not implementation detail", "Keeping a suite fast enough that people actually run it", "Treating flaky results as a defect in the test, not something to re-run past"],
    relatedServices: ["quality-engineering", "test-automation"],
  },
  {
    id: "node-test", name: "Node's test runner", tier: "hands-on", role: "Testing tool", icon: "check", visual: "testing",
    usedFor: "Fast, dependency-free unit tests for pure logic, run without a browser.",
    considerations: ["Unit tests for logic that does not need a browser to verify", "No test framework dependency beyond what the language already ships with", "Fast enough to run on every change, not just before a release"],
    relatedServices: ["quality-engineering", "test-automation"],
  },
  {
    id: "selenium", name: "Selenium", tier: "hands-on", role: "Testing tool", icon: "shield", visual: "role",
    usedFor: "Cross-browser web automation for clients whose stack, grid or existing suite is already built around it.",
    considerations: ["Reaching for it where a client's infrastructure already depends on it, not by default", "Explicit waits over sleeps, so a suite's flakiness reflects the app, not the test", "Grid and driver versions pinned, so a suite does not break on an unrelated update"],
    relatedServices: ["quality-engineering", "test-automation"],
  },
  {
    id: "appium", name: "Appium", tier: "hands-on", role: "Mobile testing tool", icon: "shield", visual: "role",
    usedFor: "Cross-platform mobile automation for clients who need one suite exercising both iOS and Android.",
    considerations: ["Real-device coverage, not simulator results treated as a substitute", "Element locators that survive a native UI refresh, not just the build that exists today", "Kept for genuinely cross-platform suites, with native tools used where they fit better"],
    relatedServices: ["quality-engineering", "test-automation"],
  },
  {
    id: "postman", name: "Postman", tier: "hands-on", role: "API testing tool", icon: "check", visual: "role",
    usedFor: "API exploration and automated contract checks for the backend layer a UI sits on top of.",
    considerations: ["Collections kept in version control, not left as one person's local workspace", "Environment and auth config that does not leak between staging and production", "Assertions on the response contract, not just a 200 status code"],
    relatedServices: ["quality-engineering", "test-automation"],
  },
  {
    id: "k6", name: "Grafana k6", tier: "hands-on", role: "Load testing tool", icon: "chart", visual: "role",
    usedFor: "Load and performance testing to find where a system degrades before real traffic does.",
    considerations: ["Scenarios modelled on real traffic shape, not an arbitrary ramp", "Thresholds that fail a build automatically, not results read after the fact", "Run early enough to inform design, not only right before a launch"],
    relatedServices: ["quality-engineering"],
  },
  {
    id: "cloudflare", name: "Cloudflare", tier: "hands-on", role: "Deployment platform", icon: "cloud", visual: "ops",
    usedFor: "Static deployment and hosting for this site, via Cloudflare Workers.",
    considerations: ["A deployment pipeline simple enough to reason about end to end", "Static export where it genuinely fits, rather than paying for a server by default", "Deploys that are reproducible from a clean checkout"],
    relatedServices: ["software-engineering", "test-automation"],
  },
  {
    id: "git", name: "Git & GitHub", tier: "hands-on", role: "Version control", icon: "branch", visual: "ops",
    usedFor: "Version control and the history behind every decision made on a codebase.",
    considerations: ["Commits that explain why a change was made, not just what changed", "A history a new engineer could actually read to understand a project", "Branching kept simple enough that it does not become its own source of risk"],
    relatedServices: ["software-engineering", "test-automation"],
  },
  {
    id: "pipeline", name: "Scripted build & release pipeline", tier: "hands-on", role: "Release process", icon: "loop", visual: "ops",
    usedFor: "A deliberate, scripted sequence — typecheck, test, build, deploy — run the same way every time.",
    considerations: ["Each step fails fast and says why, rather than failing silently later", "The same commands run locally as in deployment, so \"works on my machine\" is not a category of bug", "Nothing in the sequence depends on a step being done manually and remembered"],
    relatedServices: ["test-automation"],
  },
  {
    id: "aws", name: "AWS", tier: "hands-on", role: "Cloud platform", icon: "cloud", visual: "role",
    usedFor: "Cloud infrastructure for client workloads that need compute, storage or managed services beyond a static site.",
    considerations: ["Choosing managed services only where they genuinely reduce operational risk", "IAM scoped tightly, not broad roles granted out of convenience", "Cost visibility built in from day one, not discovered in a surprise bill"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "azure", name: "Azure", tier: "hands-on", role: "Cloud platform", icon: "cloud", visual: "role",
    usedFor: "Cloud infrastructure and identity integration for clients already standardised on Microsoft's ecosystem.",
    considerations: ["Resource groups and naming that stay legible as an environment grows", "Identity integration done deliberately, not as an afterthought", "Infrastructure defined as code rather than clicked together in a portal"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "gcp", name: "GCP", tier: "hands-on", role: "Cloud platform", icon: "cloud", visual: "role",
    usedFor: "Cloud infrastructure and data services for clients building on Google Cloud.",
    considerations: ["Project and billing boundaries that match team and environment boundaries", "Least-privilege service accounts, not one shared account reused everywhere", "Managed services chosen for what they remove, not for novelty"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "docker", name: "Docker", tier: "hands-on", role: "Containerisation", icon: "layers", visual: "role",
    usedFor: "Packaging applications and their dependencies into reproducible containers for development and deployment.",
    considerations: ["Images that build the same way locally and in CI", "Small, purposeful images rather than one bloated base for everything", "Secrets kept out of image layers entirely"],
    relatedServices: ["software-engineering", "test-automation"],
  },
  {
    id: "kubernetes", name: "Kubernetes", tier: "hands-on", role: "Orchestration", icon: "gear", visual: "role",
    usedFor: "Running and scaling containerised services for clients whose workload genuinely needs orchestration.",
    considerations: ["Reaching for it only once the workload justifies the operational cost", "Resource limits set deliberately, not left to defaults", "Rollouts and rollbacks that stay boring and predictable, not an event"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "postgresql", name: "PostgreSQL", tier: "hands-on", role: "Relational database", icon: "chart", visual: "role",
    usedFor: "The relational database behind applications that need strong consistency and real transactional guarantees.",
    considerations: ["Schemas and constraints that make invalid states hard to represent", "Migrations that are reviewable and reversible, not a leap of faith", "Indexes chosen from real query patterns, not guessed in advance"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "mongodb", name: "MongoDB", tier: "hands-on", role: "Document database", icon: "chart", visual: "role",
    usedFor: "A document database for data that is naturally variable in shape or does not need relational joins.",
    considerations: ["Choosing it because the data genuinely fits, not as a default", "Indexes and query patterns designed up front, not discovered in production", "Schema validation added even though it is technically optional"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "redis", name: "Redis", tier: "hands-on", role: "In-memory store", icon: "chart", visual: "role",
    usedFor: "Caching, session storage and lightweight queues where speed matters more than durability.",
    considerations: ["Treating it as disposable, never as the system of record", "Eviction and expiry policies set deliberately for what is actually being cached", "Clear ownership of what lives in it and why"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "snowflake", name: "Snowflake", tier: "hands-on", role: "Data warehouse", icon: "cloud", visual: "role",
    usedFor: "A cloud data warehouse for clients who need to analyse data at a scale beyond a normal application database.",
    considerations: ["Separating transactional systems from the warehouse that reports on them", "Compute and storage costs monitored, not discovered at the end of the month", "Access controlled by role, not by sharing one account"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "react-native", name: "React Native", tier: "hands-on", role: "Mobile framework", icon: "code", visual: "role",
    usedFor: "A single React-based codebase shared across iOS and Android where that trade-off genuinely fits the product.",
    considerations: ["Being honest about where native code is still the right call", "Performance checked on real devices, not just a simulator", "The same component discipline we apply on the web"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "flutter", name: "Flutter", tier: "hands-on", role: "Mobile framework", icon: "code", visual: "role",
    usedFor: "A single Dart codebase for clients who want a consistent UI across iOS and Android from day one.",
    considerations: ["Platform-specific conventions respected even inside a shared codebase", "Widget trees kept legible as a screen's complexity grows", "Build and release pipelines that match the discipline we use everywhere else"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "ios", name: "iOS", tier: "hands-on", role: "Native mobile platform", icon: "terminal", visual: "role",
    usedFor: "Native iOS development for features that need direct platform access or the best possible fit with Apple's ecosystem.",
    considerations: ["Reaching for native only where a cross-platform framework genuinely falls short", "App Store review requirements planned for, not discovered at submission", "Accessibility and platform conventions followed, not approximated"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "android", name: "Android", tier: "hands-on", role: "Native mobile platform", icon: "terminal", visual: "role",
    usedFor: "Native Android development for features that need direct platform access across a wide range of devices.",
    considerations: ["Designing for real device and OS fragmentation, not just the newest phone", "Background work and battery impact treated as first-class concerns", "Permissions requested only for what a feature actually needs"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "python", name: "Python", tier: "hands-on", role: "Language", icon: "code", visual: "role",
    usedFor: "A general-purpose language for scripting, automation and backend services where it is the right fit for a client's stack.",
    considerations: ["Typed where it matters, using type hints rather than skipping them for convenience", "Dependencies pinned and reproducible, not resolved differently on every machine", "Automation scripts held to the same review discipline as application code"],
    relatedServices: ["software-engineering"],
  },
  {
    id: "jenkins", name: "Jenkins", tier: "hands-on", role: "CI/CD platform", icon: "loop", visual: "role",
    usedFor: "Build and release automation for clients whose infrastructure is already built around a self-hosted CI/CD platform.",
    considerations: ["Pipelines defined as code and versioned, not configured by hand in the UI", "Credentials and secrets scoped tightly per job", "Reaching for it where a client's existing setup justifies it, not as a default over simpler options"],
    relatedServices: ["software-engineering", "test-automation"],
  },
  {
    id: "swift", name: "Swift", tier: "hands-on", role: "Native language", icon: "terminal", visual: "role",
    usedFor: "Native iOS and macOS development for clients who need the best possible fit with Apple's ecosystem.",
    considerations: ["Reaching for native only where a cross-platform framework genuinely falls short", "Modern Swift concurrency used deliberately, not retrofitted without care", "Platform and accessibility conventions followed, not approximated"],
    relatedServices: ["software-engineering"],
  },
];

export type TechCategory = { id: string; name: string; blurb: string; items: string[] };

export const techCategories: TechCategory[] = [
  {
    id: "web", name: "Web & Application Development",
    blurb: "The languages and framework behind building and shipping an application.",
    items: ["react", "nextjs", "typescript", "python", "nodejs", "tailwind"],
  },
  {
    id: "qe", name: "Quality Engineering & Testing",
    blurb: "How we check that software actually does what it is supposed to.",
    items: ["playwright", "selenium", "appium", "postman", "k6", "node-test"],
  },
  {
    id: "ops", name: "DevOps & Engineering Operations",
    blurb: "The practices that keep a codebase's history and release process trustworthy.",
    items: ["git", "pipeline", "jenkins", "cloudflare"],
  },
  {
    id: "infra", name: "Deployment & Infrastructure",
    blurb: "Where and how an application actually runs once it is built.",
    items: ["docker", "kubernetes", "aws", "azure", "gcp"],
  },
  {
    id: "data", name: "Data & Storage",
    blurb: "Where application and analytical data actually lives.",
    items: ["postgresql", "mongodb", "redis", "snowflake"],
  },
  {
    id: "mobile", name: "Mobile",
    blurb: "Native and cross-platform apps beyond the browser.",
    items: ["react-native", "flutter", "ios", "swift", "android"],
  },
];

export function getTechnology(id: string): Technology | undefined {
  return technologies.find((t) => t.id === id);
}

for (const t of technologies) {
  t.usedFor = noWidow(t.usedFor);
}
