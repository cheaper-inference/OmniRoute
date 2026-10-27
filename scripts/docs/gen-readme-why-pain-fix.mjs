// README "why OmniRoute" ledger in the Cheaper Inference UI Kit style (KEA-6307): ten
// pain-versus-fix rows, fully readable on the first frame, with a soft ok-tinted highlight
// sweeping down the rows on a 15 s cycle. Output is committed as docs/diagrams/why-pain-fix.svg;
// tests/unit/docs/readme-why-pain-fix-svg.test.ts fails when the committed file no longer
// matches this generator.
//
//   node scripts/docs/gen-readme-why-pain-fix.mjs [--out path.svg]
//
// Everything the ledger draws lives in WHY_PAIN_FIX_COPY: it is both the drawn text and the
// subset input for the embedded fonts, so a glyph can never be drawn without being embedded.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildFontFaceCss } from "./readme-fonts.mjs";
import { svgOpen, gridDefs, esc } from "./readme-diagram-theme.mjs";

export const WHY_PAIN_FIX_COPY = {
  kicker: ["WHY OMNIROUTE"],
  headline: ["Stop juggling ", ", ", ", and ", "."],
  headlineMarks: ["10 dashboards", "dead API keys", "surprise bills"],
  columns: ["THE DAILY PAIN", "HOW OMNIROUTE FIXES IT"],
  pains: [
    "Subscription quota expires unused every month",
    "Rate limits stop you mid-coding",
    "Tool outputs (git diff, grep, logs) burn tokens",
    "Expensive APIs — $20–50/mo per provider",
    "Each AI tool wants its own setup",
    "AI blocked in your country",
    "Dead keys and banned accounts kill your flow",
    "One subscription, a whole team fighting over it",
    "Your prompts routed through someone else's cloud",
    "No idea where tokens and money go",
  ],
  fixLeads: [
    "Maximize subscriptions",
    "4-tier auto-fallback",
    "RTK + Caveman compression",
    "Cost-optimized routing",
    "One endpoint",
    "3-level proxy + TLS stealth",
    "3-layer resilience",
    "Key pools",
    "Local-first",
    "Live analytics",
  ],
  fixRests: [
    " — track quota, use every token before reset",
    " — Subscription → API → Cheap → Free, in ms",
    " — save 15–95% eligible tokens",
    " — auto-route to the cheapest viable model",
    " — every tool, one config, one dashboard",
    " — use AI from anywhere",
    " — circuit breakers, key cooldown, model lockout",
    " — fair-share quotas per member, hot-path enforced",
    " — your machine, keys encrypted (AES-256-GCM)",
    " — usage, quota, savings & p95 latency per provider",
  ],
};

const W = 1200;
const H = 664;
const ROW_TOP = 170;
const ROW_H = 46;
const ROWS = 10;
const PAIN_X = 72;
const FIX_X = 660;
const DIVIDER_X = 612;

