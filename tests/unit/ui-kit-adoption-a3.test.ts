import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Adoption of the new CI UI Kit APIs in the tools and CLI areas of the dashboard (slice a3,
// 2026-11-18). Each test keeps one hand-made pattern from coming back where the kit now has a
// prop for it. The scan is static and covers only the directories below; every kept exception
// is listed with its reason.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const DASHBOARD = "src/app/(dashboard)/dashboard";
const AREAS = [
  "tools",
  "cli-code",
  "cli-agents",
  "agent-skills",
  "omni-skills",
  "conductor",
  "runtime",
  "discovery",
];

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!/node_modules|__tests__/.test(entry.name)) walk(p, out);
    } else if (/\.tsx$/.test(entry.name) && !/\.(test|spec)\./.test(entry.name)) out.push(p);
  }
  return out;
}

const rel = (p: string) => path.relative(ROOT, p).split(path.sep).join("/");

const FILES = AREAS.flatMap((area) => walk(path.join(ROOT, DASHBOARD, area))).map((file) => ({
  file: rel(file),
  source: fs.readFileSync(file, "utf8"),
}));

type Tag = { file: string; line: number; name: string; tag: string };

/** Opening tags of the named elements, up to the `>` that closes them (JSX braces balanced). */
function openingTags(names: string): Tag[] {
  const out: Tag[] = [];
  for (const { file, source } of FILES) {
    const re = new RegExp(`<(${names})(?=[\\s/>])`, "g");
    let m: RegExpExecArray | null;
    while ((m = re.exec(source))) {
      let depth = 0;
      let quote: string | null = null;
      let i = m.index + m[0].length;
      for (; i < source.length; i++) {
        const c = source[i];
        if (quote) {
          if (c === quote) quote = null;
          continue;
        }
        if (c === '"' || c === "'" || c === "`") quote = c;
        else if (c === "{") depth++;
        else if (c === "}") depth--;
        else if (c === ">" && depth === 0 && source[i - 1] !== "=") break;
      }
      out.push({
        file,
        line: source.slice(0, m.index).split("\n").length,
        name: m[1],
        tag: source.slice(m.index, i + 1),
      });
    }
  }
  return out;
}

type Exception = { file: string; marker: string; reason: string };

const isException = (list: Exception[], tag: Tag) =>
  list.some((e) => tag.file === `${DASHBOARD}/${e.file}` && tag.tag.includes(e.marker));

const where = (tags: Tag[]) => tags.map((t) => `${t.file}:${t.line}`).join("\n");

test("the scan reaches the tools and CLI areas", () => {
  assert.ok(FILES.length >= 100, `only ${FILES.length} files scanned`);
});

// ── B. Buttons: kit dense sizes and muted tone ───────────────────────────────────────────────

const BUTTON_SIZE_EXCEPTIONS: Exception[] = [
  {
    file: "tools/traffic-inspector/components/RequestRow.tsx",
    marker: "onSameContext?.(",
    reason:
      "Context chip laid over the second line of a virtualised row of fixed height " +
      "(useVirtualList measures it): a 24px button would not fit the 16px reserved for it.",
  },
];

/**
 * A fixed height, a square size or a sub-12px text size written by hand on a button. `h-auto`
 * alone is not one: it lets a button with several lines of content (a list entry, a card) grow.
 */
const HAND_SIZED_BUTTON =
  /(?<![\w:-])(?:h-\d+|min-h-\d+|size-\d+)(?![\w-])|text-\[(?:8|9|10|11)px\]/;

test("B: buttons take their height and text size from the kit sizes", () => {
  const offenders = openingTags("Button|GuardedAction").filter(
    (t) => HAND_SIZED_BUTTON.test(t.tag) && !isException(BUTTON_SIZE_EXCEPTIONS, t)
  );
  assert.equal(offenders.length, 0, `use size="2xs" / "icon-2xs":\n${where(offenders)}`);
});

test('B: ghost and outline buttons use tone="muted" for the muted resting ink', () => {
  // Kept on purpose (#19620, tests/unit/destructive-ghost-row-actions-19620.test.ts): the
  // clear/remove buttons that are muted at rest and turn red only on hover.
  const offenders = openingTags("Button|GuardedAction").filter(
    (t) =>
      /variant="(?:ghost|outline)"/.test(t.tag) &&
      /(?<![\w:-])text-text-muted(?![\w-])/.test(t.tag) &&
      !/hover:text-error/.test(t.tag)
  );
  assert.equal(offenders.length, 0, `use tone="muted":\n${where(offenders)}`);
});

