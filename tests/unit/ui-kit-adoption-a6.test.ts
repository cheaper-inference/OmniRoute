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
  // padding of at most 2px (or none), a radius and a text size under 12px.
  const PILL =
    /(?=[^"`]*(?<![\w:-])px-(?:1|1\.5|2)(?![\w.-]))(?=[^"`]*(?<![\w:-])rounded(?:-sm|-md|-full)?(?![\w-]))(?=[^"`]*text-\[(?:8|9|10|11)px\])/;
  const kept: Kept[] = [
    {
      file: "context/settings/CompressionPanel.tsx",
      marker: "hover:border-primary/40",
      reason:
        "A link drawn as a chip (engine id that opens the engine page). The Badge adapter has no asChild, so it stays a styled Link.",
    },
  ];
  assertOnlyKept(
    lines().filter(({ tag }) => PILL.test(tag)),
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
