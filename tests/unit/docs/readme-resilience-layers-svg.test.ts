import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderResilienceLayers,
  RESILIENCE_LAYERS_COPY,
} from "../../../scripts/docs/gen-readme-resilience-layers.mjs";
import { releaseOnlyUnlessTouched } from "../../../scripts/check/lib/derivedArtifactScope.mjs";

// The committed resilience diagram must be exactly what the generator produces, draw the kit type as outlines, keep every string as text and declare both palettes. No counts-gate
// entry reads this file, so there is no live-code check here (4 tests). Same staleness
// contract as tests/unit/docs/readme-hero-svg.test.ts.

const FILE = "docs/diagrams/resilience-layers.svg";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Release mode (and a change that edits this file) compares it byte for byte; a feature PR
// leaves the drift to the release refresh (scripts/check/lib/derivedArtifactScope.mjs).
const stalenessSkip = releaseOnlyUnlessTouched("docs/diagrams/resilience-layers.svg");

test("the committed resilience diagram is exactly what the generator produces", async (t) => {
  if (stalenessSkip) return t.skip(stalenessSkip);
  const generated = await renderResilienceLayers();
  const committed = readFileSync(FILE, "utf8");
  assert.equal(
    committed,
    generated,
    `${FILE} is stale — regenerate with \`node scripts/docs/gen-readme-resilience-layers.mjs\``
  );
});

test("no font is embedded (every string is outlined) and nothing is external", async () => {
  const svg = await renderResilienceLayers();
  assert.equal((svg.match(/@font-face/g) || []).length, 0);
  const style = svg.slice(svg.indexOf("<style>"), svg.indexOf("</style>"));
  assert.doesNotMatch(style, /font-family|Switzer/, "nothing here is text: no family to name");
  assert.match(svg, /<use href="#g[0-9a-z]+"/, "the Switzer text is drawn as outlines");
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 726" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every copy string stays in the file as text", async () => {
  const svg = await renderResilienceLayers();
  for (const s of Object.values(RESILIENCE_LAYERS_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderResilienceLayers();
  assert.match(svg, /:root\{[^}]*--bg:#f3f1e9/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#11120f/);
  assert.doesNotMatch(svg.slice(svg.indexOf("</style>")), /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
