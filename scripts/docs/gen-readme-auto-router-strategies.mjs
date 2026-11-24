// One animated tile per auto router strategy, with aliases shown together.
//   node scripts/docs/gen-readme-auto-router-strategies.mjs [--out path.svg]
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { outlineSvg } from "./readme-outline.mjs";
import { afterKicker, esc, gridDefs, svgOpen } from "./readme-diagram-theme.mjs";

// The slot labels are illustrative. The descriptions follow routerStrategy.ts, speedRanking.ts,
// nadirStrategy.ts and decisionStrategy.ts in open-sse/services/autoCombo/.
const TILES = [
  {
    name: "rules",
    body: ["Default weighted scoring", "Ranks candidates across routing factors"],
    slots: ["0.72", "0.91", "0.64"],
    pick: 1,
  },
  {
    name: "score",
    body: ["Highest configured weighted score", "Ties keep candidate order"],
    slots: ["0.91", "0.91", "0.64"],
    pick: 0,
  },
  {
    name: "cost / eco",
    body: ["Cheapest healthy provider"],
    slots: ["$3 / 1M", "$1 / 1M", "$0.50 · open"],
    pick: 1,
  },
  {
    name: "latency / fast",
    body: ["Prefers lower latency, including p95", "Penalizes unreliable candidates"],
    slots: ["Fast, flaky", "Fast, steady", "Slow, steady"],
    pick: 1,
  },
  {
    name: "sla-aware / sla",
    body: ["Prefers candidates that meet SLOs", "for p95, error rate and optional cost"],
    slots: ["High p95", "High error rate", "Meets SLOs"],
    pick: 2,
  },
  {
    name: "lkgp",
    body: ["Last known good provider first"],
    slots: ["Provider A", "Last success", "Provider C"],
    pick: 1,
  },
  {
    name: "nadir",
    body: ["Opt-in · asks the Nadir decision API", "Falls back to rules on failure"],
    slots: ["Model A", "Model B", "Nadir pick"],
    pick: 2,
  },
  {
    name: "decision",
    body: ["Asks a configured decider", "Falls back to rules when off or on failure"],
    flag: "COMBO_DECISION_ROUTER_ENABLED",
    slots: ["Decider pick", "Model B", "Model C"],
    pick: 0,
  },
];

export const AUTO_ROUTER_STRATEGIES_COPY = {
  kicker: ["AUTO ROUTER STRATEGIES"],
  legend: ["One tile per strategy with aliases grouped · green outline = example pick"],
  names: TILES.map(({ name }) => name),
  body: TILES.flatMap(({ body }) => body),
  slots: TILES.flatMap(({ slots }) => slots),
  flags: TILES.flatMap(({ flag }) => (flag ? [flag] : [])),
  flagStatus: ["DEFAULT OFF"],
};

const WIDTH = 1200;
const HEIGHT = 536;
const TRACK_Y = 80;
const SLOT_Y = [52, 80, 108];
const slotPath = (y) => `M 32,${TRACK_Y} C 72,${TRACK_Y} 84,${y} 124,${y}`;

function tile({ name, body, slots, pick, flag }, i) {
  const x = 40 + (i % 4) * 284;
  const y = 104 + Math.floor(i / 4) * 208;
  const timing = `begin="${(i * 0.16).toFixed(2)}s" dur="3.6s" repeatCount="indefinite"`;
  const tracks = SLOT_Y.map(
    (slotY, j) =>
      `    <path d="${slotPath(slotY)}" fill="none" ${j === pick ? 'class="stroke-ink" stroke-opacity="0.45"' : 'class="rule" stroke-dasharray="3 3"'}/>`
  );
  const targets = slots.map((label, j) => {
    const slotY = SLOT_Y[j];
    const style = j === pick ? 'class="ok-bg stroke-ok"' : 'class="surface"';
    return (
      `    <rect x="128" y="${slotY - 10}" width="116" height="20" rx="4" ${style}/>` +
      `<text x="186" y="${slotY + 4}" text-anchor="middle" class="label-sm">${esc(label)}</text>`
    );
  });
  return [
    `  <g transform="translate(${x},${y})">`,
    `    <rect width="268" height="192" rx="10" class="surface"/>`,
    `    <text x="16" y="26" class="mono">${esc(name)}</text>`,
    ...tracks,
    `    <circle r="3" class="ink" opacity="0"><animateMotion path="${slotPath(SLOT_Y[pick])}" keyPoints="0;0;1;1" keyTimes="0;0.08;0.42;1" calcMode="linear" ${timing}/><animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.08;0.1;0.4;0.42;1" ${timing}/></circle>`,
    `    <circle cx="24" cy="${TRACK_Y}" r="4" class="accent stroke-ink" stroke-width="1.6"/>`,
    ...targets,
    ...body.map(
      (line, j) => `    <text x="16" y="${138 + j * 17}" class="cell">${esc(line)}</text>`
    ),
    ...(flag
      ? [
          `    <text x="16" y="176" class="mono-xs">${esc(flag)}</text>`,
          `    <text x="252" y="176" text-anchor="end" class="label-xs" style="fill:var(--warn)">${AUTO_ROUTER_STRATEGIES_COPY.flagStatus[0]}</text>`,
        ]
      : []),
    "  </g>\n",
  ].join("\n");
}

export async function renderAutoRouterStrategies() {
  const [kicker] = AUTO_ROUTER_STRATEGIES_COPY.kicker;
  return outlineSvg(
    svgOpen({
      viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
      title: "Auto router strategies",
      desc: "Eight animated tiles show how the auto router picks a candidate. Each tile groups aliases and highlights an example pick. Nadir and decision fall back to rules when a decider cannot be used.",
    }) +
      gridDefs("ars-grid") +
      `  <rect class="bg" width="${WIDTH}" height="${HEIGHT}"/>\n` +
      `  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#ars-grid)"/>\n` +
      `  <text x="40" y="52" class="kicker">${esc(kicker)}</text>\n` +
      `  <line x1="${afterKicker(40, kicker)}" y1="47" x2="1160" y2="47" class="rule"/>\n` +
      `  <text x="40" y="80" class="body">${esc(AUTO_ROUTER_STRATEGIES_COPY.legend[0])}</text>\n` +
      TILES.map(tile).join("") +
      "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/auto-router-strategies.svg";
  const svg = await renderAutoRouterStrategies();
  writeFileSync(out, svg);
  console.log(`auto-router-strategies → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
