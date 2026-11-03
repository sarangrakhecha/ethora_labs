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

export const capabilities = [
  { id: "software", title: "Software Engineering", icon: "laptop", description: "Design, develop, integrate, and maintain reliable and scalable applications.", more: "From early prototypes to production systems, we work across the stack and integrate with the tools you already run. We favour simple, well-understood architecture over fashionable complexity." },
  { id: "quality", title: "Quality Engineering", icon: "shield", description: "Improve software quality through thoughtful testing strategies, validation, and risk-based approaches.", more: "We help teams decide what to test, how deeply and when, so effort goes where failure would cost the most. Quality becomes a shared engineering practice rather than a final gate." },
  { id: "automation", title: "Test Automation & CI/CD", icon: "loop", description: "Build automation frameworks, optimize test pipelines, and streamline software delivery workflows.", more: "We design maintainable automation suites and delivery pipelines that give fast, trustworthy feedback, and we remove the flaky, slow or manual steps that hold releases back." },
  { id: "innovation", title: "Engineering & Innovation", icon: "bulb", description: "Explore new technologies, prototype solutions, and turn promising ideas into practical products.", more: "We evaluate emerging technology, including AI, only where it genuinely fits the problem. Promising ideas are prototyped quickly and tested against reality before anyone commits to build them fully." },
] as const;

export const problems = [
  {
    id: "product", label: "Build a Product", summary: "Turn an idea into a well-engineered, production-ready solution.",
    problems: ["You have an idea but no clear scope, architecture or plan", "You need a prototype to test an assumption before investing further", "Your team lacks capacity or specific engineering expertise", "You want a foundation that will not need rewriting in a year"],
    capabilities: ["Software Engineering", "Engineering & Innovation", "Quality Engineering"],
    start: "We begin with a conversation about the problem, users and constraints, then propose a small, well-defined first step such as a design sprint or prototype, so you can judge the approach before committing further.",
  },
  {
    id: "quality", label: "Improve Software Quality", summary: "Increase reliability, reduce risk, and ship with greater confidence.",
    problems: ["Bugs keep reaching users after release", "Testing is mostly manual, slow or inconsistent", "Nobody is sure what is covered and what is not", "Releases feel risky and are delayed by late-stage fixes"],
    capabilities: ["Quality Engineering", "Test Automation & CI/CD", "Software Engineering"],
    start: "We start with a lightweight review of your product, tests and release process to identify the highest-risk gaps, then agree a short, prioritised plan to address them.",
  },
  {
    id: "workflow", label: "Streamline Engineering Workflows", summary: "Bring more speed, automation and consistency to your delivery.",
    problems: ["Builds and deployments are slow or manual", "Test pipelines are flaky and developers stop trusting them", "Environments and processes differ from team to team", "Too much engineering time goes to repetitive work"],
    capabilities: ["Test Automation & CI/CD", "Software Engineering", "Quality Engineering"],
    start: "We map how work currently flows from commit to release, find the main bottlenecks with your team, and begin with the one change that removes the most friction.",
  },
] as const;

export const nav = [
  { label: "Approach", href: "#approach" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];
