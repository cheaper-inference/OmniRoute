import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Adoption of the new CI UI Kit APIs in the providers area (slice A1, 2026-11-18). One block
// per mapping of the adoption plan: each greps `src/app/(dashboard)/dashboard/providers` for the
// hand-made version the kit now covers. Every kept exception is listed with its reason; anything
// new fails.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const AREA = "src/app/(dashboard)/dashboard/providers";

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!/node_modules|__tests__/.test(entry.name)) walk(p, out);
    } else if (/\.tsx$/.test(entry.name) && !/\.(test|spec)\./.test(entry.name)) out.push(p);
  }
  return out;
}

const rel = (p: string) => path.relative(ROOT, p).split(path.sep).join("/");
const SOURCES = walk(path.join(ROOT, AREA)).map((file) => ({
  file: rel(file),
  source: fs.readFileSync(file, "utf8"),
}));

interface Tag {
  file: string;
  line: number;
  tag: string;
}

/** Opening tag of every `<Name`, up to the `>` / `/>` that closes it (JSX braces balanced). */
function openingTags(name: string): Tag[] {
  const out: Tag[] = [];
  const re = new RegExp(`<${name}\\b`, "g");
  for (const { file, source } of SOURCES) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(source))) {
      let depth = 0;
      let quote: string | null = null;
      let i = m.index + 1;
      for (; i < source.length; i++) {
        const c = source[i];
        if (quote) {
          if (c === quote) quote = null;
          continue;
        }
        if (depth === 0 && (c === '"' || c === "'")) quote = c;
        else if (c === "{") depth++;
        else if (c === "}") depth--;
        else if (c === ">" && depth === 0) break;
      }
      out.push({
        file,
        line: source.slice(0, m.index).split("\n").length,
        tag: source.slice(m.index, i),
      });
    }
  }
  return out;
}

interface Kept {
  file: string;
  marker: string;
  reason: string;
}

/** Offenders that are not a listed exception, and the exceptions nothing used. */
function audit(tags: Tag[], isOffender: (tag: string) => boolean, kept: Kept[]) {
  const offenders: string[] = [];
  const used = new Set<number>();
  for (const { file, line, tag } of tags) {
    if (!isOffender(tag)) continue;
    const idx = kept.findIndex((e) => file === `${AREA}/${e.file}` && tag.includes(e.marker));
    if (idx >= 0) used.add(idx);
    else offenders.push(`${file}:${line}`);
  }
  const stale = kept.filter((_, i) => !used.has(i)).map((e) => `${e.file} (${e.marker})`);
  return { offenders, stale };
}

// ── B. Buttons: kit dense sizes and muted tone ──────────────────────────────────────────────

test("the area has files to check", () => {
  assert.ok(SOURCES.length > 100, `only ${SOURCES.length} .tsx files found under ${AREA}`);
  assert.ok(openingTags("Button").length > 200);
});

// A Button squeezed to 24px or less by hand: `size-6 min-h-6`, `h-6`, `size-5`, or the kit
// minimum height reset (`h-auto min-h-0`) used to draw a 16-20px chip.
const HAND_DENSE = /(?<![\w:!-])(size-[456]|min-h-[456]|h-[456]|min-h-0)(?![\w-])/;
const DENSE_KEPT: Kept[] = [
  {
    file: "[id]/components/ProviderPageHeader.tsx",
    marker: "onOpenTutorial",
    reason:
      "Underlined text link inside the page description line. The Button adapter has no `link` " +
      "variant, and a 24px control would not sit in a line of 14px text.",
  },
];

test('B: dense buttons use size="2xs" / "icon-2xs", not hand-made 24px classes', () => {
  const { offenders, stale } = audit(
    openingTags("Button"),
    (tag) => HAND_DENSE.test(tag),
    DENSE_KEPT
  );
  assert.deepEqual(offenders, [], 'use size="icon-2xs" (24px square) or size="2xs" (24px tall)');
  assert.deepEqual(stale, [], "stale DENSE_KEPT entries: remove them");
});

test("B: the kit dense sizes do not carry a hand-made text size or radius", () => {
  const offenders = openingTags("Button")
    .filter(({ tag }) => /size="(icon-)?2xs"/.test(tag))
    .filter(({ tag }) =>
      /(?<![\w:-])(text-\[1[01]px\]|text-xs|rounded|py-0\.5|py-1)(?![\w-])/.test(tag)
    )
    .map(({ file, line }) => `${file}:${line}`);
  assert.deepEqual(offenders, []);
});

// Muted resting ink on a quiet button is the kit `tone="muted"`; the class also pinned the ink
// on hover, hiding the variant's hover.
const REST_MUTED_INK = /(?<![\w:!-])text-text-muted(?![\w/-])/;

test('B: ghost and outline buttons take muted ink from tone="muted"', () => {
  const offenders = openingTags("Button")
    .filter(({ tag }) => /variant="(ghost|outline|secondary)"/.test(tag))
    .filter(({ tag }) => REST_MUTED_INK.test(tag))
    .map(({ file, line }) => `${file}:${line}`);
  assert.deepEqual(offenders, [], 'use tone="muted" instead of className="text-text-muted"');
});

// ── A. Pills: the Badge adapter ─────────────────────────────────────────────────────────────

/** Opening tags of plain elements that can be dressed as a pill. */
const plainTags = () => ["span", "div", "p", "a", "Link"].flatMap((name) => openingTags(name));

const has = (tag: string, re: RegExp) => re.test(tag);
// A tinted or bordered box with chip padding: `rounded-full`, or a 4px `rounded` chip with
// `px-1`…`px-2` and `py-0`/`py-0.5`.
const isHandPill = (tag: string) =>
  has(tag, /(?<![\w:-])(bg-[\w[]|border\b)/) &&
  ((has(tag, /(?<![\w:-])rounded-full(?![\w-])/) && has(tag, /(?<![\w:-])px-[\d.]+(?![\w-])/)) ||
    (has(tag, /(?<![\w:-])rounded(?![\w-])/) &&
      has(tag, /(?<![\w:-])px-(1|1\.5|2)(?![\w.-])/) &&
      has(tag, /(?<![\w:-])py-(0|0\.5)(?![\w.-])/)));

const PILLS_KEPT: Kept[] = [
  {
    file: "[id]/components/ModelComboBadge.tsx",
    marker: 'href="/dashboard/combos"',
    reason:
      "The pill is a link. The Badge adapter does not expose the kit `asChild`, so a Badge " +
      "cannot be the anchor.",
  },
];

test('A: status and label pills are the Badge adapter (size="sm"), not hand-made spans', () => {
  const { offenders, stale } = audit(plainTags(), isHandPill, PILLS_KEPT);
  assert.deepEqual(offenders, [], 'use <Badge size="sm" variant=… | tone="chart-N">');
  assert.deepEqual(stale, [], "stale PILLS_KEPT entries: remove them");
});

test("A: badges take their size from the kit, not from text or padding classes", () => {
  const offenders = openingTags("Badge")
    .filter(({ tag }) => /(?<![\w:-])(text-\[\d+px\]|px-[\d.]+|py-[\d.]+)(?![\w-])/.test(tag))
    .map(({ file, line }) => `${file}:${line}`);
  assert.deepEqual(offenders, [], 'use size="sm" on the Badge');
});

test('A: a badge in a chart colour uses tone="chart-N"', () => {
  const offenders = openingTags("Badge")
    .filter(({ tag }) => /(bg|text|border)-chart-\d/.test(tag))
    .map(({ file, line }) => `${file}:${line}`);
  assert.deepEqual(offenders, []);
});
