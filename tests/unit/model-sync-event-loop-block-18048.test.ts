/**
 * #18048 — model-sync hogs the CPU and starves the event loop.
 *
 * With ~100 auto-sync connections, every changed sync schedules
 * `runContextWindowReconcile()`, which loads EVERY synced catalog of EVERY provider
 * and resolves capabilities per model synchronously. That single synchronous pass
 * blocks the Node event loop, so the loopback self-fetches of the same model-sync cycle
 * ("Direct response did not start within 30000ms") and every client request stall.
 *
 * Contract: the reconcile must yield to the event loop (no single block > BLOCK_BUDGET_MS).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-18048-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-secret-18048";
process.env.OMNIROUTE_DISABLE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const resolver = await import("../../src/lib/contextWindowResolver.ts");
const persistence = await import("../../src/lib/db/models/syncedAvailableModelPersistence.ts");

const CONNECTIONS = 10;
const MODELS_PER_CONNECTION = 200;
const BLOCK_BUDGET_MS = 1500;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("reconcile after a 10-connection sync does not block the event loop (#18048)", async () => {
  for (let c = 0; c < CONNECTIONS; c++) {
    const provider = `openai-compatible-chat-${c}`;
    const list = Array.from({ length: MODELS_PER_CONNECTION }, (_, i) => ({
      id: `vendor-${c}/model-${i}`,
      name: `model-${i}`,
      contextWindow: 8192 + (i % 7) * 1024,
    }));
    await models.replaceSyncedAvailableModelsForConnection(provider, `conn-${c}`, list);
  }
  // let the opportunistic reconciles scheduled by the writes drain before measuring
  await new Promise((r) => setTimeout(r, 50));

  // Warm-up pass: pins every window (disk writes + one-time catalog build). The measured pass
  // below is then pure scanning, which is what starved the loop in #18048 and is disk-jitter free.
  await resolver.runContextWindowReconcile();

  let maxLag = 0;
  let last = performance.now();
  const timer = setInterval(() => {
    const now = performance.now();
    maxLag = Math.max(maxLag, now - last - 10);
    last = now;
  }, 10);

  const t0 = performance.now();
  const result = await resolver.runContextWindowReconcile();
  const total = performance.now() - t0;
  await new Promise((r) => setTimeout(r, 20));
  clearInterval(timer);

  console.log(
    `reconcile scanned=${result.scanned} written=${result.written} total=${Math.round(total)}ms maxEventLoopLag=${Math.round(maxLag)}ms`
  );
  assert.ok(result.scanned >= CONNECTIONS * MODELS_PER_CONNECTION);
  assert.ok(
    maxLag < BLOCK_BUDGET_MS,
    `event loop blocked for ${Math.round(maxLag)}ms (budget ${BLOCK_BUDGET_MS}ms)`
  );
});

test("post-sync scheduling collapses a burst into one debounced, provider-scoped pass (#18048)", () => {
  persistence.cancelPendingPostSyncReconcile();
  for (let i = 0; i < 5; i++) persistence.scheduleReconcileAfterSyncWrite("prov-a", 60_000);
  persistence.scheduleReconcileAfterSyncWrite("prov-b", 60_000);
  assert.deepEqual(persistence.getPendingPostSyncReconcileProviders().sort(), ["prov-a", "prov-b"]);
  persistence.cancelPendingPostSyncReconcile();
  assert.deepEqual(persistence.getPendingPostSyncReconcileProviders(), []);
});

test("a changed write schedules only its provider; a window-neutral write schedules nothing (#18048)", () => {
  persistence.cancelPendingPostSyncReconcile();
  const norm = (m: unknown) => (Array.isArray(m) ? (m as { id: string }[]) : []);
  const key = "solo-provider:conn-1";
  persistence.persistCanonicalSyncedAvailableModels(key, [{ id: "m1", contextWindow: 4096 }], norm);
  assert.deepEqual(persistence.getPendingPostSyncReconcileProviders(), ["solo-provider"]);
  persistence.cancelPendingPostSyncReconcile();
  // same windows, extra model without a window: catalog changes but no window did
  persistence.persistCanonicalSyncedAvailableModels(
    key,
    [{ id: "m1", contextWindow: 4096 }, { id: "m2" }],
    norm
  );
  assert.deepEqual(persistence.getPendingPostSyncReconcileProviders(), []);
  persistence.cancelPendingPostSyncReconcile();
});

test("provider-scoped reconcile scans only that provider (#18048)", async () => {
  const all = await resolver.runContextWindowReconcile();
  const scoped = await resolver.runContextWindowReconcile({
    providers: ["openai-compatible-chat-3"],
  });
  assert.equal(scoped.scanned, MODELS_PER_CONNECTION);
  assert.ok(all.scanned > scoped.scanned);
});
