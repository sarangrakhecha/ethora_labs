# Turning the contact form on

This site is a fully static export (`output: "export"` in `next.config.ts`), and
`wrangler.jsonc` deploys it as static assets with no Worker/server code attached.
That means there is no server of ours to receive the form POST, validate it, send
the email, rate-limit it or filter spam — any of that has to happen on a provider's
side, not ours. The form (`components/ContactForm.tsx`) is already built to POST
directly to such a provider; it's just not pointed at one yet.

## What's already done

- Client-side validation (required fields, email format, length limits)
- Honeypot field + a minimum-fill-time check (silently drops obvious bots)
- Loading, success, and error states, with retry-by-email on failure
- A synchronous submit lock so a double-click can't send twice
- Accessible labels, errors and status announcements (`aria-live`)
- Service-context preselection from `/contact/?service=<slug>`
- No secrets anywhere in the code — there's nothing to leak, because the
  submission target is a public POST endpoint by design (see below)

## What's left: pick a form provider and wire the endpoint

1. **Create an account with a static-site form provider** that accepts a direct
   client-side POST and forwards it as email. Formspree is what the code's
   comments assume, since it's the lowest-complexity option that needs no
   server of ours — but Web3Forms or Getform work the same way if you'd rather
   use one of those.
2. **Verify `hello@ethoralabs.co`** as the recipient address with that provider
   (they'll send a confirmation link to that inbox).
3. **Enable the provider's spam protection and rate limiting** in its dashboard
   (e.g. Formspree's built-in reCAPTCHA/Akismet filtering and submission caps).
   This is the "server-side validation / spam protection / rate limiting" the
   request asked for — a static site cannot implement any of that itself, so
   it has to live on the provider's side.
4. **Get the endpoint URL** the provider gives you (e.g.
   `https://formspree.io/f/xxxxxxxx`).
5. **Set `NEXT_PUBLIC_FORM_ENDPOINT`** to that URL wherever `npm run build` is
   actually run. Because this is a static export, this variable is read **at
   build time** and baked into the shipped JavaScript — setting it only in the
   Cloudflare dashboard does nothing, since Cloudflare isn't running the build
   here (see the comment in `.gitignore`: the committed `out/` folder is what
   gets deployed, not a fresh build).
6. **Rebuild and redeploy**:
   ```bash
   NEXT_PUBLIC_FORM_ENDPOINT="https://formspree.io/f/xxxxxxxx" npm run build
   ```
   then commit the regenerated `out/` folder and push, the same way every
   other change to this site ships.
7. **Send a real test inquiry** once deployed, and confirm it arrives at
   `hello@ethoralabs.co`, before telling anyone the form is live.

## If you'd rather have real server-side logic instead

A Formspree-style endpoint is the lowest-complexity option, but it means spam
filtering and rate limiting are whatever the provider offers, not custom logic
you control. The next step up is adding a Cloudflare Worker (`wrangler.jsonc`
would need a `main` entry) that validates the request, calls an email API
(e.g. Resend) with a secret stored via `wrangler secret put`, and applies your
own rate limiting (e.g. via Cloudflare KV). That's a real architecture change,
not a config tweak — worth doing only if the provider route turns out to be
insufficient.
