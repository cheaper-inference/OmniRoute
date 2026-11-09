import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// #19066 block 6: the kit sweep (dashboard-kit-sweep.test.ts) only scanned the dashboard tree and
// the landing, and only for Tailwind palette hues. Colour literals in three more forms slipped
// through everywhere — arbitrary-hex classes (`bg-[#0B0E14]`), `rgba()`/`hsl()` in TSX and
// literal colours in `style={{ … }}` — and so did the public routes and the shared constants.
// This guard scans them all. Sites that cannot change yet are listed below with a reason and the
// count found on release/v3.8.53; a list may only shrink (a file over its count, or a file that
// is not listed, fails). It also rejects `kit-exception:` reasons that claim the kit lacks a
// component it now ships.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const LEGACY = "src/shared/components/layouts/legacy/";
const TRACKED = "tracked in #19066";

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

const PUBLIC_ROUTES = [
  "src/app/landing",
  "src/app/docs",
  "src/app/login",
  "src/app/status",
  "src/app/connect",
  "src/app/forbidden",
];
const PUBLIC = files(...PUBLIC_ROUTES);
const DASHBOARD = files("src/app/(dashboard)", "src/shared/components");
const UI = [...PUBLIC, ...DASHBOARD];
// Top level only: src/shared/constants/*.ts (the sub-folders hold data tables, not UI colour).
const CONSTANTS = fs
  .readdirSync(path.join(ROOT, "src/shared/constants"), { withFileTypes: true })
  .filter((e) => e.isFile() && /\.ts$/.test(e.name))
  .map((e) => path.join(ROOT, "src/shared/constants", e.name));

// ── Scanners (exported shape kept local; the self-tests below drive them on snippets) ──────────

