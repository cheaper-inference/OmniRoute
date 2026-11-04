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

// ci-tokens.css still owns the type scale (tracking, weights) the Switzer roles are checked
// against; the PALETTE is the kit's Editions appearance, OmniRoute's default look.
const tokens = readFileSync("packages/ui-kit/src/ci-tokens.css", "utf8");
const editions = readFileSync("packages/ui-kit/src/ci-editions.css", "utf8");

// --- ci-editions.css as data: the light block and the data-theme="dark" block ---------------
// KIT must hold the literal value each Editions token has inside its own block (following
// var(--…) chains; the dark block redeclares only what changes, so it falls back to light).

function parseBlock(selectorStart: string): Map<string, string> {
  const start = editions.indexOf(selectorStart);
  assert.ok(start >= 0, `block not found in ci-editions.css: ${selectorStart}`);
  const end = editions.indexOf("\n}", start);
  const body = editions.slice(editions.indexOf("{", start) + 1, end);
  const decls = new Map<string, string>();
  for (const m of body.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
    decls.set(m[1], m[2].replace(/\s+/g, " ").trim());
  }
  return decls;
}

const lightBlock = parseBlock(':is(html:root:has([data-ci-appearance="editions"])');
const darkBlock = parseBlock(
  ':is(html:root[data-theme="dark"]:has([data-ci-appearance="editions"])'
);

// rgb(32 33 28 / .22) → rgba(32,33,28,0.22): the module writes the comma form (same colour).
const normalize = (v: string) =>
  v.replace(
    /^rgb\((\d+) (\d+) (\d+) \/ (\d*\.?\d+)\)$/,
    (_, r: string, g: string, b: string, a: string) =>
      `rgba(${r},${g},${b},${a.startsWith(".") ? `0${a}` : a})`
  );

function resolve(name: string, block: Map<string, string>, depth = 0): string {
  assert.ok(depth < 8, `var() chain too deep for ${name}`);
  const raw = block.get(name) ?? lightBlock.get(name);
  assert.ok(raw, `${name} missing from ci-editions.css`);
  const ref = raw.match(/^var\((--[\w-]+)\)$/);
  return ref ? resolve(ref[1], block, depth + 1) : normalize(raw);
}

// KIT key → Editions token. Later diagrams rely on these exact key names.
const BASE_TOKENS: Record<string, string> = {
  bg: "--ci-color-background",
  surface: "--ci-color-surface",
  ink: "--ci-color-heading",
  body: "--ci-color-text",
  muted: "--ci-color-text-muted",
  border: "--ci-color-border",
  accent: "--ci-color-accent",
  accentInk: "--ci-color-accent-foreground",
};
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

// The one measured exception (readme-diagram-theme.mjs header): light warn is the kit's warning
// scaled to 90 % per channel, because the kit value is below AA for text on the light canvas.
const WARN_SCALE = 0.9;
const scaleHex = (hex: string, k: number) =>
  "#" +
  [1, 3, 5]
    .map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * k))
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("");

