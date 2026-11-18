// The one font a README SVG embeds: IBM Plex Mono (OFL), subset to the code characters a diagram
// keeps as real text, as an @font-face data: URI. GitHub's camo proxy blocks every external fetch
// (fonts included); inline data survives (rendered under camo's own Content-Security-Policy, see
// scripts/docs/readme-svg-shots.mjs).
//
// Everything else in a README diagram is the kit's Switzer, and Switzer is never embedded: its
// licence forbids subsetting (packages/ui-kit/src/fonts/FFL.txt). scripts/docs/readme-outline.mjs
// draws those roles as vector outlines instead and calls buildFontFaceCss() with what stays text.
//
// The file is Google's *latin* subset (@fontsource/ibm-plex-mono/unicode.json → latin): arrows and
// geometric shapes are not in it. A code character outside it throws here; a generator draws such a
// symbol as a shape (drawnSymbol() in readme-outline.mjs) instead of leaving it to a system font.
// Coverage is decided by the unicode *ranges*, not by the font's cmap — a range character the face
// lacked would pass here; tests/unit/docs/readme-glyph-coverage.test.ts is the cmap oracle on the
// committed SVGs.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import subsetFont from "subset-font";

const require = createRequire(import.meta.url);

export const CODE_FAMILY = "CI Mono";

export const KIT_FACES = {
  mono: { pkg: "ibm-plex-mono", family: CODE_FAMILY, weight: 500 },
};

// Linux-safe stack: the embedded face first, a generic family last.
const STACKS = {
  mono: `font-family: "${CODE_FAMILY}", "IBM Plex Mono", Consolas, "Liberation Mono", monospace`,
};

const LATIN_RANGES = String(require("@fontsource/ibm-plex-mono/unicode.json").latin)
  .split(",")
  .map((r) => {
    const m = r.trim().match(/^U\+([0-9A-Fa-f]+)(?:-([0-9A-Fa-f]+))?$/);
    if (!m) {
      throw new Error(`unexpected unicode range in @fontsource/ibm-plex-mono/unicode.json: ${r}`);
    }
    const lo = parseInt(m[1], 16);
    return [lo, m[2] ? parseInt(m[2], 16) : lo];
  });

const inLatin = (cp) => LATIN_RANGES.some(([lo, hi]) => cp >= lo && cp <= hi);

const codePointLabel = (c) => `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`;

/**
 * Splits the unique characters of `text` into the ones the latin subset can embed and the ones it
 * cannot.
 * @param {string} text
 * @returns {{ covered: string, uncovered: string[] }}
 */
export function latinCoverage(text) {
  const chars = [...new Set(text)];
  return {
    covered: chars.filter((c) => inLatin(c.codePointAt(0))).join(""),
    uncovered: chars.filter((c) => !inLatin(c.codePointAt(0))),
  };
}

function faceFile({ pkg, weight }) {
  const pkgDir = dirname(require.resolve(`@fontsource/${pkg}/package.json`));
  return join(pkgDir, "files", `${pkg}-latin-${weight}-normal.woff2`);
}

export function fontStack(role) {
  if (!STACKS[role]) throw new Error(`unknown font role: ${role}`);
  return STACKS[role];
}

/**
 * @param {{ mono?: string }} textByRole
 *   The exact characters the SVG keeps as real code text. An absent or empty role is not embedded.
 * @returns {Promise<{ css: string, bytes: Record<string, number> }>}
 */
export async function buildFontFaceCss(textByRole) {
  const parts = [];
  const bytes = {};
  const plan = [];
  for (const [role, text] of Object.entries(textByRole)) {
    const face = KIT_FACES[role];
    if (!face) throw new Error(`unknown font role: ${role}`);
    if (!text) continue;
    const { covered, uncovered } = latinCoverage(text);
    if (uncovered.length) {
      throw new Error(
        `glyphs not in the embedded ${face.family} subset: ` +
          uncovered.map(codePointLabel).join(", ")
      );
    }
    plan.push({ role, face, glyphs: covered });
  }
  for (const { role, face, glyphs } of plan) {
    const woff2 = await subsetFont(readFileSync(faceFile(face)), glyphs, {
      targetFormat: "woff2",
    });
    bytes[role] = woff2.length;
    parts.push(
      `@font-face{font-family:"${face.family}";font-style:normal;font-weight:${face.weight};` +
        `src:url(data:font/woff2;base64,${Buffer.from(woff2).toString("base64")}) format("woff2")}`
    );
  }
  return { css: parts.join("\n"), bytes };
}
