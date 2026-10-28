// README strategies grid (18 of the 20 combo routing strategies, one animated tile each) in the
// Cheaper Inference UI Kit style (KEA-6307). The output is committed as
// docs/diagrams/strategies-grid.svg; tests/unit/docs/readme-strategies-grid-svg.test.ts fails
// when the committed file no longer matches this generator, so a stale picture cannot ship.
//
//   node scripts/docs/gen-readme-strategies-grid.mjs [--out path.svg]
//
// Every tile is rendered from the TILES data below (name, caption, four target slots, the
// request dots and their windows); STRATEGIES_GRID_COPY (derived from it) is both the drawn text
// and the subset input for the embedded fonts. The "16-factor" claim stays in <text> because
// scripts/check/check-docs-counts-sync.mjs reads it from the raw file. The grid shows 18 of the
// 20 strategies by design — the README table next to it carries cache-optimized and
// quota-weighted; do not add or remove tiles here.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildFontFaceCss } from "./readme-fonts.mjs";
import { svgOpen, gridDefs, esc } from "./readme-diagram-theme.mjs";

// Slot geometry inside a 173 × 158 tile: the request leaves (26,79), the four targets sit at
// SLOT_Y; tracks end at the slot edge, dots stop just before it.
const SLOT_Y = [43.5, 67.5, 91.5, 115.5];
const SLOT_X = 112;
const TRACK_END = 108;
const DOT_END = 106;
const track = (i, end = TRACK_END, from = "62,79 84") =>
  `M 26,79 C ${from},${SLOT_Y[i]} ${end},${SLOT_Y[i]}`;

