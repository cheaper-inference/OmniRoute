// README provider figures in the Cheaper Inference UI Kit style. The totals with release
// facts come from readmeFacts.mjs. Provider category sizes and hasFree flags come from
// src/shared/constants/providers.ts; distinct active IDs come from FREE_MODEL_BUDGETS,
// excluding discontinued rows before deduplicating by modelId across providers.
//
//   node --import tsx/esm scripts/docs/gen-readme-provider-numbers.mjs [--out path.svg]

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { fmtTokens } from "./gen-readme-free-tier-budget.mjs";
import { esc, gridDefs, svgOpen } from "./readme-diagram-theme.mjs";
import { outlineSvg } from "./readme-outline.mjs";
import { readmeFact, RF } from "./readmeFacts.mjs";

const W = 1200;
const H = 544;
const CARD_W = 272;
const COLUMNS = 4;
const TITLE = "What each number counts";
const SUBTITLE = "None of them is added to another.";

export async function buildProviderNumbersCards() {
  const [providers, { FREE_MODEL_BUDGETS }] = await Promise.all([
    import("../../src/shared/constants/providers.ts"),
    import("../../open-sse/config/freeModelCatalog.data.ts"),
  ]);
  const count = (collection) => Object.keys(collection).length;
  const freeOffers = Object.values(providers.AI_PROVIDERS).filter(
    ({ hasFree }) => hasFree === true
  );
  const activeRows = FREE_MODEL_BUDGETS.filter(({ freeType }) => freeType !== "discontinued");
  const distinctIds = new Set(activeRows.map(({ modelId }) => modelId));
  const totalEntries = readmeFact("code.entries");
  const discontinued = readmeFact("code.freeTierBudget.discontinued");
  const activeEntries = totalEntries - discontinued;

  return [
    {
      value: RF.providers,
      label: "Registered providers",
      lines: [
        `API key ${count(providers.APIKEY_PROVIDERS)} · web cookie ${count(providers.WEB_COOKIE_PROVIDERS)}`,
        `OAuth ${count(providers.OAUTH_PROVIDERS)} · search ${count(providers.SEARCH_PROVIDERS)} · local ${count(providers.LOCAL_PROVIDERS)}`,
        `Audio-only ${count(providers.AUDIO_ONLY_PROVIDERS)} · no-auth ${count(providers.NOAUTH_PROVIDERS)}`,
        `Cloud agents ${count(providers.CLOUD_AGENT_PROVIDERS)} · system ${count(providers.SYSTEM_PROVIDERS)}`,
        `Upstream proxies ${count(providers.UPSTREAM_PROXY_PROVIDERS)}`,
      ],
    },
    {
      value: freeOffers.length,
      label: "Flagged with a free offer",
      code: "hasFree",
      lines: ["Trials, signup credits and", "limited plans count."],
    },
    {
      value: readmeFact("code.freeTierCount"),
      label: "In the free-tier catalog",
      lines: ["Documented per model,", "including signup credits."],
    },
    {
      value: RF.freeForever,
      label: "Recurring or keyless",
      lines: ["Free daily, monthly or keyless.", "No trial or eligibility gate."],
    },
    {
      value: activeEntries,
      label: "Active free model entries",
      lines: [`Provider/model rows: ${totalEntries} total`, `minus ${discontinued} discontinued.`],
    },
    {
      value: distinctIds.size,
      label: "Distinct free model IDs",
      lines: [`${activeEntries} active entries deduplicated`, "by model ID across providers."],
    },
    {
      value: readmeFact("code.freePools"),
      label: "Recurring free pools",
      lines: ["Shared quotas counted once."],
    },
    {
      value: `~${fmtTokens(readmeFact("code.freeSteady"))}`,
      label: "Recurring free tokens / month",
      highlight: true,
      lines: [
        "Pool-deduplicated. First month:",
        `~${fmtTokens(readmeFact("code.freeFirst"))} with signup credits.`,
        "Not an OmniRoute allowance.",
      ],
    },
  ];
}

function card({ value, label, code, lines, highlight }, i) {
  const x = 32 + (i % COLUMNS) * 288;
  const firstRow = i < COLUMNS;
  const height = firstRow ? 216 : 184;
  const rows = code ? [["mono", code]] : [];
  rows.push(...lines.map((line) => ["definition", line]));
  return [
    `  <g class="provider-stat" transform="translate(${x},${firstRow ? 96 : 328})">`,
    `    <rect width="${CARD_W}" height="${height}" rx="12" class="surface"/>`,
    ...(highlight ? [`    <rect width="6" height="${height}" rx="3" class="accent"/>`] : []),
    `    <text x="20" y="64" class="num" style="font-size:52px">${value}</text>`,
    `    <text x="20" y="96" class="h3">${esc(label)}</text>`,
    ...rows.map(
      ([role, line], j) =>
        `    <text x="20" y="${124 + 18 * j}" class="${role}">${esc(line)}</text>`
    ),
    "  </g>\n",
  ].join("\n");
}

export async function renderReadmeProviderNumbers() {
  const cards = await buildProviderNumbersCards();
  const desc = cards.map(({ value, label, code, lines }) =>
    [`${value} ${label}.`, ...(code ? [`${code} flag.`] : []), ...lines].join(" ")
  );
  return outlineSvg(
    svgOpen({
      viewBox: `0 0 ${W} ${H}`,
      title: TITLE,
      desc: [SUBTITLE, ...desc].join(" "),
      extraCss: ".definition{font-size:15px;fill:var(--body)}",
    }) +
      gridDefs("provider-numbers-grid") +
      `  <rect width="${W}" height="${H}" class="bg"/>\n` +
      `  <rect width="${W}" height="${H}" fill="url(#provider-numbers-grid)"/>\n` +
      `  <text x="32" y="62" class="h2" style="font-size:32px">${TITLE}</text>\n` +
      `  <text x="1168" y="62" text-anchor="end" class="sub" style="font-size:17px">${SUBTITLE}</text>\n` +
      cards.map((c, i) => card(c, i)).join("") +
      "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/provider-numbers.svg";
  const svg = await renderReadmeProviderNumbers();
  writeFileSync(out, svg);
  console.log(`provider-numbers → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