/** Comments blanked (newlines kept); a `//` right after `:` is a URL (`https://…`), not a comment. */
function blankComments(src: string): string {
  const blank = (m: string) => m.replace(/[^\n]/g, " ");
  return src.replace(/\/\*[\s\S]*?\*\//g, blank).replace(/(?<!:)\/\/[^\n]*/g, blank);
}

const ARBITRARY_HEX = /-\[#[0-9a-fA-F]{3,8}\b/g;
// No \b: inside an arbitrary Tailwind value the function follows `_` (`shadow-[0_0_8px_rgba(…)]`).
const RGB_HSL = /(?<![a-zA-Z-])(?:rgba?|hsla?)\(/g;
const PALETTE_HUE =
  /\b(?:text|bg|border|ring|from|to|via|fill|stroke|outline|divide|accent|decoration|shadow|placeholder|caret)-(?:red|green|blue|amber|yellow|emerald|rose|slate|gray|zinc|neutral|indigo|violet|purple|orange|cyan|sky|teal|lime|pink|fuchsia|stone)-\d/g;
// A whole quoted string that is a hex colour ("#10B981"); issue refs in prose (#3332) don't match.
const QUOTED_HEX = /(?<=["'`])#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?=["'`])/g;
const STYLE_COLOR_LITERAL =
  /\b(?:color|background|backgroundColor|backgroundImage|border|borderColor|border(?:Top|Right|Bottom|Left)Color|outline|outlineColor|fill|stroke|boxShadow|textShadow|caretColor|accentColor)\s*:\s*[^,}\n]*?(?:#[0-9a-fA-F]{3,8}\b|(?<![a-zA-Z-])(?:rgba?|hsla?)\(|["'`](?:white|black|red|green|blue|gray|grey|orange|yellow|purple|pink)["'`])/g;

/** The `style={{ … }}` objects of a source (balanced braces). */
function styleObjects(code: string): string[] {
  const out: string[] = [];
  let i = code.indexOf("style={{");
  while (i >= 0) {
    let depth = 0;
    let j = i + "style=".length;
    for (; j < code.length; j++) {
      if (code[j] === "{") depth++;
      else if (code[j] === "}" && --depth === 0) break;
    }
    out.push(code.slice(i, j + 1));
    i = code.indexOf("style={{", j);
  }
  return out;
}

const count = (code: string, re: RegExp) => (code.match(re) ?? []).length;

function scanArbitraryHex(src: string): number {
  return count(blankComments(src), ARBITRARY_HEX);
}
function scanRgbHsl(src: string): number {
  return count(blankComments(src), RGB_HSL);
}
function scanStyleLiterals(src: string): number {
  return styleObjects(blankComments(src)).reduce((n, s) => n + count(s, STYLE_COLOR_LITERAL), 0);
}
function scanQuotedHex(src: string): number {
  return count(blankComments(src), QUOTED_HEX);
}
function scanPaletteHue(src: string): number {
  return count(blankComments(src), PALETTE_HUE);
}

// Kit components shipped since the kit-exception markers were written (kit 0.0.8x): an exception
// whose reason says the kit (or the adapters) lacks one of these is out of date. `concept` finds
// the pattern in the reason, `claim` the "the kit can't" wording, `named` lets a reason that
// names the kit component (and so says why it doesn't fit) through.
const SHIPPED: Array<{ component: string; concept: RegExp; named: RegExp }> = [
  {
    component: "FileInput / FileDropZone",
    concept: /\bfile\s*(?:input|picker|upload|chooser)|\bdrop\s*zone|\bdropzone/i,
    named: /\bFile(?:Input|DropZone)\b/,
  },
  { component: "Tile", concept: /\btiles?\b/i, named: /\bTile\b/ },
  {
    component: "Disclosure",
    concept: /\bdisclosure|<details>|\baccordion/i,
    named: /\bDisclosure\b/,
  },
  {
    component: "ToggleChip",
    concept: /\btoggle\s*chip|\bfilter\s*(?:chip|pill)/i,
    named: /\bToggleChip\b/,
  },
  {
    component: "HoverCard",
    concept: /\bhover\s*card|\bhover\s*popover|\bpopover on hover/i,
    named: /\bHoverCard\b/,
  },
  {
    component: "DateRangePicker",
    concept: /\bdate[\s-]*range|\brange\s*picker|\bcalendar\b/i,
    named: /\bDateRangePicker\b/,
  },
  {
    component: "Progress (tones, segments)",
    concept: /\bprogress\s*(?:bar|tone|segment|meter)s?\b/i,
    named: /\bProgress\b/,
  },
  {
    component: "LegendMarker",
    concept: /\blegend\s*(?:marker|dot|swatch)/i,
    named: /\bLegendMarker\b/,
  },
];
const ABSENCE_CLAIM =
  /\b(?:kit|adapters?)\s+(?:has|have)\s+(?:no|none)\b|\b(?:kit|adapters?)\s+(?:lacks?|is missing|are missing)\b|\bno kit\b|\b(?:has|have) none\b|\bsingle-line pill\b|\bfixed-height\b|\bkit Button is a\b/i;

/** `kit-exception:` comments (the marker line plus its continuation lines) of a source. */
function kitExceptionReasons(src: string): Array<{ line: number; reason: string }> {
  const lines = src.split("\n");
  const out: Array<{ line: number; reason: string }> = [];
  lines.forEach((l, i) => {
    const at = l.indexOf("kit-exception:");
    if (at < 0) return;
    const parts = [l.slice(at + "kit-exception:".length)];
    const lineComment = /^\s*\/\//.test(l);
    for (let k = i + 1; k < Math.min(lines.length, i + 6); k++) {
      if (/\*\//.test(parts[parts.length - 1])) break;
      if (lineComment && !/^\s*\/\//.test(lines[k])) break;
      if (!lineComment && /^\s*<|^\s*\{?\s*$/.test(lines[k])) break;
      parts.push(lines[k]);
    }
    out.push({
      line: i + 1,
      reason: parts
        .join(" ")
        .replace(/\*\/\s*\}?.*$/, "")
        .replace(/\s*\/\/\s*/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    });
  });
  return out;
}

/** The shipped kit components a reason wrongly says are missing. */
function staleKitClaims(reason: string): string[] {
  if (!ABSENCE_CLAIM.test(reason)) return [];
  return SHIPPED.filter((s) => s.concept.test(reason) && !s.named.test(reason)).map(
    (s) => s.component
  );
}

// ── Allowlists (count on release/v3.8.53 @ 785a3576; may only go down) ─────────────────────────

type Allow = Record<string, { max: number; reason: string }>;

const ARBITRARY_HEX_ALLOWED: Allow = {};

const RGB_HSL_ALLOWED: Allow = {
  "src/app/(dashboard)/dashboard/providers/components/ProviderCard.tsx": {
    max: 2,
    reason: `blue flash of the locate-card highlight animation — ${TRACKED}`,
  },
  "src/app/(dashboard)/dashboard/providers/[id]/components/ConnectionQuotaPanel.tsx": {
    max: 3,
    reason: `grey rgba() track behind the quota bars (bg-bg-subtle) — ${TRACKED}`,
  },
  "src/app/(dashboard)/dashboard/tools/traffic-inspector/components/shared/ContextColorBar.tsx": {
    max: 1,
    reason: `hsl(hash) context colour (categoricalSlotFor) — ${TRACKED}`,
  },
  "src/shared/components/NavigationProgress.tsx": {
    max: 2,
    reason: `old indigo/coral glow of the route progress bar (block 2) — ${TRACKED}`,
  },
  "src/shared/components/monacoKitTheme.ts": {
    max: 1,
    reason:
      "serializes a kit token resolved at runtime into the rgba() Monaco expects — a converter, not a palette",
  },
};

const STYLE_LITERAL_ALLOWED: Allow = {
  "src/app/(dashboard)/dashboard/conversations/page.tsx": {
    max: 1,
    reason: `"#fff" fallback of the log status badge (block 1) — ${TRACKED}`,
  },
  "src/app/(dashboard)/dashboard/media-providers/[kind]/page.tsx": {
    max: 1,
    reason: `#64748b brand fallback (neutral token) — ${TRACKED}`,
  },
  "src/app/(dashboard)/dashboard/media-providers/components/MediaProviderHeader.tsx": {
    max: 1,
    reason: `#64748b brand fallback (neutral token) — ${TRACKED}`,
  },
  "src/app/(dashboard)/dashboard/providers/[id]/components/ConnectionQuotaPanel.tsx": {
    max: 2,
    reason: `grey rgba() track behind the quota bars (bg-bg-subtle) — ${TRACKED}`,
  },
  "src/app/(dashboard)/dashboard/providers/components/ProviderCard.tsx": {
    max: 1,
    reason: `neutral fallback of the provider icon tile when the catalog has no colour — ${TRACKED}`,
  },
  "src/shared/components/NavigationProgress.tsx": {
    max: 1,
    reason: `old indigo/coral glow of the route progress bar (block 2) — ${TRACKED}`,
  },
};

const CONSTANTS_HEX_ALLOWED: Allow = {
  "src/shared/constants/colors.ts": {
    max: 70,
    reason: `parallel hex palette of the log/status badges (block 1: kit tones) — ${TRACKED}`,
  },
  "src/shared/constants/cliTools.ts": {
    max: 38,
    reason: `CLI tool brand colours (catalog identity data), drawn as a tint, never as text — ${TRACKED}`,
  },
  "src/shared/constants/cliToolsGrokBuild.ts": {
    max: 1,
    reason: `CLI tool brand colour (catalog identity data) — ${TRACKED}`,
  },
  "src/shared/constants/pwaThemeColors.ts": {
    max: 2,
    reason:
      "the one mirror of the Editions page background for viewport metadata and the manifest (no CSS there), pinned to ci-editions.css by pwa-theme-colors.test.ts",
  },
};

const STALE_KIT_EXCEPTION_ALLOWED: Allow = Object.fromEntries(
  [
    ["src/app/(dashboard)/dashboard/batch/components/UploadFileModal.tsx", 1],
    ["src/app/(dashboard)/dashboard/batch/components/wizard/InputStep.tsx", 1],
    ["src/app/(dashboard)/dashboard/combos/AutoComboCatalog.tsx", 1],
    ["src/app/(dashboard)/dashboard/combos/ComboHeaderActions.tsx", 1],
    ["src/app/(dashboard)/dashboard/combos/page.tsx", 2],
    ["src/app/(dashboard)/dashboard/context/rtk/RtkTomlImportCard.tsx", 1],
    ["src/app/(dashboard)/dashboard/memory/components/tabs/MemoriesTab.tsx", 1],
    ["src/app/(dashboard)/dashboard/omni-skills/OmniSkillsPageClient.tsx", 1],
    ["src/app/(dashboard)/dashboard/orchestration/tabs/OverviewTab.tsx", 1],
    ["src/app/(dashboard)/dashboard/profile/page.tsx", 1],
    ["src/app/(dashboard)/dashboard/runtime/RuntimePageClient.tsx", 1],
    ["src/app/(dashboard)/dashboard/search-tools/components/SearchConceptCard.tsx", 1],
    ["src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx", 1],
    ["src/app/(dashboard)/dashboard/settings/components/ProviderTransferPanel.tsx", 1],
    ["src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx", 1],
    ["src/app/(dashboard)/dashboard/webhooks/components/shared/IntegrationCard.tsx", 1],
  ].map(([file, max]) => [
    file,
    {
      max: max as number,
      reason: `reason predates kit FileInput/FileDropZone, Tile and Disclosure (block 4) — ${TRACKED}`,
    },
  ])
);

function overBudget(list: string[], scan: (src: string) => number, allow: Allow): string[] {
  const out: string[] = [];
  for (const f of list) {
    const n = scan(fs.readFileSync(f, "utf8"));
    const max = allow[rel(f)]?.max ?? 0;
    if (n > max) out.push(`${rel(f)}: ${n} (allowed ${max})`);
  }
  return out;
}

// ── Guards on the tree ─────────────────────────────────────────────────────────────────────────

test("the scan reaches the public routes, the dashboard and the shared constants", () => {
  for (const route of PUBLIC_ROUTES) {
    assert.ok(
      PUBLIC.some((f) => rel(f).startsWith(`${route}/`)),
      `${route} has files in the scan`
    );
  }
  assert.ok(DASHBOARD.length > 300, `found only ${DASHBOARD.length} dashboard files`);
  assert.ok(
    CONSTANTS.some((f) => rel(f) === "src/shared/constants/colors.ts"),
    "constants/colors.ts is scanned"
  );
});

test("every allowlist entry names an existing file and gives a reason", () => {
  for (const allow of [
    ARBITRARY_HEX_ALLOWED,
    RGB_HSL_ALLOWED,
    STYLE_LITERAL_ALLOWED,
    CONSTANTS_HEX_ALLOWED,
    STALE_KIT_EXCEPTION_ALLOWED,
  ]) {
    for (const [file, { max, reason }] of Object.entries(allow)) {
      assert.ok(fs.existsSync(path.join(ROOT, file)), `${file} exists`);
      assert.ok(max > 0, `${file}: a zero budget is no entry`);
      assert.ok(reason.length > 20, `${file}: the reason says why`);
    }
  }
});

test("no arbitrary-hex class (-[#…]) in the public routes, the dashboard or the constants", () => {
  assert.deepEqual(overBudget([...UI, ...CONSTANTS], scanArbitraryHex, ARBITRARY_HEX_ALLOWED), []);
});

test("no rgba()/hsl() literal in the public routes, the dashboard or the constants", () => {
  assert.deepEqual(overBudget([...UI, ...CONSTANTS], scanRgbHsl, RGB_HSL_ALLOWED), []);
});

test("no literal colour in a style={{ … }} object (public routes + dashboard)", () => {
  assert.deepEqual(overBudget(UI, scanStyleLiterals, STYLE_LITERAL_ALLOWED), []);
});

test("no Tailwind palette hue in the public routes or the constants", () => {
  // The dashboard tree has its own (stricter, exact) check in dashboard-kit-sweep.test.ts.
  assert.deepEqual(overBudget([...PUBLIC, ...CONSTANTS], scanPaletteHue, {}), []);
});

test("no hex colour string in src/shared/constants/*.ts outside the listed data", () => {
  assert.deepEqual(overBudget(CONSTANTS, scanQuotedHex, CONSTANTS_HEX_ALLOWED), []);
});

test("no kit-exception reason claims the kit lacks a component it now ships", () => {
  const list = files("src/app", "src/shared");
  const stale: Record<string, string[]> = {};
  for (const f of list) {
    for (const { line, reason } of kitExceptionReasons(fs.readFileSync(f, "utf8"))) {
      const claims = staleKitClaims(reason);
      if (claims.length) (stale[rel(f)] ??= []).push(`:${line} (${claims.join(", ")})`);
    }
  }
  const over = Object.entries(stale)
    .filter(([f, sites]) => sites.length > (STALE_KIT_EXCEPTION_ALLOWED[f]?.max ?? 0))
    .map(([f, sites]) => `${f}${sites.join(" ")}`);
  assert.ok(
    Object.keys(stale).length > 0 || Object.keys(STALE_KIT_EXCEPTION_ALLOWED).length === 0,
    "the scan found the listed stale reasons (or the list is empty)"
  );
  assert.deepEqual(over, [], "use the kit component, or name it and say why it doesn't fit");
});

// ── Self-tests: each form is caught, tokens and prose are not ──────────────────────────────────

test("arbitrary-hex scan: catches -[#hex] in any utility, ignores tokens and comments", () => {
  assert.equal(
    scanArbitraryHex(
      '<div className="bg-[#0B0E14] text-[#fff] border-[#E54D5Eaa] hover:shadow-[#000]" />'
    ),
    4
  );
  assert.equal(
    scanArbitraryHex(
      '<div className="bg-[var(--ci-chart-2-subtle)] text-[10px]" /> {/* bg-[#fff] */}'
    ),
    0
  );
});

test("rgba()/hsl() scan: catches the functions, also inside arbitrary values", () => {
  assert.equal(
    scanRgbHsl(
      [
        'const glow = "0 0 10px rgba(99, 102, 241, 0.6)";',
        "const c = `hsl(${hue}, 70%, 50%)`;",
        '<div className="shadow-[0_0_8px_rgb(0_0_0/.2)]" style={{ color: "hsla(0,0%,0%,.5)" }} />',
      ].join("\n")
    ),
    4
  );
  assert.equal(
    scanRgbHsl(
      'const s = "color-mix(in srgb, var(--color-primary) 22%, transparent)"; // rgba(0,0,0,0)'
    ),
    0
  );
});

test("style scan: catches hex, rgb()/hsl() and named colours in style objects only", () => {
  const caught = scanStyleLiterals(
    [
      '<span style={{ backgroundColor: "#10B981", color: "#fff" }} />',
      '<span style={{ boxShadow: "0 0 4px rgba(229, 77, 94, 0.4)", borderColor: cond ? "#666" : x }} />',
      '<span style={{ color: "white", fill: "red" }} />',
    ].join("\n")
  );
  assert.equal(caught, 6);
  assert.equal(
    scanStyleLiterals(
      [
        '<span style={{ backgroundColor: "var(--ci-chart-3-subtle)", color: pc.text }} />',
        "<span style={{ width: `${progress}%`, opacity: 1 }} />",
        "<span style={brandTintVars(provider.color)} />",
        'const PROVIDERS = [{ id: "openai", color: "#10A37F" }]; // data, not a style object',
        'type T = { color: "purple" | "blue" };',
      ].join("\n")
    ),
    0
  );
});

test("constants hex scan: catches quoted hex colours, not issue refs in prose", () => {
  assert.equal(
    scanQuotedHex('export const X = { bg: "#D97706", text: "#fff", a: \'#06B6D4\' };'),
    3
  );
  assert.equal(scanQuotedHex('description: "Off by default (#3332), see #9611 and #12341.",'), 0);
});

test("palette-hue scan: catches Tailwind hue classes", () => {
  assert.equal(scanPaletteHue('const C = "bg-emerald-500 text-gray-400 ring-indigo-300";'), 3);
  assert.equal(scanPaletteHue('const C = "bg-success-bg text-text-muted";'), 0);
});

test("stale kit-exception scan: each shipped component is caught when claimed missing", () => {
  const cases: Array<[string, string]> = [
    [
      "Native file picker: the kit has no file input; tokens style its button.",
      "FileInput / FileDropZone",
    ],
    [
      "Hidden native file picker, hidden behind the drop zone (the adapters have no file input).",
      "FileInput / FileDropZone",
    ],
    ["a multi-line template tile (icon, title); the kit Button is a single-line pill.", "Tile"],
    ["Full-width disclosure header: the kit Button is a fixed-height pill.", "Disclosure"],
    ["filter chip with aria-pressed; the kit has no toggle chip.", "ToggleChip"],
    ["token details on hover; the kit has no hover card.", "HoverCard"],
    ["custom date range picker: no kit calendar.", "DateRangePicker"],
    [
      "coloured progress bar segments: the kit has no tones for this.",
      "Progress (tones, segments)",
    ],
    ["category legend dot; the kit lacks a legend marker.", "LegendMarker"],
  ];
  for (const [reason, component] of cases) {
    assert.deepEqual(staleKitClaims(reason), [component], reason);
  }
});

test("stale kit-exception scan: lets through reasons that name the kit component or claim nothing", () => {
  for (const reason of [
    "Hidden native file input, opened by the Button below (no visible raw control).",
    "Full-width disclosure header: stays a native <button> on kit tokens.",
    "the pin overlays the kit SidebarMenuButton; the kit has no SidebarMenuAction slot.",
    "a stage tile: the kit Tile has no status line slot, so it stays a native <button>.",
    "12px heatmap cell: far below the kit Button's minimum size.",
  ]) {
    assert.deepEqual(staleKitClaims(reason), [], reason);
  }
});

test("kit-exception reasons are read across comment continuation lines", () => {
  const src = [
    "  {/* kit-exception: a two-line mode tile (icon, title, description); the kit",
    "      Button is a single-line pill. */}",
    "  <button>",
    "  // kit-exception: Multi-line KPI tile that filters the feed: the kit Button is a",
    "  // single-line pill, so this stays a native <button>.",
    "  <button>",
  ].join("\n");
  const reasons = kitExceptionReasons(src);
  assert.equal(reasons.length, 2);
  assert.match(reasons[0].reason, /single-line pill\.$/);
  assert.match(reasons[1].reason, /stays a native <button>\.$/);
  assert.deepEqual(staleKitClaims(reasons[0].reason), ["Tile"]);
});
