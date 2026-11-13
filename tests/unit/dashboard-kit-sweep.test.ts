import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// F4 whole-tree P6 sweep (KEA-7886). The per-lote greps only covered the files each lote was
// assigned, so leftovers sat in unassigned files (CompressionSettingsTab, MitmProxyTab, shell
// widgets, landing icons). This guard runs the same greps on the whole app tree. Every kept
// exception is listed here with its reason; anything new fails.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const LEGACY = "src/shared/components/layouts/legacy/"; // removed by F4-A (Task 41)

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!/node_modules|__tests__/.test(entry.name)) walk(p, out);
    } else if (/\.tsx?$/.test(entry.name) && !/\.(test|spec)\./.test(entry.name)) out.push(p);
  }
  return out;
}

const rel = (p: string) => path.relative(ROOT, p).split(path.sep).join("/");
const files = (...dirs: string[]) =>
  dirs.flatMap((d) => walk(path.join(ROOT, d))).filter((f) => !rel(f).startsWith(LEGACY));
const APP = files("src/app", "src/shared/components");
const DASHBOARD = files("src/app/(dashboard)", "src/shared/components");

function countBy(list: string[], re: RegExp): Record<string, number> {
  const out: Record<string, number> = {};
  for (const f of list) {
    const n = (fs.readFileSync(f, "utf8").match(re) ?? []).length;
    if (n) out[rel(f)] = n;
  }
  return out;
}

test("no Material Symbols ligature span is left in the app tree", () => {
  const hits = countBy(APP, /material-symbols-outlined/g);
  // Icon.tsx: the unmapped-name fallback branch, removed with the font by F4-A.
  delete hits["src/shared/components/Icon.tsx"];
  assert.deepEqual(hits, {});
});

