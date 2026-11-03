import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderReadmeWorksZeroConfig,
  WORKS_ZERO_CONFIG_COPY,
} from "../../../scripts/docs/gen-readme-works-zero-config.mjs";

// The committed three-step strip must be exactly what the generator produces, carry the UI
// kit fonts inline, draw every string it subsets and declare both palettes with no literal
// color escaping the theme. Same staleness contract as tests/unit/docs/readme-hero-svg.test.ts.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

test("the committed works-zero-config diagram is exactly what the generator produces", async () => {
  const generated = await renderReadmeWorksZeroConfig();
  const committed = readFileSync("docs/diagrams/works-zero-config.svg", "utf8");
  assert.equal(
    committed,
    generated,
    "docs/diagrams/works-zero-config.svg is stale — regenerate with `node scripts/docs/gen-readme-works-zero-config.mjs`"
  );
});

test("the diagram embeds the three kit faces (ui, uiBold, mono) and nothing external", async () => {
  const svg = await renderReadmeWorksZeroConfig();
  // ui + uiBold + mono: no display face is drawn here.
  assert.equal((svg.match(/@font-face/g) || []).length, 3);
  for (const fam of ["CI Sans", "CI Mono"]) {
    assert.ok(svg.includes(`font-family:"${fam}"`), fam);
  }
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 430" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every drawn string is part of the subset input (no missing glyphs)", async () => {
  const svg = await renderReadmeWorksZeroConfig();
  for (const s of Object.values(WORKS_ZERO_CONFIG_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderReadmeWorksZeroConfig();
  assert.match(svg, /:root\{[^}]*--bg:#fbfbf8/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#040d10/);
  const body = svg.slice(svg.indexOf("</style>"));
  assert.doesNotMatch(body, /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
