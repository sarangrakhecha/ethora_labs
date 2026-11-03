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
- **Contact form** (`components/Contact.tsx`): wired to Formspree but switched off until configured.
  Set `NEXT_PUBLIC_FORM_ENDPOINT` to your Formspree URL (`https://formspree.io/f/xxxxxxxx`) in the
  Cloudflare project's environment variables and redeploy. Without it the button stays disabled and
  the form never claims a message was sent.
- **Founder profile** (`components/About.tsx`): verify the stated experience before launch; add a photo and profile link.
- **Insights**: removed from nav and home until there is a post to publish (`components/Insights.tsx` is kept, unused).
- **Privacy Policy**: footer shows "coming soon"; no page yet.
- **Logo**: temporary wordmark and mark in `components/Icons.tsx`.
- No stats, clients, testimonials or press are included, and none should be added unless real.