// tracks: per slot — "solid" | "dashed" | "faint" | "" (none) | ["solid", width, opacity].
// dots: [slotIndex | pathString, start, end, tone?, r?] — start/end null = the simple ride.
const TILES = [
  {
    name: "priority",
    caption: "drain the 1st, then the next",
    dur: 3.6,
    tracks: ["solid", "dashed", "dashed", "dashed"],
    picks: [0],
    dots: [[0, null, null]],
  },
  {
    name: "fill-first",
    caption: "fill T1’s quota, then move on",
    dur: 3.6,
    tracks: ["solid", "dashed", "", ""],
    picks: [0],
    bars: [15.8, 3.3, 0, 0],
    dots: [[0, null, null]],
  },
  {
    name: "weighted",
    caption: "weighted random pick",
    dur: 3.6,
    tracks: [["solid", 2.6, 0.5], ["solid", 1.6, 0.35], ["solid", 1, 0.22], "faint"],
    picks: [0],
    tags: ["60%", "30%", "10%", ""],
    dots: [
      [0, 0.04, 0.3],
      [1, 0.4, 0.62],
      [0, 0.7, 0.92],
    ],
  },
  {
    name: "round-robin",
    caption: "cycle in order 1→2→3→4",
    dur: 4.0,
    tracks: ["solid", "solid", "solid", "solid"],
    picks: [],
    dots: [
      [0, 0.05, 0.21],
      [1, 0.29, 0.45],
      [2, 0.53, 0.69],
      [3, 0.77, 0.93],
    ],
  },
  {
    name: "p2c",
    caption: "pick 2, take the lighter",
    dur: 3.6,
    tracks: ["", "dashed", "", "dashed"],
    picks: [1],
    tags: ["", "20%", "", "65%"],
    dots: [
      [1, 0.05, 0.24],
      [3, 0.05, 0.24],
      [1, 0.4, 0.68, "ok"],
    ],
  },
  {
    name: "least-used",
    caption: "lowest current load wins",
    dur: 3.6,
    tracks: ["", "solid", "", ""],
    picks: [1],
    bars: [16.5, 4.4, 12.1, 8.8],
    tags: ["75%", "20%", "55%", "40%"],
    dots: [[1, null, null]],
  },
  {
    name: "random",
    caption: "uniform random (deduped)",
    dur: 4.0,
    tracks: ["faint", "faint", "faint", "faint"],
    picks: [],
    dots: [
      [2, 0.05, 0.2],
      [0, 0.28, 0.43],
      [3, 0.51, 0.66],
      [1, 0.74, 0.89],
    ],
  },
  {
    name: "strict-random",
    caption: "pure random — repeats ok",
    dur: 4.0,
    tracks: ["faint", "faint", "faint", "faint"],
    picks: [],
    tags: ["", "×2!", "", ""],
    dots: [
      [1, 0.05, 0.2],
      [1, 0.28, 0.43],
      [3, 0.51, 0.66],
      [0, 0.74, 0.89],
    ],
  },
  {
    name: "cost-optimized",
    caption: "cheapest $ per request",
    dur: 3.6,
    tracks: ["", "", "", "solid"],
    picks: [3],
    tags: ["$9", "$3", "$0.5", "FREE"],
    dots: [[3, null, null, "ok"]],
  },
  {
    name: "headroom",
    caption: "most remaining quota",
    dur: 3.6,
    tracks: ["", "solid", "", ""],
    picks: [1],
    bars: [2.2, 17.6, 8.8, 13.2],
    tags: ["10%", "80%", "40%", "60%"],
    dots: [[1, null, null]],
  },
  {
    name: "reset-window",
    caption: "resets soonest → use it",
    dur: 3.6,
    tracks: ["", "solid", "", ""],
    picks: [1],
    tags: ["58m", "2m!", "31m", "12h"],
    dots: [[1, null, null]],
  },
  {
    name: "reset-aware",
    caption: "rank by reset — short first",
    dur: 3.6,
    tracks: ["dashed", "solid", "dashed", ""],
    picks: [1],
    tags: ["3rd", "1st", "2nd", "4th"],
    dots: [
      [1, 0.05, 0.28],
      [2, 0.42, 0.62],
    ],
  },
  {
    name: "context-relay",
    caption: "hand off long context",
    dur: 4.0,
    tracks: ["solid", "", "", ""],
    extraTracks: [`M ${TRACK_END},43.5 C 92,43.5 92,67.5 ${TRACK_END},67.5`],
    picks: [0, 1],
    dots: [
      [
        `M 26,79 C 62,79 84,43.5 ${DOT_END},43.5 C 90,43.5 90,67.5 ${DOT_END},67.5`,
        0.05,
        0.6,
        "ink",
        3.2,
      ],
    ],
  },
  {
    name: "context-optimized",
    caption: "fit the context size",
    dur: 3.6,
    tracks: ["", "solid", "", ""],
    picks: [1],
    tags: ["8K", "200K", "32K", "128K"],
    dots: [[1, null, null, "ink", 3.4]],
  },
  {
    name: "lkgp",
    caption: "sticky to last success",
    dur: 3.6,
    tracks: ["", "solid", "", ""],
    picks: [1],
    check: 1,
    dots: [
      [1, 0.05, 0.28],
      [1, 0.45, 0.68],
    ],
  },
  {
    name: "auto",
    caption: "live 16-factor scoring",
    dur: 3.6,
    tracks: ["", "solid", "", ""],
    picks: [1],
    tags: ["72", "91", "64", "55"],
    dots: [[1, null, null]],
  },
  {
    name: "fusion",
    caption: "panel + judge → one answer",
    dur: 4.2,
    tracks: ["dashed", "dashed", "dashed", ""],
    picks: [0, 1, 2],
    judge: true,
    dots: [
      [0, 0.05, 0.25],
      [1, 0.05, 0.25],
      [2, 0.05, 0.25],
      [`M ${DOT_END},43.5 C 84,43.5 62,79 30,79`, 0.35, 0.55, "ok", 2.2],
      [`M ${DOT_END},67.5 C 84,67.5 62,79 30,79`, 0.35, 0.55, "ok", 2.2],
      [`M ${DOT_END},91.5 C 84,91.5 62,79 30,79`, 0.35, 0.55, "ok", 2.2],
    ],
  },
  {
    name: "pipeline",
    caption: "each output feeds the next",
    dur: 4.2,
    tracks: ["", "", "", ""],
    extraTracks: [
      track(0, TRACK_END, "56,79 80"),
      `M ${SLOT_X + 26},43.5 C 154,43.5 154,67.5 ${SLOT_X + 26},67.5`,
      `M ${SLOT_X},67.5 C 92,67.5 92,91.5 ${SLOT_X},91.5`,
    ],
    picks: [0, 1, 2],
    tags: ["1", "2", "3", ""],
    tagsInside: true,
    dots: [
      [track(0, DOT_END, "56,79 80"), 0.05, 0.22],
      [`M ${SLOT_X + 26},43.5 C 154,43.5 154,67.5 ${SLOT_X + 26},67.5`, 0.28, 0.45],
      [`M ${SLOT_X},67.5 C 92,67.5 92,91.5 ${SLOT_X},91.5`, 0.51, 0.68],
    ],
  },
];

export const STRATEGIES_GRID_COPY = {
  kicker: ["COMBO ROUTING · 18 OF 20 STRATEGY FLOWS"],
  legend: [
    "● request → ▮ targets — each tile animates the path its strategy takes · ",
    "green outline = the pick",
  ],
  names: TILES.map((t) => t.name),
  captions: TILES.map((t) => t.caption),
  tags: [...new Set(TILES.flatMap((t) => t.tags || []).filter(Boolean))],
};

const n = (v) => String(Math.round(v * 1000) / 1000);

function trackPath(d, style) {
  if (!style) return "";
  if (Array.isArray(style)) {
    const [, w, op] = style;
    return `<path d="${d}" fill="none" class="stroke-ink" stroke-opacity="${op}" stroke-width="${w}"/>`;
  }
  if (style === "solid")
    return `<path d="${d}" fill="none" class="stroke-ink" stroke-opacity="0.35" stroke-width="1.6"/>`;
  if (style === "dashed")
    return `<path d="${d}" fill="none" style="stroke:var(--muted)" stroke-opacity="0.6" stroke-width="1.1" stroke-dasharray="3 3"/>`;
  return `<path d="${d}" fill="none" class="rule" stroke-width="1.1"/>`;
}

