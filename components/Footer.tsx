import { Wordmark } from "./Icons";
import { site } from "@/lib/content";

const links = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Products", href: "/products" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/30 bg-navy-deep">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 font-serif text-lg italic text-muted-dark">{site.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="space-y-1">
              {links.map((l) => <li key={l.href}><a href={l.href} className="inline-flex min-h-11 items-center rounded text-[15px] text-ivory/90 hover:text-gold">{l.label}</a></li>)}
            </ul>
          </nav>
          <div className="space-y-3 text-[15px]">
            <p><span className="inline-flex min-h-11 items-center text-muted-dark" aria-disabled="true">Privacy Policy (coming soon)</span></p>
            <p className="text-ivory/90">{site.domain}</p>
          </div>
        </div>
        <p className="mt-10 border-t border-ivory/10 pt-6 text-sm text-muted-dark">&copy; {site.year} {site.legal}</p>
      </div>
    </footer>
  );
}
