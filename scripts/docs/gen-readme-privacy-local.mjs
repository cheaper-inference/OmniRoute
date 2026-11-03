// README privacy ledger ("Private & local-first") in the Cheaper Inference UI Kit style
// (KEA-6307). Eleven guarantee rows — shield icon, bold title, detail, receipt chip — under a
// kicker and a headline, with a soft --ok-bg highlight sweeping down the rows on a 16 s loop
// (the same beats as the previous GitHub-dark file; only type, color and spacing changed).
// The output is committed as docs/diagrams/privacy-local.svg and
// tests/unit/docs/readme-privacy-local-svg.test.ts fails when the committed file no longer
// matches this generator.
//
//   node scripts/docs/gen-readme-privacy-local.mjs [--out path.svg]
//
// Everything the diagram draws lives in PRIVACY_LOCAL_COPY: it is both the drawn text and the
// subset input for the embedded fonts, so a glyph can never be drawn without being embedded.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildFontFaceCss } from "./readme-fonts.mjs";
import { svgOpen, gridDefs, esc } from "./readme-diagram-theme.mjs";

export const PRIVACY_LOCAL_COPY = {
  kicker: ["PRIVATE & LOCAL-FIRST"],
  // One headline, split where the emphasis changes (the pieces are drawn back to back).
  headline: [
    "Your keys, your machine, your data. No ",
    "OmniRoute-hosted prompt hop",
    "; telemetry ",
    "off by default",
    ".",
  ],
  // Row titles (bold) — one per ledger row, top to bottom.
  titles: [
    "Request routing runs on your hardware",
    "Telemetry disabled by default",
    "Credentials encrypted at rest",
    "No OmniRoute-hosted account service",
    "Hardened gateway",
    "Process routes are loopback-only",
    "Upstream header scrubbing",
    "PII redaction & response sanitization",
    "Sanitized errors",
    "Local audit trail",
    "MIT licensed & fully open-source",
  ],
  // Row details — drawn right after the title on the same line.
  details: [
    " — npm, Docker, desktop, or your phone",
    " — activates only when explicitly configured",
    " — API keys & OAuth tokens sealed on your own disk",
    " — operator controls dashboard identity: local password or optional OIDC",
    " — API-key scoping, IP filtering, rate limits, prompt-injection guard",
    " — a token leaked through a tunnel can’t spawn processes",
    " — deny-listed headers stripped before every provider call",
    " — built in, strictly opt-in — These redactions run only when enabled",
    " — redact credentials, stack traces & recognized file paths",
    " — MCP tool calls & admin actions logged in your SQLite, not ours",
    " — audit every line, self-host forever",
  ],
  // Receipt chips, right-aligned — one per row.
  chips: [
    "SELF-HOSTED",
    "DEFAULT",
    "AES-256-GCM",
    "LOCAL AUTH",
    "AUTHZ TIERS",
    "127.0.0.1",
    "DENY-LIST",
    "OPT-IN",
    "REDACTED",
    "YOUR DB",
    "MIT",
  ],
};

const TITLE =
  "Private and local-first: your keys, your machine, your data. OmniRoute adds no OmniRoute-hosted prompt-processing hop; telemetry is disabled by default. Request routing runs on your hardware via npm, Docker, desktop or phone. Credentials encrypted at rest with AES-256-GCM. No OmniRoute-hosted account service — the operator controls dashboard identity with a local password or optional OIDC. Hardened gateway with API-key scoping, IP filtering, rate limits and prompt-injection guard. Process-spawning routes are loopback-only so a leaked token cannot spawn processes. Upstream header scrubbing strips deny-listed headers before every provider call. PII redaction and response sanitization are available and run only when enabled. Sanitized errors redact credentials, stack traces and recognized filesystem paths. A local audit trail logs MCP tool calls and admin actions in your own SQLite. MIT licensed and fully open-source — audit every line, self-host forever.";
const DESC =
  "Animated privacy ledger: eleven fully readable rows on the first frame; a soft green highlight sweeps down the rows in a continuous cycle.";

// Ledger geometry (unchanged from the previous file): rows start at y=140 on a 44 px pitch.
const ROW_TOP = 140;
const ROW_H = 44;
const LEFT = 40;
const RIGHT = 1160;
// IBM Plex Mono advances exactly 0.6 em; .mono-sm is 11 px → 6.6 px per glyph.
const CHIP_CHAR_W = 6.6;
const CHIP_PAD = 12;
const CHIP_H = 22;

// The shield-check icon: two strokes, geometry kept from the previous file.
const SHIELD =
  '<path d="M 6,0 L 11,2 L 11,6 C 11,9.5 8.8,11.6 6,12.8 C 3.2,11.6 1,9.5 1,6 L 1,2 Z"/>' +
  '<path d="M 3.8,6 L 5.5,7.8 L 8.4,4.4"/>';

