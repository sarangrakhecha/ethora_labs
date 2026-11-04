import { noWidow, noWidows } from "./typography.ts";

// Service page content. Ethora Labs is a new company: nothing here claims clients,
// case studies, metrics or team size. Examples are labelled as illustrative.

export type Service = {
  slug: string;
  nav: { label: string; description: string };
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  /** Short line under the hero stating the business problems addressed. */
  addresses: string;
  challenges: { title: string; body: string }[];
  whatWeDo: { title: string; body: string }[];
  demo: "architecture" | "risk" | "pipeline" | "prototype";
  demoIntro: { title: string; body: string };
  /** Bespoke next-step CTA label for this service, rather than one templated string
   * reused everywhere (and which read oddly for "Engineering & Innovation" -- "Discuss
   * a engineering..."). */
  cta: string;
  deliverables: string[];
  approach: { phase: string; body: string }[];
  engagements: { name: string; shape: string; body: string }[];
  related: string[];
};

const sharedEngagementNote =
  "Ethora Labs is a small, senior team. We take on work we can do well, and we say so when something falls outside that. We do not run offshore delivery centres or bench teams.";

export const SERVICE_ENGAGEMENT_NOTE = sharedEngagementNote;

export const services: Service[] = [
  /* ------------------------------------------------------ software engineering */
  {
    slug: "software-engineering",
    nav: { label: "Software Engineering", description: "Applications, APIs and integrations." },
    metaTitle: "Ethora Labs | Custom Software Engineering",
    metaDescription:
      "Custom web applications, backend services, APIs, system integration and application modernisation, built to stay maintainable. Engineering-led software development from Ethora Labs.",
    headline: "Software built around your business. Not the other way around.",
    intro:
      "Most software does not fail on the day it ships. It fails eighteen months later, when the person who wrote it has gone, nobody is sure what the code does, and a small change takes three weeks. We build applications that survive that stage.",
    addresses: "For teams carrying systems that are hard to change, integrations that keep breaking, or an idea that needs to be built properly the first time.",
    challenges: [
      { title: "The system works, but nobody wants to touch it", body: "Changes take longer than they should, estimates are padded with fear, and the people who understand the risky parts have left. The code is not necessarily bad — it is undocumented, untested and entangled, so every change is a gamble." },
      { title: "Two systems that should talk, don't", body: "Data is re-keyed by hand between tools, exports are emailed around, and a spreadsheet has quietly become part of the process. The integration was never built because it was never quite anyone's job." },
      { title: "The prototype became production", body: "Something built quickly to prove a point is now carrying real users and real data. It was never designed for that, and the decisions that made it fast to build are now the ones making it fragile." },
      { title: "Rebuild or repair?", body: "A rewrite is proposed roughly once a year and never happens, because nobody can say with confidence what it would cost or what would be lost. The question needs an honest technical answer, not an opinion." },
    ],
    whatWeDo: [
      { title: "Custom web applications", body: "Applications built for how your business actually works, rather than configured around a product that nearly fits. We favour straightforward, well-understood technology that another team could pick up." },
      { title: "Backend services and APIs", body: "Services with explicit contracts, sensible error handling and behaviour that stays correct when a request is retried. An API is a promise to other systems, so we design it as one." },
      { title: "System integration", body: "Connecting the tools you already run, including the ones with awkward or undocumented interfaces, with attention to what happens when the other side is slow, down or has changed without warning." },
      { title: "Internal business tools", body: "The unglamorous software that quietly runs operations. Built properly, these remove manual work permanently rather than moving it somewhere else." },
      { title: "Software architecture", body: "Boundaries drawn around business capabilities, decisions written down with their trade-offs, and a shape the team can hold in their heads." },
      { title: "Application modernisation", body: "Improving a system in place, in reviewable steps, with tests added around behaviour before it is changed — rather than a rewrite that stops all other work for a year." },
      { title: "Technical discovery and prototyping", body: "When the right answer is not yet obvious, a short, time-boxed investigation that produces evidence instead of a longer meeting." },
    ],
    demo: "architecture",
    cta: "Discuss a Software Project",
    demoIntro: {
      title: "Architecture Explorer",
      body: "An illustrative architecture for a typical business application. Select any part to see what it is responsible for and the engineering questions that come with it. This is a teaching example, not a diagram of any client's system.",
    },
    deliverables: [
      "A working, deployed application",
      "Architecture decisions recorded with their trade-offs",
      "API documentation that matches the implementation",
      "An automated test suite covering the important paths",
      "A build and deployment pipeline your team can run",
      "Handover documentation and a walkthrough with your engineers",
    ],
    approach: [
      { phase: "Assess", body: "We read the existing code, talk to the people who maintain it, and establish what is actually true today rather than what the documentation claims." },
      { phase: "Plan", body: "We agree the smallest first piece that produces something real, and name the risks we expect to hit. Plans that survive contact with reality are short." },
      { phase: "Implement", body: "Work arrives in reviewable increments. You see progress continuously, not at the end." },
      { phase: "Verify", body: "Tests are written alongside the code, and we are explicit about what is covered and what is not." },
      { phase: "Hand over", body: "Documentation, a walkthrough and whatever your team needs to own it. We aim to be easy to stop working with." },
    ],
    engagements: [
      { name: "Technical assessment", shape: "Short, fixed scope", body: "We review an existing system or plan and report on risks, effort and options. Useful before committing to a rebuild or a large piece of work." },
      { name: "Defined-scope project", shape: "Agreed outcome and timeline", body: "A specific thing built and delivered — an application, an integration, a modernisation step — with the scope written down before we start." },
      { name: "Ongoing engineering support", shape: "Continuing, reviewed regularly", body: "Continuous work alongside your team, for products that need steady development and maintenance rather than a one-off push." },
    ],
    related: ["quality-engineering", "test-automation"],
  },

  /* ------------------------------------------------------- quality engineering */
  {
    slug: "quality-engineering",
    nav: { label: "Quality Engineering", description: "Test strategy and release readiness." },
    metaTitle: "Ethora Labs | Quality Engineering & Software Testing",
    metaDescription:
      "Test strategy, risk-based testing, exploratory and regression testing, defect investigation and release-readiness assessment. Quality engineering from Ethora Labs.",
    headline: "Find what matters. Before it becomes a problem.",
    intro:
      "Testing everything equally costs as much as testing nothing deliberately, and tells you almost as little. The useful question is not how much you test, but whether the effort is pointed at the places where failure would actually hurt.",
    addresses: "For teams where bugs keep reaching users, testing has grown by accretion, or nobody can answer plainly whether a build is safe to ship.",
    challenges: [
      { title: "Bugs keep reaching users", body: "Things pass internally and break in production. Usually this is not carelessness — it is that the tests cover what is easy to test rather than what is likely to break, and nobody has looked at the difference." },
      { title: "Nobody can say what is covered", body: "There are tests, and there is a number from a coverage tool, but no one can answer the real question: if this feature broke, would anything have told us?" },
      { title: "Release decisions are made on feeling", body: "A release is approved because the team feels good about it, or delayed because someone is nervous. Neither is evidence, and both are hard to defend when a decision turns out wrong." },
      { title: "The regression suite has become a ritual", body: "A long manual pass runs before every release, takes days, and rarely finds anything. It continues because stopping feels risky, not because it is working." },
    ],
    whatWeDo: [
      { title: "Quality strategy", body: "Deciding what to test, how deeply, and when — written down and agreed, so testing effort is a deliberate choice rather than an accident of history." },
      { title: "Risk-based testing", body: "Weighting effort by what failure would cost and how likely it is, so the critical paths get real attention and the trivial ones stop absorbing it." },
      { title: "Functional, integration and system testing", body: "Checking behaviour at the level where the risk actually lives, including the seams between components where defects collect." },
      { title: "Exploratory testing", body: "Structured, time-boxed investigation by someone who understands the product. This is where the defects nobody wrote a test case for tend to surface." },
      { title: "Regression testing", body: "Keeping a dependable safety net around what already works, and keeping it small enough that people actually run it." },
      { title: "Release readiness", body: "A clear statement of what has been verified, what has not, and what risk is being accepted — so the decision to ship is made with eyes open." },
      { title: "Defect investigation and reporting", body: "Reproducible reports with the evidence attached, so engineers spend their time fixing rather than reconstructing." },
      { title: "Cross-platform quality", body: "Deciding which browsers, devices and configurations genuinely need coverage, based on who uses the product." },
    ],
    demo: "risk",
    cta: "Discuss a Quality Challenge",
    demoIntro: {
      title: "Risk-Based Testing Explorer",
      body: "A deliberately simple model of how testing priority can be reasoned about. Adjust the inputs and the arithmetic stays visible — the point is the conversation it structures, not the number it produces. It is illustrative, not a prediction engine.",
    },
    deliverables: [
      "A written test strategy with the reasoning behind it",
      "A risk assessment of the product's main areas",
      "Coverage analysis: what is protected, what is exposed",
      "A defect reporting process your team will actually follow",
      "Release-readiness assessments, with risks stated plainly",
      "Handover so the practice continues after we leave",
    ],
    approach: [
      { phase: "Assess", body: "We look at the product, the existing tests and how releases happen today, and find where the real exposure is." },
      { phase: "Plan", body: "We propose a strategy weighted by risk, and agree where depth is worth paying for and where it is not." },
      { phase: "Implement", body: "Test design, execution and reporting, working alongside your developers rather than at arm's length from them." },
      { phase: "Verify", body: "We check the strategy against what actually escapes to production, and adjust where it was wrong." },
      { phase: "Hand over", body: "Documented practice, so quality does not leave when we do." },
    ],
    engagements: [
      { name: "Quality assessment", shape: "Short, fixed scope", body: "A review of your product, tests and release process, returning the highest-risk gaps and a prioritised plan." },
      { name: "Defined-scope engagement", shape: "Agreed outcome and timeline", body: "Building a test strategy, overhauling a regression suite, or taking a specific release through to a readiness decision." },
      { name: "Ongoing quality support", shape: "Continuing, reviewed regularly", body: "Continuous quality work embedded with your team through each release cycle." },
    ],
    related: ["test-automation", "software-engineering"],
  },

  /* -------------------------------------------------------- test automation */
  {
    slug: "test-automation",
    nav: { label: "Test Automation & CI/CD", description: "Frameworks, pipelines and fast feedback." },
    metaTitle: "Ethora Labs | Test Automation & CI/CD",
    metaDescription:
      "Test automation framework architecture, UI and API automation, CI/CD integration, flaky test investigation and failure triage. Automation that teams can trust, from Ethora Labs.",
    headline: "Automation that helps teams move forward.",
    intro:
      "An automated suite is only worth having if people believe its results. The moment a red build becomes something to re-run rather than investigate, the suite has stopped being a safety net and become a tax.",
    addresses: "For teams with a suite they no longer trust, a pipeline that takes too long, or no reliable way to tell a product defect from a test defect.",
    challenges: [
      { title: "Nobody trusts the red build", body: "Failures are re-run until they pass. Everyone knows which tests are 'just flaky'. The suite still runs, still costs money, and no longer changes anyone's decisions." },
      { title: "The pipeline is too slow to be useful", body: "Feedback arrives hours after the change, by which time the developer has moved on. Slow feedback does not just waste time; it changes behaviour, because people stop waiting for it." },
      { title: "Automation was built, then abandoned", body: "A suite was written during a push, then drifted out of date as the product changed. Fixing it keeps losing to feature work, and the gap grows until it is written off." },
      { title: "A failure arrives with no diagnosis", body: "A test failed. Nobody can tell whether the product broke, the test is wrong, or the environment was down — so the first hour of every failure is spent working out which question to ask." },
    ],
    whatWeDo: [
      { title: "Framework architecture", body: "Structure that survives the product changing: clear layering, shared setup, stable locators and sensible failure output. A suite is a codebase, and it deserves the same design attention." },
      { title: "UI and API automation", body: "Automation at the level that answers the question most cheaply. API checks for logic and data, UI journeys for what only a browser can prove." },
      { title: "Cross-platform automation", body: "Coverage across the browsers and devices that genuinely matter to your users, without multiplying the maintenance burden for ones that do not." },
      { title: "CI/CD integration", body: "Tests wired into the pipeline so results arrive while the change is still fresh, with stages ordered so cheap checks fail fast before expensive ones run." },
      { title: "Flaky test investigation", body: "Measuring how often a test fails on an unchanged build, finding the timing or state assumption behind it, and fixing or quarantining it — never normalising the retry." },
      { title: "Execution optimisation", body: "Parallelisation, selective runs and pruning tests that no longer earn their place, so the suite stays fast enough to run often." },
      { title: "Failure triage", body: "Making a failure explain itself: what was being checked, what happened instead, and enough evidence to tell product defect from test defect without a re-run." },
      { title: "Test reporting", body: "Results a developer can read in under a minute, and trends a lead can act on." },
    ],
    demo: "pipeline",
    cta: "Improve Your Test Automation",
    demoIntro: {
      title: "CI Pipeline Simulator",
      body: "Four predefined scenarios through a simplified pipeline. Pick one and step through the stages to see what each outcome means and how it should be investigated. Everything here is a fixed demonstration — no pipeline is running, and no result describes real work.",
    },
    deliverables: [
      "An automation strategy: what to automate, at which level, and what to leave manual",
      "Framework architecture and a working implementation",
      "CI integration with the pipeline stages ordered deliberately",
      "Test result reporting your team will read",
      "A flakiness investigation with findings and fixes",
      "Maintenance documentation, so the suite stays alive",
    ],
    approach: [
      { phase: "Assess", body: "We measure what is actually happening: how long the suite takes, how often it fails without a product change, and where time goes after a failure." },
      { phase: "Plan", body: "We agree what belongs in automation and what does not, and start where trust is being lost fastest." },
      { phase: "Implement", body: "Framework and pipeline work in reviewable increments, with your engineers involved rather than handed a finished black box." },
      { phase: "Verify", body: "We re-measure. Stability and feedback time are checked against where they started, using your numbers rather than claims of ours." },
      { phase: "Hand over", body: "Documentation and a walkthrough, so maintaining the suite is a normal part of the team's work." },
    ],
    engagements: [
      { name: "Automation assessment", shape: "Short, fixed scope", body: "A review of the existing suite and pipeline: what is working, what is costing more than it returns, and what to do first." },
      { name: "Defined-scope engagement", shape: "Agreed outcome and timeline", body: "Building a framework, integrating it into CI, or taking on a specific flakiness and stability problem." },
      { name: "Ongoing automation support", shape: "Continuing, reviewed regularly", body: "Keeping automation healthy as the product changes, including triage and maintenance." },
    ],
    related: ["quality-engineering", "software-engineering"],
  },

  /* ----------------------------------------------------------- innovation */
  {
    slug: "innovation",
    nav: { label: "Engineering & Innovation", description: "Feasibility studies and prototypes." },
    metaTitle: "Ethora Labs | Engineering & Innovation",
    metaDescription:
      "Technical feasibility studies, rapid prototypes, proofs of concept and product discovery. Evidence before investment, including where AI genuinely fits. From Ethora Labs.",
    headline: "Explore the idea. Validate the possibility.",
    intro:
      "The expensive mistake is rarely the prototype that failed. It is the year of development spent on an assumption nobody tested, because testing it felt like a detour.",
    addresses: "For teams holding an idea with no evidence, a decision stuck between technical options, or pressure to adopt something before anyone has asked what problem it solves.",
    challenges: [
      { title: "An idea with no evidence behind it", body: "Everyone has an opinion and nobody has data. The debate repeats in every meeting because there is nothing to settle it, and the cost of finding out is assumed to be higher than it is." },
      { title: "A decision stuck between options", body: "Two or three technical approaches, each with advocates, none with measurements. A short experiment usually resolves in days what argument has not resolved in months." },
      { title: "Pressure to adopt AI without a problem", body: "The requirement arrives as a technology rather than an outcome. Sometimes it genuinely fits; often a much simpler mechanism would do the same job more reliably and far more cheaply. Both answers are worth having." },
      { title: "A prototype mistaken for a product", body: "Something built to answer a question gets promoted into production because it demos well. The shortcuts that made it fast to build are still in there, now load-bearing." },
    ],
    whatWeDo: [
      { title: "Technical feasibility studies", body: "A time-boxed investigation of whether something can be built, at what cost, and with what limits — producing evidence rather than a longer opinion." },
      { title: "Rapid prototypes", body: "The smallest build that answers the question, kept deliberately separate from production code and allowed to be rough where roughness does not affect the answer." },
      { title: "Proofs of concept", body: "Something concrete enough for stakeholders to react to, with its limits stated clearly so nobody mistakes it for a finished product." },
      { title: "Product discovery", body: "Working out what problem is actually being solved and for whom, before any technical decision is made." },
      { title: "Engineering experimentation", body: "Structured experiments with a stated hypothesis and a stated end date, so exploration does not quietly become an open-ended project." },
      { title: "AI where it solves a real problem", body: "We assess where AI genuinely fits, including the operating cost, failure modes and what happens when it is wrong. When something simpler would serve better, we say so." },
      { title: "Hardware and software integration", body: "An area we expect to grow into rather than one we are presenting as established practice. We would scope any such work honestly, and tell you where our experience ends." },
    ],
    demo: "prototype",
    cta: "Explore an Idea",
    demoIntro: {
      title: "Idea to Prototype Explorer",
      body: "How an idea moves from a sentence to a decision. Step through each stage to see what happens, what it produces, and why stopping can be the most valuable outcome. The stages are illustrative; no project shown here is a real one.",
    },
    deliverables: [
      "A written problem statement and ranked assumptions",
      "A feasibility note with evidence, limits and cost indications",
      "A working prototype, scoped to the question it answers",
      "Test findings, including what the prototype does not prove",
      "A go, revise or stop recommendation with the reasoning",
      "If it is a go: a realistic plan to build it properly",
    ],
    approach: [
      { phase: "Assess", body: "We turn the idea into a question that can actually be answered, and agree what result would change your decision." },
      { phase: "Plan", body: "We rank assumptions by how damaging they would be if false, and target the riskiest first." },
      { phase: "Implement", body: "A time-boxed prototype built to produce evidence, with an agreed end date." },
      { phase: "Verify", body: "The prototype meets reality — real data volumes, real users or real constraints — and results are recorded as they are." },
      { phase: "Hand over", body: "Findings and a recommendation, including an honest account of what remains unknown." },
    ],
    engagements: [
      { name: "Feasibility study", shape: "Short, fixed scope", body: "One question, a time-box, and a written answer with the evidence behind it." },
      { name: "Prototype engagement", shape: "Agreed outcome and timeline", body: "A working prototype built to test specific assumptions, with findings and a recommendation." },
      { name: "Discovery support", shape: "Continuing, reviewed regularly", body: "Ongoing experimentation alongside your team as a product direction takes shape." },
    ],
    related: ["software-engineering", "test-automation"],
  },
];

// Tie up trailing single words once, centrally, rather than per component.
for (const s of services) {
  s.intro = noWidow(s.intro);
  s.headline = noWidow(s.headline);
  s.addresses = noWidow(s.addresses);
  s.nav.description = noWidow(s.nav.description);
  s.demoIntro.body = noWidow(s.demoIntro.body);
  s.deliverables = noWidows(s.deliverables);
  for (const c of s.challenges) c.body = noWidow(c.body);
  for (const w of s.whatWeDo) w.body = noWidow(w.body);
  for (const a of s.approach) a.body = noWidow(a.body);
  for (const e of s.engagements) e.body = noWidow(e.body);
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
