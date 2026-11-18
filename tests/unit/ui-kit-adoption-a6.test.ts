import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Adoption of the new CI UI Kit, slice A6: the context, playground, webhooks, translator,
// media-providers, compression, search-tools, memory and orchestration screens. Each test
// keeps one hand-made pattern from coming back to these folders once the kit API replaced
// it. A kept occurrence is listed with its reason; a listed one that no longer exists fails
// too, so the lists cannot go stale.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const DASH = "src/app/(dashboard)/dashboard";
const AREAS = [
  "context",
  "playground",
  "webhooks",
  "translator",
  "media-providers",
  "compression",
  "search-tools",
  "memory",
  "orchestration",
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

/** Path relative to the dashboard folder, e.g. `memory/components/tabs/MemoriesTab.tsx`. */
const rel = (p: string) => path.relative(path.join(ROOT, DASH), p).split(path.sep).join("/");

const SOURCES = AREAS.flatMap((area) => walk(path.join(ROOT, DASH, area))).map((file) => ({
  file: rel(file),
  source: fs.readFileSync(file, "utf8"),
}));

interface Tag {
  file: string;
  line: number;
  tag: string;
}

/** Opening tag of every `<Name`, up to the `>` that closes it (JSX braces and quotes balanced). */
function openingTags(names: string): Tag[] {
  const out: Tag[] = [];
  for (const { file, source } of SOURCES) {
    const re = new RegExp(`<(?:${names})(?=[\\s>/])`, "g");
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
        else if (c === ">" && depth === 0) break;
      }
      out.push({
        file,
        line: source.slice(0, m.index).split("\n").length,
        tag: source.slice(m.index, i + 1),
      });
    }
  }
  return out;
}

interface Kept {
  file: string;
  /** Text that the kept occurrence contains (the tag, or the line). */
  marker: string;
  reason: string;
}

/** Offenders minus the kept list; fails on a new offender and on a stale kept entry. */
function assertOnlyKept(hits: Tag[], kept: Kept[], message: string): void {
  const used = new Set<number>();
  const offenders: string[] = [];
  for (const hit of hits) {
    const idx = kept.findIndex((k) => k.file === hit.file && hit.tag.includes(k.marker));
    if (idx >= 0) used.add(idx);
    else offenders.push(`${hit.file}:${hit.line}`);
  }
  assert.deepEqual(offenders, [], message);
  const stale = kept.filter((_, i) => !used.has(i)).map((k) => `${k.file} (${k.marker})`);
  assert.deepEqual(stale, [], "stale kept entries: remove them");
}

test("the slice scans the nine A6 areas", () => {
  assert.ok(SOURCES.length > 150, `only ${SOURCES.length} files found`);
  for (const area of AREAS)
    assert.ok(
      SOURCES.some((s) => s.file.startsWith(`${area}/`)),
      `no file under ${area}/`
    );
});

// ── Flow nodes ───────────────────────────────────────────────────────────────────────────

