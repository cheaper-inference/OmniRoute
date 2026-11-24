import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Preferred-account response-start failover, wired through the chat handler (#19259).
//
// The helper in src/sse/services/preferredConnectionFailover.ts only computes a deadline;
// it does nothing unless handleSingleModelChat passes that deadline to the dispatch and
// handles REQUEST_SCOPED_UPSTREAM_TIMEOUT with one sibling hop. A stale merge once dropped
// that wiring while every helper-level test stayed green, so these cases drive handleChat()
// end to end: an API key prefers connection A, A is slow to send response headers, and the
// Resilience setting decides whether the request waits for A or hops once to sibling B.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-preferred-failover-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;
delete process.env.OMNIROUTE_PREFERRED_ACCOUNT_FAILOVER_ENABLED;
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = `test-preferred-failover-${Date.now()}`;
}

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;

// Shortened preferred deadline (the setting's minimum) and the slow preferred account's
// time to headers. The gap keeps the assertions independent of machine load.
const PREFERRED_DEADLINE_MS = 500;
const PREFERRED_HEADERS_DELAY_MS = 2_500;

async function flushBackgroundWork() {
  await new Promise((resolve) => setTimeout(resolve, 50));
  await new Promise((resolve) => setImmediate(resolve));
}

async function resetStorage() {
  clearInflight();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  resetAllCircuitBreakers();
  initTranslators();
}

type SeededConnection = { id: string; apiKey: string };

async function seedConnection(name: string, apiKey: string): Promise<SeededConnection> {
  const row = (await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey,
    isActive: true,
    testStatus: "active",
  })) as { id: string };
  return { id: row.id, apiKey };
}

async function setPreferredFailover(enabled: boolean) {
  await settingsDb.updateSettings({
    resilienceSettings: {
      preferredAccountFailover: {
        enabled,
        defaultTimeoutMs: 20_000,
        providerTimeoutsMs: { openai: PREFERRED_DEADLINE_MS },
        modelTimeoutsMs: {},
      },
    },
  });
}

function successStreamResponse(content: string): Response {
  return new Response(
    `data: ${JSON.stringify({
      id: "chatcmpl-preferred-failover",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { role: "assistant", content }, finish_reason: null }],
    })}\n\ndata: ${JSON.stringify({
      id: "chatcmpl-preferred-failover",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    })}\n\ndata: [DONE]\n\n`,
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

// Headers arrive only after `delayMs`; an abort (the response-start deadline) rejects first.
function delayedResponse(signal: AbortSignal | undefined, delayMs: number, content: string) {
  return new Promise<Response>((resolve, reject) => {
    const timer = setTimeout(() => resolve(successStreamResponse(content)), delayMs);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(signal.reason ?? new DOMException("aborted", "AbortError"));
      },
      { once: true }
    );
  });
}

function streamRequest(apiKey: string) {
  // A per-request nonce keeps the semantic cache and request dedup out of the way.
  const nonce = `preferred-failover-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-4.1",
      messages: [{ role: "user", content: `Reply with OK only. ${nonce}` }],
      max_tokens: 16,
      stream: true,
      temperature: 0,
    }),
  });
}

// The preferred account (A) is slow to send headers; its sibling (B) answers at once.
// Each dispatch is attributed to a connection by its own Authorization header.
function stubFetch(dispatches: string[], preferred: SeededConnection, dispatchedAt: number[] = []) {
  globalThis.fetch = (async (_url: unknown, init: { headers?: unknown; signal?: AbortSignal }) => {
    const headers = new Headers((init?.headers ?? {}) as HeadersInit);
    const auth = headers.get("authorization") ?? "";
    dispatches.push(auth);
    dispatchedAt.push(Date.now());
    if (auth === `Bearer ${preferred.apiKey}`) {
      return delayedResponse(init?.signal, PREFERRED_HEADERS_DELAY_MS, "from-preferred");
    }
    return successStreamResponse("from-sibling");
  }) as typeof fetch;
}

async function assertNotMarked(connection: SeededConnection, label: string) {
  const row = (await providersDb.getProviderConnectionById(connection.id)) as Record<
    string,
    unknown
  > | null;
  assert.ok(row, `the ${label} connection must still exist`);
  const until = (row.rateLimitedUntil as string | null | undefined) ?? null;
  assert.ok(
    until === null || new Date(String(until)).getTime() <= Date.now(),
    `expected no cooldown on the ${label} connection, got rateLimitedUntil=${until}`
  );
  assert.notEqual(row.testStatus, "unavailable", `the ${label} connection must not be unavailable`);
}

async function seedPreferredPool() {
  const preferred = await seedConnection("openai-preferred-a", "sk-preferred-failover-a");
  const sibling = await seedConnection("openai-preferred-b", "sk-preferred-failover-b");
  const key = (await createApiKey("preferred failover fixture", "fixture-machine", [], {
    preferredConnections: [preferred.id],
  })) as { key: string };
  return { preferred, sibling, apiKey: key.key };
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.afterEach(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
});

test.after(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("enabled: a slow preferred account hops once to an eligible sibling, nothing marked", async () => {
  const { preferred, sibling, apiKey } = await seedPreferredPool();
  await setPreferredFailover(true);

  const dispatches: string[] = [];
  const dispatchedAt: number[] = [];
  stubFetch(dispatches, preferred, dispatchedAt);

  const response = await handleChat(streamRequest(apiKey));
  const bodyText = await response.text();

  assert.equal(dispatches.length, 2, `expected preferred + one sibling, got ${dispatches}`);
  assert.equal(dispatches[0], `Bearer ${preferred.apiKey}`, "the API key preference goes first");
  assert.equal(dispatches[1], `Bearer ${sibling.apiKey}`, "the timed-out preferred hops once");
  assert.equal(response.status, 200, `expected 200, got ${response.status}: ${bodyText}`);
  assert.equal(
    response.headers.get("X-OmniRoute-Selected-Connection-Id"),
    sibling.id,
    "the response must carry the sibling as the selected connection"
  );
  assert.match(bodyText, /from-sibling/, "the client must receive the sibling's content");
  // Measured between dispatches, so cold module loading cannot skew it.
  const hopAfterMs = dispatchedAt[1] - dispatchedAt[0];
  assert.ok(
    hopAfterMs < PREFERRED_HEADERS_DELAY_MS,
    `the shortened deadline must not wait for the preferred account (hop after ${hopAfterMs} ms)`
  );
  // A preferred-deadline hop is a routing hint, never a cooldown.
  await assertNotMarked(preferred, "preferred");
  await assertNotMarked(sibling, "sibling");
});

test("disabled: the preferred account keeps its normal deadline and serves the request", async () => {
  const { preferred, apiKey } = await seedPreferredPool();
  await setPreferredFailover(false);

  const dispatches: string[] = [];
  stubFetch(dispatches, preferred);

  const response = await handleChat(streamRequest(apiKey));
  const bodyText = await response.text();

  assert.equal(dispatches.length, 1, `expected a single dispatch, got ${dispatches}`);
  assert.equal(dispatches[0], `Bearer ${preferred.apiKey}`);
  assert.equal(response.status, 200, `expected 200, got ${response.status}: ${bodyText}`);
  assert.equal(response.headers.get("X-OmniRoute-Selected-Connection-Id"), preferred.id);
  assert.match(bodyText, /from-preferred/);
  await assertNotMarked(preferred, "preferred");
});
