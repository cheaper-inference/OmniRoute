/**
 * Contract of the quota counter repositories (Promise-based, SQLite implementation) and
 * of the facade wiring: the facades hand out the composition-root repositories, their
 * synchronous exports go through legacySync, and Promise and synchronous access share
 * one store. The repositories do not clamp, split or swallow errors; that stays in the
 * facades.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "quota-counters-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { quotaCounterRepositories } =
  await import("../../../src/lib/db/repositories/quotaCounterRepositories.ts");
const keyQuotaFacade = await import("../../../src/lib/db/keyQuota.ts");
const consumptionFacade = await import("../../../src/lib/db/quotaConsumption.ts");

const { keyQuotaCounters, quotaConsumption, legacySync } = quotaCounterRepositories;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

test("facades hand out the composition-root repositories", () => {
  assert.equal(keyQuotaFacade.getKeyQuotaCounterRepository(), keyQuotaCounters);
  assert.equal(consumptionFacade.getQuotaConsumptionRepository(), quotaConsumption);
});

test("key quota counters: add / read / pruneBefore / deleteForKey through Promises", async () => {
  assert.equal(await promised(keyQuotaCounters.read("k1", "key-quota:tpm", 10)), 0);
  assert.equal(await promised(keyQuotaCounters.add("k1", "key-quota:tpm", 10, 5, 1)), undefined);
  await keyQuotaCounters.add("k1", "key-quota:tpm", 10, 7, 2);
  assert.equal(await keyQuotaCounters.read("k1", "key-quota:tpm", 10), 12);

  for (const bucket of [5, 6, 7, 8, 9])
    await keyQuotaCounters.add("k1", "key-quota:tpm", bucket, 1, 1);
  await keyQuotaCounters.add("k1", "key-quota:rpm", 5, 1, 1);
  assert.equal(
    await promised(keyQuotaCounters.pruneBefore("k1", "key-quota:tpm", 9, 2)),
    undefined
  );
  const left = [5, 6, 7, 8];
  let remaining = 0;
  for (const bucket of left)
    remaining += await keyQuotaCounters.read("k1", "key-quota:tpm", bucket);
  assert.equal(remaining, 2, "pruneBefore deletes at most `limit` rows below the bound");
  assert.equal(await keyQuotaCounters.read("k1", "key-quota:tpm", 9), 1, "the bound is exclusive");
  assert.equal(await keyQuotaCounters.read("k1", "key-quota:rpm", 5), 1, "other dimensions stay");

  await keyQuotaCounters.add("k2", "key-quota:tpm", 10, 3, 1);
  assert.equal(await promised(keyQuotaCounters.deleteForKey("k1")), undefined);
  assert.equal(await keyQuotaCounters.read("k1", "key-quota:tpm", 10), 0);
  assert.equal(await keyQuotaCounters.read("k1", "key-quota:rpm", 5), 0);
  assert.equal(await keyQuotaCounters.read("k2", "key-quota:tpm", 10), 3);
});

test("key quota counters: concurrent adds to one bucket lose nothing", async () => {
  await Promise.all(
    Array.from({ length: 100 }, (_, i) => keyQuotaCounters.add("k1", "key-quota:rpm", 1, 1, i))
  );
  assert.equal(await keyQuotaCounters.read("k1", "key-quota:rpm", 1), 100);
});

test("quota consumption: add / read / sumAcrossKeys / listRecentForPool through Promises", async () => {
  assert.equal(await promised(quotaConsumption.read("k1", "p1:tokens:hourly", 3)), 0);
  assert.equal(
    await promised(quotaConsumption.add("k1", "p1:tokens:hourly", 3, 10, 100)),
    undefined
  );
  await quotaConsumption.add("k1", "p1:tokens:hourly", 3, -4, 200);
  await quotaConsumption.add("k2", "p1:tokens:hourly", 3, 1.5, 150);
  assert.equal(await quotaConsumption.read("k1", "p1:tokens:hourly", 3), 6);
  assert.equal(await promised(quotaConsumption.sumAcrossKeys("p1:tokens:hourly", 3)), 7.5);
  assert.equal(await quotaConsumption.sumAcrossKeys("p1:tokens:hourly", 4), 0);

  await quotaConsumption.add("k1", "p%1:tokens:hourly", 3, 1, 999);
  assert.deepEqual(await promised(quotaConsumption.listRecentForPool("p1", 10)), [
    {
      apiKeyId: "k1",
      dimensionKey: "p1:tokens:hourly",
      bucketIndex: 3,
      consumed: 6,
      updatedAt: 200,
    },
    {
      apiKeyId: "k2",
      dimensionKey: "p1:tokens:hourly",
      bucketIndex: 3,
      consumed: 1.5,
      updatedAt: 150,
    },
  ]);
  assert.equal((await quotaConsumption.listRecentForPool("p1", 1)).length, 1);
  assert.equal(
    (await quotaConsumption.listRecentForPool("p%1", 10)).length,
    1,
    "pool id is literal"
  );
});

test("Promise, legacySync and facade access share one store", async () => {
  await keyQuotaCounters.add("k1", "key-quota:tpm", 1, 1, 1);
  legacySync.keyQuotaCounters.add("k1", "key-quota:tpm", 1, 2, 1);
  keyQuotaFacade.incrementKeyQuotaCounter("k1", "tpm", 4, 1 * keyQuotaFacade.KEY_QUOTA_WINDOW_MS);
  assert.equal(await keyQuotaCounters.read("k1", "key-quota:tpm", 1), 7);
  assert.equal(legacySync.keyQuotaCounters.read("k1", "key-quota:tpm", 1), 7);

  await quotaConsumption.add("k1", "p1:tokens:hourly", 1, 1, 1);
  legacySync.quotaConsumption.add("k1", "p1:tokens:hourly", 1, 2, 1);
  consumptionFacade.incrementBucket("k1", "p1:tokens:hourly", 1, 4, 1);
  assert.equal(await quotaConsumption.read("k1", "p1:tokens:hourly", 1), 7);
  assert.equal(legacySync.quotaConsumption.read("k1", "p1:tokens:hourly", 1), 7);
  assert.equal(consumptionFacade.getBucket("k1", "p1:tokens:hourly", 1), 7);
  assert.equal(legacySync.quotaConsumption.deleteUpdatedBefore(2), 1);
  assert.equal(await quotaConsumption.read("k1", "p1:tokens:hourly", 1), 0);
});

test("repositories surface storage errors as rejected Promises", async () => {
  const db = core.getDbInstance();
  db.exec("DROP TABLE api_key_quota_counters");
  db.exec("DROP TABLE quota_consumption");
  await assert.rejects(keyQuotaCounters.add("k1", "key-quota:tpm", 1, 1, 1));
  await assert.rejects(keyQuotaCounters.read("k1", "key-quota:tpm", 1));
  await assert.rejects(keyQuotaCounters.pruneBefore("k1", "key-quota:tpm", 1, 1));
  await assert.rejects(keyQuotaCounters.deleteForKey("k1"));
  await assert.rejects(quotaConsumption.add("k1", "p1:tokens:hourly", 1, 1, 1));
  await assert.rejects(quotaConsumption.read("k1", "p1:tokens:hourly", 1));
  await assert.rejects(quotaConsumption.sumAcrossKeys("p1:tokens:hourly", 1));
  await assert.rejects(quotaConsumption.listRecentForPool("p1", 1));
});
