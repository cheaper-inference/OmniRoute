// README hero in the Cheaper Inference UI Kit style (KEA-6307). The output is committed as
// docs/diagrams/readme-hero.svg; tests/unit/docs/readme-hero-svg.test.ts fails when the committed
// file no longer matches this generator, so a catalog or copy change cannot leave a stale picture.
//
//   node scripts/docs/gen-readme-hero.mjs [--out path.svg]      (npm run docs:readme-hero)
//
// Everything the hero draws lives in HERO_COPY: it is both the drawn text and what the
// outlining step shapes (scripts/docs/readme-outline.mjs). Numbers stay in
// <text> nodes because scripts/check/check-docs-counts-sync.mjs reads them from the raw file.
// The derived stats come from the facts snapshot through ./readmeFacts.mjs.
// The starred total is drawn in the stats grid, with its definition in the card footer.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { outlineSvg } from "./readme-outline.mjs";
import { svgOpen, gridDefs, esc, roleWidth } from "./readme-diagram-theme.mjs";
import { RF } from "./readmeFacts.mjs";

const TOKEN_DESCRIPTION = `${RF.rowSumTotalLabel} summed across every catalog row, ended offers included; ${RF.headlineSteadyLabel} counting each shared quota once.`;

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
    `${RF.rowSumTotalLabel}*`,
    "FREE TOKENS / MONTH",
    "15–95%",
    "TOKEN SAVINGS",
    String(RF.routingStrategies),
    "ROUTING STRATEGIES",
    "$0",
    "TO START",
  ],
  tokenNote: [
    `* row sum, ended offers included · ${RF.headlineSteadyLabel} counting each shared quota once`,
  ],
};

export async function renderReadmeHero() {
  const C = HERO_COPY;
  // Six stats in two columns, with the full-width footnote inside the card.
  const cardX = 744;
  const cardY = 96;
  const cardW = 396;
  const cardH = 356;
  const noteX = cardX + 24;
  const noteMax = cardW - 40;
  const noteWidth = roleWidth("lbl", C.tokenNote[0]);
  if (noteWidth > noteMax) {
    throw new Error(
      `readme-hero: the free-token footnote is ${Math.ceil(noteWidth)} px wide and exceeds the ${noteMax} px available in the card`
    );
  }
  const stats = [];
  for (let i = 0; i < C.stats.length; i += 2) {
    const col = (i / 2) % 2;
    const row = Math.floor(i / 4);
    const x = cardX + 32 + col * 180;
    const y = cardY + 64 + row * 84;
    stats.push(
      `  <text x="${x}" y="${y}" class="num">${esc(C.stats[i])}</text>\n` +
        `  <text x="${x}" y="${y + 24}" class="lbl">${esc(C.stats[i + 1])}</text>`
    );
  }

  return outlineSvg(
    svgOpen({
      viewBox: "0 0 1200 548",
      title: `OmniRoute — Never stop coding. Every AI tool to ${RF.providers} providers, ${RF.hasFreeLabel} with a free offer, through one endpoint. Free tokens a month: ${TOKEN_DESCRIPTION}`,
      desc: `Hero card in the Cheaper Inference UI Kit style: Switzer drawn as outlines, IBM Plex Mono for the install command. Claims: ${RF.providers} AI providers, ${RF.hasFreeLabel} providers with a free offer, 15–95% token savings, ${RF.routingStrategies} routing strategies, $0 to start. Free tokens a month: ${TOKEN_DESCRIPTION} Light and dark follow the viewer's color scheme.`,
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
      `\n  <line x1="${noteX}" y1="384" x2="${noteX + noteMax}" y2="384" class="rule" stroke-width="1"/>\n` +
      `  <text x="${noteX}" y="412" class="lbl">${esc(C.tokenNote[0])}</text>\n` +
      "</svg>\n"
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