test("no raw <select>, <textarea> or <table> outside the adapters (dashboard + shared)", () => {
  const hits = countBy(DASHBOARD, /<(select|textarea|table)\b/g);
  // Comment-only mentions of "<select>" (no JSX): ModelSelectField, StudioConfigPane.
  for (const f of Object.keys(hits)) {
    const jsx = fs
      .readFileSync(path.join(ROOT, f), "utf8")
      .split("\n")
      .filter((l) => /<(select|textarea|table)\b/.test(l) && !/^\s*(\/\/|\*|\{\/\*)/.test(l));
    if (jsx.length === 0) delete hits[f];
  }
  assert.deepEqual(hits, {});
});

// Comments blanked (newlines kept) so `<button>` mentioned inside a comment is not a site.
function blankComments(src: string): string {
  const blank = (m: string) => m.replace(/[^\n]/g, " ");
  return src.replace(/\/\*[\s\S]*?\*\//g, blank).replace(/\/\/[^\n]*/g, blank);
}

// The comment block that ends within the 3 lines above `i` (a `//` run or a `/* … */` block).
function commentAbove(lines: string[], i: number): string | null {
  for (let j = i - 1; j >= Math.max(0, i - 3); j--) {
    if (/^\s*\/\//.test(lines[j])) {
      let k = j;
      while (k > 0 && /^\s*\/\//.test(lines[k - 1])) k--;
      return lines.slice(k, j + 1).join("\n");
    }
    if (lines[j].includes("*/")) {
      let k = j;
      while (k > 0 && !lines[k].includes("/*")) k--;
      return lines.slice(k, j + 1).join("\n");
    }
  }
  return null;
}

test("every raw <button>/<input> left in the dashboard tree carries a `kit-exception:` comment", () => {
  // Adapters wrap the native element on purpose.
  const ADAPTERS = new Set([
    "src/shared/components/Select.tsx",
    "src/shared/components/Checkbox.tsx",
    "src/shared/components/Collapsible.tsx",
    "src/shared/components/ModelSelectField.tsx",
  ]);
  const unexplained: string[] = [];
  let sites = 0;
  for (const f of DASHBOARD) {
    if (ADAPTERS.has(rel(f))) continue;
    const src = fs.readFileSync(f, "utf8");
    const lines = src.split("\n");
    blankComments(src)
      .split("\n")
      .forEach((code, i) => {
        if (!/<(button|input)\b/.test(code)) return;
        sites++;
        // An explicit marker, not loose words (aria-hidden / overflow-hidden used to pass).
        if (!/kit-exception:/.test(commentAbove(lines, i) ?? ""))
          unexplained.push(`${rel(f)}:${i + 1}`);
      });
  }
  assert.ok(sites > 10, `found only ${sites} raw controls; the scan is broken`);
  assert.deepEqual(unexplained, []);
});

test("the exception check rejects loose words and accepts the marker", () => {
  const loose = [
    '<div className="overflow-hidden" aria-hidden="true">',
    '  <button type="button">',
  ];
  assert.equal(commentAbove(loose, 1), null);
  const marked = ["  {/* kit-exception: multi-line tile", "      (icon, title) */}", "  <button>"];
  assert.match(commentAbove(marked, 2) ?? "", /kit-exception:/);
  assert.doesNotMatch(blankComments("{/* a native <button> here */}"), /<button/);
});

test("hard-coded palette hues and dark: variants only where the exception is documented", () => {
  const HUE =
    /\b(?:text|bg|border|ring|from|to|via|fill|stroke|outline|divide|accent|decoration|shadow|placeholder|caret)-(?:red|green|blue|amber|yellow|emerald|rose|slate|gray|zinc|neutral|indigo|violet|purple|orange|cyan|sky|teal|lime|pink|fuchsia|stone)-\d/g;
  // None left: the provider category legend moved to the kit chart tokens (KEA-7886, P8 —
  // providerCategoryPalette.ts). Categorical colour goes through categoricalPalette.ts.
  const HUE_ALLOWED: Record<string, number> = {};
  assert.deepEqual(countBy(DASHBOARD, HUE), HUE_ALLOWED);

  const DARK_ALLOWED: Record<string, number> = {
    // Typography plugin colours flip with prose-invert (no kit prose).
    "src/app/(dashboard)/dashboard/agent-skills/components/SkillPreviewPane.tsx": 1,
  };
  assert.deepEqual(countBy(DASHBOARD, /(?<=["'`\s])dark:[a-z]/g), DARK_ALLOWED);
});

// The landing (/landing) follows the active palette (Editions or Classic, light or dark) through
// the kit tokens and the globals.css bridge. It used to paint a fixed dark page with ~50 literals
// (#0B0E14, #E54D5E, text-white, text-gray-400, bg-emerald-500, rgba() glows…).
const LANDING_COLOR_LITERALS: Array<[string, RegExp]> = [
  ["hex", /(?<![\w&/])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g],
  // No \b: inside an arbitrary Tailwind value the function follows `_` (`shadow-[0_0_40px_rgba(…)]`).
  ["rgb()/hsl()", /(?<![a-zA-Z-])(?:rgba?|hsla?|oklch|oklab)\(/g],
  [
    "Tailwind palette hue",
    /\b(?:text|bg|border|ring|from|to|via|fill|stroke|outline|divide|accent|decoration|shadow|placeholder|caret)-(?:red|green|blue|amber|yellow|emerald|rose|slate|gray|zinc|neutral|indigo|violet|purple|orange|cyan|sky|teal|lime|pink|fuchsia|stone)-\d/g,
  ],
  [
    "white/black",
    /\b(?:text|bg|border|ring|from|to|via|fill|stroke|outline|divide|shadow|placeholder|caret)-(?:white|black)\b/g,
  ],
  [
    "named SVG/CSS colour",
    /\b(?:fill|stroke|color)=["'{]+(?!none|currentColor|var\()[a-z]+["'}]/gi,
  ],
];

function landingColorLiterals(src: string): string[] {
  // Like blankComments, but a `//` right after `:` is a URL (`https://…`), not a comment.
  const blank = (m: string) => m.replace(/[^\n]/g, " ");
  const code = src.replace(/\/\*[\s\S]*?\*\//g, blank).replace(/(?<!:)\/\/[^\n]*/g, blank);
  return LANDING_COLOR_LITERALS.flatMap(([kind, re]) =>
    (code.match(re) ?? []).map((m) => `${kind}: ${m}`)
  );
}

test("the landing renders only kit colours (no hex, rgb(), palette hues or white/black)", () => {
  const landing = files("src/app/landing");
  assert.ok(landing.length >= 8, `found only ${landing.length} landing files; the scan is broken`);
  const hits: Record<string, string[]> = {};
  for (const f of landing) {
    const found = landingColorLiterals(fs.readFileSync(f, "utf8"));
    if (found.length) hits[rel(f)] = found;
  }
  assert.deepEqual(hits, {});
});

test("the landing colour scan catches each literal form and ignores anchors and tokens", () => {
  const caught = landingColorLiterals(
    [
      '<div className="bg-[#0B0E14] text-white hover:text-gray-400" />',
      '<path stroke={active ? "#E54D5E" : "rgb(75, 85, 99)"} />',
      '<div className="shadow-[0_0_40px_rgba(229,77,94,0.3)] stroke-yellow-700 bg-white/10" />',
      '<path fill="red" />',
      '<a href="https://github.com/x" className="text-gray-400">',
    ].join("\n")
  );
  assert.equal(caught.length, 10, caught.join("\n"));
  assert.deepEqual(
    landingColorLiterals(
      [
        '<a href="#features">x</a>',
        '<div className="bg-bg text-text-main border-border text-[var(--ci-chart-2-ink)]" />',
        '<path fill="none" stroke="var(--color-text-muted)" />',
        "// a #E54D5E comment is not a colour",
      ].join("\n")
    ),
    []
  );
});

test("no hand-rolled role=dialog outside the Modal adapter", () => {
  const hits = countBy(DASHBOARD, /role=["{']*dialog/g);
  delete hits["src/shared/components/Modal.tsx"]; // doc comment on the kit DialogContent
  assert.deepEqual(hits, {});
});

// A spun <Icon> kept turning under reduced motion and exposed no status. Spinners go through the
// Spinner adapter in Loading.tsx: the kit arc, a labelled status unless `decorative`.
test("animate-spin stays within its budget: new spinners use the Spinner adapter", () => {
  const hits = countBy(APP, /\banimate-spin\b/g);
  // Another front owns this file; its one spun icon goes with that work.
  delete hits["src/shared/components/ConsoleLogViewer.tsx"];
  const SPIN_ALLOWED: Record<string, number> = {
    // Spun refresh/progress icons in files that draw charts, which the chart work owns.
    "src/app/(dashboard)/dashboard/analytics/CompressionAnalyticsTab.tsx": 1,
    "src/app/(dashboard)/dashboard/health/TelemetryCard.tsx": 1,
    // Hand-made CSS rings, not icons: bordered spans and divs, some tinted to a status badge.
    "src/app/(dashboard)/dashboard/analytics/components/DiversityScoreCard.tsx": 1,
    "src/app/(dashboard)/dashboard/conversations/page.tsx": 1,
    "src/app/(dashboard)/dashboard/health/page.tsx": 1,
    "src/app/(dashboard)/dashboard/models/CatalogTestBadge.tsx": 1,
    "src/app/(dashboard)/dashboard/tools/traffic-inspector/components/chat/MessageContent.tsx": 1,
    "src/shared/components/RequestLoggerDetail.tsx": 1,
    "src/shared/components/RequestLoggerV2.tsx": 1,
  };
  assert.deepEqual(hits, SPIN_ALLOWED);
});

test("no raw <kbd> outside the kit Kbd", () => {
  const hits = countBy(APP, /<kbd\b/g);
  delete hits["src/shared/components/CommandPalette.tsx"]; // moves with the kit Command palette
  assert.deepEqual(hits, {});
});

test("the dead shared Footer stays removed (landing renders its own)", () => {
  // Rendered nowhere since the kit shell (track G); removal approved for F4.
  assert.ok(!fs.existsSync(path.join(ROOT, "src/shared/components/Footer.tsx")));
  const barrel = fs.readFileSync(path.join(ROOT, "src/shared/components/index.tsx"), "utf8");
  assert.doesNotMatch(barrel, /\bas Footer\b/);
});
