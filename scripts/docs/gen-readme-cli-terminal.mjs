// README terminal demo in the Cheaper Inference UI Kit style (KEA-6307). An inverse (dark in
// both schemes) terminal window cycling three real OmniRoute CLI commands with a clipPath
// typewriter (calcMode="discrete"), their output revealing line by line, and a scrolling
// subcommand ticker — the same 18 s / 55 s choreography and keyTimes as the previous file; only
// type (IBM Plex Mono via .term), color (kit tokens) and the per-glyph widths changed.
// The output is committed as docs/diagrams/cli-terminal.svg and
// tests/unit/docs/readme-cli-terminal-svg.test.ts fails when the committed file no longer
// matches this generator (it also runs the counts gate on the output: the provider total is a
// live number).
//
//   node scripts/docs/gen-readme-cli-terminal.mjs [--out path.svg]
//
// Demo script (vhs-style; keyTimes below are its compilation over an 18 s cycle):
//   frame 0: completed `omniroute providers list` screen (fades at 0.1 s)
//   Type "omniroute providers list" 0.2 → 1.0 s · output 0.8 → 1.6 s · hold until 5.7 s
//   Type "omniroute combo list"     6.3 → 7.0 s · output 6.8 → 7.6 s · hold until 11.7 s
//   Type "omniroute health"        12.2 → 13.0 s · output 12.8 → 13.6 s · hold until 16.7 s
//   Ticker: 32 commands scrolling left, one full period every 55 s.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildFontFaceCss } from "./readme-fonts.mjs";
import { KIT, svgOpen, esc } from "./readme-diagram-theme.mjs";

const NB = " "; // NBSP runs keep the column alignment (spaces collapse in <text>)
const nb = (n) => NB.repeat(n);

// Status colors on the inverse panel. The panel is --inverse-bg (the kit's neutral-950) in
// BOTH schemes, so the light-scheme --ok/--warn/--err/--muted (tuned for light surfaces) would
// sit at ~3:1 on it; the dark-block values are the ones designed for this background.
const INV = KIT.dark;

// The gate-checked provider total (scripts/check/check-docs-counts-sync.mjs reads
// "<n> providers" from the title); the health line and the "… N more providers" footer of the
// providers screen derive from it so the three numbers can never disagree.
const PROVIDER_TOTAL = 380;

// The three screens: command, then header + 4 lines + a dim footer line. Segments are plain
// strings or { t, c } with c ∈ ok | warn | err | dim.
const SCREENS = [
  {
    cmd: "omniroute providers list",
    header: "OmniRoute Providers",
    lines: [
      [`1f3a9c2e${nb(2)}anthropic${nb(3)}Claude Max 20x${nb(4)}`, { t: "active", c: "ok" }],
      [`8c2d5b1a${nb(2)}codex${nb(7)}Codex Pro (team)${nb(2)}`, { t: "active", c: "ok" }],
      [`f4e0a97b${nb(2)}glm${nb(9)}GLM Coding Plan${nb(3)}`, { t: "active", c: "ok" }],
      [`03bd6e5f${nb(2)}kimi${nb(8)}Kimi K2 free${nb(6)}`, { t: "active", c: "ok" }],
    ],
    footer: null, // computed below: PROVIDER_TOTAL minus the rows listed
    // keyTimes, verbatim from the previous file
    typing: "0;0.012;0.018;0.024;0.030;0.036;0.042;0.048;0.054;1",
    caret: "0;0.011;0.012;0.022;0.032;0.042;0.052;0.074;1",
    group: { values: "1;1;0;0", keyTimes: "0;0.315;0.33;1" },
    reveal: [
      "0.045;0.047",
      "0.053;0.055",
      "0.061;0.063",
      "0.069;0.071",
      "0.077;0.079",
      "0.085;0.087",
    ],
  },
  {
    cmd: "omniroute combo list",
    header: "OmniRoute Combos",
    lines: [
      [
        nb(2),
        { t: "●", c: "ok" },
        ` always-on${nb(5)}[priority${nb(6)}] `,
        { t: "enabled", c: "ok" },
      ],
      [
        nb(2),
        { t: "○", c: "dim" },
        ` cost-saver${nb(4)}[cost-optimized] `,
        { t: "enabled", c: "ok" },
      ],
      [
        nb(2),
        { t: "○", c: "dim" },
        ` fusion-panel${nb(2)}[fusion${nb(8)}] `,
        { t: "enabled", c: "ok" },
      ],
      [
        nb(2),
        { t: "○", c: "dim" },
        ` context-relay [context-relay${nb(1)}] `,
        { t: "enabled", c: "ok" },
      ],
    ],
    footer: "… run: omniroute combo create",
    typing: "0;0.348;0.351;0.357;0.363;0.369;0.375;0.381;0.387;1",
    caret: "0;0.344;0.348;0.355;0.365;0.375;0.385;0.407;1",
    group: { values: "0;0;1;1;0;0", keyTimes: "0;0.333;0.348;0.648;0.663;1" },
    reveal: ["0.378;0.38", "0.386;0.388", "0.394;0.396", "0.402;0.404", "0.41;0.412", "0.418;0.42"],
  },
  {
    cmd: "omniroute health",
    header: "OmniRoute Health",
    lines: [
      [`${nb(2)}Status: `, { t: "healthy", c: "ok" }, `${nb(3)}Uptime: 4d 12h 33m`],
      [`${nb(2)}Requests (24h): 18,412${nb(3)}p95: 412ms`],
      [
        `${nb(2)}Breakers: `,
        { t: "● 24 closed", c: "ok" },
        nb(2),
        { t: "◒ 1 half-open", c: "warn" },
        nb(2),
        { t: "○ 0 open", c: "err" },
      ],
      [`${nb(2)}Providers: ${PROVIDER_TOTAL} registered${nb(3)}150+ free tiers`],
    ],
    footer: "… live: /dashboard · omniroute status",
    typing: "0;0.678;0.684;0.690;0.696;0.702;0.708;0.714;0.720;1",
    caret: "0;0.677;0.678;0.688;0.698;0.708;0.718;0.74;1",
    group: { values: "0;0;1;1;0;0", keyTimes: "0;0.666;0.678;0.93;0.945;1" },
    reveal: [
      "0.711;0.713",
      "0.719;0.721",
      "0.727;0.729",
      "0.735;0.737",
      "0.743;0.745",
      "0.751;0.753",
    ],
  },
];

