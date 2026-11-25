// README "works with zero config" strip in the Cheaper Inference UI Kit style (KEA-6307): four
// step tiles fade in left to right, a dot travels each connector and the final tile's border
// pulses. Output is committed as
// docs/diagrams/works-zero-config.svg; tests/unit/docs/readme-works-zero-config-svg.test.ts
// fails when the committed file no longer matches this generator.
//
//   node scripts/docs/gen-readme-works-zero-config.mjs [--out path.svg]
//
// Everything the strip draws lives in WORKS_ZERO_CONFIG_COPY: it is both the drawn text and what the
// outlining step shapes (scripts/docs/readme-outline.mjs).
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { outlineSvg } from "./readme-outline.mjs";
import { svgOpen, gridDefs, esc, afterKicker, roleWidth } from "./readme-diagram-theme.mjs";

const STEPS = [
  {
    tone: "info",
    bubble: "info-bg",
    icon: '<path d="M 11 2 L 11 15 M 6 10 L 11 15 L 16 10"/><path d="M 3 19 L 19 19"/>',
    iconWidth: "2.2",
    title: "Install",
    lines: [
      ["mono", "npm install -g omniroute"],
      ["body", "Node.js 22.22.2+ (22.x) or 24.x–26.x"],
    ],
  },
  {
    tone: "ink",
    bubble: "surface-muted",
    icon: '<path d="M 7 4 L 18 11 L 7 18 Z"/>',
    iconWidth: "2.2",
    title: "Start",
    lines: [
      ["mono", "omniroute"],
      ["body", "Dashboard and API on port 20128"],
    ],
  },
  {
    tone: "ink",
    bubble: "surface-muted",
    icon: '<path d="M 8 6 L 5 9 A 4 4 0 0 0 5 15 L 8 18 M 14 6 L 17 9 A 4 4 0 0 1 17 15 L 14 18 M 8.5 12 L 13.5 12"/>',
    iconWidth: "2.2",
    title: "Connect and get a key",
    lines: [
      ["label", "Dashboard → Providers,"],
      ["label", "then Dashboard → API Keys"],
    ],
  },
  {
    tone: "ok",
    bubble: "ok-bg",
    icon: '<path d="M 3 11 L 9 17 L 19 5"/>',
    iconWidth: "2.4",
    title: "Call /v1",
    lines: [
      ["body", "Base URL"],
      ["mono", "http://localhost:20128/v1"],
      ["body", "Model auto"],
    ],
  },
];

export const WORKS_ZERO_CONFIG_COPY = {
  kicker: ["CONNECT, THEN ROUTE"],
  headline: ["Install → start → connect → ", "call /v1"],
  stepNumbers: STEPS.map((_, i) => String(i + 1)),
  stepTitles: STEPS.map((s) => s.title),
  stepCopy: STEPS.flatMap(({ lines }) => lines.map(([, copy]) => copy)),
  chips: ["Your accounts", "Provider limits", "Local routing"],
  footer: ["auto", " uses eligible connections; availability and provider limits still apply."],
  footerRight: ["$0 · MIT"],
};

const W = 1200;
const H = 430;
const TILE_Y = 132;
const TILE_W = 256;
const TILE_H = 180;
const GAP = 32;
const tileX = (i) => 40 + i * (TILE_W + GAP);

function tile(s, i) {
  const x = tileX(i);
  const fadeStart = (0.05 + i * 0.2).toFixed(2);
  const fadeEnd = (0.3 + i * 0.2).toFixed(2);
  const lines = [
    `  <g transform="translate(${x},${TILE_Y})">`,
    `    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${fadeStart};${fadeEnd};1" dur="2s" fill="freeze"/>`,
    `    <rect width="${TILE_W}" height="${TILE_H}" rx="12" class="surface" stroke-width="1"/>`,
  ];
  if (i === STEPS.length - 1) {
    lines.push(
      `    <rect width="${TILE_W}" height="${TILE_H}" rx="12" fill="none" class="stroke-ok" stroke-width="1.5" opacity="0">` +
        `<animate attributeName="opacity" values="0;0.9;0" keyTimes="0;0.5;1" dur="2.6s" begin="3.2s" repeatCount="indefinite"/></rect>`
    );
  }
  lines.push(
    `    <rect y="16" width="4" height="${TILE_H - 32}" rx="2" class="${s.tone}"/>`,
    `    <circle cx="36" cy="36" r="15" class="${s.bubble}"/>`,
    `    <text x="36" y="42" text-anchor="middle" class="h3" style="font-size:16px;fill:var(--${s.tone})">${WORKS_ZERO_CONFIG_COPY.stepNumbers[i]}</text>`,
    `    <g transform="translate(60,25)" class="stroke-${s.tone}" stroke-width="${s.iconWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round">${s.icon}</g>`,
    `    <text x="20" y="78" class="h3">${esc(s.title)}</text>`,
    ...s.lines.map(
      ([role, copy], j) =>
        `    <text x="20" y="${112 + j * 21}" class="${role}">${esc(copy)}</text>`
    ),
    "  </g>"
  );
  return lines.join("\n");
}

