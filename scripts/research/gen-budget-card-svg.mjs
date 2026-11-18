#!/usr/bin/env node
// Generates the per-model free-tier budget card (docs/screenshots/free-tier-budget-card.svg) from
// the catalog, through the same function the docs gate and the dashboard use — never by parsing
// the data file with a regex (that silently skipped every row carrying an extra field). Same kit
// look as the README diagrams: the Editions palette and the text roles from
// scripts/docs/readme-diagram-theme.mjs; scripts/docs/readme-outline.mjs draws the Switzer roles as
// vector outlines and keeps the code roles as text on the embedded mono subset. No page embeds this
// file today; the README draws the provider-level sibling, docs/diagrams/free-tier-budget.svg.
// Here each row is the largest model of its pool, under the name the catalog gives that model.
// Run from the repo root (a shared-module or catalog change means regenerating this file too;
// tests/unit/gen-budget-card-svg.test.ts fails until you do):
//   node --import tsx/esm scripts/research/gen-budget-card-svg.mjs [--out path.svg]
//
// buildBudgetCardCopy() returns every string the card draws, formatted exactly as drawn: it is
// both the drawn text and what the outlining step shapes (or, for the code roles, subsets).
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { computeFreeModelTotals } from "../../open-sse/config/freeModelCatalog.ts";
import { svgOpen, gridDefs, esc } from "../docs/readme-diagram-theme.mjs";
import { outlineSvg } from "../docs/readme-outline.mjs";

const W = 1200;
const STEADY_TYPES = new Set(["recurring-daily", "recurring-monthly", "keyless"]);
const fmt = (n) =>
  n >= 1e9
    ? (n / 1e9).toFixed(2) + "B"
    : n >= 1e6
      ? Math.round(n / 1e6) + "M"
      : Math.round(n / 1e3) + "K";

