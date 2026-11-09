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

/** One declaration of a block of ci-tokens.css (the Classic base), following var() to the hex. */
function classicDecl(blockStart: string, token: string): string {
  const css = read("packages/ui-kit/src/ci-tokens.css");
  const declIn = (from: string, name: string) => {
    const start = css.indexOf(from);
    assert.ok(start >= 0, `ci-tokens.css has a block starting with ${from}`);
    const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("\n}", start));
    const m = new RegExp(`${name}:\\s*([^;]+);`).exec(body);
    assert.ok(m, `${name} is declared in the block starting with ${from}`);
    return m[1].trim();
  };
  let value = declIn(blockStart, token);
  for (let hops = 0; hops < 4; hops++) {
    const ref = /^var\((--ci-[a-z0-9-]+)\)$/.exec(value);
    if (!ref) break;
    // Scale tokens (--ci-neutral-*) live only in the base block.
    value = declIn(CLASSIC_LIGHT_BLOCK, ref[1]);
  }
  return value;
}

const CLASSIC_LIGHT_BLOCK = ":root,\n.ci-theme {";
const CLASSIC_DARK_BLOCK = ':root[data-theme="dark"],\n.ci-theme[data-theme="dark"]';

test("CLASSIC_PAGE_BACKGROUND is the kit's base (Classic) background for light and dark", async () => {
  const { CLASSIC_PAGE_BACKGROUND } = await import("../../src/shared/constants/pwaThemeColors.ts");
  const { ciTokens } = await import("../../packages/ui-kit/src/tokens.ts");
  // Pinned to the kit's CSS: --ci-color-background in the base block and the dark block…
  assert.equal(
    classicDecl(CLASSIC_LIGHT_BLOCK, "--ci-color-background"),
    CLASSIC_PAGE_BACKGROUND.light
  );
  assert.equal(
    classicDecl(CLASSIC_DARK_BLOCK, "--ci-color-background"),
    CLASSIC_PAGE_BACKGROUND.dark
  );
  // …and read from the kit's token export, not retyped.
  assert.equal(CLASSIC_PAGE_BACKGROUND.light, ciTokens.color.neutral[25]);
  assert.equal(CLASSIC_PAGE_BACKGROUND.dark, ciTokens.color.neutral[950]);
  assert.doesNotMatch(read("src/shared/constants/pwaThemeColors.ts"), /#fbfbf8|#040d10/i);
});

test("PAGE_BACKGROUND_BY_PALETTE maps every palette to its kit background", async () => {
  const { PAGE_BACKGROUND_BY_PALETTE, EDITIONS_PAGE_BACKGROUND, CLASSIC_PAGE_BACKGROUND } =
    await import("../../src/shared/constants/pwaThemeColors.ts");
  const { APPEARANCE_PALETTES } = await import("../../src/shared/constants/appearancePalette.ts");
  assert.deepEqual(Object.keys(PAGE_BACKGROUND_BY_PALETTE).sort(), [...APPEARANCE_PALETTES].sort());
  assert.equal(PAGE_BACKGROUND_BY_PALETTE.editions, EDITIONS_PAGE_BACKGROUND);
  assert.equal(PAGE_BACKGROUND_BY_PALETTE.classic, CLASSIC_PAGE_BACKGROUND);
  assert.notEqual(CLASSIC_PAGE_BACKGROUND.light, EDITIONS_PAGE_BACKGROUND.light);
  assert.notEqual(CLASSIC_PAGE_BACKGROUND.dark, EDITIONS_PAGE_BACKGROUND.dark);
});

test("resolveThemeColor: palette × theme × meta media → the right kit background", async () => {
  const { resolveThemeColor } = await import("../../src/shared/utils/themeColorMeta.ts");
  const { EDITIONS_PAGE_BACKGROUND: E, CLASSIC_PAGE_BACKGROUND: C } =
    await import("../../src/shared/constants/pwaThemeColors.ts");
  const LIGHT = "(prefers-color-scheme: light)";
  const DARK = "(prefers-color-scheme: dark)";
  for (const [palette, bg] of [
    ["editions", E],
    ["classic", C],
  ] as const) {
    for (const systemDark of [false, true]) {
      // An explicit theme wins over every media variant (the page is painted in that mode).
      for (const media of [LIGHT, DARK, null]) {
        assert.equal(resolveThemeColor({ palette, theme: "light", media, systemDark }), bg.light);
        assert.equal(resolveThemeColor({ palette, theme: "dark", media, systemDark }), bg.dark);
      }
      // "system" keeps each media variant on its own scheme, so the OS flip still works natively.
      assert.equal(
        resolveThemeColor({ palette, theme: "system", media: LIGHT, systemDark }),
        bg.light
      );
      assert.equal(
        resolveThemeColor({ palette, theme: "system", media: DARK, systemDark }),
        bg.dark
      );
      assert.equal(
        resolveThemeColor({ palette, theme: "system", media: null, systemDark }),
        systemDark ? bg.dark : bg.light
      );
    }
  }
  // Unknown palette → Editions; unknown theme → light (same rule as applyTheme()).
  assert.equal(
    resolveThemeColor({ palette: "violet", theme: "dark", media: null, systemDark: false }),
    E.dark
  );
  assert.equal(
    resolveThemeColor({ palette: "classic", theme: "foo", media: DARK, systemDark: true }),
    C.light
  );
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
