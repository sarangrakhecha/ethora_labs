# The contact form is live

`NEXT_PUBLIC_FORM_ENDPOINT` is set in `.env.production` to a Formspree endpoint
delivering to `hello@ethoralabs.co`. `next build` picks this up automatically —
nothing to pass by hand. It's committed (not a secret: a Formspree endpoint is
a public POST target by design, meant to be baked into client-side JS).

**One thing this environment couldn't verify itself**: this session's network
policy blocks outbound requests to formspree.io, so an automated end-to-end
submission test could not actually confirm delivery before this shipped.
Everything else was verified (the endpoint is correctly baked into the built
JS, the UI correctly falls back to its error state rather than a false success
when a request is blocked, and the full test suite passes). **Send one real
test inquiry from the live site and confirm it lands in `hello@ethoralabs.co`
before telling anyone the form is live.**

This site is a fully static export (`output: "export"` in `next.config.ts`), and
`wrangler.jsonc` deploys it as static assets with no Worker/server code attached.
That means there is no server of ours to receive the form POST, validate it, send
the email, rate-limit it or filter spam — any of that happens on Formspree's
side, not ours.

## What's already done

- Client-side validation (required fields, email format, length limits)
- Honeypot field + a minimum-fill-time check (silently drops obvious bots)
- Loading, success, and error states, with retry-by-email on failure
- A synchronous submit lock so a double-click can't send twice
- Accessible labels, errors and status announcements (`aria-live`)
- Service-context preselection from `/contact/?service=<slug>`
- No secrets anywhere in the code — there's nothing to leak, because the
  submission target is a public POST endpoint by design (see below)

## What's left

1. Double-check Formspree's spam protection and rate limiting are turned on in
   its dashboard (reCAPTCHA/Akismet filtering, submission caps). That's the
   "server-side validation / spam protection / rate limiting" the original
   request asked for — a static site can't implement any of that itself, so
   it lives on Formspree's side.
2. **Send one real test inquiry from the deployed site** and confirm it
   arrives at `hello@ethoralabs.co` before telling anyone the form is live —
   this specific environment's network policy couldn't make that call itself.
3. If the endpoint ever needs to change, edit `.env.production` and rebuild —
   no code change needed.

## If you'd rather have real server-side logic instead

A Formspree-style endpoint is the lowest-complexity option, but it means spam
filtering and rate limiting are whatever the provider offers, not custom logic
you control. The next step up is adding a Cloudflare Worker (`wrangler.jsonc`
would need a `main` entry) that validates the request, calls an email API
(e.g. Resend) with a secret stored via `wrangler secret put`, and applies your
own rate limiting (e.g. via Cloudflare KV). That's a real architecture change,
not a config tweak — worth doing only if the provider route turns out to be
insufficient.
