// README tier cascade (IDE → OmniRoute router → four provider tiers, auto-fallback in four acts)
// in the Cheaper Inference UI Kit style (KEA-6307). The output is committed as
// docs/diagrams/tier-cascade.svg; tests/unit/docs/readme-tier-cascade-svg.test.ts fails when the
// committed file no longer matches this generator, so a stale picture cannot ship.
//
//   node scripts/docs/gen-readme-tier-cascade.mjs [--out path.svg]
//
// Everything the diagram draws lives in TIER_CASCADE_COPY: it is both the drawn text and the
// subset input for the embedded fonts. "20 routing strategies" stays in <text> because
// scripts/check/check-docs-counts-sync.mjs reads it from the raw file. One 16 s cycle, four acts
// (request → 429 → reroute → success): act 1 0–.23, act 2 .25–.48, act 3 .50–.73, act 4
// .75–.985 — the windows below are the beats of the previous hand-written file. SMIL never
// animates `fill` here: state dots and labels are stacked kit-colored copies whose opacities
// cross-fade on the same keyTimes.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildFontFaceCss } from "./readme-fonts.mjs";
import { svgOpen, gridDefs, esc } from "./readme-diagram-theme.mjs";

const TIERS = [
  { kicker: "TIER 1 · SUBSCRIPTION", models: ["Claude Code", "Codex", "Copilot"] },
  { kicker: "TIER 2 · API KEY", models: ["DeepSeek", "Groq", "xAI"] },
  { kicker: "TIER 3 · CHEAP", models: ["GLM ", "MiniMax "], prices: ["$0.5", "$0.2"] },
  { kicker: "TIER 4 · FREE", models: ["Kiro", "Qoder", "Pollinations"] },
];

export const TIER_CASCADE_COPY = {
  ide: ["Your IDE / CLI", "Claude Code · Cursor · Cline", " · every AI tool"],
  endpoint: ["http://localhost:20128/v1"],
  router: [
    "OmniRoute — Smart Router",
    "RTK + Caveman compression",
    " · ",
    "20 routing strategies",
    "Circuit breakers · TLS stealth · MCP · A2A · Guardrails",
  ],
  tiers: TIERS.map((t) => t.kicker),
  models: TIERS.flatMap((t) => t.models),
  prices: TIERS.flatMap((t) => t.prices || []),
  transitions: ["quota out?", "budget hit?"],
  badge: ["LIMITS APPLY"],
  foot: ["AUTO-FALLBACK CASCADE · UPSTREAM AVAILABILITY VARIES"],
};

const DUR = "16s";
const loop = (attr, values, keyTimes, dur = DUR) =>
  `<animate attributeName="${attr}" values="${values}" keyTimes="${keyTimes}" dur="${dur}" repeatCount="indefinite"/>`;

// Two request dots riding a fan-out path, shown only inside the act window (group opacity).
function actDots(pathId, values, keyTimes) {
  const ride = (begin) =>
    `      <circle r="3.5"><animateMotion dur="1.4s" repeatCount="indefinite" begin="${begin}"><mpath href="#${pathId}"/></animateMotion>` +
    `<animate attributeName="opacity" values="0;1;1;0" dur="1.4s" begin="${begin}" repeatCount="indefinite"/></circle>\n`;
  return (
    `    <g>\n      ${loop("opacity", values, keyTimes)}\n` +
    ride("0s") +
    ride("0.7s") +
    `    </g>\n`
  );
}

// Tier status dot: stacked ok / err / muted circles cross-fading on the act windows.
function statusDot(layers, pulse) {
  const circles = layers
    .map(
      ([cls, values, keyTimes]) =>
        `<circle cx="240" cy="26" r="4.5" class="${cls}"${values ? `>${loop("opacity", values, keyTimes)}</circle>` : "/>"}`
    )
    .join("");
  return `    <g>${loop("opacity", pulse, "0;0.5;1", "1.8s")}${circles}</g>\n`;
}

