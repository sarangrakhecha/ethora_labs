import { noWidow } from "./typography.ts";

// Product data. Everything here is either stated by the Ethora team or deliberately
// left empty — no invented features, metrics, availability or screenshots.

export const CULPRIT_STORE_URL =
  "https://chromewebstore.google.com/detail/culprit/mjojkcpnakbdgicdopdibpehoihkjhcb";

export type Product = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  summary: string;
  status: { label: string; detail: string; available: boolean };
  /** Capability areas as described by the team. No expanded claims until copy is supplied. */
  areas: string[];
  /** Features described from the product's own published screenshots. */
  features: { title: string; body: string }[];
  /**
   * Real product screenshots -- Culprit's as published on the Chrome Web Store listing,
   * Recurr's from its own internal build. While this is empty the page falls back to
   * the abstract brand illustration, clearly labelled as one.
   */
  screenshots: { src: string; alt: string; caption: string; w: number; h: number }[];
  art: "culprit" | "recurr";
  /** Pre-launch products only: where to email to ask for early access. Never substitutes
   * for Ethora's own consulting contact address. */
  waitlistEmail?: string;
};

export const products: Product[] = [
  {
    slug: "culprit",
    name: "Culprit",
    kind: "Chrome extension",
    tagline: "Every failure leaves a clue.",
    summary:
      "Culprit is our proprietary Chrome extension for software debugging. It records what happened in the browser, ties each failed request back to the click that caused it, and turns that into a selector, a reproduction and a bug report you can paste straight into a ticket.",
    status: {
      label: "Available on the Chrome Web Store",
      detail: "Culprit is published and installable today.",
      available: true,
    },
    areas: ["Software debugging", "Failure capture", "Selectors", "Network diagnostics", "Screenshots"],
    features: [
      { title: "Failure capture, tied to a cause", body: "Failed requests are linked to the click that triggered them \u2014 \u201cPOST /api/v1/orders \u2192 500, after Place order\u201d \u2014 with a match confidence shown, not assumed." },
      { title: "Selectors you can trust", body: "For any element, Culprit suggests a selector rated unique, stable, or fragile \u2014 with the alternatives shown alongside it, copyable in your framework's syntax." },
      { title: "Network diagnostics", body: "Each captured request opens into overview, request, response and console views, with headers, payload and a ready-made cURL command." },
      { title: "Reproduction steps and screenshots", body: "The sequence leading to a failure becomes numbered reproduction steps in a copyable bug report, with a screenshot of the moment it broke." },
      { title: "Sensitive values masked", body: "Passwords, tokens, cards and keys are replaced with [REDACTED] where recognised, so a pasted bug report doesn't carry secrets." },
      { title: "Off by default, site by site", body: "Recording stays off until turned on for a given site, and runs locally \u2014 as a side panel or toolbar popup, in light and dark." },
    ],
    screenshots: [
      {
        src: "/products/culprit/hero.webp", w: 1600, h: 1000,
        alt: "Culprit side panel beside a checkout page, with badges reading No accounts, Nothing leaves your device, and Chrome side panel.",
        caption: "Every failure leaves a clue. No accounts, nothing leaves your device.",
      },
      {
        src: "/products/culprit/selectors.webp", w: 1600, h: 1000,
        alt: "Culprit's selector panel showing a recommended test-attribute selector alongside role, visible-text, CSS and XPath alternatives, each rated unique/stable, fair or fragile.",
        caption: "One recommended selector, stated honestly \u2014 with the alternatives and their trade-offs shown alongside it.",
      },
      {
        src: "/products/culprit/masking.webp", w: 1600, h: 1000,
        alt: "A request payload before and after masking, with a signature, bearer token, card number and CVV each replaced by [REDACTED].",
        caption: "Sensitive values are masked where recognised \u2014 applied before anything is shown or copied.",
      },
      {
        src: "/products/culprit/bug-report.webp", w: 1600, h: 1000,
        alt: "A failure's What happened panel next to the Markdown bug report Culprit generates from it, with reproduction steps and the failing request.",
        caption: "From click to bug report in one press: reproduction steps, the request, and the result, ready to paste into a ticket.",
      },
      {
        src: "/products/culprit/sequence.webp", w: 1200, h: 860,
        alt: "Three Culprit panels in sequence: the activity list, a failure opened to its diagnosis and reproduction steps, and the selector view.",
        caption: "Capture, diagnosis and selector, end to end.",
      },
    ],
    art: "culprit",
  },
  {
    slug: "recurr",
    name: "Recurr",
    kind: "Renewal management",
    tagline: "Know before it renews.",
    summary:
      "Recurr helps businesses and individuals stay ahead of recurring commitments — from subscriptions and memberships to vendor contracts and insurance.",
    status: {
      label: "In development",
      detail: "Recurr is being built and is not yet publicly available. The screens below are from our own internal build.",
      available: false,
    },
    areas: [],
    features: [
      { title: "A clear daily overview", body: "What needs a decision, what's renewing soon, and savings identified versus actually protected — in one view." },
      { title: "Renewals, ordered by urgency", body: "Sorted by the last date you can still act, with a visible countdown to that deadline rather than just the renewal date itself." },
      { title: "Every vendor in one place", body: "Software, suppliers, leases and service contracts together, each with its category, owner and annual cost." },
      { title: "Savings you can trust", body: "A three-stage funnel — Identified, Approved, Protected — so a potential saving is never shown as money already saved." },
    ],
    // A 5th feature (the forwarding address) was dropped from this list -- it left an
    // uneven grid, and it's already covered in full in the "Forward it. We'll track it."
    // vision section below, so nothing is lost by not repeating it here too.
    screenshots: [
      { src: "/products/recurr/overview.webp", w: 2000, h: 1250,
        alt: "Recurr overview dashboard greeting the user, showing renewing-soon total, potential savings, protected savings, and a list of renewals that need attention.",
        caption: "Overview: what needs a decision, surfaced first — not buried in a list." },
      { src: "/products/recurr/renewals.webp", w: 2000, h: 1250,
        alt: "Recurr renewals list filtered to Needs attention, showing Adobe Creative Cloud and Shakti Metals with days-left countdowns and a Review and decide action.",
        caption: "Renewals: ordered by the last day you can still change your mind." },
      { src: "/products/recurr/vendors.webp", w: 2000, h: 1250,
        alt: "Recurr vendors table listing software, suppliers, leases and service contracts with status, renewal date and annual cost.",
        caption: "Vendors: every recurring commitment in one directory, not scattered across inboxes." },
      { src: "/products/recurr/savings.webp", w: 2000, h: 1250,
        alt: "Recurr savings page showing Identified, Approved and Protected totals as a funnel, with a per-vendor breakdown underneath.",
        caption: "Savings: a figure only counts once the real-world action is actually confirmed." },
    ],
    // The settings/forwarding screenshot (public/products/recurr/settings-forwarding.webp)
    // is a noticeably taller aspect ratio than the four above. ScreenshotStrip's cards share
    // one row height, so including it stretched the other cards and left visible blank space
    // under their captions. Left out of the carousel rather than distorted to fit; the
    // forwarding address is still covered in the "What it does" feature list below.
    art: "recurr",
    waitlistEmail: "hello@recurr.fyi",
  },
];

