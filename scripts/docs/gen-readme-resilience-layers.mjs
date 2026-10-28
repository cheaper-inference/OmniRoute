// README resilience diagram (provider circuit breaker / connection cooldown / model lockout) in
// the Cheaper Inference UI Kit style (KEA-6307). The output is committed as
// docs/diagrams/resilience-layers.svg; tests/unit/docs/readme-resilience-layers-svg.test.ts
// fails when the committed file no longer matches this generator, so a stale picture cannot ship.
//
//   node scripts/docs/gen-readme-resilience-layers.mjs [--out path.svg]
//
// Everything the diagram draws lives in RESILIENCE_LAYERS_COPY: it is both the drawn text and
// the subset input for the embedded fonts. The three healing loops replay on one shared 18 s
// cycle; every window below is the beat the previous hand-written file carried.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildFontFaceCss } from "./readme-fonts.mjs";
import { svgOpen, gridDefs, esc } from "./readme-diagram-theme.mjs";

const LAYERS = [
  {
    tone: "ink",
    kicker: "LAYER 1 · SCOPE: WHOLE PROVIDER",
    title: "Provider circuit breaker",
    desc: ["isolate a provider failing upstream —", "reroute now, auto-probe to recover"],
    bullets: [
      "trips only on 408 · 500 · 502 · 503 · 504",
      "threshold — oauth 8× · api-key 12× · local 2×",
      "reset — 60s · 30s · 15s → HALF-OPEN probe",
      "lazy recovery — reads refresh expired state",
    ],
  },
  {
    tone: "warn",
    kicker: "LAYER 2 · SCOPE: ONE KEY / ACCOUNT",
    title: "Connection cooldown",
    desc: ["skip one rate-limited key while the", "other keys keep serving the provider"],
    bullets: [
      "base cooldown — oauth 5s · api-key 3s",
      "repeat fails — backoff ×2 (anti-herd guard)",
      "429 honors Retry-After / reset headers",
      "success → clearAccountError() resets all",
    ],
  },
  {
    tone: "info",
    kicker: "LAYER 3 · SCOPE: ONE MODEL",
    title: "Model lockout",
    desc: ["quarantine a single model — never kill", "the whole connection for one 429"],
    bullets: [
      "scope — provider + connection + model",
      "per-model 429 · local 404 · mode denials",
      "locked model ≠ dead key",
      "other models keep serving instantly",
    ],
  },
];

export const RESILIENCE_LAYERS_COPY = {
  kicker: ["RESILIENCE · 3 SELF-HEALING LAYERS"],
  headline: [
    "The ",
    "right layer",
    " for the right failure — never kill more than ",
    "what actually broke",
    ".",
  ],
  legend: ["PROVIDER", "CONNECTION / KEY", "MODEL"],
  layerKickers: LAYERS.map((l) => l.kicker),
  titles: LAYERS.map((l) => l.title),
  descriptions: LAYERS.flatMap((l) => l.desc),
  bullets: LAYERS.flatMap((l) => l.bullets),
  breaker: [
    "router",
    "provider A",
    "fails ×12",
    "provider B ← next",
    "CLOSED",
    "OPEN",
    "HALF-OPEN",
  ],
  cooldown: ["provider · 3 keys", "key-1", "429", "key-2", "key-3", "cooling ×2ⁿ"],
  lockout: ["key-1", "model-a", "model-b", "model-c"],
  foot: [
    "which failure trips what → ",
    "5xx / 408 : breaker",
    " · ",
    "key 429 / 401 : cooldown",
    "one-model 429 / 404 : lockout",
    " · banned / expired / credits : terminal (operator)",
  ],
};

const DUR = "18s";
const n = (v) => String(Math.round(v * 1000) / 1000);
const tone = (t) => `var(--${t})`;

// A request dot riding `path` between cycle fractions start → end (born/dies 1.5 % inside).
function dot(path, cls, start, end) {
  return (
    `<circle r="2.8" class="${cls}" opacity="0">` +
    `<animateMotion path="${path}" begin="0s" dur="${DUR}" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;${n(start)};${n(end)};1" calcMode="linear"/>` +
    `<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${n(start)};${n(start + 0.015)};${n(end - 0.015)};${n(end)};1" begin="0s" dur="${DUR}" repeatCount="indefinite"/>` +
    `</circle>\n`
  );
}

