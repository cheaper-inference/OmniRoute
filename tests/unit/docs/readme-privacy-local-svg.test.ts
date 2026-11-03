import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderPrivacyLocal,
  PRIVACY_LOCAL_COPY,
} from "../../../scripts/docs/gen-readme-privacy-local.mjs";

// The committed privacy ledger must be exactly what the generator produces, draw the kit type as outlines, keep every string as text and declare both palettes with no literal color
// escaping the theme. Same staleness contract as tests/unit/docs/readme-hero-svg.test.ts.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

test("the committed privacy-local diagram is exactly what the generator produces", async () => {
  const generated = await renderPrivacyLocal();
  const committed = readFileSync("docs/diagrams/privacy-local.svg", "utf8");
  assert.equal(
    committed,
    generated,
    "docs/diagrams/privacy-local.svg is stale — regenerate with `node scripts/docs/gen-readme-privacy-local.mjs`"
  );
});

test("no font is embedded (every string is outlined) and nothing is external", async () => {
  const svg = await renderPrivacyLocal();
  assert.equal((svg.match(/@font-face/g) || []).length, 0);
  const style = svg.slice(svg.indexOf("<style>"), svg.indexOf("</style>"));
  assert.doesNotMatch(style, /font-family|Switzer/, "nothing here is text: no family to name");
  assert.match(svg, /<use href="#g[0-9a-z]+"/, "the Switzer text is drawn as outlines");
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 650" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every copy string stays in the file as text", async () => {
  const svg = await renderPrivacyLocal();
  for (const s of Object.values(PRIVACY_LOCAL_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderPrivacyLocal();
  assert.match(svg, /:root\{[^}]*--bg:#fbfbf8/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#040d10/);
  // url(#id) references are not hex colors; anything like #7ee787 after the stylesheet is.
  assert.doesNotMatch(svg.slice(svg.indexOf("</style>")), /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
