import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-resilience-memo-17153-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = dataDir;

const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
const { getCachedSettings, invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  invalidateDbCache("settings");
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

function settingsWithConcurrency(concurrentRequests: number) {
  return { resilienceSettings: { requestQueue: { concurrentRequests } } };
}

test("same settings reference reuses the normalized snapshot and nested profiles", () => {
  const input = settingsWithConcurrency(7);
  const first = resolveResilienceSettings(input);
  const second = resolveResilienceSettings(input);
  assert.equal(first.requestQueue.concurrentRequests, 7);
  assert.strictEqual(second, first);
  assert.strictEqual(second.connectionCooldown.oauth, first.connectionCooldown.oauth);
});

test("equal values in a new settings object get an independent normalized snapshot", () => {
  const first = resolveResilienceSettings(settingsWithConcurrency(7));
  const second = resolveResilienceSettings(settingsWithConcurrency(7));
  assert.deepEqual(second, first);
  assert.notStrictEqual(second, first);
  assert.notStrictEqual(second.requestQueue, first.requestQueue);
  assert.equal(
    resolveResilienceSettings(settingsWithConcurrency(13)).requestQueue.concurrentRequests,
    13
  );
});

test("null, undefined and empty settings preserve defaults without sharing mutable results", () => {
  const empty = resolveResilienceSettings({});
  const missing = resolveResilienceSettings(undefined);
  const nullInput = resolveResilienceSettings(null);
  assert.deepEqual(missing, empty);
  assert.deepEqual(nullInput, empty);
  assert.notStrictEqual(missing, nullInput);
  missing.requestQueue.concurrentRequests = 999;
  assert.deepEqual(resolveResilienceSettings(undefined), empty);
  assert.deepEqual(resolveResilienceSettings(null), empty);
});

test("normalization accepts frozen input and does not mutate the supplied settings", () => {
  const requestQueue = Object.freeze({ concurrentRequests: 7 });
  const input = Object.freeze({ resilienceSettings: Object.freeze({ requestQueue }) });
  const before = JSON.stringify(input);
  assert.equal(resolveResilienceSettings(input).requestQueue.concurrentRequests, 7);
  assert.equal(JSON.stringify(input), before);
  assert.notStrictEqual(resolveResilienceSettings(input).requestQueue, requestQueue);
});

test("in-place input mutation is not invalidation: callers must supply a new snapshot", () => {
  const input = settingsWithConcurrency(7);
  const first = resolveResilienceSettings(input);
  input.resilienceSettings.requestQueue.concurrentRequests = 13;
  assert.strictEqual(resolveResilienceSettings(input), first);
  assert.equal(first.requestQueue.concurrentRequests, 7);
  assert.equal(
    resolveResilienceSettings(structuredClone(input)).requestQueue.concurrentRequests,
    13
  );
});

test("cached output is shared: mutate a clone to keep subsequent readers unchanged", () => {
  const input = settingsWithConcurrency(7);
  const first = resolveResilienceSettings(input);
  const editable = structuredClone(first);
  editable.requestQueue.concurrentRequests = 13;
  assert.equal(resolveResilienceSettings(input).requestQueue.concurrentRequests, 7);

  // Characterize the read-only caller contract; this cache does not freeze its output.
  first.requestQueue.concurrentRequests = 19;
  assert.equal(resolveResilienceSettings(input).requestQueue.concurrentRequests, 19);
  assert.equal(input.resilienceSettings.requestQueue.concurrentRequests, 7);
  assert.equal(
    resolveResilienceSettings(structuredClone(input)).requestQueue.concurrentRequests,
    7
  );
});

test("real settings writes invalidate the DB cache and normalize a new reference immediately", async () => {
  await updateSettings(settingsWithConcurrency(7));
  const before = await getCachedSettings();
  assert.strictEqual(await getCachedSettings(), before);
  const first = resolveResilienceSettings(before);
  assert.equal(first.requestQueue.concurrentRequests, 7);
  assert.strictEqual(resolveResilienceSettings(await getCachedSettings()), first);

  await updateSettings(settingsWithConcurrency(13));
  const after = await getCachedSettings();
  assert.notStrictEqual(after, before);
  const second = resolveResilienceSettings(after);
  assert.notStrictEqual(second, first);
  assert.equal(second.requestQueue.concurrentRequests, 13);
  assert.strictEqual(resolveResilienceSettings(await getCachedSettings()), second);
  assert.equal(first.requestQueue.concurrentRequests, 7);
  assert.strictEqual(resolveResilienceSettings(before), first);
});
