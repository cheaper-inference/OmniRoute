// README compression funnel in the Cheaper Inference UI Kit style (KEA-6307). A client card
// (illustrative 10,000-token request), a 12-engine pipeline the tokens flow through, a provider
// card (~1,080 tokens) and the savings-math badge — the same 8 s choreography as the previous
// GitHub-dark file (five token dots, four evaporating at engines, one survivor plus the code
// token that always passes; engine borders flash in sequence). Only type, color and spacing
// changed; the engine names moved from inside the 46 px cells (7.5–8 px type) to two staggered
// baselines under them so they can be set at the kit's 11 px minimum for labels.
// The output is committed as docs/diagrams/compression-pipeline.svg and
// tests/unit/docs/readme-compression-pipeline-svg.test.ts fails when the committed file no
// longer matches this generator.
//
//   node scripts/docs/gen-readme-compression-pipeline.mjs [--out path.svg]
//
// Everything the diagram draws lives in COMPRESSION_PIPELINE_COPY: it is both the drawn text
// and the subset input for the embedded fonts. The figures are illustrative (not gate-checked)
// and stay verbatim.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildFontFaceCss } from "./readme-fonts.mjs";
import { svgOpen, gridDefs, esc } from "./readme-diagram-theme.mjs";

export const COMPRESSION_PIPELINE_COPY = {
  kickers: ["CLIENT", "PROVIDER", "OMNIROUTE COMPRESSION — 12 ENGINES"],
  figures: ["10,000 tok", "~1,080 tok"],
  captions: ["prompt · tools · history"],
  // Engine numbers and names, pipeline order. The two-line names of the previous file
  // ("Session"/"Dedup", "Responses"/"Tool Out", "LLM"/"Lingua-2") now sit on one line each.
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  engines: [
    "Session Dedup",
    "CCR",
    "Lite",
    "RTK",
    "Responses Tool Out",
    "Headroom",
    "Relevance",
    "Caveman",
    "Aggressive",
    "LLMLingua-2",
    "Ultra",
    "OmniGlyph",
  ],
  token: ["{}"],
  notes: [
    "default stack: RTK → Caveman",
    "{ } code · URLs · JSON — always preserved byte-perfect",
    "up to 95% saved",
  ],
  math: ["combined = 1 − (1−RTK)×(1−Caveman) → avg ", "89.2%", " · range ", "78.4–94.6%"],
};

const TITLE =
  "OmniRoute compression pipeline: a client request of 10,000 tokens passes through 12 stacked engines — Session-Dedup, CCR, Lite, RTK, Responses Tool Output, Headroom, Relevance, Caveman, Aggressive, LLMLingua-2, Ultra, OmniGlyph — and reaches the provider at about 1,080 tokens, up to 95% saved. The default stacked combo runs RTK then Caveman (average 89.2%, range 78.4–94.6%). Code, URLs and JSON are always preserved byte-perfect.";
const DESC =
  "Animated token funnel on an 8 s loop: five token dots leave the client, four evaporate at engines along the way, the survivor and the untouched code token reach the provider while the twelve engine cells light up in sequence.";

// Engine cells: 46 × 86 on a 50 px pitch from x=302, top y=168 (unchanged geometry).
const CELL_X0 = 302;
const CELL_PITCH = 50;
const CELL_W = 46;
const CELL_H = 86;
const CELL_Y = 168;
// RTK (4) and Caveman (8) are the default stack — drawn in --info, numbers and names included.
const DEFAULT_STACK = new Set([3, 7]);
// Border-flash windows (keyTimes), verbatim from the previous file.
const FLASH_KEYS = [
  "0;0.10;0.13;0.17;1",
  "0;0.145;0.175;0.215;1",
  "0;0.19;0.22;0.26;1",
  "0;0.235;0.265;0.305;1",
  "0;0.28;0.31;0.35;1",
  "0;0.325;0.355;0.395;1",
  "0;0.37;0.40;0.44;1",
  "0;0.415;0.445;0.485;1",
  "0;0.46;0.49;0.53;1",
  "0;0.50;0.53;0.57;1",
  "0;0.54;0.57;0.61;1",
  "0;0.575;0.605;0.645;1",
];

