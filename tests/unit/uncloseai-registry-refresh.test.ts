import test from "node:test";
import assert from "node:assert/strict";

import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";

// Dynamic imports (mirrors tests/unit/deepseek-flash-context-limit-13922.test.ts):
// contextManager pulls in the model-capability/DB chain, which must not run at
// module scope.
const { resolveTokenLimit } = await import("../../open-sse/services/contextManager.ts");
const { enforceOutputTokenBudget } =
  await import("../../open-sse/handlers/chatCore/outputTokenBudget.ts");

/**
 * 2026-10-16: uncloseai (hermes.ai.unturf.com) rotated its roster again —
 * /v1/models serves a single live model and the previously catalogued id
 * (Lorbus/Qwen3.6-27B-int4-AutoRound) started returning 404 "model does not
 * exist" on /v1/chat/completions, so requests routed through the static seed
 * failed while the provider itself was healthy (a real completion against the
 * live id succeeds). The seed is only the offline fallback (live discovery via
 * NAMED_OPENAI_STYLE_PROVIDERS), but the dashboard serves it whenever discovery
 * has not run, so the stale ids must not survive in the registry or the
 * free-model catalog. Same rotation as the 2026-09-15 entry below.
 */
const LIVE_MODEL = "turboderp/Qwen3.8-27B-exl3";
const DEAD_MODELS = [
  "Lorbus/Qwen3.6-27B-int4-AutoRound",
  "adamo1139/Hermes-3-Llama-3.1-8B-FP8-Dynamic",
  "qwen3.6:27b",
  "gemma4:31b",
] as const;

test("uncloseai registry seed contains the live upstream model, not the retired ids", () => {
  const entry = getRegistryEntry("uncloseai");
  assert.ok(entry, "uncloseai must stay registered");

  const ids = (entry.models ?? []).map((m) => m.id);
  assert.ok(ids.includes(LIVE_MODEL), `registry seed must list ${LIVE_MODEL}`);
  for (const dead of DEAD_MODELS) {
    assert.equal(ids.includes(dead), false, `retired id ${dead} must not be seeded`);
  }

  const live = entry.models?.find((m) => m.id === LIVE_MODEL);
  assert.equal(live?.contextLength, 65536, "live max_model_len must be declared");
});

test("uncloseai registry keeps the live discovery contract", () => {
  const entry = getRegistryEntry("uncloseai");
  assert.equal(entry?.modelsUrl, "https://hermes.ai.unturf.com/v1/models");
  assert.equal(entry?.passthroughModels, undefined, "uncloseai is not a passthrough provider");
});

test("free-model catalog carries exactly the live uncloseai row", () => {
  const rows = FREE_MODEL_BUDGETS.filter((row) => row.provider === "uncloseai");
  assert.equal(rows.length, 1, "catalog must have a single uncloseai row");
  assert.equal(rows[0].modelId, LIVE_MODEL);
  assert.equal(rows[0].freeType, "keyless");
  assert.equal(rows[0].monthlyTokens, 0);

  for (const dead of DEAD_MODELS) {
    const stillListed = FREE_MODEL_BUDGETS.some(
      (row) => row.provider === "uncloseai" && row.modelId === dead
    );
    assert.equal(stillListed, false, `retired id ${dead} must not remain in the free catalog`);
  }
});

/**
 * The rotating roster must not take the context window down with it.
 *
 * resolveTokenLimit() step 3 (provider-registry `defaultContextLength`) is the
 * source that survives a rotation: the pinned `models[]` id goes stale every few
 * weeks, and a freshly rotated id is absent from the registry *and* from any
 * synced discovery row, so with no provider-level window it falls through to the
 * generic 128000 catch-all. enforceOutputTokenBudget() then derives available
 * output from 128000, which overstates the real 65536 window, and the vLLM
 * upstream rejects the request — observed live: "This model's maximum context
 * length is 65536 tokens ... you requested 65537" (33537 input + 32000 max_tokens).
 * Per-model discovery (max_model_len → auto:discovery override) still wins when a
 * sync has run; this is the floor that works with no discovery at all.
 */
test("uncloseai declares a provider-level window that survives a roster rotation", () => {
  assert.equal(getRegistryEntry("uncloseai")?.defaultContextLength, 65536);
});

test("any uncloseai model id — rotated or not yet seen — resolves to the 65536 window", () => {
  for (const id of [LIVE_MODEL, ...DEAD_MODELS, "some/future-model-not-in-registry"]) {
    const resolved = resolveTokenLimit("uncloseai", id);
    assert.equal(resolved.limit, 65536, `${id} must resolve to the real window`);
    assert.equal(resolved.specific, true, `${id} must not fall through to the generic default`);
  }
});

test("the observed overflow (33537 input + 32000 max_tokens) is clamped to fit 65536", () => {
  const input = 33537;
  // The retired id, not the live one: the live id still resolves through its own
  // `models[]` contextLength, so only a rotated id reaches the provider-level
  // window — the exact request that 400'd upstream.
  const rotatedId = DEAD_MODELS[0];
  const budget = enforceOutputTokenBudget(
    { max_tokens: 32000 },
    input,
    resolveTokenLimit("uncloseai", rotatedId).limit
  );
  assert.equal(budget.ok, true);
  if (budget.ok !== true) return;
  const maxTokens = (budget.body as Record<string, unknown>).max_tokens as number;
  assert.equal(maxTokens, 65536 - input);
  assert.ok(input + maxTokens <= 65536, "prompt + completion must fit the window");
});
