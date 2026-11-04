import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// KEA-7886 P9: the PWA metadata (viewport theme-color + web manifest) carried the pre-kit
// #0b0f1a, then the Classic kit background. They now follow the default palette, Editions:
// --ci-color-background of packages/ui-kit/src/ci-editions.css in light and in dark.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

/** One declaration of a block of ci-editions.css, by the block's first selector line. */
function editionsDecl(blockStart: string, token: string): string {
  const css = read("packages/ui-kit/src/ci-editions.css");
  const start = css.indexOf(blockStart);
  assert.ok(start >= 0, `ci-editions.css has a block starting with ${blockStart}`);
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("\n}", start));
  const m = new RegExp(`${token}:\\s*([^;]+);`).exec(body);
  assert.ok(m, `${token} is declared in that block`);
  return m[1].trim();
}

const LIGHT_BLOCK = ':is(html:root:has([data-ci-appearance="editions"])';
const DARK_BLOCK = ':is(html:root[data-theme="dark"]:has([data-ci-appearance="editions"])';

test("PWA_THEME_COLORS are the Editions background hex for light and dark", async () => {
  const { PWA_THEME_COLORS, EDITIONS_PAGE_BACKGROUND } =
    await import("../../src/shared/constants/pwaThemeColors.ts");
  assert.deepEqual({ ...PWA_THEME_COLORS }, { light: "#f3f1e9", dark: "#11120f" });
  assert.equal(PWA_THEME_COLORS, EDITIONS_PAGE_BACKGROUND, "one mirror, no second copy");

  // …and those are what --ci-color-background holds in the kit's Editions blocks.
  assert.equal(editionsDecl(LIGHT_BLOCK, "--ci-color-background"), PWA_THEME_COLORS.light);
  assert.equal(editionsDecl(DARK_BLOCK, "--ci-color-background"), PWA_THEME_COLORS.dark);
  // The kit's own canvas alias agrees, so the browser chrome matches the painted page.
  assert.equal(editionsDecl(LIGHT_BLOCK, "--ci-color-canvas"), PWA_THEME_COLORS.light);
});

test("the Editions mirror is not the Classic kit background it replaced", async () => {
  const { PWA_THEME_COLORS } = await import("../../src/shared/constants/pwaThemeColors.ts");
  const { ciTokens } = await import("../../packages/ui-kit/src/tokens.ts");
  assert.notEqual(PWA_THEME_COLORS.light, ciTokens.color.neutral[25]);
  assert.notEqual(PWA_THEME_COLORS.dark, ciTokens.color.neutral[950]);
  const kit = read("packages/ui-kit/src/ci-tokens.css");
  assert.match(kit, /--ci-color-background:\s*var\(--ci-neutral-25\);/);
});

test("the web manifest uses the Editions background, not the pre-kit #0b0f1a", async () => {
  const { default: manifest } = await import("../../src/app/manifest.ts");
  const m = manifest();
  assert.equal(m.background_color, "#f3f1e9");
  assert.equal(m.theme_color, "#f3f1e9");
});

test("viewport.themeColor has one Editions colour per prefers-color-scheme", () => {
  const layout = read("src/app/layout.tsx");
  assert.doesNotMatch(layout, /#0b0f1a/i);
  assert.match(
    layout,
    /\{ media: "\(prefers-color-scheme: light\)", color: PWA_THEME_COLORS\.light \}/
  );
  assert.match(
    layout,
    /\{ media: "\(prefers-color-scheme: dark\)", color: PWA_THEME_COLORS\.dark \}/
  );
  assert.doesNotMatch(read("src/app/manifest.ts"), /#0b0f1a/i);
});
