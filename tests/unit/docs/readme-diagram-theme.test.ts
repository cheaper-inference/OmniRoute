import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  KIT,
  SWITZER_ROLES,
  afterKicker,
  roleWidth,
  themeCss,
  textRoleCss,
  svgOpen,
  gridDefs,
  esc,
} from "../../../scripts/docs/readme-diagram-theme.mjs";

const tokens = readFileSync("packages/ui-kit/src/ci-tokens.css", "utf8");

// --- ci-tokens.css as data: the light (:root) and dark ([data-theme="dark"]) blocks -----------
// KIT must hold the literal value each kit token resolves to inside its own block (following
// var(--…) chains; primitives live only on :root, so the dark block falls back to it).

function parseBlock(selectorStart: string): Map<string, string> {
  const start = tokens.indexOf(selectorStart);
  assert.ok(start >= 0, `block not found in ci-tokens.css: ${selectorStart}`);
  const end = tokens.indexOf("\n}", start);
  const body = tokens.slice(start, end);
  const decls = new Map<string, string>();
  for (const m of body.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
    decls.set(m[1], m[2].replace(/\s+/g, " ").trim());
  }
  return decls;
}

const lightBlock = parseBlock(":root,\n.ci-theme {");
const darkBlock = parseBlock(':root[data-theme="dark"],');

// rgb(4 13 16 / 0.14) → rgba(4,13,16,0.14): the module writes the comma form (same colour).
const normalize = (v: string) =>
  v.replace(
    /^rgb\((\d+) (\d+) (\d+) \/ ([\d.]+)\)$/,
    (_, r: string, g: string, b: string, a: string) => `rgba(${r},${g},${b},${a})`
  );

function resolve(name: string, block: Map<string, string>, depth = 0): string {
  assert.ok(depth < 8, `var() chain too deep for ${name}`);
  const raw = block.get(name) ?? lightBlock.get(name);
  assert.ok(raw, `${name} missing from ci-tokens.css`);
  const ref = raw.match(/^var\((--[\w-]+)\)$/);
  return ref ? resolve(ref[1], block, depth + 1) : normalize(raw);
}

// KIT key → kit token (task 6.0 brief). Later diagrams rely on these exact key names.
const STATUS_AND_SURFACE_TOKENS: Record<string, string> = {
  ok: "--ci-color-success",
  okBg: "--ci-color-success-bg",
  warn: "--ci-color-warning",
  warnBg: "--ci-color-warning-bg",
  err: "--ci-color-danger",
  errBg: "--ci-color-danger-bg",
  info: "--ci-color-info",
  infoBg: "--ci-color-info-bg",
  surfaceSubtle: "--ci-color-surface-subtle",
  surfaceMuted: "--ci-color-surface-muted",
  inverseBg: "--ci-color-surface-inverse",
  inverseText: "--ci-color-text-inverse",
  track: "--ci-color-track",
  accentSoft: "--ci-color-accent-surface-range",
};

test("every kit color used by the diagrams exists verbatim in ci-tokens.css", () => {
  for (const hex of [
    "#fbfbf8",
    "#ffffff",
    "#040d10",
    "#031a1b",
    "#575f5f",
    "#d8ff00",
    "#0d191c",
    "#f1f7f7",
    "#c7cbc5",
  ]) {
    assert.ok(tokens.includes(hex), `${hex} missing from ci-tokens.css`);
  }
  assert.equal(KIT.light.accent, "#d8ff00");
  assert.equal(KIT.dark.bg, "#040d10");
});

test("the token parser reads ci-tokens.css the way the brief does (sanity pins)", () => {
  assert.equal(resolve("--ci-color-success", lightBlock), "#087a4f");
  assert.equal(resolve("--ci-color-success", darkBlock), "#5dd6a5");
  assert.equal(resolve("--ci-color-surface-inverse", lightBlock), "#040d10");
  assert.equal(resolve("--ci-color-text-inverse", lightBlock), "#f1f7f7");
  assert.equal(resolve("--ci-color-track", lightBlock), "rgba(4,13,16,0.14)");
  assert.equal(resolve("--ci-color-track", darkBlock), "rgba(241,247,247,0.2)");
  assert.equal(resolve("--ci-color-accent-surface-range", lightBlock), "rgba(216,255,0,0.22)");
});

