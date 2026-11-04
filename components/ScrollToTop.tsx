"use client";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Forces every route change to land exactly at the top of the new page.
 *
 * `html { scroll-behavior: smooth }` (globals.css) applies to every script-driven
 * scroll, including the browser's own scroll restoration and any scrollIntoView
 * a route change triggers (e.g. focus moving to the new page). With that in play,
 * the landing position can settle a little below true 0 instead of snapping there,
 * which read as "it scrolls down a bit" rather than starting at the top.
 *
 * The plain two-argument `scrollTo(x, y)` form is always instant per spec — CSS
 * scroll-behavior only governs the options-object form — so this guarantees an
 * exact, immediate jump regardless of what else is happening on navigation.
 *
 * Guarded to pathname changes only (not every render) and skipped when the new
 * URL carries a hash, so a real link to a page section (e.g. a future `/foo#bar`)
 * still scrolls to that section instead of being forced back to the top.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
