// The Cheaper Inference UI Kit, as the README diagrams see it. Palette copied from
// packages/ui-kit/src/ci-tokens.css (tests/unit/docs/readme-diagram-theme.test.ts pins the hex
// codes against that file), text roles on the kit's type scale.
// One self-themed file per diagram: light values on :root, dark values behind
// prefers-color-scheme, evaluated by the viewer's browser even through GitHub's camo proxy.
//
// Text roles (class → weight / size / tracking / fill). Nothing in a README diagram goes below 9px;
// the 1200-wide canvases are drawn at this scale and nothing else. Everything except the code roles
// is the kit's Switzer, drawn as vector outlines by scripts/docs/readme-outline.mjs from exactly
// these declarations, so the rules carry no font-family: the licence forbids embedding it. The
// tracking values are the kit's: display -0.05em, heading and metric -0.02em, caption and caps 0.01em.
//   .kicker    500  12px  0.01em   --muted
//   .headline  500  72px  -0.05em  --ink        the kit's display role
//   .h2        500  40px  -0.02em  --ink        section headline inside a diagram
//   .sub       400  23px           --body
//   .h3        600  18px  -0.02em  --ink        card / column title
//   .h4        600  14px           --ink        row / cell title
//   .body      400  14px           --muted
//   .cell      400  13px           --body       table cells, ledger rows
//   .small     400  11px  0.01em   --muted      captions, footnotes
//   .num       500  32px  -0.02em  --ink
//   .num-sm    500  20px  -0.02em  --ink        secondary figures
//   .lbl/.foot 500  10px  0.01em   --muted
//   .label     500  13px  0.01em   --body       labels that used to be set in the mono face
//   .label-sm  500  11px  0.01em   --body       …small ones
//   .label-xs  500   9px  0.01em   --muted      axis ticks, tiny labels
//
// Code roles: real text on the embedded OFL IBM Plex Mono subset (scripts/docs/readme-fonts.mjs).
// Only commands, URLs, identifiers and terminal screens use them; a label is not code.
//   .cmd       mono  500  16px  --accent-ink
//   .mono      mono  500  13px  --body
//   .term      mono  500  13px  --inverse-text  terminal text on an inverse surface
//   .term-lg   mono  500  16px  --inverse-text  terminal screen lines on an inverse surface
//   .mono-sm   mono  500  11px  --body          small code, ids
//   .mono-xs   mono  500   9px  --muted         (letter-spacing 0.08em)
//
// Status / surface tokens resolve the kit's var() chains inside each block of ci-tokens.css:
// surfaceSubtle/surfaceMuted are --ci-neutral-50/100 in light and --ci-neutral-800/700 in dark;
// inverseBg is --ci-neutral-950 in BOTH blocks (the kit keeps technical inverse panels dark, so
// in dark mode an inverse surface equals the canvas — give it a border); accentSoft is the kit's
// --ci-color-accent-surface-range, which the dark block lowers to 0.12 alpha.
//
// `border` is the kit's --ci-color-border in both blocks (light rgb(4 13 16 / 0.24), dark
// rgb(241 247 247 / 0.24), pinned by the test); `grid` is the one value that is not a kit token —
// a lighter tint of the border for the canvas pattern.
//
// extraCss naming: diagram-local classes and custom properties passed through svgOpen's
// `extraCss` carry the diagram's abbreviation as a prefix (`rl-…`, `cmp-…`, `--inv-*`…), never a
// bare theme-like name (`.card`, `--muted-2`): the shared roles above own the plain names.
import { fontStack } from "./readme-fonts.mjs";
import { measureText } from "./readme-outline.mjs";

