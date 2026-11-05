"use client";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

function scrollToHashTarget(hash: string) {
  const el = document.getElementById(hash.slice(1));
  if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
}

/**
 * Forces every route change to land exactly at the top of the new page, or at the
 * right section when the new URL carries a hash (e.g. the "All capabilities" nav
 * link, which points at "/#capabilities" on the homepage).
 *
 * `html { scroll-behavior: smooth }` (globals.css) applies to every script-driven
 * scroll, including a plain `window.scrollTo(0, 0)` -- left to animate, that smooth
 * scroll can settle a little below true 0 instead of snapping there, which is why
 * every scroll below passes `behavior: "instant"` explicitly rather than relying on
 * the browser/router's own scroll restoration.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  // Route change: land at the top, or at the hash target if the new URL has one.
  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash) { scrollToHashTarget(hash); return; }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  // A same-page hash link (e.g. "/#capabilities" clicked while already on "/") never
  // changes the pathname, so the effect above never re-runs for it. Handle that click
  // directly instead of relying on the browser's native hash-scroll behaviour.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest?.("a");
      if (!a) return;
      const url = new URL(a.getAttribute("href") ?? "", window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToHashTarget(url.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
