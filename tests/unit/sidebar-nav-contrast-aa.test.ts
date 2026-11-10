import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

// Regression guard for the axe `color-contrast` failures of
// tests/e2e/sidebar-navigation.spec.ts (mobile drawer, light + dark): the nested item label and
// the item subtitle are drawn on `--color-sidebar`, and WCAG 2 AA needs 4.5:1 for text under
// 18 pt. `text-text-muted` is 4.45:1 on the light sidebar and `text-text-muted/60` is 2.23 / 3.37,
// which is why the E2E shard went red. This test computes the same blended ratio axe reports from
// the theme tokens in src/app/globals.css (resolved through the CI UI Kit token chain in
// packages/ui-kit/src/ci-tokens.css) and the Tailwind classes in Sidebar.tsx, so the contract
// is checked on every unit run instead of only in the Playwright lane.
//
// Since the kit shell (KEA-7886, trilha F) the rows are kit `SidebarMenuButton`s inside the kit
// `<aside class="ci-sidebar">`: the item label carries no colour class and inherits the kit's
// `.ci-sidebar__menu-button` ink, the subtitle keeps `text-text-muted`, and the real background is
// the kit sidebar's (`.ci-sidebar` background). Both the legacy `--color-sidebar` and the kit
// sidebar background are checked; the active row (accent ink on the accent fill) too.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");
const sidebarSource = read("src/shared/components/Sidebar.tsx");
const globals = read("src/app/globals.css");

const TEXT_CLASS = /\btext-text-(main|muted)(?:\/(\d{1,3}))?\b/;

function classOn(lineMarker: string): { token: string; alpha: number } {
  const line = sidebarSource.split("\n").find((candidate) => candidate.includes(lineMarker));
  assert(line, `Sidebar.tsx no longer contains "${lineMarker}"`);
  const match = TEXT_CLASS.exec(line);
  assert(match, `no text-text-* class on the line containing "${lineMarker}": ${line.trim()}`);
  return { token: `--color-text-${match[1]}`, alpha: match[2] ? Number(match[2]) / 100 : 1 };
}

const kitTokens = read("packages/ui-kit/src/ci-tokens.css");
const kitCss = read("packages/ui-kit/src/ci-ui.css");

// `<prop>: var(--token)` inside the first `<selector> {` rule of the kit stylesheet.
function kitRuleVar(selector: string, prop: string): string {
  const start = kitCss.indexOf(`${selector} {`);
  assert(start >= 0, `kit stylesheet has no "${selector} {" rule`);
  const body = kitCss.slice(start, kitCss.indexOf("}", start));
  const match = new RegExp(`(?:^|[\\s;{])${prop}:\\s*var\\((--[\\w-]+)\\)`).exec(body);
  assert(match, `"${selector}" sets no ${prop}: var(--…)`);
  return match[1];
}

function cssBlock(source: string, selector: string): Record<string, string> {
  const start = source.indexOf(selector);
  assert(start >= 0, `no "${selector}" block`);
  const body = source.slice(start, source.indexOf("\n}", start));
  const out: Record<string, string> = {};
  for (const m of body.matchAll(/(--[\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

// Follows the var() chain (globals.css bridge → kit tokens → palette) down to a hex literal.
function resolveHex(name: string, scopes: Record<string, string>[]): string {
  const scope = scopes.find((s) => name in s);
  assert(scope, `token ${name} is not defined in any scope`);
  const value = scope[name];
  const ref = /^var\((--[\w-]+)\)$/.exec(value);
  if (ref) return resolveHex(ref[1], scopes);
  assert(/^#[0-9a-fA-F]{6}$/.test(value), `${name} resolves to "${value}", expected #rrggbb`);
  return value.toLowerCase();
}

const kitMenuInk = kitRuleVar(".ci-sidebar__menu-button", "color");
const kitSidebarBg = kitRuleVar(".ci-sidebar", "background");

function themeTokens(theme: "light" | "dark"): Record<string, string> {
  const light = [
    cssBlock(globals, ":root {\n  --desktop-safe-top"),
    cssBlock(kitTokens, ":root,\n.ci-theme {"),
  ];
  const scopes =
    theme === "dark"
      ? [cssBlock(globals, ".dark {"), cssBlock(kitTokens, ':root[data-theme="dark"]'), ...light]
      : light;
  return Object.fromEntries(
    [
      "--color-sidebar",
      "--color-text-main",
      "--color-text-muted",
      kitMenuInk,
      kitSidebarBg,
      "--ci-color-accent",
      "--ci-color-accent-foreground",
    ].map((t) => [t, resolveHex(t, scopes)])
  );
}

const channels = (hex: string) =>
  [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16));

function luminance(rgb: number[]): number {
  const [r, g, b] = rgb.map((value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg: string, alpha: number, bg: string): number {
  const back = channels(bg);
  const blended = channels(fg).map((value, index) => alpha * value + (1 - alpha) * back[index]);
  const [light, dark] = [luminance(blended), luminance(back)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

const themes = { light: themeTokens("light"), dark: themeTokens("dark") };
// The item label must not override the kit ink (an override would escape this check and the
// kit's hover/active colours).
const labelLine = sidebarSource.split("\n").find((line) => line.includes('"truncate text-sm"'));
assert(labelLine, 'Sidebar.tsx no longer contains the item label marker "truncate text-sm"');
test("the item label inherits the kit menu-button ink (no text-text-* override)", () => {
  assert.doesNotMatch(labelLine, TEXT_CLASS, labelLine.trim());
});
const inactiveItem = { token: kitMenuInk, alpha: 1 };
const subtitle = classOn('"truncate text-[10px] text-text-muted"');

for (const [theme, palette] of Object.entries(themes)) {
  test(`nested sidebar item text meets WCAG AA on the ${theme} sidebar background`, () => {
    for (const background of ["--color-sidebar", kitSidebarBg]) {
      for (const [what, cls] of [
        ["inactive item label", inactiveItem],
        ["item subtitle", subtitle],
      ] as const) {
        const ratio = contrast(palette[cls.token], cls.alpha, palette[background]);
        assert(
          ratio >= 4.5,
          `${what} (${cls.token} at ${Math.round(cls.alpha * 100)}%) is ${ratio.toFixed(2)}:1 on ` +
            `${background} ${palette[background]} in ${theme}; WCAG 2 AA needs 4.5:1`
        );
      }
    }
  });

  test(`the active row (accent ink on the accent fill) meets WCAG AA in ${theme}`, () => {
    const ratio = contrast(
      palette["--ci-color-accent-foreground"],
      1,
      palette["--ci-color-accent"]
    );
    assert(ratio >= 4.5, `active row is ${ratio.toFixed(2)}:1 in ${theme}`);
  });
}