// ── D. Fields: kit xs size, code font, NumberInput and FileTrigger ───────────────────────────

test("D: fields take their size and their code font from the kit props", () => {
  const offenders = openingTags("Input|Textarea|Select|NumberInput").filter(
    (t) =>
      /(?<![\w:-])font-mono(?![\w-])/.test(t.tag) ||
      /(?:inputClassName|selectClassName)="[^"]*(?<![\w:-])(?:text-xs|text-\[\d+px\]|h-\d+)(?![\w-])/.test(
        t.tag
      )
  );
  assert.equal(
    offenders.length,
    0,
    `use size="xs" (Select: nativeSize="xs") and mono:\n${where(offenders)}`
  );
});

test("D: numeric fields are the NumberInput adapter", () => {
  const offenders = openingTags("Input|input").filter((t) => /type="number"/.test(t.tag));
  assert.equal(offenders.length, 0, `use NumberInput:\n${where(offenders)}`);
});

test("D: a file picker opened from a button is the kit FileTrigger", () => {
  const offenders = openingTags("Input|input").filter((t) => /type="file"/.test(t.tag));
  assert.equal(offenders.length, 0, `wrap the button in FileTrigger:\n${where(offenders)}`);
});

// ── E. Tables: plain variant, density and cell props ─────────────────────────────────────────

test("E: a table inside a card or pane is the kit plain variant", () => {
  const offenders = openingTags("Table|DataTableShell").filter((t) =>
    /containerClassName=[^>]*(?:rounded-none|border-0)/.test(t.tag)
  );
  assert.equal(offenders.length, 0, `use variant="plain":\n${where(offenders)}`);
});

test("E: a table takes its text size from the kit density", () => {
  const offenders = openingTags("Table").filter((t) =>
    /className="[^"]*(?<![\w:-])(?:text-xs|text-sm|text-\[\d+px\])(?![\w-])/.test(t.tag)
  );
  assert.equal(
    offenders.length,
    0,
    `drop text-sm (the default) or use density="compact":\n${where(offenders)}`
  );
});

test("E: table cells use numeric, action and align instead of alignment and px classes", () => {
  const offenders = openingTags("TableHead|TableCell").filter((t) =>
    /(?<![\w:-])(?:text-right|text-left|tabular-nums|text-\[\d+px\])(?![\w-])/.test(t.tag)
  );
  assert.equal(offenders.length, 0, `use numeric / action / align="end":\n${where(offenders)}`);
});

// ── A. Pills: the Badge adapter at the kit small size ────────────────────────────────────────

/** A status tint or a chart colour used as a background. */
const TINT =
  /(?<![\w:-])bg-(?:success|error|warning|info|primary|surface-2|chart-\d)(?:\/\d+)?(?![\w-])/;
/** The box of a pill: inline padding, a hairline of block padding and a radius. */
const PILL_BOX = [
  /(?<![\w:-])px-(?:1\.5|2|2\.5)(?![\w.-])/,
  /(?<![\w:-])py-(?:px|0\.5|1)(?![\w.-])/,
  /(?<![\w:-])rounded(?:-full|-md|-sm)?(?![\w-])/,
];

const PILL_EXCEPTIONS: Exception[] = [
  {
    file: "conductor/FaroChat.tsx",
    marker: 'm.role === "user"',
    reason: "Chat message bubble: it holds the whole message text, not a status label.",
  },
];

test('A: status pills are the Badge adapter with size="sm"', () => {
  const offenders = openingTags("span|div").filter(
    (t) =>
      TINT.test(t.tag) && PILL_BOX.every((re) => re.test(t.tag)) && !isException(PILL_EXCEPTIONS, t)
  );
  assert.equal(offenders.length, 0, `use <Badge size="sm">:\n${where(offenders)}`);
});

test("A: a Badge takes its text size from the kit", () => {
  const offenders = openingTags("Badge").filter((t) =>
    /(?<![\w:-])text-(?:\[\d+px\]|xs|sm)(?![\w-])/.test(t.tag)
  );
  assert.equal(offenders.length, 0, `drop the text size class:\n${where(offenders)}`);
});

