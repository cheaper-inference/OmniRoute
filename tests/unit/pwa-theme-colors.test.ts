import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// KEA-7886 P9: the PWA metadata (viewport theme-color + web manifest) carried the pre-kit
// #0b0f1a. They now use the kit page background: neutral-25 (light) / neutral-950 (dark).

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

test("PWA_THEME_COLORS are the kit background hex for light and dark", async () => {
  const { PWA_THEME_COLORS } = await import("../../src/shared/constants/pwaThemeColors.ts");
  assert.deepEqual({ ...PWA_THEME_COLORS }, { light: "#fbfbf8", dark: "#040d10" });

  // …and those are what --ci-color-background resolves to in the kit CSS.
  const kit = read("packages/ui-kit/src/ci-tokens.css");
  assert.match(kit, /--ci-neutral-25:\s*#fbfbf8;/);
  assert.match(kit, /--ci-neutral-950:\s*#040d10;/);
  assert.match(kit, /--ci-color-background:\s*var\(--ci-neutral-25\);/);
  const dark = kit.slice(kit.indexOf(':root[data-theme="dark"]'));
  assert.match(dark, /--ci-color-background:\s*var\(--ci-neutral-950\);/);
});

test("the web manifest uses the kit background, not the pre-kit #0b0f1a", async () => {
  const { default: manifest } = await import("../../src/app/manifest.ts");
  const m = manifest();
  assert.equal(m.background_color, "#fbfbf8");
  assert.equal(m.theme_color, "#fbfbf8");
});

test("viewport.themeColor has one kit colour per prefers-color-scheme", () => {
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
