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
   * Real product screenshots, as published on the Chrome Web Store listing. While this is
   * empty the page falls back to the abstract brand illustration, clearly labelled as one.
   */
  screenshots: { src: string; alt: string; caption: string; w: number; h: number }[];
  art: "culprit" | "renewguard";
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
      { title: "Failure capture, tied to a cause", body: "Failed requests are captured as they happen and linked to the interaction that triggered them \u2014 \u201cPOST /api/v1/orders \u2192 500, after clicking Button: Place order\u201d \u2014 with a match confidence shown rather than assumed." },
      { title: "Selectors you can trust", body: "For any element Culprit suggests a selector and rates it: unique, stable, or fragile. Test attribute, role and name, visible text, CSS and XPath are offered side by side, and can be copied in your framework's syntax." },
      { title: "Network diagnostics", body: "Each captured request opens into overview, request, response and console views, with headers, payload and a ready-made cURL command." },
      { title: "Reproduction steps and screenshots", body: "Culprit keeps the sequence of actions leading up to a failure, turns it into numbered reproduction steps inside a copyable bug report, and can capture the page as it looked at the moment it broke." },
      { title: "Sensitive values masked", body: "Passwords, tokens, cards and keys are replaced with [REDACTED] where recognised, so a pasted bug report does not carry secrets with it." },
      { title: "Off by default, site by site", body: "Recording stays off until you turn it on for a given site, and runs locally. It works as a Chrome side panel or from the toolbar, in light and dark themes." },
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
    slug: "renewguard",
    name: "RenewGuard",
    kind: "Renewal management",
    tagline: "Know before it renews.",
    summary:
      "RenewGuard is our renewal and recurring-commitment management product, for businesses and individuals who want to see what is about to renew before it does.",
    status: {
      label: "In development",
      detail: "RenewGuard is being built and is not yet available. We are happy to talk to anyone who wants to follow its progress.",
      available: false,
    },
    areas: [],
    features: [],
    screenshots: [],
    art: "renewguard",
  },
];

for (const p of products) {
  p.summary = noWidow(p.summary);
  p.status.detail = noWidow(p.status.detail);
  for (const f of p.features) f.body = noWidow(f.body);
  for (const s of p.screenshots) s.caption = noWidow(s.caption);
}

/** The open-source project, kept deliberately outside `products`: it is not one of ours to sell. */
export const openSource = {
  key: "terminalquest",
  name: "TerminalQuest",
  tagline: "Learn the terminal by saving a ship, not by reading slides.",
  summary:
    "A small arcade game that teaches the command line by making you use it. Each station drops you into a real bash prompt: what you type actually runs, and a real file has to move before anything unlocks. 502 automated tests, 98% coverage, zero dependencies, MIT.",
  href: "https://github.com/sarangrakhecha/TerminalQuest",
};

openSource.summary = noWidow(openSource.summary);
