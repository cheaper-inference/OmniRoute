/**
 * #18678: the spend batch writer was a module-scope singleton. Next bundles instrumentation (which
 * registers graceful shutdown) separately from the API routes (which record costs), so
 * each bundle got its own writer: routes buffered cost entries in theirs, the SIGTERM
 * cleanup flushed the other (empty) one, and every entry recorded in the last flush
 * interval (60 s by default) was lost on a graceful restart. Two query-string imports load
 * two copies of the module, the way two bundles do.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-spend-shared-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const costRules = await import("../../src/domain/costRules.ts");
const routeCopy = await import("../../src/lib/spend/batchWriter.ts?copy=route-bundle");
const shutdownCopy = await import("../../src/lib/spend/batchWriter.ts?copy=instrumentation-bundle");

test.after(() => {
  routeCopy.resetSpendBatchWriterForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("every copy of the batch writer module shares one writer", () => {
  assert.notEqual(routeCopy, shutdownCopy, "the two imports must be separate module copies");
  assert.equal(routeCopy.spendBatchWriter, shutdownCopy.spendBatchWriter);
});

test("a cost buffered through one module copy is persisted by a flush through another", async () => {
  routeCopy.spendBatchWriter.increment("key-shared", 0.0135);

  const result = await shutdownCopy.flushSpendBatchWriter();

  assert.equal(result.flushedEntries, 1);
  assert.equal(routeCopy.spendBatchWriter.getPendingCostTotal("key-shared"), 0);
  assert.ok(Math.abs(costRules.getDailyTotal("key-shared") - 0.0135) < 1e-9);
});
