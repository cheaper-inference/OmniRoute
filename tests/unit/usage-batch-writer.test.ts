// sub2api-76: opt-in batching of usage_history inserts (OMNIROUTE_USAGE_BATCH_WRITE=1). Rows queue and
// commit in ONE transaction (20 ms or 256 rows); off by default, a failing row does not drop its batch.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-batch-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const batch = await import("../../src/lib/usage/usageBatchWriter.ts").catch(() => null);

const FLAG = "OMNIROUTE_USAGE_BATCH_WRITE";
const count = () =>
  (core.getDbInstance().prepare("SELECT COUNT(*) AS n FROM usage_history").get() as { n: number })
    .n;

function entry(i: number, extra: Record<string, unknown> = {}) {
  return {
    provider: "openai",
    model: "gpt-batch",
    connectionId: `conn-${i}`,
    apiKeyId: `key-${i}`,
    apiKeyName: `Key ${i}`,
    tokens: { input: 10 + i, output: 5 },
    success: true,
    latencyMs: 50,
    timestamp: new Date(Date.now() - i * 1000).toISOString(),
    ...extra,
  };
}

test.beforeEach(async () => {
  delete process.env[FLAG];
  await batch?.flushUsageBatch?.();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});
test.after(async () => {
  delete process.env[FLAG];
  await batch?.flushUsageBatch?.();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("flag off (default): a row is written before saveRequestUsage returns", async () => {
  await usageHistory.saveRequestUsage(entry(1));
  assert.equal(count(), 1);
});

test("flag on: rows wait in the queue, then one flush writes all of them", async () => {
  assert.ok(batch, "usageBatchWriter module exists");
  process.env[FLAG] = "1";
  for (let i = 0; i < 5; i++) await usageHistory.saveRequestUsage(entry(i));
  assert.equal(count(), 0, "rows are queued, not yet written");
  const flushed = await batch.flushUsageBatch();
  assert.equal(flushed, 5);
  assert.equal(count(), 5);
  const row = core
    .getDbInstance()
    .prepare("SELECT * FROM usage_history WHERE connection_id = 'conn-3'")
    .get() as Record<string, unknown>;
  assert.equal(row.tokens_input, 13);
  assert.equal(row.api_key_id, "key-3");
});

test("flag on: the timer flushes a quiet queue within about 20 ms", async () => {
  process.env[FLAG] = "1";
  await usageHistory.saveRequestUsage(entry(1));
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.equal(count(), 1);
});

test("flag on: a full queue (256 rows) flushes at once without waiting for the timer", async () => {
  process.env[FLAG] = "1";
  for (let i = 0; i < 300; i++) await usageHistory.saveRequestUsage(entry(i));
  assert.equal(count(), 256, "the first 256 rows are written when the queue fills");
  await batch.flushUsageBatch();
  assert.equal(count(), 300);
});

test("flag on: the duplicate guard still applies inside a batch", async () => {
  process.env[FLAG] = "1";
  const e = entry(7);
  await usageHistory.saveRequestUsage(e);
  await usageHistory.saveRequestUsage({ ...e });
  await batch.flushUsageBatch();
  assert.equal(count(), 1);
});

test("flag on: one failing row is logged and the other rows of its batch are kept", async () => {
  process.env[FLAG] = "1";
  const seen: string[] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => void seen.push(args.map(String).join(" "));
  try {
    await usageHistory.saveRequestUsage(entry(1));
    await usageHistory.saveRequestUsage(
      entry(2, {
        tokens: {
          get input() {
            throw new Error("synthetic row failure");
          },
        },
      })
    );
    await usageHistory.saveRequestUsage(entry(3));
    await batch.flushUsageBatch();
  } finally {
    console.error = original;
  }
  assert.equal(count(), 2);
  assert.ok(
    seen.some((line) => line.includes("synthetic row failure")),
    seen.join("\n")
  );
  assert.equal(batch.getUsageBatchStats().failed, 1);
});

test("flushUsageBatch on an empty queue returns 0", async () => {
  assert.equal(await batch.flushUsageBatch(), 0);
});