/**
 * Recurr's planned email-forwarding flow. This is the product vision, not a record
 * of what is live today -- see the "demo build" labelling on the settings screenshot
 * above. The philosophy line is the design intent behind every step.
 */
export const recurrVision = {
  eyebrow: "Product vision",
  headline: "Forward it. We'll track it.",
  philosophy: "Automation by default. Intervention by exception.",
  intro: "How Recurr is designed to turn a forwarded email into a tracked renewal — not a claim that every step runs in production today.",
  steps: [
    "Forward a renewal, invoice, subscription or contract email to track@recurr.fyi",
    "Recurr identifies the approved sender and which workspace it belongs to",
    "It extracts the relevant renewal information from the email",
    "High-confidence renewals are added automatically",
    "Ambiguous information is sent back for a targeted, quick review",
    "Reminders are scheduled around the dates that actually require a decision",
    "You decide: Keep, Reduce, Cancel, or Review again later",
    "The real-world action and its outcome are confirmed before any saving is counted",
  ],
};

/** Who Recurr is for, kept brief -- this is a preview, not a product manual. */
export const recurrAudiences = {
  business: { label: "Business", items: ["SaaS subscriptions", "Vendors and suppliers", "Leases", "Insurance", "Service contracts", "Maintenance agreements"] },
  personal: { label: "Personal", items: ["Memberships", "Subscriptions", "Domains", "Warranties", "Insurance"] },
};

