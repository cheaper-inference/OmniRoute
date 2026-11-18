/**
 * KEA-7886 P8 (lote 6 p10) — the Monaco editor theme is built from the kit CSS variables read at
 * runtime, not from a hard-coded hex palette. Pure helpers, plus a minimal fake document for the
 * probe read (no jsdom cascade, no Monaco).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  KIT_EDITOR_VARS,
  KIT_MONACO_THEME,
  buildMonacoKitTheme,
  defineKitMonacoThemes,
  kitMonacoThemeName,
  parseCssColor,
  readKitEditorPalette,
  toMonacoHex,
  type KitEditorPalette,
} from "../../src/shared/components/monacoKitTheme";

// Shaped like the kit's light tokens (hex, rgb() with alpha, rgb() comma syntax).
const LIGHT: KitEditorPalette = {
  surface: "#ffffff",
  surfaceSubtle: "#f6f8f8",
  foreground: "#1b2426",
  heading: "#040d10",
  muted: "#55605f",
  subtle: "#55605f",
  border: "rgb(4 13 16 / 0.24)",
  borderSubtle: "rgb(4 13 16 / 0.09)",
  selection: "rgb(216 255 0 / 0.22)",
  string: "#087a4f",
  number: "#2869d8",
  keyword: "#7d4fc7",
  key: "rgb(40, 105, 216)",
  warning: "#a75a00",
  danger: "#bf3636",
};

test("parseCssColor reads the formats the kit tokens use", () => {
  assert.deepEqual(parseCssColor("#fff"), { r: 255, g: 255, b: 255, a: 1 });
  assert.deepEqual(parseCssColor("#087a4f"), { r: 8, g: 122, b: 79, a: 1 });
  assert.deepEqual(parseCssColor("#00000080")?.a, 128 / 255);
  assert.deepEqual(parseCssColor("rgb(4 13 16 / 0.24)"), { r: 4, g: 13, b: 16, a: 0.24 });
  assert.deepEqual(parseCssColor("rgba(40, 105, 216, 0.5)"), { r: 40, g: 105, b: 216, a: 0.5 });
  assert.deepEqual(parseCssColor("rgb(100% 0% 0% / 50%)"), { r: 255, g: 0, b: 0, a: 0.5 });
  assert.equal(parseCssColor(""), null);
  assert.equal(parseCssColor("var(--ci-chart-1)"), null, "an unresolved var() is not a colour");
  assert.equal(parseCssColor("oklch(0.7 0.1 120)"), null, "left to the canvas normaliser");
});

test("toMonacoHex keeps alpha only when the colour is translucent", () => {
  assert.equal(toMonacoHex({ r: 8, g: 122, b: 79, a: 1 }), "#087a4f");
  assert.equal(toMonacoHex({ r: 4, g: 13, b: 16, a: 0.24 }), "#040d103d");
});

test("the theme maps every editor colour from a kit variable (no literal palette)", () => {
  const theme = buildMonacoKitTheme(LIGHT, false);
  assert.ok(theme);
  assert.equal(theme.base, "vs");
  assert.equal(theme.inherit, true);
  assert.equal(theme.colors["editor.background"], "#ffffff");
  assert.equal(theme.colors["editor.foreground"], "#1b2426");
  assert.equal(theme.colors["editor.selectionBackground"], "#d8ff0038");
  assert.equal(theme.colors["editorWidget.border"], "#040d103d");
  const rule = (token: string) => theme.rules.find((r) => r.token === token)?.foreground;
  assert.equal(rule("string.value.json"), "087a4f", "strings = chart-4");
  assert.equal(rule("number"), "2869d8", "numbers = chart-2");
  assert.equal(rule("keyword"), "7d4fc7", "keywords = chart-3");
  assert.equal(rule("string.key.json"), "2869d8", "keys = info");
  for (const r of theme.rules) {
    if (r.foreground)
      assert.match(r.foreground, /^[0-9a-f]{6}$/, "rule colours are bare 6-digit hex");
  }
  assert.equal(buildMonacoKitTheme(LIGHT, true)?.base, "vs-dark");
});

test("every palette slot is read from a --ci-* variable", () => {
  for (const cssVar of Object.values(KIT_EDITOR_VARS)) assert.match(cssVar, /^--ci-/);
});

test("an unreadable variable aborts the kit theme instead of shipping a broken one", () => {
  assert.equal(buildMonacoKitTheme({ ...LIGHT, surface: "" }, false), null);
  assert.equal(buildMonacoKitTheme({ ...LIGHT, string: "var(--x)" }, false), null);
});

test("built-in names map to the kit themes only once those are registered", () => {
  const none = new Set<string>();
  assert.equal(kitMonacoThemeName("vs-dark", none), "vs-dark");
  assert.equal(kitMonacoThemeName("light", none), "light");
  const both = new Set<string>([KIT_MONACO_THEME.dark, KIT_MONACO_THEME.light]);
  assert.equal(kitMonacoThemeName("vs-dark", both), KIT_MONACO_THEME.dark);
  assert.equal(kitMonacoThemeName("light", both), KIT_MONACO_THEME.light);
  assert.equal(kitMonacoThemeName("vs", both), KIT_MONACO_THEME.light);
  assert.equal(kitMonacoThemeName("hc-black", both), "hc-black", "other themes pass through");
  const darkOnly = new Set<string>([KIT_MONACO_THEME.dark]);
  assert.equal(
    kitMonacoThemeName("light", darkOnly),
    "light",
    "light on a dark page stays built-in"
  );
});

test("defineKitMonacoThemes is a no-op without a DOM (SSR) and never throws", () => {
  const calls: string[] = [];
  const monaco = { editor: { defineTheme: (name: string) => void calls.push(name) } };
  const available = defineKitMonacoThemes(monaco, undefined);
  assert.equal(calls.length, 0);
  assert.equal(available.size, 0);
});

// --- Editions palette: the probe read follows the ROOT's data-theme -----------------------------
// ci-editions.css picks light/dark from `html:root[data-theme]` with selectors that outrank any
// probe attribute, so the fake below resolves every variable from the root's data-theme when the
// root carries data-ci-appearance (Editions), and from the probe's own data-theme otherwise
// (Classic: `.ci-theme[data-theme="dark"]` matches the probe).
const EDITIONS_LIGHT_SURFACE = "#faf9f4";
const EDITIONS_DARK_SURFACE = "#191a16";

function fakeDocument(pageTheme: "light" | "dark", editions: boolean) {
  const readsAt: string[] = [];
  const attrs = new Map<string, string>(editions ? [["data-ci-appearance", "editions"]] : []);
  const documentElement = {
    dataset: { theme: pageTheme } as Record<string, string | undefined>,
    hasAttribute: (name: string) => attrs.has(name),
  };
  const valueFor = (theme: string | undefined, cssVar: string) => {
    if (cssVar === "--ci-color-surface")
      return theme === "dark" ? EDITIONS_DARK_SURFACE : EDITIONS_LIGHT_SURFACE;
    return theme === "dark" ? "#f2f0e8" : "#20211c";
  };
  const doc = {
    documentElement,
    body: { appendChild: () => undefined },
    createElement: () => {
      const probe = {
        className: "",
        dataset: {} as Record<string, string>,
        style: {} as Record<string, string>,
        setAttribute: () => undefined,
        remove: () => undefined,
      };
      return probe;
    },
    defaultView: {
      getComputedStyle: (probe: { dataset: Record<string, string> }) => {
        const effective = editions ? documentElement.dataset.theme : probe.dataset.theme;
        readsAt.push(String(documentElement.dataset.theme));
        return { getPropertyValue: (cssVar: string) => valueFor(effective, cssVar) };
      },
    },
  };
  return { doc: doc as unknown as Document, documentElement, readsAt };
}

test("Editions: a dark probe on a light page reads dark values and restores the page theme", () => {
  const { doc, documentElement, readsAt } = fakeDocument("light", true);
  const dark = readKitEditorPalette(true, doc);
  assert.equal(dark.surface, EDITIONS_DARK_SURFACE, "the vs-dark editor gets the dark surface");
  assert.deepEqual(readsAt, ["dark"], "the root was flipped for the read");
  assert.equal(documentElement.dataset.theme, "light", "…and restored right after");
  const light = readKitEditorPalette(false, doc);
  assert.equal(light.surface, EDITIONS_LIGHT_SURFACE);
  assert.deepEqual(readsAt, ["dark", "light"], "an on-theme read does not touch the root");
});

test("Classic: the probe's own data-theme decides, and the root is never flipped", () => {
  const { doc, documentElement, readsAt } = fakeDocument("light", false);
  const dark = readKitEditorPalette(true, doc);
  assert.equal(dark.surface, EDITIONS_DARK_SURFACE);
  assert.deepEqual(readsAt, ["light"], "no root flip without data-ci-appearance");
  assert.equal(documentElement.dataset.theme, "light");
});

test("Editions on a dark page registers the light kit theme too (the Classic skip is lifted)", () => {
  const defined: string[] = [];
  const monaco = { editor: { defineTheme: (name: string) => void defined.push(name) } };
  const { doc, documentElement } = fakeDocument("dark", true);
  const available = defineKitMonacoThemes(monaco, doc);
  assert.deepEqual(defined, [KIT_MONACO_THEME.dark, KIT_MONACO_THEME.light]);
  assert.ok(available.has(KIT_MONACO_THEME.light));
  assert.equal(documentElement.dataset.theme, "dark", "the page theme is back to dark");
});
