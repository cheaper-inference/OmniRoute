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
