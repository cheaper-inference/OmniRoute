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
// the theme tokens in src/app/globals.css and the Tailwind classes in Sidebar.tsx, so the contract
// is checked on every unit run instead of only in the Playwright lane.

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

function tokens(block: string): Record<string, string> {
  // globals.css opens more than one `:root {` block; take the first one that defines the sidebar.
  let from = 0;
  while (from < globals.length) {
    const start = globals.indexOf(block, from);
    assert(start >= 0, `no "${block}" block in globals.css defines --color-sidebar`);
    const body = globals.slice(start, globals.indexOf("\n}", start));
    const out: Record<string, string> = {};
    for (const match of body.matchAll(
      /--color-(sidebar|text-main|text-muted):\s*(#[0-9a-fA-F]{6})/g
    )) {
      out[`--color-${match[1]}`] = match[2].toLowerCase();
    }
    if (out["--color-sidebar"]) {
      for (const name of ["--color-text-main", "--color-text-muted"]) {
        assert(out[name], `${block} block in globals.css does not define ${name}`);
      }
      return out;
    }
    from = start + block.length;
  }
  assert.fail(`no "${block}" block in globals.css defines --color-sidebar`);
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

const themes = { light: tokens(":root {"), dark: tokens(".dark {") };
const inactiveItem = classOn("hover:bg-surface/50 hover:text-text-main");
const subtitle = classOn("{item.subtitle}</span>");

for (const [theme, palette] of Object.entries(themes)) {
  test(`nested sidebar item text meets WCAG AA on the ${theme} sidebar background`, () => {
    for (const [what, cls] of [
      ["inactive item label", inactiveItem],
      ["item subtitle", subtitle],
    ] as const) {
      const ratio = contrast(palette[cls.token], cls.alpha, palette["--color-sidebar"]);
      assert(
        ratio >= 4.5,
        `${what} (${cls.token} at ${Math.round(cls.alpha * 100)}%) is ${ratio.toFixed(2)}:1 on ` +
          `${palette["--color-sidebar"]} in ${theme}; WCAG 2 AA needs 4.5:1`
      );
    }
  });
}
