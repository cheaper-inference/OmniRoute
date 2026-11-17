// Persistence paths of the SenseNova fetcher against a real database: the happy
// path must rotate the stored refresh token, and an operator replacement landing
// while the exchange is in flight must win.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(process.env.DATA_DIR || os.tmpdir(), "omniroute-sensenova-persist-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.STORAGE_ENCRYPTION_KEY = "sensenova-persist-synthetic-key";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const fetcher = await import("../../open-sse/services/sensenovaQuotaFetcher.ts");

const LIVE_PAYLOAD = {
  plan: { id: "plan-free", name: "Free Plan" },
  pools: [
    {
      id: "pool-default",
      name: "Default",
      pool_type: "default",
      window_5h: { limit: "120000", used: "12000", remaining: "108000", reset_at: 1794851140 },
      window_7d: { limit: "1200000", used: "120000", remaining: "1080000", reset_at: 1795456000 },
    },
  ],
};

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

type Row = Record<string, unknown> & { id: string; providerSpecificData?: Record<string, unknown> };

async function newConnection(refreshToken: string): Promise<Row> {
  core.resetDbInstance();
  return (await providers.createProviderConnection({
    provider: "sensenova",
    authType: "apikey",
    name: `sn-${Math.random().toString(36).slice(2, 8)}`,
    apiKey: "sk-synthetic-sensenova",
    providerSpecificData: { sensenovaRefreshToken: refreshToken },
  })) as Row;
}

test("a successful exchange writes the rotated token onto the row", async () => {
  const created = await newConnection("stored-refresh");
  fetcher.invalidateSensenovaQuotaCache(created.id);

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === fetcher.SENSENOVA_TOKEN_URL) {
      return jsonResponse({
        access_token: "access-1",
        refresh_token: "rotated-1",
        expires_in: 10800,
      });
    }
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const quota = await fetcher.fetchSensenovaQuota(created.id, created);
  assert.ok(quota, "the quota must be reported");

  const stored = (await providers.getProviderConnectionById(created.id)) as Row;
  assert.equal(stored.providerSpecificData?.sensenovaRefreshToken, "rotated-1");
  assert.equal(stored.providerSpecificData?.sensenovaAccessToken, "access-1");
});

test("an invalidation during the exchange stops the tokens from being written", async () => {
  const created = await newConnection("stored-refresh-3");
  fetcher.invalidateSensenovaQuotaCache(created.id);

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === fetcher.SENSENOVA_TOKEN_URL) {
      // Same credential on the row, but the operator asked for a fresh session.
      fetcher.invalidateSensenovaQuotaCache(created.id);
      return jsonResponse({
        access_token: "access-orphan",
        refresh_token: "rotated-orphan",
        expires_in: 10800,
      });
    }
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const quota = await fetcher.fetchSensenovaQuota(created.id, created);
  assert.equal(quota, null, "an invalidated exchange must not publish a session");

  const stored = (await providers.getProviderConnectionById(created.id)) as Row;
  assert.equal(
    stored.providerSpecificData?.sensenovaRefreshToken,
    "stored-refresh-3",
    "the invalidated exchange must not write its tokens"
  );
});

test("a credential replaced during the exchange survives and the result is dropped", async () => {
  const created = await newConnection("stored-refresh-2");
  fetcher.invalidateSensenovaQuotaCache(created.id);

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === fetcher.SENSENOVA_TOKEN_URL) {
      // The operator saves a new credential while this exchange is on the wire.
      await providers.updateProviderConnection(created.id, {
        providerSpecificData: { sensenovaRefreshToken: "operator-refresh" },
      });
      return jsonResponse({
        access_token: "access-stale",
        refresh_token: "rotated-stale",
        expires_in: 10800,
      });
    }
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const quota = await fetcher.fetchSensenovaQuota(created.id, created);
  assert.equal(quota, null, "the superseded session must not report a quota");

  const stored = (await providers.getProviderConnectionById(created.id)) as Row;
  assert.equal(stored.providerSpecificData?.sensenovaRefreshToken, "operator-refresh");
  assert.equal(stored.providerSpecificData?.sensenovaAccessToken, undefined);
});