function tierCard(i, T, outline, status) {
  const x = 31 + i * 292;
  const models = T.models
    .map((m, k) => {
      const price = T.prices?.[k];
      return (
        `    <text x="18" y="${70 + k * 24}" class="h4">${esc(m)}` +
        (price ? `<tspan class="mono-sm" style="fill:var(--ink)">${esc(price)}</tspan>` : "") +
        `</text>\n`
      );
    })
    .join("");
  return (
    `  <g transform="translate(${x}, 370)">\n` +
    `    <rect width="262" height="140" rx="12" class="surface" stroke-width="1"/>\n` +
    `    <rect width="262" height="140" rx="12" fill="none" class="stroke-ok" stroke-width="1.4" stroke-opacity="${outline.initial}">${
      outline.values ? loop("stroke-opacity", outline.values, outline.keyTimes) : ""
    }</rect>\n` +
    `    <text x="18" y="30" class="lbl" style="fill:var(--ink)">${esc(T.kicker)}</text>\n` +
    status +
    `    <line x1="18" y1="44" x2="244" y2="44" class="rule" stroke-width="1"/>\n` +
    models +
    `  </g>\n`
  );
}

// Transition label: muted copy and err copy cross-fading on the 429 beat.
function transition(x, label, keyTimes) {
  return (
    `  <text x="${x}" y="536" text-anchor="middle" class="lbl">${esc(label)}${loop("opacity", "1;1;0;0;1;1", keyTimes)}</text>\n` +
    `  <text x="${x}" y="536" text-anchor="middle" class="lbl" style="fill:var(--err)" opacity="0">${esc(label)}${loop("opacity", "0;0;1;1;0;0", keyTimes)}</text>\n`
  );
}

// The reroute: one lime dot hands the request to the next tier along the cascade arrow.
function handoff(pathId, a, b) {
  return (
    `  <circle r="3.5" class="accent stroke-ink" stroke-width="1">` +
    `<animateMotion dur="${DUR}" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;${a};${b};1"><mpath href="#${pathId}"/></animateMotion>` +
    loop(
      "opacity",
      "0;0;1;1;0;0",
      `0;${a};${(a + 0.01).toFixed(3)};${(b - 0.005).toFixed(3)};${(b + 0.005).toFixed(3)};1`
    ) +
    `</circle>\n`
  );
}

