"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon, Wordmark } from "./Icons";
import { ButtonLink } from "./Button";
import { capabilities, nav } from "@/lib/content";

export default function Header() {
  const [open, setOpen] = useState(false); // mobile menu
  const [capOpen, setCapOpen] = useState(false); // desktop dropdown
  const capRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setCapOpen(false); setOpen(false); } };
    const onClick = (e: MouseEvent) => { if (capRef.current && !capRef.current.contains(e.target as Node)) setCapOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("click", onClick); };
  }, []);

  const close = () => { setOpen(false); setCapOpen(false); };
  const linkCls = "inline-flex min-h-11 items-center rounded px-2 text-[15px] text-ivory/90 transition-colors hover:text-gold";

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled || open ? "border-ivory/10 bg-navy-deep/95 backdrop-blur" : "border-transparent bg-navy"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-gold focus:px-3 focus:py-2 focus:text-navy-deep">Skip to content</a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Ethora Labs, home" className="rounded"><Wordmark /></Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-3 lg:flex">
          <div ref={capRef} className="relative">
            <button type="button" aria-expanded={capOpen} aria-controls="cap-menu" onClick={() => setCapOpen((v) => !v)} className={`${linkCls} gap-1.5`}>
              Capabilities <Icon name="chevron" className={`transition-transform ${capOpen ? "rotate-180" : ""}`} />
            </button>
            {capOpen && (
              <ul id="cap-menu" className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-ivory/15 bg-navy-deep p-2 shadow-xl">
                {capabilities.map((c) => (
                  <li key={c.id}>
                    <Link href={`/capabilities/${c.slug}`} onClick={close} className="block rounded px-3 py-2.5 text-[15px] text-ivory/90 hover:bg-ivory/10 hover:text-gold">{c.title}</Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-ivory/10 pt-1">
                  <Link href="/capabilities" onClick={close} className="block rounded px-3 py-2.5 text-[15px] font-medium text-gold hover:bg-ivory/10">All capabilities</Link>
                </li>
              </ul>
            )}
          </div>
          {nav.map((n) => <Link key={n.href} href={n.href} className={linkCls}>{n.label}</Link>)}
          <ButtonLink href="/#contact" size="sm" className="ml-2">Start a Conversation</ButtonLink>
        </nav>

        {/* Mobile toggle */}
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded text-ivory lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-ivory/10 bg-navy-deep px-4 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col">
            <li className="px-2 pb-1 pt-2 text-xs uppercase tracking-wider text-muted-dark">Capabilities</li>
            {capabilities.map((c) => (
              <li key={c.id}><Link href={`/capabilities/${c.slug}`} onClick={close} className="flex min-h-12 items-center rounded px-2 text-[16px] text-ivory hover:text-gold">{c.title}</Link></li>
            ))}
            <li><Link href="/capabilities" onClick={close} className="flex min-h-12 items-center rounded px-2 text-[16px] font-medium text-gold">All capabilities</Link></li>
            <li className="my-2 h-px bg-ivory/10" aria-hidden="true" />
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} onClick={close} className="flex min-h-12 items-center rounded px-2 text-[16px] text-ivory hover:text-gold">{n.label}</Link></li>
            ))}
          </ul>
          <ButtonLink href="/#contact" onClick={close} className="mt-4 w-full">Start a Conversation</ButtonLink>
        </nav>
      )}
    </header>
  );
}
