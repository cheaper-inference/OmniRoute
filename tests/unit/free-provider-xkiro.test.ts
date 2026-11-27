import assert from "node:assert/strict";
import test from "node:test";

import {
  FREE_MODEL_BUDGETS,
  computeFreeModelTotals,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { AI_PROVIDERS, AGGREGATOR_PROVIDER_IDS } from "@/shared/constants/providers.ts";

// https://api.xkiro.com/v1/models and https://xkiro.com/ (2026-11-27): 38 free chat models
// share 500K tokens/day. https://docs.xkiro.com/api/rate-limits/ and /api/usage/ document
// HTTP 429 until reset and no wallet charge when the free allowance is exhausted.
const rows = FREE_MODEL_BUDGETS.filter((m) => m.provider === "xkiro");

test("xkiro is routable, canonical and classified as an aggregator", () => {
  assert.ok(REGISTRY.xkiro, "REGISTRY entry");
  assert.equal(REGISTRY.xkiro.format, "openai");
  assert.equal(REGISTRY.xkiro.baseUrl, "https://api.xkiro.com/v1/chat/completions");
  assert.ok(AI_PROVIDERS.xkiro, "canonical provider");
  assert.equal(AI_PROVIDERS.xkiro.hasFree, true);
  assert.ok(AGGREGATOR_PROVIDER_IDS.has("xkiro"));
});

test("xkiro free plan is one 500K/day account-wide pool = 15M/month, counted once", () => {
  assert.equal(rows.length, 59);
  const live = rows.filter((m) => m.freeType !== "discontinued");
  const retired = rows.filter((m) => m.freeType === "discontinued");
  assert.equal(live.length, 38);
  assert.equal(retired.length, 21);
  for (const m of rows) {
    assert.equal(m.poolKey, "xkiro-free", m.modelId);
    assert.equal(m.tos, "caution", m.modelId);
    assert.equal(m.hardStopGuaranteed, true, m.modelId);
    assert.equal((m as { eligibilityGate?: unknown }).eligibilityGate, undefined, m.modelId);
  }
  for (const m of live) {
    assert.equal(m.monthlyTokens, 15_000_000, m.modelId);
    assert.equal(m.freeType, "recurring-daily", m.modelId);
  }
  for (const m of retired) assert.equal(m.monthlyTokens, 0, m.modelId);
  const withXkiro = computeFreeModelTotals().steadyRecurringTokens;
  const without = computeFreeModelTotals({
    entries: FREE_MODEL_BUDGETS.filter((m) => m.provider !== "xkiro"),
  }).steadyRecurringTokens;
  assert.equal(withXkiro - without, 15_000_000);
});

test("xkiro never lists the undeclared-provenance codex-spark route", () => {
  assert.ok(!rows.some((m) => /codex-spark/i.test(m.modelId)));
  assert.ok(!REGISTRY.xkiro.models.some((m) => /codex-spark/i.test(m.id)));
});

test("every xkiro catalog row is a pinned registry model", () => {
  assert.equal(REGISTRY.xkiro.models.length, rows.length);
  const pinned = new Set(REGISTRY.xkiro.models.map((m) => m.id));
  for (const r of rows) assert.ok(pinned.has(r.modelId), r.modelId);
});