export async function renderReadmeWhyPainFix() {
  const C = WHY_PAIN_FIX_COPY;
  const { css } = await buildFontFaceCss({
    ui: [...C.headline, ...C.pains, ...C.fixRests].join(""),
    uiBold: [...C.headlineMarks, ...C.fixLeads].join(""),
    mono: [...C.kicker, ...C.columns].join(""),
  });

  const rowYs = Array.from({ length: ROWS }, (_, i) => ROW_TOP + i * ROW_H);
  const separators = rowYs
    .slice(1)
    .map((y) => `    <line x1="40" y1="${y}" x2="1160" y2="${y}"/>`)
    .join("\n");
  const painMarks = rowYs
    .map(
      (y) =>
        `    <g transform="translate(48,${y + 18})"><line x1="0" y1="0" x2="8" y2="8"/><line x1="8" y1="0" x2="0" y2="8"/></g>`
    )
    .join("\n");
  const fixMarks = rowYs
    .map(
      (y) => `    <g transform="translate(632,${y + 17})"><path d="M 0,6 L 4,10 L 11.5,1.5"/></g>`
    )
    .join("\n");
  const painTexts = rowYs
    .map(
      (y, i) =>
        `    <text x="${PAIN_X}" y="${y + 27}" class="body" style="fill:var(--body)">${esc(C.pains[i])}</text>`
    )
    .join("\n");
  const fixTexts = rowYs
    .map(
      (y, i) =>
        `    <text x="${FIX_X}" y="${y + 27}" class="body"><tspan font-weight="600" style="fill:var(--ok)">${esc(C.fixLeads[i])}</tspan>${esc(C.fixRests[i])}</text>`
    )
    .join("\n");

  // Sweep beat: discrete y steps every 1.5 s over the ten rows, same keyTimes as before; the
  // highlight is the kit's ok tint, faded in/out at the loop seam.
  const sweepValues = rowYs.join(";");
  const sweepKeyTimes = rowYs.map((_, i) => String(+(i / ROWS).toFixed(3))).join(";");

  const marks = C.headlineMarks;
  return (
    svgOpen({
      viewBox: `0 0 ${W} ${H}`,
      title:
        "Why OmniRoute — stop juggling 10 dashboards, dead API keys and surprise bills. Ten daily pains and how OmniRoute fixes each: subscription quota expiring unused — maximize subscriptions, track quota and use every token before reset. Rate limits stopping you mid-coding — 4-tier auto-fallback from Subscription to API to Cheap to Free in milliseconds. Tool outputs like git diff, grep and logs burning tokens — RTK + Caveman compression saves 15 to 95 percent of eligible tokens per request. Expensive APIs at 20 to 50 dollars per month per provider — cost-optimized routing to the cheapest viable model. Each AI tool wanting its own setup — one endpoint, every tool, one dashboard. AI blocked in your country — 3-level proxy plus TLS fingerprint stealth. Dead keys and banned accounts killing your flow — 3-layer resilience with circuit breakers, key cooldown and model lockout. One subscription shared by a whole team — key pools with fair-share quotas per member enforced in the hot path. Prompts routed through someone else's cloud — local-first, runs on your machine with AES-256-GCM encrypted keys. No idea where tokens and money go — live analytics with usage, quota, savings and p95 latency per provider.",
      desc: "Animated comparison ledger: ten pain-versus-fix rows are fully readable on the first frame; a soft highlight sweeps down the rows in a continuous cycle.",
      fontFaceCss: css,
    }) +
    gridDefs("wpf-grid") +
    `  <rect class="bg" x="0" y="0" width="${W}" height="${H}"/>\n` +
    `  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#wpf-grid)"/>\n` +
    // header
    `  <text x="40" y="56" class="kicker">${esc(C.kicker[0])}</text>\n` +
    `  <line x1="200" y1="51" x2="1160" y2="51" class="rule" stroke-width="1"/>\n` +
    `  <text x="40" y="100" class="sub">${esc(C.headline[0])}` +
    `<tspan font-weight="600" style="fill:var(--err)">${esc(marks[0])}</tspan>${esc(C.headline[1])}` +
    `<tspan font-weight="600" style="fill:var(--warn)">${esc(marks[1])}</tspan>${esc(C.headline[2])}` +
    `<tspan font-weight="600" style="fill:var(--err)">${esc(marks[2])}</tspan>${esc(C.headline[3])}</text>\n` +
    // column headers
    `  <g transform="translate(48,138)" class="stroke-err" stroke-width="2.4" fill="none" stroke-linecap="round">` +
    `<line x1="0" y1="0" x2="11" y2="11"/><line x1="11" y1="0" x2="0" y2="11"/></g>\n` +
    `  <text x="${PAIN_X}" y="149" class="kicker" style="fill:var(--err)">${esc(C.columns[0])}</text>\n` +
    `  <g transform="translate(632,137)" class="stroke-ok" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M 0,7 L 4.5,11.5 L 13,2"/></g>\n` +
    `  <text x="${FIX_X}" y="149" class="kicker" style="fill:var(--ok)">${esc(C.columns[1])}</text>\n` +
    `  <line x1="40" y1="166" x2="1160" y2="166" class="rule" stroke-width="1"/>\n` +
    // sweeping row highlight (invisible on the first frame)
    `  <rect x="40" y="${ROW_TOP}" width="1120" height="${ROW_H}" class="ok-bg" opacity="0">\n` +
    `    <animate attributeName="y" calcMode="discrete" values="${sweepValues}" keyTimes="${sweepKeyTimes}" dur="15s" repeatCount="indefinite"/>\n` +
    `    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.015;0.985;1" dur="15s" repeatCount="indefinite"/>\n` +
    `  </rect>\n` +
    // rows
    `  <g class="rule" stroke-width="1" stroke-opacity="0.5">\n${separators}\n` +
    `    <line x1="${DIVIDER_X}" y1="${ROW_TOP}" x2="${DIVIDER_X}" y2="630"/>\n  </g>\n` +
    `  <g class="stroke-err" stroke-opacity="0.85" stroke-width="2" fill="none" stroke-linecap="round">\n${painMarks}\n  </g>\n` +
    `  <g class="stroke-ok" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">\n${fixMarks}\n  </g>\n` +
    `  <g>\n${painTexts}\n  </g>\n` +
    `  <g>\n${fixTexts}\n  </g>\n` +
    "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/why-pain-fix.svg";
  const svg = await renderReadmeWhyPainFix();
  writeFileSync(out, svg);
  console.log(`why-pain-fix → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
