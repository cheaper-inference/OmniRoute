import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderReadmeHero, HERO_COPY } from "../../../scripts/docs/gen-readme-hero.mjs";
import { buildChecks } from "../../../scripts/check/check-docs-counts-sync.mjs";

// The committed hero must be exactly what the generator produces, carry the UI kit fonts
// inline, draw every string it subsets, keep the counts gate's numbers readable as text and
// declare both palettes. Same staleness contract as tests/unit/gen-budget-card-svg.test.ts.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

test("the committed hero is exactly what the generator produces (regenerate with npm run docs:readme-hero)", async () => {
  const generated = await renderReadmeHero();
  const committed = readFileSync("docs/diagrams/readme-hero.svg", "utf8");
  assert.equal(
    committed,
    generated,
    "docs/diagrams/readme-hero.svg is stale — regenerate with `npm run docs:readme-hero`"
  );
});

test("the hero embeds the three kit faces and nothing external", async () => {
  const svg = await renderReadmeHero();
  assert.equal((svg.match(/@font-face/g) || []).length, 3);
  for (const fam of ["CI Serif", "CI Sans", "CI Mono"]) {
    assert.ok(svg.includes(`font-family:"${fam}"`), fam);
  }
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 548" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "hero must stay under the 200 KB studio target");
});

test("every drawn string is part of the subset input (no missing glyphs)", async () => {
  const svg = await renderReadmeHero();
  for (const s of Object.values(HERO_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("the counts gate still reads the hero's canonical numbers (live code, same check CI runs)", async () => {
  const svg = await renderReadmeHero();
  const check = buildChecks().find((c) => c.label === "SVG canonical numbers (live code)");
  assert.ok(check, "the counts gate no longer has the SVG canonical-numbers check");
  const res = check.validate(svg);
  assert.equal(res.ok, true, res.detail);
  assert.match(res.detail, /canonical claim\(s\) match the code/);
});

test("light and dark palettes are both declared", async () => {
  const svg = await renderReadmeHero();
  assert.match(svg, /:root\{[^}]*--bg:#fbfbf8/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#040d10/);
  // after the stylesheet every colour is a var(): no literal hex in the drawing
  assert.doesNotMatch(svg.slice(svg.indexOf("</style>")), /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
