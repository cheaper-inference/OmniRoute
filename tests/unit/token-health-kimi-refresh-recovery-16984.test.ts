/**
 * #16984 — Kimi Coding must retain its recovery credential after a classified
 * refresh error until the existing bounded retry policy has been exhausted.
 * The token may be valid after a transient provider-side misclassification.
 *
 * Reproduces the real health-sweep persistence path rather than only the
 * helper policy. No live Kimi calls or credentials are needed.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kimi-recovery-16984-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const health = await import("../../src/lib/tokenHealthCheck.ts");
const { PROVIDERS } = await import("../../open-sse/config/constants.ts");

const tokenUrl = PROVIDERS["kimi-coding"]?.refreshUrl || PROVIDERS["kimi-coding"]?.tokenUrl;
assert.ok(tokenUrl, "Kimi Coding must have a refresh endpoint");

test.after(() => {
  health.stopTokenHealthCheck();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Kimi Coding retains its refresh token across failed sweeps (#16984)", async () => {
  const priorFetch = globalThis.fetch;
  let refreshCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    assert.equal(url, tokenUrl, "mock must intercept the actual Kimi refresh endpoint");
    refreshCalls += 1;
    if (refreshCalls === 1) {
      return new Response(JSON.stringify({ error: "invalid_grant" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({
        access_token: "at-kimi-recovered",
        refresh_token: "rt-kimi-recovered",
        expires_in: 900,
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    const expiry = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const staleCheck = new Date(Date.now() - 61 * 60 * 1000).toISOString();
    const created = await providersDb.createProviderConnection({
      provider: "kimi-coding",
      authType: "oauth",
      name: "Kimi Coding recovery regression",
      accessToken: "at-kimi-test",
      refreshToken: "rt-kimi-test",
      tokenExpiresAt: expiry,
      expiresAt: expiry,
      healthCheckInterval: 60,
      testStatus: "active",
      isActive: true,
    });
    assert.equal(typeof created.id, "string");
    const id = created.id as string;

    await health.checkConnection({ ...created, lastHealthCheckAt: staleCheck });
    const first = await providersDb.getProviderConnectionById(id);
    const firstPsd = first?.providerSpecificData as
      | { expiredRetry?: { count?: number; at?: string } }
      | undefined;

    assert.equal(refreshCalls, 1, "the first health sweep must actually attempt a refresh");
    assert.equal(first?.testStatus, "expired", "a classified invalid_grant still reports expiry");
    assert.equal(first?.isActive, true, "the existing retry budget remains active");
    assert.equal(first?.refreshToken, "rt-kimi-test", "do not erase the recovery credential");
    assert.equal(firstPsd?.expiredRetry?.count, 1, "the first failed refresh spends one retry");

    // Advance past the bounded retry backoff without waiting or contacting Kimi.
    await providersDb.updateProviderConnection(id, {
      providerSpecificData: {
        ...(first?.providerSpecificData as Record<string, unknown>),
        expiredRetry: { count: 1, at: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
      },
    });

    const beforeSecond = await providersDb.getProviderConnectionById(id);
    await health.checkConnection({ ...beforeSecond, lastHealthCheckAt: staleCheck });
    const second = await providersDb.getProviderConnectionById(id);
    assert.equal(refreshCalls, 2, "a second sweep must retry using the preserved credential");
    assert.equal(second?.testStatus, "active", "a successful retry restores the connection");
    assert.equal(second?.accessToken, "at-kimi-recovered");
    assert.equal(second?.refreshToken, "rt-kimi-recovered");
    assert.ok(Date.parse(second?.expiresAt || "") > Date.now());
  } finally {
    globalThis.fetch = priorFetch;
  }
});
