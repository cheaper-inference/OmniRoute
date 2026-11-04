import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

// Warning text (badge, warning button, `text-warning`) must reach WCAG AA (4.5:1) in the default
// light Editions palette. The kit's light Editions warning #99631f does not on its own tinted
// background, so globals.css swaps in --color-warning-ink. Colours are read from the CSS files,
// so a kit sync or a palette edit that breaks contrast fails here.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const globals = fs.readFileSync(path.join(root, "src/app/globals.css"), "utf8");
const editions = fs.readFileSync(path.join(root, "packages/ui-kit/src/ci-editions.css"), "utf8");

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// The first declaration in ci-editions.css is the light block; the dark block comes later.
function editionsLight(token: string): string {
  const m = new RegExp(`--${token}:\\s*(#[0-9a-fA-F]{6})`).exec(editions);
  assert.ok(m, `ci-editions.css declares --${token}`);
  return m[1].toLowerCase();
}

function lightEditionsInk(): string {
  const m =
    /html:root\[data-ci-appearance="editions"\]:not\(\[data-theme="dark"\]\)\s*\{[^}]*--color-warning-ink:\s*(#[0-9a-fA-F]{6})/.exec(
      globals
    );
  assert.ok(m, "globals.css sets --color-warning-ink for light Editions");
  return m[1].toLowerCase();
}

test("light Editions warning ink reaches AA on every surface it is drawn on", () => {
  const ink = lightEditionsInk();
  const surfaces = {
    "warning background": editionsLight("ci-color-warning-bg"),
    canvas: editionsLight("ci-color-background"),
    surface: editionsLight("ci-color-surface"),
  };
  for (const [name, bg] of Object.entries(surfaces)) {
    const ratio = contrast(ink, bg);
    assert.ok(ratio >= 4.5, `${ink} on ${name} ${bg} is ${ratio.toFixed(2)}:1, below 4.5:1`);
  }
});

test("the kit's own light Editions warning still needs the override", () => {
  // If upstream fixes its warning colour, this fails: drop the override in globals.css then.
  const kit = editionsLight("ci-color-warning");
  assert.ok(contrast(kit, editionsLight("ci-color-warning-bg")) < 4.5);
});

test("warning badge, warning button and text-warning read the warning ink", () => {
  assert.match(globals, /:root\s*\{\s*--color-warning-ink:\s*var\(--ci-color-warning\);/);
  assert.match(globals, /--text-color-warning:\s*var\(--color-warning-ink\);/);
  assert.match(
    globals,
    /\.ci-badge\[data-tone="warning"\]\s*\{\s*color:\s*var\(--color-warning-ink\);/
  );
  assert.match(globals, /\.ci-button--warning\s*\{\s*color:\s*var\(--color-warning-ink\);/);
});
