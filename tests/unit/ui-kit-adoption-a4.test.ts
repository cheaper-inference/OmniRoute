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
          if (c === "\\") i++;
          else if (c === quote) quote = null;
          continue;
        }
        // Comments between attributes or inside `{…}`: an apostrophe in one is not a string.
        if (c === "/" && source[i + 1] === "/") {
          i = source.indexOf("\n", i);
          if (i < 0) i = source.length;
          continue;
        }
        if (c === "/" && source[i + 1] === "*") {
          i = source.indexOf("*/", i) + 1;
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

// ── B. Buttons: kit dense sizes and muted tone ──────────────────────────────────────────────

const BUTTONS = TAGS.filter((t) => t.name === "Button");

// A Button squeezed to 28px or less by hand: `h-6 w-6`, `!h-6`, `h-7`, or the kit minimum
// height reset (`min-h-0`) used to draw a 16-20px text chip. The kit sizes are `2xs` (24px
// tall) and `icon-2xs` (24px square).
const HAND_DENSE = /(?<![\w:-])!?(size-[4567]|min-h-[04567]|h-[4567])(?![\w.-])/;
const DENSE_KEPT: Kept[] = [
  ...[
    "removeClaudeCodeDefault",
    "blockClaudeCodeFamily(",
    "name: provider",
    "getModelDisplayName(modelId)",
  ].map((marker) => ({
    file: "api-manager/[id]/access/tabs/ModelsTab.tsx",
    marker,
    reason:
      "16px x on a selection chip, kept by the owner as it is (#19620, HOVER_ONLY_KEPT in " +
      "destructive-ghost-row-actions-19620.test.ts).",
  })),
  {
    file: "api-manager/[id]/access/tabs/ModelsTab.tsx",
    marker: "setClaudeCodeFamiliesExpanded(",
    reason: "Expand toggle that is the label of the same selection chip (see above).",
  },
  ...[
    "KeyPolicyBehaviourTab.tsx",
    "KeyPolicyCombosTab.tsx",
    "KeyPolicyConnectionsTab.tsx",
    "KeyPolicyGeneralTab.tsx",
    "KeyPolicyLimitsTab.tsx",
    "KeyPolicyModelsTab.tsx",
  ].map((name) => ({
    file: `api-manager/components/${name}`,
    marker: "removeSelection",
    reason: "16px x on a key-policy chip, kept by the owner as it is (#19620, same list).",
  })),
];

test('B: dense buttons use size="2xs" / "icon-2xs", not hand-made heights', () => {
  const { offenders, stale } = audit(BUTTONS, ({ tag }) => has(tag, HAND_DENSE), DENSE_KEPT);
  assert.deepEqual(offenders, [], 'use size="icon-2xs" (24px square) or size="2xs" (24px tall)');
  assert.deepEqual(stale, [], "stale DENSE_KEPT entries: remove them");
});

test("B: the kit dense sizes do not carry a hand-made text size, padding or radius", () => {
  const offenders = BUTTONS.filter(({ tag }) => /size="(icon-)?2xs"/.test(tag))
    .filter(({ tag }) =>
      has(
        tag,
        /(?<![\w:-])(text-\[\d+px\]|text-(3xs|2xs|xs|sm)|rounded(-\w+)?|p[xy]?-[\d.]+)(?![\w-])/
      )
    )
    .map(({ file, line }) => `${file}:${line}`);
  assert.deepEqual(offenders, []);
});

// Muted resting ink on a quiet button is the kit `tone="muted"`; the class also pinned the ink
// on hover, hiding the variant's hover.
const REST_MUTED_INK = /(?<![\w:!-])text-text-muted(?![\w/-])/;

// A grey x that only turns red on hover stays as the owner left it (#19620: HOVER_ONLY_KEPT in
// destructive-ghost-row-actions-19620.test.ts lists each one).
const HOVER_ERROR_INK = /hover:!?text-error\b/;

test('B: ghost, outline and secondary buttons take muted ink from tone="muted"', () => {
  const offenders = BUTTONS.filter(({ tag }) => /variant="(ghost|outline|secondary)"/.test(tag))
    .filter(({ tag }) => has(tag, REST_MUTED_INK) && !has(tag, HOVER_ERROR_INK))
    .map(({ file, line }) => `${file}:${line}`);
  assert.deepEqual(offenders, [], 'use tone="muted" instead of className="text-text-muted"');
});

// ── F. Typography: kit size tokens, eyebrow labels, heading scale ───────────────────────────

// `text-[11px]` and `text-[10px]` are the kit label tokens `text-2xs` and `text-3xs`; a sentence
// at those sizes is `text-xs`; 8-9px is not an interface size.
test("F: no arbitrary text size under the kit 12px floor", () => {
  const offenders = TAGS.filter(({ tag }) =>
    has(tag, /(?<![\w-])text-\[(?:8|9|10|11)(?:\.\d+)?px\]/)
  ).map(({ file, line }) => `${file}:${line}`);
  assert.deepEqual(offenders, [], "use text-2xs / text-3xs on a label, text-xs on a sentence");
});

// An uppercase label drawn with utilities (size, tracking, weight, muted ink) is the kit
// `ci-eyebrow`, with `data-size` and `data-weight`.
const UPPERCASE = /(?<![\w:-])uppercase(?![\w-])/;
const UPPERCASE_KEPT: Kept[] = [];

test("F: uppercase labels are ci-eyebrow", () => {
  const { offenders, stale } = audit(
    TAGS,
    ({ name, tag }) =>
      /^(p|span|div|dt|dd|h[1-6])$/.test(name) &&
      has(tag, UPPERCASE) &&
      !has(tag, /(?<![\w-])ci-eyebrow(?![\w-])/),
    UPPERCASE_KEPT
  );
  assert.deepEqual(offenders, [], 'use className="ci-eyebrow" with data-size / data-weight');
  assert.deepEqual(stale, [], "stale UPPERCASE_KEPT entries: remove them");
});

test("F: an eyebrow does not repeat what the class already sets", () => {
  const offenders = TAGS.filter(({ tag }) => has(tag, /(?<![\w-])ci-eyebrow(?![\w-])/))
    .filter(({ tag }) =>
      has(
        tag,
        /(?<![\w:-])(uppercase|tracking-[\w.[\]-]+|text-text-muted|font-(medium|semibold|bold))(?![\w-])/
      )
    )
    .map(({ file, line }) => `${file}:${line}`);
  assert.deepEqual(offenders, []);
});

// A title in app markup takes its size from the kit heading scale: `ci-heading` + `data-size`.
test("F: headings take their size from ci-heading data-size, not a size utility", () => {
  const offenders = TAGS.filter(({ name }) => /^h[1-6]$/.test(name))
    .filter(({ tag }) => has(tag, /(?<![\w:-])text-(xs|sm|base|lg|xl|2xl)(?![\w-])/))
    .map(({ file, line }) => `${file}:${line}`);
  assert.deepEqual(offenders, [], 'use className="ci-heading" data-size="xs|sm|md|lg|xl"');
});

// ── E. Tables: kit variant, density, cell props and the Pager adapter ───────────────────────

const TABLE_PARTS = /^(Table|TableHead|TableCell|SortableTableHead)$/;

test('E: a frameless table says variant="plain", not border and radius resets', () => {
  const offenders = TAGS.filter(({ tag }) =>
    has(tag, /(?<![\w:-])(rounded-none|border-0)(?![\w-])/)
  )
    .filter(({ name }) => name === "Table" || name === "DataTableShell")
    .map(({ file, line }) => `${file}:${line}`);
  assert.deepEqual(offenders, [], 'use <Table variant="plain">');
});

// Padding, height and the default text size of a cell come from the table: `density` on the
// Table, or the `--ci-table-cell-*` tokens. A class per cell repeats or fights them.
const CELL_METRICS = /(?<![\w:-])(h-auto|h-\d+|p[xy]-[\d.]+|text-sm|text-left)(?![\w-])/;
const CELL_METRICS_KEPT: Kept[] = [
  {
    file: "models/CatalogTableParts.tsx",
    marker: 'className="border-t border-border px-4 py-3"',
    reason: "DataTableFooter, not a cell: the padding of the footer strip under the table.",
  },
];

test("E: table cells do not set their own padding, height or default text size", () => {
  const { offenders, stale } = audit(
    TAGS.filter(({ name, tag }) => TABLE_PARTS.test(name) || /^<DataTableFooter\b/.test(tag)),
    ({ tag }) => has(tag, CELL_METRICS),
    CELL_METRICS_KEPT
  );
  assert.deepEqual(offenders, [], 'use density="compact|comfortable" on the Table');
  assert.deepEqual(stale, [], "stale CELL_METRICS_KEPT entries: remove them");
});

test("E: right-aligned cells use the kit numeric / align props (logical, mirrored in RTL)", () => {
  const offenders = TAGS.filter(({ name }) => TABLE_PARTS.test(name))
    .filter(({ tag }) => has(tag, /(?<![\w:-])text-(right|end)(?![\w-])/))
    .map(({ file, line }) => `${file}:${line}`);
  assert.deepEqual(offenders, [], 'use numeric (numbers) or align="end" (actions)');
});

// Paging kept in state goes through the Pager adapter (kit PaginationControls, translated).
test("E: previous/next paging is the Pager adapter", () => {
  const handMade = SOURCES.filter(
    (s) =>
      /icon(Right)?="chevron_(left|right)"/.test(s.source) &&
      /(previousPage|nextPage)/.test(s.source)
  ).map((s) => s.file);
  assert.deepEqual(handMade, [], "use <Pager page pageCount onPageChange>");
  for (const file of [
    "cache/components/CacheEntriesTab.tsx",
    "combos/ComboListControls.tsx",
    "models/CatalogTableParts.tsx",
  ]) {
    const source = SOURCES.find((s) => s.file === file)?.source ?? "";
    assert.match(source, /<Pager\b/, `${file} renders the Pager adapter`);
  }
});