test("KIT keeps its original keys and adds the status, surface and inverse tokens", () => {
  const original = [
    "bg",
    "surface",
    "ink",
    "body",
    "muted",
    "border",
    "grid",
    "accent",
    "accentInk",
  ];
  const added = Object.keys(STATUS_AND_SURFACE_TOKENS);
  assert.deepEqual(Object.keys(KIT.light), [...original, ...added]);
  assert.deepEqual(Object.keys(KIT.dark), [...original, ...added]);
});

test("every new KIT value equals what its kit token resolves to in ci-tokens.css", () => {
  for (const [key, token] of Object.entries(STATUS_AND_SURFACE_TOKENS)) {
    assert.equal(KIT.light[key], resolve(token, lightBlock), `light ${key} (${token})`);
    assert.equal(KIT.dark[key], resolve(token, darkBlock), `dark ${key} (${token})`);
  }
});

test("border is pinned to the kit's --ci-color-border in both blocks", () => {
  assert.equal(KIT.light.border, resolve("--ci-color-border", lightBlock));
  assert.equal(KIT.dark.border, resolve("--ci-color-border", darkBlock));
});

test("themeCss declares the light palette and a dark override behind prefers-color-scheme", () => {
  const css = themeCss();
  assert.match(css, /:root\{[^}]*--bg:#fbfbf8[^}]*--accent:#d8ff00/);
  assert.match(
    css,
    /@media \(prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#040d10[^}]*--ink:#ffffff/
  );
  assert.match(css, /--accent-ink:#040d10/);
});

test("themeCss carries the status colors in both blocks under kebab-case variable names", () => {
  const css = themeCss();
  const light = css.match(/^:root\{([^}]*)\}/)?.[1] ?? "";
  const dark = css.match(/@media \(prefers-color-scheme: dark\)\{:root\{([^}]*)\}\}/)?.[1] ?? "";
  assert.ok(light && dark, "both :root blocks present");
  const pairs: Array<[string, string, string]> = [
    ["--ok", "#087a4f", "#5dd6a5"],
    ["--err", "#bf3636", "#ff8f8f"],
    ["--warn", "#a75a00", "#f4cf8b"],
    ["--info", "#2869d8", "#8fbaff"],
    ["--inverse-bg", "#040d10", "#040d10"],
  ];
  for (const [name, l, d] of pairs) {
    assert.ok(light.includes(`${name}:${l}`), `light ${name}:${l}`);
    assert.ok(dark.includes(`${name}:${d}`), `dark ${name}:${d}`);
  }
  for (const name of [
    "--ok-bg",
    "--warn-bg",
    "--err-bg",
    "--info-bg",
    "--surface-subtle",
    "--surface-muted",
    "--inverse-text",
    "--track",
    "--accent-soft",
  ]) {
    assert.ok(light.includes(`${name}:`), `light declares ${name}`);
    assert.ok(dark.includes(`${name}:`), `dark declares ${name}`);
  }
});

test("Switzer roles declare no font family, code roles sit on the mono stack", () => {
  const css = textRoleCss();
  for (const cls of [
    ".kicker",
    ".headline",
    ".sub",
    ".body",
    ".mono",
    ".num",
    ".lbl",
    ".foot",
    ".cmd",
  ]) {
    assert.ok(css.includes(cls), cls);
  }
  for (const name of Object.keys(SWITZER_ROLES)) {
    const block = css.match(new RegExp(`\\.${name}\\{([^}]*)\\}`))?.[1];
    assert.ok(block, `.${name} missing`);
    assert.doesNotMatch(block, /font-family/, `.${name} must not name a family: it is drawn`);
  }
  assert.doesNotMatch(css, /Switzer|CI Serif|CI Sans|Instrument Serif|Inter\b/);
  for (const cls of ["mono", "mono-sm", "mono-xs", "term", "term-lg", "cmd"]) {
    const block = css.match(new RegExp(`\\.${cls}\\{([^}]*)\\}`))?.[1];
    assert.match(block ?? "", /"CI Mono"[^}]*monospace/, cls);
  }
});

