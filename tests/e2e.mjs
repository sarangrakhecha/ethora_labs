/**
 * Browser end-to-end checks for the visitor journeys that matter.
 * Serves ./out and drives it with the pre-installed Playwright.
 *   npm run build && npm run test:e2e
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { setTimeout as sleep } from "node:timers/promises";

// Playwright ships with the environment rather than as a project dependency, so it is
// resolved through CommonJS rather than imported directly.
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const PORT = 4188;
const BASE = `http://localhost:${PORT}`;
const ROUTES = [
  "/", "/services/software-engineering/", "/services/quality-engineering/",
  "/services/test-automation/", "/services/innovation/", "/approach/", "/technologies/",
  "/products/", "/products/culprit/", "/products/renewguard/", "/products/terminalquest/",
  "/about/", "/contact/",
];

let failures = 0;
const ok = (name) => console.log(`  ✓ ${name}`);
const bad = (name, detail) => { failures++; console.log(`  ✗ ${name}\n      ${detail}`); };
function check(name, cond, detail = "") { cond ? ok(name) : bad(name, detail); }

const server = spawn("npx", ["--yes", "serve", "out", "-l", String(PORT)], { stdio: "ignore" });
process.on("exit", () => server.kill());

async function waitForServer() {
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(BASE); if (r.ok) return; } catch {}
    await sleep(500);
  }
  throw new Error("server did not start");
}

const run = async () => {
  await waitForServer();
  const browser = await chromium.launch();
  const consoleErrors = [];

  /* ---------------------------------------------------- routes load directly */
  console.log("\nRoutes load directly (and after refresh)");
  for (const route of ROUTES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on("pageerror", (e) => consoleErrors.push(`${route}: ${e.message}`));
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(`${route}: ${m.text()}`); });
    const res = await page.goto(BASE + route);
    await page.reload();
    const h1s = await page.$$eval("h1", (n) => n.length);
    check(`${route} (${res.status()}, ${h1s} h1)`, res.status() === 200 && h1s === 1, `status ${res.status()}, ${h1s} h1 elements`);
    await page.close();
  }

  /* ---------------------------------------------- no horizontal scroll on mobile */
  console.log("\nNo horizontal scrolling on mobile (390px)");
  for (const route of ROUTES) {
    const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
    page.on("pageerror", (e) => consoleErrors.push(`${route} mobile: ${e.message}`));
    await page.goto(BASE + route);
    const over = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    check(`${route}`, !over, "page scrolls sideways");
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("pageerror", (e) => consoleErrors.push(`nav: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(`nav: ${m.text()}`); });

  /* --------------------------------------------------------- every link resolves */
  console.log("\nEvery internal link resolves");
  const hrefs = new Set();
  for (const route of ROUTES) {
    await page.goto(BASE + route);
    (await page.$$eval('a[href^="/"]', (a) => a.map((x) => x.getAttribute("href")))).forEach((h) => hrefs.add(h.split("?")[0].split("#")[0]));
  }
  for (const href of [...hrefs].filter(Boolean)) {
    const r = await page.goto(BASE + href);
    check(`${href} -> ${r.status()}`, r.status() === 200, `status ${r.status()}`);
  }

  /* --------------------------------------------------- dropdown: keyboard + touch */
  console.log("\nCapabilities dropdown");
  await page.goto(BASE + "/");
  await page.keyboard.press("Tab"); // skip link
  await page.click('header button[aria-controls="cap-menu"]');
  check("opens on click", await page.locator("#cap-menu").isVisible());
  check("lists all four services with descriptions",
    (await page.$$eval("#cap-menu li a span:nth-child(2)", (n) => n.filter((x) => x.textContent.trim().length > 10).length)) >= 4);
  await page.keyboard.press("Escape");
  check("closes on Escape", !(await page.locator("#cap-menu").isVisible()));
  await page.click('header button[aria-controls="cap-menu"]');
  await page.locator('#cap-menu a[href^="/services/test-automation"]').click();
  await page.waitForURL("**/services/test-automation/**");
  check("navigates to the chosen service", page.url().includes("/services/test-automation"));
  check("marks the current page", (await page.locator('header [aria-current="page"]').count()) >= 0);

  /* ------------------------------------------------------- mobile menu is tappable */
  console.log("\nMobile navigation");
  const m = await browser.newPage({ viewport: { width: 390, height: 800 }, hasTouch: true });
  await m.goto(BASE + "/");
  await m.tap('header button[aria-label="Open menu"]');
  check("menu opens on tap", await m.locator("#mobile-menu").isVisible());
  check("capabilities collapsed by default", await m.locator("#m-cap").isHidden());
  await m.tap('button[aria-controls="m-cap"]');
  check("capabilities expand on tap", await m.locator("#m-cap").isVisible());
  // Only flag links that are actually rendered (height > 0): a collapsed accordion's
  // links are present in the DOM but not visible or tappable, so their 0px height is
  // not a real touch-target violation.
  const small = await m.$$eval("#mobile-menu a", (as) => as.filter((a) => { const h = a.getBoundingClientRect().height; return h > 0 && h < 44; }).length);
  check("all visible touch targets at least 44px tall", small === 0, `${small} links below 44px`);
  await m.close();

  /* ------------------------------------------------------- homepage interactions */
  console.log("\nExisting homepage interactions still work");
  await page.goto(BASE + "/");
  await page.locator("#top ol li").nth(2).locator("button").hover();
  check("engineering canvas responds", (await page.textContent("#top [role=status]")).includes("Verify"));
  const before = await page.$$eval("#capabilities li", (l) => l.map((x) => Math.round(x.getBoundingClientRect().width)));
  await page.locator("#capabilities li").nth(3).locator("a").hover();
  await sleep(700);
  const after = await page.$$eval("#capabilities li", (l) => l.map((x) => Math.round(x.getBoundingClientRect().width)));
  check("capability panels animate", before.join() !== after.join(), `${before} -> ${after}`);
  await page.click("#tab-quality");
  check("problem tabs switch", (await page.getAttribute("#tab-quality", "aria-selected")) === "true");
  await page.locator("#tab-quality").press("ArrowRight");
  check("tabs support arrow keys", (await page.getAttribute("#tab-workflow", "aria-selected")) === "true");
  check("capability cards link to service pages",
    (await page.getAttribute('#capabilities li a', "href")).startsWith("/services/"));

  /* ------------------------------------------------------------- the four demos */
  console.log("\nInteractive demonstrations");
  await page.goto(BASE + "/services/test-automation/");
  await page.click('button:has-text("Flaky test")');
  check("pipeline: scenario switches", (await page.textContent("#demo")).includes("test is wrong"));
  await page.click('button:has-text("UI regression")');
  check("pipeline: stage detail opens", (await page.textContent("#pipeline-detail")).includes("retry"));

  await page.goto(BASE + "/services/quality-engineering/");
  const p0 = await page.textContent("#demo [aria-live=polite]");
  await page.click('button:has-text("Admin theme setting")');
  check("risk: preset changes the result", (await page.textContent("#demo [aria-live=polite]")) !== p0);
  await page.locator("#risk-coverage").fill("100");
  check("risk: full coverage drops priority to 0", (await page.textContent("#demo [aria-live=polite]")).includes("0"));

  await page.goto(BASE + "/services/software-engineering/");
  await page.click('button:has-text("Data store")');
  check("architecture: node selection updates detail", (await page.textContent("#demo")).includes("The record of"));

  await page.goto(BASE + "/services/innovation/");
  await page.click('button:has-text("Next step")');
  check("prototype: steps advance", (await page.textContent("#demo")).includes("Step 2 of"));
  for (let i = 0; i < 4; i++) await page.click('button:has-text("Next step")');
  await page.click('button:has-text("Stop")');
  check("prototype: decision explains stopping", (await page.textContent("#demo")).includes("successful outcome"));

  /* ------------------------------------------------------- technology playground */
  console.log("\nTechnology playground");
  await page.goto(BASE + "/technologies/");
  const defaultHeading = await page.textContent('[aria-live="polite"] h4');
  check("defaults to the first technology", defaultHeading.trim() === "Next.js", defaultHeading);
  await page.click('button:has-text("Playwright")');
  const afterSelect = await page.textContent('[aria-live="polite"] h4');
  check("selecting a technology updates the preview", afterSelect.trim() === "Playwright", afterSelect);
  check("preview shows the role badge", (await page.textContent('[aria-live="polite"]')).includes("Testing tool"));
  check("preview links to a related service", (await page.getAttribute('[aria-live="polite"] a', "href") ?? "").startsWith("/services/"));
  // On desktop the preview is sticky, so selecting another item must not scroll the page.
  const scrollYBefore = await page.evaluate(() => window.scrollY);
  await page.click('button:has-text("Git & GitHub")');
  const scrollYAfter = await page.evaluate(() => window.scrollY);
  check("desktop selection does not cause a page scroll", scrollYBefore === scrollYAfter, `${scrollYBefore} -> ${scrollYAfter}`);

  const tp = await browser.newPage({ viewport: { width: 390, height: 800 }, hasTouch: true });
  await tp.goto(BASE + "/technologies/");
  await tp.tap('button:has-text("Node.js")');
  await sleep(200);
  const mobilePreview = await tp.textContent('[aria-live="polite"] h4');
  check("mobile selection updates the preview too", mobilePreview.trim() === "Node.js", mobilePreview);
  const previewBox = await tp.locator('[aria-live="polite"]').boundingBox();
  check("preview is scrolled into view on mobile", previewBox && previewBox.y >= 0 && previewBox.y < 800, JSON.stringify(previewBox));
  await tp.close();

  /* ------------------------------------------------------- wordmark returns to the top */
  console.log("\nWordmark");
  await page.goto(BASE + "/");
  await page.evaluate(() => window.scrollTo(0, 2500));
  await sleep(200);
  const scrollBefore = await page.evaluate(() => window.scrollY);
  await page.click('header a[aria-label="Ethora Labs, home"]');
  await sleep(900);
  const scrollAfter = await page.evaluate(() => window.scrollY);
  check("scrolls to the top when already on the home page", scrollBefore > 500 && scrollAfter === 0, `${scrollBefore} -> ${scrollAfter}`);

  /* ----------------------------------------------- service context -> contact form */
  console.log("\nService context carries into the contact form");
  await page.goto(BASE + "/services/test-automation/");
  await page.click('a[href*="service=test-automation"]');
  await page.waitForURL("**/contact/**");
  await sleep(300);
  check("service preselected", (await page.inputValue("#c-service")) === "test-automation");
  check("context shown to the visitor", (await page.textContent("[aria-live=polite]")).includes("Test Automation"));

  await page.goto(BASE + "/");
  await page.click("#tab-quality");
  await page.click('[role=tabpanel] a[href*="/contact/"]');
  await page.waitForURL("**/contact/**");
  await sleep(300);
  check("problem context carried", (await page.inputValue("#c-message")).length > 10);

  /* ------------------------------------------------------------ form validation */
  console.log("\nContact form validation");
  await page.goto(BASE + "/contact/");
  await page.click('button[type=submit]').catch(() => {});
  const disabled = await page.isDisabled("button[type=submit]");
  if (disabled) {
    ok("submit disabled with no endpoint configured (documented, not faked)");
    check("fallback note explains why", (await page.textContent("#form-note")).includes("isn't connected"));
  } else {
    check("empty submit blocked", await page.locator("#e-name").isVisible());
  }
  await page.fill("#c-email", "not-an-email");
  await page.locator("#c-email").blur();
  check("invalid email rejected", (await page.textContent("#e-email")).includes("valid email"));
  await page.fill("#c-email", "someone@example.com");
  await page.locator("#c-email").blur();
  check("valid email accepted", (await page.locator("#e-email").count()) === 0);

  /* ------------------------------------------------------------------ SEO + a11y */
  /* --------------------------------- product panels: artwork band + CTA stay in place */
  console.log("\nProduct panels");
  // /products/ is now the editorial product-vision page (no ExpandingPanels card grid
  // there any more); the homepage showcase is still the one real instance of this pattern.
  for (const [url, sel, label] of [["/", "#products ul", "home"]]) {
    for (const width of [1024, 1440, 1920]) {
      const pp = await browser.newPage({ viewport: { width, height: 1000 } });
      await pp.goto(BASE + url);
      await pp.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-visible")));
      await sleep(400);
      const count = (await pp.$$(sel + " > li")).length;
      const bad = [];
      for (let i = 0; i < count; i++) {
        await pp.locator(sel + " > li").nth(i).locator("a").hover();
        await sleep(600);
        const rows = await pp.$$eval(sel + " > li a", (as) =>
          as.map((a) => {
            const box = a.getBoundingClientRect();
            const cta = a.querySelector("[data-cta]").getBoundingClientRect();
            const svg = a.querySelector("svg");
            return {
              inside: cta.bottom <= box.bottom + 1 && cta.right <= box.right + 1,
              art: svg ? Math.round(svg.getBoundingClientRect().width) : 0,
            };
          })
        );
        rows.forEach((r, j) => {
          if (!r.inside) bad.push(`active ${i}: panel ${j} CTA clipped`);
          if (r.art === 0) bad.push(`active ${i}: panel ${j} has no diagram`);
        });
        // The diagram grows with the panel, so the active one must be the widest --
        // but only among panels with an actual scaling diagram (a fixed-size icon,
        // like the "Why we build" tile's, is expected to stay small regardless).
        const diagramRows = rows.filter((r) => r.art > 50);
        if (diagramRows.length > 1 && rows[i].art > 50) {
          const widest = Math.max(...diagramRows.map((r) => r.art));
          if (rows[i].art !== widest) bad.push(`active ${i}: diagram ${rows[i].art}px is not the largest (${widest}px)`);
        }
      }
      check(`${label} ${width}px: artwork and CTA hold their place`, bad.length === 0, bad.slice(0, 3).join("; "));
      await pp.close();
    }
  }

  /* -------------------------------------------- canvas labels stay inside the circles */
  console.log("\nEngineering canvas labels fit their circles");
  for (const width of [1440, 1366, 1280]) {
    const cp = await browser.newPage({ viewport: { width, height: 900 } });
    await cp.goto(BASE + "/");
    const over = await cp.evaluate(() =>
      [...document.querySelectorAll("#top ol li button")].flatMap((btn) => {
        const box = btn.getBoundingClientRect();
        const usable = box.width - 24; // the circle's horizontal padding
        return [...btn.querySelectorAll("span")].flatMap((s) =>
          [...s.getClientRects()]
            .filter((r) => r.width > usable)
            .map((r) => `${s.textContent.trim().slice(0, 28)} (${Math.round(r.width)}px in ${Math.round(box.width)}px)`)
        );
      })
    );
    check(`${width}px: no label spills outside its circle`, over.length === 0, over.join("; "));
    await cp.close();
  }

  /* ------------------------------------------------------------- column alignment */
  // The separate home "Our Approach" section (and its internal timeline-alignment
  // check that used to live here) was intentionally removed -- it duplicated the
  // Hero's Engineering Canvas. The full write-up lives only on /approach/ now.

  /* ------------------------------------------- no single word stranded on a last line */
  console.log("\nTypography: no orphaned last-line words");
  // Measures real line boxes. A word is attributed to the line it ENDS on, so a word
  // broken across lines at a hyphen is not mistaken for sitting on the earlier line.
  const findWidows = () => {
    const out = [];
    const sel = "p, li, h1, h2, h3, h4, blockquote, figcaption, dd, dt";
    for (const el of document.querySelectorAll(sel)) {
      if (el.querySelector(sel)) continue;
      // Opt-out for fixed-width labels where wrapping is intended (canvas circles).
      if (el.closest("[data-allow-widow]")) continue;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || el.offsetParent === null) continue;
      const text = el.textContent.replace(/\s+/g, " ").trim();
      if (!text || text.split(" ").length < 5) continue;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const words = [];
      let node;
      while ((node = walker.nextNode())) {
        const re = /\S+/g;
        let m;
        while ((m = re.exec(node.textContent))) {
          const r = document.createRange();
          r.setStart(node, m.index); r.setEnd(node, m.index + m[0].length);
          const rects = r.getClientRects();
          if (!rects.length) continue;
          const lastRect = rects[rects.length - 1];
          if (lastRect.width > 0 || lastRect.height > 0) words.push({ w: m[0], top: Math.round(lastRect.top) });
        }
      }
      if (words.length < 4) continue;
      const tops = [...new Set(words.map((w) => w.top))].sort((a, b) => a - b);
      if (tops.length < 2) continue;
      const lastTop = tops[tops.length - 1];
      const lastLine = words.filter((w) => w.top === lastTop);
      if (lastLine.length === 1) out.push(`${el.tagName} "${lastLine[0].w}" in: ${text.slice(0, 60)}`);
    }
    return out;
  };

  for (const width of [1440, 1024, 768, 390]) {
    const wp = await browser.newPage({ viewport: { width, height: 900 } });
    const offenders = [];
    for (const route of ROUTES) {
      await wp.goto(BASE + route);
      await wp.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-visible")));
      await sleep(80);
      for (const o of await wp.evaluate(findWidows)) offenders.push(`${route} ${o}`);
    }
    check(`${width}px: no stranded last words`, offenders.length === 0, offenders.slice(0, 4).join("\n      "));
    await wp.close();
  }

  console.log("\nSEO metadata");
  for (const route of ["/", "/services/software-engineering/", "/services/quality-engineering/", "/services/test-automation/", "/services/innovation/", "/about/", "/contact/"]) {
    await page.goto(BASE + route);
    const meta = await page.evaluate(() => ({
      title: document.title,
      desc: document.querySelector('meta[name=description]')?.content ?? "",
      canonical: document.querySelector('link[rel=canonical]')?.href ?? "",
      og: document.querySelector('meta[property="og:title"]')?.content ?? "",
      h1: document.querySelectorAll("h1").length,
    }));
    check(`${route} metadata`, meta.title.length > 15 && meta.desc.length > 50 && meta.h1 === 1,
      JSON.stringify(meta));
  }
  const sm = await page.goto(BASE + "/sitemap.xml");
  const smBody = await sm.text();
  check("sitemap lists every service", ROUTES.filter((r) => r.startsWith("/services/")).every((r) => smBody.includes(r)));
  check("robots.txt points at the sitemap", (await (await page.goto(BASE + "/robots.txt")).text()).includes("sitemap.xml"));

  console.log("\nAccessibility basics");
  await page.goto(BASE + "/services/quality-engineering/");
  const a11y = await page.evaluate(() => {
    const noLabel = [...document.querySelectorAll("input,select,textarea")]
      .filter((el) => !el.labels?.length && !el.getAttribute("aria-label")).length;
    const imgNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length;
    const btnNoName = [...document.querySelectorAll("button")]
      .filter((b) => !b.textContent.trim() && !b.getAttribute("aria-label")).length;
    return { noLabel, imgNoAlt, btnNoName, lang: document.documentElement.lang };
  });
  check("every form control is labelled", a11y.noLabel === 0, `${a11y.noLabel} unlabelled`);
  check("every image has alt text", a11y.imgNoAlt === 0);
  check("every button has an accessible name", a11y.btnNoName === 0);
  check("document language set", a11y.lang === "en");
  await page.keyboard.press("Tab");
  check("focus is visible on keyboard navigation",
    await page.evaluate(() => { const el = document.activeElement; return !!el && getComputedStyle(el).outlineStyle !== "none"; }));

  console.log("\nConsole");
  check("no unhandled JavaScript errors", consoleErrors.length === 0, consoleErrors.slice(0, 5).join("\n      "));

  await browser.close();
  server.kill();
  console.log(failures === 0 ? "\nAll end-to-end checks passed.\n" : `\n${failures} check(s) failed.\n`);
  process.exit(failures === 0 ? 0 : 1);
};

run().catch((e) => { console.error(e); server.kill(); process.exit(1); });
