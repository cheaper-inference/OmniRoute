import assert from "node:assert/strict";
import test from "node:test";

globalThis.fetch = async () => {
  throw new Error("network access in tests");
};

const { loadManifest } = await import("../../scripts/quality/catalog-drift/manifest.mjs");
const manifestPath = "scripts/quality/catalog-drift/manifest.json";
const manifest = loadManifest(manifestPath);

test("the shipped manifest is valid", () => {
  assert.doesNotThrow(() => loadManifest(manifestPath));
});

test("covers the four November providers and the largest pools", () => {
  const providers = new Set(manifest.probes.map(({ provider }) => provider));
  for (const provider of [
    "mistral",
    "nara",
    "xkiro",
    "llm7",
    "groq",
    "cloudflare-ai",
    "api-airforce",
    "openrouter",
    "bazaarlink",
  ]) {
    assert.ok(providers.has(provider), `Missing probe for ${provider}`);
  }
});

test("has the spec's public JSON assertions", () => {
  for (const provider of ["nara", "onomeo", "kenari", "poixe"]) {
    assert.ok(
      manifest.probes.some((probe) => probe.provider === provider && probe.type === "json-assert"),
      `Missing JSON assertions for ${provider}`
    );
  }
  assert.ok(
    manifest.probes.some((probe) => probe.provider === "logfare" && probe.type === "model-list"),
    "Missing Logfare model list"
  );
});

test("each model-list provider of the scoreboard has exactly one stats probe", () => {
  for (const provider of [
    "openrouter",
    "routeway",
    "bazaarlink",
    "xkiro",
    "nara",
    "llm7",
    "arcee-ai",
  ]) {
    const probes = manifest.probes.filter(
      (probe) =>
        probe.provider === provider &&
        (probe.type === "model-list" ||
          (probe.type === "json-assert" &&
            probe.assertions?.some(({ op }) => op === "includesCatalogIds")))
    );
    assert.equal(probes.length, 1, provider);
  }
});

test("every probe was reviewed after the spec date", () => {
  for (const { id, addedAt } of manifest.probes) assert.ok(addedAt >= "2026-11-18", id);
});
