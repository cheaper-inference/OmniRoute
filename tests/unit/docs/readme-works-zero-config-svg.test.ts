import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderReadmeWorksZeroConfig,
  WORKS_ZERO_CONFIG_COPY,
} from "../../../scripts/docs/gen-readme-works-zero-config.mjs";
import { releaseOnlyUnlessTouched } from "../../../scripts/check/lib/derivedArtifactScope.mjs";

// The committed three-step strip must be exactly what the generator produces, draw the kit type as outlines, keep every string as text and declare both palettes with no literal
// color escaping the theme. Same staleness contract as tests/unit/docs/readme-hero-svg.test.ts.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Release mode (and a change that edits this file) compares it byte for byte; a feature PR
// leaves the drift to the release refresh (scripts/check/lib/derivedArtifactScope.mjs).
const stalenessCheck = { skip: releaseOnlyUnlessTouched("docs/diagrams/works-zero-config.svg") };

test(
  "the committed works-zero-config diagram is exactly what the generator produces",
  stalenessCheck,
  async () => {
    const generated = await renderReadmeWorksZeroConfig();
    const committed = readFileSync("docs/diagrams/works-zero-config.svg", "utf8");
    assert.equal(
      committed,
      generated,
      "docs/diagrams/works-zero-config.svg is stale — regenerate with `node scripts/docs/gen-readme-works-zero-config.mjs`"
    );
  }
);

test("the only embedded font is the mono subset for the commands and URLs, and nothing is external", async () => {
  const svg = await renderReadmeWorksZeroConfig();
  assert.equal((svg.match(/@font-face/g) || []).length, 1);
  assert.ok(svg.includes('font-family:"CI Mono"'));
  const style = svg.slice(svg.indexOf("<style>"), svg.indexOf("</style>"));
  assert.doesNotMatch(style, /Switzer|CI Serif|CI Sans/, "the mono subset is the only face");
  assert.match(svg, /<use href="#g[0-9a-z]+"/, "the Switzer text is drawn as outlines");
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 430" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every copy string stays in the file as text", async () => {
  const svg = await renderReadmeWorksZeroConfig();
  for (const s of Object.values(WORKS_ZERO_CONFIG_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderReadmeWorksZeroConfig();
  assert.match(svg, /:root\{[^}]*--bg:#f3f1e9/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#11120f/);
  const body = svg.slice(svg.indexOf("</style>"));
  assert.doesNotMatch(body, /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
