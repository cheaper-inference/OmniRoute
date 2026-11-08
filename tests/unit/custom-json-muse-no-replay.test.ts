// A no-replay response must win over the Muse session-owner branch of handleChat: that
// branch retries an empty response on the same owner and marks the owner unavailable on any
// other failure, and either one would replay or cool down a business endpoint. Driven through
// the real handler; the connection carries the custom-json apiType that markCustomJsonNoReplay
// reads, because a Muse owner is only ever claimed for provider "muse-code".
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-custom-json-muse-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;
if (!process.env.API_KEY_SECRET) process.env.API_KEY_SECRET = `test-custom-json-muse-${Date.now()}`;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;
const expiresAt = new Date(Date.now() + 3_600_000).toISOString();

function stubInference(handler: () => Response) {
  const calls: string[] = [];
  globalThis.fetch = (async (url: unknown, init: { headers?: HeadersInit }) => {
    if (String(url).includes("/muse-code/key")) return Response.json({ api_key: "unused" });
    calls.push(new Headers(init?.headers).get("authorization") ?? "");
    return handler();
  }) as typeof fetch;
  return calls;
}

function museRequest(session: string) {
  return new Request("http://localhost/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      model: "muse-code/muse-spark-1.3",
      input: `Reply OK ${session} ${Math.random()}`,
      prompt_cache_key: session,
      stream: false,
    }),
  });
}

async function connectionHealth() {
  const rows = (await providersDb.getProviderConnections({ provider: "muse-code" })) as Array<{
    testStatus?: string | null;
    rateLimitedUntil?: string | null;
    errorCode?: string | null;
  }>;
  return rows.map(({ testStatus, rateLimitedUntil, errorCode }) => ({
    testStatus,
    rateLimited: Boolean(rateLimitedUntil),
    errorCode: errorCode ?? null,
  }));
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  clearInflight();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  resetAllCircuitBreakers();
  initTranslators();
  for (const name of ["a", "b"]) {
    await providersDb.createProviderConnection({
      provider: "muse-code",
      authType: "oauth",
      name: `muse-${name}`,
      email: `${name}@example.test`,
      accessToken: `muse-key-${name}`,
      refreshToken: `dca:refresh-${name}`,
      expiresAt,
      isActive: true,
      testStatus: "active",
      providerSpecificData: { apiType: "custom-json" },
    });
  }
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  clearInflight();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an empty no-replay reply reaches the client without a same-owner retry", async () => {
  const calls = stubInference(() =>
    Response.json({
      id: "resp-empty",
      object: "response",
      status: "completed",
      output: [],
      usage: { input_tokens: 1, output_tokens: 0 },
    })
  );
  const response = await handleChat(museRequest("empty"));
  await response.text();
  assert.equal(response.status, 502);
  assert.equal(calls.length, 1, "the business call must not be replayed on the owner");
});

test("a failed no-replay reply does not mark the session owner unavailable", async () => {
  const before = await connectionHealth();
  // 402, not 401/403/429: the Muse executor re-mints its key or retries those itself, a path a real
  // custom-json node never reaches (its executor runs with retry disabled).
  const calls = stubInference(() =>
    Response.json({ error: { message: "business rejected" } }, { status: 402 })
  );
  const response = await handleChat(museRequest("rejected"));
  await response.text();
  assert.equal(response.status, 402);
  assert.equal(calls.length, 1);
  assert.deepEqual(await connectionHealth(), before);
});
