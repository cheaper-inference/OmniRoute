import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderReadmeHero, HERO_COPY } from "../../../scripts/docs/gen-readme-hero.mjs";
import { buildChecks } from "../../../scripts/check/check-docs-counts-sync.mjs";
import { releaseOnlyUnlessTouched } from "../../../scripts/check/lib/derivedArtifactScope.mjs";

// The committed hero must be exactly what the generator produces, draw the kit type as
// outlines, keep every string as text, keep the counts gate's numbers readable as text and
// declare both palettes. Same staleness contract as tests/unit/gen-budget-card-svg.test.ts.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Release mode (and a change that edits this file) compares it byte for byte; a feature PR
// leaves the drift to the release refresh (scripts/check/lib/derivedArtifactScope.mjs).
const stalenessSkip = releaseOnlyUnlessTouched("docs/diagrams/readme-hero.svg");

test("the committed hero is exactly what the generator produces (regenerate with npm run docs:readme-hero)", async (t) => {
  if (stalenessSkip) return t.skip(stalenessSkip);
  const generated = await renderReadmeHero();
  const committed = readFileSync("docs/diagrams/readme-hero.svg", "utf8");
  assert.equal(
    committed,
    generated,
    "docs/diagrams/readme-hero.svg is stale — regenerate with `npm run docs:readme-hero`"
  );
});

test("the only embedded font is the mono subset for the install command, and nothing is external", async () => {
  const svg = await renderReadmeHero();
  assert.equal((svg.match(/@font-face/g) || []).length, 1);
  assert.ok(svg.includes('font-family:"CI Mono"'));
  const style = svg.slice(svg.indexOf("<style>"), svg.indexOf("</style>"));
  assert.doesNotMatch(style, /Switzer|CI Serif|CI Sans/, "the mono subset is the only face");
  assert.match(svg, /<use href="#g[0-9a-z]+"/, "the Switzer text is drawn as outlines");
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 548" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "hero must stay under the 200 KB studio target");
});

test("every copy string stays in the file as text", async () => {
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
  assert.match(svg, /:root\{[^}]*--bg:#f3f1e9/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#11120f/);
  // after the stylesheet every colour is a var(): no literal hex in the drawing
  assert.doesNotMatch(svg.slice(svg.indexOf("</style>")), /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
