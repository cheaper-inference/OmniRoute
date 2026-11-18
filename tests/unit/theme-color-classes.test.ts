// Colour classes must name a colour the theme defines.
//
// Tailwind 4 only emits `bg-X` / `text-X` / `border-X`… when the theme has `--color-X` (or
// `--text-color-X` for `text-`). A name outside the theme generates no CSS and nothing warns:
// the progress track has no background, the "muted" text keeps the inherited colour, the error
// is not red. The UI review of 2026-11-15 found 58 such classes of 13 names (`text-text`,
// `bg-bg-muted`, `text-danger`, `bg-background`…), the same defect KEA-7886 P4 had fixed once
// for `bg-bg-alt` (tests/unit/design-kit-bridge.test.ts).
//
// The guard reads every string literal of the app tree, keeps the tokens shaped like a colour
// utility and fails when the colour name is not one of:
//   - the `--color-*` / `--text-color-*` entries of the `@theme inline` block of globals.css;
//   - the default Tailwind palette (globals.css imports "tailwindcss" with its default theme);
//   - `fd-*` (Fumadocs presets) and the CSS keywords.
// There is no exception list: a new hit is either a typo of a bridge name (fix the class) or a
// colour the theme lacks (add the `--color-*` entry to `@theme inline`).

import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

import {
  ROOT,
  lineOf,
  literalTokens,
  parse,
  read,
  rel,
  sourceFiles,
  utilityOf,
} from "../helpers/classScan.ts";

const globalsCss = read(path.join(ROOT, "src/app/globals.css"));

function themeBlock(): string {
  const start = globalsCss.indexOf("@theme inline {");
  assert.notEqual(start, -1, "globals.css has an `@theme inline` block");
  return globalsCss.slice(start, globalsCss.indexOf("\n}", start));
}

const THEME = themeBlock();
const THEME_COLORS = new Set([...THEME.matchAll(/--color-([a-z0-9-]+):/g)].map((m) => m[1]));
// `text-*` resolves `--text-color-*` before `--color-*`.
const THEME_TEXT_COLORS = new Set(
  [...THEME.matchAll(/--text-color-([a-z0-9-]+):/g)].map((m) => m[1])
);

const TAILWIND_PALETTE =
  /^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|[1-9]00|950)$/;
const KEYWORDS = new Set(["transparent", "current", "inherit", "white", "black"]);

type Prefix =
  | "bg"
  | "text"
  | "border"
  | "ring"
  | "divide"
  | "outline"
  | "fill"
  | "stroke"
  | "from"
  | "via"
  | "to";

// What follows the prefix when the utility is NOT a colour (size, alignment, style, position…).
const NOT_A_COLOR: Record<Prefix, RegExp> = {
  bg: /^(none|fixed|local|scroll|auto|cover|contain|center|top|bottom|left|right|(top|bottom)-(left|right)|(left|right)-(top|bottom)|repeat(-x|-y|-round|-space)?|no-repeat|clip-.+|origin-.+|blend-.+|gradient-to-.+|linear(-.+)?|radial(-.+)?|conic(-.+)?|size-.+|position-.+|opacity-\d+)$/,
  text: /^(xs|sm|base|lg|xl|[2-9]xl|left|center|right|justify|start|end|wrap|nowrap|balance|pretty|ellipsis|clip|opacity-\d+|shadow(-.+)?)$/,
  border:
    /^(\d+|solid|dashed|dotted|double|hidden|none|collapse|separate|spacing(-.+)?|opacity-\d+)$/,
  ring: /^(\d+|inset|opacity-\d+)$/,
  divide: /^(\d+|[xy](-(\d+|reverse))?|solid|dashed|dotted|double|none|opacity-\d+)$/,
  outline: /^(\d+|none|hidden|solid|dashed|dotted|double|offset-.+)$/,
  fill: /^none$/,
  stroke: /^(\d+|none)$/,
  from: /^\d+%$/,
  via: /^(\d+%|none)$/,
  to: /^\d+%$/,
};

const COLOR_UTILITY = /^(bg|text|border|ring|divide|outline|fill|stroke|from|via|to)-(.+)$/;
const isArbitrary = (value: string) => value.startsWith("[") || value.startsWith("(");

// Identifiers that only look like a colour utility. They are product vocabulary, not classes.
const NOT_A_CLASS: RegExp[] = [
  /^fill-first$/, // routing strategy id (src/shared/constants/routingStrategies.ts)
  /^text-to-[a-z]+$/, // modality ids: text-to-speech, text-to-image, text-to-video
  /^text-embed/, // embedding model ids and their prefix: text-embedding-3-small
];

