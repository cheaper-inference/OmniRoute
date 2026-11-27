// README provider figures in the Cheaper Inference UI Kit style. The totals with release
// facts come from readmeFacts.mjs. Provider category sizes come from
// src/shared/constants/providers.ts.
//
//   node --import tsx/esm scripts/docs/gen-readme-provider-numbers.mjs [--out path.svg]

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { esc, gridDefs, svgOpen } from "./readme-diagram-theme.mjs";
import { outlineSvg } from "./readme-outline.mjs";
import { readmeFact, RF } from "./readmeFacts.mjs";

const W = 1200;
const H = 576;
const CARD_W = 272;
const CARD_H = 216;
const COLUMNS = 4;
const TITLE = "What each number counts";
const SUBTITLE = "None of them is added to another.";

export async function buildProviderNumbersCards() {
  const providers = await import("../../src/shared/constants/providers.ts");
  const count = (collection) => Object.keys(collection).length;

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
      value: RF.hasFreeLabel,
      label: "Flagged with a free offer",
      code: "hasFree",
      lines: ["Trials, signup credits, search,", "voice and media count."],
    },
    {
      value: RF.freeProvidersTotal,
      label: "With free access",
      lines: [
        `${readmeFact("code.freeProviders.apiKey")} with an API key`,
        `${readmeFact("code.freeProviders.keyless")} without a key`,
        `${readmeFact("code.freeProviders.toolAccount")} through a tool account`,
        `${readmeFact("code.freeProviders.webChat")} through a web chat`,
        "Catalogued, not tested per call.",
      ],
    },
    {
      value: RF.freeForever,
      label: "Recurring or keyless",
      lines: ["Free daily, monthly or keyless.", "No trial or eligibility gate."],
    },
    {
      value: RF.freeAccessRows,
      label: "Catalog rows with free access",
      lines: ["One row per provider and model."],
    },
    {
      value: RF.freeModels,
      label: "Distinct free models",
      lines: ["The rows grouped by model ID."],
    },
    {
      value: RF.freePublishedPools,
      label: "Pools with a published quota",
      lines: ["Shared quotas counted once."],
    },
    {
      value: RF.rowSumTotalLabel,
      label: "Free tokens a month, as others count",
      // Marks the highlighted card; the dark-theme polish draws its accent from this flag.
      highlight: true,
      labelSize: 14.5,
      definitionRole: "cell",
      lines: [
        `${RF.headlineSteadyLabel} real: each shared quota`,
        "counted once. Others add",
        "every row, ended offers included.",
        `First month: ${RF.headlineFirstLabel} with signup credits.`,
        "Not an OmniRoute allowance.",
      ],
    },
  ];
}

function card({ value, label, code, lines, labelSize = 17, definitionRole = "definition" }, i) {
  const x = 32 + (i % COLUMNS) * 288;
  const firstRow = i < COLUMNS;
  const rows = code ? [["mono", code]] : [];
  rows.push(...lines.map((line) => [definitionRole, line]));
  const textY = 124;
  const lineHeight = 18;
  return [
    `  <g class="provider-stat" transform="translate(${x},${firstRow ? 96 : 328})">`,
    `    <rect width="${CARD_W}" height="${CARD_H}" rx="12" class="surface"/>`,
    `    <text x="20" y="64" class="num" style="font-size:52px">${esc(String(value))}</text>`,
    `    <text x="20" y="96" class="h3" style="font-size:${labelSize}px">${esc(label)}</text>`,
    ...rows.map(
      ([role, line], j) =>
        `    <text x="20" y="${textY + lineHeight * j}" class="${role}">${esc(line)}</text>`
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
