import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderPrivacyLocal,
  PRIVACY_LOCAL_COPY,
} from "../../../scripts/docs/gen-readme-privacy-local.mjs";

// The committed privacy ledger must be exactly what the generator produces, carry the UI kit
// fonts inline, draw every string it subsets and declare both palettes with no literal color
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

test("the ledger embeds three kit faces (Inter 400 + 600 as CI Sans, Plex Mono as CI Mono) and nothing external", async () => {
  const svg = await renderPrivacyLocal();
  // Three roles are passed to buildFontFaceCss: ui (row text), uiBold (headline + row
  // titles) and mono (kicker + receipt chips) — the display serif is not drawn here.
  assert.equal((svg.match(/@font-face/g) || []).length, 3);
  for (const fam of ["CI Sans", "CI Mono"]) {
    assert.ok(svg.includes(`font-family:"${fam}"`), fam);
  }
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 650" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every drawn string is part of the subset input (no missing glyphs)", async () => {
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
