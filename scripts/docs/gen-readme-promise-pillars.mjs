// README "the promise" card in the Cheaper Inference UI Kit style (KEA-6307): six pillar tiles
// in a 3 × 2 grid with a lime highlight sweeping from tile to tile on a 12 s cycle. Output is
// committed as docs/diagrams/promise-pillars.svg; tests/unit/docs/readme-promise-pillars-svg.test.ts
// fails when the committed file no longer matches this generator, and runs the counts gate's own
// validators on it (provider total, MCP tool count, free-forever providers).
//
//   node scripts/docs/gen-readme-promise-pillars.mjs [--out path.svg]
//
// Everything the card draws lives in PROMISE_PILLARS_COPY: it is both the drawn text and the
// subset input for the embedded fonts, so a glyph can never be drawn without being embedded.
// Numbers stay in <text> nodes because scripts/check/check-docs-counts-sync.mjs reads them from
// the raw file.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildFontFaceCss } from "./readme-fonts.mjs";
import { svgOpen, gridDefs, esc } from "./readme-diagram-theme.mjs";

const NB = " ";

export const PROMISE_PILLARS_COPY = {
  kicker: ["THE PROMISE"],
  headline: ["One endpoint. ", " Never stop building — OmniRoute picks ", "."],
  headlineMarks: ["377 providers.", "the cheapest one that works"],
  titles: [
    "Never hit limits",
    "Save up to 95% tokens",
    "$0 to start",
    "Every tool works",
    "One endpoint",
    "Production-grade",
  ],
  bodies: [
    "Auto-fallback across 377 providers in",
    "milliseconds. Quota out? The next provider",
    "takes over while a healthy target remains.",
    "RTK + Caveman stacked compression cuts",
    "15–95% of eligible tokens — ~89% average",
    "on tool-heavy sessions.",
    "150+ providers with a free tier, 52 free",
    "forever — Qoder, Pollinations, Cloudflare,",
    "SiliconFlow… No card needed.",
    "37 CLI/agent integrations — Claude Code, Codex,",
    "Cursor, Cline, Copilot, Antigravity —",
    "through one config.",
    "OpenAI ↔ Claude ↔ Gemini ↔ Responses API",
    "translation. Point any tool at /v1 —",
    "it just works.",
    "Circuit breakers, TLS stealth, MCP (110",
    "tools), A2A, memory, guardrails, evals —",
    "39,000+ static test declarations.",
  ],
  footer: [
    `$ npm i -g omniroute${NB}${NB}·${NB}${NB}point your tool at http://localhost:20128/v1${NB}${NB}·${NB}${NB}$0`,
  ],
  footerRight: ["MIT · OPEN SOURCE"],
};

const W = 1200;
const H = 540;
const TILE_W = 360;
const TILE_H = 164;
const COLS = [40, 420, 800];
const ROWS = [130, 314];

// Pillar tone (status token for the bar + icon) and the sweep window, verbatim from the
// previous file's keyTimes.
const PILLARS = [
  {
    tone: "info",
    sweep: { values: "0;0.9;0;0", keyTimes: "0;0.055;0.12;1" },
    icon: '<circle cx="11" cy="11" r="10.5"/><line x1="3.9" y1="3.9" x2="18.1" y2="18.1"/>',
    iconWidth: "2.4",
    join: false,
  },
  {
    tone: "warn",
    sweep: { values: "0;0;0.9;0;0", keyTimes: "0;0.167;0.222;0.287;1" },
    icon: '<circle cx="5.5" cy="5.5" r="4"/><circle cx="16.5" cy="16.5" r="4"/><line x1="19" y1="3" x2="3" y2="19"/>',
    iconWidth: "2.4",
    join: false,
  },
  {
    tone: "ok",
    sweep: { values: "0;0;0.9;0;0", keyTimes: "0;0.334;0.389;0.454;1" },
    icon:
      '<path d="M 2,9.5 L 2,3 A 1,1 0 0 1 3,2 L 9.5,2 L 20,12.5 A 1.6,1.6 0 0 1 20,14.8 L 14.8,20 A 1.6,1.6 0 0 1 12.5,20 Z"/>' +
      '<circle cx="6.6" cy="6.6" r="1.4" class="__TONE__" stroke="none"/>',
    iconWidth: "2.2",
    join: true,
  },
  {
    tone: "ink",
    sweep: { values: "0;0;0.9;0;0", keyTimes: "0;0.5;0.555;0.62;1" },
    icon:
      '<path d="M 6,2 L 6,7 M 14,2 L 14,7"/>' +
      '<path d="M 3.5,7 L 16.5,7 L 16.5,11.5 A 6.5,6.5 0 0 1 10,18 A 6.5,6.5 0 0 1 3.5,11.5 Z"/>' +
      '<path d="M 10,18 L 10,22"/>',
    iconWidth: "2.2",
    join: true,
  },
  {
    tone: "info",
    sweep: { values: "0;0;0.9;0;0", keyTimes: "0;0.667;0.722;0.787;1" },
    icon:
      '<path d="M 2,3 L 13,8.5 M 2,11 L 13,11 M 2,19 L 13,13.5"/>' +
      '<circle cx="18.5" cy="11" r="3.2" class="__TONE__" stroke="none"/>',
    iconWidth: "2.2",
    join: false,
  },
  {
    tone: "ok",
    sweep: { values: "0;0;0.9;0;0", keyTimes: "0;0.834;0.889;0.954;1" },
    icon:
      '<path d="M 11,1.5 L 19.5,5 L 19.5,11 C 19.5,16.5 16,19.8 11,21.5 C 6,19.8 2.5,16.5 2.5,11 L 2.5,5 Z"/>' +
      '<path d="M 7,11 L 10,14 L 15.4,8.2"/>',
    iconWidth: "2.2",
    join: true,
  },
];

