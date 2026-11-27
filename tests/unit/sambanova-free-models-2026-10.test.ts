import test from "node:test";
import assert from "node:assert/strict";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../open-sse/config/providers/shared.ts";

// Source: https://docs.sambanova.ai/docs/en/models/rate-limits (reopened 2026-11-23). The Free Tier table lists
// gpt-oss-120b and gemma-4-31B-it (20 RPM · 20 RPD · 200000 TPD). DeepSeek-V3.1 and DeepSeek-V3.2 (11/3/2026)
// and Meta-Llama-3.3-70B-Instruct (11/17/2026) left it per https://docs.sambanova.ai/docs/en/models/deprecations
// and stay in the catalog as discontinued. MiniMax-M2.7 is only in the Developer table and
// Llama-4-Maverick is not on the page.
const sambanova = FREE_MODEL_BUDGETS.filter((m) => m.provider === "sambanova");
const free = new Set(sambanova.filter((m) => m.freeType !== "discontinued").map((m) => m.modelId));
const registry = new Set(CHAT_OPENAI_COMPAT_MODELS.sambanova.map((m) => m.id));

test("SambaNova free catalog lists the models of its Free Tier table", () => {
  assert.deepEqual([...free].sort(), ["gemma-4-31B-it", "gpt-oss-120b"]);
  for (const id of free) assert.ok(registry.has(id), `${id} must be routable`);
});

test("SambaNova ids retired from the Free Tier table stay as discontinued with no quota", () => {
  for (const id of ["DeepSeek-V3.1", "DeepSeek-V3.2", "Meta-Llama-3.3-70B-Instruct"]) {
    const row = sambanova.find((m) => m.modelId === id);
    assert.equal(row?.freeType, "discontinued", id);
    assert.equal(row?.monthlyTokens, 0, id);
  }
});

test("SambaNova free catalog excludes models its page does not give to the Free Tier", () => {
  for (const id of ["MiniMax-M2.7", "Llama-4-Maverick-17B-128E-Instruct"]) {
    assert.ok(!free.has(id), `${id} must not be listed as free`);
  }
});
