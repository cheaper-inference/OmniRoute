import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "semantic-cache-prune-job-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const { startSemanticCachePruneJob, stopSemanticCachePruneJob } =
  await import("../../src/lib/jobs/semanticCachePruneJob.ts");
const intervalEnv = "OMNIROUTE_SEMANTIC_CACHE_PRUNE_INTERVAL_MS";
const savedInterval = process.env[intervalEnv];
const result = { expiredDeleted: 0, capDeleted: 0, batches: 1 };
const flush = () => new Promise<void>((resolve) => setImmediate(resolve));

test.afterEach(() => {
  stopSemanticCachePruneJob();
  if (savedInterval === undefined) delete process.env[intervalEnv];
  else process.env[intervalEnv] = savedInterval;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("interval zero creates neither startup nor recurring timer", (t) => {
  process.env[intervalEnv] = "0";
  const timeout = t.mock.method(globalThis, "setTimeout");
  const interval = t.mock.method(globalThis, "setInterval");
  assert.equal(startSemanticCachePruneJob(), null);
  assert.equal(timeout.mock.callCount(), 0);
  assert.equal(interval.mock.callCount(), 0);
});

test("start is idempotent and both timers are unref'd; stop cancels both", (t) => {
  process.env[intervalEnv] = "60000";
  const timeout = t.mock.method(globalThis, "setTimeout");
  const interval = t.mock.method(globalThis, "setInterval");
  const clearTimeoutMock = t.mock.method(globalThis, "clearTimeout");
  const clearIntervalMock = t.mock.method(globalThis, "clearInterval");
  const timer = startSemanticCachePruneJob();
  assert.equal(timer?.hasRef(), false);
  assert.equal(startSemanticCachePruneJob(), timer);
  assert.equal(interval.mock.callCount(), 1);
  assert.equal(timeout.mock.callCount(), 1);
  const startupTimer = timeout.mock.calls[0].result as NodeJS.Timeout;
  assert.equal(startupTimer.hasRef(), false);
  stopSemanticCachePruneJob();
  assert.equal(clearTimeoutMock.mock.calls[0].arguments[0], startupTimer);
  assert.equal(clearIntervalMock.mock.calls[0].arguments[0], timer);
});

test("runs shortly after start then periodically, never overlapping even across restart", async (t) => {
  process.env[intervalEnv] = "60000";
  t.mock.timers.enable({ apis: ["setTimeout", "setInterval"] });
  let runs = 0;
  let finish: () => void;
  const prune = async () => {
    runs++;
    await new Promise<void>((resolve) => {
      finish = resolve;
    });
    return result;
  };
  startSemanticCachePruneJob(prune);
  assert.equal(runs, 0);
  t.mock.timers.tick(1000);
  assert.equal(runs, 1);
  t.mock.timers.tick(60000);
  assert.equal(runs, 1);
  stopSemanticCachePruneJob();
  startSemanticCachePruneJob(prune);
  t.mock.timers.tick(1000);
  assert.equal(runs, 1);
  finish!();
  await flush();
  t.mock.timers.tick(60000);
  assert.equal(runs, 2);
  finish!();
  await flush();
});

test("logs and swallows errors and permits the next scheduled run", async (t) => {
  process.env[intervalEnv] = "60000";
  t.mock.timers.enable({ apis: ["setTimeout", "setInterval"] });
  const errors = t.mock.method(console, "error", () => {});
  let runs = 0;
  startSemanticCachePruneJob(async () => {
    runs++;
    throw new Error("synthetic failure");
  });
  t.mock.timers.tick(1000);
  await flush();
  assert.equal(errors.mock.callCount(), 1);
  t.mock.timers.tick(60000);
  await flush();
  assert.equal(runs, 2);
  assert.equal(errors.mock.callCount(), 2);
});

test("semantic cache consumer starts the same job on import", async (t) => {
  process.env[intervalEnv] = "60000";
  t.mock.timers.enable({ apis: ["setTimeout", "setInterval"] });
  const timeout = t.mock.method(globalThis, "setTimeout");
  await import("../../src/lib/semanticCache.ts");
  assert.equal(timeout.mock.callCount(), 1);
  stopSemanticCachePruneJob();
});