export async function renderPrivacyLocal() {
  const C = PRIVACY_LOCAL_COPY;
  const { css } = await buildFontFaceCss({
    ui: C.details.join(""),
    uiBold: [...C.headline, ...C.titles].join(""),
    mono: [...C.kicker, ...C.chips].join(""),
  });

  // The green sweep: a --ok-bg row that steps down the eleven rows over 16 s (discrete y),
  // fading in at the loop start and out at its end — same keyTimes as before.
  const sweepYs = C.titles.map((_, i) => ROW_TOP + i * ROW_H).join(";");
  const sweepKeys = C.titles.map((_, i) => (i / 11).toFixed(4)).join(";");
  const sweep =
    `  <rect x="${LEFT}" y="${ROW_TOP}" width="${RIGHT - LEFT}" height="${ROW_H}" class="ok-bg" opacity="0">\n` +
    `    <animate attributeName="y" calcMode="discrete" values="${sweepYs}" keyTimes="${sweepKeys}" dur="16s" repeatCount="indefinite"/>\n` +
    `    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.015;0.985;1" dur="16s" repeatCount="indefinite"/>\n` +
    `  </rect>\n`;

  const rows = C.titles.map((title, i) => {
    const top = ROW_TOP + i * ROW_H;
    const chip = C.chips[i];
    const chipW = Math.ceil(chip.length * CHIP_CHAR_W + 2 * CHIP_PAD);
    const chipX = RIGHT - chipW;
    const chipY = top + (ROW_H - CHIP_H) / 2;
    // Row 1 is the "local" indicator — the one lime pill of the diagram; the others are
    // neutral receipt chips on the subtle surface.
    const chipRect =
      i === 0
        ? `<rect x="${chipX}" y="${chipY}" width="${chipW}" height="${CHIP_H}" rx="11" class="accent"/>`
        : `<rect x="${chipX}" y="${chipY}" width="${chipW}" height="${CHIP_H}" rx="11" class="surface-subtle rule" stroke-width="1"/>`;
    const chipText =
      i === 0
        ? `<text x="${chipX + chipW / 2}" y="${top + 26}" text-anchor="middle" class="mono-sm" style="fill:var(--accent-ink)">${esc(chip)}</text>`
        : `<text x="${chipX + chipW / 2}" y="${top + 26}" text-anchor="middle" class="mono-sm">${esc(chip)}</text>`;
    const divider =
      i < C.titles.length - 1
        ? `\n  <line x1="${LEFT}" y1="${top + ROW_H}" x2="${RIGHT}" y2="${top + ROW_H}" class="rule" stroke-width="1"/>`
        : "";
    return (
      `  <g transform="translate(48,${top + 14})" class="stroke-ink" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">${SHIELD}</g>\n` +
      `  <text x="72" y="${top + 28}" class="cell"><tspan class="h4">${esc(title)}</tspan>${esc(C.details[i])}</text>\n` +
      `  ${chipRect}\n` +
      `  ${chipText}` +
      divider
    );
  });

  const H = C.headline;
  return (
    svgOpen({
      viewBox: "0 0 1200 650",
      title: TITLE,
      desc: DESC,
      fontFaceCss: css,
    }) +
    gridDefs("pvl-grid") +
    `  <rect class="bg" x="0" y="0" width="1200" height="650"/>\n` +
    `  <rect x="0" y="0" width="1200" height="650" fill="url(#pvl-grid)"/>\n` +
    `  <text x="${LEFT}" y="56" class="kicker">${esc(C.kicker[0])}</text>\n` +
    `  <line x1="248" y1="51" x2="${RIGHT}" y2="51" class="rule" stroke-width="1"/>\n` +
    // Headline: ink throughout; the "no hosted hop" claim sits on a muted inline tag, the
    // "off by default" guarantee reads in --ok. The tagged tspan is pinned to its measured
    // extent (x 391–661 with the embedded Inter 600) so the tag's padding (6 px left, 3 px
    // right — the semicolon follows immediately) holds on every renderer.
    `  <rect x="385" y="84" width="279" height="24" rx="6" class="surface-muted"/>\n` +
    `  <text x="${LEFT}" y="100" class="h3">${esc(H[0])}<tspan textLength="270" lengthAdjust="spacing">${esc(H[1])}</tspan>${esc(H[2])}<tspan class="ok">${esc(H[3])}</tspan>${esc(H[4])}</text>\n` +
    `  <line x1="${LEFT}" y1="122" x2="${RIGHT}" y2="122" class="rule" stroke-width="1"/>\n` +
    sweep +
    rows.join("\n") +
    "\n</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/privacy-local.svg";
  const svg = await renderPrivacyLocal();
  writeFileSync(out, svg);
  console.log(`privacy-local → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
