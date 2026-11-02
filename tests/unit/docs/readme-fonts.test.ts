import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import subsetFont from "subset-font";
import {
  buildFontFaceCss,
  CODE_FAMILY,
  fontStack,
  latinCoverage,
  KIT_FACES,
} from "../../../scripts/docs/readme-fonts.mjs";

// The README diagrams embed exactly one font: the OFL IBM Plex Mono subset for what stays code
// (GitHub's camo proxy blocks every external fetch). Switzer is drawn as outlines and has no business
// in this module: its licence forbids subsetting. These tests pin the contract the outlining step
// relies on.

const require = createRequire(import.meta.url);

test("buildFontFaceCss embeds one subset woff2 data URI for the code role", async () => {
  const { css, bytes } = await buildFontFaceCss({ mono: "$ npm i -g omniroute" });
  assert.equal((css.match(/@font-face/g) || []).length, 1);
  assert.match(
    css,
    /font-family:"CI Mono";font-style:normal;font-weight:500;src:url\(data:font\/woff2;base64,[A-Za-z0-9+/=]+\) format\("woff2"\)/
  );
  assert.ok(bytes.mono > 500 && bytes.mono < 20_000, `mono subset ${bytes.mono} bytes`);
  assert.doesNotMatch(css, /https?:\/\//);
});

test("a larger glyph set produces a larger subset (the subset really follows the text)", async () => {
  const small = await buildFontFaceCss({ mono: "ab" });
  const large = await buildFontFaceCss({ mono: "abcdefghijklmnopqrstuvwxyz0123456789 —·" });
  assert.ok(large.bytes.mono > small.bytes.mono, `${large.bytes.mono} > ${small.bytes.mono}`);
});

test("an empty or absent role embeds nothing", async () => {
  assert.equal((await buildFontFaceCss({})).css, "");
  assert.equal((await buildFontFaceCss({ mono: "" })).css, "");
});

test("the code face is the only face, and no role can reach another family", async () => {
  assert.deepEqual(Object.keys(KIT_FACES), ["mono"]);
  assert.equal(KIT_FACES.mono.pkg, "ibm-plex-mono");
  assert.equal(CODE_FAMILY, "CI Mono");
  for (const role of ["display", "ui", "uiBold", "switzer"]) {
    await assert.rejects(buildFontFaceCss({ [role]: "x" }), /unknown font role/);
    assert.throws(() => fontStack(role), /unknown font role/);
  }
});

test("fontStack returns a Linux-safe stack that ends in a generic family", () => {
  assert.equal(
    fontStack("mono"),
    'font-family: "CI Mono", "IBM Plex Mono", Consolas, "Liberation Mono", monospace'
  );
  assert.throws(() => fontStack("comic"), /unknown font role/);
});

// --- glyph coverage: the fontsource file is Google's *latin* subset ------------------------------

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

test("the module reads the latin range of the package it embeds", () => {
  const latin = require("@fontsource/ibm-plex-mono/unicode.json").latin as string;
  assert.match(latin, /^U\+0000-00FF,/);
  assert.ok(latin.includes("U+2000-206F"));
});

test("a code character outside the subset fails loudly: no system font ever draws it", async () => {
  await assert.rejects(
    buildFontFaceCss({ mono: "●" }),
    /glyphs not in the embedded CI Mono subset: U\+25CF/
  );
  await assert.rejects(buildFontFaceCss({ mono: "ok → ★" }), /U\+2192, U\+2605/);
});

test("empirical: the Plex Mono latin file has no arrow glyph (why code text cannot carry one)", async () => {
  const pkgDir = dirname(require.resolve("@fontsource/ibm-plex-mono/package.json"));
  const file = readFileSync(join(pkgDir, "files", "ibm-plex-mono-latin-500-normal.woff2"));
  const arrow = await subsetFont(file, "→", { targetFormat: "woff2" });
  const empty = await subsetFont(file, "", { targetFormat: "woff2" });
  const letter = await subsetFont(file, "a", { targetFormat: "woff2" });
  assert.equal(arrow.length, empty.length, "→ adds no glyph data");
  assert.ok(letter.length > empty.length, "a real glyph does");
});
