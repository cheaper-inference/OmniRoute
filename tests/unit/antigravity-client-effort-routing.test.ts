import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("antigravity-client-effort");
const { buildRequest, handleChat, resetStorage, settingsDb } = harness;
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { replaceSyncedAvailableModelsForConnection, getFreshAntigravityModelsForConnection } =
  await import("../../src/lib/db/models.ts");
const { flushPayloadTraffic } = await import("../../src/lib/db/proxyTraffic.ts");
const { getComboBuilderOptions } = await import("../../src/lib/combos/builderOptions.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { createApiKey, updateApiKeyPermissions, resetApiKeyState } =
  await import("../../src/lib/db/apiKeys.ts");
const { getAllActiveSyncedModels } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const { getUnifiedModelsResponse } = await import("../../src/app/api/v1/models/catalog.ts");
const { seedAntigravityIdeVersionCache } =
  await import("../../open-sse/services/antigravityVersion.ts");

test.after(async () => {
  flushPayloadTraffic();
  await harness.cleanup();
});

test("Claude Messages selects a fresh native tier while fixed entries stay fixed", async (t) => {
  await resetStorage();
  const wire: Array<{ model: string; authorization: string | null }> = [];
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    const url = new URL(request.url);
    assert.equal(url.pathname, "/v1internal:streamGenerateContent");
    const { model } = await request.json();
    wire.push({ model, authorization: request.headers.get("authorization") });
    return new Response(
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"fixture-ok"}]},"finishReason":"STOP"}]}}\n\n',
      { headers: { "Content-Type": "text/event-stream" } }
    );
  });

  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    hideAutoCombos: true,
  });
  seedAntigravityIdeVersionCache("2.5.5");
  const originalDelay = process.env.PROVIDER_LIMITS_POST_USAGE_REFRESH_DELAY_MS;
  // Do not make background quota probes or leave timers pointing at the fixture DB.
  const realSetTimeout = globalThis.setTimeout;
  const quotaTimer = 1234567;
  process.env.PROVIDER_LIMITS_POST_USAGE_REFRESH_DELAY_MS = String(quotaTimer);
  t.mock.method(globalThis, "setTimeout", (...args: Parameters<typeof setTimeout>) => {
    const timer = realSetTimeout(...args);
    if (args[1] === quotaTimer) clearTimeout(timer);
    return timer;
  });
  const originalFlag = process.env.ANTIGRAVITY_CLIENT_EFFORT_MODELS;
  const oldSelector = process.env.ANTIGRAVITY_EFFORT_TIER_SELECTION;
  t.after(() => {
    if (originalDelay === undefined) delete process.env.PROVIDER_LIMITS_POST_USAGE_REFRESH_DELAY_MS;
    else process.env.PROVIDER_LIMITS_POST_USAGE_REFRESH_DELAY_MS = originalDelay;
    if (originalFlag === undefined) delete process.env.ANTIGRAVITY_CLIENT_EFFORT_MODELS;
    else process.env.ANTIGRAVITY_CLIENT_EFFORT_MODELS = originalFlag;
    if (oldSelector === undefined) delete process.env.ANTIGRAVITY_EFFORT_TIER_SELECTION;
    else process.env.ANTIGRAVITY_EFFORT_TIER_SELECTION = oldSelector;
  });
  delete process.env.ANTIGRAVITY_CLIENT_EFFORT_MODELS;
  delete process.env.ANTIGRAVITY_EFFORT_TIER_SELECTION;

  async function seed(name: string, priority: number, ids: string[], freeOnly = false) {
    const connection = await createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name,
      email: `${name}@example.test`,
      accessToken: `${name}-fixture-token`,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
      providerSpecificData: { projectId: "fixture-project", importFreeModelsOnly: freeOnly },
      isActive: true,
      testStatus: "active",
      priority,
    });
    assert.equal(typeof connection?.id, "string");
    await replaceSyncedAvailableModelsForConnection(
      "antigravity",
      String(connection.id),
      ids.map((id) => ({ id, name: id, ...(freeOnly ? { isFree: false } : {}) }))
    );
    return String(connection.id);
  }
  const high = await seed("high", 1, ["claude-opus-5-5-high", "gemini-4-hydrogen-high"]);
  await seed("low", 2, ["claude-opus-5-5-low", "gemini-4-hydrogen-xhigh"]);
  const freeOnly = await seed("free-only", 1, ["claude-opus-5-5-low"], true);
  const readProjected = async () =>
    (await getAllActiveSyncedModels({ includeAntigravityClientEffortModels: true })).antigravity;
  assert.ok(!(await readProjected()).some(({ id }) => id === "claude-opus-5-5"));
  process.env.ANTIGRAVITY_CLIENT_EFFORT_MODELS = "1";
  const models = await readProjected();
  const baseModel = models.find(({ id }) => id === "claude-opus-5-5");
  assert.equal(baseModel?.name, "Opus 5.5");
  assert.ok(baseModel);
  await replaceSyncedAvailableModelsForConnection("antigravity", high, [
    { id: "claude-opus-5-5-high", name: "claude-opus-5-5-high" },
    { id: "gemini-4-hydrogen-high", name: "gemini-4-hydrogen-high" },
    baseModel,
  ]);
  assert.ok(models.some(({ id }) => id === "claude-opus-5-5-high"));
  assert.ok(
    !(await getFreshAntigravityModelsForConnection(high)).some(({ id }) => id === "claude-opus-5-5")
  );
  const oldTimeout = process.env.CATALOG_BUILD_TIMEOUT_MS;
  process.env.CATALOG_BUILD_TIMEOUT_MS = "45000";
  t.after(() => {
    if (oldTimeout === undefined) delete process.env.CATALOG_BUILD_TIMEOUT_MS;
    else process.env.CATALOG_BUILD_TIMEOUT_MS = oldTimeout;
  });
  const picker = await getComboBuilderOptions();
  assert.equal(
    picker.providers
      .find(({ providerId }) => providerId === "antigravity")
      ?.models.find(({ id }) => id === "claude-opus-5-5")?.name,
    "Opus 5.5"
  );
  const listing = await getUnifiedModelsResponse(new Request("http://localhost/v1/models"));
  assert.equal(listing.status, 200);
  const { data } = await listing.json();
  assert.equal(data.find(({ id }) => id === "antigravity/claude-opus-5-5")?.name, "Opus 5.5");
  assert.ok(data.some(({ id }) => id === "antigravity/claude-opus-5-5-high"));

  async function request(model: string, effort?: string, authKey?: string) {
    const response = await handleChat(
      buildRequest({
        url: "http://localhost/v1/messages",
        authKey,
        headers: { "anthropic-version": "2023-06-01" },
        body: {
          model,
          stream: false,
          max_tokens: 512,
          messages: [{ role: "user", content: "fixture" }],
          ...(effort === undefined ? {} : { output_config: { effort } }),
        },
      })
    );
    return { status: response.status, text: await response.text() };
  }

  const routed = await request("antigravity/claude-opus-5-5", "low");
  assert.equal(routed.status, 200, routed.text);
  assert.deepEqual(wire.at(-1), {
    model: "claude-opus-5-5-low",
    authorization: "Bearer low-fixture-token",
  });
  const fixed = await request("antigravity/claude-opus-5-5-high", "low");
  assert.equal(fixed.status, 200, fixed.text);
  assert.equal(wire.at(-1)?.model, "claude-opus-5-5-high");
  const omitted = await request("antigravity/claude-opus-5-5");
  assert.equal(omitted.status, 200, omitted.text);
  assert.equal(wire.at(-1)?.model, "claude-opus-5-5-high");
  const native = await request("antigravity/gemini-4-hydrogen", "xhigh");
  assert.equal(native.status, 200, native.text);
  assert.equal(wire.at(-1)?.model, "gemini-4-hydrogen-xhigh");
  const count = wire.length;
  const unsupported = await request("antigravity/claude-opus-5-5", "xhigh");
  assert.equal(unsupported.status, 400, unsupported.text);
  assert.equal(wire.length, count, "unsupported effort never reaches a provider");
  await createCombo({
    name: "effort-fixture-combo",
    strategy: "priority",
    models: ["antigravity/claude-opus-5-5"],
  });
  const combo = await request("effort-fixture-combo", "low");
  assert.equal(combo.status, 200, combo.text);
  assert.equal(wire.at(-1)?.model, "claude-opus-5-5-low");

  const scoped = await createApiKey("effort-scoped", "effort-fixture");
  await updateApiKeyPermissions(scoped.id, {
    allowedModels: ["antigravity/claude-opus-5-5"],
    blockedModels: ["antigravity/claude-opus-5-5-low"],
  });
  resetApiKeyState();
  const beforeDenied = wire.length;
  const denied = await request("antigravity/claude-opus-5-5", "low", scoped.key);
  assert.equal(denied.status, 403, denied.text);
  assert.equal(wire.length, beforeDenied);

  await updateApiKeyPermissions(scoped.id, {
    allowedModels: ["antigravity/claude-opus-5-5", "antigravity/claude-opus-5-5-low"],
    blockedModels: [],
    allowedConnections: [freeOnly],
  });
  resetApiKeyState();
  const wrongAccount = await request("antigravity/claude-opus-5-5", "low", scoped.key);
  assert.equal(wrongAccount.status, 400, wrongAccount.text);
  assert.equal(wire.length, beforeDenied);

  process.env.ANTIGRAVITY_EFFORT_TIER_SELECTION = "1";
  assert.ok(!(await readProjected()).some(({ id }) => id === "claude-opus-5-5"));
});