function pillar(i, C) {
  const p = PILLARS[i];
  const x = COLS[i % 3];
  const y = ROWS[Math.floor(i / 3)];
  const join = p.join ? ' stroke-linejoin="round"' : "";
  return (
    `  <g>\n` +
    `    <rect x="${x}" y="${y}" width="${TILE_W}" height="${TILE_H}" rx="12" class="surface" stroke-width="1"/>\n` +
    // Sweep highlight: a lime wash + lime border, the one brand emphasis of this card.
    `    <rect x="${x}" y="${y}" width="${TILE_W}" height="${TILE_H}" rx="12" class="accent-soft stroke-accent" stroke-width="2" opacity="0">` +
    `<animate attributeName="opacity" values="${p.sweep.values}" keyTimes="${p.sweep.keyTimes}" dur="12s" begin="3s" repeatCount="indefinite"/></rect>\n` +
    `    <rect x="${x}" y="${y + 16}" width="4" height="132" rx="2" class="${p.tone}"/>\n` +
    `    <g transform="translate(${x + 26},${y + 22})" class="stroke-${p.tone}" stroke-width="${p.iconWidth}" fill="none" stroke-linecap="round"${join}>${p.icon.replaceAll("__TONE__", p.tone)}</g>\n` +
    `    <text x="${x + 62}" y="${y + 40}" class="h3">${esc(C.titles[i])}</text>\n` +
    [0, 1, 2]
      .map(
        (l) =>
          `    <text x="${x + 26}" y="${y + 74 + l * 22}" class="cell" style="fill:var(--muted)">${esc(C.bodies[i * 3 + l])}</text>`
      )
      .join("\n") +
    `\n  </g>`
  );
}

export async function renderReadmePromisePillars() {
  const C = PROMISE_PILLARS_COPY;
  const { css } = await buildFontFaceCss({
    ui: [...C.headline, ...C.bodies].join(""),
    uiBold: [...C.headlineMarks, ...C.titles].join(""),
    mono: [...C.kicker, ...C.footer, ...C.footerRight].join(""),
  });

  return (
    svgOpen({
      viewBox: `0 0 ${W} ${H}`,
      title:
        "The OmniRoute promise: one endpoint and 377 providers. Six pillars. Resilient fallback: automatic routing continues while another healthy target is available. Save up to 95 percent of eligible tokens: RTK plus Caveman stacked compression averages about 89 percent on tool-heavy sessions. Zero dollars to start: 150+ providers with a free tier and 52 recurring or keyless free-forever providers. Every tool works: 37 CLI and agent integration records, including Claude Code, Codex, Cursor, Cline, Copilot and Antigravity, through one config. One endpoint: OpenAI, Claude, Gemini and Responses API translation at /v1. Production controls: circuit breakers, TLS stealth, MCP with 110 tools, A2A, memory, guardrails, evals, and 39,000+ static test declarations across 5,100+ tracked test files.",
      desc: "Animated promise card: six pillar tiles in reading order, with a soft highlight sweeping from tile to tile in a continuous cycle.",
      fontFaceCss: css,
    }) +
    gridDefs("pp-grid") +
    `  <rect class="bg" x="0" y="0" width="${W}" height="${H}"/>\n` +
    `  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#pp-grid)"/>\n` +
    // header
    `  <text x="40" y="58" class="kicker">${esc(C.kicker[0])}</text>\n` +
    `  <line x1="180" y1="53" x2="1160" y2="53" class="rule" stroke-width="1"/>\n` +
    `  <text x="40" y="100" class="sub">${esc(C.headline[0])}` +
    `<tspan font-weight="600" style="fill:var(--ink)">${esc(C.headlineMarks[0])}</tspan>${esc(C.headline[1])}` +
    `<tspan font-weight="600" style="fill:var(--ok)">${esc(C.headlineMarks[1])}</tspan>${esc(C.headline[2])}</text>\n` +
    PILLARS.map((_, i) => pillar(i, C)).join("\n") +
    "\n" +
    // footer
    `  <text x="40" y="516" class="mono-sm" style="fill:var(--muted)">${esc(C.footer[0])}</text>\n` +
    `  <text x="1160" y="516" text-anchor="end" class="kicker">${esc(C.footerRight[0])}</text>\n` +
    "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/promise-pillars.svg";
  const svg = await renderReadmePromisePillars();
  writeFileSync(out, svg);
  console.log(`promise-pillars → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
