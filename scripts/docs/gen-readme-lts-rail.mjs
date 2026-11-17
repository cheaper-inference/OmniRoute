// README "road to v3.9.0 LTS" rail in the Cheaper Inference UI Kit style: one horizontal rail
// with the prepare window (v3.8.50–v3.8.54, solid ok line), the validation window
// (v3.8.55–v3.8.59, dashed info line) and the v3.9.0 LTS node (accent, pulsing glow). A copper dot
// travels the rail left to right on a 10 s loop. Output is committed as
// docs/diagrams/readme-lts-rail.svg; tests/unit/docs/readme-lts-rail-svg.test.ts fails when the
// committed file no longer matches this generator.
//
//   node scripts/docs/gen-readme-lts-rail.mjs [--out path.svg]
//
// The release plan it draws is the 3.8.50 → 3.9.0 rail (no v3.8.60); the copy is hand-maintained
// here, not derived, because no catalog holds the plan. Everything the rail draws lives in
// LTS_RAIL_COPY: it is both the drawn text and what the outlining step shapes
// (scripts/docs/readme-outline.mjs). Version strings stay real text on the mono subset; the rest
// is Switzer drawn as outlines.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { outlineSvg } from "./readme-outline.mjs";
import { svgOpen, esc, afterKicker } from "./readme-diagram-theme.mjs";

const W = 1200;
const H = 352;
const RAIL_Y = 168;
// Window boundaries on the rail: prepare ends / validate begins, validate ends / LTS begins.
const RAIL_START = 72;
const PREP_END = 346;
const VAL_END = 988;
const RAIL_END = 1072;

// One node per release (or release group): x on the rail, version, two focus lines, window.
const NODES = [
  { x: 132, v: "v3.8.50–.53", l1: "Registry, decomposition,", l2: "headless mode", kind: "prep" },
  { x: 280, v: "v3.8.54", l1: "Release infrastructure,", l2: "last prepare release", kind: "prep" },
  { x: 412, v: "v3.8.55", l1: "Characterization", l2: "tests, boundaries", kind: "val" },
  { x: 540, v: "v3.8.56", l1: "Canary and", l2: "performance baseline", kind: "val" },
  { x: 668, v: "v3.8.57", l1: "Security and", l2: "compliance sweep", kind: "val" },
  { x: 796, v: "v3.8.58", l1: "Dry run of", l2: "the 3.9.0 cut", kind: "val" },
  { x: 924, v: "v3.8.59", l1: "Final freeze,", l2: "GO / NO-GO", kind: "val" },
  { x: RAIL_END, v: "v3.9.0 LTS", l1: "stable/v3 line;", l2: "v4 opens on develop", kind: "lts" },
];

export const LTS_RAIL_COPY = {
  kicker: ["THE ROAD TO v3.9.0 LTS"],
  bands: ["PREPARE", "VALIDATE", "LTS"],
  bandSubs: ["structural work", "fixes, docs, translations and provider updates only"],
  versions: NODES.map((n) => n.v),
  focus: NODES.flatMap((n) => [n.l1, n.l2]),
  footer: [
    "There is no v3.8.60. After v3.8.59 the next release is v3.9.0, the long-term support line.",
  ],
};

// Diagram-local classes carry the `lr-` prefix (readme-diagram-theme.mjs → extraCss naming).
const EXTRA_CSS =
  `.lr-band{letter-spacing:0.12em}\n` +
  `.lr-core{fill:var(--accent-ink)}\n` +
  `.lr-runner{fill:var(--accent);stroke:var(--accent-ink);stroke-width:2}`;

// The glow pulse: the draft drew --accent-soft at 0.35 alpha under an opacity of 0.55 → 0.15;
// the kit's accent at the product of the two gives the same tint without a non-kit token.
const SPLINE = 'calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"';

function node(n) {
  const label =
    `\n  <text x="${n.x}" y="216" text-anchor="middle" class="mono" style="font-size:15px;fill:var(--ink)">${esc(n.v)}</text>` +
    `\n  <text x="${n.x}" y="240" text-anchor="middle" class="cell" style="fill:var(--muted)">${esc(n.l1)}</text>` +
    `\n  <text x="${n.x}" y="258" text-anchor="middle" class="cell" style="fill:var(--muted)">${esc(n.l2)}</text>`;
  if (n.kind === "lts") {
    return (
      `\n  <circle cx="${n.x}" cy="${RAIL_Y}" r="28" class="accent" opacity="0.19">` +
      `\n    <animate attributeName="r" values="22;30;22" dur="4s" repeatCount="indefinite" ${SPLINE}/>` +
      `\n    <animate attributeName="opacity" values="0.19;0.05;0.19" dur="4s" repeatCount="indefinite" ${SPLINE}/>` +
      `\n  </circle>` +
      `\n  <circle cx="${n.x}" cy="${RAIL_Y}" r="16" class="accent"/>` +
      `\n  <circle cx="${n.x}" cy="${RAIL_Y}" r="6" class="lr-core"/>${label}`
    );
  }
  const tone = n.kind === "prep" ? "stroke-ok" : "stroke-info";
  return `\n  <circle cx="${n.x}" cy="${RAIL_Y}" r="10" class="surface ${tone}" stroke-width="4"/>${label}`;
}