export const KIT = {
  light: {
    bg: "#fbfbf8",
    surface: "#ffffff",
    ink: "#040d10",
    body: "#031a1b",
    muted: "#575f5f",
    border: "rgba(4,13,16,0.24)",
    grid: "rgba(4,13,16,0.06)",
    accent: "#d8ff00",
    accentInk: "#040d10",
    ok: "#087a4f",
    okBg: "#e8f7f0",
    warn: "#a75a00",
    warnBg: "#fff3df",
    err: "#bf3636",
    errBg: "#ffeded",
    info: "#2869d8",
    infoBg: "#edf4ff",
    surfaceSubtle: "#f7f7f2",
    surfaceMuted: "#eeeee8",
    inverseBg: "#040d10",
    inverseText: "#f1f7f7",
    track: "rgba(4,13,16,0.14)",
    accentSoft: "rgba(216,255,0,0.22)",
  },
  dark: {
    bg: "#040d10",
    surface: "#0d191c",
    ink: "#ffffff",
    body: "#f1f7f7",
    muted: "#c7cbc5",
    border: "rgba(241,247,247,0.24)",
    grid: "rgba(241,247,247,0.05)",
    accent: "#d8ff00",
    accentInk: "#040d10",
    ok: "#5dd6a5",
    okBg: "#0f3328",
    warn: "#f4cf8b",
    warnBg: "#38280f",
    err: "#ff8f8f",
    errBg: "#3b1919",
    info: "#8fbaff",
    infoBg: "#142b4f",
    surfaceSubtle: "#1e2c2f",
    surfaceMuted: "#394446",
    inverseBg: "#040d10",
    inverseText: "#f1f7f7",
    track: "rgba(241,247,247,0.2)",
    accentSoft: "rgba(216,255,0,0.12)",
  },
};

const vars = (tokens) =>
  Object.entries(tokens)
    .map(([k, v]) => `--${k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase())}:${v}`)
    .join(";");

export function themeCss() {
  return `:root{${vars(KIT.light)}}\n@media (prefers-color-scheme: dark){:root{${vars(KIT.dark)}}}`;
}

// Switzer roles, as data: textRoleCss() writes them out, roleWidth() measures with them.
export const SWITZER_ROLES = {
  kicker: { weight: 500, size: 12, tracking: 0.01, fill: "muted" },
  headline: { weight: 500, size: 72, tracking: -0.05, fill: "ink" },
  sub: { weight: 400, size: 23, fill: "body" },
  body: { weight: 400, size: 14, fill: "muted" },
  num: { weight: 500, size: 32, tracking: -0.02, fill: "ink" },
  lbl: { weight: 500, size: 10, tracking: 0.01, fill: "muted" },
  foot: { weight: 500, size: 10, tracking: 0.01, fill: "muted" },
  h2: { weight: 500, size: 40, tracking: -0.02, fill: "ink" },
  h3: { weight: 600, size: 18, tracking: -0.02, fill: "ink" },
  h4: { weight: 600, size: 14, fill: "ink" },
  cell: { weight: 400, size: 13, fill: "body" },
  small: { weight: 400, size: 11, tracking: 0.01, fill: "muted" },
  "num-sm": { weight: 500, size: 20, tracking: -0.02, fill: "ink" },
  label: { weight: 500, size: 13, tracking: 0.01, fill: "body" },
  "label-sm": { weight: 500, size: 11, tracking: 0.01, fill: "body" },
  "label-xs": { weight: 500, size: 9, tracking: 0.01, fill: "muted" },
};

const switzerRule = (name) => {
  const { weight, size, tracking, fill } = SWITZER_ROLES[name];
  const spacing = tracking ? `letter-spacing:${tracking}em;` : "";
  return `.${name}{font-weight:${weight};font-size:${size}px;${spacing}fill:var(--${fill})}`;
};

/**
 * Width in px of `text` drawn in a Switzer role, from the real metrics.
 * @param {keyof typeof SWITZER_ROLES} name
 * @param {string} text
 * @param {{ weight?: number, size?: number }} [override] an inline run's own weight or size
 */