test("flow nodes: every canvas node is framed by the kit FlowNode", () => {
  const nodes = SOURCES.filter((s) => /\/nodes\/[A-Z]\w*Node\.tsx$/.test(s.file));
  assert.deepEqual(nodes.map((n) => n.file).sort(), [
    "compression/studio/nodes/EngineNode.tsx",
    "compression/studio/nodes/IoNode.tsx",
    "orchestration/nodes/ActivityNode.tsx",
    "orchestration/nodes/OrchestratorNode.tsx",
    "orchestration/nodes/OverflowNode.tsx",
    "orchestration/nodes/SourceNode.tsx",
    "orchestration/nodes/WorkNode.tsx",
  ]);
  for (const { file, source } of nodes) {
    assert.match(source, /<FlowNode\b/, `${file} renders the kit FlowNode`);
    // The frame is the kit's: no hand-made border + background + radius box, no glow, and no
    // text under the 12px floor (the kit node sets 12px, and 14px for the `md` title).
    assert.doesNotMatch(source, /className="[^"]*\brounded-(?:lg|xl)\b[^"]*\bborder/, file);
    assert.doesNotMatch(source, /boxShadow|borderColor/, `${file} draws no frame colour by hand`);
    assert.doesNotMatch(source, /text-\[\d+px\]/, `${file} sets no text size by hand`);
  }
});

test("flow nodes: labels come from the message catalog, not fixed English", () => {
  const read = (file: string) => SOURCES.find((s) => s.file === file)?.source ?? "";
  const io = read("compression/studio/nodes/IoNode.tsx");
  assert.match(io, /useTranslations\("compressionStudio"\)/);
  assert.doesNotMatch(io, /"Input"|"Output"|>tokens</);
  const engine = read("compression/studio/nodes/EngineNode.tsx");
  assert.match(engine, /useTranslations\("compressionStudio"\)/);
  assert.doesNotMatch(engine, />skip</);
});

const BUTTONS = "Button|GuardedAction";

// ── A: badges, toggle chips and scope chips ──────────────────────────────────────────────

/** Every line of the slice, as a one-line "tag", for the patterns that live in a class string. */
function lines(): Tag[] {
  return SOURCES.flatMap(({ file, source }) =>
    source.split("\n").map((text, i) => ({ file, line: i + 1, tag: text }))
  );
}

test('A: pills are the Badge adapter (size="sm"), not a padded rounded span', () => {
  // A small tinted or bordered box around a word: horizontal padding of at most 8px, vertical
  // padding of at most 2px and a radius, in one class string. A monospace one is a code chip
  // (the kit InlineCode), checked with the small pieces below.
  const has = (tag: string, re: RegExp) => re.test(tag);
  const isPill = (tag: string) =>
    has(tag, /(?<![\w:-])px-(?:1|1\.5|2)(?![\w.-])/) &&
    has(tag, /(?<![\w:-])py-(?:0|0\.5|px)(?![\w.-])/) &&
    has(tag, /(?<![\w:-])rounded(?:-sm|-md|-full)?(?![\w-])/) &&
    !has(tag, /font-mono/);
  const kept: Kept[] = [
    {
      file: "context/settings/CompressionPanel.tsx",
      marker: "hover:border-primary/40",
      reason:
        "A link drawn as a chip (engine id that opens the engine page). The Badge adapter has no asChild, so it stays a styled Link.",
    },
  ];
  assertOnlyKept(
    lines().filter(({ tag }) => isPill(tag)),
    kept,
    'use <Badge size="sm">'
  );
});

test("A: a Badge takes its size and its chart colour from props", () => {
  const hits = openingTags("Badge").filter(({ tag }) =>
    /text-\[(?:8|9|10|11)px\]|(?:bg|text|border)-chart-\d/.test(tag)
  );
  assertOnlyKept(hits, [], 'use size="sm" and tone="chart-N"');
});

test("A: filter chips are the kit ToggleChip and removable chips the kit ScopeChip", () => {
  // A Button that is a pill by class and reports `aria-pressed` is a filter chip.
  const pressedPills = openingTags(BUTTONS).filter(
    ({ tag }) => /aria-pressed/.test(tag) && /rounded-full/.test(tag)
  );
  assertOnlyKept(pressedPills, [], "use <ToggleChip>");
  const toolbar = SOURCES.find((s) => s.file === "orchestration/OrchestrationToolbar.tsx");
  assert.match(toolbar?.source ?? "", /<ToggleChip\b/);
  const form = SOURCES.find((s) => s.file === "search-tools/components/SearchForm.tsx");
  assert.match(form?.source ?? "", /<ScopeChip\b[^>]*tone="success"/);
  assert.match(form?.source ?? "", /<ScopeChip\b[^>]*tone="danger"/);
});

// ── B: dense buttons and the muted tone ──────────────────────────────────────────────────

test("B: 24px buttons use the kit dense sizes, not hand-made height classes", () => {
  // `size="2xs"` / `size="icon-2xs"` are the kit's 24px sizes (12px text). A button shrunk
  // by class (`h-6 min-h-6`, `size-4`, `h-auto min-h-0` + padding) drifts from them.
  const hits = openingTags(BUTTONS).filter(({ tag }) =>
    /(?<![\w-])(?:(?:h|size|min-h)-(?:4|5|6)|min-h-0)(?![\w-])/.test(tag)
  );
  assertOnlyKept(hits, [], 'use size="2xs" or size="icon-2xs"');
});

test("B: a button never sets a text size under the kit's 12px floor", () => {
  const hits = openingTags(BUTTONS).filter(({ tag }) => /text-\[(?:8|9|10|11)px\]/.test(tag));
  assertOnlyKept(hits, [], "drop the size: the kit button sizes set the text");
});

test('B: muted ghost and outline buttons use tone="muted"', () => {
  // `text-text-muted` on a ghost/outline/secondary button also mutes its hover ink;
  // `tone="muted"` mutes the resting ink only and keeps the variant's hover.
  const hits = openingTags(BUTTONS).filter(({ tag }) =>
    /(?<![\w:-])text-text-muted(?![\w/-])/.test(tag)
  );
  const kept: Kept[] = [
    {
      file: "playground/components/CompareColumn.tsx",
      marker: "onRemove(id)",
      reason: "Owner decision #19620: this x keeps the quiet grey with error ink on hover.",
    },
    {
      file: "playground/components/tabs/ApiTab.tsx",
      marker: "setUploadedImages([])",
      reason: "Owner decision #19620: clears the attached images, error ink on hover only.",
    },
    {
      file: "playground/components/tabs/ChatTab.tsx",
      marker: "onClick={handleClear}",
      reason: "Owner decision #19620: toolbar icon that resets the chat, error ink on hover only.",
    },
  ];
  assertOnlyKept(hits, kept, 'use tone="muted" instead of text-text-muted');
});

// ── F: type scale ────────────────────────────────────────────────────────────────────────

test("F: no arbitrary text size under the kit's 12px floor", () => {
  // Labels use the kit's two small label sizes (`text-2xs` 11px, `text-3xs` 10px); running
  // text is `text-xs` (12px) or larger.
  const hits = lines().filter(({ tag }) =>
    /(?<![\w-])text-\[(?:8|9|10|11)(?:\.\d+)?px\]/.test(tag)
  );
  assertOnlyKept(hits, [], "use text-2xs / text-3xs for a label, text-xs for running text");
});

test("F: uppercase labels are the kit eyebrow, not hand-made utilities", () => {
  const hits = lines().filter(({ tag }) => /(?<![\w:-])uppercase(?![\w-])/.test(tag));
  const kept: Kept[] = [
    {
      file: "context/settings/EngineGuidanceDetail.tsx",
      marker: 'className="uppercase tracking-wider"',
      reason: "A Badge whose word is set in caps; the Badge sets the rest of its type.",
    },
    {
      file: "context/settings/EngineGuidanceDetail.tsx",
      marker: 'className="uppercase text-primary"',
      reason: "A Button label set in caps; the Button sets the rest of its type.",
    },
  ];
  assertOnlyKept(hits, kept, 'use className="ci-eyebrow" with data-size / data-weight');
});

test("F: section headings take their size from ci-heading data-size", () => {
  const hits = openingTags("h2|h3|h4").filter(({ tag }) =>
    /(?<![\w:-])text-(?:xs|sm|base|lg|xl|2xl)(?![\w-])/.test(tag)
  );
  const kept: Kept[] = ["text-xl my-2", "text-lg my-1.5", "text-base my-1"].map((marker) => ({
    file: "playground/components/MarkdownMessage.tsx",
    marker,
    reason: "Headings of a rendered chat message (Markdown content), not a section of the screen.",
  }));
  assertOnlyKept(hits, kept, 'use className="ci-heading" data-size="…"');
  for (const { file, line, tag } of openingTags("h2|h3|h4")) {
    if (file === "playground/components/MarkdownMessage.tsx") continue;
    assert.match(tag, /ci-heading|ci-eyebrow/, `${file}:${line} names a kit heading class`);
  }
});

// ── C: nested panels ─────────────────────────────────────────────────────────────────────

test("C: a neutral panel nested in a card is Card.Section, not a hand-made box", () => {
  // A box drawn by hand: a border, a neutral fill and a radius on one element. Nested in a card
  // or a dialog it is `Card.Section` (the kit inset card). What stays is a surface of its own.
  const hits = openingTags("div|section|aside|article|li|form|Field").filter(
    ({ tag }) =>
      /(?<![\w:-])border(?![\w-])|(?<![\w:-])border-border(?![\w-])/.test(tag) &&
      /(?<![\w:-])bg-(?:bg|bg-subtle|bg-alt|surface)(?:\/\d+)?(?![\w-])/.test(tag) &&
      /(?<![\w:-])rounded(?:-(?:sm|md|lg|xl|2xl))?(?![\w-])/.test(tag)
  );
  const TOP_LEVEL = "A surface of the screen itself (it is not nested in a card).";
  const kept: Kept[] = [
    ...(
      [
        ["webhooks/components/HowItWorksSidebar.tsx", "<aside"],
        ["webhooks/components/WebhookCard.tsx", "rounded-xl border border-border bg-surface"],
        ["media-providers/components/LlmChatCard.tsx", '"flex flex-col gap-3"'],
        ["compression/studio/CompressionCockpit.tsx", "px-3 py-2 rounded-lg"],
        ["compression/studio/CompressionCockpit.tsx", "flex-1 min-h-0 overflow-auto"],
        ["compression/studio/CompressionCockpit.tsx", "px-3 py-1.5 rounded-lg"],
        ["search-tools/components/RerankPanel.tsx", "rounded-lg overflow-hidden"],
        ["search-tools/components/ScrapeResult.tsx", "flex flex-wrap justify-between"],
        ["search-tools/components/ScrapeResult.tsx", "p-3 bg-surface border"],
        ["search-tools/components/SearchConceptCard.tsx", 'data-testid="search-concept-card"'],
        ["search-tools/components/tabs/CompareTab.tsx", "rounded-lg p-4 space-y-3"],
        ["search-tools/components/tabs/CompareTab.tsx", 'data-testid="compare-results"'],
        ["search-tools/components/tabs/CompareTab.tsx", "min-w-[280px]"],
        ["search-tools/components/tabs/ScrapeTab.tsx", "rounded-lg p-4 space-y-3"],
        ["orchestration/OrchestrationToolbar.tsx", "flex flex-wrap items-center gap-3"],
      ] as const
    ).map(([file, marker]) => ({ file, marker, reason: TOP_LEVEL })),
    {
      file: "media-providers/[kind]/page.tsx",
      marker: "cursor-pointer",
      reason: "A tile that is a link to the provider kind: an interactive card, not a panel.",
    },
    {
      file: "search-tools/components/ProviderCatalog.tsx",
      marker: "transition-colors",
      reason: "A selectable provider tile (selected and hover states), not a panel.",
    },
    {
      file: "orchestration/tabs/OverviewTab.tsx",
      marker: "data-orch-card",
      reason: "A card that opens the drawer (role=button), not a panel.",
    },
    {
      file: "playground/components/tabs/ChatTab.tsx",
      marker: "rounded-tr-sm",
      reason: "A chat bubble.",
    },
    {
      file: "playground/components/tabs/ChatTab.tsx",
      marker: 'role="status"',
      reason: "The typing bubble of the chat.",
    },
    {
      file: "playground/components/tabs/BuildTab.tsx",
      marker: "max-w-[80%]",
      reason: "A chat bubble.",
    },
    {
      file: "media-providers/components/LlmChatCard.tsx",
      marker: "ref={scrollRef}",
      reason: "The scroll viewport of the chat transcript: it owns its height and has no padding.",
    },
    {
      file: "media-providers/components/PlaygroundCard.tsx",
      marker: "overflow-auto max-h-64",
      reason: "The scroll viewport of the response: it owns its height and has no padding.",
    },
    {
      file: "search-tools/components/ScrapeResult.tsx",
      marker: 'data-testid="markdown-preview"',
      reason: "The reading surface of the scraped page (prose).",
    },
    {
      file: "memory/components/MemoryEngineStatus.tsx",
      marker: "flex items-start gap-3 p-3",
      reason: "A list of status rows (a chip, a title, a reason): rows, not panels.",
    },
    {
      file: "memory/components/QdrantConfigCard.tsx",
      marker: "p-2 rounded bg-bg/40",
      reason: "A list of search hits (an id and a score): rows, not panels.",
    },
    {
      file: "memory/components/tabs/MemoriesTab.tsx",
      marker: "p-3 rounded-lg bg-bg-subtle border border-border/60",
      reason: "The result message of an import (a notice), not a panel.",
    },
  ];
  assertOnlyKept(hits, kept, "use <Card.Section>");
});

// ── D: fields ────────────────────────────────────────────────────────────────────────────

const FIELDS = "Input|Textarea|NumberInput";

test('D: small fields use size="xs", not height and text-size classes', () => {
  // `size="xs"` is the kit's 32px control with 12px text. `h-8` / `text-xs` written on the
  // control drift from it (and from the Select beside it).
  const hits = openingTags("Input|NumberInput").filter(({ tag }) =>
    /inputClassName="[^"]*(?<![\w:-])(?:h-8|min-h-8|text-xs)(?![\w-])/.test(tag)
  );
  assertOnlyKept(hits, [], 'use size="xs"');
});

