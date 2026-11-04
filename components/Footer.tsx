import Link from "next/link";
import { Wordmark } from "./Icons";
import { site } from "@/lib/content";

// Short, already-established positioning (trimmed from the sitewide meta description in
// app/layout.tsx) rather than new marketing copy invented for the footer.
const DESCRIPTION = "Engineering-led software development, quality engineering and test automation.";

const explore = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Products", href: "/products" },
  { label: "Our Approach", href: "/approach" },
];
const company = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Same small-caps "eyebrow" token used for section labels elsewhere on the site.
const heading = "text-xs font-medium uppercase tracking-[0.3em] text-gold";
const link = "inline-flex items-center rounded py-1 text-[15px] text-ivory/90 transition-colors hover:text-gold";

export default function Footer() {
  return (
    <footer className="border-t border-gold/30 bg-navy-deep">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <Wordmark />
            <p className="mt-4 text-[15px] font-medium text-ivory/90">{site.tagline}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-dark">{DESCRIPTION}</p>
          </div>

          <nav aria-label="Explore">
            <h2 className={heading}>Explore</h2>
            <ul className="mt-4 space-y-1.5">
              {explore.map((l) => (
                <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className={heading}>Company</h2>
            <ul className="mt-4 space-y-1.5">
              {company.map((l) => (
                <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Get in Touch</h2>
            <p className="mt-4">
              <a href={`mailto:${site.email}`} className={link}>{site.email}</a>
            </p>
          </div>
        </div>

        <p className="mt-8 border-t border-ivory/10 pt-5 text-sm text-muted-dark">
          &copy; {new Date().getFullYear()} {site.legal}
        </p>
      </div>
    </footer>
  );
}
