import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

// Browser-level proof that Vazirmatn is downloaded ONLY by RTL documents. Self-contained: it
// serves the real @fontsource stylesheets/woff2 files plus the real font rules of
// src/app/globals.css and the kit token from a routed fake origin, so it measures Chromium's
// own lazy font loading instead of a mocked one. Static contract: tests/unit/rtl-font-stack.test.ts.

const ROOT = process.cwd();
const ORIGIN = "http://fonts.test";
const requireFromRoot = createRequire(path.join(ROOT, "package.json"));
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

const KIT_FONT_UI = /--ci-font-ui:\s*([^;]+);/.exec(read("packages/ui-kit/src/ci-tokens.css"))?.[1];
// Every rule of globals.css that names Vazirmatn (comments stripped), copied verbatim.
const VAZIRMATN_RULES = read("src/app/globals.css")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .match(/[^{};]+\{[^{}]*Vazirmatn[^{}]*\}/g);

const STYLESHEETS = [
  "@fontsource/inter/400.css",
  "@fontsource/inter/600.css",
  "@fontsource/vazirmatn/400.css",
  "@fontsource/vazirmatn/500.css",
  "@fontsource/vazirmatn/600.css",
  "@fontsource/vazirmatn/700.css",
];

const CONTENT_TYPES: Record<string, string> = {
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

function documentFor(lang: string, dir: "ltr" | "rtl", text: string): string {
  const links = STYLESHEETS.map((s) => `<link rel="stylesheet" href="/${s}">`).join("");
  return `<!doctype html><html lang="${lang}" dir="${dir}" class="ci-theme"><head><meta charset="utf-8">${links}
<style>.ci-theme { --ci-font-ui: ${KIT_FONT_UI}; font-family: var(--ci-font-ui); }
${(VAZIRMATN_RULES ?? []).join("\n")}</style></head>
<body><p>${text}</p><p style="font-weight:600">${text}</p></body></html>`;
}

async function loadAndCollectFontRequests(page: Page, html: string) {
  const requested: string[] = [];
  page.on("request", (req) => {
    if (req.resourceType() === "font") requested.push(req.url());
  });
  await page.route(`${ORIGIN}/**`, async (route) => {
    const { pathname } = new URL(route.request().url());
    if (pathname === "/") {
      await route.fulfill({ contentType: "text/html; charset=utf-8", body: html });
      return;
    }
    const spec = decodeURIComponent(pathname.slice(1));
    const file = requireFromRoot.resolve(spec);
    await route.fulfill({
      contentType: CONTENT_TYPES[path.extname(file)] ?? "application/octet-stream",
      body: fs.readFileSync(file),
    });
  });
  await page.goto(`${ORIGIN}/`);
  const faces = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts]
      .filter((f) => f.family.replace(/["']/g, "") === "Vazirmatn")
      .map((f) => f.status);
  });
  return { requested, faces };
}

test.beforeAll(() => {
  expect(KIT_FONT_UI, "kit --ci-font-ui token").toMatch(/^\s*"Inter"/);
  expect(VAZIRMATN_RULES?.length ?? 0, "globals.css names Vazirmatn").toBeGreaterThan(0);
});

test("an LTR page never downloads Vazirmatn, even with Arabic-script text on screen", async ({
  page,
}) => {
  // The language switcher shows the RTL locales' native names on every LTR page.
  const { requested, faces } = await loadAndCollectFontRequests(
    page,
    documentFor("en", "ltr", "Providers · فارسی · العربية · اردو · עברית")
  );
  expect(requested.some((u) => /inter-latin-400/.test(u))).toBe(true);
  expect(requested.filter((u) => /vazirmatn/i.test(u))).toEqual([]);
  expect(faces.length).toBeGreaterThan(0);
  expect(faces.every((s) => s === "unloaded")).toBe(true);
});

test("an RTL Persian page downloads only the arabic Vazirmatn subset", async ({ page }) => {
  const { requested, faces } = await loadAndCollectFontRequests(
    page,
    documentFor("fa", "rtl", "ارائه‌دهندگان gpt-4o")
  );
  const vazirmatn = requested.filter((u) => /vazirmatn/i.test(u));
  expect(vazirmatn.some((u) => /vazirmatn-arabic-400-normal\.woff2$/.test(u))).toBe(true);
  expect(vazirmatn.some((u) => /vazirmatn-arabic-600-normal\.woff2$/.test(u))).toBe(true);
  // Latin ("gpt-4o") stays on Inter: the latin Vazirmatn files are never fetched.
  expect(vazirmatn.filter((u) => /vazirmatn-latin/.test(u))).toEqual([]);
  expect(faces).toContain("loaded");
  expect(await page.evaluate(() => document.fonts.check('16px "Vazirmatn"', "فارسی"))).toBe(true);
});

test("an RTL page without Arabic-script text (Hebrew) does not download Vazirmatn", async ({
  page,
}) => {
  const { requested } = await loadAndCollectFontRequests(page, documentFor("he", "rtl", "ספקים"));
  expect(requested.filter((u) => /vazirmatn/i.test(u))).toEqual([]);
});
