"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon, Wordmark } from "./Icons";
import { ButtonLink } from "./Button";
import { services } from "@/lib/services";
import { products } from "@/lib/products";
import { nav } from "@/lib/content";

// Only the two real Ethora products. TerminalQuest is open-source, not part of the
// Products division, and is intentionally not linked from here.
const productLinks = products.map((p) => ({ slug: p.slug, name: p.name, tagline: p.tagline }));

export default function Header() {
  const [open, setOpen] = useState(false);       // mobile menu
  const [servicesOpen, setServicesOpen] = useState(false);  // desktop Services dropdown
  const [prodOpen, setProdOpen] = useState(false); // desktop Products dropdown
  const [servicesExpanded, setServicesExpanded] = useState(false);   // mobile Services accordion
  const [prodExpanded, setProdExpanded] = useState(false); // mobile Products accordion
  const servicesRef = useRef<HTMLDivElement>(null);
  const prodRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setServicesOpen(false); setProdOpen(false); setOpen(false); } };
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
      if (prodRef.current && !prodRef.current.contains(e.target as Node)) setProdOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("click", onClick); };
  }, []);

  // Close everything on navigation.
  useEffect(() => { setOpen(false); setServicesOpen(false); setProdOpen(false); }, [pathname]);

  const close = () => { setOpen(false); setServicesOpen(false); setProdOpen(false); };
  const onServices = pathname?.startsWith("/services") ?? false;
  const onProducts = pathname?.startsWith("/products") ?? false;
  const isCurrent = (href: string) => href.startsWith("/#") ? false : pathname === href || pathname === `${href}/`;

  const linkCls = (active: boolean) =>
    `inline-flex min-h-11 items-center rounded px-2 text-[15px] transition-colors ${active ? "text-gold" : "text-ivory/90 hover:text-gold"}`;

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled || open ? "border-ivory/10 bg-navy-deep/95 backdrop-blur" : "border-transparent bg-navy"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-gold focus:px-3 focus:py-2 focus:text-navy-deep">Skip to content</a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Ethora Labs, home"
          className="rounded"
          // Already on the home page: Next does not re-navigate, so scroll up explicitly.
          onClick={() => { if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <Wordmark />
        </Link>

        {/* Desktop */}
        <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
          <Link href="/about" aria-current={isCurrent("/about") ? "page" : undefined} className={linkCls(isCurrent("/about"))}>About</Link>

          <div ref={servicesRef} className="relative">
            <button type="button" aria-expanded={servicesOpen} aria-controls="services-menu" aria-haspopup="true"
              onClick={() => { setServicesOpen((v) => !v); setProdOpen(false); }} className={`${linkCls(onServices)} gap-1.5`}>
              Services <Icon name="chevron" className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <ul id="services-menu" className="absolute left-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-ivory/15 bg-navy-deep p-1.5 shadow-xl">
                {services.map((s) => {
                  const current = isCurrent(`/services/${s.slug}`);
                  return (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} onClick={close} aria-current={current ? "page" : undefined}
                        className="group flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-ivory/[0.06] focus-visible:bg-ivory/[0.06]">
                        <span className="min-w-0 flex-1">
                          <span className={`block text-[14.5px] font-medium ${current ? "text-gold" : "text-ivory"}`}>{s.nav.label}</span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-muted-dark">{s.nav.description}</span>
                        </span>
                        <Icon name="arrow" className="h-3.5 w-3.5 shrink-0 text-gold opacity-0 transition-all -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div ref={prodRef} className="relative">
            <button type="button" aria-expanded={prodOpen} aria-controls="prod-menu" aria-haspopup="true"
              onClick={() => { setProdOpen((v) => !v); setServicesOpen(false); }} className={`${linkCls(onProducts)} gap-1.5`}>
              Products <Icon name="chevron" className={`transition-transform ${prodOpen ? "rotate-180" : ""}`} />
            </button>
            {prodOpen && (
              <ul id="prod-menu" className="absolute left-0 top-full mt-2 w-[20rem] rounded-lg border border-ivory/15 bg-navy-deep p-2 shadow-xl">
                {productLinks.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`} onClick={close} aria-current={isCurrent(`/products/${p.slug}`) ? "page" : undefined}
                      className="block rounded px-3 py-2 hover:bg-ivory/10">
                      <span className="block text-[15px] font-medium text-ivory">{p.name}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-muted-dark">{p.tagline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link href="/technologies" aria-current={isCurrent("/technologies") ? "page" : undefined} className={linkCls(isCurrent("/technologies"))}>Technologies</Link>

          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isCurrent(n.href) ? "page" : undefined} className={linkCls(isCurrent(n.href))}>{n.label}</Link>
          ))}
          <ButtonLink href="/contact" size="sm" className="ml-2">Let&rsquo;s Talk</ButtonLink>
        </nav>

        <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded text-ivory lg:hidden"
          aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}>
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {/* Mobile: expandable, tap-driven, no hover-only behaviour */}
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ivory/10 bg-navy-deep px-4 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col">
            <li>
              <Link href="/about" onClick={close} aria-current={isCurrent("/about") ? "page" : undefined}
                className={`flex min-h-12 items-center rounded px-2 text-[16px] ${isCurrent("/about") ? "text-gold" : "text-ivory"}`}>About</Link>
            </li>

            <li>
              <button type="button" aria-expanded={servicesExpanded} aria-controls="m-services"
                onClick={() => setServicesExpanded((v) => !v)}
                className={`flex min-h-12 w-full items-center justify-between rounded px-2 text-[16px] ${onServices ? "text-gold" : "text-ivory"}`}>
                Services <Icon name="chevron" className={`transition-transform ${servicesExpanded ? "rotate-180" : ""}`} />
              </button>
              <ul id="m-services" hidden={!servicesExpanded} className="border-l border-ivory/15 pl-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} onClick={close} aria-current={isCurrent(`/services/${s.slug}`) ? "page" : undefined}
                      className={`block rounded px-2 py-3 ${isCurrent(`/services/${s.slug}`) ? "text-gold" : "text-ivory"}`}>
                      <span className="block text-[16px]">{s.nav.label}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-muted-dark">{s.nav.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <button type="button" aria-expanded={prodExpanded} aria-controls="m-prod"
                onClick={() => setProdExpanded((v) => !v)}
                className={`flex min-h-12 w-full items-center justify-between rounded px-2 text-[16px] ${onProducts ? "text-gold" : "text-ivory"}`}>
                Products <Icon name="chevron" className={`transition-transform ${prodExpanded ? "rotate-180" : ""}`} />
              </button>
              <ul id="m-prod" hidden={!prodExpanded} className="border-l border-ivory/15 pl-3">
                {productLinks.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`} onClick={close} aria-current={isCurrent(`/products/${p.slug}`) ? "page" : undefined}
                      className={`block rounded px-2 py-3 ${isCurrent(`/products/${p.slug}`) ? "text-gold" : "text-ivory"}`}>
                      <span className="block text-[16px]">{p.name}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-muted-dark">{p.tagline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link href="/technologies" onClick={close} aria-current={isCurrent("/technologies") ? "page" : undefined}
                className={`flex min-h-12 items-center rounded px-2 text-[16px] ${isCurrent("/technologies") ? "text-gold" : "text-ivory"}`}>Technologies</Link>
            </li>

            <li className="my-2 h-px bg-ivory/10" aria-hidden="true" />
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={close} aria-current={isCurrent(n.href) ? "page" : undefined}
                  className={`flex min-h-12 items-center rounded px-2 text-[16px] ${isCurrent(n.href) ? "text-gold" : "text-ivory"}`}>{n.label}</Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/contact" onClick={close} className="mt-4 w-full">Let&rsquo;s Talk</ButtonLink>
        </nav>
      )}
    </header>
  );
}