export function roleWidth(name, text, override = {}) {
  const role = SWITZER_ROLES[name];
  if (!role) throw new Error(`unknown Switzer role: ${name}`);
  const size = override.size ?? role.size;
  return measureText(text, {
    size,
    weight: override.weight ?? role.weight,
    tracking: (role.tracking ?? 0) * size,
  });
}

/** Where the hairline that follows a kicker starts: its real right edge plus a gap. */
export const afterKicker = (x, text, gap = 24) => Math.ceil(x + roleWidth("kicker", text) + gap);

export function textRoleCss() {
  return [
    switzerRule("kicker"),
    switzerRule("headline"),
    switzerRule("sub"),
    switzerRule("body"),
    `.mono{${fontStack("mono")};font-weight:500;font-size:13px;fill:var(--body)}`,
    switzerRule("num"),
    switzerRule("lbl"),
    switzerRule("foot"),
    `.cmd{${fontStack("mono")};font-weight:500;font-size:16px;fill:var(--accent-ink)}`,
    `.bg{fill:var(--bg)} .surface{fill:var(--surface);stroke:var(--border)} .accent{fill:var(--accent)} .rule{stroke:var(--border)} .grid{stroke:var(--grid)}`,
    // Diagram type scale (task 6.0) — shared by the eleven README diagrams.
    switzerRule("h2"),
    switzerRule("h3"),
    switzerRule("h4"),
    switzerRule("cell"),
    switzerRule("small"),
    switzerRule("num-sm"),
    `.mono-sm{${fontStack("mono")};font-weight:500;font-size:11px;fill:var(--body)}`,
    `.mono-xs{${fontStack("mono")};font-weight:500;font-size:9px;letter-spacing:0.08em;fill:var(--muted)}`,
    `.term{${fontStack("mono")};font-weight:500;font-size:13px;fill:var(--inverse-text)}`,
    `.term-lg{${fontStack("mono")};font-weight:500;font-size:16px;fill:var(--inverse-text)}`,
    switzerRule("label"),
    switzerRule("label-sm"),
    switzerRule("label-xs"),
    `.ok{fill:var(--ok)} .warn{fill:var(--warn)} .err{fill:var(--err)} .info{fill:var(--info)} .ok-bg{fill:var(--ok-bg)} .warn-bg{fill:var(--warn-bg)} .err-bg{fill:var(--err-bg)} .info-bg{fill:var(--info-bg)} .stroke-ok{stroke:var(--ok)} .stroke-warn{stroke:var(--warn)} .stroke-err{stroke:var(--err)} .stroke-info{stroke:var(--info)} .stroke-accent{stroke:var(--accent)} .stroke-ink{stroke:var(--ink)} .surface-subtle{fill:var(--surface-subtle)} .surface-muted{fill:var(--surface-muted)} .inverse{fill:var(--inverse-bg)} .track{fill:var(--track)} .accent-soft{fill:var(--accent-soft)} .ink{fill:var(--ink)} .body-fill{fill:var(--body)} .muted{fill:var(--muted)}`,
  ].join("\n");
}

export const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// extraCss: per-diagram rules (keyframes, one-off classes), emitted after the shared roles.
// The @font-face rules are not written here: outlineSvg() (scripts/docs/readme-outline.mjs), the last
// step of every generator, builds the mono subset from the text that stays code.
export function svgOpen({ viewBox, title, desc, extraCss = "" }) {
  const extra = extraCss ? `${extraCss}\n` : "";
  return (
    `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="t d">\n` +
    `  <title id="t">${esc(title)}</title>\n` +
    `  <desc id="d">${esc(desc)}</desc>\n` +
    `  <style>\n${themeCss()}\n${textRoleCss()}\n${extra}  </style>\n`
  );
}

export function gridDefs(id = "kitGrid") {
  return (
    `  <defs>\n    <pattern id="${id}" width="32" height="32" patternUnits="userSpaceOnUse">\n` +
    `      <path d="M 32 0 L 0 0 0 32" fill="none" class="grid" stroke-width="1"/>\n` +
    `    </pattern>\n  </defs>\n`
  );
}