// WCAG 2.x contrast; a translucent colour is composited over the background first.
const rgbOf = (c: string, over?: number[]): number[] => {
  const hex = /^#([0-9a-f]{6})$/i.exec(c);
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16));
  const m = /^rgba\((\d+),(\d+),(\d+),([\d.]+)\)$/.exec(c);
  assert.ok(m && over, `colour ${c} needs a background to composite on`);
  const a = Number(m[4]);
  return [m[1], m[2], m[3]].map((v, i) => Math.round(Number(v) * a + over[i] * (1 - a)));
};
const luminance = (rgb: number[]) => {
  const [r, g, b] = rgb
    .map((c) => c / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (fg: string, bg: string, base?: string) => {
  const under = base ? rgbOf(base) : undefined;
  const [hi, lo] = [luminance(rgbOf(fg, rgbOf(bg, under))), luminance(rgbOf(bg, under))].sort(
    (x, y) => y - x
  );
  return (hi + 0.05) / (lo + 0.05);
};

test("every Editions color used by the diagrams exists verbatim in ci-editions.css", () => {
  for (const hex of [
    "#f3f1e9",
    "#faf9f4",
    "#20211c",
    "#626459",
    "#e5ac82",
    "#241b15",
    "#11120f",
    "#191a16",
    "#f2f0e8",
    "#a5a69b",
  ]) {
    assert.ok(editions.includes(hex), `${hex} missing from ci-editions.css`);
  }
  assert.equal(KIT.light.accent, "#e5ac82");
  assert.equal(KIT.dark.bg, "#11120f");
  assert.doesNotMatch(JSON.stringify(KIT), /#d8ff00|216,255,0/i, "no Classic lime left");
});

test("the token parser reads ci-editions.css the way the module does (sanity pins)", () => {
  assert.equal(resolve("--ci-color-success", lightBlock), "#3c735b");
  assert.equal(resolve("--ci-color-success", darkBlock), "#9ecbbb");
  assert.equal(resolve("--ci-color-surface-inverse", lightBlock), "#11120f");
  assert.equal(resolve("--ci-color-surface-inverse", darkBlock), "#11120f", "light fallback");
  assert.equal(resolve("--ci-color-text-inverse", lightBlock), "#f2f0e8");
  assert.equal(resolve("--ci-color-track", lightBlock), "rgba(32,33,28,0.18)");
  assert.equal(resolve("--ci-color-track", darkBlock), "rgba(242,240,232,0.18)");
  assert.equal(resolve("--ci-color-accent-surface-range", lightBlock), "rgba(229,172,130,0.18)");
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

test("every KIT value equals what its Editions token resolves to (light warn excepted)", () => {
  for (const [key, token] of Object.entries({ ...BASE_TOKENS, ...STATUS_AND_SURFACE_TOKENS })) {
    if (key !== "warn") {
      assert.equal(KIT.light[key], resolve(token, lightBlock), `light ${key} (${token})`);
    }
    assert.equal(KIT.dark[key], resolve(token, darkBlock), `dark ${key} (${token})`);
  }
});

test("light warn is the kit warning darkened 10 % — and only because the kit value misses AA", () => {
  const kitWarn = resolve("--ci-color-warning", lightBlock);
  assert.equal(kitWarn, "#99631f");
  assert.equal(KIT.light.warn, scaleHex(kitWarn, WARN_SCALE));
  assert.ok(contrast(kitWarn, KIT.light.bg) < 4.5, "the kit warning is below AA on the canvas");
  for (const bg of ["bg", "surface", "warnBg", "surfaceSubtle", "surfaceMuted"]) {
    const ratio = contrast(KIT.light.warn, KIT.light[bg]);
    assert.ok(ratio >= 4.5, `light warn on ${bg}: ${ratio.toFixed(2)}:1`);
  }
});

test("border is pinned to the kit's --ci-color-border in both blocks", () => {
  assert.equal(KIT.light.border, resolve("--ci-color-border", lightBlock));
  assert.equal(KIT.dark.border, resolve("--ci-color-border", darkBlock));
});

test("every text colour clears WCAG AA (4.5:1) on every surface it is drawn on, both schemes", () => {
  for (const scheme of ["light", "dark"] as const) {
    const k = KIT[scheme];
    const surfaces = ["bg", "surface", "surfaceSubtle", "surfaceMuted"];
    for (const fg of ["ink", "body", "muted"]) {
      for (const bg of surfaces) {
        const ratio = contrast(k[fg], k[bg]);
        assert.ok(ratio >= 4.5, `${scheme} ${fg} on ${bg}: ${ratio.toFixed(2)}:1`);
      }
      const soft = contrast(k[fg], k.accentSoft, k.surface);
      assert.ok(soft >= 4.5, `${scheme} ${fg} on accentSoft: ${soft.toFixed(2)}:1`);
    }
    for (const tone of ["ok", "warn", "err", "info"]) {
      for (const bg of [`${tone}Bg`, "bg", "surface"]) {
        const ratio = contrast(k[tone], k[bg]);
        assert.ok(ratio >= 4.5, `${scheme} ${tone} on ${bg}: ${ratio.toFixed(2)}:1`);
      }
    }
    assert.ok(contrast(k.accentInk, k.accent) >= 4.5, `${scheme} accentInk on accent`);
    assert.ok(contrast(k.inverseText, k.inverseBg) >= 4.5, `${scheme} inverse text`);
    // cli-terminal paints its inverse panel with the DARK status colours in both schemes.
    for (const tone of ["ok", "warn", "err", "muted"]) {
      const ratio = contrast(KIT.dark[tone], k.inverseBg);
      assert.ok(ratio >= 4.5, `${scheme} inverse panel ${tone}: ${ratio.toFixed(2)}:1`);
    }
  }
});

test("themeCss declares the light palette and a dark override behind prefers-color-scheme", () => {
  const css = themeCss();
  assert.match(css, /:root\{[^}]*--bg:#f3f1e9[^}]*--accent:#e5ac82/);
  assert.match(
    css,
    /@media \(prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#11120f[^}]*--ink:#f2f0e8/
  );
  assert.match(css, /--accent-ink:#241b15/);
});

test("themeCss carries the status colors in both blocks under kebab-case variable names", () => {
  const css = themeCss();
  const light = css.match(/^:root\{([^}]*)\}/)?.[1] ?? "";
  const dark = css.match(/@media \(prefers-color-scheme: dark\)\{:root\{([^}]*)\}\}/)?.[1] ?? "";
  assert.ok(light && dark, "both :root blocks present");
  const pairs: Array<[string, string, string]> = [
    ["--ok", "#3c735b", "#9ecbbb"],
    ["--err", "#ae4340", "#edaaa1"],
    ["--warn", "#8a591c", "#e5c28c"],
    ["--info", "#526b80", "#a6bfd0"],
    ["--inverse-bg", "#11120f", "#11120f"],
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
  // Type tokens live in ci-tokens.css's base (:root, .ci-theme) block, not in the palette.
  const typeStart = tokens.indexOf(":root,\n.ci-theme {");
  assert.ok(typeStart >= 0, "ci-tokens.css has its :root, .ci-theme block");
  const typeBlock = new Map(
    [
      ...tokens
        .slice(typeStart, tokens.indexOf("\n}", typeStart))
        .matchAll(/(--[\w-]+):\s*([^;]+);/g),
    ].map((m) => [m[1], m[2].trim()])
  );
  const em = (name: string) => Number(typeBlock.get(name)?.replace("em", ""));
  assert.equal(SWITZER_ROLES.headline.tracking, em("--ci-letter-spacing-display"));
  assert.equal(SWITZER_ROLES.h2.tracking, em("--ci-type-heading-tracking"));
  assert.equal(SWITZER_ROLES.num.tracking, em("--ci-type-metric-tracking"));
  assert.equal(SWITZER_ROLES.kicker.tracking, em("--ci-letter-spacing-caps"));
  assert.equal(SWITZER_ROLES.small.tracking, em("--ci-type-caption-tracking"));
  assert.match(tokens, /--ci-font-display: var\(--ci-font-ui\)/);
  assert.equal(Number(typeBlock.get("--ci-font-weight-medium")), SWITZER_ROLES.headline.weight);
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
