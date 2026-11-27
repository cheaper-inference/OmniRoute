import assert from "node:assert/strict";
import test from "node:test";

import {
  FREE_MODEL_BUDGETS,
  RETIRED_FREE_ROWS,
  computeFreeModelTotals,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { AI_PROVIDERS } from "@/shared/constants/providers.ts";

/**
 * 2026-07 expansion: providers whose free tier was documented upstream but never
 * mapped here. Each assertion pins a decision that is easy to silently undo.
 */

const byProvider = (id: string) => FREE_MODEL_BUDGETS.filter((m) => m.provider === id);

test("navy is registered as ONE shared pool, never per-model", () => {
  const rows = byProvider("navy");
  assert.equal(rows.length, 1, "navy must stay a single pooled row");

  const [pool] = rows;
  // Upstream free plan: 150K tokens/day => 4.5M/month, drained by a per-model
  // token_multiplier. Summing the ~149 free models would inflate this ~149x —
  // exactly the overcounting we refuse to copy.
  // Re-audit 2026-11-23: api.navy answered 403 to three methods and its public /v1/models
  // publishes no quota, so the pool is retired as unverifiable (owner decision 2026-11-21, PN)
  // and the 4.5M lives in the ledger, still as ONE row.
  assert.equal(pool.monthlyTokens, 0);
  assert.equal(pool.freeType, "discontinued");
  assert.equal(pool.poolKey, "navy-free");
  const ledger = RETIRED_FREE_ROWS.filter((r) => r.provider === "navy");
  assert.deepEqual(
    ledger.map((r) => [r.modelId, r.poolKey, r.lastListedMonthlyTokens, r.reason]),
    [["shared-pool", "navy-free", 4_500_000, "unverifiable"]]
  );
});

test("ovhcloud and aihorde are keyless (no API key required)", () => {
  for (const id of ["ovhcloud", "aihorde"]) {
    const rows = byProvider(id);
    assert.ok(rows.length > 0, `${id} must be in the free catalog`);
    assert.ok(
      rows.every((m) => m.freeType === "keyless"),
      `${id} free access needs no API key, so every row must be keyless`
    );
  }
});

test("providers without a published TOKEN quota never inflate the headline", () => {
  // These have a real free tier capped in REQUESTS (or a queue), not tokens.
  // Registering a guessed token figure is how a catalog starts lying.
  for (const id of ["requesty", "agnes", "glm"]) {
    const rows = byProvider(id);
    assert.ok(rows.length > 0, `${id} must be in the free catalog`);
    assert.ok(
      rows.every((m) => m.monthlyTokens === 0 && m.creditTokens === 0),
      `${id} has no published token quota — it must not carry invented numbers`
    );
    // requesty/openai/gpt-oss-120b left the free list (re-audit 2026-11-23): discontinued.
    assert.ok(
      rows.every((m) => m.freeType === "recurring-uncapped" || m.freeType === "discontinued")
    );
    assert.ok(
      rows.some((m) => m.freeType === "recurring-uncapped"),
      `${id} keeps a live row`
    );
  }

  const totals = computeFreeModelTotals();
  for (const id of ["requesty", "agnes", "glm"]) {
    assert.ok(
      totals.uncappedProviders.includes(id),
      `${id} must still be surfaced as an uncapped provider`
    );
  }
});

test("kilo free models carry the train-on-prompts warning", () => {
  const rows = byProvider("kilo-gateway");
  // 12 since #17028 dropped openrouter/auto-beta, which Kilo prices as variable (-1), not free.
  assert.ok(rows.length >= 12, "kilo catalog should track the live free list");
  // Kilo's public catalog reports mayTrainOnYourPrompts: true on every free
  // model. The privacy cost belongs next to the quota, not hidden.
  assert.ok(
    rows.every((m) => m.trainsOnPrompts === true),
    "every kilo free model must be flagged as training on prompts"
  );
});

test("new providers are routable and canonically registered", () => {
  for (const id of ["navy", "aihorde"]) {
    assert.ok(REGISTRY[id], `${id} must exist in the execution REGISTRY`);
    assert.ok(AI_PROVIDERS[id], `${id} must exist as a canonical provider`);
  }
  // aihorde reaches the volunteer queue with its documented anonymous key.
  assert.equal(REGISTRY.aihorde.anonymousApiKey, "0000000000");
  // The volunteer queue is minutes-slow; the default timeout would abort it.
  assert.equal(REGISTRY.aihorde.timeoutMs, 120_000);
});

test("every catalog provider id resolves to a canonical provider", () => {
  const unknown = [...new Set(FREE_MODEL_BUDGETS.map((m) => m.provider))].filter(
    (id) => !AI_PROVIDERS[id]
  );
  assert.deepEqual(
    unknown,
    [],
    `free catalog references providers that do not exist: ${unknown.join(", ")}`
  );
});
