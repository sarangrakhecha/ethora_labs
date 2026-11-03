"use client";
import { useEffect, useState, type FormEvent } from "react";
import Reveal from "./Reveal";

type Values = { name: string; email: string; company: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!emailRe.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!v.message.trim()) e.message = "Please tell us a little about your project.";
  return e;
}

/**
 * Submission goes to a Formspree endpoint supplied at build time.
 *
 * TO TURN THE FORM ON: set NEXT_PUBLIC_FORM_ENDPOINT in the Cloudflare project's
 * environment variables to your Formspree URL (https://formspree.io/f/xxxxxxxx) and
 * redeploy. Until that variable exists the submit button stays disabled and the form
 * never claims a message was sent.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
const SUBMIT_ENABLED = ENDPOINT.length > 0;

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [values, setValues] = useState<Values>({ name: "", email: "", company: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [challenge, setChallenge] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  // The problem-first section dispatches this when someone picks a challenge, so the
  // form opens already knowing what they came to talk about.
  useEffect(() => {
    const onChallenge = (e: Event) => {
      const d = (e as CustomEvent<{ label: string; seed: string }>).detail;
      if (!d) return;
      setChallenge(d.label);
      setValues((v) => (v.message.trim() ? v : { ...v, message: d.seed }));
    };
    window.addEventListener("ethora:challenge", onChallenge);
    return () => window.removeEventListener("ethora:challenge", onChallenge);
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
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          message: values.message.trim(),
          challenge: challenge ?? "",
          _subject: `Ethora Labs enquiry from ${values.name.trim()}`,
        }),
      });
      // Success is only ever claimed on a confirmed 2xx.
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues({ name: "", email: "", company: "", message: "" });
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const field = "mt-2 w-full rounded-md border bg-navy px-4 py-3 text-[16px] text-ivory placeholder:text-slate focus:border-gold";
  const border = (k: keyof Values) => (show(k) ? "border-[#e0a0a0]" : "border-ivory/25");
  const Err = ({ id, k }: { id: string; k: keyof Values }) => show(k) ? <p id={id} className="mt-1.5 text-sm text-[#f0b4b4]">{errors[k]}</p> : null;

  return (
    <section id="contact" className="bg-navy-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl">Let&rsquo;s start a conversation.</h2>
          <span className="gold-rule mt-5" />
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-dark">
            Have a product idea, an engineering challenge, or a quality goal in mind? We&rsquo;d love to hear about it.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div aria-live="polite" className="mb-5 empty:mb-0">
            {challenge && (
              <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm">
                <span className="text-muted-dark">Your challenge:</span>
                <span className="font-medium text-ivory">{challenge}</span>
              </p>
            )}
          </div>
          <form noValidate onSubmit={onSubmit} aria-describedby="form-note" className="space-y-5">
            {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
            </div>

            <div>
              <label htmlFor="c-name" className="text-[15px] font-medium">Name <span className="text-gold">*</span></label>
              <input id="c-name" name="name" autoComplete="name" required aria-invalid={!!show("name")} aria-describedby="e-name" value={values.name} onChange={set("name")} onBlur={blur("name")} className={`${field} ${border("name")}`} />
              <Err id="e-name" k="name" />
            </div>
            <div>
              <label htmlFor="c-email" className="text-[15px] font-medium">Email <span className="text-gold">*</span></label>
              <input id="c-email" name="email" type="email" autoComplete="email" required aria-invalid={!!show("email")} aria-describedby="e-email" value={values.email} onChange={set("email")} onBlur={blur("email")} className={`${field} ${border("email")}`} />
              <Err id="e-email" k="email" />
            </div>
            <div>
              <label htmlFor="c-company" className="text-[15px] font-medium">Company <span className="text-muted-dark">(optional)</span></label>
              <input id="c-company" name="company" autoComplete="organization" value={values.company} onChange={set("company")} className={`${field} border-ivory/25`} />
            </div>
            <div>
              <label htmlFor="c-message" className="text-[15px] font-medium">Project description <span className="text-gold">*</span></label>
              <textarea id="c-message" name="message" rows={5} required aria-invalid={!!show("message")} aria-describedby="e-message" value={values.message} onChange={set("message")} onBlur={blur("message")} className={`${field} ${border("message")}`} />
              <Err id="e-message" k="message" />
            </div>

            <div>
              <button
                type="submit"
                disabled={!SUBMIT_ENABLED || status === "sending"}
                className={`inline-flex min-h-11 w-full items-center justify-center rounded-md px-6 py-2.5 text-[15px] font-medium transition-colors sm:w-auto ${
                  SUBMIT_ENABLED
                    ? "bg-gold text-navy-deep hover:bg-[#d4b98f] disabled:opacity-70"
                    : "cursor-not-allowed border border-ivory/25 bg-ivory/10 text-muted-dark"
                }`}
              >
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
                  Our contact form isn&rsquo;t connected yet, so messages can&rsquo;t be sent from this page. Please check back soon.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
