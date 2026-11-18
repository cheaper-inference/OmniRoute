import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Adoption of the new CI UI Kit APIs in slice A4 (2026-11-18): the api-manager, combos, models,
// endpoint, resilience, cache, chaos and radar screens. One block per mapping of the adoption
// plan (A to G). Each block greps those folders for the hand-made version the kit now covers.
// Every kept exception is listed with its reason; a new offender, or an exception that stopped
// matching, fails.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const DASHBOARD = "src/app/(dashboard)/dashboard";
const AREAS = [
  "api-manager",
  "combos",
  "models",
  "endpoint",
  "resilience",
  "cache",
  "chaos",
  "radar",
];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!/node_modules|__tests__/.test(entry.name)) walk(p, out);
    } else if (/\.tsx$/.test(entry.name) && !/\.(test|spec)\./.test(entry.name)) out.push(p);
  }
  return out;
}

const SOURCES = AREAS.flatMap((area) => walk(path.join(ROOT, DASHBOARD, area)))
  .sort()
  .map((file) => ({
    /** Path relative to the dashboard folder, e.g. `combos/page.tsx`. */
    file: path.relative(path.join(ROOT, DASHBOARD), file).split(path.sep).join("/"),
    source: fs.readFileSync(file, "utf8"),
  }));

interface Tag {
  file: string;
  line: number;
  name: string;
  tag: string;
}

/** Opening tag of every JSX element, up to the `>` that closes it (braces and quotes balanced). */
function openingTags(): Tag[] {
  const out: Tag[] = [];
  const re = /<([A-Za-z][\w.]*)(?=[\s/>])/g;
  for (const { file, source } of SOURCES) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(source))) {
      // `Array<Foo>` and `useState<Foo>(…)` are type arguments, not elements.
      if (/[\w)\]]$/.test(source.slice(Math.max(0, m.index - 1), m.index))) continue;
      let depth = 0;
      let quote: string | null = null;
      let i = m.index + 1;
      for (; i < source.length; i++) {
        const c = source[i];
        if (quote) {
          if (c === quote) quote = null;
          continue;
        }
        if (c === '"' || c === "'" || c === "`") quote = c;
        else if (c === "{") depth++;
        else if (c === "}") depth--;
        else if (c === ">" && depth === 0) break;
      }
      out.push({
        file,
        line: source.slice(0, m.index).split("\n").length,
        name: m[1],
        tag: source.slice(m.index, i),
      });
    }
  }
  return out;
}

const TAGS = openingTags();

interface Kept {
  file: string;
  /** Text of the opening tag that identifies the element. */
  marker: string;
  reason: string;
}

/** Offenders that are not a listed exception, and the exceptions nothing used. */
function audit(tags: Tag[], isOffender: (tag: Tag) => boolean, kept: Kept[]) {
  const offenders: string[] = [];
  const used = new Set<number>();
  for (const t of tags) {
    if (!isOffender(t)) continue;
    const idx = kept.findIndex((e) => t.file === e.file && t.tag.includes(e.marker));
    if (idx >= 0) used.add(idx);
    else offenders.push(`${t.file}:${t.line}`);
  }
  const stale = kept.filter((_, i) => !used.has(i)).map((e) => `${e.file} (${e.marker})`);
  return { offenders, stale };
}

const has = (tag: string, re: RegExp) => re.test(tag);
const exists = (file: string) => fs.existsSync(path.join(ROOT, DASHBOARD, file));

test("the slice has files to check", () => {
  assert.ok(SOURCES.length > 120, `only ${SOURCES.length} .tsx files found`);
  assert.ok(TAGS.filter((t) => t.name === "Button").length > 200);
});

// ── A. Pills, chart tones, filter chips ─────────────────────────────────────────────────────

