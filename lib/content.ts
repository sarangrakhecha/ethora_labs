// All editable site copy lives here. No invented stats, clients or testimonials.

export const site = {
  name: "Ethora Labs",
  tagline: "Built on Principles. Driven by Possibility.",
  domain: "ethoralabs.co",
  legal: "Ethora Labs Private Limited",
  year: 2026,
};

export const stages = [
  { id: "design", title: "Design", short: "Define the right solution", long: "Define the problem, plan the architecture, and identify risks before writing a line of code.", detail: "Requirements, constraints and architecture are made explicit, and the riskiest assumptions surface early, when they are cheapest to address." },
  { id: "build", title: "Build", short: "Create with engineering rigour", long: "Implement reliable, maintainable technology using disciplined engineering practices.", detail: "Work proceeds in small, reviewable increments with clear interfaces and readable code, so your own team can understand, extend and own it." },
  { id: "verify", title: "Verify", short: "Assure quality and reliability", long: "Validate functionality, automate testing, and assess quality before anything ships.", detail: "Quality is built in from the start, not inspected at the end, with risk-based strategy and automated checks giving an honest picture of readiness." },
  { id: "improve", title: "Improve", short: "Evolve for greater impact", long: "Optimize, iterate, and continuously refine based on what verification reveals.", detail: "What verification and real use reveal feeds back into design, so each cycle tightens the product, the process and the confidence behind both." },
] as const;

export type Capability = {
  id: string; slug: string; title: string; icon: string;
  description: string; more: string; intro: string;
  what: string[]; how: { title: string; body: string }[]; fit: string[]; start: string;
};

export const capabilities: Capability[] = [
  {
    id: "software", slug: "software-engineering", title: "Software Engineering", icon: "laptop",
    description: "Design, develop, integrate, and maintain reliable and scalable applications.",
    more: "From early prototypes to production systems, we work across the stack and integrate with the tools you already run. We favour simple, well-understood architecture over fashionable complexity.",
    intro: "Software is easy to start and hard to keep. We build applications that your own team can read, change and operate long after the first release — choosing simple, well-understood architecture over fashionable complexity, and writing down the decisions that matter.",
    what: [
      "Web and backend application development",
      "API design, and integration with the systems you already run",
      "Architecture and technical design for new products",
      "Restructuring and modernising existing codebases",
      "Ongoing maintenance, fixes and support",
    ],
    how: [
      { title: "Understand before building", body: "We start with the problem, the users and the constraints, and make the architecture and the riskiest assumptions explicit before any code is written." },
      { title: "Work in small increments", body: "Changes arrive in reviewable pieces with clear interfaces, readable code and a version-controlled history, so progress is visible and reversible." },
      { title: "Leave it owned, not rented", body: "Documentation, tests and handover are part of the work. You should be able to continue without us, whether or not you choose to." },
    ],
    fit: [
      "You are starting a new product and want the first version built properly",
      "An existing system has become slow or risky to change",
      "Your team needs extra engineering capacity for a defined piece of work",
    ],
    start: "We usually begin with a short discovery conversation, then a small, well-defined first piece of work — a design, a spike or a thin slice of the product — so you can judge the approach before committing further.",
  },
  {
    id: "quality", slug: "quality-engineering", title: "Quality Engineering", icon: "shield",
    description: "Improve software quality through thoughtful testing strategies, validation, and risk-based approaches.",
    more: "We help teams decide what to test, how deeply and when, so effort goes where failure would cost the most. Quality becomes a shared engineering practice rather than a final gate.",
    intro: "Testing everything equally is as expensive as testing nothing deliberately. We help teams decide what to test, how deeply and when, so that effort goes where failure would cost the most — and so that quality becomes a shared engineering practice rather than a final gate before release.",
    what: [
      "Test strategy weighted by risk, not by habit",
      "Functional, regression and exploratory testing",
      "Reviewing existing coverage and naming the real gaps",
      "Defect triage and root-cause analysis",
      "Building quality practices into the development workflow",
    ],
    how: [
      { title: "Start from risk", body: "We map what the product does against what would actually hurt if it broke, and let that decide where depth is worth paying for." },
      { title: "Make quality visible", body: "Coverage, known gaps and open risk are reported plainly, so a release decision is based on evidence rather than on confidence." },
      { title: "Shift the work earlier", body: "Review, test design and automation move alongside development, where defects are cheaper to find and cheaper to fix." },
    ],
    fit: [
      "Bugs keep reaching users after release",
      "Testing is mostly manual, slow or inconsistent",
      "Nobody can say clearly what is covered and what is not",
    ],
    start: "We usually begin with a lightweight review of your product, tests and release process, and come back with the highest-risk gaps and a short, prioritised plan to close them.",
  },
  {
    id: "automation", slug: "test-automation-cicd", title: "Test Automation & CI/CD", icon: "loop",
    description: "Build automation frameworks, optimize test pipelines, and streamline software delivery workflows.",
    more: "We design maintainable automation suites and delivery pipelines that give fast, trustworthy feedback, and we remove the flaky, slow or manual steps that hold releases back.",
    intro: "An automated suite is only worth having if people believe its results. We build automation and delivery pipelines that are fast enough to run often and reliable enough to act on, and we fix the flaky, slow or manual steps that quietly push teams back to testing by hand.",
    what: [
      "Automation frameworks designed to be maintained, not just demonstrated",
      "UI, API and integration test suites",
      "CI/CD pipeline design, build and tuning",
      "Diagnosing and fixing flaky or slow suites",
      "Release and deployment automation",
    ],
    how: [
      { title: "Automate what earns it", body: "Repetitive, high-risk and frequently run checks are automated first. Cases better served by a person stay with a person." },
      { title: "Build for maintenance", body: "Clear structure, stable selectors and shared helpers keep a suite usable as the product changes, instead of becoming a second codebase nobody wants to touch." },
      { title: "Keep feedback fast and honest", body: "Pipelines are tuned so results arrive while the change is still fresh, and a red build means something is genuinely wrong." },
    ],
    fit: [
      "Builds and deployments are slow or still done by hand",
      "The test suite is flaky and the team has stopped trusting it",
      "Too much engineering time goes to repetitive checks",
    ],
    start: "We usually begin by mapping how work flows from commit to release with your team, then start with the single change that removes the most friction.",
  },
  {
    id: "innovation", slug: "engineering-innovation", title: "Engineering & Innovation", icon: "bulb",
    description: "Explore new technologies, prototype solutions, and turn promising ideas into practical products.",
    more: "We evaluate emerging technology, including AI, only where it genuinely fits the problem. Promising ideas are prototyped quickly and tested against reality before anyone commits to build them fully.",
    intro: "New technology is worth adopting when it solves a problem you actually have. We prototype quickly, test ideas against reality, and give you an honest read on what is worth building — including when the answer is that it is not.",
    what: [
      "Technical feasibility studies and time-boxed spikes",
      "Rapid prototypes that test an idea before full investment",
      "Assessing where AI or new tooling genuinely fits",
      "Proof-of-concept builds for internal decision-making",
      "Turning a working prototype into a realistic plan to build",
    ],
    how: [
      { title: "Frame the question", body: "Before any prototype, we agree what the experiment has to answer and what result would change your decision." },
      { title: "Build the smallest honest test", body: "A prototype exists to produce evidence, so we build only as much as the question needs, and we keep it clearly separate from production work." },
      { title: "Report what we found", body: "You get the result either way, including the limits of what the prototype proves and what it would take to build properly." },
    ],
    fit: [
      "You need to know whether an idea is technically feasible",
      "A decision is stuck between competing technical options",
      "You want to test an idea with users before investing in a full build",
    ],
    start: "We usually begin with a short, time-boxed piece of work with an agreed question and an agreed end date, so the cost of finding out stays small.",
  },
];