export const recurrSavingsNote =
  "Recurr does not automatically cancel subscriptions, negotiate contracts, or guarantee savings. Choosing Cancel records a decision, not a completed cancellation. Potential savings are not realised savings — they become Protected only once the real-world outcome is confirmed.";

for (const p of products) {
  p.summary = noWidow(p.summary);
  p.status.detail = noWidow(p.status.detail);
  for (const f of p.features) f.body = noWidow(f.body);
  for (const s of p.screenshots) s.caption = noWidow(s.caption);
}

/**
 * Content for the /products/ vision page: why Ethora builds products at all, alongside
 * (not instead of) consulting. Kept separate from `products` above, which is the two
 * products' own factual data (features, status, screenshots).
 */
export const productVision = {
  eyebrow: "Products",
  headline: "We don't just solve problems. We build what we wish existed.",
  body: "At Ethora Labs, we believe useful products begin with a clear understanding of an everyday problem. We explore those problems, question existing workflows, and build thoughtful software that makes complex tasks simpler.",
};

export const whyWeBuild = {
  headline: "Some problems deserve more than a workaround.",
  points: [
    "Useful products often begin with small frustrations people encounter repeatedly.",
    "A better solution does not always require a revolutionary technology.",
    "Sometimes it requires understanding a workflow and removing unnecessary friction.",
    "We value practical usefulness over feature count.",
    "We aim to build products that are dependable, understandable and respectful of users.",
  ],
  connection: "The same engineering principles that shape our consulting work — integrity, rigour, curiosity and ownership — shape what we choose to build and how we build it.",
};

export type PhilosophyStage = { id: string; name: string; question: string; body: string };

/**
 * Observe → Question → Simplify → Build → Validate → Improve: an illustrative
 * product-development framework, not a record that every product here has completed
 * every stage. Deliberately a different shape from the Engineering Canvas (Design,
 * Build, Verify, Improve) — this one is about deciding what is worth building at all,
 * not about delivering a piece of client work.
 */
export const PHILOSOPHY_STAGES: PhilosophyStage[] = [
  { id: "observe", name: "Observe", question: "What is actually happening?", body: "Understand an actual problem and its context — who has it, how often, and what they do about it today." },
  { id: "question", name: "Question", question: "Why does it work this way?", body: "Challenge existing assumptions and workflows, including the ones that have simply never been questioned before." },
  { id: "simplify", name: "Simplify", question: "What is the smallest real fix?", body: "Identify the smallest useful solution — not the most impressive one, the one that actually removes the friction." },
  { id: "build", name: "Build", question: "Can this be trusted?", body: "Engineer a dependable implementation: the part that has to work correctly every time, not just in a demo." },
  { id: "validate", name: "Validate", question: "Does it actually work?", body: "Test whether it works technically and solves the intended problem — both questions, not just the first one." },
  { id: "improve", name: "Improve", question: "What did we learn?", body: "Refine based on evidence and feedback, and feed what is learned back into the next thing observed." },
];

export const productsConnect = {
  headline: "Different problems. The same principles.",
  intro: "Culprit and Recurr solve very different problems, for very different people, and they do not share a platform, data or infrastructure. What connects them is how we approach building anything:",
  points: [
    "Reduce unnecessary complexity.",
    "Make important information visible.",
    "Help people act with greater confidence.",
    "Respect user control.",
    "Build dependable, practical tools.",
  ],
};

export const productsClosing = noWidow(
  "We build products because we believe engineering should make everyday work clearer, simpler and more dependable. Culprit and Recurr are two expressions of that belief — and our curiosity doesn't end there."
);

for (const s of PHILOSOPHY_STAGES) s.body = noWidow(s.body);
for (let i = 0; i < whyWeBuild.points.length; i++) whyWeBuild.points[i] = noWidow(whyWeBuild.points[i]);
whyWeBuild.connection = noWidow(whyWeBuild.connection);
productVision.body = noWidow(productVision.body);
productsConnect.intro = noWidow(productsConnect.intro);
for (let i = 0; i < productsConnect.points.length; i++) productsConnect.points[i] = noWidow(productsConnect.points[i]);

/**
 * The open-source project, kept deliberately outside `products`: it is not one of ours
 * to sell. It has its own page (not the shared [slug] product template, since its shape
 * is genuinely different \u2014 no store listing, no commercial status) that explains it
 * honestly and links out to the real repository.
 */
