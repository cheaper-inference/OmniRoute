// Drives the real chat pipeline: the key-quota rpm limit must hold for calls in flight, and
// every way a call can end must give its slot back.
import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "./_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("key-quota-rpm-reservation");
const { BaseExecutor, handleChat, buildRequest, seedApiKey, seedConnection, resetStorage } = h;
const keyQuotaDb = await import("../../src/lib/db/keyQuota.ts");
const quota = await import("../../src/domain/keyQuota.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");
rateLimiter.setRateLimiterTestMode(true);

const MODEL = "openai/gpt-4o-mini";
const body = (stream = false) => ({
  model: MODEL,
  stream,
  messages: [{ role: "user", content: "hi" }],
});

async function keyWithRpm(rpmLimit: number, extra: Record<string, unknown> = {}) {
  const key = await seedApiKey({ name: "rpm-capped" });
  keyQuotaDb.upsertKeyQuotaLimits(key.id, { rpmLimit });
  if (Object.keys(extra).length) await h.apiKeysDb.updateApiKeyPermissions(key.id, extra);
  return key;
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  await seedConnection("openai", { apiKey: "sk-test-" + "x".repeat(12) });
});
test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  await resetStorage();
});
test.after(async () => {
  await h.cleanup();
});

test("E1: 6 concurrent calls at rpm limit 2 reach the upstream twice; the rest get 429", async () => {
  const key = await keyWithRpm(2);
  let openGate!: () => void;
  const gate = new Promise<void>((resolve) => (openGate = resolve));
  h.installRecordingFetch(() => undefined);
  const recordingFetch = globalThis.fetch;
  globalThis.fetch = async (...args: Parameters<typeof fetch>) => {
    await gate; // every admitted call is in flight until the gate opens
    return recordingFetch(...args);
  };

  const calls = Array.from({ length: 6 }, () =>
    handleChat(buildRequest({ body: body(), authKey: key.key }))
  );
  await new Promise((resolve) => setTimeout(resolve, 100));
  openGate();
  const statuses = (await Promise.all(calls)).map((r) => r.status).sort();
  assert.deepEqual(statuses, [200, 200, 429, 429, 429, 429]);
  assert.equal(h.providersSeen().length, 2, "only the 2 admitted calls reach the upstream");
  assert.equal(quota.countKeyQuotaReservations(key.id), 0);
});

test("E2: a completed call is counted once, not twice, and gives its slot back", async () => {
  const key = await keyWithRpm(2);
  h.installRecordingFetch();
  const first = await handleChat(buildRequest({ body: body(), authKey: key.key }));
  assert.equal(first.status, 200, await first.clone().text());
  assert.equal(quota.countKeyQuotaReservations(key.id), 0);
  assert.equal(keyQuotaDb.getKeyQuotaCounters(key.id).rpmUsed, 1, "recorded once");
  const second = await handleChat(buildRequest({ body: body(), authKey: key.key }));
  assert.equal(second.status, 200, "1 recorded + 0 held is below the limit of 2");
});

test("E3: an upstream error gives the slot back", async () => {
  const key = await keyWithRpm(1);
  h.installRecordingFetch(() => h.failure(500));
  const failed = await handleChat(buildRequest({ body: body(), authKey: key.key }));
  assert.ok(failed.status >= 500, `status ${failed.status}`);
  assert.equal(quota.countKeyQuotaReservations(key.id), 0);
  assert.equal(
    quota.checkKeyQuota(key.id, { reserve: false }).allowed,
    true,
    "a later call is admitted"
  );
});

test("E4: a client abort gives the slot back", async () => {
  const key = await keyWithRpm(1);
  const abort = new AbortController();
  let reachedUpstream!: () => void;
  const upstreamSeen = new Promise<void>((resolve) => (reachedUpstream = resolve));
  globalThis.fetch = () =>
    new Promise((_resolve, reject) => {
      reachedUpstream();
      abort.signal.addEventListener("abort", () =>
        reject(new DOMException("aborted", "AbortError"))
      );
    });
  const request = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key.key}` },
    body: JSON.stringify(body()),
    signal: abort.signal,
  });
  const pending = handleChat(request, null, null, undefined, abort.signal).catch(() => null);
  await upstreamSeen;
  assert.equal(quota.countKeyQuotaReservations(key.id), 1, "held while the call is in flight");
  abort.abort();
  await pending;
  assert.equal(quota.countKeyQuotaReservations(key.id), 0);
  assert.equal(
    quota.checkKeyQuota(key.id, { reserve: false }).allowed,
    true,
    "a later call is admitted"
  );
});

test("E5: a policy deny after the quota gate gives the slot back", async () => {
  // The key rpm cap (maxRequestsPerMinute) rejects AFTER the quota gate admitted the call.
  const key = await keyWithRpm(2, { maxRequestsPerMinute: 1 });
  h.installRecordingFetch();
  const first = await handleChat(buildRequest({ body: body(), authKey: key.key }));
  assert.equal(first.status, 200, await first.clone().text());
  const denied = await handleChat(buildRequest({ body: body(), authKey: key.key }));
  assert.equal(denied.status, 429);
  assert.match(await denied.text(), /Request limit exceeded/);
  assert.equal(quota.countKeyQuotaReservations(key.id), 0);
  assert.equal(
    quota.checkKeyQuota(key.id, { reserve: false }).allowed,
    true,
    "1 recorded + 0 held < 2"
  );
});

test("E6: a streamed call holds its slot until the stream ends, then gives it back", async () => {
  const key = await keyWithRpm(2);
  h.installRecordingFetch(
    () =>
      new Response(
        `data: ${JSON.stringify({ id: "c", object: "chat.completion.chunk", model: "gpt-4o-mini", choices: [{ index: 0, delta: { role: "assistant", content: "ok" } }] })}\n\n` +
          `data: ${JSON.stringify({ id: "c", object: "chat.completion.chunk", model: "gpt-4o-mini", choices: [{ index: 0, delta: {}, finish_reason: "stop" }] })}\n\n` +
          "data: [DONE]\n\n",
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      )
  );
  const response = await handleChat(buildRequest({ body: body(true), authKey: key.key }));
  assert.equal(response.status, 200);
  assert.equal(quota.countKeyQuotaReservations(key.id), 1, "held while the stream is open");
  await response.text();
  assert.equal(quota.countKeyQuotaReservations(key.id), 0);
});

test("E7: a route that never records usage (not chat) takes no reservation, so it cannot lock the key", async () => {
  const key = await keyWithRpm(1);
  for (let i = 0; i < 5; i++) {
    const policy = await enforceApiKeyPolicy(
      buildRequest({ body: { model: MODEL, input: "x" }, authKey: key.key }),
      MODEL
    );
    assert.equal(policy.rejection, null, `call ${i + 1} must pass`);
    assert.equal(policy.keyQuotaReservation, undefined);
  }
  assert.equal(quota.countKeyQuotaReservations(key.id), 0);
});