test("D: code fields use the mono prop, not font-mono", () => {
  // `font-mono` has no effect on an <input> or a <textarea>: the kit typography sheet wins.
  const hits = openingTags(FIELDS).filter(({ tag }) => /(?<![\w:-])font-mono(?![\w-])/.test(tag));
  assertOnlyKept(hits, [], "use the mono prop");
});

test("D: numeric fields are the NumberInput adapter", () => {
  const hits = openingTags("Input").filter(({ tag }) => /type="number"/.test(tag));
  const kept: Kept[] = [
    {
      file: "context/rtk/RtkContextPageClient.tsx",
      marker: "draftRef.current = event.target.value",
      reason:
        "Keeps a text draft that is also saved when the page unmounts and reports the open draft to the page; that contract has tests of its own.",
    },
    {
      file: "context/settings/CompressionPanel.tsx",
      marker: "AUTO_TRIGGER_MIN",
      reason:
        "Leaves a value it rejects in the box instead of clamping it, and Escape drops the edit; the kit field clamps on blur.",
    },
  ];
  assertOnlyKept(hits, kept, "use <NumberInput>");
});

test("D: a file picker opened from a button is the kit FileTrigger", () => {
  const raw = openingTags("input").filter(({ tag }) => /type="file"/.test(tag));
  assertOnlyKept(raw, [], "wrap the button in <FileTrigger>");
  const read = (file: string) => SOURCES.find((s) => s.file === file)?.source ?? "";
  for (const file of [
    "memory/components/tabs/MemoriesTab.tsx",
    "media-providers/components/SttExampleCard.tsx",
  ]) {
    assert.match(read(file), /<FileTrigger\b/, `${file} opens the picker with FileTrigger`);
    assert.doesNotMatch(read(file), /kit-exception:/, `${file} needs no kit-exception`);
  }
});
