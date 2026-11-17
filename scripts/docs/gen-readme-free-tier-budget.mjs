// README free-tier budget card in the Cheaper Inference UI Kit style (KEA-6307). Every figure
// comes from the catalog through computeFreeModelTotals() — the same loader the counts gate, the
// dashboard and scripts/research/gen-budget-card-svg.mjs use — so the picture cannot rot by hand
// again (controller ruling R4). Provider names come from AI_PROVIDERS. The catalog is read at
// RELEASE time, not here: the facts probe reduces it to the rows this card draws
// (scripts/docs/readmeFactsFreeTier.mjs) and stores them in the facts snapshot as
// `code.freeTierBudget`; this generator draws from the snapshot (scripts/docs/readmeFacts.mjs), so
// regenerating on any branch reproduces the committed card and only `npm run
// release:refresh-derived` moves it. Output is committed as docs/diagrams/free-tier-budget.svg;
// tests/unit/docs/readme-free-tier-budget-svg.test.ts fails when the committed file no longer
// matches this generator, and runs the counts gate's own validators on it (catalog entries,
// recurring pools, canonical numbers).
//
//   node scripts/docs/gen-readme-free-tier-budget.mjs [--out path.svg]
//
// buildFreeTierBudgetCopy() returns every string the card draws, formatted exactly as drawn: it is
// both the drawn text and what the outlining step shapes. Numbers stay in <text> nodes
// because scripts/check/check-docs-counts-sync.mjs reads them from the raw file.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { outlineSvg } from "./readme-outline.mjs";
import { svgOpen, gridDefs, esc, roleWidth } from "./readme-diagram-theme.mjs";
import { README_FACTS } from "./readmeFacts.mjs";

const W = 1200;
const H = 842;
const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

// Figures as the card draws them: billions with two decimals, millions with one decimal below
// 10M (7.2M, 4.8M — the card's own fmt() would round them to 7M/5M), thousands rounded. A value
// that rounds up to the next unit rolls over (999,999 → 1M, 999.6M → 1.00B), never "1000K".
function scaleTokens(n) {
  if (n < 1e6) {
    const k = Math.round(n / 1e3);
    if (k < 1000) return { k };
    n = k * 1e3;
  }
  if (n < 1e9) {
    const m = n >= 1e7 ? Math.round(n / 1e6) : Math.round(n / 1e5) / 10;
    if (m < 1000) return { m };
    n = m * 1e6;
  }
  return { b: (n / 1e9).toFixed(2) };
}
export function fmtTokens(n) {
  const s = scaleTokens(n);
  return s.b != null ? `${s.b}B` : s.m != null ? `${s.m}M` : `${s.k}K`;
}

// The same figure spelled out for the accessible title ("1.62 billion", "1 billion", "210 million").
export function fmtWords(n) {
  const s = scaleTokens(n);
  if (s.b != null) return `${s.b.replace(/\.?0+$/, "")} billion`;
  return s.m != null ? `${s.m} million` : `${s.k} thousand`;
}

// A pool grid cell: 280 px column, a 12 px dot gutter and a gap to the next column. A row that does
// not fit fails loudly here (and in the stale test) instead of colliding silently.
const POOL_CELL_W = 256;

// Chip row layout, on the real label width: chips that do not fit before `maxX` (keeping room for
// one "…" chip) are folded into the ellipsis chip.
const CHIP_W = (label) => Math.ceil(16 + roleWidth("label-sm", label));
function fitChips(labels, startX, maxX, gap) {
  const shown = [];
  let x = startX;
  for (let i = 0; i < labels.length; i++) {
    const w = CHIP_W(labels[i]);
    const remaining = labels.length - i - 1;
    const reserve = remaining > 0 ? gap + 34 : 0;
    if (x + w + reserve > maxX) break;
    shown.push({ label: labels[i], x, w });
    x += w + gap;
  }
  const overflow = shown.length < labels.length;
  return { shown, overflow, ellipsisX: x };
}