// ── G. Small pieces: Notice, InlineCode, CodePreview, IconChip, PageHeader icon ──────────────

/** A status colour used as the fill of a box: `bg-success/10`, `bg-warning-bg`… */
const STATUS_FILL = /(?<![\w:-])bg-(?:success|error|warning|info)(?:\/\d+|-bg)(?![\w-])/;
const BOX_RADIUS = /(?<![\w:-])rounded(?:-[a-z]+)?(?![\w-])/;
const BOX_PADDING = /(?<![\w:-])p[xy]?-\d/;

const TINTED_BOX_EXCEPTIONS: Exception[] = [
  {
    file: "tools/agent-bridge/components/AgentBridgeMaintenanceCard.tsx",
    marker: 'role="group"',
    reason: "Inline confirm cluster (question plus Yes/No buttons), not a message.",
  },
  {
    file: "tools/agent-bridge/components/AgentCard.tsx",
    marker: 'role="group"',
    reason: "Inline confirm cluster (question plus Yes/No buttons), not a message.",
  },
  {
    file: "tools/traffic-inspector/components/session/SessionRecorderBar.tsx",
    marker: 'data-testid="session-recorder-bar"',
    reason: "Recorder toolbar with its controls; the tint is the recording state (e2e selector).",
  },
  {
    file: "tools/traffic-inspector/components/chat/ToolCallBlock.tsx",
    marker: "bg-warning-bg",
    reason: "Tool-call block of a conversation transcript: content, not a notice.",
  },
  {
    file: "tools/traffic-inspector/components/chat/ToolResultBlock.tsx",
    marker: "bg-success-bg",
    reason: "Tool-result block of a conversation transcript: content, not a notice.",
  },
  {
    file: "tools/traffic-inspector/components/RequestStreamingList.tsx",
    marker: "bg-info-bg",
    reason: "Filter strip glued to the top of the request list (no radius), with its clear button.",
  },
];

test("G: messages and warnings are the Notice adapter, not a tinted box", () => {
  const offenders = openingTags("div|p|span").filter(
    (t) =>
      STATUS_FILL.test(t.tag) &&
      BOX_RADIUS.test(t.tag) &&
      BOX_PADDING.test(t.tag) &&
      !isException(TINTED_BOX_EXCEPTIONS, t)
  );
  assert.equal(offenders.length, 0, `use <Notice variant=…>:\n${where(offenders)}`);
});

test("G: no status tint and border pair is kept in a variable for a hand-made box", () => {
  // The tag scan above cannot see a class that reaches the element through a variable.
  const offenders = FILES.flatMap(({ file, source }) =>
    source
      .split("\n")
      .map((text, i) => ({ file, line: i + 1, text }))
      .filter((l) => /bg-(success|error|warning|info)\/10 border-\1\/\d+/.test(l.text))
  );
  assert.equal(
    offenders.length,
    0,
    `use <Notice variant=…>:\n${offenders.map((o) => `${o.file}:${o.line}`).join("\n")}`
  );
});

const CODE_BOX_EXCEPTIONS: Exception[] = [
  {
    file: "cli-code/components/DefaultToolCard.tsx",
    marker: "flex-1 px-3 py-2",
    reason:
      "Command with a copy button that goes through copyToClipboard (execCommand fallback on " +
      "plain-HTTP origins). The kit CodePreview copies with navigator.clipboard only.",
  },
];

test("G: code chips are InlineCode and one-line commands are the headerless CodePreview", () => {
  const offenders = openingTags("code").filter(
    (t) =>
      /(?<![\w:-])bg-[a-z]/.test(t.tag) &&
      BOX_RADIUS.test(t.tag) &&
      !isException(CODE_BOX_EXCEPTIONS, t)
  );
  assert.equal(offenders.length, 0, `use InlineCode / CodePreview:\n${where(offenders)}`);
});

const ICON_SQUARE_EXCEPTIONS: Exception[] = [
  {
    file: "tools/agent-bridge/components/SetupWizard.tsx",
    marker: "i < stepIndex",
    reason: "Step marker of the wizard: it shows the step number until the step is done.",
  },
];