SCREENS[0].footer = `… ${PROVIDER_TOTAL - SCREENS[0].lines.length} more providers`;

// Subcommand ticker: 32 top-level commands, the lime ones are the diagram's brand emphasis.
const TICKER = [
  ["providers", true],
  ["oauth"],
  ["keys"],
  ["combo", true],
  ["nodes"],
  ["models"],
  ["cache"],
  ["compression", true],
  ["cost"],
  ["usage"],
  ["quota"],
  ["health", true],
  ["resilience"],
  ["telemetry"],
  ["logs"],
  ["audit"],
  ["mcp", true],
  ["a2a"],
  ["cloud"],
  ["memory", true],
  ["skills"],
  ["eval"],
  ["doctor", true],
  ["repl"],
  ["tunnel"],
  ["backup"],
  ["sync"],
  ["webhooks"],
  ["policy"],
  ["pricing"],
  ["translator"],
  ["simulate"],
];

// Ticker segments as drawn: highlighted words and the plain runs between them.
function tickerSegments() {
  const segs = [];
  let plain = "";
  TICKER.forEach(([word, hl], i) => {
    const sep = i === 0 ? "" : " · ";
    if (hl) {
      if ((plain + sep).length > 0) segs.push({ t: plain + sep });
      plain = "";
      segs.push({ t: word, hl: true });
    } else {
      plain += sep + word;
    }
  });
  segs.push({ t: plain + " …" });
  return segs;
}
const TICKER_SEGS = tickerSegments();

const segText = (s) => (typeof s === "string" ? s : s.t);

export const CLI_TERMINAL_COPY = {
  header: ["omniroute — 89 top-level commands"],
  prompt: ["$"],
  commands: SCREENS.map((s) => s.cmd),
  headers: SCREENS.map((s) => s.header),
  lines: SCREENS.flatMap((s) => s.lines.flatMap((l) => l.map(segText))),
  footers: SCREENS.map((s) => s.footer),
  ticker: TICKER_SEGS.map((s) => s.t),
};