// The card's data from the facts snapshot (see scripts/docs/readmeFactsFreeTier.mjs).
function freeTierBudgetFacts() {
  const b = README_FACTS.code?.freeTierBudget;
  if (!b || !Array.isArray(b.pools)) {
    throw new Error(
      "free-tier-budget: the facts snapshot has no code.freeTierBudget — run `npm run release:refresh-derived`"
    );
  }
  return b;
}

export function buildFreeTierBudgetModel() {
  const t = freeTierBudgetFacts();
  const pools = t.pools;
  const quantified = pools.filter((p) => p.caps === 0);
  const capped = pools.filter((p) => p.caps > 0);
  const poolTokens = pools.reduce((s, p) => s + p.tokens, 0);
  for (const p of pools) {
    const value = p.caps ? `${fmtTokens(p.tokens)} · ${p.caps} caps` : fmtTokens(p.tokens);
    if (roleWidth("label", `${p.name} ${value}`) > POOL_CELL_W) {
      throw new Error(
        `free-tier-budget: pool row "${p.name} ${value}" (${p.provider}) is wider than the ${POOL_CELL_W} px the pool grid fits — shorten it or widen the layout`
      );
    }
  }

  const oneTime = t.oneTime;
  const oneTimeSum = oneTime.reduce((s, r) => s + r.v, 0);

  const avoidProviders = t.avoidProviders;
  const discontinued = t.discontinued;
  const uncappedNames = t.uncappedNames;

  const steady = t.steady;
  const first = t.first;
  const boost = t.boost;
  const gated = t.gated;
  const numberWord = (n) => NUMBER_WORDS[n] ?? String(n);

  // Layout rows derived from the data.
  const gridRows = Math.ceil(pools.length / 4);
  const lastRowY = 452 + (gridRows - 1) * 30;
  const creditChips = fitChips(
    oneTime.map((r) => `${r.provider} ${fmtTokens(r.v)}`),
    60,
    1140,
    10
  );
  const uncappedChips = fitChips(uncappedNames, 60, 730, 8);

  const capsTitle = capped
    .map((p) => ` + ${p.caps} ${p.name.toUpperCase()} PER-MODEL CAPS`)
    .join("");
  const capsCaption = capped.length
    ? ` (${capped.map((p) => `${p.name} = its ${numberWord(p.caps)} per-model caps`).join("; ")})`
    : "";
  const capsWords = capped.length
    ? ` plus ${capped.map((p) => `${numberWord(p.caps)} per-model ${p.name} caps`).join(" and ")}`
    : "";

  const copy = {
    kicker: ["FREE-TIER BUDGET · LIVE ON ", "/dashboard/free-tiers"],
    pill: ["HONEST · POOL-DEDUPED"],
    hero: [`~${fmtTokens(steady)}`],
    heroLabel: ["FREE TOKENS / MONTH · ", "STEADY"],
    heroSub: ["up to ", `~${fmtTokens(first)}`, " in your first month — signup credits"],
    heroMeta: [
      "documented free tiers · ",
      `${t.poolCount} recurring pools`,
      " · ",
      `${t.modelCount} catalog entries`,
      " · one endpoint",
    ],
    math: [
      "THE HONEST MATH",
      "~10B",
      "every rate limit · 24/7",
      "we don't publish that",
      `~${fmtTokens(steady)}`,
      "each shared free pool",
      "counted once ✓",
      `${avoidProviders} providers`,
      " ToS-flagged ",
      "— we flag it · you decide",
    ],
    barTitle: ["WHERE IT COMES FROM · ", `${quantified.length} QUANTIFIED POOLS${capsTitle}`],
    barCaption: [
      `each segment = one recurring pool${capsCaption} · widths floored so every pool shows · audited pool budgets below`,
    ],
    poolNames: pools.map((p) => `${p.name} `),
    poolValues: pools.map((p) =>
      p.caps ? `${fmtTokens(p.tokens)} · ${p.caps} caps` : fmtTokens(p.tokens)
    ),
    credits: ["+ FIRST MONTH · ONE-TIME SIGNUP CREDITS ", `~${fmtTokens(oneTimeSum)}`],
    creditChips: [...creditChips.shown.map((c) => c.label), ...(creditChips.overflow ? ["…"] : [])],
    uncapped: ["∞", "PLUS THE UN-COUNTABLE ", "— PERMANENTLY FREE · NO TOKEN CAP"],
    uncappedChips: [
      ...uncappedChips.shown.map((c) => c.label),
      ...(uncappedChips.overflow ? ["…"] : []),
    ],
    boost: ["$10", " OpenRouter top-up → ", `+${fmtTokens(boost)}/mo`],
    separately: ["surfaced separately — never inflates the headline"],
    footer: [
      "CURRENT MONTH",
      "LIVE",
      "used / remaining · per-model breakdown · transparent ",
      "terms flag",
      " per provider",
    ],
  };

  const title =
    `OmniRoute free-tier budget: about ${fmtWords(steady)} free tokens per month steady, up to about ${fmtWords(first)} in the first month with signup credits. ` +
    `The catalog contains ${t.modelCount} rows, ${t.modelCount - discontinued} active and ${discontinued} discontinued, grouped into ${t.poolCount} recurring pool keys; ` +
    `${quantified.length} pools have a published positive monthly token budget and ${t.poolCount - quantified.length} have a zero, uncapped, or keyless budget. ` +
    `Honest pool-deduped math counts each shared free pool once; ${avoidProviders} providers carry a terms-of-service avoid flag. ` +
    `The ${quantified.length} quantified pools${capsWords} are ${pools
      .map(
        (p) =>
          `${p.name} ${fmtWords(p.tokens)}${p.caps ? ` across ${numberWord(p.caps)} per-model caps` : ""}`
      )
      .join(", ")}. ` +
    `One-time signup credits add about ${fmtWords(oneTimeSum)}. Uncapped providers and the OpenRouter top-up boost are shown separately so they do not inflate the headline.` +
    (gated > 0
      ? ` A further ${fmtWords(gated)} behind regional identity verification (${t.gatedProviderNames.join(", ")}) is also shown apart.`
      : "") +
    ` Live usage remains available at /dashboard/free-tiers.`;
  const desc = `Pool-deduplicated chart of the ${quantified.length} recurring free-token pools with positive published budgets${capped.length ? ` (plus ${capped.map((p) => `${p.name}'s ${numberWord(p.caps)} per-model caps as one segment`).join(" and ")})` : ""}, plus signup credits and uncapped providers shown separately.`;

  return {
    copy,
    title,
    desc,
    pools,
    poolTokens,
    creditChips,
    uncappedChips,
    gridRows,
    lastRowY,
  };
}

