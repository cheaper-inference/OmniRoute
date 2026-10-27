// README "works with zero config" strip in the Cheaper Inference UI Kit style (KEA-6307): three
// step tiles (install → connect a provider → use your tool) fading in left to right, a dot
// travelling along each connector, the final tile's border pulsing. Output is committed as
// docs/diagrams/works-zero-config.svg; tests/unit/docs/readme-works-zero-config-svg.test.ts
// fails when the committed file no longer matches this generator.
//
//   node scripts/docs/gen-readme-works-zero-config.mjs [--out path.svg]
//
// Everything the strip draws lives in WORKS_ZERO_CONFIG_COPY: it is both the drawn text and the
// subset input for the embedded fonts, so a glyph can never be drawn without being embedded.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildFontFaceCss } from "./readme-fonts.mjs";
import { svgOpen, gridDefs, esc } from "./readme-diagram-theme.mjs";

// Step tiles: geometry, status token, number-circle fill, icon path(s) and the tile's own text
// (number, title, command line, body lines, optional trailing mono line).
const STEPS = [
  {
    x: 40,
    w: 332,
    tone: "info",
    bubble: "info-bg",
    icon: '<path d="M 11 2 L 11 15 M 6 10 L 11 15 L 16 10"/><path d="M 3 19 L 19 19"/>',
    iconWidth: "2.2",
    number: "1",
    title: "Install and start",
    command: "$ npm i -g omniroute",
    body: ["Then run omniroute; open"],
    mono: "localhost:20128",
  },
  {
    x: 435,
    w: 332,
    tone: "ink",
    bubble: "surface-muted",
    icon: '<path d="M 8 6 L 5 9 A 4 4 0 0 0 5 15 L 8 18 M 14 6 L 17 9 A 4 4 0 0 1 17 15 L 14 18 M 8.5 12 L 13.5 12"/>',
    iconWidth: "2.2",
    number: "2",
    title: "Connect provider",
    command: "Dashboard → Providers",
    body: ["Use your own account or API key.", "Review provider terms and limits."],
  },
  {
    x: 830,
    w: 330,
    tone: "ok",
    bubble: "ok-bg",
    icon: '<path d="M 3 11 L 9 17 L 19 5"/>',
    iconWidth: "2.4",
    number: "3",
    title: "Use your tool",
    command: "localhost:20128/v1",
    body: ['Set model to "auto"', "Eligible connections + fallback."],
  },
];

export const WORKS_ZERO_CONFIG_COPY = {
  kicker: ["CONNECT, THEN ROUTE"],
  headline: ["Install → connect a provider → ", "route."],
  stepNumbers: STEPS.map((s) => s.number),
  stepTitles: STEPS.map((s) => s.title),
  stepCommands: STEPS.map((s) => s.command),
  stepBody: STEPS.flatMap((s) => s.body),
  stepMono: STEPS.flatMap((s) => (s.mono ? [s.mono] : [])),
  chips: ["Your accounts", "Provider limits", "Local routing"],
  footer: ["auto", " uses eligible connections; availability and provider limits still apply."],
  footerRight: ["$0 · MIT"],
};

const W = 1200;
const H = 430;
const TILE_Y = 132;
const TILE_H = 172;
const FADE_BEGIN = ["0.1s", "0.5s", "0.9s"];

function tile(i) {
  const s = STEPS[i];
  const ix = s.x + 26; // inner left edge (old 66 / 461 / 856)
  const lines = [];
  lines.push(`  <g opacity="0">`);
  lines.push(
    `    <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${FADE_BEGIN[i]}" fill="freeze"/>`
  );
  lines.push(
    `    <rect x="${s.x}" y="${TILE_Y}" width="${s.w}" height="${TILE_H}" rx="12" class="surface" stroke-width="1"/>`
  );
  if (i === 2) {
    // The final tile's border pulses once the dots have arrived (same beat as before).
    lines.push(
      `    <rect x="${s.x}" y="${TILE_Y}" width="${s.w}" height="${TILE_H}" rx="12" fill="none" class="stroke-ok" stroke-width="1.5" opacity="0">` +
        `<animate attributeName="opacity" values="0;0.9;0" keyTimes="0;0.5;1" dur="2.6s" begin="3.2s" repeatCount="indefinite"/></rect>`
    );
  }
  lines.push(
    `    <rect x="${s.x}" y="${TILE_Y + 16}" width="4" height="140" rx="2" class="${s.tone}"/>`
  );
  lines.push(`    <circle cx="${s.x + 40}" cy="172" r="15" class="${s.bubble}"/>`);
  lines.push(
    `    <text x="${s.x + 40}" y="178" text-anchor="middle" class="cmd" style="fill:var(--${s.tone})">${esc(s.number)}</text>`
  );
  lines.push(
    `    <g transform="translate(${s.x + 68},161)" class="stroke-${s.tone}" stroke-width="${s.iconWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round">${s.icon}</g>`
  );
  lines.push(`    <text x="${s.x + 100}" y="179" class="h3">${esc(s.title)}</text>`);
  lines.push(`    <text x="${ix}" y="222" class="mono">${esc(s.command)}</text>`);
  // Two lines under the command, 21px apart: the body lines, then the mono line if the tile has one.
  const under = [
    ...s.body.map((t) => `class="body">${esc(t)}`),
    ...(s.mono ? [`class="mono" style="fill:var(--muted)">${esc(s.mono)}`] : []),
  ];
  under.forEach((t, l) => lines.push(`    <text x="${ix}" y="${258 + l * 21}" ${t}</text>`));
  lines.push(`  </g>`);
  return lines.join("\n");
}

