/**
 * Antigravity answers 503 "No capacity available for model" with a RetryInfo delay of
 * up to ~60s. The executor used to wait that out on the same account (up to 3 times),
 * so a request took 60-76s even while a second connected account had capacity. With
 * another account available the executor now hands the 503 straight back, and chat.ts
 * moves the request to that account. With no other account it still waits and retries.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-503-failover-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-antigravity-503-failover";

const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
const { seedAntigravityIdeVersionCache, clearAntigravityVersionCaches } =
  await import("../../open-sse/services/antigravityVersion.ts");
const { hasAlternateAntigravityAccount } =
  await import("../../src/sse/handlers/chat/antigravityAccountFailover.ts");
const { clearAllModelLockouts, recordModelLockoutFailure } =
  await import("../../open-sse/services/accountFallback.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  clearAntigravityVersionCaches();
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Google's capacity 503 (RetryInfo shortened to keep the no-failover case fast).
function capacity503(retryDelay = "0.01s"): Response {
  return new Response(
    JSON.stringify({
      error: {
        code: 503,
        message: "No capacity available for model gemini-3.1-flash-lite on the server",
        status: "UNAVAILABLE",
        details: [
          {
            "@type": "type.googleapis.com/google.rpc.ErrorInfo",
            reason: "MODEL_CAPACITY_EXHAUSTED",
            domain: "cloudcode-pa.googleapis.com",
          },
          { "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay },
        ],
      },
    }),
    { status: 503, headers: { "Content-Type": "application/json" } }
  );
}

function okSSE(): Response {
  return new Response(
    'data: {"response":{"candidates":[{"content":{"parts":[{"text":"OK"}]},"finishReason":"STOP"}]}}\n\n',
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

const silentLog = { debug() {}, info() {}, warn() {}, error() {} };
const baseInput = {
  model: "antigravity/gemini-3.1-flash-lite",
  body: { request: { contents: [{ role: "user", parts: [{ text: "hi" }] }] } },
  stream: false,
  credentials: { accessToken: "token", projectId: "project-1", connectionId: "acct-a" },
  log: silentLog,
};

async function runWithUpstream(
  responses: Array<() => Response>,
  accountFailoverAvailable: boolean
) {
  const executor = new AntigravityExecutor();
  executor.config = { ...executor.config, baseUrls: ["https://daily-cloudcode-pa.googleapis.com"] };
  seedAntigravityIdeVersionCache("2.1.1");
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = (async () => {
    const next = responses[Math.min(calls, responses.length - 1)];
    calls += 1;
    return next();
  }) as typeof fetch;
  try {
    const result = await executor.execute({ ...baseInput, accountFailoverAvailable });
    return { status: result.response.status, calls };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("with another account available, a capacity 503 is returned at once without waiting", async () => {
  const started = Date.now();
  // Google asks for a 59s wait; failover must not honour it on this account.
  const { status, calls } = await runWithUpstream([() => capacity503("59s"), okSSE], true);
  assert.equal(status, 503);
  assert.equal(calls, 1, "the 503 must not be retried on the same account");
  assert.ok(Date.now() - started < 5000, "must not wait out Google's retry delay");
});

test("without another account, the 503 is still retried on the same account", async () => {
  const { status, calls } = await runWithUpstream([() => capacity503(), okSSE], false);
  assert.equal(status, 200);
  assert.equal(calls, 2);
});

test("a 429 is handled exactly as before, with or without another account", async () => {
  const rateLimited = () =>
    new Response(
      JSON.stringify({ error: { code: 429, message: "Too many requests, retry in 0.01s" } }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  const withFailover = await runWithUpstream([rateLimited, okSSE], true);
  const without = await runWithUpstream([rateLimited, okSSE], false);
  assert.deepEqual(withFailover, without);
});

test("hasAlternateAntigravityAccount: only an eligible, different account counts", async () => {
  const a = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "a",
    email: "a@example.com",
    accessToken: "t-a",
    isActive: true,
  });
  const b = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "b",
    email: "b@example.com",
    accessToken: "t-b",
    isActive: true,
  });
  const base = {
    provider: "antigravity",
    model: "gemini-3.1-flash-lite",
    connectionId: a.id,
    excludedConnectionIds: [] as string[],
    allowedConnections: null,
    pinned: false,
  };

  assert.equal(await hasAlternateAntigravityAccount(base), true);
  // Another provider, a pinned request, or an already-tried sibling: no failover.
  assert.equal(await hasAlternateAntigravityAccount({ ...base, provider: "codex" }), false);
  assert.equal(await hasAlternateAntigravityAccount({ ...base, pinned: true }), false);
  assert.equal(
    await hasAlternateAntigravityAccount({ ...base, excludedConnectionIds: [b.id] }),
    false
  );
  // The API key may not use the sibling.
  assert.equal(
    await hasAlternateAntigravityAccount({ ...base, allowedConnections: [a.id] }),
    false
  );
  // The sibling is locked out for this model.
  recordModelLockoutFailure(
    "antigravity",
    b.id,
    "gemini-3.1-flash-lite",
    "model_capacity",
    503,
    60_000
  );
  assert.equal(await hasAlternateAntigravityAccount(base), false);
  clearAllModelLockouts();
  // The sibling is cooling down.
  await providersDb.updateProviderConnection(b.id, {
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });
  assert.equal(await hasAlternateAntigravityAccount(base), false);
});
