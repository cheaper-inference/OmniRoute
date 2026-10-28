import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderResilienceLayers,
  RESILIENCE_LAYERS_COPY,
} from "../../../scripts/docs/gen-readme-resilience-layers.mjs";

// The committed resilience diagram must be exactly what the generator produces, carry the UI
// kit fonts inline, draw every string it subsets and declare both palettes. No counts-gate
// entry reads this file, so there is no live-code check here (4 tests). Same staleness
// contract as tests/unit/docs/readme-hero-svg.test.ts.

const FILE = "docs/diagrams/resilience-layers.svg";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

test("the committed resilience diagram is exactly what the generator produces", async () => {
  const generated = await renderResilienceLayers();
  const committed = readFileSync(FILE, "utf8");
  assert.equal(
    committed,
    generated,
    `${FILE} is stale — regenerate with \`node scripts/docs/gen-readme-resilience-layers.mjs\``
  );
});

test("the diagram embeds the kit faces it uses (ui, uiBold, mono) and nothing external", async () => {
  const svg = await renderResilienceLayers();
  // Three roles are passed to buildFontFaceCss: ui (Inter 400), uiBold (Inter 600), mono.
  assert.equal((svg.match(/@font-face/g) || []).length, 3);
  for (const fam of ["CI Sans", "CI Mono"]) {
    assert.ok(svg.includes(`font-family:"${fam}"`), fam);
  }
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 726" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every drawn string is part of the subset input (no missing glyphs)", async () => {
  const svg = await renderResilienceLayers();
  for (const s of Object.values(RESILIENCE_LAYERS_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderResilienceLayers();
  assert.match(svg, /:root\{[^}]*--bg:#fbfbf8/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#040d10/);
  assert.doesNotMatch(svg.slice(svg.indexOf("</style>")), /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
