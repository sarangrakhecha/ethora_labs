import Link from "next/link";
import type { ReactNode } from "react";

const BASE = "https://ethoralabs.co";

/** Shared opener for inner pages: breadcrumb, title, standfirst. */
export default function PageHero({ eyebrow, title, intro, breadcrumb }: {
  eyebrow?: string; title: string; intro: string;
  breadcrumb?: { label: string; href: string }[];
}) {
  // BreadcrumbList structured data, generated once here rather than per page.
  const jsonLd = breadcrumb && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ...breadcrumb.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.label, item: `${BASE}${b.href}` })),
      { "@type": "ListItem", position: breadcrumb.length + 1, name: title },
    ],
  };

  return (
    <section className="border-b border-ivory/10 bg-navy">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-dark">
              {breadcrumb.map((b) => (
                <li key={b.href} className="flex items-center gap-2">
                  <Link href={b.href} className="rounded hover:text-gold">{b.label}</Link>
                  <span aria-hidden="true" className="text-slate">/</span>
                </li>
              ))}
              <li aria-current="page" className="text-ivory">{title}</li>
            </ol>
          </nav>
        )}
        {eyebrow && <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">{eyebrow}</p>}
        <h1 className="max-w-4xl font-serif text-[2.4rem] leading-[1.1] sm:text-5xl lg:text-[3.2rem]">{title}</h1>
        <span className="gold-rule mt-6" />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/90">{intro}</p>
      </div>
    </section>
  );
}

export function CtaBand({ children }: { children?: ReactNode }) {
  return (
    <section className="border-t border-gold/30 bg-navy-deep">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl">Let&rsquo;s start a conversation.</h2>
          <p className="mt-3 max-w-xl text-muted-dark">{children ?? "Have a product idea, an engineering challenge, or a quality goal in mind? We'd love to hear about it."}</p>
        </div>
        <Link href="/contact" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-5 py-2.5 text-[15px] font-medium text-navy-deep transition-colors hover:bg-[#d4b98f]">
          Get in touch
        </Link>
      </div>
    </section>
  );
}
