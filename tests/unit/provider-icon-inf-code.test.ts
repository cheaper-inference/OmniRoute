import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const providerIconSource = await readFile(
  new URL("../../src/shared/components/ProviderIcon.tsx", import.meta.url),
  "utf8"
);

test("inf-code is registered in ProviderIcon KNOWN_SVGS so the local SVG wins (Tier 3)", () => {
  const knownSvgs = providerIconSource.match(/const KNOWN_SVGS = new Set\(\[([\s\S]*?)\]\);/);
  assert.ok(knownSvgs, "expected ProviderIcon KNOWN_SVGS declaration");
  assert.match(knownSvgs[1], /["']inf-code["']/);
});

test("inf-code is NOT pinned to the generic-icon provenance guard", () => {
  const generic = providerIconSource.match(
    /const GENERIC_PROVIDER_IDS = new Set\(\[([\s\S]*?)\]\);/
  );
  assert.ok(generic, "expected ProviderIcon GENERIC_PROVIDER_IDS declaration");
  assert.doesNotMatch(generic[1], /["']inf-code["']/);
});

test("inf-code.svg asset exists in public/providers", () => {
  assert.ok(
    existsSync(join(root, "public/providers/inf-code.svg")),
    "public/providers/inf-code.svg must ship with the bundle"
  );
});

test("inf-code.svg preserves the official Token Infinity logo geometry (four gradient paths)", async () => {
  const svg = await readFile(join(root, "public/providers/inf-code.svg"), "utf8");
  // The official mark (from tokensinfinity.com/infcode-logo-text.svg) is four
  // parallelogram paths with the brand blue (#001FFC) centre and blue→magenta
  // gradient wings, laid into a square 24×24 viewBox.
  const paths = [...svg.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(paths.length, 4, "expected the four official logo paths to be preserved");
  assert.match(svg, /viewBox="0 0 24 24"/);
  assert.match(svg, /#001FFC/);
  // Provenance guard: no external href / script / use that would fetch at render.
  assert.doesNotMatch(svg, /<script|<use\s+href|<image\s+href/i);
});