// Token dots: wait, travel to a keyPoint, park (evaporate) — verbatim windows.
const TOKENS = [
  { pts: "0;0;0.12;0.12", pk: "0;0.08;0.13;1", op: "0;0.08;0.09;0.125;0.14;1" },
  { pts: "0;0;0.29;0.29", pk: "0;0.085;0.22;1", op: "0;0.085;0.095;0.215;0.23;1" },
  { pts: "0;0;0.50;0.50", pk: "0;0.09;0.355;1", op: "0;0.09;0.10;0.35;0.365;1" },
  { pts: "0;0;0.81;0.81", pk: "0;0.095;0.49;1", op: "0;0.095;0.105;0.485;0.50;1" },
];

export async function renderCompressionPipeline() {
  const C = COMPRESSION_PIPELINE_COPY;
  const { css } = await buildFontFaceCss({
    ui: C.engines.join(""),
    mono: [
      ...C.kickers,
      ...C.figures,
      ...C.captions,
      ...C.numbers,
      ...C.token,
      ...C.notes,
      ...C.math,
    ].join(""),
  });

  const dots = TOKENS.map(
    (t) =>
      `    <circle r="4">\n` +
      `      <animateMotion dur="8s" repeatCount="indefinite" keyPoints="${t.pts}" keyTimes="${t.pk}" calcMode="linear"><mpath href="#cmp-tok"/></animateMotion>\n` +
      `      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="${t.op}" dur="8s" repeatCount="indefinite"/>\n` +
      `    </circle>`
  );

  const cells = C.numbers.map((n, k) => {
    const x = CELL_X0 + k * CELL_PITCH;
    const def = DEFAULT_STACK.has(k);
    const base = def
      ? `<rect width="${CELL_W}" height="${CELL_H}" rx="8" class="surface-subtle stroke-info" stroke-width="1.2"/>`
      : `<rect width="${CELL_W}" height="${CELL_H}" rx="8" class="surface-subtle rule" stroke-width="1"/>`;
    const flash = def
      ? `<rect width="${CELL_W}" height="${CELL_H}" rx="8" fill="none" class="stroke-info" stroke-width="1.6" stroke-opacity="0">`
      : `<rect width="${CELL_W}" height="${CELL_H}" rx="8" fill="none" class="stroke-ink" stroke-width="1.4" stroke-opacity="0">`;
    const peak = def ? "1" : "0.9";
    // Names alternate between two baselines under the cells so 11 px labels never collide.
    const nameY = k % 2 === 0 ? 270 : 286;
    const nameX = x + CELL_W / 2;
    return (
      `    <g transform="translate(${x},${CELL_Y})">\n` +
      `      ${base}\n` +
      `      ${flash}\n` +
      `        <animate attributeName="stroke-opacity" values="0;0;${peak};0;0" keyTimes="${FLASH_KEYS[k]}" dur="8s" repeatCount="indefinite"/>\n` +
      `      </rect>\n` +
      `      <text x="${CELL_W / 2}" y="40" class="mono ${def ? "info" : "muted"}">${esc(n)}</text>\n` +
      `    </g>\n` +
      `    <text x="${nameX}" y="${nameY}" class="small${def ? " ink" : ""}">${esc(C.engines[k])}</text>`
    );
  });

  const M = C.math;
  return (
    svgOpen({
      viewBox: "0 0 1200 460",
      title: TITLE,
      desc: DESC,
      fontFaceCss: css,
    }) +
    gridDefs("cmp-grid") +
    `  <defs>\n` +
    `    <linearGradient id="cmp-funnel" x1="0" y1="0" x2="1" y2="0">\n` +
    `      <stop offset="0" style="stop-color:var(--ink);stop-opacity:0.07"/>\n` +
    `      <stop offset="1" style="stop-color:var(--ok);stop-opacity:0.18"/>\n` +
    `    </linearGradient>\n` +
    `    <path id="cmp-tok" d="M 245,230 L 955,230"/>\n` +
    `  </defs>\n` +
    `  <rect class="bg" x="0" y="0" width="1200" height="460"/>\n` +
    `  <rect x="0" y="0" width="1200" height="460" fill="url(#cmp-grid)"/>\n` +
    // Client card
    `  <rect x="70" y="160" width="175" height="130" rx="12" class="surface" stroke-width="1"/>\n` +
    `  <text x="90" y="190" class="lbl">${esc(C.kickers[0])}</text>\n` +
    `  <text x="90" y="222" class="num-sm">${esc(C.figures[0])}</text>\n` +
    `  <text x="90" y="246" class="mono-xs">${esc(C.captions[0])}</text>\n` +
    `  <circle cx="222" cy="186" r="5" class="accent">` +
    `<animate attributeName="opacity" values="1;0.4;1" dur="2.2s" repeatCount="indefinite"/></circle>\n` +
    // Pipeline container
    // Pipeline container: 12 px wider than the previous file on each side (273–927) so the
    // 80 px "Session Dedup" name, centred under cell 1, clears the left stroke.
    `  <rect x="273" y="112" width="654" height="254" rx="12" class="surface" stroke-width="1"/>\n` +
    `  <text x="600" y="140" text-anchor="middle" class="kicker">${esc(C.kickers[2])}</text>\n` +
    `  <path d="M 245,208 L 273,210 L 927,226 L 955,227 L 955,233 L 927,234 L 273,250 L 245,252 Z" fill="url(#cmp-funnel)"/>\n` +
    // 12 engine cells + staggered names
    `  <g text-anchor="middle">\n` +
    cells.join("\n") +
    `\n  </g>\n` +
    // Token dots (drawn over the cells so they stay visible): four evaporate at engines, the
    // survivor shrinks and reaches the provider
    `  <g class="ink">\n` +
    dots.join("\n") +
    `\n    <circle r="4">\n` +
    `      <animateMotion dur="8s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;0.10;0.60;1" calcMode="linear"><mpath href="#cmp-tok"/></animateMotion>\n` +
    `      <animate attributeName="r" values="4;4;2.4;2.4" keyTimes="0;0.10;0.60;1" dur="8s" repeatCount="indefinite"/>\n` +
    `      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.10;0.11;0.60;0.64;1" dur="8s" repeatCount="indefinite"/>\n` +
    `    </circle>\n` +
    `  </g>\n` +
    // The code token passes through untouched
    `  <g>\n` +
    `    <animateMotion dur="8s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;0.14;0.64;1" calcMode="linear"><mpath href="#cmp-tok"/></animateMotion>\n` +
    `    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.14;0.15;0.64;0.68;1" dur="8s" repeatCount="indefinite"/>\n` +
    `    <rect x="-7" y="-7" width="14" height="14" rx="2" fill="none" class="stroke-ok" stroke-width="1.4"/>\n` +
    `    <text y="3.5" text-anchor="middle" class="mono-xs ok">${esc(C.token[0])}</text>\n` +
    `  </g>\n` +
    // Default-stack bracket under the names
    `  <path d="M 475,300 L 475,308 L 675,308 L 675,300" fill="none" class="stroke-info" stroke-width="1"/>\n` +
    `  <text x="575" y="324" text-anchor="middle" class="mono-sm info">${esc(C.notes[0])}</text>\n` +
    `  <text x="600" y="350" text-anchor="middle" class="mono-sm ok">${esc(C.notes[1])}</text>\n` +
    // Provider card
    `  <rect x="955" y="160" width="175" height="130" rx="12" class="surface" stroke-width="1"/>\n` +
    `  <text x="975" y="190" class="lbl">${esc(C.kickers[1])}</text>\n` +
    `  <text x="975" y="222" class="num-sm">${esc(C.figures[1])}</text>\n` +
    `  <g transform="translate(975,236)">\n` +
    `    <rect width="132" height="22" rx="11" fill="none" class="stroke-ok" stroke-width="1"/>\n` +
    `    <text x="66" y="15" text-anchor="middle" class="mono-sm ok">` +
    `<animate attributeName="opacity" values="0.75;0.75;1;1;0.75" keyTimes="0;0.58;0.62;0.78;1" dur="8s" repeatCount="indefinite"/>${esc(C.notes[2])}</text>\n` +
    `  </g>\n` +
    // Savings math badge
    `  <g transform="translate(600,404)">\n` +
    `    <rect x="-268" y="-16" width="536" height="30" rx="15" class="surface" stroke-width="1"/>\n` +
    `    <text y="4" text-anchor="middle" class="mono-sm muted">${esc(M[0])}<tspan class="ok">${esc(M[1])}</tspan>${esc(M[2])}<tspan class="ok">${esc(M[3])}</tspan></text>\n` +
    `  </g>\n` +
    "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/compression-pipeline.svg";
  const svg = await renderCompressionPipeline();
  writeFileSync(out, svg);
  console.log(`compression-pipeline → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
