// Grok Build's /v1/models advertises every model with `context_window: 256000`
// plus a `context_windows` tier list. The largest tier is the real usable window
// (live 2026-10-23: all four models report [256000, 500000]). Only ids pinned in
// the registry escaped the 256k floor, so any model the registry does not know —
// grok-4.7-build-fast today — imported with half its capacity.
import test from "node:test";
import assert from "node:assert/strict";

const { PROVIDER_MODELS_CONFIG } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts");
const { grok_cliProvider } =
  await import("../../open-sse/config/providers/registry/grok-cli/index.ts");

/** The registry's own pin for an id, so a registry update does not fail this test. */
function registryContextLength(id: string): number {
  const entry = grok_cliProvider.models.find((model: { id: string }) => model.id === id);
  assert.ok(entry?.contextLength, `registry must pin ${id}`);
  return entry.contextLength;
}

function parseGrok(models: unknown[]) {
  return PROVIDER_MODELS_CONFIG["grok-cli"].parseResponse({ data: models });
}

test("grok build discovery takes the largest advertised context window tier", () => {
  const [model] = parseGrok([
    {
      id: "grok-4.7-build-fast",
      model: "grok-4.7-build-fast",
      api_backend: "responses",
      context_window: 256000,
      context_windows: [256000, 500000],
    },
  ]);

  assert.equal(model.id, "grok-4.7-build-fast");
  assert.equal(model.inputTokenLimit, 500000);
});

test("a single advertised window still applies when no tier list is present", () => {
  const [model] = parseGrok([
    {
      id: "unlisted-grok-model",
      model: "unlisted-grok-model",
      api_backend: "responses",
      context_window: 300000,
    },
  ]);

  assert.equal(model.inputTokenLimit, 300000);
});

test("registry pins still win over the advertised tier list", () => {
  // grok-4.6 is pinned at 500000 in the registry; a narrower upstream tier list
  // must not lower it, and a wider one must not raise it either.
  const pinned = registryContextLength("grok-4.6");
  const [narrow] = parseGrok([
    {
      id: "grok-4.6",
      model: "grok-4.6",
      api_backend: "responses",
      context_window: 256000,
      context_windows: [128000, 300000],
    },
  ]);
  assert.equal(narrow.inputTokenLimit, pinned);

  const [wide] = parseGrok([
    {
      id: "grok-4.6",
      model: "grok-4.6",
      api_backend: "responses",
      context_window: 256000,
      context_windows: [256000, 1000000],
    },
  ]);
  assert.equal(wide.inputTokenLimit, pinned);
});

test("a malformed tier list falls back to the single advertised window", () => {
  const [model] = parseGrok([
    {
      id: "weird-grok-model",
      model: "weird-grok-model",
      api_backend: "responses",
      context_window: 256000,
      context_windows: ["256000", null, -1, 0],
    },
  ]);

  assert.equal(model.inputTokenLimit, 256000);
});

test("tiers carried on _meta are read too", () => {
  const [model] = parseGrok([
    {
      id: "meta-only-grok",
      model: "meta-only-grok",
      api_backend: "responses",
      context_window: 256000,
      _meta: { context_windows: [256000, 500000] },
    },
  ]);

  assert.equal(model.inputTokenLimit, 500000);
});

test("a larger scalar beats a smaller tier list", () => {
  const [model] = parseGrok([
    {
      id: "scalar-grok",
      model: "scalar-grok",
      api_backend: "responses",
      context_window: 400000,
      context_windows: [256000, 300000],
    },
  ]);

  assert.equal(model.inputTokenLimit, 400000);
});

test("an inflated tier list cannot promise more than the backend serves", () => {
  const [model] = parseGrok([
    {
      id: "inflated-grok",
      model: "inflated-grok",
      api_backend: "responses",
      context_window: 256000,
      context_windows: [256000, 2000000],
    },
  ]);

  assert.equal(model.inputTokenLimit, 500000);
});
