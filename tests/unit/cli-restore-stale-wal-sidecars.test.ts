// ENVIRONMENT NOTE: this test builds real better-sqlite3 databases. Skip it where the native
// addon cannot load (see tests/unit/_helpers/betterSqlite3Availability.ts).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import {
  betterSqlite3Available,
  BETTER_SQLITE3_SKIP_REASON,
} from "./_helpers/betterSqlite3Availability.ts";

const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  OMNIROUTE_BASE_URL: process.env.OMNIROUTE_BASE_URL,
};
const skip = betterSqlite3Available() ? false : BETTER_SQLITE3_SKIP_REASON;

const { runRestoreCommand } = await import("../../bin/cli/commands/backup.mjs");
const Database = skip ? null : (await import("better-sqlite3")).default;

function rowsOf(file: string): string[] {
  const db = new Database(file, { readonly: true });
  try {
    return (db.prepare("SELECT v FROM t ORDER BY v").all() as { v: string }[]).map((r) => r.v);
  } finally {
    db.close();
  }
}

function makeDb(file: string, values: string[]) {
  const db = new Database(file);
  db.exec("CREATE TABLE t (v TEXT)");
  const insert = db.prepare("INSERT INTO t (v) VALUES (?)");
  for (const v of values) insert.run(v);
  db.close();
}

// The state a killed server leaves: the main file is old, the -wal file holds a newer commit.
function makeCrashedLiveDb(dataDir: string) {
  const live = path.join(dataDir, "storage.sqlite");
  const scratch = path.join(dataDir, "scratch.sqlite");
  const db = new Database(scratch);
  db.pragma("journal_mode = WAL");
  db.pragma("wal_autocheckpoint = 0");
  db.exec("CREATE TABLE t (v TEXT)");
  db.prepare("INSERT INTO t (v) VALUES ('old')").run();
  db.pragma("wal_checkpoint(TRUNCATE)");
  db.prepare("INSERT INTO t (v) VALUES ('live-only')").run();
  fs.copyFileSync(scratch, live);
  fs.copyFileSync(`${scratch}-wal`, `${live}-wal`);
  db.close();
  fs.rmSync(scratch, { force: true });
  fs.rmSync(`${scratch}-wal`, { force: true });
  fs.rmSync(`${scratch}-shm`, { force: true });
  assert.ok(fs.statSync(`${live}-wal`).size > 0, "the fixture must leave a non-empty WAL");
  return live;
}

function withDataDir(fn: (dataDir: string, backupDir: string) => Promise<void>) {
  return async () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-restore-wal-"));
    process.env.DATA_DIR = dataDir;
    process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:9"; // nothing listens: the server is down
    const backupDir = path.join(dataDir, "backups", "omniroute-backup-b1");
    fs.mkdirSync(backupDir, { recursive: true });
    fs.writeFileSync(
      path.join(backupDir, "backup-info.json"),
      JSON.stringify({ timestamp: new Date().toISOString(), encrypted: false, files: [] })
    );
    const { log, error } = console;
    console.log = () => {};
    console.error = () => {};
    try {
      await fn(dataDir, backupDir);
    } finally {
      console.log = log;
      console.error = error;
      fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    }
  };
}

test(
  "restore removes the old WAL so it cannot replay over the restored database",
  { skip },
  withDataDir(async (dataDir, backupDir) => {
    const live = makeCrashedLiveDb(dataDir);
    makeDb(path.join(backupDir, "storage.sqlite"), ["restored"]);

    assert.equal(await runRestoreCommand("b1", { yes: true }), 0);

    assert.equal(fs.existsSync(`${live}-wal`), false, "the old -wal file must be gone");
    assert.deepEqual(rowsOf(live), ["restored"]);
  })
);

test(
  "restore refuses a corrupt backup database and leaves the live files alone",
  { skip },
  withDataDir(async (dataDir, backupDir) => {
    const live = makeCrashedLiveDb(dataDir);
    fs.writeFileSync(path.join(backupDir, "storage.sqlite"), Buffer.alloc(8192, 7));
    const before = fs.readFileSync(live);

    assert.equal(await runRestoreCommand("b1", { yes: true }), 1);

    assert.deepEqual(fs.readFileSync(live), before);
    assert.ok(fs.existsSync(`${live}-wal`));
  })
);

test(
  "restore refuses while the server answers on the configured address",
  { skip },
  withDataDir(async (dataDir, backupDir) => {
    const live = makeCrashedLiveDb(dataDir);
    makeDb(path.join(backupDir, "storage.sqlite"), ["restored"]);
    const before = fs.readFileSync(live);
    const server = http.createServer((_req, res) => res.end("{}"));
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    process.env.OMNIROUTE_BASE_URL = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
    try {
      assert.equal(await runRestoreCommand("b1", { yes: true }), 1);
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
    assert.deepEqual(fs.readFileSync(live), before);
  })
);