const cleanName = (r) =>
  (r.displayName || r.provider)
    .replace(/\s*\(.*$/, "")
    .replace(/ —.*$/, "")
    .slice(0, 24);

export function buildBudgetCardModel() {
  const t = computeFreeModelTotals();

  // One bar segment per steady pool (largest member), gated rows excluded like the headline.
  const poolMap = new Map();
  for (const r of t.perModel) {
    if (!STEADY_TYPES.has(r.freeType) || r.eligibilityGate) continue;
    const k = r.poolKey || `${r.provider}:${r.modelId}`;
    const cur = poolMap.get(k);
    if (!cur || r.monthlyTokens > cur.monthlyTokens) poolMap.set(k, r);
  }
  const pools = [...poolMap.values()]
    .filter((r) => r.monthlyTokens > 0)
    .sort((a, b) => b.monthlyTokens - a.monthlyTokens);
  const steady = t.steadyRecurringTokens;
  const firstMonth = t.firstMonthRealisticTokens;
  const gated = t.gatedRecurringTokens;

  const otMap = new Map();
  for (const r of t.perModel) {
    // Gated rows are excluded here too — they are absent from firstMonthRealisticTokens.
    if (r.freeType !== "one-time-initial" || r.creditTokens <= 0 || r.eligibilityGate) continue;
    const k = r.poolKey || r.provider;
    otMap.set(k, { provider: r.provider, v: Math.max(otMap.get(k)?.v || 0, r.creditTokens) });
  }
  const oneTime = [...otMap.values()].sort((a, b) => b.v - a.v);
  const oneTimeSum = oneTime.reduce((s, r) => s + r.v, 0);
  const avoidProviders = new Set(t.perModel.filter((r) => r.tos === "avoid").map((r) => r.provider))
    .size;
  const uncapped = t.uncappedProviders;

  const grid = pools.slice(0, 28);
  const strip = oneTime.slice(0, 9);

  const copy = {
    title: ["Monthly free-token budget"],
    meta: [`${pools.length} free pools · ${t.modelCount} models · one endpoint`],
    statLabels: ["Steady / month", "First month (+ signup credits)", "ToS-flagged (you decide)"],
    statValues: [`~${fmt(steady)}`, `~${fmt(firstMonth)}`, `${avoidProviders} providers`],
    caption: [
      "Each segment = one free pool · widths floored so every provider shows · honest numbers in the grid.",
    ],
    poolNames: grid.map((r) => `${cleanName(r)} `),
    poolValues: grid.map((r) => fmt(r.monthlyTokens)),
    credits: [`+ First month: one-time signup credits (~${fmt(oneTimeSum)})`],
    chips: strip.map((r) => `${r.provider} ${fmt(r.v)}`),
    note: [
      "Pool-deduped, honest counting — no inflated rate-limit ceilings. Some terms suggest personal-use only; we flag them so you decide.",
      `+ ${uncapped.length} permanently-free, no-cap providers (e.g. ${uncapped.slice(0, 3).join(", ")}) · OpenRouter $10 → +${fmt(t.boostMonthlyTokens)}/mo.`,
    ],
    gatedNote:
      gated > 0
        ? [
            `+ ~${fmt(gated)} behind regional identity verification (${t.gatedProviders.join(", ")}) — real quota, never in the headline.`,
          ]
        : [],
    footer: ["OmniRoute · /dashboard/free-tiers · preview mockup"],
  };

  const title =
    `OmniRoute monthly free-token budget: about ${fmt(steady)} tokens a month steady, about ${fmt(firstMonth)} in the first month with signup credits, ` +
    `from ${pools.length} free pools across ${t.modelCount} catalog models behind one endpoint. ${avoidProviders} providers are ToS-flagged so you decide.`;
  const desc =
    `Stacked bar with one segment per free pool, a grid of the ${grid.length} largest pools with their monthly tokens, ` +
    `${strip.length} one-time signup credit chips totalling about ${fmt(oneTimeSum)}, and notes on uncapped and identity-gated quota, which stay out of the headline.`;

  return { copy, title, desc, grid, steady };
}

export function buildBudgetCardCopy() {
  return buildBudgetCardModel().copy;
}

// Segment / dot tones: the largest pool is the card's one copper emphasis (the Editions accent);
// the rest cycle the kit's status and neutral fills (the grid dots repeat the bar's sequence).
const TONES = ["info", "ok", "warn", "ink", "muted"];
const tone = (i) => (i === 0 ? "accent" : TONES[(i - 1) % TONES.length]);
const dotClass = (i) => (i === 0 ? "accent stroke-ink" : tone(i));

// IBM Plex Mono 500 at 11px is ~6.6 px per glyph.
const chipWidth = (label) => Math.round(16 + label.length * 6.6);

const BAR = { x: 60, y: 224, w: 1080, h: 18, min: 7 };
const GRID = { cols: 4, colW: 270, x: 66, y: 298, rowH: 30 };

export async function renderBudgetCard() {
  const { copy: C, title, desc, grid, steady } = buildBudgetCardModel();

  const n = grid.length;
  const extra = BAR.w - BAR.min * n - (n - 1);
  let bx = BAR.x;
  const segs = grid.map((r, i) => {
    const w = BAR.min + (r.monthlyTokens / steady) * extra;
    const s = `      <rect x="${bx.toFixed(1)}" y="${BAR.y}" width="${w.toFixed(1)}" height="${BAR.h}" class="${tone(i)}"/>`;
    bx += w + 1;
    return s;
  });

  const gridRows = grid.map((_, i) => {
    const cx = GRID.x + (i % GRID.cols) * GRID.colW;
    const cy = GRID.y + Math.floor(i / GRID.cols) * GRID.rowH;
    return (
      `    <circle cx="${cx}" cy="${cy}" r="5" class="${dotClass(i)}"${i === 0 ? ' stroke-width="1"' : ""}/>` +
      `<text x="${cx + 12}" y="${cy + 4}" class="mono">${esc(C.poolNames[i])}<tspan style="fill:var(--muted)">${esc(C.poolValues[i])}</tspan></text>`
    );
  });

  const stats = C.statLabels.map((label, i) => {
    const x = 60 + i * 368;
    const fill = ["var(--ink)", "var(--ok)", "var(--warn)"][i];
    return (
      `  <rect x="${x}" y="100" width="344" height="100" rx="12" class="surface" stroke-width="1"/>\n` +
      `  <text x="${x + 24}" y="130" class="cell" style="fill:var(--muted)">${esc(label)}</text>\n` +
      `  <text x="${x + 24}" y="178" class="bc-stat" style="fill:${fill}">${esc(C.statValues[i])}</text>`
    );
  });

  // Below the grid the height follows the data: chips wrap, the gated note appears only with quota.
  let y = GRID.y + Math.ceil(n / GRID.cols) * GRID.rowH + 2;
  const ruleY = y;
  y += 34;
  const creditsY = y;
  y += 14;
  const chips = [];
  let cx = 60;
  for (const label of C.chips) {
    const w = chipWidth(label);
    if (cx + w > W - 60) {
      cx = 60;
      y += 30;
    }
    chips.push(
      `    <rect x="${cx}" y="${y}" width="${w}" height="22" rx="11" class="ok-bg stroke-ok" stroke-width="1"/>\n` +
        `    <text x="${cx + w / 2}" y="${y + 15}" text-anchor="middle" class="mono-sm" style="fill:var(--ok)">${esc(label)}</text>`
    );
    cx += w + 10;
  }
  y += 44;
  const noteY = y;
  const noteLines = [...C.note, ...C.gatedNote];
  const noteH = 22 + noteLines.length * 22;
  const noteText = noteLines.map((line, i) => {
    const fill = i === 2 ? "var(--warn)" : i === 0 ? "var(--body)" : "var(--muted)";
    return `  <text x="84" y="${noteY + 30 + i * 22}" class="cell" style="fill:${fill}">${esc(line)}</text>`;
  });
  y += noteH + 32;
  const footerY = y;
  const H = footerY + 24;

  // The stat figures: the kit's num role (Switzer 500, -0.02em) at the card's 46px.
  const svg =
    svgOpen({
      viewBox: `0 0 ${W} ${H}`,
      title,
      desc,
      extraCss: `.bc-stat{font-weight:500;font-size:46px;letter-spacing:-0.02em}`,
    }) +
    gridDefs("bc-grid") +
    `  <defs>\n` +
    `    <clipPath id="bc-bar"><rect x="${BAR.x}" y="${BAR.y}" width="${BAR.w}" height="${BAR.h}" rx="9"/></clipPath>\n` +
    `  </defs>\n` +
    `  <rect class="bg" x="0" y="0" width="${W}" height="${H}"/>\n` +
    `  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#bc-grid)"/>\n` +
    // header
    `  <text x="60" y="72" class="h2">${esc(C.title[0])}</text>\n` +
    `  <text x="1140" y="70" text-anchor="end" class="mono" style="fill:var(--muted)">${esc(C.meta[0])}</text>\n` +
    // stats
    `${stats.join("\n")}\n` +
    // budget bar
    `  <g clip-path="url(#bc-bar)">\n` +
    `    <rect x="${BAR.x}" y="${BAR.y}" width="${BAR.w}" height="${BAR.h}" class="surface-muted"/>\n` +
    `${segs.join("\n")}\n` +
    `  </g>\n` +
    `  <text x="60" y="264" class="mono-sm" style="fill:var(--muted)">${esc(C.caption[0])}</text>\n` +
    // per-pool grid
    `  <g>\n${gridRows.join("\n")}\n  </g>\n` +
    `  <line x1="60" y1="${ruleY}" x2="1140" y2="${ruleY}" class="rule"/>\n` +
    // first-month signup credits
    `  <text x="60" y="${creditsY}" class="h4" style="fill:var(--ok)">${esc(C.credits[0])}</text>\n` +
    `  <g>\n${chips.join("\n")}\n  </g>\n` +
    // notes
    `  <rect x="60" y="${noteY}" width="1080" height="${noteH}" rx="12" class="surface" stroke-width="1"/>\n` +
    `${noteText.join("\n")}\n` +
    `  <text x="1140" y="${footerY}" text-anchor="end" class="mono-xs">${esc(C.footer[0])}</text>\n` +
    "</svg>\n";
  return outlineSvg(svg);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const outIdx = process.argv.indexOf("--out");
  if (outIdx >= 0 && !process.argv[outIdx + 1]) throw new Error("--out requires a path");
  const out = outIdx >= 0 ? process.argv[outIdx + 1] : "docs/screenshots/free-tier-budget-card.svg";
  const svg = await renderBudgetCard();
  fs.writeFileSync(out, svg);
  console.log(`SVG → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