function connector(_, i) {
  const left = tileX(i) + TILE_W + 3;
  const right = tileX(i + 1) - 3;
  const y = TILE_Y + TILE_H / 2;
  const path = `M ${left},${y} L ${right},${y}`;
  const timing = `dur="2.6s" begin="${(1.4 + i * 0.5).toFixed(1)}s" repeatCount="indefinite"`;
  return (
    `  <path d="${path}" class="rule" fill="none" stroke-width="2" stroke-dasharray="5 5"/>\n` +
    `  <circle r="4" class="${i === 0 ? "accent stroke-ink" : "ok"}" stroke-width="1" opacity="0">\n` +
    `    <animateMotion path="${path}" ${timing}/>` +
    `<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" ${timing}/>\n` +
    `  </circle>\n`
  );
}

export async function renderReadmeWorksZeroConfig() {
  const C = WORKS_ZERO_CONFIG_COPY;
  // Pills fit their label: 24 px of padding each side, 16 px between them.
  let chipX = 40;
  const chips = C.chips
    .map((label) => {
      const w = Math.ceil(roleWidth("h4", label)) + 48;
      const x = chipX;
      chipX += w + 16;
      return (
        `    <g transform="translate(${x},332)">\n` +
        `      <rect x="0" y="0" width="${w}" height="34" rx="17" class="ok-bg stroke-ok" stroke-opacity="0.45" stroke-width="1"/>\n` +
        `      <text x="24" y="22" class="h4">${esc(label)}</text>\n` +
        `    </g>`
      );
    })
    .join("\n");

  return outlineSvg(
    svgOpen({
      viewBox: `0 0 ${W} ${H}`,
      title:
        "Get started with OmniRoute in four steps: Install, Start, Connect and get a key, Call /v1",
      desc: "Install with npm install -g omniroute, then run omniroute to start the dashboard and API on port 20128. Connect a provider from Dashboard → Providers and get a key from Dashboard → API Keys. Call http://localhost:20128/v1 with model auto. The four tiles fade in, dots travel the connectors, and the final border pulses.",
    }) +
      gridDefs("wzc-grid") +
      `  <rect class="bg" x="0" y="0" width="${W}" height="${H}"/>\n` +
      `  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#wzc-grid)"/>\n` +
      // header
      `  <text x="40" y="56" class="kicker">${esc(C.kicker[0])}</text>\n` +
      `  <line x1="${afterKicker(40, C.kicker[0])}" y1="51" x2="1160" y2="51" class="rule" stroke-width="1"/>\n` +
      `  <text x="40" y="98" class="sub">${esc(C.headline[0])}<tspan font-weight="600" style="fill:var(--ok)">${esc(C.headline[1])}</tspan></text>\n` +
      STEPS.slice(1)
        .map((s, i) => connector(s, i))
        .join("") +
      STEPS.map((s, i) => tile(s, i)).join("\n") +
      "\n" +
      // "your ___" chips
      `  <g opacity="0">\n` +
      `    <animate attributeName="opacity" values="0;1" dur="0.5s" begin="1.3s" fill="freeze"/>\n` +
      chips +
      `\n  </g>\n` +
      // footer
      `  <text x="40" y="406" class="label-sm" style="fill:var(--muted)"><tspan style="fill:var(--ok)">${esc(C.footer[0])}</tspan>${esc(C.footer[1])}</text>\n` +
      `  <text x="1160" y="406" text-anchor="end" class="kicker">${esc(C.footerRight[0])}</text>\n` +
      "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/works-zero-config.svg";
  const svg = await renderReadmeWorksZeroConfig();
  writeFileSync(out, svg);
  console.log(`works-zero-config → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
