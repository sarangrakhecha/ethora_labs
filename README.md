# Ethora Labs website

Marketing site for [ethoralabs.co](https://ethoralabs.co). Next.js (App Router) + TypeScript + Tailwind CSS v4, static export for Cloudflare Pages.

```bash
npm install
npm run dev      # local dev
npm run build    # static export to ./out
```

**Cloudflare Pages:** build command `npm run build`, output directory `out`.

## Editing content
- All copy: `lib/content.ts` (stages, capabilities, problem-first entries, nav, footer details).
- One component per section in `components/` (Hero, Approach, Capabilities, ProblemFirst, About, Insights, Contact, Footer).
- Colors/fonts: `app/globals.css`, `app/layout.tsx`.

## Open TODOs
- **Contact form** (`components/Contact.tsx`): no backend yet; submit is disabled by design. Wire up Resend / Formspree / a Cloudflare Worker, and only show success after a confirmed 2xx.
- **Founder profile**: commented-out slot in `components/About.tsx`.
- **Insights**: placeholder section until real posts exist.
- **Privacy Policy**: footer shows "coming soon"; no page yet.
- **Logo**: temporary wordmark and mark in `components/Icons.tsx`.
- No stats, clients, testimonials or press are included, and none should be added unless real.
