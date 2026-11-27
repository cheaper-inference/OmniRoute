/**
 * #8717 — Cloudflare Workers AI free catalog must not advertise dead model IDs.
 *
 * Four of the original six free-catalog entries return 400/403/410 from
 * Workers AI (`No such model`, deprecated, or forbidden). #8763 added live
 * replacements but left the dead IDs in place — free-model routing / combo
 * builders still pick them and burn quota on guaranteed failures.
 *
 * Regression: dead IDs absent from FREE_MODEL_BUDGETS + cloudflare-ai registry;
 * live replacements present; the Neurons/day budget sits on exactly one live
 * entry (poolKey cloudflare-ai dedupes by max). Re-audit 2026-11-23
 * (developers.cloudflare.com/workers-ai/platform/pricing/): 10,000 Neurons/day priced on
 * @cf/zai-org/glm-4.7-flash ⇒ 22.7M tokens/month; kimi-k2.6 needs a paid billing method and is
 * kept as discontinued.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { cloudflare_aiProvider } from "../../open-sse/config/providers/registry/cloudflare-ai/index.ts";

const DEAD_CLOUDFLARE_MODEL_IDS = [
  "@cf/meta/llama-3.3-70b-instruct",
  "@cf/meta/llama-3.1-8b-instruct",
  "@cf/google/gemma-3-12b-it",
  "@cf/qwen/qwen2.5-coder-15b-instruct",
] as const;

// Retired on 2026-11-20, requests return HTTP 410 (#21007):
// https://developers.cloudflare.com/changelog/post/2026-11-05-planned-model-deprecations/
// They leave the registry; their free rows stay as discontinued, as retired rows do.
const RETIRED_2026_11_20_MODEL_IDS = [
  "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
  "@cf/meta/llama-3.2-3b-instruct",
  "@cf/qwen/qwq-32b",
  "@cf/moonshotai/kimi-k2.6",
] as const;

const LIVE_CLOUDFLARE_MODEL_IDS = [
  "@cf/mistral/mistral-7b-instruct-v0.2-lora",
  "@cf/qwen/qwen2.5-coder-32b-instruct",
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/zai-org/glm-4.7-flash",
  "@cf/google/gemma-4-26b-a4b-it",
] as const;

function cloudflareCatalogIds(): string[] {
  return FREE_MODEL_BUDGETS.filter((m) => m.provider === "cloudflare-ai").map((m) => m.modelId);
}

function cloudflareRegistryIds(): string[] {
  assert.equal(cloudflare_aiProvider.id, "cloudflare-ai");
  return (cloudflare_aiProvider.models ?? []).map((m) => m.id);
}

test("#8717: FREE_MODEL_BUDGETS must not list dead Cloudflare Workers AI model IDs", () => {
  const ids = cloudflareCatalogIds();
  for (const dead of DEAD_CLOUDFLARE_MODEL_IDS) {
    assert.equal(
      ids.includes(dead),
      false,
      `dead model ${dead} must be removed from freeModelCatalog (still present)`
    );
  }
});

test("#21007: models retired on 2026-11-20 leave the registry and stay in the free catalog only as discontinued", () => {
  const registry = cloudflareRegistryIds();
  const rows = FREE_MODEL_BUDGETS.filter((m) => m.provider === "cloudflare-ai");
  for (const retired of RETIRED_2026_11_20_MODEL_IDS) {
    assert.equal(
      registry.includes(retired),
      false,
      `${retired} must be removed from the cloudflare-ai registry`
    );
    assert.deepEqual(
      rows.filter((m) => m.modelId === retired).map((m) => [m.freeType, m.monthlyTokens]),
      [["discontinued", 0]],
      `${retired} must stay in freeModelCatalog as discontinued`
    );
  }
});

test("#8717: FREE_MODEL_BUDGETS must list live Cloudflare Workers AI replacements", () => {
  const ids = cloudflareCatalogIds();
  for (const live of LIVE_CLOUDFLARE_MODEL_IDS) {
    assert.ok(ids.includes(live), `live model ${live} missing from freeModelCatalog`);
  }
});

test("#8717: cloudflare-ai registry must not list dead model IDs", () => {
  const ids = cloudflareRegistryIds();
  for (const dead of DEAD_CLOUDFLARE_MODEL_IDS) {
    assert.equal(
      ids.includes(dead),
      false,
      `dead model ${dead} must be removed from cloudflare-ai registry (still present)`
    );
  }
});

test("#8717: cloudflare-ai registry must list live replacements", () => {
  const ids = cloudflareRegistryIds();
  for (const live of LIVE_CLOUDFLARE_MODEL_IDS) {
    assert.ok(ids.includes(live), `live model ${live} missing from cloudflare-ai registry`);
  }
});

test("#8717: the Neurons/day budget sits on one live entry, GLM 4.7 Flash (re-audit 2026-11-23)", () => {
  const glm = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "cloudflare-ai" && m.modelId === "@cf/zai-org/glm-4.7-flash"
  );
  assert.ok(glm, "glm-4.7-flash entry must exist");
  assert.equal(
    glm.monthlyTokens,
    22_700_000,
    "10,000 Neurons/day at glm-4.7-flash prices (~22.7M tok/mo) must sit on this entry"
  );

  // No other cloudflare-ai catalog row may claim a budget (poolKey dedupes by max, but
  // advertising it on a second id was the original bug surface).
  const withBudget = FREE_MODEL_BUDGETS.filter(
    (m) => m.provider === "cloudflare-ai" && m.monthlyTokens > 0
  );
  assert.equal(withBudget.length, 1);
  assert.equal(withBudget[0].modelId, "@cf/zai-org/glm-4.7-flash");
  const kimi = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "cloudflare-ai" && m.modelId === "@cf/moonshotai/kimi-k2.6"
  );
  assert.equal(kimi?.freeType, "discontinued", "kimi-k2.6 requires a paid billing method");
});
