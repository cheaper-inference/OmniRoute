import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "usage-pending-reload-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const usage = await import("../../src/lib/usage/usageHistory.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const RESPONSE = { providerResponse: "provider result", clientResponse: "client result" };
let reloadSequence = 0;

function reloadUsage() {
  const url = new URL("../../src/lib/usage/usageHistory.ts", import.meta.url);
  url.searchParams.set("pending-reload-test", String(++reloadSequence));
  return import(url.href) as Promise<typeof usage>;
}

function start(connectionId = "connection") {
  const id = usage.trackPendingRequest("model", "provider", connectionId, true, RESPONSE);
  assert.ok(id);
  return id;
}

test.beforeEach(() => usage.clearPendingRequests());
test.afterEach(() => usage.clearPendingRequests());
test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("a reloaded module retains the live map and its byte charge", async () => {
  const id = start();
  const charge = usage.getPendingRetainedBytes();
  assert.ok(charge > 256);

  const reloaded = await reloadUsage();
  assert.notEqual(reloaded.trackPendingRequest, usage.trackPendingRequest);
  assert.equal(reloaded.getPendingById(), usage.getPendingById());
  assert.ok(reloaded.getPendingById().has(id));
  assert.equal(reloaded.getPendingRetainedBytes(), charge);
});

test("two module instances share inserts, updates, stable finalization and clear", async () => {
  const firstId = start("first");
  const reloaded = await reloadUsage();
  const firstCharge = usage.getPendingRetainedBytes();
  const secondId = reloaded.trackPendingRequest("model", "provider", "second", true, RESPONSE);
  assert.ok(secondId);
  assert.equal(usage.getPendingRetainedBytes(), firstCharge * 2);

  assert.equal(
    reloaded.updatePendingRequestById(firstId, {
      providerResponse: "a much longer provider result",
    }),
    true
  );
  const byIdCharge = usage.getPendingRetainedBytes();
  assert.ok(byIdCharge > firstCharge * 2);
  assert.equal(reloaded.getPendingRetainedBytes(), byIdCharge);

  usage.updatePendingRequest("model", "provider", "second", {
    clientResponse: "expanded client result",
  });
  assert.ok(reloaded.getPendingRetainedBytes() > byIdCharge);
  assert.equal(reloaded.getPendingRetainedBytes(), usage.getPendingRetainedBytes());

  // Payloads are already charged; finalization adds no new payload metadata.
  assert.equal(reloaded.finalizePendingRequestById(firstId, {}), true);
  usage.trackPendingRequest("model", "provider", "second", false, undefined, secondId);
  assert.equal(reloaded.getPendingById().size, 0);
  assert.equal(usage.getPendingRetainedBytes(), 0);
  assert.equal(reloaded.getPendingRetainedBytes(), 0);

  start();
  reloaded.clearPendingRequests();
  assert.equal(usage.getPendingById().size, 0);
  assert.equal(usage.getPendingRetainedBytes(), 0);
  assert.equal(reloaded.getPendingRetainedBytes(), 0);
});

test("a count-cap sweep in one instance debits the total seen by the other", async () => {
  const oldestId = start();
  const oldest = usage.getPendingById().get(oldestId);
  assert.ok(oldest);
  oldest.startedAt = 0;
  for (let i = 0; i < 5000; i++) {
    usage.trackPendingRequest("model", "provider", "fillers", true);
  }
  const reloaded = await reloadUsage();
  assert.equal(reloaded.sweepStalePendingRequests(), 1);
  assert.equal(usage.getPendingById().has(oldestId), false);
  assert.equal(usage.getPendingById().size, 5000);
  assert.equal(usage.getPendingRetainedBytes(), 5000 * 256);
  assert.equal(reloaded.getPendingRetainedBytes(), usage.getPendingRetainedBytes());
});

test("legacy state bootstraps its retained charge once", async () => {
  const id = start();
  const charge = usage.getPendingRetainedBytes();
  const state = globalThis.__omnirouteUsageHistoryPendingState;
  assert.ok(state);
  Reflect.deleteProperty(state, "totalPendingDetailBytes");

  const reloaded = await reloadUsage();
  assert.equal(reloaded.getPendingRetainedBytes(), charge);
  assert.equal(usage.getPendingRetainedBytes(), charge);
  assert.ok(reloaded.getPendingById().has(id));

  const map = reloaded.getPendingById();
  const values = map.values;
  map.values = () => {
    throw new Error("valid shared accounting must not recount the map");
  };
  try {
    const next = await reloadUsage();
    assert.equal(next.getPendingRetainedBytes(), charge);
  } finally {
    map.values = values;
  }
  assert.equal(reloaded.finalizePendingRequestById(id, {}), true);
  assert.equal(usage.getPendingRetainedBytes(), 0);
});

for (const invalid of [undefined, null, "invalid", NaN, Infinity, -Infinity]) {
  test(`invalid retained total ${String(invalid)} bootstraps from the shared map`, async () => {
    start();
    const charge = usage.getPendingRetainedBytes();
    const state = globalThis.__omnirouteUsageHistoryPendingState;
    assert.ok(state);
    Reflect.set(state, "totalPendingDetailBytes", invalid);
    const reloaded = await reloadUsage();
    assert.equal(reloaded.getPendingRetainedBytes(), charge);
    assert.equal(usage.getPendingRetainedBytes(), charge);
  });
}

test("reload preserves a finite debit balance rather than hiding accounting drift", async () => {
  const state = globalThis.__omnirouteUsageHistoryPendingState;
  assert.ok(state);
  Reflect.set(state, "totalPendingDetailBytes", -1);
  const reloaded = await reloadUsage();
  assert.equal(reloaded.getPendingRetainedBytes(), -1);
});

test("insertion after reload enforces the ceiling against pre-reload payloads", async () => {
  const payload = Object.fromEntries(
    Array.from({ length: 24 }, (_, i) => [
      `key${i}`,
      Array.from({ length: 12 }, () => ({ role: "user", content: "x".repeat(1200) })),
    ])
  );
  const metadata = {
    clientRequest: payload,
    providerRequest: payload,
    providerResponse: payload,
    clientResponse: payload,
  };
  const ceiling = 256 * 1024 * 1024;
  const oldestId = usage.trackPendingRequest("model", "provider", "oldest", true, metadata);
  assert.ok(oldestId);
  const perEntry = usage.getPendingRetainedBytes();
  assert.ok(perEntry > 10_000);
  for (let i = 1; (i + 1) * perEntry <= ceiling; i++) {
    usage.trackPendingRequest("model", "provider", `pressure-${i}`, true, metadata);
  }
  const oldest = usage.getPendingById().get(oldestId);
  assert.ok(oldest);
  oldest.startedAt = 0;
  const count = usage.getPendingById().size;
  const reloaded = await reloadUsage();
  reloaded.trackPendingRequest("model", "provider", "trigger", true, metadata);

  assert.equal(reloaded.getPendingById().has(oldestId), false, "oldest retained entry is evicted");
  assert.equal(reloaded.getPendingById().size, count);
  assert.equal(reloaded.getPendingRequests().byModel["model (provider)"], count);
  assert.equal(reloaded.getPendingRequests().byAccount.oldest, undefined);
  assert.equal(reloaded.getPendingRetainedBytes(), count * perEntry);
  assert.equal(usage.getPendingRetainedBytes(), reloaded.getPendingRetainedBytes());
  assert.ok(reloaded.getPendingRetainedBytes() <= ceiling);
});
