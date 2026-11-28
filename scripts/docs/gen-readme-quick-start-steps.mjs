// README Quick Start in the Cheaper Inference UI Kit style. Supported Node.js lines come
// from engines.node in package.json; the default dashboard port comes from .env.example.
//
//   node scripts/docs/gen-readme-quick-start-steps.mjs [--out path.svg]

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { esc, gridDefs, svgOpen } from "./readme-diagram-theme.mjs";
import { outlineSvg } from "./readme-outline.mjs";

const W = 1200;
const H = 456;
const CARD_W = 368;
const CARD_H = 188;
const COLUMNS = 3;

function supportedNodeLines(range) {
  return range
    .split("||")
    .map((clause) => {
      const match = clause.trim().match(/^>=(\d+)\.(\d+)\.(\d+)\s+<(\d+)$/);
      if (!match || Number(match[1]) >= Number(match[4])) {
        throw new Error(`quick-start-steps: unrecognized engines.node clause ${clause.trim()}`);
      }
      const [, major, minor, patch, upperMajor] = match;
      const lines = Array.from(
        { length: Number(upperMajor) - Number(major) },
        (_, i) => `${Number(major) + i}.x`
      );
      if (minor !== "0" || patch !== "0") {
        lines[0] = `${major}.${minor}.${patch} and later ${lines[0]}`;
      }
      return lines.join(", ");
    })
    .join(", or ");
}

export function buildQuickStartSteps() {
  const pkg = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8"));
  const env = readFileSync(new URL("../../.env.example", import.meta.url), "utf8");
  const port = env.match(/^PORT=(\d+)$/m)?.[1];
  if (!port) throw new Error("quick-start-steps: no default PORT in .env.example");

  return [
    {
      place: "Before you install",
      title: "Supported Node.js",
      lines: [
        ["detail", supportedNodeLines(pkg.engines.node)],
        ["detail", "Check with node --version."],
      ],
    },
    {
      place: "Terminal",
      title: "Install and start",
      lines: [
        ["mono", `npm install -g ${pkg.name}`],
        ["mono", "omniroute"],
        ["detail", `Dashboard http://localhost:${port}, API /v1`],
      ],
    },
    {
      place: "Browser",
      title: "Password and provider",
      lines: [
        ["detail", "Set a dashboard password in first-run setup."],
        ["detail", "Dashboard → Providers → add a key or sign in."],
      ],
    },
    {
      place: "Browser",
      title: "Create an OmniRoute key",
      lines: [
        ["detail", "Dashboard → API Keys → Create API Key"],
        ["detail", "Shown once. For your tools, not a provider key."],
      ],
    },
    {
      place: "Terminal",
      title: "First request",
      lines: [
        ["detail", "POST /v1/chat/completions with model auto."],
        ["detail", "GET /v1/models lists what your key can reach."],
      ],
    },
    {
      place: "Your coding tool",
      title: "Point it at OmniRoute",
      lines: [
        ["mono", "omniroute configure codex"],
        ["mono", "omniroute run claude --model auto"],
      ],
    },
  ];
}

function card({ place, title, lines }, i) {
  const x = 32 + (i % COLUMNS) * (CARD_W + 16);
  const y = 32 + Math.floor(i / COLUMNS) * (CARD_H + 16);
  return [
    `  <g class="quick-start-step" transform="translate(${x},${y})">`,
    `    <rect width="${CARD_W}" height="${CARD_H}" rx="12" class="surface"/>`,
    '    <circle cx="36" cy="36" r="16" class="surface-muted"/>',
    `    <text x="36" y="42" text-anchor="middle" class="h3">${i + 1}</text>`,
    `    <text x="64" y="41" class="label" style="font-size:15px">${esc(place)}</text>`,
    `    <text x="20" y="86" class="h3" style="font-size:23px">${esc(title)}</text>`,
    ...lines.map(
      ([role, line], j) =>
        `    <text x="20" y="${116 + 22 * j}" class="${role}">${esc(line)}</text>`
    ),
    "  </g>\n",
  ].join("\n");
}

export async function renderReadmeQuickStartSteps() {
  const steps = buildQuickStartSteps();
  return outlineSvg(
    svgOpen({
      viewBox: `0 0 ${W} ${H}`,
      title: "OmniRoute Quick Start",
      desc: steps
        .map(
          ({ place, title, lines }, i) =>
            `${i + 1}. ${place}. ${title}. ${lines.map(([, line]) => line).join(" ")}`
        )
        .join(" "),
      extraCss: ".detail{font-size:16px;fill:var(--body)}\n.mono{font-size:15px}",
    }) +
      gridDefs("quick-start-grid") +
      `  <rect width="${W}" height="${H}" class="bg"/>\n` +
      `  <rect width="${W}" height="${H}" fill="url(#quick-start-grid)"/>\n` +
      steps.map((s, i) => card(s, i)).join("") +
      "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/quick-start-steps.svg";
  const svg = await renderReadmeQuickStartSteps();
  writeFileSync(out, svg);
  console.log(`quick-start-steps → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
