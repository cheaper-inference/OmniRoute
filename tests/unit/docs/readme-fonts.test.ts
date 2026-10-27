import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import subsetFont from "subset-font";
import {
  buildFontFaceCss,
  fontStack,
  latinCoverage,
  KIT_FACES,
  SYMBOL_FALLBACKS,
} from "../../../scripts/docs/readme-fonts.mjs";

// The README diagrams embed the UI kit fonts as subset data: URIs (GitHub's camo proxy blocks
// every external fetch). These tests pin the contract the generators rely on.

const require = createRequire(import.meta.url);

test("buildFontFaceCss embeds one subset woff2 data URI per requested role", async () => {
  const { css, bytes } = await buildFontFaceCss({
    display: "Never stop coding.",
    mono: "376 AI PROVIDERS $0",
  });
  assert.equal((css.match(/@font-face/g) || []).length, 2);
  assert.match(
    css,
    /font-family:"CI Serif";font-style:normal;font-weight:400;src:url\(data:font\/woff2;base64,[A-Za-z0-9+/=]+\) format\("woff2"\)/
  );
  assert.match(css, /font-family:"CI Mono";font-style:normal;font-weight:500/);
  assert.ok(bytes.display > 500 && bytes.display < 20_000, `display subset ${bytes.display} bytes`);
  assert.ok(bytes.mono > 500 && bytes.mono < 20_000, `mono subset ${bytes.mono} bytes`);
  assert.doesNotMatch(css, /https?:\/\//);
});

test("a larger glyph set produces a larger subset (the subset really follows the text)", async () => {
  const small = await buildFontFaceCss({ ui: "ab" });
  const large = await buildFontFaceCss({ ui: "abcdefghijklmnopqrstuvwxyz0123456789 —→·" });
  assert.ok(large.bytes.ui > small.bytes.ui, `${large.bytes.ui} > ${small.bytes.ui}`);
});

test("roles not requested are not embedded", async () => {
  const { css } = await buildFontFaceCss({ ui: "x" });
  assert.equal((css.match(/@font-face/g) || []).length, 1);
  assert.doesNotMatch(css, /CI Serif|CI Mono/);
});

test("fontStack returns a Linux-safe stack that ends in a generic family", () => {
  assert.equal(
    fontStack("ui"),
    'font-family: "CI Sans", Inter, "Segoe UI", Arial, Helvetica, sans-serif'
  );
  assert.equal(
    fontStack("display"),
    'font-family: "CI Serif", "Instrument Serif", Georgia, "Times New Roman", serif'
  );
  assert.equal(
    fontStack("mono"),
    'font-family: "CI Mono", "IBM Plex Mono", Consolas, "Liberation Mono", monospace'
  );
  assert.equal(Object.keys(KIT_FACES).length, 4);
  assert.throws(() => fontStack("comic"), /unknown font role/);
});

// --- glyph coverage (task 6.0b): the fontsource files are Google's *latin* subsets -------------

test("latinCoverage splits the unique characters by the fontsource latin ranges", () => {
  const { covered, uncovered } = latinCoverage("a→·—");
  for (const c of "a·—") assert.ok(covered.includes(c), `${c} covered`);
  assert.ok(!covered.includes("→"));
  assert.deepEqual(uncovered, ["→"]);
  // the ranges themselves: ASCII and Latin-1, general punctuation, up/down arrows, minus
  assert.deepEqual(latinCoverage("A~ÿ…€™↑↓−∕").uncovered, []);
  assert.deepEqual(latinCoverage("Ā").uncovered, ["Ā"]); // U+0100 is latin-ext, not latin
  assert.deepEqual(latinCoverage("").uncovered, []);
});

test("the three kit packages share one latin range (the module reads Inter's)", () => {
  const latin = ["inter", "ibm-plex-mono", "instrument-serif"].map(
    (pkg) => require(`@fontsource/${pkg}/unicode.json`).latin as string
  );
  assert.equal(latin[0], latin[1]);
  assert.equal(latin[0], latin[2]);
  assert.match(latin[0], /^U\+0000-00FF,/);
  assert.ok(latin[0].includes("U+2000-206F"));
});

test("uncovered characters are reported per role and never contribute glyphs", async () => {
  const withArrow = await buildFontFaceCss({ ui: "Every AI tool → 376" });
  const without = await buildFontFaceCss({ ui: "Every AI tool  376" });
  assert.deepEqual(withArrow.uncovered, { ui: ["→"] });
  assert.equal(withArrow.bytes.ui, without.bytes.ui);
  assert.equal(withArrow.css, without.css);
  assert.deepEqual(without.uncovered, {});
  const two = await buildFontFaceCss({ ui: "a", mono: "✓ ○ ●" });
  assert.deepEqual(two.uncovered, { mono: ["✓", "○", "●"] });
});

test("an uncovered character outside SYMBOL_FALLBACKS makes the generator fail loudly", async () => {
  await assert.rejects(
    buildFontFaceCss({ ui: "≈" }),
    /glyphs not in the embedded CI Sans subset and not in SYMBOL_FALLBACKS: U\+2248/
  );
  await assert.rejects(buildFontFaceCss({ mono: "ok ≠ ≈ ★" }), /U\+2248, U\+2605/);
});

test("SYMBOL_FALLBACKS is exactly the eleven symbols the README diagrams draw", () => {
  assert.ok(SYMBOL_FALLBACKS instanceof Set);
  assert.deepEqual([...SYMBOL_FALLBACKS].sort(), [..."→↔○●✓∞▮←ⁿ≠◒"].sort());
  for (const c of SYMBOL_FALLBACKS) {
    assert.deepEqual(latinCoverage(c).uncovered, [c], `${c} is really outside the latin range`);
  }
});

test("empirical: the Inter latin file has no arrow glyph (why the allowlist exists)", async () => {
  const pkgDir = dirname(require.resolve("@fontsource/inter/package.json"));
  const file = readFileSync(join(pkgDir, "files", "inter-latin-400-normal.woff2"));
  const arrow = await subsetFont(file, "→", { targetFormat: "woff2" });
  const empty = await subsetFont(file, "", { targetFormat: "woff2" });
  const letter = await subsetFont(file, "a", { targetFormat: "woff2" });
  assert.equal(arrow.length, empty.length, "→ adds no glyph data");
  assert.ok(letter.length > empty.length, "a real glyph does");
});
