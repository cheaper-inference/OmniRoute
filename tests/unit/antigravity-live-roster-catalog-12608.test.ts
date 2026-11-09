/**
 * #12608 — the Antigravity/AGY catalog refresh must follow what `:fetchAvailableModels`
 * really serves, not what we assume it stopped serving.
 *
 * Contract source (hermetic stand-in for a live call): the 18-model roster an Antigravity
 * account imported in discussion #15568 (screenshot "Available Models", 2026-10), served in
 * the `{ models: { "<id>": { displayName } } }` shape the discovery normalizer parses
 * (open-sse/config/antigravityUpstream.ts → :fetchAvailableModels). That roster still lists
 * the shared `-tiered` Flash ids (3.6, 3.7, 3.8) and `gemini-3-flash`, and no
 * `gemini-3.7-flash-high|medium|low`. A mocked roster proves the code matches THIS shape; it
 * cannot prove Google still answers that way.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agy-live-roster-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const antigravityVersion = await import("../../open-sse/services/antigravityVersion.ts");
const { isDiscoverableAgyModelId, isUserVisibleAgyQuotaModelId } =
  await import("../../open-sse/config/agyModels.ts");
const { isDiscoverableAntigravityModelId, isUserVisibleAntigravityQuotaModelId } =
  await import("../../open-sse/config/antigravityModelAliases.ts");
const { isUsageQuotaKeyAllowed, normalizeUsageQuotaKey } =
  await import("../../src/lib/usage/providerLimits/quotaNormalize.ts");
const { DEFAULT_PRICING_OAUTH } =
  await import("../../src/shared/constants/pricing/oauth-subscriptions.ts");

const originalFetch = globalThis.fetch;

// Ids from the #15568 screenshot (every row shown there is a model the upstream returned).
const LIVE_ROSTER_IDS = [
  "claude-sonnet-4-6",
  "gemini-3.7-flash-tiered",
  "gemini-3.1-flash-lite",
  "gemini-3.6-flash-tiered",
  "gemini-3.1-pro-low",
  "gemini-3.8-flash-tiered",
  "claude-opus-4-6-thinking",
  "gemini-3-flash",
  "gemini-pro-agent",
  "gpt-oss-120b-medium",
  "gemini-3.5-flash-lite",
  "gemini-3.1-pro-high",
  "claude-opus-5-5-low",
  "claude-sonnet-5-5-medium",
  "claude-sonnet-5-5-high",
  "claude-sonnet-5-5-low",
  "claude-opus-5-5-medium",
  "claude-opus-5-5-high",
] as const;

// Served-and-observed ids the refresh must NOT hide (the PR retired these three).
const LIVE_FLASH_IDS_THAT_MUST_STAY = [
  "gemini-3.7-flash-tiered",
  "gemini-3.6-flash-tiered",
  "gemini-3-flash",
  "gemini-3.8-flash-tiered",
] as const;

// Absent from the captured roster AND already retired/non-chat: must stay hidden.
const STALE_IDS_THAT_STAY_HIDDEN = [
  "gemini-3.7-flash-high",
  "gemini-3.7-flash-medium",
  "gemini-3.7-flash-low",
  "gemini-3.6-flash-high",
  "gemini-3.5-flash-high",
  "gemini-2.5-flash",
  "gemini-2.5-computer-use-preview-10-2025",
  "gemini-3.1-flash-image",
  "gemini-3.1-flash-tts-preview",
] as const;

function liveFetchStub() {
  const models: Record<string, { displayName: string }> = {};
  for (const id of [...LIVE_ROSTER_IDS, ...STALE_IDS_THAT_STAY_HIDDEN]) {
    models[id] = { displayName: `upstream:${id}` };
  }
  return async (url: string | URL | Request) => {
    if (String(url).includes(":loadCodeAssist") || String(url).includes(":onboardUser")) {
      return new Response("nope", { status: 503 });
    }
    return Response.json({ models });
  };
}

async function discover(provider: "antigravity" | "agy") {
  antigravityVersion.seedAntigravityIdeVersionCache("1.22.2");
  antigravityVersion.seedAntigravityCliVersionCache("1.22.2");
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "oauth",
    name: `${provider}-live-roster`,
    accessToken: `${provider}-access`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true },
  });
  globalThis.fetch = liveFetchStub() as typeof fetch;
  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as { source: string; models: Array<{ id: string }> };
  assert.equal(response.status, 200);
  assert.equal(body.source, "api", `${provider}: discovery must come from the stubbed live list`);
  return new Set(body.models.map((model) => model.id));
}

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  antigravityVersion.clearAntigravityVersionCaches();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const provider of ["antigravity", "agy"] as const) {
  test(`#12608 ${provider}: discovery keeps every served shared -tiered/Flash id from the live roster`, async () => {
    const discovered = await discover(provider);
    for (const id of LIVE_FLASH_IDS_THAT_MUST_STAY) {
      assert.ok(discovered.has(id), `${provider}: ${id} is served live and must stay discoverable`);
    }
  });

  test(`#12608 ${provider}: discovery still hides stale / non-chat ids absent from the live roster`, async () => {
    const discovered = await discover(provider);
    for (const id of STALE_IDS_THAT_STAY_HIDDEN) {
      assert.equal(discovered.has(id), false, `${provider}: ${id} must stay hidden`);
    }
  });
}

test("#12608 the 3.7 display tiers alias to a -tiered id that discovery does not hide", async () => {
  const { resolveAntigravityModelId } =
    await import("../../open-sse/config/antigravityModelAliases.ts");
  for (const display of ["gemini-3.7-flash", "gemini-3.7-flash-high", "gemini-3.7-flash-low"]) {
    const upstream = resolveAntigravityModelId(display);
    assert.equal(upstream, "gemini-3.7-flash-tiered");
    assert.equal(isDiscoverableAntigravityModelId(upstream), true, "alias target must stay listed");
    assert.equal(isDiscoverableAgyModelId(upstream), true, "alias target must stay listed (agy)");
  }
});

test("#12608 AGY keeps the quota rows of image-only models (no regression from the chat-only pattern)", () => {
  for (const id of ["gemini-3.1-flash-image", "gemini-3-pro-image-preview"]) {
    // Chat discovery hides them on both surfaces…
    assert.equal(isDiscoverableAgyModelId(id), false, `${id} is not a chat model`);
    assert.equal(isDiscoverableAntigravityModelId(id), false, `${id} is not a chat model`);
    // …but their live quota buckets stay visible on both (Provider Limits).
    assert.equal(isUserVisibleAntigravityQuotaModelId(id), true);
    assert.equal(isUserVisibleAgyQuotaModelId(id), true, `${id} quota must stay visible on agy`);
    // Provider Limits normalization on agy keeps them too (it did on the release tip, where
    // agy only excluded the tab_* ids; the new chat-only pattern must not change that).
    assert.equal(isUsageQuotaKeyAllowed("agy", id), true, `${id} quota key must stay allowed`);
    assert.equal(normalizeUsageQuotaKey("agy", id), id, `${id} quota key must survive`);
  }
  // Retired/chat-irrelevant buckets are still dropped.
  assert.equal(isUserVisibleAgyQuotaModelId("gemini-3.5-flash-high"), false);
  assert.equal(isUserVisibleAgyQuotaModelId("gemini-3.1-flash-tts-preview"), false);
});

test("#12608 Gemini 3.8 Flash pricing is its own constant, pinned to the 3.7 promo rates on purpose", async () => {
  const shared = await import("../../src/shared/constants/pricing/shared-tiers.ts");
  const rates = {
    input: 0.75,
    output: 3.75,
    cached: 0.075,
    reasoning: 3.75,
    cache_creation: 0.75,
  };
  // The release tip already publishes GEMINI_3_8_FLASH_PROMO_PRICING as the distinct 3.8
  // export (same current promo rates as 3.7, so the two can diverge later). Do not add a
  // second GEMINI_3_8_FLASH_PRICING alias on top of that.
  assert.deepEqual(shared.GEMINI_3_8_FLASH_PROMO_PRICING, rates);
  assert.notEqual(shared.GEMINI_3_8_FLASH_PROMO_PRICING, shared.GEMINI_3_7_FLASH_PROMO_PRICING);
  const oauth = DEFAULT_PRICING_OAUTH as Record<string, Record<string, unknown>>;
  for (const provider of ["ag", "antigravity", "agy"]) {
    for (const tier of ["low", "medium", "high"]) {
      assert.equal(
        oauth[provider][`gemini-3.8-flash-${tier}`],
        shared.GEMINI_3_8_FLASH_PROMO_PRICING
      );
      // 3.7 is still callable through the -tiered alias, so its pricing is kept too.
      assert.equal(
        oauth[provider][`gemini-3.7-flash-${tier}`],
        shared.GEMINI_3_7_FLASH_PROMO_PRICING,
        `${provider}: 3.7 ${tier} pricing must not be dropped while 3.7-tiered is served`
      );
    }
  }
});