const TITLE = `Animated terminal demoing the OmniRoute CLI: omniroute providers list (${PROVIDER_TOTAL} providers registered, anthropic, codex, glm, kimi shown active), omniroute combo list (always-on priority, cost-saver, fusion-panel, context-relay) and omniroute health (healthy, 18412 requests in 24h, p95 412ms, circuit breakers 24 closed, 1 half-open, 0 open), cycling over 89 top-level commands: providers, oauth, keys, combo, nodes, models, cache, compression, cost, usage, quota, health, resilience, telemetry, logs, audit, mcp, a2a, cloud, memory, skills, eval, doctor, repl, tunnel, backup, sync, webhooks, policy, pricing, translator, simulate and more.`;
const DESC =
  "Compact animated terminal cycling three real OmniRoute CLI commands with a typewriter effect and a scrolling subcommand ticker; the first frame shows the completed providers-list screen.";

// Screen lines are .term-lg (16 px), the title bar and ticker .term (13 px) — IBM Plex Mono
// advances 0.6 em (9.6 / 7.8 px), but renderers without subpixel positioning (Chromium on
// Linux) round it to whole pixels (10 / 8), so every typed/ticker text is pinned to n × that
// width with textLength and the clip, caret and ticker period use the same number.
const CHAR_W = 10; // .term-lg screen lines
const TICKER_CHAR_W = 8; // .term ticker
const pin = (s, w = CHAR_W) => `textLength="${s.length * w}" lengthAdjust="spacing"`;
const CMD_X = 64;
const LINE_Y = [100, 128, 154, 180, 206, 232];
const STEPS = 8; // the previous file typed each command in 8 discrete steps

const r1 = (n) => Math.round(n * 10) / 10;
const INV_FILL = { ok: "--inv-ok", warn: "--inv-warn", err: "--inv-err" };

function lineMarkup(segs) {
  return segs
    .map((s) => {
      if (typeof s === "string") return esc(s);
      if (s.c === "dim") return `<tspan fill-opacity="0.65">${esc(s.t)}</tspan>`;
      return `<tspan style="fill:var(${INV_FILL[s.c]})">${esc(s.t)}</tspan>`;
    })
    .join("");
}

// A screen's output lines — header, four rows, dim footer — with optional reveal animations.
function screenLines(s, animated) {
  const reveal = (i) =>
    animated
      ? `<animate attributeName="opacity" calcMode="discrete" values="0;0;1" keyTimes="0;${s.reveal[i]}" dur="18s" repeatCount="indefinite"/>`
      : "";
  const op = animated ? ' opacity="0"' : "";
  const rows = [
    `<text x="40" y="${LINE_Y[0]}" class="term-lg" style="fill:var(--inv-info)"${op}>${reveal(0)}${esc(s.header)}</text>`,
    ...s.lines.map(
      (l, i) =>
        `<text x="40" y="${LINE_Y[i + 1]}" class="term-lg" style="fill:var(--inv-muted)"${op}>${reveal(i + 1)}${lineMarkup(l)}</text>`
    ),
    `<text x="40" y="${LINE_Y[5]}" class="term-lg" style="fill:var(--inv-muted)" fill-opacity="0.65"${op}>${reveal(5)}${esc(s.footer)}</text>`,
  ];
  return rows.map((r) => `  ${r}`).join("\n");
}

function typingValues(cmd) {
  const n = cmd.length;
  const widths = [];
  for (let i = 0; i <= STEPS; i++) widths.push(r1((i * n * CHAR_W) / STEPS));
  widths.push(widths[STEPS]); // hold until the loop restarts
  return widths;
}

