// End-to-end through handleChat: an Antigravity 429 must not be multiplied by the chat
// handler's cooldown-aware retry, and the local answer to a re-send of a refused request
// must not cool the shared connection down (2026-10-24: one Claude Code prompt became
// ~45 refused upstream calls on agy).
import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// One upstream attempt per request keeps the test fast and makes the chat-level count exact.
process.env.ANTIGRAVITY_MAX_429_ATTEMPTS = "1";

const harness = await createChatPipelineHarness("chat-antigravity-429-budget");
const providersDb = await import("../../src/lib/db/providers.ts");
const { clearAllModelLockouts, isModelLocked } =
  await import("../../open-sse/services/accountFallback.ts");
const { resetAntigravity429GuardForTests } =
  await import("../../open-sse/services/antigravity429Guard.ts");
const { seedAntigravityIdeVersionCache, seedAntigravityCliVersionCache } =
  await import("../../open-sse/services/antigravityVersion.ts");
const { BaseExecutor, buildRequest, handleChat, resetStorage, settingsDb } = harness;

const MODEL = "gemini-3.8-flash-high";

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  clearAllModelLockouts();
  resetAntigravity429GuardForTests();
  seedAntigravityIdeVersionCache("2026.10.24-test");
  seedAntigravityCliVersionCache("2026.10.24-test");
  // Production-like: the cooldown-aware retry is ON and would restart the request.
  await settingsDb.updateSettings({ requestRetry: 3, maxRetryIntervalSec: 30 });
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = harness.originalRetryDelayMs;
  await resetStorage();
});

test.after(async () => {
  delete process.env.ANTIGRAVITY_MAX_429_ATTEMPTS;
  await harness.cleanup();
});

async function seedAgyConnection() {
  const connection = await providersDb.createProviderConnection({
    provider: "agy",
    authType: "oauth",
    name: "agy-429-budget",
    email: "agy-429@example.test",
    accessToken: "ya29.test-token",
    refreshToken: "1//test-refresh",
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    isActive: true,
    testStatus: "active",
    providerSpecificData: { projectId: "project-429" },
  });
  return (connection as { id: string }).id;
}

function stubCloudCode429() {
  const counter = { upstream: 0 };
  globalThis.fetch = async (url) => {
    if (String(url).includes("cloudcode-pa")) {
      counter.upstream += 1;
      return new Response(
        JSON.stringify({
          error: {
            code: 429,
            message: "Resource has been exhausted (e.g. check quota).",
            status: "RESOURCE_EXHAUSTED",
          },
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
  };
  return counter;
}

const chatBody = {
  model: `agy/${MODEL}`,
  stream: false,
  messages: [{ role: "user", content: "You are a Claude agent. Read notes.txt" }],
};

test("an Antigravity 429 is returned once, not restarted by the cooldown-aware retry", async () => {
  // Warm the chat pipeline first: the first handleChat in a process pays the cold module/DB
  // initialisation, which under a loaded runner alone exceeds the 4 s budget below and would make
  // the timing assertion measure start-up instead of a cooldown wait. State is reset afterwards,
  // so the measured request starts exactly like the original single call.
  await seedAgyConnection();
  stubCloudCode429();
  await handleChat(buildRequest({ body: chatBody }));
  await resetStorage();
  clearAllModelLockouts();
  resetAntigravity429GuardForTests();
  await settingsDb.updateSettings({ requestRetry: 3, maxRetryIntervalSec: 30 });

  await seedAgyConnection();
  const counter = stubCloudCode429();

  const startedAt = Date.now();
  const response = await handleChat(buildRequest({ body: chatBody }));
  const elapsedMs = Date.now() - startedAt;

  assert.equal(response.status, 429);
  assert.equal(
    counter.upstream,
    1,
    // Before: each cooldown restart re-ran the executor AND the quota preflight
    // (fetchAvailableModels x3, loadCodeAssist, retrieveUserQuota[Summary]) = 19 calls.
    "every Cloud Code call counts: the executor already spent its 429 budget"
  );
  assert.ok(elapsedMs < 4000, `no cooldown wait expected, took ${elapsedMs}ms`);
});

test("a re-send of the refused request is answered locally and does not cool the connection", async () => {
  const connectionId = await seedAgyConnection();
  const counter = stubCloudCode429();

  const first = await handleChat(buildRequest({ body: chatBody }));
  assert.equal(first.status, 429);
  assert.equal(counter.upstream, 1);

  // The genuine 429 cooled the model down as before; let that window pass.
  clearAllModelLockouts();
  await providersDb.updateProviderConnection(connectionId, {
    rateLimitedUntil: null,
    testStatus: "active",
  });

  const resend = await handleChat(buildRequest({ body: chatBody }));
  const text = await resend.text();

  assert.equal(resend.status, 429);
  assert.equal(counter.upstream, 1, "the identical re-send must not reach Google");
  assert.match(text, /not resending it to Antigravity/);
  assert.equal(
    isModelLocked("agy", connectionId, MODEL),
    false,
    "the local verdict must not lock the model for every other request"
  );
  const after = (await providersDb.getProviderConnectionById(connectionId)) as {
    rateLimitedUntil?: string | null;
  } | null;
  const until = after?.rateLimitedUntil ? new Date(after.rateLimitedUntil).getTime() : 0;
  assert.ok(!(until > Date.now()), "the local verdict must not cool the connection down");
});
