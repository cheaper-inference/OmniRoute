// The Cheaper Inference UI Kit, as the README diagrams see it. Palette copied from
// packages/ui-kit/src/ci-tokens.css (tests/unit/docs/readme-diagram-theme.test.ts pins the hex
// codes against that file), text roles on the kit font stacks (scripts/docs/readme-fonts.mjs).
// One self-themed file per diagram: light values on :root, dark values behind
// prefers-color-scheme, evaluated by the viewer's browser even through GitHub's camo proxy.
//
// Text roles (class → fontStack role / weight / size / fill). Nothing in a README diagram goes
// below 9px; the 1200-wide canvases are drawn at this scale and nowhere else.
//   .kicker   mono     500  12px  --muted      (letter-spacing 0.18em)
//   .headline display  400  72px  --ink
//   .h2       display  400  40px  --ink        section headline inside a diagram
//   .sub      ui       400  23px  --body
//   .h3       uiBold   600  18px  --ink        card / column title
//   .h4       uiBold   600  14px  --ink        row / cell title
//   .body     ui       400  14px  --muted
//   .cell     ui       400  13px  --body       table cells, ledger rows
//   .small    ui       400  11px  --muted      captions, footnotes
//   .num      mono     500  32px  --ink
//   .num-sm   mono     500  20px  --ink        secondary figures
//   .cmd      mono     500  16px  --accent-ink
//   .mono     mono     500  13px  --body
//   .term     mono     500  13px  --inverse-text   terminal text on an inverse surface
//   .term-lg  mono     500  16px  --inverse-text   terminal screen lines on an inverse surface
//   .mono-sm  mono     500  11px  --body       small code, ids, chips
//   .lbl/.foot mono    500  10px  --muted      (letter-spacing 0.16em)
//   .mono-xs  mono     500   9px  --muted      axis ticks, tiny labels (letter-spacing 0.08em)
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

export function textRoleCss() {
  return [
    `.kicker{${fontStack("mono")};font-weight:500;font-size:12px;letter-spacing:0.18em;fill:var(--muted)}`,
    `.headline{${fontStack("display")};font-weight:400;font-size:72px;fill:var(--ink)}`,
    `.sub{${fontStack("ui")};font-weight:400;font-size:23px;fill:var(--body)}`,
    `.body{${fontStack("ui")};font-weight:400;font-size:14px;fill:var(--muted)}`,
    `.mono{${fontStack("mono")};font-weight:500;font-size:13px;fill:var(--body)}`,
    `.num{${fontStack("mono")};font-weight:500;font-size:32px;fill:var(--ink)}`,
    `.lbl{${fontStack("mono")};font-weight:500;font-size:10px;letter-spacing:0.16em;fill:var(--muted)}`,
    `.foot{${fontStack("mono")};font-weight:500;font-size:10px;letter-spacing:0.16em;fill:var(--muted)}`,
    `.cmd{${fontStack("mono")};font-weight:500;font-size:16px;fill:var(--accent-ink)}`,
    `.bg{fill:var(--bg)} .surface{fill:var(--surface);stroke:var(--border)} .accent{fill:var(--accent)} .rule{stroke:var(--border)} .grid{stroke:var(--grid)}`,
    // Diagram type scale (task 6.0) — shared by the eleven README diagrams.
    `.h2{${fontStack("display")};font-weight:400;font-size:40px;fill:var(--ink)}`,
    `.h3{${fontStack("uiBold")};font-weight:600;font-size:18px;fill:var(--ink)}`,
    `.h4{${fontStack("uiBold")};font-weight:600;font-size:14px;fill:var(--ink)}`,
    `.cell{${fontStack("ui")};font-weight:400;font-size:13px;fill:var(--body)}`,
    `.small{${fontStack("ui")};font-weight:400;font-size:11px;fill:var(--muted)}`,
    `.num-sm{${fontStack("mono")};font-weight:500;font-size:20px;fill:var(--ink)}`,
    `.mono-sm{${fontStack("mono")};font-weight:500;font-size:11px;fill:var(--body)}`,
    `.mono-xs{${fontStack("mono")};font-weight:500;font-size:9px;letter-spacing:0.08em;fill:var(--muted)}`,
    `.term{${fontStack("mono")};font-weight:500;font-size:13px;fill:var(--inverse-text)}`,
    `.term-lg{${fontStack("mono")};font-weight:500;font-size:16px;fill:var(--inverse-text)}`,
    `.ok{fill:var(--ok)} .warn{fill:var(--warn)} .err{fill:var(--err)} .info{fill:var(--info)} .ok-bg{fill:var(--ok-bg)} .warn-bg{fill:var(--warn-bg)} .err-bg{fill:var(--err-bg)} .info-bg{fill:var(--info-bg)} .stroke-ok{stroke:var(--ok)} .stroke-warn{stroke:var(--warn)} .stroke-err{stroke:var(--err)} .stroke-info{stroke:var(--info)} .stroke-accent{stroke:var(--accent)} .stroke-ink{stroke:var(--ink)} .surface-subtle{fill:var(--surface-subtle)} .surface-muted{fill:var(--surface-muted)} .inverse{fill:var(--inverse-bg)} .track{fill:var(--track)} .accent-soft{fill:var(--accent-soft)} .ink{fill:var(--ink)} .body-fill{fill:var(--body)} .muted{fill:var(--muted)}`,
  ].join("\n");
}

export const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// extraCss: per-diagram rules (keyframes, one-off classes), emitted after the shared roles.
export function svgOpen({ viewBox, title, desc, fontFaceCss, extraCss = "" }) {
  const extra = extraCss ? `${extraCss}\n` : "";
  return (
    `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="t d">\n` +
    `  <title id="t">${esc(title)}</title>\n` +
    `  <desc id="d">${esc(desc)}</desc>\n` +
    `  <style>\n${fontFaceCss}\n${themeCss()}\n${textRoleCss()}\n${extra}  </style>\n`
  );
}

export function gridDefs(id = "kitGrid") {
  return (
    `  <defs>\n    <pattern id="${id}" width="32" height="32" patternUnits="userSpaceOnUse">\n` +
    `      <path d="M 32 0 L 0 0 0 32" fill="none" class="grid" stroke-width="1"/>\n` +
    `    </pattern>\n  </defs>\n`
  );
}