export async function renderCliTerminal() {
  const C = CLI_TERMINAL_COPY;
  const { css } = await buildFontFaceCss({
    mono: Object.values(C).flat().join(""),
  });

  // One typing ramp per screen: the clip widths and the caret x positions come from it.
  const ramps = SCREENS.map((s) => typingValues(s.cmd));

  const clipPaths = SCREENS.map(
    (s, i) =>
      `    <clipPath id="cli-tw${i}"><rect x="${CMD_X}" y="46" height="26" width="0">` +
      `<animate attributeName="width" calcMode="discrete" values="${ramps[i].join(";")}" keyTimes="${s.typing}" dur="18s" repeatCount="indefinite"/>` +
      `</rect></clipPath>`
  );

  const screens = SCREENS.map((s, i) => {
    const caretXs = ramps[i].map((w) => r1(CMD_X + w)).join(";");
    return (
      `  <g opacity="${i === 0 ? 1 : 0}">\n` +
      `  <animate attributeName="opacity" values="${s.group.values}" keyTimes="${s.group.keyTimes}" dur="18s" repeatCount="indefinite"/>\n` +
      `  <text x="40" y="66" class="term-lg" style="fill:var(--inv-ok)">${esc("$")}</text>\n` +
      `  <g clip-path="url(#cli-tw${i})"><text x="${CMD_X}" y="66" class="term-lg" ${pin(s.cmd)}>${esc(s.cmd)}</text></g>\n` +
      `  <rect y="52" width="9" height="20" style="fill:var(--inv-muted)" opacity="0">\n` +
      `    <animate attributeName="x" calcMode="discrete" values="${caretXs}" keyTimes="${s.typing}" dur="18s" repeatCount="indefinite"/>\n` +
      `    <animate attributeName="opacity" values="0;0;1;0.2;1;0.2;1;0;0" keyTimes="${s.caret}" dur="18s" repeatCount="indefinite"/>\n` +
      `  </rect>\n` +
      screenLines(s, true) +
      `\n  </g>`
    );
  });

  // Ticker: one period = the text plus one " · " separator; the copy repeats at that offset.
  const tickerLen = C.ticker.join("").length;
  const period = r1((tickerLen + 3) * TICKER_CHAR_W);
  const tickerPin = pin(C.ticker.join(""), TICKER_CHAR_W);
  const tickerText = TICKER_SEGS.map((s) =>
    s.hl ? `<tspan style="fill:var(--accent)">${esc(s.t)}</tspan>` : esc(s.t)
  ).join("");

  return (
    svgOpen({
      viewBox: "0 0 1200 350",
      title: TITLE,
      desc: DESC,
      fontFaceCss: css,
      extraCss:
        `:root{--inv-ok:${INV.ok};--inv-warn:${INV.warn};--inv-err:${INV.err};` +
        `--inv-info:${INV.info};--inv-muted:${INV.muted}}`,
    }) +
    `  <defs>\n` +
    `    <clipPath id="cli-ticker"><rect x="12" y="304" width="1176" height="40"/></clipPath>\n` +
    clipPaths.join("\n") +
    `\n  </defs>\n` +
    `  <rect class="bg" x="0" y="0" width="1200" height="350"/>\n` +
    // The window: inverse surface with a 1 px border so it keeps an edge on the dark canvas.
    `  <rect x="0.5" y="0.5" width="1199" height="349" rx="12" class="inverse rule" stroke-width="1"/>\n` +
    `  <g style="fill:var(--inverse-text)" opacity="0.06">` +
    `<rect x="0.5" y="0.5" width="1199" height="34" rx="12"/><rect x="0.5" y="22" width="1199" height="12.5"/></g>\n` +
    `  <path d="M 0.5 34.5 L 1199.5 34.5" style="stroke:var(--inverse-text)" stroke-opacity="0.12" stroke-width="1"/>\n` +
    `  <circle cx="24" cy="17" r="6" style="fill:var(--inv-err)"/>` +
    `<circle cx="46" cy="17" r="6" style="fill:var(--inv-warn)"/>` +
    `<circle cx="68" cy="17" r="6" style="fill:var(--inv-ok)"/>\n` +
    `  <text x="600" y="22" text-anchor="middle" class="term" style="fill:var(--inv-muted)">${esc(C.header[0])}</text>\n` +
    // Frame 0: the completed providers screen, fading out as the typing starts.
    `  <g>\n` +
    `  <animate attributeName="opacity" values="1;0;0" keyTimes="0;0.006;1" dur="18s" repeatCount="indefinite"/>\n` +
    `  <text x="${CMD_X}" y="66" class="term-lg" ${pin(SCREENS[0].cmd)}>${esc(SCREENS[0].cmd)}</text>\n` +
    screenLines(SCREENS[0], false) +
    `\n  </g>\n` +
    screens.join("\n") +
    `\n  <path d="M 0.5 300.5 L 1199.5 300.5" style="stroke:var(--inverse-text)" stroke-opacity="0.12" stroke-width="1"/>\n` +
    `  <g clip-path="url(#cli-ticker)"><g class="term" style="fill:var(--inv-muted)">\n` +
    `    <animateTransform attributeName="transform" type="translate" from="0 0" to="-${period} 0" dur="55s" repeatCount="indefinite"/>\n` +
    `    <text x="24" y="330" ${tickerPin}>${tickerText}</text><text x="${r1(24 + period)}" y="330" ${tickerPin}>${tickerText}</text>\n` +
    `  </g></g>\n` +
    "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/cli-terminal.svg";
  const svg = await renderCliTerminal();
  writeFileSync(out, svg);
  console.log(`cli-terminal → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