// A pill drawn by hand: a tinted or bordered background, a radius, chip padding and small text
// on a span. The adapter `Badge size="sm"` is that shape. Monospace chips (ids, model names) are
// code and belong to mapping G (`InlineCode`); tinted boxes on a div or a p are notices (G too).
const PILL_RADIUS = /(?<![\w:-])rounded(-(sm|md|lg|full))?(?![\w-])/;
const PILL_PAD =
  /(?<![\w:-])px-(1|1\.5|2|2\.5)(?![\w.-])[^"`]*(?<![\w:-])py-(0\.5|1)(?![\w.-])|(?<![\w:-])py-(0\.5|1)(?![\w.-])[^"`]*(?<![\w:-])px-(1|1\.5|2|2\.5)(?![\w.-])/;
const PILL_TEXT = /(?<![\w:-])text-(xs|2xs|3xs|\[(?:8|9|10|11)px\])(?![\w-])/;
const PILL_FILL =
  /(?<![\w:-])(bg-(info|success|warning|error|primary|chart-\d|surface-2|surface|bg-subtle)(\/\d+|-subtle)?|border)(?![\w-])/;

const isHandPill = ({ name, tag }: Tag) =>
  name === "span" &&
  !has(tag, /(?<![\w:-])font-mono(?![\w-])/) &&
  has(tag, PILL_RADIUS) &&
  has(tag, PILL_PAD) &&
  has(tag, PILL_TEXT) &&
  has(tag, PILL_FILL);

const PILL_KEPT: Kept[] = [
  ...["border-primary/35", "px-1.5 py-0.5 bg-surface text-text-main", "key={family.id}"].map(
    (marker) => ({
      file: "api-manager/[id]/access/tabs/ModelsTab.tsx",
      marker,
      reason:
        "Selection chip of the model picker with a 16px x that turns red on hover. The owner " +
        "kept that x (#19620, HOVER_ONLY_KEPT in destructive-ghost-row-actions-19620.test.ts); " +
        "the kit ScopeChip would replace it, and is 28-36px tall where these lists hold dozens.",
    })
  ),
];

test("A: status and count pills are the Badge adapter, not hand-made spans", () => {
  const { offenders, stale } = audit(TAGS, isHandPill, PILL_KEPT);
  assert.deepEqual(offenders, [], 'use <Badge size="sm" variant|tone=…>');
  assert.deepEqual(stale, [], "stale PILL_KEPT entries: remove them");
});

// A chip that paints a chart colour by hand (`bg-chart-3/10 … text-chart-3-ink`). The Badge
// takes it as `tone="chart-N"`.
const CHART_KEPT: Kept[] = [
  {
    file: "api-manager/ApiManagerPageClient.tsx",
    marker: "hover:bg-chart-3/20",
    reason:
      "Restriction chip that is a link to the access editor. The Badge adapter does not " +
      "forward `asChild`, so a link cannot take the badge skin yet.",
  },
  {
    file: "api-manager/ApiManagerPageClient.tsx",
    marker: "hover:bg-chart-4/20",
    reason: "Same link chip, combos restriction.",
  },
];

test('A: chart-coloured chips use tone="chart-N"', () => {
  const { offenders, stale } = audit(
    TAGS,
    ({ tag }) =>
      has(tag, /bg-chart-\d(\/\d+|-subtle)/) && has(tag, /text-chart-\d/) && has(tag, PILL_PAD),
    CHART_KEPT
  );
  assert.deepEqual(offenders, [], 'use <Badge tone="chart-N">');
  assert.deepEqual(stale, [], "stale CHART_KEPT entries: remove them");
});

test("A: the API key filters are kit ToggleChips with a tone", () => {
  assert.equal(
    exists("api-manager/components/ApiKeyFilterChip.tsx"),
    false,
    "the local filter chip is replaced by the kit ToggleChip"
  );
  const bar = SOURCES.find((s) => s.file === "api-manager/components/ApiKeyFilterBar.tsx");
  assert.ok(bar);
  assert.match(bar.source, /from "@omniroute\/ui-kit\/toggle-chip"/);
  assert.match(bar.source, /<ToggleChip[^>]*\btone=/);
});

// Not converted on purpose: the removable value chips of the key policy editor and of the access
// model picker (a span with a 16px ghost x that turns red on hover). The owner kept that x as it
// is (#19620, `tests/unit/destructive-ghost-row-actions-19620.test.ts` → HOVER_ONLY_KEPT), and the
// kit ScopeChip would replace it with its own remove button.
