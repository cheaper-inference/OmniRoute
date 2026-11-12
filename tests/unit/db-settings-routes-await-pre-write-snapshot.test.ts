import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-prewrite-dbsettings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "prewrite-dbsettings-api-key-secret";
delete process.env.INITIAL_PASSWORD;
// Setup writes below must not take snapshots; the env switch is lifted right before each probe.
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const backupDb = await import("../../src/lib/db/backup.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");
const databaseRoute = await import("../../src/app/api/settings/database/route.ts");
const cacheConfigRoute = await import("../../src/app/api/settings/cache-config/route.ts");
const logsDetailRoute = await import("../../src/app/api/logs/detail/route.ts");
const { tryOpenSync } = await import("../../src/lib/db/adapters/driverFactory.ts");

const DAY_MS = 24 * 60 * 60 * 1000;
let probeNumber = 0;

// `backupDbFile` is off in every test process. Lift that for one call, then restore it.
// Each probe also moves the clock one day on, so the hourly throttle and the daily
// frequency gate of the earlier probe do not skip this one.
async function withRoutineBackupsOn<T>(fn: () => Promise<T>): Promise<T> {
  const saved = {
    argv: [...process.argv],
    execArgv: [...process.execArgv],
    env: process.env.NODE_ENV,
    testContext: process.env.NODE_TEST_CONTEXT,
    jestWorker: process.env.JEST_WORKER_ID,
    now: Date.now,
  };
  const offset = DAY_MS * 2 * ++probeNumber;
  delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
  process.env.NODE_ENV = "production";
  // The node:test child marker and a Jest worker id also mark a test run.
  delete process.env.NODE_TEST_CONTEXT;
  delete process.env.JEST_WORKER_ID;
  process.argv.splice(0, process.argv.length, process.execPath, "/opt/app/server.js");
  process.execArgv.length = 0;
  Date.now = () => saved.now() + offset;
  try {
    return await fn();
  } finally {
    Date.now = saved.now;
    process.argv.splice(0, process.argv.length, ...saved.argv);
    process.execArgv.push(...saved.execArgv);
    if (saved.env === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = saved.env;
    if (saved.testContext === undefined) delete process.env.NODE_TEST_CONTEXT;
    else process.env.NODE_TEST_CONTEXT = saved.testContext;
    if (saved.jestWorker === undefined) delete process.env.JEST_WORKER_ID;
    else process.env.JEST_WORKER_ID = saved.jestWorker;
    process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
  }
}

function clearBackups() {
  fs.rmSync(core.DB_BACKUPS_DIR as string, { recursive: true, force: true });
}

// The newest backup file; a fire-and-forget copy needs a moment to land, an awaited one is done.
async function newestSnapshotValue(key: string): Promise<unknown> {
  const deadline = Date.now() + 5000;
  let list = await backupDb.listDbBackups();
  while (list.length === 0 && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    list = await backupDb.listDbBackups();
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  list = await backupDb.listDbBackups();
  assert.ok(list.length >= 1, "a pre-write snapshot must exist");
  const snap = tryOpenSync(path.join(core.DB_BACKUPS_DIR as string, list[0].filename), {
    readonly: true,
  });
  assert.ok(snap, "snapshot must open");
  try {
    const row = snap!
      .prepare("SELECT value FROM key_value WHERE namespace = 'databaseSettings' AND key = ?")
      .get(key) as { value: string } | undefined;
    return row ? JSON.parse(row.value) : undefined;
  } finally {
    snap!.close();
  }
}

function jsonRequest(url: string, method: string, body: unknown): NextRequest {
  return new NextRequest(url, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test.beforeEach(() => {
  clearBackups();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("setup: routine backups are on and the probe values are stored", () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "daily", keepLastNBackups: 5 },
    logs: { ...databaseSettings.getUserDatabaseSettings().logs, maxDetailSizeKb: 111 },
    cache: { ...databaseSettings.getUserDatabaseSettings().cache, semanticCacheMaxSize: 222 },
  });
  const settings = databaseSettings.getUserDatabaseSettings();
  assert.equal(settings.logs.maxDetailSizeKb, 111);
  assert.equal(settings.cache.semanticCacheMaxSize, 222);
});

test("PATCH /api/settings/database: the pre-write snapshot holds the value from before the write", async () => {
  const logs = databaseSettings.getUserDatabaseSettings().logs;
  const res = await withRoutineBackupsOn(() =>
    databaseRoute.PATCH(
      jsonRequest("http://localhost/api/settings/database", "PATCH", {
        logs: { ...logs, maxDetailSizeKb: 333 },
      })
    )
  );
  assert.equal(res.status, 200);
  assert.equal(databaseSettings.getUserDatabaseSettings().logs.maxDetailSizeKb, 333);
  assert.equal(
    await newestSnapshotValue("logs.maxDetailSizeKb"),
    111,
    "snapshot must predate the write"
  );
});

test("PUT /api/settings/cache-config: the pre-write snapshot holds the value from before the write", async () => {
  const res = await withRoutineBackupsOn(() =>
    cacheConfigRoute.PUT(
      jsonRequest("http://localhost/api/settings/cache-config", "PUT", {
        semanticCacheMaxSize: 444,
      })
    )
  );
  assert.equal(res.status, 200);
  assert.equal(databaseSettings.getUserDatabaseSettings().cache.semanticCacheMaxSize, 444);
  assert.equal(
    await newestSnapshotValue("cache.semanticCacheMaxSize"),
    222,
    "snapshot must predate the write"
  );
});

// Guard, not a RED test: updateSettings() already awaits a pre-write snapshot before this route
// reaches updateDatabaseSettings(), so the route needs no call of its own.
test("POST /api/logs/detail: the pre-write snapshot holds the pipeline flag from before the write", async () => {
  const res = await withRoutineBackupsOn(() =>
    logsDetailRoute.POST(jsonRequest("http://localhost/api/logs/detail", "POST", { enabled: true }))
  );
  assert.equal(res.status, 200);
  assert.equal(databaseSettings.getUserDatabaseSettings().logs.callLogPipelineEnabled, true);
  assert.equal(
    await newestSnapshotValue("logs.callLogPipelineEnabled"),
    false,
    "snapshot must predate the write"
  );
});
