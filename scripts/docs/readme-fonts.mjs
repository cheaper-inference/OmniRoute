// Subsets the UI kit's @fontsource woff2 files to the glyphs a README SVG draws and returns
// @font-face rules with data: URIs, so the kit typography renders inside GitHub's <img>
// sandbox. The camo proxy blocks every external fetch (fonts included); inline data survives
// (rendered under camo's own Content-Security-Policy on 2026-10-26, see
// scripts/docs/readme-svg-shots.mjs). Faces: Instrument Serif (display), Inter (ui),
// IBM Plex Mono (mono) — the same packages the dashboard ships (packages/ui-kit).
//
// The files are Google's *latin* subsets (@fontsource/<pkg>/unicode.json → latin): arrows and
// geometric shapes are not in them, so those characters fall back to the next family in the
// stack by design — allowed one by one in SYMBOL_FALLBACKS; any other uncovered glyph throws.
// Coverage is decided by those unicode *ranges*, not by the font's cmap — a range character the
// face lacked would pass here; tests/unit/docs/readme-glyph-coverage.test.ts is the cmap oracle
// on the committed SVGs.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import subsetFont from "subset-font";

const require = createRequire(import.meta.url);

export const KIT_FACES = {
  display: { pkg: "instrument-serif", family: "CI Serif", weight: 400 },
  ui: { pkg: "inter", family: "CI Sans", weight: 400 },
  uiBold: { pkg: "inter", family: "CI Sans", weight: 600 },
  mono: { pkg: "ibm-plex-mono", family: "CI Mono", weight: 500 },
};

// Linux-safe stacks: the embedded face first, the kit's own fallbacks after it, a generic
// family last (fontconfig without Arial/Helvetica in the stack falls back to a monospace).
const STACKS = {
  display: 'font-family: "CI Serif", "Instrument Serif", Georgia, "Times New Roman", serif',
  ui: 'font-family: "CI Sans", Inter, "Segoe UI", Arial, Helvetica, sans-serif',
  uiBold: 'font-family: "CI Sans", Inter, "Segoe UI", Arial, Helvetica, sans-serif',
  mono: 'font-family: "CI Mono", "IBM Plex Mono", Consolas, "Liberation Mono", monospace',
};

// Characters the README diagrams draw that no fontsource latin subset of Inter / IBM Plex Mono /
// Instrument Serif carries (there is no "symbols" subset). Each one renders from the next family
// in the stack (Segoe UI / Arial / Consolas / the generic family) — not from the embedded face.
// Adding a character here is a deliberate decision: it means accepting a system-font glyph for
// it on every README. Measured on the twelve generated diagrams (task 6.0b).
export const SYMBOL_FALLBACKS = new Set([
  "→", // U+2192 rightwards arrow (32×)
  "↔", // U+2194 left right arrow (9×)
  "○", // U+25CB white circle (4×)
  "●", // U+25CF black circle (3×)
  "✓", // U+2713 check mark
  "∞", // U+221E infinity
  "▮", // U+25AE black vertical rectangle
  "←", // U+2190 leftwards arrow
  "ⁿ", // U+207F superscript latin small letter n
  "≠", // U+2260 not equal to
  "◒", // U+25D2 circle with lower half black
]);

// The latin range is identical across the three packages (tests/unit/docs/readme-fonts.test.ts
// asserts it), so Inter's unicode.json is read once for all faces.
const LATIN_RANGES = String(require("@fontsource/inter/unicode.json").latin)
  .split(",")
  .map((r) => {
    const m = r.trim().match(/^U\+([0-9A-Fa-f]+)(?:-([0-9A-Fa-f]+))?$/);
    if (!m) throw new Error(`unexpected unicode range in @fontsource/inter/unicode.json: ${r}`);
    const lo = parseInt(m[1], 16);
    return [lo, m[2] ? parseInt(m[2], 16) : lo];
  });

const inLatin = (cp) => LATIN_RANGES.some(([lo, hi]) => cp >= lo && cp <= hi);

const codePointLabel = (c) => `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`;

/**
 * Splits the unique characters of `text` into the ones the latin subset can embed and the
 * ones it cannot (which the browser will take from the next family in the stack).
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
 * @param {{ display?: string, ui?: string, uiBold?: string, mono?: string }} textByRole
 *   The exact characters the SVG draws with each face (concatenate every string drawn in
 *   that role). Roles that are absent or empty are not embedded.
 * @returns {Promise<{ css: string, bytes: Record<string, number>, uncovered: Record<string, string[]> }>}
 *   `uncovered` lists, per role that has any, the drawn characters the latin subset cannot embed
 *   (all of them in SYMBOL_FALLBACKS — anything else throws before any font is subset).
 */
export async function buildFontFaceCss(textByRole) {
  const parts = [];
  const bytes = {};
  const uncovered = {};
  const plan = [];
  for (const [role, text] of Object.entries(textByRole)) {
    const face = KIT_FACES[role];
    if (!face) throw new Error(`unknown font role: ${role}`);
    if (!text) continue;
    const coverage = latinCoverage(text);
    const stray = coverage.uncovered.filter((c) => !SYMBOL_FALLBACKS.has(c));
    if (stray.length) {
      throw new Error(
        `glyphs not in the embedded ${face.family} subset and not in SYMBOL_FALLBACKS: ` +
          stray.map(codePointLabel).join(", ")
      );
    }
    if (coverage.uncovered.length) uncovered[role] = coverage.uncovered;
    plan.push({ role, face, glyphs: coverage.covered });
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
  return { css: parts.join("\n"), bytes, uncovered };
}