function dot([where, start, end, t = "ink", r = 2.8], begin, dur) {
  const path = typeof where === "number" ? track(where, DOT_END) : where;
  const b = `begin="${begin}s" dur="${dur}s" repeatCount="indefinite"`;
  if (start == null) {
    return (
      `<circle r="${r}" class="${t}" opacity="0"><animateMotion path="${path}" ${b}/>` +
      `<animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.02;0.3;0.34;1" ${b}/></circle>`
    );
  }
  return (
    `<circle r="${r}" class="${t}" opacity="0"><animateMotion path="${path}" ${b} keyPoints="0;0;1;1" keyTimes="0;${n(start)};${n(end)};1" calcMode="linear"/>` +
    `<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${n(start)};${n(start + 0.02)};${n(end - 0.02)};${n(end)};1" ${b}/></circle>`
  );
}

function tile(T, i) {
  const col = i % 6;
  const row = Math.floor(i / 6);
  const begin = n(0.22 * i);
  const dur = T.dur.toFixed(1);
  const parts = [];
  // The one lime moment per tile: the request origin.
  parts.push(
    `<circle cx="20" cy="79" r="4" class="accent stroke-ink" stroke-width="1.6"/><circle cx="20" cy="79" r="1.6" class="ink"/>`
  );
  T.tracks.forEach((style, k) => parts.push(trackPath(track(k), style)));
  for (const d of T.extraTracks || []) parts.push(trackPath(d, "solid"));
  SLOT_Y.forEach((y, k) => {
    const picked = T.picks.includes(k);
    parts.push(
      `<rect x="${SLOT_X}" y="${y - 5.5}" width="26" height="11" rx="2.5" class="surface-subtle${picked ? " stroke-ok" : ""}"${picked ? "" : ' style="stroke:var(--border)"'} stroke-width="1"/>`
    );
    const bar = T.bars?.[k];
    if (bar)
      parts.push(
        `<rect x="${SLOT_X + 2}" y="${y - 3}" width="${bar}" height="6" rx="1.5" class="info" fill-opacity="0.75"/>`
      );
    const tag = T.tags?.[k];
    if (tag) {
      parts.push(
        T.tagsInside
          ? `<text x="${SLOT_X + 13}" y="${y + 3.5}" text-anchor="middle" class="mono-xs" style="fill:var(--ink)">${esc(tag)}</text>`
          : `<text x="${SLOT_X + 31}" y="${y + 3}" class="mono-xs">${esc(tag)}</text>`
      );
    }
    if (T.check === k)
      parts.push(
        `<g transform="translate(${SLOT_X + 9},${y - 4})" class="stroke-ok" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M 0,4 L 3,7 L 8,1"/></g>`
      );
  });
  if (T.judge)
    parts.push(
      `<g transform="translate(44,72)"><path d="M 8,0 L 16,7 L 8,14 L 0,7 Z" fill="none" class="stroke-warn" stroke-width="1.4"/></g>`
    );
  for (const d of T.dots) parts.push(dot(d, begin, dur));
  return (
    `  <g transform="translate(${40 + col * 189},${104 + row * 176})">\n` +
    `    <rect width="173" height="158" rx="10" class="surface" stroke-width="1"/>\n` +
    `    <text x="12" y="21" class="mono-sm" style="fill:var(--ink)">${esc(T.name)}</text>\n` +
    `    ${parts.join("")}\n` +
    `    <text x="12" y="148" class="small">${esc(T.caption)}</text>\n` +
    `  </g>\n`
  );
}

export async function renderStrategiesGrid() {
  const C = STRATEGIES_GRID_COPY;
  const { css } = await buildFontFaceCss({
    ui: [...C.legend, ...C.captions].join(""),
    mono: [...C.kicker, ...C.names, ...C.tags].join(""),
  });

  return (
    svgOpen({
      viewBox: "0 0 1200 644",
      title:
        "Animated examples for 18 of OmniRoute's 20 combo routing strategies. The cache-optimized and quota-weighted strategies are documented in the adjacent routing table.",
      desc: "Animated grid of 18 routing-strategy tiles; static tracks show each flow on the first frame while a small dot repeatedly travels the path each illustrated strategy takes. Light and dark follow the viewer's color scheme.",
      fontFaceCss: css,
    }) +
    gridDefs("sg-grid") +
    `  <rect class="bg" x="0" y="0" width="1200" height="644"/>\n` +
    `  <rect x="0" y="0" width="1200" height="644" fill="url(#sg-grid)"/>\n` +
    `  <text x="40" y="52" class="kicker">${esc(C.kicker[0])}</text>\n` +
    `  <line x1="430" y1="47" x2="1160" y2="47" class="rule" stroke-width="1"/>\n` +
    `  <text x="40" y="80" class="body">${esc(C.legend[0])}<tspan style="fill:var(--ok)">${esc(C.legend[1])}</tspan></text>\n` +
    TILES.map(tile).join("") +
    "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/strategies-grid.svg";
  const svg = await renderStrategiesGrid();
  writeFileSync(out, svg);
  console.log(`strategies-grid → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
