// Kit adoption guards for the costs, usage, analytics and logs areas of the dashboard.
// Each test pins one mapping of the adoption: the hand-made piece must not come back in these
// directories. An exception names the file, a fragment of the line and why it stays.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const DASHBOARD = path.join(process.cwd(), "src/app/(dashboard)/dashboard");
const AREAS = [
  "costs",
  "usage",
  "analytics",
  "logs",
  "audit",
  "activity",
  "health",
  "batch",
  "log-export",
  "system",
];

type Source = { rel: string; text: string };
type Exception = { file: string; fragment: string; why: string };
type Hit = { rel: string; line: number; text: string };

function walk(dir: string, out: string[]) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
}

function sources(): Source[] {
  const files: string[] = [];
  for (const area of AREAS) walk(path.join(DASHBOARD, area), files);
  return files
    .sort()
    .map((full) => ({ rel: path.relative(DASHBOARD, full), text: fs.readFileSync(full, "utf8") }));
}

function lineOf(text: string, index: number): number {
  return text.slice(0, index).split("\n").length;
}

/** Every match of `pattern` in the area sources, minus the listed exceptions. */
type Keep = (m: RegExpExecArray, text: string) => boolean;

function scan(pattern: RegExp, exceptions: Exception[], keep?: Keep) {
  const hits: Hit[] = [];
  const used = new Set<Exception>();
  for (const { rel, text } of sources()) {
    const re = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : "g");
    for (let m = re.exec(text); m; m = re.exec(text)) {
      if (keep && !keep(m, text)) continue;
      const line = lineOf(text, m.index);
      const lineText = text.split("\n")[line - 1].trim();
      const exception = exceptions.find(
        (e) => e.file === rel && (m[0].includes(e.fragment) || lineText.includes(e.fragment))
      );
      if (exception) used.add(exception);
      else hits.push({ rel, line, text: lineText.slice(0, 160) });
    }
  }
  const stale = exceptions.filter((e) => !used.has(e));
  return { hits, stale };
}

function report(hits: Hit[]): string {
  return hits.map((h) => `  ${h.rel}:${h.line}  ${h.text}`).join("\n");
}

function assertClean(what: string, pattern: RegExp, exceptions: Exception[], keep?: Keep) {
  const { hits, stale } = scan(pattern, exceptions, keep);
  assert.equal(hits.length, 0, `${what}:\n${report(hits)}`);
  assert.deepEqual(
    stale.map((e) => `${e.file}: ${e.fragment}`),
    [],
    `exceptions that no longer match anything (remove them)`
  );
}

