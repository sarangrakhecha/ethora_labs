"use client";
import { useId, useRef, useState, type FormEvent } from "react";
import { Icon } from "./Icons";

// Recurr's own Formspree endpoint -- separate from the main site's contact form
// (NEXT_PUBLIC_FORM_ENDPOINT in components/ContactForm.tsx), and not secret: a
// Formspree form target is meant to be posted to directly from client-side code.
const ENDPOINT = "https://formspree.io/f/meaawnjq";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Same bot heuristic as ContactForm, shortened: a one-field form is quicker to fill
// honestly, so a shorter minimum still catches a near-instant bot submission.
const MIN_FILL_TIME_MS = 1200;

type Status = "closed" | "open" | "sending" | "sent" | "error";

/**
 * `variant` "button" is the solid CTA used on the navy Recurr page. "link" is a plain
 * underlined trigger for the light ("on-light") section of the products index, where a
 * solid button of the same color would be the odd one out next to a text link.
 */
export default function RecurrWaitlistForm({ accent, fallbackEmail, variant = "button" }: { accent: string; fallbackEmail: string; variant?: "button" | "link" }) {
  const [status, setStatus] = useState<Status>("closed");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef(Date.now());
  const submitting = useRef(false);
  const emailId = useId();
  const errorId = useId();

  const isLink = variant === "link";
  const error = !email.trim() ? "Please enter your email." : !emailRe.test(email.trim()) ? "Please enter a valid email address." : null;

  const open = () => {
    openedAt.current = Date.now();
    setStatus("open");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (error || submitting.current) return;

    if (honeypot || Date.now() - openedAt.current < MIN_FILL_TIME_MS) {
      setStatus("sent"); // looks like a bot -- pretend it worked, tell it nothing
      return;
    }

    submitting.current = true;
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), _subject: "Recurr waitlist signup" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  const solidBtnCls = "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[15px] font-medium text-ivory transition-colors hover:brightness-110 disabled:opacity-70";

  if (status === "sent") {
    return (
      <p aria-live="polite" className={`inline-flex min-h-11 items-center gap-2 text-[15px] font-medium ${isLink ? "text-ink" : "rounded-md border px-5 py-2.5 text-ivory"}`} style={isLink ? undefined : { borderColor: accent }}>
        <Icon name="check" className="h-4 w-4 shrink-0" style={{ color: accent }} /> You&rsquo;re on the list — we&rsquo;ll be in touch.
      </p>
    );
  }

  if (status === "closed") {
    return isLink ? (
      <button type="button" onClick={open} className="text-[15px] font-medium underline underline-offset-4 hover:text-ink" style={{ color: accent }}>
        Join the waitlist
      </button>
    ) : (
      <button type="button" onClick={open} className={solidBtnCls} style={{ background: accent }}>
        Join the Waitlist <Icon name="arrow" />
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-wrap items-start gap-2">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
      </div>
      <div>
        <label htmlFor={emailId} className="sr-only">Email address</label>
        <input
          id={emailId} type="email" required autoFocus placeholder="you@company.com" value={email}
          onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched(true)}
          aria-invalid={touched && !!error} aria-describedby={touched && error ? errorId : undefined}
          className={`min-h-11 w-56 rounded-md border px-3.5 text-[15px] ${isLink ? "border-ink/15 bg-white text-ink placeholder:text-muted-light focus:border-ink/40" : "border-ivory/25 bg-navy text-ivory placeholder:text-muted-dark focus:border-ivory/50"}`}
        />
      </div>
      <button type="submit" disabled={status === "sending"} className={`shrink-0 ${solidBtnCls}`} style={{ background: accent }}>
        {status === "sending" ? "Joining…" : <>Join <Icon name="arrow" /></>}
      </button>
      <div aria-live="polite" className={`basis-full text-sm ${isLink ? "text-[#c23b3b]" : "text-[#e08787]"}`}>
        {touched && error && <p id={errorId}>{error}</p>}
        {status === "error" && (
          <p>
            Something went wrong. Please try again, or email&nbsp;
            <a href={`mailto:${fallbackEmail}`} className="underline underline-offset-4">{fallbackEmail}</a> directly.
          </p>
        )}
      </div>
    </form>
  );
}