export async function renderReadmeWorksZeroConfig() {
  const C = WORKS_ZERO_CONFIG_COPY;
  const { css } = await buildFontFaceCss({
    ui: [C.headline[0], ...C.stepBody].join(""),
    uiBold: [C.headline[1], ...C.stepTitles, ...C.chips].join(""),
    mono: [
      ...C.kicker,
      ...C.stepNumbers,
      ...C.stepCommands,
      ...C.stepMono,
      ...C.footer,
      ...C.footerRight,
    ].join(""),
  });

  const chips = [
    [40, 168],
    [224, 168],
    [408, 188],
  ]
    .map(
      ([x, w], i) =>
        `    <g transform="translate(${x},332)">\n` +
        `      <rect x="0" y="0" width="${w}" height="34" rx="17" class="ok-bg stroke-ok" stroke-opacity="0.45" stroke-width="1"/>\n` +
        `      <text x="24" y="22" class="h4">${esc(C.chips[i])}</text>\n` +
        `    </g>`
    )
    .join("\n");

  return (
    svgOpen({
      viewBox: `0 0 ${W} ${H}`,
      title:
        "Install and start OmniRoute, connect an eligible provider with your own account, then configure your tool. Auto routing depends on eligible connections and provider limits.",
      desc: "Animated flow card: three step tiles (Install and start, Connect provider, Use your tool) fade in left to right, a dot travels along the connectors between them in a loop, and the final check pulses.",
      fontFaceCss: css,
    }) +
    gridDefs("wzc-grid") +
    `  <defs>\n` +
    `    <path id="wzc-c1" d="M 372 218 L 432 218"/>\n` +
    `    <path id="wzc-c2" d="M 767 218 L 827 218"/>\n` +
    `  </defs>\n` +
    `  <rect class="bg" x="0" y="0" width="${W}" height="${H}"/>\n` +
    `  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#wzc-grid)"/>\n` +
    // header
    `  <text x="40" y="56" class="kicker">${esc(C.kicker[0])}</text>\n` +
    `  <line x1="300" y1="51" x2="1160" y2="51" class="rule" stroke-width="1"/>\n` +
    `  <text x="40" y="98" class="sub">${esc(C.headline[0])}<tspan font-weight="600" style="fill:var(--ok)">${esc(C.headline[1])}</tspan></text>\n` +
    // connectors (under the tiles) + travelling dots: lime = the request leaving the install
    // step, ok = the answer reaching the tool. The lime dot carries a hairline ink stroke so it
    // reads on the light canvas too.
    `  <g class="rule" stroke-width="2" stroke-dasharray="5 5" fill="none">\n` +
    `    <use href="#wzc-c1"/>\n    <use href="#wzc-c2"/>\n  </g>\n` +
    `  <circle r="4" class="accent stroke-ink" stroke-width="1">\n` +
    `    <animateMotion dur="2.6s" begin="1.4s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#wzc-c1"/></animateMotion>\n` +
    `    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="2.6s" begin="1.4s" repeatCount="indefinite"/>\n` +
    `  </circle>\n` +
    `  <circle r="4" class="ok">\n` +
    `    <animateMotion dur="2.6s" begin="1.9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#wzc-c2"/></animateMotion>\n` +
    `    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="2.6s" begin="1.9s" repeatCount="indefinite"/>\n` +
    `  </circle>\n` +
    [0, 1, 2].map((i) => tile(i)).join("\n") +
    "\n" +
    // "your ___" chips
    `  <g opacity="0">\n` +
    `    <animate attributeName="opacity" values="0;1" dur="0.5s" begin="1.3s" fill="freeze"/>\n` +
    chips +
    `\n  </g>\n` +
    // footer
    `  <text x="40" y="406" class="mono-sm" style="fill:var(--muted)"><tspan style="fill:var(--ok)">${esc(C.footer[0])}</tspan>${esc(C.footer[1])}</text>\n` +
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
