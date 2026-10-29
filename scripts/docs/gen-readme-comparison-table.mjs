// README comparison table (OmniRoute vs 9router / OpenRouter / CLIProxyAPI / LiteLLM) in the
// Cheaper Inference UI Kit style (KEA-6307). The output is committed as
// docs/diagrams/comparison-table.svg; tests/unit/docs/readme-comparison-table-svg.test.ts fails
// when the committed file no longer matches this generator, so a stale picture cannot ship.
//
//   node scripts/docs/gen-readme-comparison-table.mjs [--out path.svg]
//
// Everything the table draws lives in COMPARISON_TABLE_COPY (derived from ROWS): it is both
// the drawn text and the subset input for the embedded fonts. The canonical numbers stay in
// <text>/<desc> because scripts/check/check-docs-counts-sync.mjs reads them from the raw file.
// The table is a dated snapshot of each project's docs — cells are kept verbatim; only the
// provider total follows the live code (377), which the counts gate enforces.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildFontFaceCss } from "./readme-fonts.mjs";
import { svgOpen, gridDefs, esc } from "./readme-diagram-theme.mjs";

// Cells: a string is drawn as text; "yes" / "mid" / "no" draw the check / partial / cross glyph.
// Column order: OmniRoute, 9router, OpenRouter, CLIProxyAPI, LiteLLM.
const ROWS = [
  { label: "Providers", cells: ["377", "40+", "400+*", "~5", "100+"] },
  { label: "Free providers built-in", cells: ["150+", "yes", "mid", "no", "no"] },
  { label: "Routing strategies", cells: ["20", "2", "3", "2", "6"] },
  { label: "Token compression", cells: ["12 eng", "yes", "mid", "no", "no"] },
  { label: "Built-in MCP server (own tools)", cells: ["110", "no", "mid", "no", "mid"] },
  { label: "A2A agent protocol", cells: ["yes", "no", "no", "no", "yes"] },
  { label: "Persistent memory", cells: ["yes", "no", "no", "no", "no"] },
  { label: "Guardrails (PII / injection)", cells: ["yes", "no", "yes", "no", "yes"] },
  { label: "Cloud agents (Codex/Devin/Jules)", cells: ["yes", "no", "no", "no", "no"] },
  { label: "TLS fingerprint stealth (JA3/JA4)", cells: ["yes", "no", "no", "no", "no"] },
  { label: "Desktop · Termux · PWA", cells: ["yes", "mid", "mid", "mid", "mid"] },
  { label: "i18n UI locales", cells: ["67", "6", "no", "no", "no"] },
  { label: "Self-hosted · 100% MIT", cells: ["MIT", "MIT", "no", "MIT", "open-core"] },
];

const GLYPHS = new Set(["yes", "mid", "no"]);
const isText = (c) => !GLYPHS.has(c);

export const COMPARISON_TABLE_COPY = {
  kicker: ["WHAT SETS OMNIROUTE APART"],
  headline: ["Every router does routing. ", "OmniRoute does the whole platform."],
  columns: ["OmniRoute", "9router", "OpenRouter", "CLIProxyAPI", "LiteLLM"],
  rows: ROWS.map((r) => r.label),
  values: [...new Set(ROWS.flatMap((r) => r.cells.filter(isText)))],
  foot: [
    "full • partial • none  ·  *OpenRouter counts models & is a hosted SaaS, not self-hosted.",
    "verified from each project's docs",
  ],
};

const COL_X = [440, 604, 760, 916, 1080];
const ROW_Y0 = 196;
const ROW_H = 42;

