// README hero in the Cheaper Inference UI Kit style (KEA-6307). The output is committed as
// docs/diagrams/readme-hero.svg; tests/unit/docs/readme-hero-svg.test.ts fails when the committed
// file no longer matches this generator, so a catalog or copy change cannot leave a stale picture.
//
//   node scripts/docs/gen-readme-hero.mjs [--out path.svg]      (npm run docs:readme-hero)
//
// Everything the hero draws lives in HERO_COPY: it is both the drawn text and what the
// outlining step shapes (scripts/docs/readme-outline.mjs). Numbers stay in
// <text> nodes because scripts/check/check-docs-counts-sync.mjs reads them from the raw file.
// The derived numbers (provider total, routing strategies, the free-offer label and the free-token
// pair) come from the facts snapshot through ./readmeFacts.mjs; 15–95% and $0 are copy, not facts.
// The free tokens are the short pair of the owner's decision D48 (2026-11-21): the big figure with
// its label and the real one, in ONE string, so no cut of the copy can show one without the other.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { outlineSvg } from "./readme-outline.mjs";
import { svgOpen, gridDefs, esc, roleWidth } from "./readme-diagram-theme.mjs";
import { RF } from "./readmeFacts.mjs";

// D48 short pair, owner's choice H-A (2026-11-24): "~11.3B as others count · ~90M real".
const TOKEN_PAIR = `${RF.rowSumTotalLabel} as others count · ${RF.headlineSteadyLabel} real`;

export const HERO_COPY = {
  kicker: ["OMNIROUTE — THE FREE AI GATEWAY"],
  headline: ["Never stop coding."],
  sub: [
    `Every AI tool → ${RF.providers} providers — ${RF.hasFreeLabel} with a free offer —`,
    "through one endpoint.",
  ],
  tools: [
    "Claude Code · Codex · Cursor · Cline · Copilot · Antigravity  →  FREE Claude / GPT / Gemini · auto-fallback",
  ],
  cmd: ["$ npm i -g omniroute"],
  foot: ["RTK + CAVEMAN · STACKED COMPRESSION · ONE ENDPOINT · /v1"],
  stats: [
    String(RF.providers),
    "AI PROVIDERS",
    RF.hasFreeLabel,
    "WITH A FREE OFFER",
    "15–95%",
    "TOKEN SAVINGS",
    String(RF.routingStrategies),
    "ROUTING STRATEGIES",
    TOKEN_PAIR,
    "FREE TOKENS / MONTH",
    "$0",
    "TO START",
  ],
};

export async function renderReadmeHero() {
  const C = HERO_COPY;
  // Right column on a kit card (surface, border, 12px radius, accent edge): the first four stats
  // in a 2 × 2 grid, then the free-token pair on a row of its own (it is one string and needs the
  // card's width, so it is set in the secondary figure role), then "$0 to start".
  const cardX = 760;
  const cardY = 96;
  const cardW = 380;
  const cardH = 356;
  const at = [
    { x: cardX + 32, y: cardY + 64, cls: "num" },
    { x: cardX + 212, y: cardY + 64, cls: "num" },
    { x: cardX + 32, y: cardY + 148, cls: "num" },
    { x: cardX + 212, y: cardY + 148, cls: "num" },
    { x: cardX + 32, y: cardY + 222, cls: "num-sm" },
    { x: cardX + 32, y: cardY + 306, cls: "num" },
  ];
  if (at.length * 2 !== C.stats.length) {
    throw new Error(`readme-hero: ${C.stats.length / 2} stats for ${at.length} card slots`);
  }
  const pairWidth = roleWidth("num-sm", C.stats[8]);
  if (cardX + 32 + pairWidth > cardX + cardW - 16) {
    throw new Error(
      `readme-hero: the free-token pair "${C.stats[8]}" (${Math.ceil(pairWidth)} px) no longer fits the card`
    );
  }
  const stats = at.map(
    ({ x, y, cls }, i) =>
      `  <text x="${x}" y="${y}" class="${cls}">${esc(C.stats[2 * i])}</text>\n` +
      `  <text x="${x}" y="${y + 24}" class="lbl">${esc(C.stats[2 * i + 1])}</text>`
  );

  return outlineSvg(
    svgOpen({
      viewBox: "0 0 1200 548",
      title: `OmniRoute — Never stop coding. Every AI tool to ${RF.providers} providers, ${RF.hasFreeLabel} with a free offer, through one endpoint. Free tokens a month: ${TOKEN_PAIR}.`,
      desc: `Hero card in the Cheaper Inference UI Kit style: Switzer drawn as outlines, IBM Plex Mono for the install command. Claims: ${RF.providers} AI providers, ${RF.hasFreeLabel} providers with a free offer, free tokens a month ${TOKEN_PAIR}, 15–95% token savings, ${RF.routingStrategies} routing strategies, $0 to start. Light and dark follow the viewer's color scheme.`,
    }) +
      gridDefs("heroGrid") +
      `  <rect class="bg" x="0" y="0" width="1200" height="548"/>\n` +
      `  <rect x="0" y="0" width="1200" height="548" fill="url(#heroGrid)"/>\n` +
      `  <text x="60" y="110" class="kicker">${esc(C.kicker[0])}</text>\n` +
      `  <text x="60" y="206" class="headline">${esc(C.headline[0])}</text>\n` +
      `  <line x1="60" y1="236" x2="300" y2="236" class="rule" stroke-width="1"/>\n` +
      `  <circle cx="60" cy="236" r="5" class="accent">` +
      `<animate attributeName="opacity" values="1;0.35;1" dur="3s" repeatCount="indefinite"/></circle>\n` +
      `  <text x="60" y="284" class="sub">${esc(C.sub[0])}</text>\n` +
      `  <text x="60" y="316" class="sub">${esc(C.sub[1])}</text>\n` +
      `  <text x="60" y="350" class="body">${esc(C.tools[0])}</text>\n` +
      `  <rect x="60" y="392" width="262" height="44" rx="8" class="accent"/>\n` +
      `  <text x="80" y="420" class="cmd">${esc(C.cmd[0])}</text>\n` +
      `  <text x="60" y="490" class="foot">${esc(C.foot[0])}</text>\n` +
      `  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="12" class="surface" stroke-width="1"/>\n` +
      `  <rect x="${cardX}" y="${cardY}" width="6" height="${cardH}" rx="3" class="accent"/>\n` +
      stats.join("\n") +
      "\n</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/readme-hero.svg";
  const svg = await renderReadmeHero();
  writeFileSync(out, svg);
  console.log(`hero → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