export async function renderReadmeLtsRail() {
  const C = LTS_RAIL_COPY;
  return outlineSvg(
    svgOpen({
      viewBox: `0 0 ${W} ${H}`,
      title:
        "OmniRoute release rail: v3.8.50 to v3.8.54 prepare, v3.8.55 to v3.8.59 validate, then v3.9.0 LTS.",
      desc: "A horizontal rail. The prepare window (v3.8.50 to v3.8.54) is a solid line, the validation window (v3.8.55 to v3.8.59, fixes, docs, translations and provider updates only) is a dashed line, and it ends at a pulsing v3.9.0 LTS node. A dot travels slowly along the rail from left to right. There is no v3.8.60.",
      extraCss: EXTRA_CSS,
    }) +
      `  <defs>\n    <path id="lr-rail" d="M ${RAIL_START} ${RAIL_Y} L ${RAIL_END} ${RAIL_Y}"/>\n  </defs>\n` +
      `  <rect class="bg" x="0" y="0" width="${W}" height="${H}" rx="16"/>\n` +
      `  <rect class="surface" x="24" y="24" width="1152" height="304" rx="12" stroke-width="1"/>\n` +
      // header
      `  <text x="60" y="60" class="kicker">${esc(C.kicker[0])}</text>\n` +
      `  <line x1="${afterKicker(60, C.kicker[0])}" y1="55" x2="1140" y2="55" class="rule" stroke-width="1"/>\n` +
      // window bands
      `  <text x="${RAIL_START}" y="108" class="h4 lr-band">${esc(C.bands[0])}</text>\n` +
      `  <text x="168" y="108" class="body">${esc(C.bandSubs[0])}</text>\n` +
      `  <text x="372" y="108" class="h4 lr-band">${esc(C.bands[1])}</text>\n` +
      `  <text x="480" y="108" class="body">${esc(C.bandSubs[1])}</text>\n` +
      `  <text x="${RAIL_END}" y="108" text-anchor="middle" class="h4 lr-band">${esc(C.bands[2])}</text>\n` +
      `  <line x1="${PREP_END}" y1="92" x2="${PREP_END}" y2="268" class="rule" stroke-width="1"/>\n` +
      `  <line x1="${VAL_END}" y1="92" x2="${VAL_END}" y2="268" class="rule" stroke-width="1"/>\n` +
      // the rail: solid prepare, dashed validate, accent LTS stub
      `  <path d="M ${RAIL_START} ${RAIL_Y} L ${PREP_END} ${RAIL_Y}" class="stroke-ok" fill="none" stroke-width="4" stroke-linecap="round"/>\n` +
      `  <path d="M ${PREP_END} ${RAIL_Y} L ${VAL_END} ${RAIL_Y}" class="stroke-info" fill="none" stroke-width="4" stroke-dasharray="12 8"/>\n` +
      `  <path d="M ${VAL_END} ${RAIL_Y} L ${RAIL_END} ${RAIL_Y}" class="stroke-accent" fill="none" stroke-width="4" stroke-linecap="round"/>\n` +
      // the travelling dot: 9 s along the rail, fades out at the LTS node, 1 s rest
      `  <circle r="7" class="lr-runner" opacity="0">\n` +
      `    <animateMotion dur="10s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1;1" keyTimes="0;0.9;1"><mpath href="#lr-rail"/></animateMotion>\n` +
      `    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;0.86;0.9;1" dur="10s" repeatCount="indefinite"/>\n` +
      `  </circle>` +
      NODES.map(node).join("\n") +
      "\n" +
      `  <text x="600" y="300" text-anchor="middle" class="body">${esc(C.footer[0])}</text>\n` +
      "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/readme-lts-rail.svg";
  const svg = await renderReadmeLtsRail();
  writeFileSync(out, svg);
  console.log(`readme-lts-rail → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