// A class string: the body of a "…" or '…' literal on one line, or of a `…` template (which may
// span lines, with its ${…} parts left in).
const CLASS_STRING = /(["'])((?:(?!\1)[^\n\\]|\\.)*)\1|(`)((?:[^`\\]|\\.)*)`/g;
const classesOf = (m: RegExpExecArray) => m[2] ?? m[4] ?? "";
const has = (classes: string, token: RegExp) => token.test(classes);
/** Name of the JSX element whose opening tag holds the match (the last `<Tag` before it). */
function tagAt(text: string, index: number): string {
  const tags = text.slice(Math.max(0, index - 600), index).match(/<[A-Za-z][\w.]*/g);
  return tags ? tags[tags.length - 1].slice(1) : "";
}

/** Opening tag of every `<Name …>` element (JSX braces balanced), with its line. */
function openingTags(text: string, names: string): Array<{ index: number; tag: string }> {
  const out: Array<{ index: number; tag: string }> = [];
  const re = new RegExp(`<(?:${names})\\b`, "g");
  for (let m = re.exec(text); m; m = re.exec(text)) {
    let depth = 0;
    let quote: string | null = null;
    let i = m.index + 1;
    for (; i < text.length; i++) {
      const c = text[i];
      if (quote) {
        if (c === quote) quote = null;
      } else if (depth === 0 && (c === '"' || c === "'")) quote = c;
      else if (c === "{") depth++;
      else if (c === "}") depth--;
      else if (c === ">" && depth === 0) break;
    }
    out.push({ index: m.index, tag: text.slice(m.index, i + 1) });
  }
  return out;
}

/** Opening tags of `names` that match `bad`, minus the listed exceptions. */
function assertNoTag(what: string, names: string, bad: RegExp, exceptions: Exception[]) {
  const hits: Hit[] = [];
  const used = new Set<Exception>();
  for (const { rel, text } of sources()) {
    for (const { index, tag } of openingTags(text, names)) {
      if (!bad.test(tag)) continue;
      const exception = exceptions.find((e) => e.file === rel && tag.includes(e.fragment));
      if (exception) used.add(exception);
      else
        hits.push({ rel, line: lineOf(text, index), text: tag.replace(/\s+/g, " ").slice(0, 200) });
    }
  }
  assert.equal(hits.length, 0, `${what}:\n${report(hits)}`);
  assert.deepEqual(
    exceptions.filter((e) => !used.has(e)).map((e) => `${e.file}: ${e.fragment}`),
    [],
    `exceptions that no longer match anything (remove them)`
  );
}

// ── A. Pills ────────────────────────────────────────────────────────────────

test("A: status pills are the Badge adapter, not a hand-made span", () => {
  const exceptions: Exception[] = [
    {
      file: "usage/components/FreeBudgetCard.tsx",
      fragment: "inline-flex items-center rounded-full border px-2 py-0.5",
      why: "outlined chip whose border is the provider's chart colour; the Badge adapter has no outline variant",
    },
    {
      file: "usage/components/FreeBudgetCard.tsx",
      fragment: "inline-flex items-center rounded-full border border-border px-2 py-0.5",
      why: "same row of provider chips (uncapped and gated lists), kept identical to the coloured ones",
    },
    {
      file: "usage/components/ProviderLimits/HealthAccountTooltip.tsx",
      fragment: "rounded-full px-2 py-px",
      why: "account-state chip coloured by DISPLAY_COLORS (the capsule palette), inside the hover card that moves to the kit SharedHoverCard in its own task",
    },
    {
      file: "usage/components/ProviderLimits/HealthOverviewChrome.tsx",
      fragment: "rounded-full border border-border bg-bg-subtle px-2 py-px",
      why: "legend entry with a DISPLAY_COLORS dot and a count, not a status badge",
    },
  ];
  assertClean('hand-made pills (use <Badge size="sm">)', CLASS_STRING, exceptions, (m, text) => {
    const classes = classesOf(m);
    return (
      has(classes, /(^|\s)rounded(-full|-md|-sm)?(\s|$)/) &&
      has(classes, /(^|\s)px-(1|1\.5|2|2\.5)(\s|$)/) &&
      has(classes, /(^|\s)py-(px|0\.5|1)(\s|$)/) &&
      // a monospace chip is an inline code (its own mapping); a link, a button or a table cell
      // is not a pill
      !has(classes, /(^|\s)font-mono(\s|$)/) &&
      !["a", "code", "Button", "GuardedAction", "TableCell", "TableHead"].includes(
        tagAt(text, m.index)
      )
    );
  });
});

test("A: a Badge takes its colour from variant or tone, not from chart utility classes", () => {
  assertClean(
    'chart colours written by hand on a badge (use tone="chart-N")',
    /<Badge\b[^>]*\b(?:bg|border)-chart-\d/g,
    []
  );
});

test("A: quota and budget filter chips are the kit ToggleChip", () => {
  assertClean(
    "filter chips built on Button with rounded-full (use FilterPills or ToggleChip)",
    CLASS_STRING,
    [],
    (m) => has(classesOf(m), /(^|\s)rounded-full(\s|$)/) && has(classesOf(m), /(^|\s)min-h-7(\s|$)/)
  );
});

// ── B. Buttons ──────────────────────────────────────────────────────────────

test("B: 24px buttons use the kit dense sizes, not size-6 / min-h-6 classes", () => {
  assertNoTag(
    'buttons sized by hand below 28px (use size="icon-2xs" or size="2xs")',
    "Button|GuardedAction",
    /(?<![\w:-])(?:size-[3-6]|min-h-[3-6]|h-[3-6])(?![\w.-])/,
    []
  );
});

test('B: a quiet button is tone="muted", not text-text-muted', () => {
  assertNoTag(
    'muted ink written by hand on a button (use tone="muted")',
    "Button|GuardedAction",
    /(?<![\w:-])text-text-muted(?![\w/-])/,
    []
  );
});

// ── F. Typography ───────────────────────────────────────────────────────────

test("F: text below 12px uses the kit label sizes (text-2xs, text-3xs), not arbitrary pixels", () => {
  assertClean(
    "arbitrary sizes under the 12px floor (labels: text-2xs / text-3xs; running text: text-xs)",
    /(?<![\w-])text-\[(?:[0-9]|1[01])(?:\.\d+)?px\]/g,
    []
  );
});

test("F: uppercase labels are the kit eyebrow", () => {
  const exceptions: Exception[] = [
    {
      file: "costs/quota-share/components/PoolSchedulesCard.tsx",
      fragment: "h-7 min-h-7 w-full justify-start gap-1 px-1 text-3xs uppercase",
      why: "label of a disclosure Button: ci-eyebrow is for p/span/div/dt/label, a button keeps its control type",
    },
    {
      file: "costs/quota-share/components/UsageLogCard.tsx",
      fragment: "h-7 min-h-7 w-full justify-start gap-1 px-1 text-3xs uppercase",
      why: "label of a disclosure Button, same as the schedules card",
    },
  ];
  assertClean(
    'hand-made uppercase labels (use className="ci-eyebrow" with data-size / data-weight)',
    /(?<![\w:-])uppercase(?![\w-])/g,
    exceptions
  );
});

test("F: card and section headings take their size from ci-heading, not a text utility", () => {
  const exceptions: Exception[] = [
    {
      file: "usage/components/ProviderLimits/QuotaHealthOverview.tsx",
      fragment: 'className="text-[15px]"',
      why: "15px is not a step of the kit heading scale (14 or 16); the health overview header keeps its size",
    },
  ];
  assertNoTag(
    'h2–h4 sized by a text-* utility (use className="ci-heading" data-size="…")',
    "h[2-4]",
    /(?<![\w:-])text-(?:xs|sm|base|lg|xl|2xl|\[\d)/,
    exceptions
  );
});

// ── E. Tables ───────────────────────────────────────────────────────────────

test('E: a table without a frame is variant="plain", not container classes', () => {
  assertClean(
    'frame removed by hand (use variant="plain")',
    /containerClassName="[^"]*\b(?:rounded-none|border-0)\b[^"]*"/g,
    []
  );
});

test("E: cell alignment, padding and height come from the kit props and the table density", () => {
  const exceptions: Exception[] = [
    {
      file: "usage/components/ProviderLimits/CursorModelUsageTable.tsx",
      fragment: "px-1 py-0.5",
      why: "six-column usage grid inside the dense quota card: the compact density (32px rows, 12px text) does not fit the card width",
    },
    {
      file: "usage/components/ProviderLimits/CursorModelUsageTable.tsx",
      fragment: "{CELL}",
      why: "same grid: CELL holds the 4px/2px padding",
    },
  ];
  // text-left / text-right, or a padding / height utility, on a head or body cell. An empty-state
  // row (a cell with colSpan) keeps its vertical padding.
  const PATTERN =
    /(?<![\w:-])(?:text-(?:left|right)|p[xytrbl]?-(?:\d|\[)|h-(?:auto|\d))|\{CELL\}|\$\{CELL\}/;
  const hits: Hit[] = [];
  const used = new Set<Exception>();
  for (const { rel, text } of sources()) {
    for (const { index, tag } of openingTags(text, "TableHead|TableCell")) {
      if (!PATTERN.test(tag) || /\bcolSpan=/.test(tag)) continue;
      const exception = exceptions.find((e) => e.file === rel && tag.includes(e.fragment));
      if (exception) used.add(exception);
      else
        hits.push({ rel, line: lineOf(text, index), text: tag.replace(/\s+/g, " ").slice(0, 200) });
    }
  }
  assert.equal(hits.length, 0, `cells styled by hand:\n${report(hits)}`);
  assert.deepEqual(
    exceptions.filter((e) => !used.has(e)).map((e) => `${e.file}: ${e.fragment}`),
    []
  );
});

test("E: an activatable row leaves the pointer and the selected state to the kit", () => {
  assertNoTag(
    "row classes that repeat the kit activatable row",
    "TableRow",
    /\bonActivate=[\s\S]*(?<![\w:-])(?:cursor-pointer|bg-accent\/10|hover:bg-)/,
    []
  );
});

test("E: the audit pagers are the kit pagination, not a pair of Buttons", () => {
  for (const rel of ["audit/A2aAuditTab.tsx", "audit/McpAuditTab.tsx", "audit/ComplianceTab.tsx"]) {
    const text = fs.readFileSync(path.join(DASHBOARD, rel), "utf8");
    assert.doesNotMatch(text, /\{t\("previous"\)\}|\{t\("next"\)\}/, `${rel}: hand-made pager`);
    assert.match(text, /<Pager\b|<PaginationPrevious\b/, `${rel}: kit pager`);
  }
});

// ── C. Panels ───────────────────────────────────────────────────────────────

test("C: a neutral panel inside a card is Card.Section, not a div with border, fill and radius", () => {
  const exceptions: Exception[] = [
    {
      file: "costs/quota-share/components/PoolWizard.tsx",
      fragment: "max-h-48 space-y-1.5 overflow-y-auto rounded border border-border bg-bg px-3 py-2",
      why: "the scrolling checkbox list of a form field (a control box with role=group), not a panel",
    },
    {
      file: "batch/page.tsx",
      fragment: "flex items-center gap-1.5 rounded-lg bg-surface border border-border px-3 py-2",
      why: "the three step chips of the page intro strip: they sit on the page, not inside a card",
    },
    {
      file: "batch/BatchDetailModal.tsx",
      fragment:
        "flex items-center justify-between px-3 py-2 rounded-lg bg-bg-alt border border-border",
      why: "one row of the file list (a row of a list, not a panel)",
    },
    {
      file: "batch/BatchDetailModal.tsx",
      fragment:
        "flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded bg-bg-alt border border-border",
      why: "one row of the metadata list (a row of a list, not a panel)",
    },
    {
      file: "batch/FileDetailModal.tsx",
      fragment:
        "flex items-center gap-3 px-3 py-2 rounded-lg bg-bg-alt border border-border text-xs",
      why: "one row of the batches-using-this-file list (a row of a list, not a panel)",
    },
    {
      file: "analytics/CompressionAnalyticsTab.tsx",
      fragment:
        "text-xs text-text-muted border border-border rounded-lg p-3 flex items-start gap-2",
      why: "an info note with an icon: it is a notice, not a panel",
    },
    {
      file: "analytics/SearchAnalyticsTab.tsx",
      fragment:
        "text-xs text-text-muted border border-border rounded-lg p-3 flex items-start gap-2",
      why: "an info note with an icon: it is a notice, not a panel",
    },
  ];
  const token = (classes: string, re: RegExp) => classes.split(/\s+/).some((t) => re.test(t));
  const hits: Hit[] = [];
  const used = new Set<Exception>();
  for (const { rel, text } of sources()) {
    for (const { index, tag } of openingTags(text, "div")) {
      const classes = /\bclassName="([^"]*)"/.exec(tag)?.[1];
      if (!classes) continue;
      const neutralPanel =
        token(classes, /^border$/) &&
        token(classes, /^border-border(\/\d+)?$/) &&
        token(classes, /^rounded(-(md|lg|xl))?$/) &&
        token(classes, /^p[xy]?-(\[[^\]]+\]|[\d.]+)$/) &&
        // not a frame around a table or list, an overlay, a dashed empty box or a control track
        !token(classes, /^(overflow-hidden|divide-y|fixed|absolute|shadow-sm|shadow-lg)$/) &&
        !token(classes, /^(border-dashed|inline-flex)$/) &&
        // not a hand-made empty or loading state (centered text with large padding)
        !(token(classes, /^text-center$/) && token(classes, /^py?-(5|6|8|10)$/)) &&
        // not a status tile: any fill left besides the neutral surfaces
        !token(classes, /^bg-(?!(bg-subtle|surface-2|surface|bg|bg-alt)(\/\d+)?$)/);
      if (!neutralPanel) continue;
      const exception = exceptions.find((e) => e.file === rel && classes === e.fragment);
      if (exception) used.add(exception);
      else hits.push({ rel, line: lineOf(text, index), text: classes.slice(0, 180) });
    }
  }
  assert.equal(hits.length, 0, `panels made by hand (use <Card.Section>):\n${report(hits)}`);
  assert.deepEqual(
    exceptions.filter((e) => !used.has(e)).map((e) => `${e.file}: ${e.fragment}`),
    []
  );
});

// ── D. Fields ───────────────────────────────────────────────────────────────

test("D: number fields are the NumberInput adapter", () => {
  assertNoTag('<Input type="number"> (use NumberInput)', "Input|input", /\btype="number"/, []);
});

test('D: a 32px field is size="xs", not height and text classes', () => {
  assertClean(
    'fields sized by hand (use size="xs")',
    /inputClassName=(?:"[^"]*"|\{`[^`]*`\})/g,
    [],
    (m) =>
      /(?<![\w:-])(?:h-8|min-h-8|h-7|min-h-7)(?![\w.-])/.test(m[0]) || /\$\{inputCls\}/.test(m[0])
  );
});

test("D: a file is picked through the kit FileInput or FileTrigger, not a hidden input", () => {
  assertNoTag("hidden native file inputs (use FileTrigger)", "input|Input", /\btype="file"/, []);
});

// ── G. Small pieces ─────────────────────────────────────────────────────────

test("G: a bar is the kit Progress, not a track and a fill drawn by hand", () => {
  assertNoTag('hand-made bars (use <Progress size="xs|sm">)', "div|span", /\brole="progressbar"/, [
    {
      file: "costs/teams/TeamBudgetCard.tsx",
      fragment: 'aria-label={t("budgetTitle")}',
      why: "with partial or unpriced usage the bar is drawn but has no aria-valuenow; the kit Progress without a value is the indeterminate sweep",
    },
    {
      file: "usage/components/FreeBudgetCard.tsx",
      fragment: 'data-testid="budget-bar"',
      why: "12px stacked bar whose segments carry a title and a test id each; the kit segments take neither",
    },
    {
      file: "costs/quota-share/components/StackedAllocationBar.tsx",
      fragment: 'aria-label={t("stackedBarTitle")}',
      why: "12px stacked bar whose segments carry a per-key tooltip and name; the kit segments take neither",
    },
  ]);
});

test("G: a tinted icon square is IconChip", () => {
  assertClean("icon squares drawn by hand (use <IconChip tone=…>)", CLASS_STRING, [], (m, text) => {
    const classes = classesOf(m);
    return (
      tagAt(text, m.index) === "div" &&
      has(classes, /(^|\s)(p-[23]|size-[89])(\s|$)/) &&
      has(classes, /(^|\s)rounded-(lg|xl)(\s|$)/) &&
      has(classes, /(^|\s)bg-(primary|info|success|warning|error|chart-\d)\/(10|20)(\s|$)/) &&
      has(classes, /(^|\s)text-(primary|info|success|warning|error|chart-\d)(\s|$)/) &&
      !has(classes, /(^|\s)(border|flex-col|gap-\d)(\s|$)/)
    );
  });
});

test("G: a code chip is the kit InlineCode", () => {
  assertNoTag(
    "<code> styled as a chip (use <InlineCode>)",
    "code",
    /className="[^"]*(?<![\w:-])bg-[^"]*"/,
    []
  );
});

test("G: a PageHeader title is text, with its icon in the icon slot", () => {
  assertNoTag(
    "PageHeader with JSX in the title (use the icon prop)",
    "PageHeader",
    /\btitle=\{\s*</,
    []
  );
});

test("G: an empty box with a dashed border is the EmptyState adapter", () => {
  assertClean('dashed boxes drawn by hand (use <EmptyState border="dashed">)', /border-dashed/g, [
    {
      file: "usage/components/ProviderLimits/QuotaHealthOverview.tsx",
      fragment: "CAPSULE_CLASS",
      why: "the outline of an empty account capsule in the health overview, not an empty state",
    },
    {
      file: "usage/components/ProviderLimits/HealthOverviewChrome.tsx",
      fragment: "CAPSULE_CLASS",
      why: "the same capsule in the legend",
    },
    {
      file: "health/ProviderHealthMatrixCard.tsx",
      fragment: "rounded-lg border border-dashed border-border px-3 py-2 text-xs text-text-muted",
      why: 'the "+N more models" note that closes a list, not an empty state',
    },
  ]);
});

test("G: the compression KPI tiles are the compact kit Stat fed with numbers", () => {
  const text = fs.readFileSync(
    path.join(DASHBOARD, "analytics/CompressionAnalyticsTab.tsx"),
    "utf8"
  );
  assert.doesNotMatch(text, /format="text"/);
  assert.match(text, /<StatRow size="sm"/);
});

// ── Charts and gauges ───────────────────────────────────────────────────────

test("the provider utilization chart is the kit LineChart and the diversity gauge the kit RadialMeter", () => {
  const read = (rel: string) => fs.readFileSync(path.join(DASHBOARD, rel), "utf8");
  const chart = read("analytics/components/ProviderCharts.tsx");
  assert.match(chart, /from "@omniroute\/ui-kit\/reporting-charts"/);
  assert.match(chart, /yDomain=\{\[0, 100\]\}/);
  assert.match(chart, /\bconnectNulls\b/);
  assert.doesNotMatch(chart, /from "recharts"/);
  const gauge = read("analytics/components/DiversityScoreCard.tsx");
  assert.match(gauge, /<RadialMeter\b/);
  assert.doesNotMatch(gauge, /<svg\b/);
});
