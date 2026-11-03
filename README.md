# Ethora Labs website

Marketing site for [ethoralabs.co](https://ethoralabs.co). Next.js (App Router) + TypeScript + Tailwind CSS v4, static export for Cloudflare Pages.

```bash
npm install
npm run dev      # local dev
npm run build    # static export to ./out
```

**Cloudflare Pages:** build command `npm run build`, output directory `out`.

## Routes

| Route | What it is |
|---|---|
| `/` | Introduction: hero, Engineering Canvas, capability panels, problem-first, products, about summary, contact CTA |
| `/services` | Capability index |
| `/services/{software-engineering,quality-engineering,test-automation,innovation}` | Full service pages, each with its own interactive demonstration |
| `/products`, `/products/{culprit,renewguard}` | Product division |
| `/about`, `/contact` | About and contact |

Old `/capabilities/*` URLs redirect via `public/_redirects`.

## Testing

```bash
npm run test:unit   # node:test — demo logic + content integrity (no deps)
npm run build
npm run test:e2e    # Playwright — routes, nav, demos, forms, SEO, a11y
npm test            # all three in order
```

`test:unit` imports the TypeScript sources directly using Node's native type stripping.
`test:e2e` resolves Playwright from the environment rather than as a project dependency,
so the project still depends only on Next, React and Tailwind.

## Typography rule

No line of running text ends with a single stranded word. Two mechanisms enforce it:

1. `app/globals.css` sets `text-wrap: balance` on headings and `text-wrap: pretty` on body copy.
2. `lib/typography.ts` `noWidow()` ties the last two words with a non-breaking space, applied
   centrally in `lib/services.ts`, `lib/products.ts` and `lib/demos.ts` for the cases CSS cannot
   fix (where the final word is long enough to fill a line on its own).

`npm run test:e2e` checks every route at 1440/1024/768/390px and fails if any text block ends
with a one-word line, so this cannot silently regress.

## Editing content
- Service page copy: `lib/services.ts` (one entry per service drives the whole page).
- Demo logic and copy: `lib/demos.ts` (pure functions, unit-tested).
- Home page copy: `lib/content.ts` (canvas stages, problem-first entries, nav).
- Product copy: `lib/products.ts`.
- One component per section in `components/` (Hero, Approach, Capabilities, ProblemFirst, About, Insights, Contact, Footer).
- Colors/fonts: `app/globals.css`, `app/layout.tsx`.

## Open TODOs
- **Contact form** (`components/Contact.tsx`): wired to Formspree but switched off until configured.
  Set `NEXT_PUBLIC_FORM_ENDPOINT` to your Formspree URL (`https://formspree.io/f/xxxxxxxx`) in the
  Cloudflare project's environment variables and redeploy. Without it the button stays disabled and
  the form never claims a message was sent.
- **Founder profile** (`components/About.tsx`): verify the stated experience before launch; add a photo and profile link.
- **Insights**: removed from nav and home until there is a post to publish (`components/Insights.tsx` is kept, unused).
- **Privacy Policy**: footer shows "coming soon"; no page yet.
- **Logo**: temporary wordmark and mark in `components/Icons.tsx`.
- No stats, clients, testimonials or press are included, and none should be added unless real.
