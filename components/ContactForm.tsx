"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { services } from "@/lib/services";
import { problems, site } from "@/lib/content";
import { Icon } from "./Icons";

type Values = { name: string; email: string; company: string; service: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 160, company: 120, message: 4000 };

export function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  else if (v.name.length > LIMITS.name) e.name = `Please keep your name under ${LIMITS.name} characters.`;
  if (!v.email.trim()) e.email = "Please enter your work email address.";
  else if (!emailRe.test(v.email.trim())) e.email = "Please enter a valid email address.";
  else if (v.email.length > LIMITS.email) e.email = `Please keep your email under ${LIMITS.email} characters.`;
  if (!v.message.trim()) e.message = "Please tell us a little about your project.";
  else if (v.message.length > LIMITS.message) e.message = `Please keep your description under ${LIMITS.message} characters.`;
  return e;
}

/**
 * TO TURN SUBMISSION ON: set NEXT_PUBLIC_FORM_ENDPOINT in the build environment to a
 * Formspree-style endpoint (a POST target built for exposure from client-side code --
 * nothing secret about the URL itself) and rebuild. This is a static export with no
 * server of its own, so a provider that accepts a direct client POST is the lowest-
 * complexity architecture that still keeps real secrets (an API key) off the client:
 * there are none here, because there is nothing to leak. Server-side validation, spam
 * filtering and rate limiting happen on the provider's side, not ours -- a static site
 * cannot enforce any of those itself. Until the endpoint is set, the button stays
 * disabled and the form never claims a message was sent. See README-CONTACT-SETUP.md
 * for the exact remaining steps.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
const SUBMIT_ENABLED = ENDPOINT.length > 0;
const FALLBACK_NOTE = "Our contact form isn't connected yet, so messages can't be sent from this page.";
// Real visitors take more than a couple of seconds to fill in a form; a submission
// faster than this almost always means a bot. We drop it silently rather than telling
// the bot its submission failed, which would only teach it to try again differently.
const MIN_FILL_TIME_MS = 2500;

const empty: Values = { name: "", email: "", company: "", service: services[0]?.slug ?? "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [context, setContext] = useState<string | null>(null);
  const mountedAt = useRef(Date.now());
  const submitting = useRef(false); // synchronous lock: React state updates are not, a fast double-click can race them

  // Carry the service or problem the visitor arrived from. Read from the URL rather than
  // component state so it survives a full page load from any service page.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const service = q.get("service");
    const problem = q.get("problem");
    const match = services.find((s) => s.slug === service);
    const prob = problems.find((p) => p.id === problem);

    if (match) {
      setValues((v) => ({ ...v, service: match.slug }));
      setContext(match.nav.label);
    } else if (prob) {
      setContext(prob.label);
      setValues((v) => (v.message.trim() ? v : { ...v, message: prob.seed }));
    }
  }, []);

  const errors = validate(values);
  const show = (k: keyof Values) => (touched[k] ? errors[k] : undefined);
  const set = (k: keyof Values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k: keyof Values) => () => setTouched((t) => ({ ...t, [k]: true }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!SUBMIT_ENABLED || Object.keys(errors).length > 0 || submitting.current) return;

    if (honeypot || Date.now() - mountedAt.current < MIN_FILL_TIME_MS) {
      // Looks like a bot: pretend it worked so nothing it can observe tells it otherwise.
      setStatus("sent");
      return;
    }

    submitting.current = true;
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(), email: values.email.trim(), company: values.company.trim(),
          service: values.service || "Not specified", message: values.message.trim(),
          _subject: `Ethora Labs enquiry from ${values.name.trim()}`,
        }),
      });
      if (!res.ok) throw new Error(String(res.status)); // success only on a confirmed 2xx
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  const startOver = () => {
    setValues(empty);
    setTouched({});
    setStatus("idle");
    mountedAt.current = Date.now();
  };

  const field = "mt-1.5 w-full rounded-md border bg-white px-4 py-2.5 text-[15px] text-ink placeholder:text-muted-light focus:border-gold-deep";
  const border = (k: keyof Values) => (show(k) ? "border-[#c23b3b]" : "border-ink/15");
  const Err = ({ id, k }: { id: string; k: keyof Values }) => show(k) ? <p id={id} className="mt-1 text-sm text-[#c23b3b]">{errors[k]}</p> : null;

  if (status === "sent") {
    return (
      <div aria-live="polite" className="rounded-lg border border-gold-deep/30 bg-gold-deep/10 px-5 py-6 text-center">
        <Icon name="check" className="mx-auto h-8 w-8 text-gold-deep" />
        <p className="mt-3 font-serif text-xl text-ink">Thanks — your message is on its way.</p>
        <p className="mt-1.5 text-[15px] text-muted-light">We&rsquo;ll get back to you shortly.</p>
        <button type="button" onClick={startOver} className="mt-5 text-sm font-medium text-gold-deep underline underline-offset-4 hover:text-ink">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div>
      <div aria-live="polite" className="mb-4 empty:mb-0">
        {context && (
          <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-gold-deep/40 bg-gold-deep/10 px-4 py-1.5 text-sm">
            <span className="text-muted-light">You came from:</span>
            <span className="font-medium text-ink">{context}</span>
          </p>
        )}
      </div>

      <form noValidate onSubmit={onSubmit} aria-describedby={SUBMIT_ENABLED ? undefined : "form-note"} className="space-y-4">
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <label htmlFor="c-name" className="text-[15px] font-medium text-ink">Name <span className="text-gold-deep">*</span></label>
            <input id="c-name" name="name" autoComplete="name" required maxLength={LIMITS.name}
              aria-invalid={!!show("name")} aria-describedby="e-name" value={values.name} onChange={set("name")} onBlur={blur("name")} className={`${field} ${border("name")}`} />
            <Err id="e-name" k="name" />
          </div>
          <div>
            <label htmlFor="c-email" className="text-[15px] font-medium text-ink">Work email <span className="text-gold-deep">*</span></label>
            <input id="c-email" name="email" type="email" autoComplete="email" required maxLength={LIMITS.email}
              aria-invalid={!!show("email")} aria-describedby="e-email" value={values.email} onChange={set("email")} onBlur={blur("email")} className={`${field} ${border("email")}`} />
            <Err id="e-email" k="email" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <label htmlFor="c-company" className="text-[15px] font-medium text-ink">Company <span className="text-muted-light">(optional)</span></label>
            <input id="c-company" name="company" autoComplete="organization" maxLength={LIMITS.company}
              value={values.company} onChange={set("company")} className={`${field} border-ink/15`} />
          </div>
          <div>
            <label htmlFor="c-service" className="text-[15px] font-medium text-ink">Service of interest</label>
            <div className="relative">
              <select id="c-service" name="service" value={values.service} onChange={set("service")}
                className={`${field} appearance-none border-ink/15 pr-10`}>
                {services.map((s) => <option key={s.slug} value={s.slug}>{s.nav.label}</option>)}
                <option value="products">A product (Culprit or RenewGuard)</option>
                <option value="other">Something else</option>
                <option value="">Not sure yet</option>
              </select>
              <Icon name="chevron" className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-light" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="c-message" className="text-[15px] font-medium text-ink">Project description <span className="text-gold-deep">*</span></label>
          <textarea id="c-message" name="message" rows={4} required maxLength={LIMITS.message} placeholder="Tell us about your project, goal or challenge. A few sentences are enough."
            aria-invalid={!!show("message")} aria-describedby="e-message" value={values.message} onChange={set("message")} onBlur={blur("message")} className={`${field} ${border("message")} resize-y`} />
          <Err id="e-message" k="message" />
        </div>

        <div>
          <button type="submit" disabled={!SUBMIT_ENABLED || status === "sending"}
            className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md px-6 py-2.5 text-[15px] font-medium transition-colors ${SUBMIT_ENABLED ? "bg-gold text-navy-deep hover:bg-[#d4b98f] disabled:opacity-70" : "cursor-not-allowed border border-ink/15 bg-ink/5 text-muted-light"}`}>
            {!SUBMIT_ENABLED ? "Send inquiry (not available yet)" : status === "sending" ? "Sending…" : <>Send inquiry <Icon name="arrow" /></>}
          </button>

          <div aria-live="polite">
            {status === "error" && (
              <p className="mt-4 rounded-md border border-[#c23b3b]/40 bg-[#c23b3b]/10 px-4 py-3 text-[15px] text-ink">
                Something went wrong sending your message. Please try again, or email us directly at&nbsp;
                <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-4">{site.email}</a>.
              </p>
            )}
          </div>

          {SUBMIT_ENABLED ? (
            <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-light">
              <Icon name="shield" className="h-4 w-4 shrink-0" /> We&rsquo;ll keep your information private and use it only to respond to your inquiry.
            </p>
          ) : (
            <p id="form-note" className="mt-3 max-w-md text-sm leading-relaxed text-muted-light">
              {FALLBACK_NOTE} In the meantime, email us directly at&nbsp;
              <a href={`mailto:${site.email}`} className="font-medium text-gold-deep underline underline-offset-4 hover:text-ink">{site.email}</a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