export async function renderComparisonTable() {
  const C = COMPARISON_TABLE_COPY;
  const { css } = await buildFontFaceCss({
    ui: [C.headline[0], ...C.rows, ...C.values].join(""),
    uiBold: [C.headline[1], ...C.columns, ...C.values].join(""),
    mono: [...C.kicker, ...C.foot].join(""),
  });

  const glyph = (kind, x, y) => `      <use href="#cmp-${kind}" x="${x}" y="${y - 5}"/>\n`;

  // Even rows (2nd, 4th, …) sit on a subtle stripe, drawn under the column highlight.
  const stripes = ROWS.map((_, i) =>
    i % 2 === 1
      ? `  <rect x="44" y="${ROW_Y0 + i * ROW_H - 26}" width="1112" height="${ROW_H}" rx="6" class="surface-subtle"/>\n`
      : ""
  ).join("");

  const rows = ROWS.map((row, i) => {
    const y = ROW_Y0 + i * ROW_H;
    const begin = (0.15 + i * 0.09).toFixed(2);
    const cells = row.cells
      .map((cell, col) => {
        const x = COL_X[col];
        if (!isText(cell)) return glyph(cell, x, y);
        if (col === 0) {
          return `      <text x="${x}" y="${y}" text-anchor="middle" class="h4">${esc(cell)}</text>\n`;
        }
        const fill = cell === "open-core" ? "var(--warn)" : "var(--muted)";
        return `      <text x="${x}" y="${y}" text-anchor="middle" class="cell" style="fill:${fill}">${esc(cell)}</text>\n`;
      })
      .join("");
    return (
      `    <g opacity="0"><animate attributeName="opacity" values="0;1" dur="0.4s" begin="${begin}s" fill="freeze"/>\n` +
      `      <text x="44" y="${y}" class="cell">${esc(row.label)}</text>\n` +
      cells +
      `    </g>\n`
    );
  }).join("");

  const headers = C.columns
    .map((name, col) =>
      col === 0
        ? `  <text x="${COL_X[col]}" y="150" text-anchor="middle" class="h3">${esc(name)}</text>\n`
        : `  <text x="${COL_X[col]}" y="150" text-anchor="middle" class="h4" style="fill:var(--muted)">${esc(name)}</text>\n`
    )
    .join("");

  return (
    svgOpen({
      viewBox: "0 0 1200 780",
      title:
        "Comparison table: OmniRoute versus 9router, OpenRouter, CLIProxyAPI and LiteLLM across 13 capabilities.",
      desc: "OmniRoute is the only one with the full set: 377 providers, 150+ free providers built-in, 20 routing strategies, 12-engine token compression, a built-in MCP server with 110 tools, A2A protocol, persistent memory, guardrails, cloud agents, TLS fingerprint stealth, desktop/Termux/PWA, 67 UI locales and 100% MIT self-hosted. 9router has free providers, RTK compression and translation but no MCP, A2A, memory, guardrails, cloud agents or stealth. OpenRouter is a hosted SaaS with 400+ models, guardrails and a hosted MCP but is not self-hosted and lacks A2A, memory, cloud agents and stealth. CLIProxyAPI is a light OAuth proxy with two routing strategies. LiteLLM has 100+ providers, A2A and extensive guardrails but no memory, compression, free tier, stealth or cloud agents. Static-header comparison table where each capability row fades in top to bottom; the OmniRoute column is highlighted and shows a check or a leading value in every row, while competitors show a mix of checks, partials and crosses. Light and dark follow the viewer's color scheme.",
      fontFaceCss: css,
      extraCss: `.cmp-strong{font-weight:600;fill:var(--ink)}`,
    }) +
    gridDefs("cmp-grid") +
    `  <defs>\n` +
    `    <g id="cmp-yes"><circle r="11" class="ok-bg"/><path d="M -5 0.3 L -1.6 3.7 L 5.4 -4" class="stroke-ok" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>\n` +
    `    <g id="cmp-no"><circle r="11" class="surface-muted"/><path d="M -3.8 -3.8 L 3.8 3.8 M 3.8 -3.8 L -3.8 3.8" style="stroke:var(--muted)" stroke-width="2.1" fill="none" stroke-linecap="round"/></g>\n` +
    `    <g id="cmp-mid"><circle r="11" class="warn-bg"/><path d="M -4.6 0 L 4.6 0" class="stroke-warn" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>\n` +
    `  </defs>\n` +
    `  <rect class="bg" x="0" y="0" width="1200" height="780"/>\n` +
    `  <rect x="0" y="0" width="1200" height="780" fill="url(#cmp-grid)"/>\n` +
    `  <text x="44" y="54" class="kicker">${esc(C.kicker[0])}</text>\n` +
    `  <line x1="300" y1="49" x2="1156" y2="49" class="rule" stroke-width="1"/>\n` +
    `  <text x="44" y="96" class="sub">${esc(C.headline[0])}<tspan class="cmp-strong">${esc(C.headline[1])}</tspan></text>\n` +
    `  <rect x="36" y="126" width="1128" height="596" rx="12" class="surface" stroke-width="1"/>\n` +
    stripes +
    // The one lime moment: the OmniRoute column, a soft accent fill behind ink text.
    `  <rect x="352" y="126" width="176" height="596" rx="12" class="accent-soft stroke-accent" stroke-width="1.5"/>\n` +
    headers +
    `  <line x1="44" y1="162" x2="1156" y2="162" class="rule" stroke-width="1"/>\n` +
    `  <g>\n` +
    rows +
    `  </g>\n` +
    `  <text x="44" y="750" class="mono-sm" style="fill:var(--muted)">${esc(C.foot[0])}</text>\n` +
    `  <text x="1156" y="750" text-anchor="end" class="lbl">${esc(C.foot[1])}</text>\n` +
    "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/comparison-table.svg";
  const svg = await renderComparisonTable();
  writeFileSync(out, svg);
  console.log(`comparison-table → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
