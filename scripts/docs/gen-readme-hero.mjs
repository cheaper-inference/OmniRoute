// README hero in the Cheaper Inference UI Kit style (KEA-6307). The output is committed as
// docs/diagrams/readme-hero.svg; tests/unit/docs/readme-hero-svg.test.ts fails when the committed
// file no longer matches this generator, so a catalog or copy change cannot leave a stale picture.
//
//   node scripts/docs/gen-readme-hero.mjs [--out path.svg]      (npm run docs:readme-hero)
//
// Everything the hero draws lives in HERO_COPY: it is both the drawn text and the subset input
// for the embedded fonts, so a glyph can never be drawn without being embedded. Numbers stay in
// <text> nodes because scripts/check/check-docs-counts-sync.mjs reads them from the raw file.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildFontFaceCss } from "./readme-fonts.mjs";
import { svgOpen, gridDefs, esc } from "./readme-diagram-theme.mjs";

export const HERO_COPY = {
  kicker: ["OMNIROUTE — THE FREE AI GATEWAY"],
  headline: ["Never stop coding."],
  sub: ["Every AI tool → 380 providers — 150+ free —", "through one endpoint."],
  tools: [
    "Claude Code · Codex · Cursor · Cline · Copilot · Antigravity  →  FREE Claude / GPT / Gemini · auto-fallback",
  ],
  cmd: ["$ npm i -g omniroute"],
  foot: ["RTK + CAVEMAN · STACKED COMPRESSION · ONE ENDPOINT · /v1"],
  stats: [
    "380",
    "AI PROVIDERS",
    "150+",
    "FREE TIERS",
    "~1.62B",
    "FREE TOKENS / MO",
    "15–95%",
    "TOKEN SAVINGS",
    "20",
    "ROUTING STRATEGIES",
    "$0",
    "TO START",
  ],
};

export async function renderReadmeHero() {
  const C = HERO_COPY;
  const { css } = await buildFontFaceCss({
    display: C.headline.join(""),
    ui: [...C.sub, ...C.tools].join(""),
    mono: [...C.kicker, ...C.cmd, ...C.foot, ...C.stats].join(""),
  });

  // Right column: 2 × 3 stats on a kit card (surface, border, 12px radius, lime edge).
  const cardX = 760;
  const cardY = 96;
  const cardW = 380;
  const cardH = 356;
  const stats = [];
  for (let i = 0; i < C.stats.length; i += 2) {
    const col = (i / 2) % 2;
    const row = Math.floor(i / 4);
    const x = cardX + 32 + col * 180;
    const y = cardY + 72 + row * 104;
    stats.push(
      `  <text x="${x}" y="${y}" class="num">${esc(C.stats[i])}</text>\n` +
        `  <text x="${x}" y="${y + 24}" class="lbl">${esc(C.stats[i + 1])}</text>`
    );
  }

  return (
    svgOpen({
      viewBox: "0 0 1200 548",
      title:
        "OmniRoute — Never stop coding. Every AI tool to 380 providers, 150+ free, through one endpoint.",
      desc: "Hero card in the Cheaper Inference UI Kit style: Instrument Serif headline, Inter body, IBM Plex Mono figures. Claims: 380 AI providers, 150+ free tiers, ~1.62B free tokens per month, 15–95% token savings, 20 routing strategies, $0 to start. Light and dark follow the viewer's color scheme.",
      fontFaceCss: css,
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