export async function renderTierCascade() {
  const C = TIER_CASCADE_COPY;
  const { css } = await buildFontFaceCss({
    display: C.router[0],
    uiBold: [C.ide[0], ...C.models].join(""),
    mono: [
      C.ide[1],
      C.ide[2],
      ...C.endpoint,
      ...C.router.slice(1),
      ...C.tiers,
      ...C.prices,
      ...C.transitions,
      ...C.badge,
      ...C.foot,
    ].join(""),
  });

  const pulseDot = (values, dur) => loop("opacity", values, "0;0.5;1", dur);

  return (
    svgOpen({
      viewBox: "0 0 1200 650",
      title: "OmniRoute request flow — auto-fallback cascade across 4 provider tiers",
      desc: "Animated request path that tries subscription, API-key, low-cost, and free-access tiers in sequence, subject to upstream availability and limits. Light and dark follow the viewer's color scheme.",
      fontFaceCss: css,
    }) +
    gridDefs("tc-grid") +
    `  <defs>\n` +
    `    <radialGradient id="tc-hubGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:var(--ink)" stop-opacity="0.22"/><stop offset="100%" style="stop-color:var(--ink)" stop-opacity="0"/></radialGradient>\n` +
    `    <path id="tc-pIn" d="M 600,92 L 600,170"/>\n` +
    `    <path id="tc-pT1" d="M 420,290 C 420,332 162,330 162,370"/>\n` +
    `    <path id="tc-pT2" d="M 540,290 C 540,336 454,336 454,370"/>\n` +
    `    <path id="tc-pT3" d="M 660,290 C 660,336 746,336 746,370"/>\n` +
    `    <path id="tc-pT4" d="M 780,290 C 780,332 1038,330 1038,370"/>\n` +
    `    <path id="tc-pC1" d="M 180,548 L 428,548"/>\n` +
    `    <path id="tc-pC2" d="M 472,548 L 720,548"/>\n` +
    `    <path id="tc-pC3" d="M 764,548 L 1012,548"/>\n` +
    `  </defs>\n` +
    `  <rect class="bg" x="0" y="0" width="1200" height="650"/>\n` +
    `  <rect x="0" y="0" width="1200" height="650" fill="url(#tc-grid)"/>\n` +
    // IDE / CLI card
    `  <rect x="330" y="28" width="540" height="64" rx="12" class="surface" stroke-width="1"/>\n` +
    `  <g transform="translate(362, 60)" class="stroke-ink" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M -8 -7 L -1 0 L -8 7"/><line x1="3" y1="7" x2="11" y2="7"/></g>\n` +
    `  <text x="392" y="55" class="h3">${esc(C.ide[0])}</text>\n` +
    `  <text x="392" y="76" class="mono-sm" style="fill:var(--muted)"><tspan style="fill:var(--ink)">${esc(C.ide[1])}</tspan>${esc(C.ide[2])}</text>\n` +
    `  <circle cx="838" cy="60" r="4" class="ink">${pulseDot("1;0.4;1", "2.5s")}</circle>\n` +
    // request pipe + endpoint label
    `  <use href="#tc-pIn" style="stroke:var(--muted)" stroke-width="1.2" stroke-dasharray="3 5" opacity="0.6"/>\n` +
    `  <text x="614" y="137" class="mono-sm" style="fill:var(--ink)">${esc(C.endpoint[0])}</text>\n` +
    `  <g class="ink">\n` +
    ["0s", "0.55s", "1.1s"]
      .map(
        (b) =>
          `    <circle r="3.2"><animateMotion dur="1.6s" repeatCount="indefinite" begin="${b}"><mpath href="#tc-pIn"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" dur="1.6s" begin="${b}" repeatCount="indefinite"/></circle>\n`
      )
      .join("") +
    `  </g>\n` +
    // Router card + hub glyph
    `  <rect x="240" y="170" width="720" height="120" rx="12" class="surface" stroke-width="1"/>\n` +
    `  <g transform="translate(258, 188)">\n` +
    `    <circle cx="42" cy="42" r="34" fill="none" class="stroke-ink" stroke-width="1" opacity="0.35" stroke-dasharray="3 7"><animateTransform attributeName="transform" type="rotate" from="0 42 42" to="360 42 42" dur="30s" repeatCount="indefinite"/></circle>\n` +
    `    <circle cx="42" cy="42" r="24" fill="url(#tc-hubGlow)"><animate attributeName="r" values="22;30;22" dur="3.2s" repeatCount="indefinite"/></circle>\n` +
    `    <g class="stroke-ink" stroke-width="5" stroke-linecap="round" fill="none"><line x1="22" y1="42" x2="38" y2="42"/><path d="M 39 42 C 52 42, 54 26, 66 24"/><path d="M 39 42 C 54 42, 56 42, 68 42"/><path d="M 39 42 C 52 42, 54 58, 66 60"/></g>\n` +
    `    <circle cx="39" cy="42" r="5" class="surface stroke-ink" stroke-width="2">${pulseDot("1;0.7;1", "1.8s")}</circle>\n` +
    `  </g>\n` +
    `  <text x="364" y="218" class="h2">${esc(C.router[0])}</text>\n` +
    `  <text x="364" y="246" class="mono-sm" style="fill:var(--muted)"><tspan style="fill:var(--ink)">${esc(C.router[1])}</tspan>${esc(C.router[2])}<tspan style="fill:var(--ink)">${esc(C.router[3])}</tspan></text>\n` +
    `  <text x="364" y="266" class="mono-sm" style="fill:var(--muted)">${esc(C.router[4])}</text>\n` +
    // fan-out topology (always visible)
    `  <g style="stroke:var(--muted)" stroke-width="1.2" fill="none" stroke-dasharray="3 5" opacity="0.5"><use href="#tc-pT1"/><use href="#tc-pT2"/><use href="#tc-pT3"/><use href="#tc-pT4"/></g>\n` +
    // act-windowed request dots: router → active tier
    `  <g class="ink">\n` +
    actDots("tc-pT1", "1;1;0;0;1", "0;0.23;0.27;0.96;1") +
    actDots("tc-pT2", "0;0;1;1;0;0", "0;0.24;0.28;0.48;0.52;1") +
    actDots("tc-pT3", "0;0;1;1;0;0", "0;0.49;0.53;0.73;0.77;1") +
    actDots("tc-pT4", "0;0;1;1;0", "0;0.74;0.78;0.985;1") +
    `  </g>\n` +
    // tier cards
    tierCard(
      0,
      TIERS[0],
      { initial: "0.9", values: "0.9;0.9;0;0;0.9", keyTimes: "0;0.23;0.27;0.96;1" },
      statusDot(
        [
          ["ok", "1;1;0;0;1", "0;0.23;0.28;0.985;1"],
          ["err", "0;0;1;1;0", "0;0.23;0.28;0.985;1"],
        ],
        "1;0.45;1"
      )
    ) +
    tierCard(
      1,
      TIERS[1],
      { initial: "0", values: "0;0;0.9;0.9;0;0", keyTimes: "0;0.24;0.28;0.48;0.52;1" },
      statusDot(
        [
          ["muted", "1;1;0;0;0;0;1", "0;0.24;0.28;0.48;0.53;0.985;1"],
          ["ok", "0;0;1;1;0;0;0", "0;0.24;0.28;0.48;0.53;0.985;1"],
          ["err", "0;0;0;0;1;1;0", "0;0.24;0.28;0.48;0.53;0.985;1"],
        ],
        "1;0.5;1"
      )
    ) +
    tierCard(
      2,
      TIERS[2],
      { initial: "0", values: "0;0;0.9;0.9;0;0", keyTimes: "0;0.49;0.53;0.73;0.77;1" },
      statusDot(
        [
          ["muted", "1;1;0;0;0;0;1", "0;0.49;0.53;0.73;0.78;0.985;1"],
          ["ok", "0;0;1;1;0;0;0", "0;0.49;0.53;0.73;0.78;0.985;1"],
          ["err", "0;0;0;0;1;1;0", "0;0.49;0.53;0.73;0.78;0.985;1"],
        ],
        "1;0.5;1"
      )
    ) +
    tierCard(
      3,
      TIERS[3],
      { initial: "0", values: "0;0;0.9;0.9;0", keyTimes: "0;0.74;0.78;0.985;1" },
      statusDot([["ok"]], "1;0.45;1")
    ) +
    // cascade arrows + transition labels
    `  <g style="stroke:var(--muted)" stroke-width="1.2" fill="none" stroke-dasharray="3 5" opacity="0.7"><use href="#tc-pC1"/><use href="#tc-pC2"/><use href="#tc-pC3"/></g>\n` +
    `  <g class="muted"><polygon points="428,544 436,548 428,552"/><polygon points="720,544 728,548 720,552"/><polygon points="1012,544 1020,548 1012,552"/></g>\n` +
    transition(304, C.transitions[0], "0;0.21;0.23;0.29;0.32;1") +
    transition(596, C.transitions[1], "0;0.46;0.48;0.54;0.57;1") +
    transition(888, C.transitions[1], "0;0.71;0.73;0.79;0.82;1") +
    // hand-off dots riding the cascade arrows at each transition (the lime moment)
    handoff("tc-pC1", 0.235, 0.27) +
    handoff("tc-pC2", 0.485, 0.52) +
    handoff("tc-pC3", 0.735, 0.77) +
    // limits-apply badge under Tier 4
    `  <g transform="translate(986, 566)">\n` +
    `    <rect width="104" height="24" rx="12" class="surface stroke-ok" stroke-width="1"/>\n` +
    `    <circle cx="16" cy="12" r="3" class="ok">${pulseDot("1;0.35;1", "1.6s")}</circle>\n` +
    `    <text x="60" y="15.5" text-anchor="middle" class="mono-xs" style="fill:var(--ok)">${esc(C.badge[0])}</text>\n` +
    `  </g>\n` +
    `  <text x="600" y="625" text-anchor="middle" class="foot">${esc(C.foot[0])}</text>\n` +
    "</svg>\n"
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out requires a path");
  const out = i >= 0 ? process.argv[i + 1] : "docs/diagrams/tier-cascade.svg";
  const svg = await renderTierCascade();
  writeFileSync(out, svg);
  console.log(`tier-cascade → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
}
