// Editing a connection's API key in the dashboard (PUT/PATCH /api/providers/[id]) must retire the
// quota snapshots the OLD key produced, like `omniroute providers rotate` does. The quota cache
// rehydrates from the latest snapshot of each window, so without it the new key inherits the old
// key's exhausted pause. History rows stay: retirement appends a record, it deletes nothing.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-edit-quota-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = "test-jwt-secret-key-edit-quota";
process.env.INITIAL_PASSWORD = "admin-secret";
delete process.env.STORAGE_ENCRYPTION_KEY;

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { saveQuotaSnapshot } = await import("../../src/lib/db/quotaSnapshots.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const providerByIdRoute = await import("../../src/app/api/providers/[id]/route.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  quotaCache.__clearForTests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function exhaustedConnection(name: string) {
  const connection = (await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey: `sk-old-key-${name}`,
    priority: 1,
    isActive: true,
    testStatus: "active",
  })) as { id: string };
  saveQuotaSnapshot({
    provider: "openai",
    connection_id: connection.id,
    window_key: "weekly",
    remaining_percentage: 0,
    is_exhausted: 1,
    next_reset_at: null,
    window_duration_ms: null,
    raw_data: JSON.stringify({ source: "old-key" }),
  });
  return connection.id;
}

async function put(id: string, payload: Record<string, unknown>) {
  const request = await makeManagementSessionRequest(`http://localhost/api/providers/${id}`, {
    method: "PUT",
    body: payload,
  });
  const response = await providerByIdRoute.PUT(request, { params: Promise.resolve({ id }) });
  assert.equal(response.status, 200, `expected the save to succeed, got ${response.status}`);
}

const exhaustedRows = (id: string) =>
  (
    core
      .getDbInstance()
      .prepare(
        "SELECT COUNT(*) AS n FROM quota_snapshots WHERE connection_id = ? AND is_exhausted = 1"
      )
      .get(id) as { n: number }
  ).n;

test("a dashboard key change stops the old key's exhausted snapshot from pausing the connection after a restart", async () => {
  const id = await exhaustedConnection("Edited");
  const otherId = await exhaustedConnection("Untouched");
  assert.equal(quotaCache.isAccountQuotaExhausted(id), true, "precondition: the old key is paused");

  await put(id, { apiKey: "sk-new-key" });

  quotaCache.__clearForTests(); // a cold cache, as after a server start
  assert.equal(
    quotaCache.isAccountQuotaExhausted(id),
    false,
    "the new key must not inherit the old key's exhausted snapshot"
  );
  assert.equal(
    quotaCache.isAccountQuotaExhausted(otherId),
    true,
    "another connection keeps its pause"
  );
  assert.equal(exhaustedRows(id), 1, "the earlier snapshot row stays for utilization history");
});

test("a dashboard key change lifts the old key's pause in the running process", async () => {
  const id = await exhaustedConnection("Live");
  assert.equal(quotaCache.isAccountQuotaExhausted(id), true, "precondition: the old key is paused");

  await put(id, { apiKey: "sk-new-key" }); // the cache stays warm

  assert.equal(quotaCache.isAccountQuotaExhausted(id), false);
});

test("an edit that keeps the same API key keeps the connection's quota pause", async () => {
  const id = await exhaustedConnection("Renamed");
  assert.equal(quotaCache.isAccountQuotaExhausted(id), true);

  await put(id, { name: "Renamed again" });
  await put(id, { apiKey: "sk-old-key-Renamed" });

  quotaCache.__clearForTests();
  assert.equal(quotaCache.isAccountQuotaExhausted(id), true);
});

// A usage fetch that began under the old key can finish after the edit. Its exhausted reading
// belongs to the old key: it must not refill the cache or write a new snapshot for the new key.
test("a usage fetch started under the old key cannot restore its pause after a key edit", async () => {
  const connection = (await createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "Racing",
    apiKey: "sk-old-key-for-race-test",
    priority: 1,
    isActive: true,
    testStatus: "active",
  })) as { id: string };
  const id = connection.id;

  let release!: () => void;
  const gate = new Promise<void>((resolve) => (release = resolve));
  let started!: () => void;
  const fetchStarted = new Promise<void>((resolve) => (started = resolve));
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    started();
    await gate;
    return new Response(
      JSON.stringify({
        code: 200,
        success: true,
        data: {
          planName: "max",
          limits: [{ type: "TOKENS_LIMIT", unit: 3, number: 5, percentage: 100, models: [] }],
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;
  try {
    const inflight = providerLimits.fetchAndPersistProviderLimits(id, "manual");
    await fetchStarted;
    await put(id, { apiKey: "sk-new-key-for-race-test" });
    release();
    await inflight;
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(quotaCache.isAccountQuotaExhausted(id), false, "the running process stays clear");
  quotaCache.__clearForTests(); // a cold cache, as after a server start
  assert.equal(quotaCache.isAccountQuotaExhausted(id), false, "no snapshot of the old key remains");
});
