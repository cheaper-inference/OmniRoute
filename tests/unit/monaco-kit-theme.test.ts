/**
 * KEA-7886 P8 (lote 6 p10) — the Monaco editor theme is built from the kit CSS variables read at
 * runtime, not from a hard-coded hex palette. Pure helpers only (no DOM, no Monaco).
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
