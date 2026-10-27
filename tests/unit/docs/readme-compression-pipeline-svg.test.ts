import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderCompressionPipeline,
  COMPRESSION_PIPELINE_COPY,
} from "../../../scripts/docs/gen-readme-compression-pipeline.mjs";

// The committed compression funnel must be exactly what the generator produces, carry the UI
// kit fonts inline, draw every string it subsets and declare both palettes with no literal
// color escaping the theme. Same staleness contract as tests/unit/docs/readme-hero-svg.test.ts.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

test("the committed compression-pipeline diagram is exactly what the generator produces", async () => {
  const generated = await renderCompressionPipeline();
  const committed = readFileSync("docs/diagrams/compression-pipeline.svg", "utf8");
  assert.equal(
    committed,
    generated,
    "docs/diagrams/compression-pipeline.svg is stale — regenerate with `node scripts/docs/gen-readme-compression-pipeline.mjs`"
  );
});

test("the funnel embeds the two kit families (ui + mono = 2 faces) and nothing external", async () => {
  const svg = await renderCompressionPipeline();
  // Two roles are passed to buildFontFaceCss: ui (engine names) and mono (figures, ids,
  // kickers, notes) — neither the serif nor the bold sans is drawn here.
  assert.equal((svg.match(/@font-face/g) || []).length, 2);
  for (const fam of ["CI Sans", "CI Mono"]) {
    assert.ok(svg.includes(`font-family:"${fam}"`), fam);
  }
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 460" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every drawn string is part of the subset input (no missing glyphs)", async () => {
  const svg = await renderCompressionPipeline();
  for (const s of Object.values(COMPRESSION_PIPELINE_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderCompressionPipeline();
  assert.match(svg, /:root\{[^}]*--bg:#fbfbf8/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#040d10/);
  // url(#id) references are not hex colors; gradient stops must use stop-color:var(--…).
  assert.doesNotMatch(svg.slice(svg.indexOf("</style>")), /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