/** The dead class (`bg-bg-muted`) when `token` is a colour utility with an unknown name. */
function unknownColorClass(token: string): string | null {
  const utility = utilityOf(token);
  const match = COLOR_UTILITY.exec(utility);
  if (!match || NOT_A_CLASS.some((re) => re.test(utility))) return null;
  const prefix = match[1] as Prefix;
  let value = match[2];
  if (isArbitrary(value)) return null;
  value = value.replace(/\/[^/]*$/, ""); // opacity (`/50`) or line-height (`text-sm/6`) modifier
  if (NOT_A_COLOR[prefix].test(value)) return null;
  if (prefix === "border") {
    // Side colours: border-t-primary, border-x-transparent. `border-t` / `border-t-2` are widths.
    const side = /^(?:x|y|t|r|b|l|s|e)(?:-(.+))?$/.exec(value);
    if (side) {
      if (!side[1]) return null;
      value = side[1];
    }
  } else if (prefix === "ring" && value.startsWith("offset-")) {
    value = value.slice("offset-".length); // ring-offset-2 (width) or ring-offset-surface (colour)
  }
  if (isArbitrary(value) || /^\d+$/.test(value)) return null;
  if (!/^[a-z][a-z0-9-]*$/.test(value)) return null; // not shaped like a class name
  if (KEYWORDS.has(value) || TAILWIND_PALETTE.test(value) || value.startsWith("fd-")) return null;
  if (THEME_COLORS.has(value)) return null;
  if (prefix === "text" && THEME_TEXT_COLORS.has(value)) return null;
  return `${prefix}-${value}`;
}

test("the theme and the default palette this guard relies on are in place", () => {
  assert.match(globalsCss, /^@import "tailwindcss"/m, "default Tailwind theme (palette) is loaded");
  for (const name of ["text-main", "text-muted", "bg-subtle", "surface", "muted", "error"]) {
    assert.ok(THEME_COLORS.has(name), `@theme inline exposes --color-${name}`);
  }
  assert.ok(THEME_TEXT_COLORS.has("primary"), "@theme inline exposes --text-color-primary");
});

test("the classifier tells colour names from sizes, widths and arbitrary values", () => {
  const dead: Array<[string, string]> = [
    ["text-text", "text-text"],
    ["bg-bg-muted/30", "bg-bg-muted"],
    ["hover:bg-bg-card", "bg-bg-card"],
    ["text-danger", "text-danger"],
    ["text-muted-foreground", "text-muted-foreground"],
    ["dark:!bg-background/60", "bg-background"],
    ["border-l-danger", "border-danger"],
    ["ring-offset-background", "ring-background"],
    ["from-bg-main", "from-bg-main"],
  ];
  for (const [token, expected] of dead) assert.equal(unknownColorClass(token), expected, token);

  const fine = [
    "text-text-main",
    "text-primary", // --text-color-primary
    "bg-muted/50",
    "bg-surface-2",
    "text-chart-3-ink",
    "bg-red-500/10",
    "text-fd-muted-foreground",
    "border-transparent",
    "fill-current",
    "text-xs",
    "text-sm/6",
    "text-left",
    "text-[10px]",
    "text-(--ci-color-heading)",
    "border",
    "border-2",
    "border-t",
    "border-t-2",
    "border-t-transparent",
    "border-l-primary/40",
    "border-dashed",
    "border-collapse",
    "bg-clip-text",
    "bg-gradient-to-r",
    "bg-[url(/a/b.png)]",
    "ring-2",
    "ring-inset",
    "ring-offset-2",
    "ring-offset-surface",
    "divide-y",
    "divide-border",
    "outline-none",
    "outline-offset-2",
    "stroke-2",
    "from-10%",
    "to-transparent",
    "fill-first",
    "text-to-speech",
    "text-embedding-3-small",
    "flex",
    "context-optimized",
  ];
  for (const token of fine) assert.equal(unknownColorClass(token), null, token);
});

// Cheap pre-filter on the raw text, so only a file that may hold a hit pays for an AST parse.
const CANDIDATE =
  /(?<![\w-])(?:bg|text|border|ring|divide|outline|fill|stroke|from|via|to)-[a-z][a-z0-9-]*/g;

test("no colour class in src/app or src/shared uses a name the theme does not define", () => {
  const hits: string[] = [];
  for (const file of sourceFiles("src/app", "src/shared")) {
    // Route handlers render no markup; their strings are model ids, headers and payload keys.
    if (rel(file).startsWith("src/app/api/")) continue;
    const text = read(file);
    if (!(text.match(CANDIDATE) ?? []).some((token) => unknownColorClass(token))) continue;
    const sf = parse(file, text);
    for (const { token, node } of literalTokens(sf)) {
      const dead = unknownColorClass(token);
      if (dead) hits.push(`${rel(file)}:${lineOf(sf, node)} ${dead}`);
    }
  }
  assert.deepEqual(
    hits,
    [],
    "these classes generate no CSS: use a colour of `@theme inline` in src/app/globals.css"
  );
});