export const problems = [
  {
    id: "product", label: "Build a Product", summary: "Turn an idea into a well-engineered, production-ready solution.",
    problems: ["You have an idea but no clear scope, architecture or plan", "You need a prototype to test an assumption before investing further", "Your team lacks capacity or specific engineering expertise", "You want a foundation that will not need rewriting in a year"],
    capabilities: ["Software Engineering", "Engineering & Innovation", "Quality Engineering"],
    start: "We begin with a conversation about the problem, users and constraints, then propose a small, well-defined first step such as a design sprint or prototype, so you can judge the approach before committing further.",
    seed: "We're looking to build a product. Here's the idea and where we are so far:\n\n",
  },
  {
    id: "quality", label: "Improve Software Quality", summary: "Increase reliability, reduce risk, and ship with greater confidence.",
    problems: ["Bugs keep reaching users after release", "Testing is mostly manual, slow or inconsistent", "Nobody is sure what is covered and what is not", "Releases feel risky and are delayed by late-stage fixes"],
    capabilities: ["Quality Engineering", "Test Automation & CI/CD", "Software Engineering"],
    start: "We start with a lightweight review of your product, tests and release process to identify the highest-risk gaps, then agree a short, prioritised plan to address them.",
    seed: "We'd like to improve our software quality. Our current testing and release process looks like this:\n\n",
  },
  {
    id: "workflow", label: "Streamline Engineering Workflows", summary: "Bring more speed, automation and consistency to your delivery.",
    problems: ["Builds and deployments are slow or manual", "Test pipelines are flaky and developers stop trusting them", "Environments and processes differ from team to team", "Too much engineering time goes to repetitive work"],
    capabilities: ["Test Automation & CI/CD", "Software Engineering", "Quality Engineering"],
    start: "We map how work currently flows from commit to release, find the main bottlenecks with your team, and begin with the one change that removes the most friction.",
    seed: "We want to streamline our engineering workflow. Today our build, test and release process works like this:\n\n",
  },
] as const;

// Hash links are prefixed with "/" so they also work from the capability pages.
export const nav = [
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
