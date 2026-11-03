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
      { title: "Steps to reproduce", body: "Culprit keeps the sequence of actions leading up to a failure and turns it into numbered reproduction steps inside a copyable bug report." },
      { title: "Screenshots", body: "Capture the page as it looked at the moment of the failure, alongside the rest of the evidence." },
      { title: "Sensitive values masked", body: "Passwords, tokens, cards and keys are replaced with [REDACTED] where recognised, so a pasted bug report does not carry secrets with it." },
      { title: "Off by default, site by site", body: "Recording stays off until you turn it on for a given site, and runs locally. It works as a Chrome side panel or from the toolbar, in light and dark themes." },
    ],
    screenshots: [
      {
        src: "/products/culprit/side-panel.webp", w: 1200, h: 860,
        alt: "Culprit open as a Chrome side panel beside a checkout page, listing three failed requests with the clicks that triggered them.",
        caption: "Culprit runs beside the page you are testing, as a Chrome side panel or from the toolbar.",
      },
      {
        src: "/products/culprit/panel.webp", w: 800, h: 1152,
        alt: "The Culprit panel: recording indicator, Inspect and Screenshot buttons, the last click's selector, and a list of three failed requests.",
        caption: "Recording state, inspect and screenshot actions, the last click's selector, and every failure captured so far.",
      },
      {
        src: "/products/culprit/diagnosis.webp", w: 800, h: 1472,
        alt: "A failure opened in Culprit showing what happened, a possible cause, the button that triggered it, and four numbered steps to reproduce.",
        caption: "Each failure opens with what happened and numbered steps to reproduce. A possible cause is offered as a hypothesis, labelled as not a confirmed diagnosis.",
      },
      {
        src: "/products/culprit/selectors.webp", w: 800, h: 1472,
        alt: "Culprit's selector view showing a recommended test-attribute selector and four alternatives rated unique, stable, fair or fragile.",
        caption: "Selector options for the clicked element, each rated for uniqueness and stability, shown in your framework's syntax.",
      },
      {
        src: "/products/culprit/request.webp", w: 800, h: 1120,
        alt: "A request payload in Culprit showing URL, method, status and timing, with card number and CVV replaced by [REDACTED].",
        caption: "Full request and response detail, with headers, payload and cURL \u2014 and sensitive values replaced by [REDACTED] where recognised.",
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