test("the kit's type tokens are the source of the Switzer roles", () => {
  const em = (name: string) => Number(lightBlock.get(name)?.replace("em", ""));
  assert.equal(SWITZER_ROLES.headline.tracking, em("--ci-letter-spacing-display"));
  assert.equal(SWITZER_ROLES.h2.tracking, em("--ci-type-heading-tracking"));
  assert.equal(SWITZER_ROLES.num.tracking, em("--ci-type-metric-tracking"));
  assert.equal(SWITZER_ROLES.kicker.tracking, em("--ci-letter-spacing-caps"));
  assert.equal(SWITZER_ROLES.small.tracking, em("--ci-type-caption-tracking"));
  assert.match(tokens, /--ci-font-display: var\(--ci-font-ui\)/);
  assert.equal(Number(lightBlock.get("--ci-font-weight-medium")), SWITZER_ROLES.headline.weight);
  for (const { weight } of Object.values(SWITZER_ROLES)) {
    assert.ok([400, 500, 600].includes(weight), `the kit has no weight ${weight}`);
  }
});

test("roleWidth measures with the role's own weight, size and tracking", () => {
  assert.ok(roleWidth("h3", "Provider") > roleWidth("h4", "Provider"));
  assert.ok(roleWidth("h4", "Provider") > roleWidth("cell", "Provider"));
  assert.ok(roleWidth("h4", "Provider", { size: 28 }) > roleWidth("h4", "Provider"));
  assert.throws(() => roleWidth("mono" as never, "x"), /unknown Switzer role/);
  assert.equal(
    afterKicker(40, "WHY OMNIROUTE"),
    Math.ceil(40 + roleWidth("kicker", "WHY OMNIROUTE") + 24)
  );
});

test("ordering pin: textRoleCss() lines keep their positions — the original nine classes and the fill line first, then the type scale", () => {
  const lines = textRoleCss().split("\n");
  const heads = [
    ".kicker{",
    ".headline{",
    ".sub{",
    ".body{",
    ".mono{",
    ".num{",
    ".lbl{",
    ".foot{",
    ".cmd{",
    ".bg{",
  ];
  heads.forEach((h, i) => assert.ok(lines[i].startsWith(h), `line ${i} starts with ${h}`));
  // the appended type scale keeps the brief's order, .term-lg sits between .term and the helpers
  const appended = [
    ".h2{",
    ".h3{",
    ".h4{",
    ".cell{",
    ".small{",
    ".num-sm{",
    ".mono-sm{",
    ".mono-xs{",
    ".term{",
    ".term-lg{",
    ".label{",
    ".label-sm{",
    ".label-xs{",
    ".ok{",
  ];
  appended.forEach((h, i) =>
    assert.ok(lines[heads.length + i]?.startsWith(h), `line ${heads.length + i} starts with ${h}`)
  );
  assert.ok(lines.length > heads.length, "the diagram type scale is appended after them");
});

// class → [family token ("" = drawn as Switzer outlines), weight, size, fill]
const TYPE_SCALE: Record<string, [string, number, number, string]> = {
  ".h2": ["", 500, 40, "var(--ink)"],
  ".h3": ["", 600, 18, "var(--ink)"],
  ".h4": ["", 600, 14, "var(--ink)"],
  ".cell": ["", 400, 13, "var(--body)"],
  ".small": ["", 400, 11, "var(--muted)"],
  ".num-sm": ["", 500, 20, "var(--ink)"],
  ".label": ["", 500, 13, "var(--body)"],
  ".label-sm": ["", 500, 11, "var(--body)"],
  ".label-xs": ["", 500, 9, "var(--muted)"],
  ".mono-sm": ['"CI Mono"', 500, 11, "var(--body)"],
  ".mono-xs": ['"CI Mono"', 500, 9, "var(--muted)"],
  ".term": ['"CI Mono"', 500, 13, "var(--inverse-text)"],
  ".term-lg": ['"CI Mono"', 500, 16, "var(--inverse-text)"],
};