test("G: an icon in a tinted square is the IconChip adapter", () => {
  const offenders = openingTags("div|span").filter(
    (t) =>
      /(?<![\w:-])bg-[a-z]/.test(t.tag) &&
      BOX_RADIUS.test(t.tag) &&
      /justify-center/.test(t.tag) &&
      /(?<![\w:-])(?:size-\d+|h-\d+ w-\d+|w-\d+ h-\d+)(?![\w-])/.test(t.tag) &&
      !isException(ICON_SQUARE_EXCEPTIONS, t)
  );
  assert.equal(offenders.length, 0, `use <IconChip tone=… size=…>:\n${where(offenders)}`);
});

test("G: a PageHeader takes its icon in the icon prop, not inside the title", () => {
  const offenders = openingTags("PageHeader").filter((t) => /title=\{\s*</.test(t.tag));
  assert.equal(offenders.length, 0, `pass icon={…} and a text title:\n${where(offenders)}`);
});

// ── F. Typography: kit label sizes, eyebrow and heading scale ────────────────────────────────

test("F: no arbitrary pixel text size; labels use text-2xs / text-3xs, running text text-xs", () => {
  const offenders = FILES.flatMap(({ file, source }) =>
    source
      .split("\n")
      .map((text, i) => ({ file, line: i + 1, text }))
      .filter((l) => /(?<![\w-])!?text-\[\d+(?:\.\d+)?px\]/.test(l.text))
  );
  assert.equal(
    offenders.length,
    0,
    `use text-3xs (10px), text-2xs (11px) or text-xs:\n${offenders.map((o) => `${o.file}:${o.line}`).join("\n")}`
  );
});

test("F: an uppercase label is the kit ci-eyebrow", () => {
  // Badge and Button keep their own type; an uppercase badge is a pill, not a label.
  const offenders = openingTags("p|span|div|dt|label").filter(
    (t) => /(?<![\w:-])uppercase(?![\w-])/.test(t.tag) && !/ci-eyebrow/.test(t.tag)
  );
  assert.equal(
    offenders.length,
    0,
    `use className="ci-eyebrow" with data-size / data-weight:\n${where(offenders)}`
  );
});

test("F: a heading takes its size from ci-heading data-size, not from a text utility", () => {
  const offenders = openingTags("h[1-6]").filter((t) =>
    /(?<![\w:-])text-(?:xs|sm|base|lg|xl|[2-9]xl)(?![\w-])/.test(t.tag)
  );
  assert.equal(
    offenders.length,
    0,
    `use className="ci-heading" data-size="…":\n${where(offenders)}`
  );
});

// ── C. Inner panels: Card.Section ────────────────────────────────────────────────────────────

const PANEL_EXCEPTIONS: Exception[] = [
  {
    file: "cli-code/components/CliCompanionPanel.tsx",
    marker: "aria-labelledby={id}",
    reason: "Top-level section of the page, not a panel nested in a card.",
  },
  {
    file: "cli-code/components/CliProfileAutoSyncToggles.tsx",
    marker: "bg-surface/40",
    reason: "Top-level block of the page, not a panel nested in a card.",
  },
];

test("C: a bordered panel inside a card is Card.Section", () => {
  const offenders = openingTags("div|section").filter(
    (t) =>
      /(?<![\w:-])border-border(?:\/\d+)?(?![\w-])/.test(t.tag) &&
      /(?<![\w:-])bg-(?:bg-subtle|surface)(?:\/\d+)?(?![\w-])/.test(t.tag) &&
      BOX_RADIUS.test(t.tag) &&
      /(?<![\w:-])p-[34](?![\w.-])/.test(t.tag) &&
      !isException(PANEL_EXCEPTIONS, t)
  );
  assert.equal(offenders.length, 0, `use <Card.Section>:\n${where(offenders)}`);
});

// ── E (cont.). Paginators: the Pager adapter ─────────────────────────────────────────────────

test("E: a previous/next paginator is the Pager adapter", () => {
  const offenders = openingTags("Button").filter((t) =>
    /onClick=\{[^}]*(?:onPagePrev|onPageNext|setPage\(|setExecPage\()/.test(t.tag)
  );
  assert.equal(offenders.length, 0, `use <Pager variant="summary">:\n${where(offenders)}`);
});
