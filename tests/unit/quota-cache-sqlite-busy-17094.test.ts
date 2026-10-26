import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-busy-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const quota = await import("../../src/domain/quotaCache.ts");
const { runQuotaSnapshotCleanup, SNAPSHOT_CLEANUP_BACKOFF_MS } =
  await import("../../src/domain/quotaSnapshotCleanup.ts");

const busy = () => Object.assign(new Error("database is locked"), { code: "SQLITE_BUSY" });

test.after(() => {
  quota.stopBackgroundRefresh();
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("#17094 a locked snapshot cleanup in the background tick is retried and never crashes", async () => {
  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => unknown };
  const prepare = db.prepare.bind(db);
  let locked = true;
  let deletes = 0;
  db.prepare = (sql: string) => {
    if (!sql.startsWith("DELETE FROM quota_snapshots")) return prepare(sql);
    return {
      run: (...args: unknown[]) => {
        deletes++;
        if (locked) throw busy();
        return (prepare(sql) as { run: (...a: unknown[]) => unknown }).run(...args);
      },
    };
  };
  const rejections: unknown[] = [];
  const onRejection = (reason: unknown) => rejections.push(reason);
  process.on("unhandledRejection", onRejection);
  const warn = mock.method(console, "warn", () => {});
  mock.timers.enable({ apis: ["setInterval"] });
  const settle = () => new Promise((resolve) => setTimeout(resolve, 1600));
  try {
    quota.startBackgroundRefresh();
    mock.timers.tick(60_000);
    await settle();
    assert.deepEqual(rejections, []);
    assert.equal(deletes, SNAPSHOT_CLEANUP_BACKOFF_MS.length + 1);
    assert.match(String(warn.mock.calls.at(-1)?.arguments[0]), /Snapshot cleanup failed/);

    // The throttle did not move, so the next tick runs the cleanup again once the lock clears.
    locked = false;
    mock.timers.tick(60_000);
    await settle();
    assert.deepEqual(rejections, []);
    assert.equal(deletes, SNAPSHOT_CLEANUP_BACKOFF_MS.length + 2);
  } finally {
    quota.stopBackgroundRefresh();
    mock.timers.reset();
    warn.mock.restore();
    process.off("unhandledRejection", onRejection);
    db.prepare = prepare;
  }
});

test("#17094 cleanup retries only lock errors, with bounded backoff", async () => {
  const warn = mock.method(console, "warn", () => {});
  try {
    const waits: number[] = [];
    const sleep = async (ms: number) => void waits.push(ms);
    let calls = 0;
    const ok = await runQuotaSnapshotCleanup({
      sleep,
      cleanup: () => {
        if (++calls === 1) throw busy();
        return 0;
      },
    });
    assert.equal(ok, true);
    assert.deepEqual(waits, [SNAPSHOT_CLEANUP_BACKOFF_MS[0]]);

    waits.length = 0;
    const stillLocked = await runQuotaSnapshotCleanup({
      sleep,
      cleanup: () => {
        throw busy();
      },
    });
    assert.equal(stillLocked, false);
    assert.deepEqual(waits, [...SNAPSHOT_CLEANUP_BACKOFF_MS]);

    waits.length = 0;
    const broken = await runQuotaSnapshotCleanup({
      sleep,
      cleanup: () => {
        throw new Error("disk I/O error");
      },
    });
    assert.equal(broken, false);
    assert.deepEqual(waits, []);
    assert.equal(warn.mock.callCount(), 2);
  } finally {
    warn.mock.restore();
  }
});
