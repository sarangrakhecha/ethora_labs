// Product data. Everything here is either stated by the Ethora team or deliberately
// left empty — no invented features, metrics, availability or screenshots.

// TODO(culprit-store): paste the Chrome Web Store listing URL here. While it is empty
// the page shows an enquiry CTA instead of an install button, rather than linking nowhere.
export const CULPRIT_STORE_URL = "";

export type Product = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  summary: string;
  status: { label: string; detail: string; available: boolean };
  /** Capability areas as described by the team. No expanded claims until copy is supplied. */
  areas: string[];
  /** TODO: replace with real screenshots once supplied (see README). */
  art: "culprit" | "renewguard";
};

export const products: Product[] = [
  {
    slug: "culprit",
    name: "Culprit",
    kind: "Chrome extension",
    tagline: "Find what actually went wrong.",
    summary:
      "Culprit is our proprietary Chrome extension for software debugging. It covers failure capture, selectors, network diagnostics and screenshots, in one place in the browser.",
    status: {
      label: "Available on the Chrome Web Store",
      detail: "Culprit is published and installable today.",
      available: true,
    },
    areas: ["Software debugging", "Failure capture", "Selectors", "Network diagnostics", "Screenshots"],
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
    art: "renewguard",
  },
];
