import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderReadmeLtsRail, LTS_RAIL_COPY } from "../../../scripts/docs/gen-readme-lts-rail.mjs";
import { releaseOnlyUnlessTouched } from "../../../scripts/check/lib/derivedArtifactScope.mjs";

// The committed release rail must be exactly what the generator produces, draw the kit type as
// outlines, keep every string as text and declare both palettes with no literal color escaping the
// theme. Same staleness contract as tests/unit/docs/readme-hero-svg.test.ts.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Release mode (and a change that edits this file) compares it byte for byte; a feature PR
// leaves the drift to the release refresh (scripts/check/lib/derivedArtifactScope.mjs).
const stalenessCheck = { skip: releaseOnlyUnlessTouched("docs/diagrams/readme-lts-rail.svg") };

test(
  "the committed readme-lts-rail diagram is exactly what the generator produces",
  stalenessCheck,
  async () => {
    const generated = await renderReadmeLtsRail();
    const committed = readFileSync("docs/diagrams/readme-lts-rail.svg", "utf8");
    assert.equal(
      committed,
      generated,
      "docs/diagrams/readme-lts-rail.svg is stale — regenerate with `node scripts/docs/gen-readme-lts-rail.mjs`"
    );
  }
);

test("the only embedded font is the mono subset for the version strings, and nothing is external", async () => {
  const svg = await renderReadmeLtsRail();
  assert.equal((svg.match(/@font-face/g) || []).length, 1);
  assert.ok(svg.includes('font-family:"CI Mono"'));
  const style = svg.slice(svg.indexOf("<style>"), svg.indexOf("</style>"));
  assert.doesNotMatch(style, /Switzer|CI Serif|CI Sans/, "the mono subset is the only face");
  assert.doesNotMatch(
    style,
    /\bInter\b/,
    "no system sans face: the draft's Inter text is outlined"
  );
  assert.match(svg, /<use href="#g[0-9a-z]+"/, "the Switzer text is drawn as outlines");
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 352" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every copy string stays in the file as text", async () => {
  const svg = await renderReadmeLtsRail();
  for (const s of Object.values(LTS_RAIL_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("the rail ends at v3.9.0 LTS and never shows a v3.8.60", async () => {
  const svg = await renderReadmeLtsRail();
  assert.equal(LTS_RAIL_COPY.versions.at(-1), "v3.9.0 LTS");
  assert.equal(LTS_RAIL_COPY.versions.length, 8);
  assert.ok(!LTS_RAIL_COPY.versions.includes("v3.8.60"));
  // v3.8.60 appears only in the footer sentence that says it does not exist.
  const body = svg.slice(svg.indexOf("</style>"));
  assert.ok(body.includes("There is no v3.8.60."));
  // the travelling dot loops on the rail path
  assert.match(svg, /<animateMotion [^>]*repeatCount="indefinite"[^>]*><mpath href="#lr-rail"\/>/);
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderReadmeLtsRail();
  assert.match(svg, /:root\{[^}]*--bg:#f3f1e9/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#11120f/);
  const body = svg.slice(svg.indexOf("</style>"));
  assert.doesNotMatch(body, /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
