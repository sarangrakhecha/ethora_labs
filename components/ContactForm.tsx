"use client";
import { useEffect, useState, type FormEvent } from "react";
import { services } from "@/lib/services";
import { problems, site } from "@/lib/content";

type Values = { name: string; email: string; company: string; service: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your work email address.";
  else if (!emailRe.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!v.message.trim()) e.message = "Please tell us a little about your project.";
  return e;
}

/**
 * TO TURN SUBMISSION ON: set NEXT_PUBLIC_FORM_ENDPOINT in the Cloudflare project's
 * environment variables to a Formspree URL and redeploy. Until then the button is
 * disabled and the form never claims a message was sent.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
const SUBMIT_ENABLED = ENDPOINT.length > 0;
const FALLBACK_NOTE = "Our contact form isn't connected yet, so messages can't be sent from this page.";

export default function ContactForm() {
  const [values, setValues] = useState<Values>({ name: "", email: "", company: "", service: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [context, setContext] = useState<string | null>(null);

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
    if (honeypot) return; // bots fill the hidden field
    if (!SUBMIT_ENABLED || Object.keys(errors).length > 0 || status === "sending") return;

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
      setValues({ name: "", email: "", company: "", service: "", message: "" });
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const field = "mt-2 w-full rounded-md border bg-navy px-4 py-3 text-[16px] text-ivory placeholder:text-slate focus:border-gold";
  const border = (k: keyof Values) => (show(k) ? "border-[#e0a0a0]" : "border-ivory/25");
  const Err = ({ id, k }: { id: string; k: keyof Values }) => show(k) ? <p id={id} className="mt-1.5 text-sm text-[#f0b4b4]">{errors[k]}</p> : null;

  return (
    <div>
      <div aria-live="polite" className="mb-5 empty:mb-0">
        {context && (
          <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm">
            <span className="text-muted-dark">You came from:</span>
            <span className="font-medium text-ivory">{context}</span>
          </p>
        )}
      </div>

      <form noValidate onSubmit={onSubmit} aria-describedby={SUBMIT_ENABLED ? undefined : "form-note"} className="space-y-5">
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="c-name" className="text-[15px] font-medium">Name <span className="text-gold">*</span></label>
            <input id="c-name" name="name" autoComplete="name" required aria-invalid={!!show("name")} aria-describedby="e-name" value={values.name} onChange={set("name")} onBlur={blur("name")} className={`${field} ${border("name")}`} />
            <Err id="e-name" k="name" />
          </div>
          <div>
            <label htmlFor="c-email" className="text-[15px] font-medium">Work email <span className="text-gold">*</span></label>
            <input id="c-email" name="email" type="email" autoComplete="email" required aria-invalid={!!show("email")} aria-describedby="e-email" value={values.email} onChange={set("email")} onBlur={blur("email")} className={`${field} ${border("email")}`} />
            <Err id="e-email" k="email" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="c-company" className="text-[15px] font-medium">Company <span className="text-muted-dark">(optional)</span></label>
            <input id="c-company" name="company" autoComplete="organization" value={values.company} onChange={set("company")} className={`${field} border-ivory/25`} />
          </div>
          <div>
            <label htmlFor="c-service" className="text-[15px] font-medium">Service of interest</label>
            <select id="c-service" name="service" value={values.service} onChange={set("service")} className={`${field} border-ivory/25`}>
              <option value="">Not sure yet</option>
              {services.map((s) => <option key={s.slug} value={s.slug}>{s.nav.label}</option>)}
              <option value="products">A product (Culprit or RenewGuard)</option>
              <option value="other">Something else</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="c-message" className="text-[15px] font-medium">Project description <span className="text-gold">*</span></label>
          <textarea id="c-message" name="message" rows={6} required aria-invalid={!!show("message")} aria-describedby="e-message" value={values.message} onChange={set("message")} onBlur={blur("message")} className={`${field} ${border("message")}`} />
          <Err id="e-message" k="message" />
        </div>

        <div>
          <button type="submit" disabled={!SUBMIT_ENABLED || status === "sending"}
            className={`inline-flex min-h-11 w-full items-center justify-center rounded-md px-6 py-2.5 text-[15px] font-medium transition-colors sm:w-auto ${SUBMIT_ENABLED ? "bg-gold text-navy-deep hover:bg-[#d4b98f] disabled:opacity-70" : "cursor-not-allowed border border-ivory/25 bg-ivory/10 text-muted-dark"}`}>
            {!SUBMIT_ENABLED ? "Send message (not available yet)" : status === "sending" ? "Sending…" : "Send message"}
          </button>

          <div aria-live="polite">
            {status === "sent" && (
              <p className="mt-4 rounded-md border border-gold/40 bg-gold/10 px-4 py-3 text-[15px] text-ivory">
                Thanks — your message is on its way. We&rsquo;ll get back to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 rounded-md border border-[#e0a0a0] bg-[#e0a0a0]/10 px-4 py-3 text-[15px] text-ivory">
                Something went wrong sending your message. Please try again in a moment.
              </p>
            )}
          </div>

          {!SUBMIT_ENABLED && (
            <p id="form-note" className="mt-3 max-w-md text-sm leading-relaxed text-muted-dark">
              {FALLBACK_NOTE} In the meantime, email us directly at{" "}
              <a href={`mailto:${site.email}`} className="text-gold underline underline-offset-4 hover:text-ivory">{site.email}</a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