// A failure cross or success check shown between cycle fractions t0 → t1 (10 ms fades).
function mark(kind, x, y, t0, t1) {
  const shape =
    kind === "x"
      ? `<g transform="translate(${x},${y})" class="stroke-err" stroke-width="2.6" stroke-linecap="round"><line x1="-6" y1="-6" x2="6" y2="6"/><line x1="6" y1="-6" x2="-6" y2="6"/></g>`
      : `<g transform="translate(${x},${y})" class="stroke-ok" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M -7,0 L -2,5 L 7,-6"/></g>`;
  return (
    `<g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${n(t0)};${n(t0 + 0.01)};${n(t1)};${n(t1 + 0.01)};1" begin="0s" dur="${DUR}" repeatCount="indefinite"/>` +
    shape +
    `</g>\n`
  );
}

// Breaker state pill: tinted background, state dot (discrete on/off per window), label.
function pill(x, y, w, t, label, values, keyTimes) {
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="24" rx="12" class="${t}-bg"/>` +
    `<circle cx="${x + 16}" cy="${y + 12}" r="4.5" class="${t}"><animate attributeName="opacity" calcMode="discrete" values="${values}" keyTimes="${keyTimes}" dur="${DUR}" repeatCount="indefinite"/></circle>` +
    `<text x="${x + 30}" y="${y + 16}" class="mono-sm" style="fill:${tone(t)}">${esc(label)}</text>\n`
  );
}

const solid = (d) =>
  `<path d="${d}" fill="none" class="stroke-ink" stroke-opacity="0.35" stroke-width="1.6"/>\n`;
const dashed = (d) =>
  `<path d="${d}" fill="none" style="stroke:var(--muted)" stroke-opacity="0.6" stroke-width="1.1" stroke-dasharray="3 3"/>\n`;
const card = (x, y, w, h, rx, strokeCls = "", fillCls = "surface-subtle") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${fillCls}${strokeCls ? " " + strokeCls : ""}"${strokeCls ? "" : ' style="stroke:var(--border)"'} stroke-width="1"/>\n`;
const mono = (x, y, s, extra = "") =>
  `<text x="${x}" y="${y}" class="mono-sm"${extra}>${esc(s)}</text>\n`;

function panel(i) {
  const L = LAYERS[i];
  const y = 136 + i * 182;
  const bullets = L.bullets
    .map(
      (b, k) =>
        `<circle cx="816" cy="${y + 32.5 + k * 30}" r="2" style="fill:${tone(L.tone)}"/>` +
        mono(828, y + 36 + k * 30, b)
    )
    .join("");
  return (
    `  <rect x="40" y="${y}" width="1120" height="168" rx="12" class="surface" stroke-width="1"/>\n` +
    `  <text x="64" y="${y + 34}" class="lbl" style="fill:${tone(L.tone)}">${esc(L.kicker)}</text>\n` +
    `  <text x="64" y="${y + 62}" class="h3">${esc(L.title)}</text>\n` +
    `  <text x="64" y="${y + 88}" class="body">${esc(L.desc[0])}</text>\n` +
    `  <text x="64" y="${y + 106}" class="body">${esc(L.desc[1])}</text>\n` +
    `  ${bullets}`
  );
}

function breakerScene() {
  const C = RESILIENCE_LAYERS_COPY.breaker;
  const pA = "M 418,220 C 442,220 446,189 466,189";
  const pB = "M 418,220 C 442,220 446,261 466,261";
  return (
    `  <circle cx="404" cy="220" r="13" class="accent"/><circle cx="404" cy="220" r="4" style="fill:var(--accent-ink)"/>\n` +
    `  <text x="404" y="250" text-anchor="middle" class="mono-xs">${esc(C[0])}</text>\n` +
    `  ` +
    card(470, 164, 152, 50, 10) +
    `  ` +
    mono(486, 186, C[1]) +
    `  ` +
    mono(486, 204, C[2], ' style="fill:var(--err)"') +
    `  ` +
    card(470, 240, 152, 42, 10, "stroke-ok") +
    `  ` +
    mono(486, 266, C[3], ' style="fill:var(--ok)"') +
    `  ` +
    solid(pA) +
    `  ` +
    dashed(pB) +
    `  ` +
    pill(656, 156, 128, "ok", C[4], "1;0.18;1;1", "0;0.28;0.82;1") +
    `  ` +
    pill(656, 186, 128, "err", C[5], "0.18;1;0.18;0.18", "0;0.28;0.62;1") +
    `  ` +
    pill(656, 216, 128, "info", C[6], "0.18;1;0.18;0.18", "0;0.62;0.82;1") +
    `  ` +
    dot(pA, "ink", 0.03, 0.11) +
    `  ` +
    dot(pA, "ink", 0.09, 0.17) +
    `  ` +
    dot(pA, "ink", 0.15, 0.23) +
    `  ` +
    mark("x", 600, 189, 0.23, 0.28) +
    `  ` +
    dot(pB, "ok", 0.33, 0.44) +
    `  ` +
    dot(pB, "ok", 0.4, 0.51) +
    `  ` +
    dot(pB, "ok", 0.47, 0.58) +
    `  ` +
    dot(pA, "info", 0.66, 0.74) +
    `  ` +
    mark("check", 600, 189, 0.76, 0.83)
  );
}

function cooldownScene() {
  const C = RESILIENCE_LAYERS_COPY.cooldown;
  const pA = "M 390,402 C 404,402 404,375 416,375";
  const pB = "M 390,402 C 404,402 404,411 416,411";
  return (
    `  <circle cx="384" cy="402" r="5" class="accent stroke-ink" stroke-width="1"/>\n` +
    `  <rect x="404" y="336" width="270" height="134" rx="10" fill="none" class="rule" stroke-width="1"/>\n` +
    `  <text x="416" y="352" class="mono-xs">${esc(C[0])}</text>\n` +
    `  ` +
    card(420, 362, 120, 26, 6, "stroke-err") +
    `  ` +
    mono(432, 379, C[1]) +
    `  ` +
    mono(498, 379, C[2], ' style="fill:var(--err)"') +
    `  ` +
    card(420, 398, 120, 26, 6, "stroke-ok") +
    `  ` +
    mono(432, 415, C[3]) +
    `  ` +
    card(420, 434, 120, 26, 6) +
    `  ` +
    mono(432, 451, C[4]) +
    `  <rect x="556" y="363" width="112" height="24" rx="12" class="warn-bg"/>\n` +
    `  <text x="568" y="379" class="mono-xs" style="fill:var(--warn)">${esc(C[5])}</text>\n` +
    `  <rect x="556" y="392" width="112" height="4" rx="2" class="track"/>\n` +
    `  <rect x="556" y="392" width="112" height="4" rx="2" class="warn"><animate attributeName="width" values="112;0;0;112" keyTimes="0;0.7;0.78;1" dur="${DUR}" repeatCount="indefinite"/></rect>\n` +
    `  ` +
    dashed(pA) +
    `  ` +
    solid(pB) +
    `  ` +
    dot(pA, "ink", 0.03, 0.1) +
    `  ` +
    mark("x", 530, 375, 0.1, 0.15) +
    `  ` +
    dot(pB, "ok", 0.2, 0.29) +
    `  ` +
    dot(pB, "ok", 0.29, 0.38) +
    `  ` +
    dot(pB, "ok", 0.38, 0.47) +
    `  ` +
    dot(pB, "ok", 0.47, 0.56) +
    `  ` +
    dot(pA, "ok", 0.8, 0.88) +
    `  ` +
    mark("check", 548, 375, 0.89, 0.96)
  );
}

function lockoutScene() {
  const C = RESILIENCE_LAYERS_COPY.lockout;
  const pA = "M 512,584 C 540,584 548,544 576,544";
  const pB = "M 512,584 C 545,584 545,584 576,584";
  const pC = "M 512,584 C 540,584 548,624 576,624";
  const check = (ty) =>
    `<g transform="translate(682,${ty})" class="stroke-ok" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M 0,6 L 3.5,9.5 L 10,1.5"/></g>\n`;
  return (
    `  ` +
    card(396, 560, 112, 48, 10, "stroke-accent", "accent-soft") +
    `  ` +
    mono(412, 588, C[0]) +
    `  ` +
    card(580, 530, 130, 28, 6, "stroke-ok") +
    `  ` +
    mono(594, 548, C[1]) +
    `  ` +
    check(538) +
    `  ` +
    card(580, 570, 130, 28, 6, "stroke-err", "err-bg") +
    `  ` +
    mono(594, 588, C[2], ' style="fill:var(--ink)"') +
    `  <g transform="translate(682,577)" class="stroke-err" stroke-width="1.6" fill="none" stroke-linecap="round"><rect x="0" y="5" width="11" height="8" rx="1.5"/><path d="M 2,5 L 2,3 A 3.5,3.5 0 0 1 9,3 L 9,5"/></g>\n` +
    `  ` +
    card(580, 610, 130, 28, 6, "stroke-ok") +
    `  ` +
    mono(594, 628, C[3]) +
    `  ` +
    check(618) +
    `  ` +
    solid(pA) +
    `  ` +
    dashed(pB) +
    `  ` +
    solid(pC) +
    `  ` +
    dot(pA, "ok", 0.05, 0.15) +
    `  ` +
    dot(pA, "ok", 0.21, 0.31) +
    `  ` +
    dot(pB, "ink", 0.38, 0.47) +
    `  ` +
    mark("x", 556, 584, 0.47, 0.52) +
    `  ` +
    dot(pC, "ok", 0.58, 0.68) +
    `  ` +
    dot(pC, "ok", 0.74, 0.84)
  );
}

export async function renderResilienceLayers() {
  const C = RESILIENCE_LAYERS_COPY;
  const { css } = await buildFontFaceCss({
    ui: [C.headline[0], C.headline[2], C.headline[4], ...C.descriptions].join(""),
    uiBold: [C.headline[1], C.headline[3], ...C.titles].join(""),
    mono: [
      ...C.kicker,
      ...C.legend,
      ...C.layerKickers,
      ...C.bullets,
      ...C.breaker,
      ...C.cooldown,
      ...C.lockout,
      ...C.foot,
    ].join(""),
  });

  const legend =
    `  <g class="mono-xs">` +
    `<rect x="1000" y="34" width="160" height="80" rx="10" fill="none" class="stroke-ink" stroke-opacity="0.5"/>` +
    `<text x="1012" y="48" style="fill:var(--ink)">${esc(C.legend[0])}</text>` +
    `<rect x="1034" y="56" width="118" height="50" rx="8" fill="none" class="stroke-warn" stroke-opacity="0.7"/>` +
    `<text x="1044" y="70" style="fill:var(--warn)">${esc(C.legend[1])}</text>` +
    `<rect x="1068" y="78" width="78" height="22" rx="6" fill="none" class="stroke-info" stroke-opacity="0.8"/>` +
    `<text x="1078" y="92" style="fill:var(--info)">${esc(C.legend[2])}</text>` +
    `</g>\n`;

  return (
    svgOpen({
      viewBox: "0 0 1200 726",
      title:
        "OmniRoute resilience — three independent self-healing layers, the right layer for the right failure.",
      desc: "Layer 1, provider circuit breaker (scope: whole provider): trips only on 408/500/502/503/504, thresholds of 8 fails for OAuth, 12 for API-key, 2 for local providers, reset timeouts of 60, 30 and 15 seconds into a HALF-OPEN probe, lazy recovery where reads refresh expired state; while OPEN the combo reroutes to the next provider, then a probe closes the breaker. Layer 2, connection cooldown (scope: one key or account): base cooldown 5 seconds OAuth and 3 seconds API-key, exponential backoff times two per repeated failure with an anti-thundering-herd guard, 429 honors Retry-After and reset headers, success calls clearAccountError; one rate-limited key is skipped while the other keys keep serving. Layer 3, model lockout (scope: one model): per-model 429, local 404 or mode denials lock just that model — a locked model is not a dead key, other models keep serving instantly. Terminal states banned, expired and credits_exhausted are not cooldowns and wait for the operator. Animated resilience card: three stacked layer panels, each replaying its healing loop — breaker states cycling CLOSED, OPEN, HALF-OPEN; a cooling key with backoff while other keys serve; a locked model while sibling models keep serving. First frame is fully readable. Light and dark follow the viewer's color scheme.",
      fontFaceCss: css,
      extraCss: `.rl-strong{font-weight:600;fill:var(--ink)}`,
    }) +
    gridDefs("rl-grid") +
    `  <rect class="bg" x="0" y="0" width="1200" height="726"/>\n` +
    `  <rect x="0" y="0" width="1200" height="726" fill="url(#rl-grid)"/>\n` +
    `  <text x="40" y="56" class="kicker">${esc(C.kicker[0])}</text>\n` +
    `  <line x1="392" y1="51" x2="976" y2="51" class="rule" stroke-width="1"/>\n` +
    `  <text x="40" y="100" class="sub">${esc(C.headline[0])}<tspan class="rl-strong">${esc(C.headline[1])}</tspan>${esc(C.headline[2])}<tspan class="rl-strong">${esc(C.headline[3])}</tspan>${esc(C.headline[4])}</text>\n` +
    legend +
    panel(0) +
    breakerScene() +
    panel(1) +
    cooldownScene() +
    panel(2) +
    lockoutScene() +
    `  <text x="40" y="708" class="mono-sm" style="fill:var(--muted)">${esc(C.foot[0])}<tspan style="fill:var(--ink)">${esc(C.foot[1])}</tspan>${esc(C.foot[2])}<tspan style="fill:var(--warn)">${esc(C.foot[3])}</tspan>${esc(C.foot[2])}<tspan style="fill:var(--info)">${esc(C.foot[4])}</tspan>${esc(C.foot[5])}</text>\n` +
    "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/resilience-layers.svg";
  const svg = await renderResilienceLayers();
  writeFileSync(out, svg);
  console.log(`resilience-layers → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