test("the diagram type scale classes exist with the expected face, weight, size and fill", () => {
  const css = textRoleCss();
  for (const [cls, [family, weight, size, fill]] of Object.entries(TYPE_SCALE)) {
    const block = css.match(new RegExp(`${cls.replace(".", "\\.")}\\{([^}]*)\\}`))?.[1];
    assert.ok(block, `${cls} missing from textRoleCss()`);
    if (family) assert.ok(block.includes(family), `${cls} uses ${family}`);
    else assert.ok(!block.includes("font-family"), `${cls} is drawn, it names no family`);
    assert.ok(block.includes(`font-weight:${weight}`), `${cls} weight ${weight}`);
    assert.ok(block.includes(`font-size:${size}px`), `${cls} size ${size}px`);
    assert.ok(block.includes(`fill:${fill}`), `${cls} fill ${fill}`);
  }
  assert.match(css, /\.mono-xs\{[^}]*letter-spacing:0\.08em/);
  assert.match(css, /\.headline\{font-weight:500;font-size:72px;letter-spacing:-0\.05em/);
});

test("the status / surface fill and stroke helpers are present verbatim", () => {
  const css = textRoleCss();
  const helpers =
    ".ok{fill:var(--ok)} .warn{fill:var(--warn)} .err{fill:var(--err)} .info{fill:var(--info)} " +
    ".ok-bg{fill:var(--ok-bg)} .warn-bg{fill:var(--warn-bg)} .err-bg{fill:var(--err-bg)} .info-bg{fill:var(--info-bg)} " +
    ".stroke-ok{stroke:var(--ok)} .stroke-warn{stroke:var(--warn)} .stroke-err{stroke:var(--err)} .stroke-info{stroke:var(--info)} " +
    ".stroke-accent{stroke:var(--accent)} .stroke-ink{stroke:var(--ink)} " +
    ".surface-subtle{fill:var(--surface-subtle)} .surface-muted{fill:var(--surface-muted)} .inverse{fill:var(--inverse-bg)} " +
    ".track{fill:var(--track)} .accent-soft{fill:var(--accent-soft)} .ink{fill:var(--ink)} .body-fill{fill:var(--body)} .muted{fill:var(--muted)}";
  assert.ok(css.split("\n").includes(helpers), "helpers line present as one line");
  // the original fill line is untouched
  assert.ok(
    css
      .split("\n")
      .includes(
        ".bg{fill:var(--bg)} .surface{fill:var(--surface);stroke:var(--border)} .accent{fill:var(--accent)} .rule{stroke:var(--border)} .grid{stroke:var(--grid)}"
      )
  );
});

test("every font-family ends in a generic family and no font-size is below 9px", () => {
  const css = textRoleCss();
  const families = [...css.matchAll(/font-family:\s*([^;}]+)/g)].map((m) => m[1].trim());
  assert.equal(families.length, 6, "the six code roles are the only ones naming a family");
  for (const f of families) {
    assert.match(f, /(^|, )monospace$/, f);
    assert.ok(f.includes('"CI Mono"'), f);
  }
  const sizes = [...css.matchAll(/font-size:(\d+(?:\.\d+)?)px/g)].map((m) => Number(m[1]));
  assert.ok(sizes.length >= 18);
  for (const s of sizes) assert.ok(s >= 9, `font-size ${s}px is below the 9px floor`);
});

test("svgOpen emits an accessible root with title, desc and the style block", () => {
  const head = svgOpen({ viewBox: "0 0 1200 548", title: "T", desc: "D" });
  assert.match(
    head,
    /^<svg viewBox="0 0 1200 548" xmlns="http:\/\/www\.w3\.org\/2000\/svg" role="img" aria-labelledby="t d">/
  );
  assert.match(head, /<title id="t">T<\/title>\n\s*<desc id="d">D<\/desc>\n\s*<style>/);
  assert.doesNotMatch(head, /@font-face/, "the outlining step adds the mono face, not svgOpen");
  assert.ok(gridDefs("g1").includes('<pattern id="g1"'));
  assert.equal(esc("a<b>&"), "a&lt;b&gt;&amp;");
});

test("svgOpen appends extraCss on its own line after the text roles, and nothing when omitted", () => {
  const base = { viewBox: "0 0 10 10", title: "t", desc: "d" };
  const withExtra = svgOpen({ ...base, extraCss: ".x{fill:red}" });
  assert.ok(withExtra.includes(`${textRoleCss()}\n.x{fill:red}\n  </style>`), withExtra);
  const plain = svgOpen(base);
  assert.ok(plain.includes(`${textRoleCss()}\n  </style>`), plain);
  assert.ok(!plain.includes("\n\n  </style>"), "no empty extra line when extraCss is omitted");
  assert.equal(svgOpen({ ...base, extraCss: "" }), plain);
});