export function buildFreeTierBudgetCopy() {
  return buildFreeTierBudgetModel().copy;
}

// Segment / dot tones: the largest pool is the card's one accent emphasis; the rest cycle the
// kit's status and neutral fills (the grid dots repeat the same sequence as the bar).
const TONES = ["info", "ok", "warn", "ink", "muted"];
const tone = (i) => (i === 0 ? "accent" : TONES[(i - 1) % TONES.length]);
const dotClass = (i) => (i === 0 ? "accent stroke-ink" : tone(i));

export async function renderReadmeFreeTierBudget() {
  const M = buildFreeTierBudgetModel();
  const C = M.copy;
  // The strike through the published-nowhere figure overhangs it by 6 px each side.
  const strike = Math.ceil(roleWidth("num", C.math[1])) + 12;

  // The header pill hugs its label, right-aligned to the content edge; the footer note follows LIVE.
  const pillW = 32 + Math.ceil(roleWidth("lbl", C.pill[0])) + 16;
  const footerNoteX = 356 + Math.ceil(roleWidth("lbl", C.footer[1])) + 28;

  const base = M.lastRowY; // 572 with five grid rows
  const Y = {
    credits: base + 50,
    chips: base + 60,
    inf: base + 118,
    ukicker: base + 116,
    uchips: base + 130,
    boost: base + 146,
    sep: base + 174,
    foot: base + 198,
  };
  if (Y.foot + 56 > H - 16) {
    throw new Error(
      `free-tier-budget: ${M.pools.length} pools need ${M.gridRows} grid rows and the footer no longer fits the 842px canvas — grow the viewBox deliberately`
    );
  }

  // Budget bar segments: 7px floor each, 1px gaps, the rest proportional to the pool budget.
  const BAR_X = 60;
  const BAR_W = 1080;
  const MIN = 7;
  const n = M.pools.length;
  const extra = BAR_W - MIN * n - (n - 1);
  let bx = BAR_X;
  const segs = M.pools.map((p, i) => {
    const w = MIN + (p.tokens / M.poolTokens) * extra;
    const s = `      <rect x="${bx.toFixed(1)}" y="372" width="${w.toFixed(1)}" height="18" class="${tone(i)}"/>`;
    bx += w + 1;
    return s;
  });

  const grid = M.pools.map((p, i) => {
    const cx = 66 + (i % 4) * 280;
    const cy = 452 + Math.floor(i / 4) * 30;
    return (
      `    <circle cx="${cx}" cy="${cy}" r="5" class="${dotClass(i)}"${i === 0 ? ' stroke-width="1"' : ""}/>` +
      `<text x="${cx + 12}" y="${cy + 4}" class="label">${esc(C.poolNames[i])}<tspan style="fill:var(--muted)">${esc(C.poolValues[i])}</tspan></text>`
    );
  });

  const chip = (c, y, rectClass, textStyle) =>
    `    <rect x="${c.x}" y="${y}" width="${c.w}" height="22" rx="11" class="${rectClass}" stroke-width="1"/>\n` +
    `    <text x="${c.x + c.w / 2}" y="${y + 15}" text-anchor="middle" class="label-sm"${textStyle}>${esc(c.label)}</text>`;
  const creditChips = [
    ...M.creditChips.shown,
    ...(M.creditChips.overflow ? [{ label: "…", x: M.creditChips.ellipsisX, w: 34 }] : []),
  ]
    .map((c) => chip(c, Y.chips, "ok-bg stroke-ok", ' style="fill:var(--ok)"'))
    .join("\n");
  const uncappedChips = [
    ...M.uncappedChips.shown,
    ...(M.uncappedChips.overflow ? [{ label: "…", x: M.uncappedChips.ellipsisX, w: 34 }] : []),
  ]
    .map((c) => chip(c, Y.uchips, "surface-muted rule", ' style="fill:var(--muted)"'))
    .join("\n");

  return outlineSvg(
    svgOpen({
      viewBox: `0 0 ${W} ${H}`,
      title: M.title,
      desc: M.desc,
    }) +
      gridDefs("ftb-grid") +
      `  <defs>\n` +
      `    <radialGradient id="ftb-glow" cx="50%" cy="50%" r="50%">\n` +
      `      <stop offset="0%" style="stop-color:var(--surface)" stop-opacity="0.9"/>\n` +
      `      <stop offset="100%" style="stop-color:var(--surface)" stop-opacity="0"/>\n` +
      `    </radialGradient>\n` +
      `    <path id="ftb-tk1" d="M 44,84 C 150,112 190,146 302,168"/>\n` +
      `    <path id="ftb-tk2" d="M 30,310 C 136,290 176,240 296,206"/>\n` +
      `    <path id="ftb-tk3" d="M 96,436 C 186,392 208,308 314,230"/>\n` +
      `    <clipPath id="ftb-bar-shape"><rect x="60" y="372" width="1080" height="18" rx="9"/></clipPath>\n` +
      `    <clipPath id="ftb-bar-reveal">\n` +
      `      <rect x="60" y="372" width="0" height="18">\n` +
      `        <animate attributeName="width" values="1080;0;1080;1080" keyTimes="0;0.02;0.24;1" dur="10s" repeatCount="indefinite"/>\n` +
      `      </rect>\n` +
      `    </clipPath>\n` +
      `  </defs>\n` +
      `  <rect class="bg" x="0" y="0" width="${W}" height="${H}"/>\n` +
      `  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#ftb-grid)"/>\n` +
      // header
      `  <text x="60" y="52" class="kicker">${esc(C.kicker[0])}<tspan style="fill:var(--ink)">${esc(C.kicker[1])}</tspan></text>\n` +
      `  <g transform="translate(${1140 - pillW},32)">\n` +
      `    <rect width="${pillW}" height="28" rx="14" class="ok-bg stroke-ok" stroke-width="1" stroke-opacity="0.6"/>\n` +
      `    <circle cx="18" cy="14" r="3.5" class="ok"><animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite"/></circle>\n` +
      `    <text x="32" y="18" class="lbl" style="fill:var(--ok)">${esc(C.pill[0])}</text>\n` +
      `  </g>\n` +
      // hero (left)
      `  <ellipse cx="280" cy="180" rx="270" ry="130" fill="url(#ftb-glow)"><animate attributeName="rx" values="250;290;250" dur="4s" repeatCount="indefinite"/></ellipse>\n` +
      `  <g class="ink">\n` +
      ["ftb-tk1", "ftb-tk2", "ftb-tk3"]
        .map(
          (id, i) =>
            `    <circle r="3.4"><animateMotion dur="2.4s" repeatCount="indefinite" begin="${(i * 0.8).toFixed(1)}s"><mpath href="#${id}"/></animateMotion>` +
            `<animate attributeName="opacity" values="0;1;1;0" dur="2.4s" begin="${(i * 0.8).toFixed(1)}s" repeatCount="indefinite"/></circle>`
        )
        .join("\n") +
      `\n  </g>\n` +
      `  <text x="60" y="228" class="headline">${esc(C.hero[0])}</text>\n` +
      `  <text x="62" y="266" class="kicker">${esc(C.heroLabel[0])}<tspan style="fill:var(--ok)">${esc(C.heroLabel[1])}</tspan></text>\n` +
      `  <text x="62" y="298" class="body" style="fill:var(--body)">${esc(C.heroSub[0])}<tspan font-weight="600" style="fill:var(--ok)">${esc(C.heroSub[1])}</tspan>${esc(C.heroSub[2])}</text>\n` +
      `  <text x="62" y="326" class="label-sm" style="fill:var(--muted)">${esc(C.heroMeta[0])}<tspan style="fill:var(--ink)">${esc(C.heroMeta[1])}</tspan>${esc(C.heroMeta[2])}<tspan style="fill:var(--ink)">${esc(C.heroMeta[3])}</tspan>${esc(C.heroMeta[4])}</text>\n` +
      // panel · the honest math
      `  <rect x="680" y="84" width="460" height="216" rx="12" class="surface" stroke-width="1"/>\n` +
      `  <text x="704" y="116" class="lbl">${esc(C.math[0])}</text>\n` +
      `  <text x="704" y="172" class="num" style="fill:var(--muted)">${esc(C.math[1])}</text>\n` +
      `  <line x1="698" y1="161" x2="${698 + strike}" y2="161" class="stroke-err" stroke-width="3" stroke-linecap="round" stroke-dasharray="${strike}" stroke-dashoffset="${strike}">` +
      `<animate attributeName="stroke-dashoffset" values="0;${strike};0;0" keyTimes="0;0.10;0.18;1" dur="10s" repeatCount="indefinite"/></line>\n` +
      `  <text x="836" y="156" class="label-sm" style="fill:var(--muted)">${esc(C.math[2])}</text>\n` +
      `  <text x="836" y="176" class="label-sm" style="fill:var(--err)">${esc(C.math[3])}</text>\n` +
      `  <text x="704" y="240" class="num" style="fill:var(--ok)">${esc(C.math[4])}</text>\n` +
      `  <text x="836" y="224" class="label-sm" style="fill:var(--muted)">${esc(C.math[5])}</text>\n` +
      `  <text x="836" y="244" class="label-sm" style="fill:var(--ok)">${esc(C.math[6])}</text>\n` +
      `  <text x="704" y="280" class="label-sm"><tspan style="fill:var(--warn)">${esc(C.math[7])}</tspan>${esc(C.math[8])}<tspan style="fill:var(--muted)">${esc(C.math[9])}</tspan></text>\n` +
      // budget bar
      `  <text x="60" y="356" class="lbl">${esc(C.barTitle[0])}<tspan style="fill:var(--ink)">${esc(C.barTitle[1])}</tspan></text>\n` +
      `  <g clip-path="url(#ftb-bar-shape)">\n` +
      `    <rect x="60" y="372" width="1080" height="18" class="surface-muted"/>\n` +
      `    <g clip-path="url(#ftb-bar-reveal)">\n${segs.join("\n")}\n    </g>\n` +
      `  </g>\n` +
      `  <circle r="3.2" class="ink"><animateMotion path="M 60,381 L 1140,381" keyPoints="0;0;1;1" keyTimes="0;0.02;0.24;1" calcMode="linear" dur="10s" repeatCount="indefinite"/>` +
      `<animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.02;0.23;0.26;1" dur="10s" repeatCount="indefinite"/></circle>\n` +
      `  <text x="60" y="416" class="label-sm" style="fill:var(--muted)">${esc(C.barCaption[0])}</text>\n` +
      // per-pool grid
      `  <g>\n${grid.join("\n")}\n  </g>\n` +
      // first-month signup credits
      `  <text x="60" y="${Y.credits}" class="lbl" style="fill:var(--ok)">${esc(C.credits[0])}<tspan style="fill:var(--ink)">${esc(C.credits[1])}</tspan></text>\n` +
      `  <g>\n${creditChips}\n  </g>\n` +
      // plus the un-countable
      `  <text x="60" y="${Y.inf}" class="num-sm">${esc(C.uncapped[0])}<animate attributeName="opacity" values="1;0.55;1" dur="4s" repeatCount="indefinite"/></text>\n` +
      `  <text x="86" y="${Y.ukicker}" class="lbl">${esc(C.uncapped[1])}<tspan style="fill:var(--muted)">${esc(C.uncapped[2])}</tspan></text>\n` +
      `  <g>\n${uncappedChips}\n  </g>\n` +
      `  <text x="760" y="${Y.boost}" class="label"><tspan style="fill:var(--warn)">${esc(C.boost[0])}</tspan>${esc(C.boost[1])}<tspan style="fill:var(--ok)">${esc(C.boost[2])}</tspan></text>\n` +
      `  <text x="60" y="${Y.sep}" class="label-sm" style="fill:var(--muted)">${esc(C.separately[0])}</text>\n` +
      // footer strip
      `  <rect x="60" y="${Y.foot}" width="1080" height="56" rx="12" class="surface" stroke-width="1"/>\n` +
      `  <text x="84" y="${Y.foot + 22}" class="lbl">${esc(C.footer[0])}</text>\n` +
      `  <rect x="84" y="${Y.foot + 30}" width="240" height="8" rx="4" class="surface-muted rule" stroke-width="1"/>\n` +
      `  <rect x="85" y="${Y.foot + 31}" width="132" height="6" rx="3" class="ink"/>\n` +
      `  <circle r="2.6" class="bg"><animateMotion path="M 85,${Y.foot + 34} L 217,${Y.foot + 34}" dur="3s" repeatCount="indefinite"/>` +
      `<animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite"/></circle>\n` +
      `  <circle cx="344" cy="${Y.foot + 34}" r="3.5" class="ok"><animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/></circle>\n` +
      `  <text x="356" y="${Y.foot + 38}" class="lbl" style="fill:var(--ok)">${esc(C.footer[1])}</text>\n` +
      `  <text x="${footerNoteX}" y="${Y.foot + 38}" class="label-sm" style="fill:var(--muted)">${esc(C.footer[2])}<tspan style="fill:var(--warn)">${esc(C.footer[3])}</tspan>${esc(C.footer[4])}</text>\n` +
      "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/free-tier-budget.svg";
  const svg = await renderReadmeFreeTierBudget();
  writeFileSync(out, svg);
  console.log(`free-tier-budget → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
