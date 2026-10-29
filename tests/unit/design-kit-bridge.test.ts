import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");
const css = read("src/app/globals.css");
const block = (selector: string) => {
  const start = css.indexOf(selector);
  assert.ok(start >= 0, `globals.css has a "${selector}" block`);
  return css.slice(start, css.indexOf("\n}", start));
};

test("globals.css loads the vendored kit CSS right after Tailwind, and the kit self-hosts its font", () => {
  const order = [
    '@import "tailwindcss" source(none);',
    '@import "../../packages/ui-kit/src/ci-ui.css";',
  ].map((needle) => css.indexOf(needle));
  assert.ok(
    order.every((i) => i >= 0),
    `every import is present: ${order}`
  );
  assert.deepEqual(
    [...order].sort((a, b) => a - b),
    order,
    "imports keep this order"
  );
  // Since kit 0.0.66 the UI and display roles are Switzer, declared by the kit itself:
  // ci-ui.css → ci-tokens.css → ci-fonts.css → local woff2 files. Instrument Serif and IBM Plex
  // Mono are gone; Inter comes back ONLY as the per-script fallback after Switzer (Switzer has no
  // Cyrillic / Greek / Vietnamese glyphs), never as a primary face.
  const fontsourceImports = [...css.matchAll(/@import "@fontsource\/([^/"]+)\//g)].map((m) => m[1]);
  assert.deepEqual([...new Set(fontsourceImports)], ["inter"]);
  assert.doesNotMatch(css, /--font-(sans|display):\s*"Inter"/);
  assert.doesNotMatch(css, /fonts\.googleapis\.com/);
  const tokens = read("packages/ui-kit/src/ci-tokens.css");
  assert.match(tokens, /^@import "\.\/ci-fonts\.css";/m);
  assert.match(tokens, /--ci-font-ui: "Switzer"/);
  const fonts = read("packages/ui-kit/src/ci-fonts.css");
  for (const [, file] of fonts.matchAll(/url\("\.\/(fonts\/[^"]+\.woff2)"\)/g))
    assert.ok(fs.existsSync(path.join(ROOT, "packages/ui-kit/src", file)), `${file} is vendored`);
  assert.doesNotMatch(fonts, /https?:\/\//, "the kit font is self-hosted");
});

test("the OmniRoute color tokens are aliases of kit tokens (no hex left in :root / .dark)", () => {
  const root = block(":root {\n  --desktop-safe-top");
  const dark = block(".dark {");
  for (const [name, target] of [
    ["--color-bg", "var(--ci-color-background)"],
    ["--color-bg-primary", "var(--ci-color-background)"],
    ["--color-bg-alt", "var(--ci-color-surface-subtle)"],
    ["--color-bg-subtle", "var(--ci-color-surface-subtle)"],
    ["--color-surface", "var(--ci-color-surface)"],
    ["--color-card", "var(--ci-color-surface)"],
    ["--color-sidebar", "var(--ci-color-surface)"],
    ["--surface-2", "var(--ci-color-surface-muted)"],
    ["--color-border", "var(--ci-color-border-subtle)"],
    ["--color-text-main", "var(--ci-color-foreground)"],
    ["--color-text-primary", "var(--ci-color-foreground)"],
    ["--color-text-muted", "var(--ci-color-text-muted)"],
    ["--color-primary", "var(--ci-color-accent)"],
    ["--color-primary-hover", "var(--ci-color-accent-hover)"],
    ["--color-accent", "var(--ci-color-accent)"],
    ["--color-accent-light", "var(--ci-color-accent-surface-strong)"],
    ["--color-success", "var(--ci-color-success)"],
    ["--color-warning", "var(--ci-color-warning)"],
    ["--color-error", "var(--ci-color-danger)"],
    ["--orch-status-success", "var(--ci-color-success)"],
    ["--orch-status-warning", "var(--ci-color-warning)"],
    ["--orch-status-error", "var(--ci-color-danger)"],
    ["--radius", "var(--ci-radius-surface)"],
    ["--radius-control", "var(--ci-radius-control)"],
    ["--color-fd-background", "var(--ci-color-background)"],
    ["--color-fd-primary", "var(--ci-color-accent)"],
    ["--table-header-bg", "var(--ci-color-surface-muted)"],
  ] as const) {
    assert.ok(root.includes(`${name}: ${target};`), `:root maps ${name} → ${target}`);
  }
  assert.doesNotMatch(root, /#[0-9a-fA-F]{3,6}\b/, ":root carries no hex literal");
  assert.doesNotMatch(
    dark,
    /--color-[\w-]+:\s*#[0-9a-fA-F]{3,6}/,
    ".dark redefines no color token with a hex"
  );
  assert.match(dark, /color-scheme:\s*dark/);
});

test("the graph-paper grid, the coral/indigo palette and the macOS font stack are gone", () => {
  assert.doesNotMatch(css, /body::before/);
  assert.doesNotMatch(css, /--grid-line|--grid-size|--section-alt/);
  assert.doesNotMatch(css, /#e54d5e|#6366f1|#8b5cf6/);
  assert.doesNotMatch(css, /"SF Pro Text"/);
  const theme = block("@theme inline {");
  assert.match(theme, /--font-sans:\s*var\(--ci-font-ui\);/);
  // Code text is monospace again: kit 0.0.66 points --ci-font-mono at Switzer (proportional),
  // so `font-mono` maps to the code stack (upstream 0.0.76 names it --ci-font-code).
  assert.match(theme, /--font-mono:\s*var\(--ci-font-code\);/);
  assert.match(css, /--ci-font-code:\s*ui-monospace[^;]*monospace;/);
  // Switzer is Latin-only: Inter's subsets (unicode-range) cover Cyrillic / Greek / Vietnamese.
  assert.match(css, /--ci-font-ui:\s*"Switzer",\s*"Inter",/);
  assert.match(css, /@import "@fontsource\/inter\/400\.css";/);
  assert.match(theme, /--font-display:\s*var\(--ci-font-display\);/);
  for (const t of [
    "--color-success-bg",
    "--color-warning-bg",
    "--color-error-bg",
    "--color-info",
    "--color-info-bg",
    "--color-chart-1",
    "--color-chart-5",
  ]) {
    assert.ok(theme.includes(`${t}:`), `@theme inline exposes ${t}`);
  }
});

test("focus ring lives in @layer base so kit controls keep their own focus styles", () => {
  // An OUTLINE, not a box-shadow: Tailwind `shadow-*` utilities (layer utilities) would win
  // the box-shadow cascade over @layer base and leave legacy buttons without any focus cue.
  assert.match(
    css,
    /@layer base \{[\s\S]*?\n\s*:focus-visible \{\s*outline: 2px solid var\(--ci-color-focus-ring\);\s*outline-offset: 2px;/
  );
  // the generic rule (bare `:focus-visible`, not `.focus-ring:focus-visible`) no longer pairs
  // `outline: none` with a box-shadow
  assert.doesNotMatch(
    css,
    /\n\s*:focus-visible \{\s*outline: none;\s*box-shadow: var\(--focus-ring\)/
  );
  assert.match(
    css,
    /\.focus-ring:focus-visible \{\s*outline: none;\s*box-shadow: var\(--focus-ring\);/
  );
  assert.match(css, /:focus:not\(:focus-visible\) \{\s*outline: none;/);
  assert.match(
    css,
    /--focus-ring:\s*0 0 0 2px var\(--ci-color-background\), 0 0 0 4px var\(--ci-color-focus-ring\);/
  );
});

test("phone-only heading/button rules leave kit elements alone (spike conflicts #7/#8)", () => {
  // Same `@layer components` as the kit; without the guard, source order would let these
  // truncate a kit PageHeader title or stretch kit buttons on phones.
  assert.match(css, /main :is\(h1, h2\):not\(\[class\*="ci-"\]\)/);
  assert.match(css, /> button:not\(\[class\*="ci-"\]\)/);
  assert.doesNotMatch(css, /main :is\(h1, h2\) \{/);
});

test("adapter extension classes exist for the Button warning variant and Badge tones", () => {
  assert.match(css, /\.ci-button--warning \{/);
  for (const tone of ["success", "warning", "danger", "info", "primary"]) {
    assert.match(css, new RegExp(`\\.ci-badge\\[data-tone="${tone}"\\]`), `badge tone ${tone}`);
  }
});

test("no class literal pairs a solid bg-accent/bg-primary with text-white (lime needs dark ink)", () => {
  // `--color-accent` / `--color-primary` are the kit's lime (#d8ff00): white on it is ~1.1:1.
  // Solid token = `bg-accent` / `bg-primary` followed by whitespace, a quote or the end —
  // `bg-accent/10`, `bg-accent-light`, `bg-primary/20` are tints and stay out of scope.
  const SOLID = /(?<![\w/:-])bg-(?:accent|primary)(?=[\s"'`]|$)/;
  const WHITE = /(?<![\w/:-])text-white(?=[\s"'`]|$)/;
  const LITERAL = /"[^"]*"|'[^'\n]*'|`[^`]*`/g;
  const offenders: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".tsx")) {
        const src = fs.readFileSync(full, "utf8");
        for (const m of src.matchAll(LITERAL)) {
          const line = src.slice(0, m.index).split("\n").length;
          // A template literal is judged per branch: the static part plus ONE `${…}` branch at
          // a time, so `${cond ? "bg-primary text-accent-foreground" : "bg-red-500 text-white"}`
          // is fine while `bg-primary ${cond ? "text-white" : ""}` is not.
          const units: string[] = [];
          if (m[0].startsWith("`") && m[0].includes("${")) {
            const stat = m[0].replace(/\$\{[^}]*\}/g, " ");
            const branches = [...m[0].matchAll(/\$\{[^}]*\}/g)].flatMap(
              (e) => e[0].match(/"[^"]*"|'[^']*'/g) ?? []
            );
            units.push(stat, ...branches.map((b) => `${stat} ${b}`));
          } else units.push(m[0]);
          if (units.some((u) => SOLID.test(u) && WHITE.test(u))) {
            offenders.push(`${path.relative(ROOT, full)}:${line}`);
          }
        }
      }
    }
  };
  walk(path.join(ROOT, "src"));
  assert.deepEqual(
    offenders,
    [],
    "solid accent surface with white ink (use text-accent-foreground). If the literal is a " +
      "template whose bg-accent/bg-primary sits in one `${cond ? … : …}` branch while text-white " +
      "belongs to another background, this is a legitimate split: move the ink into each branch " +
      "by hand instead of replacing it globally:\n" +
      offenders.join("\n")
  );
});

test("STATUS_HEX mirrors the kit status palette (ReactFlow/SVG need hex)", async () => {
  const { STATUS_HEX } = await import("../../src/shared/constants/statusColors.ts");
  const { ciTokens } = await import("../../packages/ui-kit/src/tokens.ts");
  assert.equal(STATUS_HEX.success, ciTokens.color.status.success);
  assert.equal(STATUS_HEX.warning, ciTokens.color.status.warning);
  assert.equal(STATUS_HEX.error, ciTokens.color.status.danger);
  assert.equal(STATUS_HEX.muted, ciTokens.color.neutral[500]);
  assert.equal(STATUS_HEX.approval, ciTokens.color.chart[3]);
  assert.doesNotMatch(read("src/shared/constants/statusColors.ts"), /#[0-9a-fA-F]{6}/);
});

test("<html> opts into the kit theme surface", () => {
  assert.match(read("src/app/layout.tsx"), /<html[^>]*className="ci-theme"/);
});

// Guards kept from design-grid-background.test.ts that are still true after the bridge
// (they protect files this task does not touch).
test("flow surfaces still express state with --orch-status-* tokens, not fixed hex", () => {
  const combo = read("src/app/(dashboard)/dashboard/combos/live/ComboLiveStudio.tsx");
  const engine = read("src/app/(dashboard)/dashboard/compression/studio/nodes/EngineNode.tsx");
  const edges = read("src/shared/components/flow/edgeStyles.ts");
  const badge = read("src/shared/components/TokenHealthBadge.tsx");
  for (const [name, src] of Object.entries({ combo, engine, edges })) {
    assert.ok(src.includes("var(--orch-status-"), `${name} reads the status tokens`);
  }
  // TokenHealthBadge moved onto the kit (KEA-7886, lote 10): its state reads the same kit
  // status tokens through the semantic utilities (--color-success/warning/error → --ci-*).
  for (const tone of ["text-success", "text-warning", "text-error"]) {
    assert.ok(badge.includes(`"${tone}"`), `badge reads the ${tone} status token`);
  }
  // EngineNode's categorical layer pills ride the chart tokens (P8, asserted below); its state
  // colors are the tokens above, so the forbidden literal there is the old warning hex.
  for (const [name, src] of Object.entries({ combo, edges, badge })) {
    assert.ok(!src.includes('"#22c55e"'), `${name} hardcodes no success hex`);
  }
  assert.ok(!engine.includes('"#f59e0b"'), "engine hardcodes no warning hex");
});

// ── Guards carried verbatim in spirit from design-grid-background.test.ts (383c5dc5d479) that
// stay true after the bridge; the grid/14px/gradient/STATUS_HEX ones were obsolete by design.
test("DashboardLayout content shell is fluid up to ~4K before centering", () => {
  // The content wrapper lives in the kit shell (DashboardShell), the only shell since KEA-7886 F4.
  const file = "src/shared/components/layouts/DashboardShell.tsx";
  const dashboardLayout = read(file);
  assert.ok(
    dashboardLayout.includes("max-w-[3840px] mx-auto"),
    `${file}: content wrapper caps at 3840px (4K) and centers only beyond that`
  );
  assert.ok(
    !dashboardLayout.includes("max-w-7xl"),
    `${file}: the old 1280px max-w-7xl cap is gone`
  );
});

test("DataTable is theme-aware via --table-* tokens, no color literal, no dead fallbacks", () => {
  const dt = read("src/shared/components/DataTable.tsx");
  assert.ok(dt.includes("var(--table-header-bg)"), "header uses the token");
  // KEA-7886: rows, borders, hover and selection come from the kit table (ci-ui.css tokens);
  // the selected row is the kit's data-state="selected" instead of a zebra/selected inline mix.
  assert.ok(dt.includes('from "@omniroute/ui-kit/table"'), "rows render through the kit table");
  assert.ok(dt.includes('data-state={selected ? "selected" : undefined}'), "kit row selection");
  assert.ok(!/rgba\(|#[0-9a-fA-F]{3,6}/.test(dt), "DataTable hardcodes no color literal");
  assert.ok(
    !dt.includes("--text-secondary") && !dt.includes("--bg-table-header"),
    "the dead var fallbacks are gone"
  );
});

test("every flow surface expresses state with --orch-status-* tokens; categorical palettes stay", () => {
  const combo = read("src/app/(dashboard)/dashboard/combos/live/ComboLiveStudio.tsx");
  const engine = read("src/app/(dashboard)/dashboard/compression/studio/nodes/EngineNode.tsx");
  const waterfall = read("src/app/(dashboard)/dashboard/compression/studio/WaterfallInspector.tsx");
  const cockpit = read("src/app/(dashboard)/dashboard/compression/studio/CompressionCockpit.tsx");
  const io = read("src/app/(dashboard)/dashboard/compression/studio/nodes/IoNode.tsx");
  const strategy = read("src/app/(dashboard)/dashboard/combos/live/nodes/StrategyNode.tsx");

  // Combo live studio: active/error provider pills + the run outcome tri-state.
  assert.ok(combo.includes("FLOW_EDGE_COLORS.active"), "combo active pill uses the flow palette");
  assert.ok(combo.includes("FLOW_EDGE_COLORS.error"), "combo error pill uses the flow palette");
  assert.ok(combo.includes('"var(--orch-status-success)"'), "combo succeeded = success token");
  assert.ok(combo.includes('"var(--orch-status-error)"'), "combo exhausted = error token");
  assert.ok(combo.includes('"var(--orch-status-warning)"'), "combo pending = warning token");
  assert.ok(!combo.includes('"#ef4444"'), "combo studio hardcodes no error hex");
  assert.ok(!combo.includes('"#f59e0b"'), "combo studio hardcodes no warning hex");

  // Compression engine node: savings ramp + the running state.
  assert.ok(engine.includes('"var(--orch-status-success)"'), "engine savings>=30 = success token");
  assert.ok(
    engine.includes('"var(--orch-status-warning)"'),
    "engine savings>=15 / running = warning"
  );
  assert.ok(engine.includes('"var(--orch-status-muted)"'), "engine no-savings = muted token");
  assert.ok(
    engine.includes("flowColorAlpha("),
    "engine glow uses color-mix, not a hex alpha suffix"
  );
  assert.ok(!engine.includes("#f59e0b40"), "the 8-bit alpha suffix is gone (invalid on a var())");

  // Waterfall inspector: same ramp + the skipped/idle state + the total savings.
  assert.ok(waterfall.includes('"var(--orch-status-success)"'), "waterfall success token");
  assert.ok(waterfall.includes('"var(--orch-status-warning)"'), "waterfall warning token");
  assert.ok(waterfall.includes('"var(--orch-status-muted)"'), "waterfall skipped = muted token");
  assert.ok(!waterfall.includes('"#22c55e"'), "waterfall hardcodes no success hex");
  assert.ok(!waterfall.includes('"#6b7280"'), "waterfall hardcodes no muted hex");

  // Cockpit header + IoNode savings readout.
  assert.ok(cockpit.includes('"var(--orch-status-success)"'), "cockpit savings = success token");
  assert.ok(!cockpit.includes('"#22c55e"'), "cockpit hardcodes no success hex");
  assert.ok(io.includes('"var(--orch-status-success)"'), "IoNode savings = success token");

  // Categorical palettes (not state) ride the kit chart tokens, never hex (KEA-7886, P8).
  assert.ok(
    strategy.includes("strategyColorVar(") && !/#[0-9a-fA-F]{6}/.test(strategy),
    "strategy hues come from the shared chart-token strategy palette"
  );
  assert.ok(
    engine.includes("categoricalSlotFor(LAYER_ORDER, layer)") &&
      !/LAYER_COLORS|"#[0-9a-fA-F]{6}/.test(engine),
    "layer pills stay a categorical palette, on the chart tokens"
  );
  assert.ok(
    io.includes('isInput ? "var(--color-chart-2)" : "var(--color-chart-4)"'),
    "IoNode keeps an input/output identity pair, on the chart tokens"
  );
});

test("@theme inline still exposes bg-surface-2 and rounded-card", () => {
  const theme = block("@theme inline {");
  assert.match(theme, /--color-surface-2:\s*var\(--surface-2\);/);
  assert.match(theme, /--radius-card:\s*var\(--radius\);/);
  assert.match(theme, /--radius-control:\s*var\(--radius-control\);/);
});

test("bg-alt, muted and surface-secondary have @theme entries so their utilities paint (KEA-7886 P4)", () => {
  // Before P4 these three had a :root value but no @theme entry: `bg-bg-alt` (41 uses),
  // `bg-muted/50` and `bg-surface-secondary/30` generated no CSS at all.
  const theme = block("@theme inline {");
  const root = block(":root {\n  --desktop-safe-top");
  for (const [name, kit] of [
    ["--color-bg-alt", "var(--ci-color-surface-subtle)"],
    ["--color-muted", "var(--ci-color-surface-muted)"],
    ["--color-surface-secondary", "var(--ci-color-surface-subtle)"],
  ] as const) {
    assert.ok(theme.includes(`${name}: var(${name});`), `@theme inline exposes ${name}`);
    // Kit token → flips with data-theme="dark", so light and dark both get a kit surface.
    assert.ok(root.includes(`${name}: ${kit};`), `:root maps ${name} → ${kit}`);
  }
});

test("cn() still dedupes via tailwind-merge and DataTable paints an opaque surface", () => {
  assert.match(read("src/shared/utils/cn.ts"), /twMerge\(clsx\(/);
  assert.ok(read("src/shared/components/DataTable.tsx").includes("var(--color-surface)"));
});

test("text-primary resolves to a readable primary ink; lime stays on bg/border/ring (KEA-7886)", () => {
  // Tailwind 4 resolves `text-*` colors from `--text-color-*` BEFORE `--color-*`
  // (tailwindcss/dist/lib.js: valueThemeKeys ["--text-color", "--color"]), so this one alias
  // repaints every `text-primary` (+ hover:/group-hover:/`/80` variants) without touching
  // `bg-primary`, `border-primary` or `ring-primary`, which keep reading `--color-primary`.
  const theme = block("@theme inline {");
  assert.match(theme, /--text-color-primary:\s*var\(--color-primary-ink\);/);
  assert.match(theme, /--color-primary:\s*var\(--color-primary\);/, "bg/border/ring stay lime");
  // `--color-accent` is the same lime, so `text-accent` reads the same ink (bg-accent stays lime).
  assert.match(theme, /--text-color-accent:\s*var\(--color-primary-ink\);/);
  assert.match(theme, /--color-accent:\s*var\(--color-accent\);/, "bg-accent stays lime");

  const root = block(":root {\n  --desktop-safe-top");
  const darkRoot = block(':root[data-theme="dark"] {');
  const inkOf = (scope: string, theme: string) => {
    const m = /--color-primary-ink:\s*var\((--ci-[\w-]+)\);/.exec(scope);
    assert.ok(m, `--color-primary-ink is bridged to a --ci-* kit token in ${theme}`);
    return m[1];
  };
  const lightInk = inkOf(root, "light");
  const darkInk = inkOf(darkRoot, "dark");

  // Resolve through the vendored kit like integration-wiring's "opaque theme colors" test.
  const kitCss = read("packages/ui-kit/src/ci-tokens.css").replace(/\/\*[\s\S]*?\*\//g, "");
  const kitBlock = (selector: RegExp) => {
    const match = selector.exec(kitCss);
    assert.ok(match, `ci-tokens.css declares ${selector}`);
    const body = kitCss.slice(match.index + match[0].length, kitCss.indexOf("}", match.index));
    return new Map([...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
  };
  const light = kitBlock(/^:root,\s*\.ci-theme\s*\{/m);
  const dark = kitBlock(/^:root\[data-theme="dark"\][^{]*\{/m);
  const resolve = (token: string, scopes: Map<string, string>[]) => {
    let value = `var(${token})`;
    for (let hops = 0; hops < 10; hops++) {
      const ref = /^var\((--[\w-]+)\)$/.exec(value);
      if (!ref) {
        assert.match(value, /^#[0-9a-f]{6}$/i, `${token} resolves to a 6-digit hex`);
        return value;
      }
      const next = scopes.map((scope) => scope.get(ref[1])).find((v) => v !== undefined);
      assert.ok(next, `${ref[1]} is declared in ci-tokens.css`);
      value = next;
    }
    return assert.fail(`${token} does not resolve to a literal colour`);
  };
  const luminance = (hex: string) => {
    const [r, g, b] = [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (a: string, b: string) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };

  const lightBg = resolve("--ci-color-background", [light]);
  const darkBg = resolve("--ci-color-background", [dark, light]);
  const lightRatio = contrast(resolve(lightInk, [light]), lightBg);
  const darkRatio = contrast(resolve(darkInk, [dark, light]), darkBg);
  assert.ok(
    lightRatio >= 4.5,
    `light ink ${lightInk} on the background: ${lightRatio.toFixed(2)}:1`
  );
  assert.ok(darkRatio >= 4.5, `dark ink ${darkInk} on the background: ${darkRatio.toFixed(2)}:1`);

  // --color-primary itself is still the lime accent (the surface that carries dark ink).
  assert.ok(root.includes("--color-primary: var(--ci-color-accent);"));
  assert.ok(root.includes("--color-accent: var(--ci-color-accent);"), "accent is the same lime");
  assert.equal(resolve("--ci-color-accent", [light]), resolve("--ci-lime-400", [light]));
  assert.ok(
    contrast(resolve("--ci-color-accent", [light]), lightBg) < 4.5,
    "sanity: lime itself is unreadable as text on light — the reason for the ink"
  );

  // The inline ::selection rule colours TEXT, so it reads the ink too.
  assert.match(css, /::selection \{[^}]*\n\s*color: var\(--color-primary-ink\);/);
});

test("token aliases with no consumer are gone (KEA-7886 F4)", () => {
  for (const token of [
    "--grad-brand",
    "--color-accent-hover",
    "--color-traffic-red",
    "--color-traffic-yellow",
    "--color-traffic-green",
    "--table-row-zebra",
    "--table-row-hover",
    "--table-cell-border",
    "--table-row-selected",
  ]) {
    assert.ok(!css.includes(`${token}:`), `${token} is no longer declared`);
  }
  assert.doesNotMatch(css, /\.traffic-lights?\b/, "the unused .traffic-light(s) chrome is gone");
});

test("the primary Badge tone keeps dark ink in light and takes the lime ink in dark (F4)", () => {
  // Light: near-black ink on lime-100. Dark: the kit keeps --ci-color-accent-foreground near-black
  // while the surface becomes a 14 % lime tint over the dark background, so the "8 features"
  // translator badge read near-black on near-black. Dark flips the ink to the lime itself.
  assert.match(
    css,
    /\.ci-badge\[data-tone="primary"\] \{\s*color: var\(--ci-color-accent-foreground\);\s*background: var\(--ci-color-accent-surface-strong\);/
  );
  assert.match(
    css,
    /:root\[data-theme="dark"\] \.ci-badge\[data-tone="primary"\] \{\s*color: var\(--ci-color-accent\);/
  );
});