export const openSource = {
  key: "terminalquest",
  slug: "terminalquest",
  name: "TerminalQuest",
  tagline: "Learn the terminal by saving a ship, not by reading slides.",
  summary:
    "A small arcade game that teaches the command line by making you use it. Each station drops you into a real bash prompt: what you type actually runs, and a real file has to move before anything unlocks. 502 automated tests, 98% coverage, zero dependencies, MIT.",
  href: "https://github.com/sarangrakhecha/TerminalQuest",
  facts: ["8 commands, 3 levels", "502 automated tests", "98% coverage", "Zero dependencies", "MIT"],
  why: "Almost nobody teaches the terminal itself \u2014 ls, cd, cat, mkdir, mv, rm \u2014 the commands used dozens of times a day. Most people pick it up the slow way, one searched error at a time. TerminalQuest is a small attempt at fixing that the fun way: the \u201cpuzzle\u201d at every station is solved by typing one real command, in a real shell, with real consequences \u2014 not a simulated, multiple-choice version of it.",
  loop: [
    { title: "Walk the ship", body: "Move around with arrow keys, dodge patrolling enemies, and find your way to an old computer." },
    { title: "Read the panel", body: "Every terminal shows exactly what is needed: the command, what it does, its syntax, and the concrete task \u2014 and nothing more." },
    { title: "Run the real command", body: "There is no autofill. Whatever is typed runs through actual /bin/bash, starting in a scratch folder on the machine." },
    { title: "Something unlocks", body: "Get it right, and the world reacts \u2014 a door opens, a gate unlocks \u2014 because a real file was actually created, moved or deleted." },
  ],
  philosophy: [
    "Real outcomes, not answer matching \u2014 every station checks the actual filesystem after a command runs.",
    "Guidance without autopilot \u2014 the panel shows the exact command; it still has to be typed.",
    "Explanation at the right moment \u2014 the ? affordance is available after something has run, not forced beforehand.",
    "Progress without pressure \u2014 no timers, no speed bonuses, no typing races.",
    "Accessible by default \u2014 a high-contrast mode uses bold, underline and reverse video, not colour alone.",
  ],
  // Rendered directly from the game's own drawing code, not mockups.
  screenshots: [
    { src: "/products/terminalquest/title.webp", w: 990, h: 614,
      alt: "TerminalQuest title screen: block-letter logo reading TERMINALQUEST, signal lost, with the controls and station legend below.",
      caption: "The title screen, with the controls and what each symbol on the map means." },
    { src: "/products/terminalquest/overworld.webp", w: 1035, h: 596,
      alt: "The overworld map with teal rooms, a sealed level 3 area, a HUD showing lives, stations cleared and the next terminal.",
      caption: "The overworld: a sealed level ahead, a live HUD, and a legend coloured to match the map." },
    { src: "/products/terminalquest/station.webp", w: 1098, h: 722,
      alt: "A terminal station showing the command cat key.txt, what it does, its syntax, the task, and a real bash prompt with a failed attempt and a tip.",
      caption: "A station: the command, what it does, the task \u2014 and a real bash prompt underneath, with a tip after a wrong attempt." },
    { src: "/products/terminalquest/level-complete.webp", w: 1035, h: 578,
      alt: "A LEVEL 1 COMPLETE popup over the overworld map, with a highlighted PRESS SPACE TO CONTINUE bar.",
      caption: "Clearing a level is a deliberate beat, not a screen you blink and miss." },
    { src: "/products/terminalquest/win.webp", w: 981, h: 398,
      alt: "The YOU WIN screen in block letters, with score, lives left, quiz result, the commands actually used, and a real :wq prompt to exit.",
      caption: "Finishing the game: the commands actually used, printed back as a takeaway, and a real prompt that answers you." },
  ],
};

openSource.summary = noWidow(openSource.summary);
openSource.why = noWidow(openSource.why);
for (const step of openSource.loop) step.body = noWidow(step.body);
for (let i = 0; i < openSource.philosophy.length; i++) openSource.philosophy[i] = noWidow(openSource.philosophy[i]);
for (const s of openSource.screenshots) s.caption = noWidow(s.caption);

recurrVision.intro = noWidow(recurrVision.intro);
for (let i = 0; i < recurrVision.steps.length; i++) recurrVision.steps[i] = noWidow(recurrVision.steps[i]);
