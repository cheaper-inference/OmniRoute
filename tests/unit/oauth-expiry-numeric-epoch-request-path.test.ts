import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Regression guard: `provider_connections.expires_at` is a TEXT column, so a
 * numeric epoch written by an external import reads back as a *string*, and
 * `new Date("1789012345678")` is an Invalid Date. The background sweep already
 * parses that shape (`parseTokenExpiryMs`), but the request-time refresh paths
 * did `new Date(x).getTime()` directly:
 *
 *   - numeric string  -> NaN -> `NaN - now < lead` is false -> the proactive
 *     on-request refresh never fires;
 *   - epoch seconds as a number -> read as ms -> 1970 -> refresh on EVERY request;
 *   - stale-token-from-DB check -> NaN -> a still-valid rotated DB token is
 *     discarded and a needless OAuth refresh is issued.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oauth-epoch-request-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const tokenRefresh = await import("../../src/sse/services/tokenRefresh.ts");
const openSseTokenRefresh = await import("../../open-sse/services/tokenRefresh.ts");
const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
const { OAUTH_ENDPOINTS } = await import("../../open-sse/config/constants.ts");

class TestExecutor extends BaseExecutor {
  constructor() {
    super("test-provider", { baseUrls: ["https://primary.example/v1/chat/completions"] });
  }
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

type FetchImpl = (url: unknown, init?: unknown) => Promise<Response>;

async function withCountingFetch<T>(impl: FetchImpl, fn: (calls: string[]) => Promise<T>) {
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];
  globalThis.fetch = (async (url: unknown, init?: unknown) => {
    calls.push(String(url));
    return impl(url, init);
  }) as typeof fetch;
  try {
    return await fn(calls);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

const freshClaudeToken: FetchImpl = async () =>
  jsonResponse({
    access_token: "claude-access-fresh",
    refresh_token: "claude-refresh-fresh",
    expires_in: 3600,
  });

// Unique refresh token per connection: the rotation map caches results by
// refresh token, so reusing one across tests would short-circuit the fetch.
let connectionSeq = 0;

async function createClaudeConnection(overrides: Record<string, unknown> = {}) {
  connectionSeq += 1;
  return (await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Claude OAuth",
    accessToken: "claude-access-old",
    refreshToken: `claude-refresh-old-${connectionSeq}`,
    ...overrides,
  })) as { id: string } & Record<string, unknown>;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("checkAndRefreshToken refreshes a near-expiry token whose expiresAt is an epoch-ms string", async () => {
  const connection = await createClaudeConnection();
  const expiresAt = String(Date.now() + 60_000);

  await withCountingFetch(freshClaudeToken, async (calls) => {
    const refreshed = await tokenRefresh.checkAndRefreshToken("claude", {
      ...connection,
      expiresAt,
      connectionId: connection.id,
    });

    assert.deepEqual(calls, [OAUTH_ENDPOINTS.anthropic.token]);
    assert.equal(refreshed.accessToken, "claude-access-fresh");
  });
});

test("checkAndRefreshToken refreshes a near-expiry token whose expiresAt is an epoch-seconds string", async () => {
  const connection = await createClaudeConnection();
  const expiresAt = String(Math.floor((Date.now() + 60_000) / 1000));

  await withCountingFetch(freshClaudeToken, async (calls) => {
    const refreshed = await tokenRefresh.checkAndRefreshToken("claude", {
      ...connection,
      expiresAt,
      connectionId: connection.id,
    });

    assert.equal(calls.length, 1);
    assert.equal(refreshed.accessToken, "claude-access-fresh");
  });
});

test("checkAndRefreshToken leaves far-future numeric expiries alone (string ms and number seconds)", async () => {
  const connection = await createClaudeConnection();
  const farFutureMs = Date.now() + 24 * 60 * 60 * 1000;

  await withCountingFetch(freshClaudeToken, async (calls) => {
    const asString = await tokenRefresh.checkAndRefreshToken("claude", {
      ...connection,
      expiresAt: String(farFutureMs),
      connectionId: connection.id,
    });
    // An epoch-seconds NUMBER used to be read as ms (1970) -> refresh every request.
    const asSeconds = await tokenRefresh.checkAndRefreshToken("claude", {
      ...connection,
      expiresAt: Math.floor(farFutureMs / 1000),
      connectionId: connection.id,
    });

    assert.equal(calls.length, 0);
    assert.equal(asString.accessToken, "claude-access-old");
    assert.equal(asSeconds.accessToken, "claude-access-old");
  });
});

test("checkAndRefreshToken keeps ISO behaviour and skips unknown expiries", async () => {
  const connection = await createClaudeConnection();

  await withCountingFetch(freshClaudeToken, async (calls) => {
    await tokenRefresh.checkAndRefreshToken("claude", {
      ...connection,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      connectionId: connection.id,
    });
    await tokenRefresh.checkAndRefreshToken("claude", {
      ...connection,
      expiresAt: "not-a-date",
      connectionId: connection.id,
    });
    assert.equal(calls.length, 0);

    const refreshed = await tokenRefresh.checkAndRefreshToken("claude", {
      ...connection,
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
      connectionId: connection.id,
    });
    assert.equal(calls.length, 1);
    assert.equal(refreshed.accessToken, "claude-access-fresh");
  });
});

test("BaseExecutor.needsRefresh parses numeric-epoch expiries", () => {
  const executor = new TestExecutor();
  const soonMs = Date.now() + 60_000;
  const laterMs = Date.now() + 60 * 60 * 1000;

  assert.equal(executor.needsRefresh({ expiresAt: String(soonMs) }), true);
  assert.equal(executor.needsRefresh({ expiresAt: String(Math.floor(soonMs / 1000)) }), true);
  assert.equal(executor.needsRefresh({ expiresAt: String(laterMs) }), false);
  assert.equal(executor.needsRefresh({ expiresAt: Math.floor(laterMs / 1000) }), false);
  assert.equal(executor.needsRefresh({ expiresAt: laterMs }), false);
  assert.equal(executor.needsRefresh({ expiresAt: soonMs }), true);
});

test("BaseExecutor.needsRefresh keeps ISO behaviour and ignores unparseable expiries", () => {
  const executor = new TestExecutor();

  assert.equal(
    executor.needsRefresh({ expiresAt: new Date(Date.now() + 60_000).toISOString() }),
    true
  );
  assert.equal(
    executor.needsRefresh({ expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString() }),
    false
  );
  assert.equal(executor.needsRefresh({ expiresAt: "not-a-date" }), false);
  assert.equal(executor.needsRefresh({}), false);
});

test("getAccessToken reuses a still-valid rotated DB token whose expiresAt is an epoch-ms string", async () => {
  const connection = await createClaudeConnection({
    accessToken: "db-access-rotated",
    refreshToken: "db-refresh-rotated",
    expiresAt: String(Date.now() + 60 * 60 * 1000),
  });

  await withCountingFetch(freshClaudeToken, async (calls) => {
    const result = await openSseTokenRefresh.getAccessToken(
      "claude",
      {
        connectionId: connection.id,
        accessToken: "memory-access-stale",
        refreshToken: "memory-refresh-stale",
      },
      null
    );

    assert.equal(calls.length, 0);
    assert.equal(result?.accessToken, "db-access-rotated");
    assert.equal(result?.refreshToken, "db-refresh-rotated");
  });
});
