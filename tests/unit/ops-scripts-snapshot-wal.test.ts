// A WAL-mode database keeps committed data in storage.sqlite-wal until a checkpoint.
// A copy of storage.sqlite alone is therefore not a copy of the database. These tests pin
// the three places where bin/snapshot-data.sh and bin/restore-data.sh used to lose it.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const BIN = path.resolve(import.meta.dirname, "..", "..", "bin");

function findOnPath(name: string): string {
  for (const dir of (process.env.PATH ?? "").split(path.delimiter)) {
    const candidate = path.join(dir, name);
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(`${name} not found on PATH`);
}

/** A PATH holding the tools the scripts use and no sqlite3, to run the no-sqlite3 fallback. */
function pathWithoutSqlite3(root: string): string {
  const dir = path.join(root, "tools");
  fs.mkdirSync(dir);
  for (const tool of ["bash", "cp", "cmp", "mkdir", "rm", "rmdir", "date", "dirname", "basename"]) {
    fs.symlinkSync(findOnPath(tool), path.join(dir, tool));
  }
  return dir;
}

function run(script: string, args: string[], dataDir: string, toolPath?: string) {
  const env = { ...process.env, DATA_DIR: dataDir, ...(toolPath ? { PATH: toolPath } : {}) };
  const bash = toolPath ? path.join(toolPath, "bash") : "bash";
  return spawnSync(bash, [path.join(BIN, script), ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env,
  });
}

/** Open a WAL database whose rows stay in the WAL: the connection stays open, no checkpoint. */
function openWithWalRows(dataDir: string, rows: string[]) {
  const db = new Database(path.join(dataDir, "storage.sqlite"));
  db.pragma("journal_mode = WAL");
  db.pragma("wal_autocheckpoint = 0");
  db.exec("CREATE TABLE notes (v TEXT)");
  db.pragma("wal_checkpoint(TRUNCATE)"); // the table is in the main file; the rows below are not
  for (const v of rows) db.prepare("INSERT INTO notes VALUES (?)").run(v);
  return db;
}

function readNotes(file: string): string[] {
  const db = new Database(file);
  try {
    return (db.prepare("SELECT v FROM notes ORDER BY rowid").all() as { v: string }[]).map(
      (r) => r.v
    );
  } finally {
    db.close();
  }
}

function withTmp(fn: (root: string) => void) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "omni-ops-wal-"));
  try {
    fn(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

describe("snapshot-data.sh and restore-data.sh keep WAL data", () => {
  it("snapshot without sqlite3 refuses to label a main-file-only copy as a snapshot", () =>
    withTmp((root) => {
      const dataDir = path.join(root, "data");
      fs.mkdirSync(dataDir);
      const db = openWithWalRows(dataDir, ["in-wal"]);
      try {
        assert.ok(fs.statSync(path.join(dataDir, "storage.sqlite-wal")).size > 0);
        const r = run("snapshot-data.sh", [], dataDir, pathWithoutSqlite3(root));
        assert.notEqual(r.status, 0, `snapshot must fail closed, stdout=${r.stdout}`);
        assert.equal(r.stdout.trim(), "", "no snapshot id may be printed");
        assert.match(r.stderr, /sqlite3/);
        const backups = path.join(dataDir, "db_backups");
        const left = fs.existsSync(backups) ? fs.readdirSync(backups) : [];
        assert.deepEqual(left, [], "no half snapshot may stay behind");
      } finally {
        db.close();
      }
    }));

  it("snapshot without sqlite3 still works when nothing sits in the WAL", () =>
    withTmp((root) => {
      const dataDir = path.join(root, "data");
      fs.mkdirSync(dataDir);
      const db = openWithWalRows(dataDir, ["checkpointed"]);
      db.close(); // the last close checkpoints and removes the WAL
      const r = run("snapshot-data.sh", [], dataDir, pathWithoutSqlite3(root));
      assert.equal(r.status, 0, r.stderr);
      const id = r.stdout.trim();
      assert.deepEqual(
        readNotes(path.join(dataDir, "db_backups", `snapshot_${id}`, "storage.sqlite")),
        ["checkpointed"]
      );
    }));

  it("restore applies the WAL that a snapshot carries", () =>
    withTmp((root) => {
      const dataDir = path.join(root, "data");
      const snapDir = path.join(root, "snap");
      fs.mkdirSync(dataDir);
      fs.mkdirSync(snapDir);
      const db = openWithWalRows(dataDir, ["a", "b"]);
      try {
        // A snapshot an older script wrote: main file plus WAL.
        fs.copyFileSync(path.join(dataDir, "storage.sqlite"), path.join(snapDir, "storage.sqlite"));
        fs.copyFileSync(
          path.join(dataDir, "storage.sqlite-wal"),
          path.join(snapDir, "storage.sqlite-wal")
        );
      } finally {
        db.close();
      }
      fs.rmSync(path.join(dataDir, "storage.sqlite"), { force: true });
      fs.rmSync(path.join(dataDir, "storage.sqlite-wal"), { force: true });
      fs.rmSync(path.join(dataDir, "storage.sqlite-shm"), { force: true });
      fs.writeFileSync(path.join(dataDir, "storage.sqlite"), "live");
      const r = run("restore-data.sh", [snapDir, "--yes"], dataDir);
      assert.equal(r.status, 0, r.stderr);
      assert.deepEqual(readNotes(path.join(dataDir, "storage.sqlite")), ["a", "b"]);
    }));

  it("the pre-restore safety copy keeps the live WAL when it is copied by cp", () =>
    withTmp((root) => {
      const dataDir = path.join(root, "data");
      const snapDir = path.join(root, "snap");
      fs.mkdirSync(dataDir);
      fs.mkdirSync(snapDir);
      const snapDb = new Database(path.join(snapDir, "storage.sqlite"));
      snapDb.exec("CREATE TABLE notes (v TEXT); INSERT INTO notes VALUES ('snap')");
      snapDb.close();
      const db = openWithWalRows(dataDir, ["live-only-in-wal"]);
      try {
        // The live server is stopped in a real restore; here the open handle only holds the WAL.
        const r = run("restore-data.sh", [snapDir, "--yes"], dataDir, pathWithoutSqlite3(root));
        assert.equal(r.status, 0, r.stderr);
      } finally {
        db.close();
      }
      const safety = fs
        .readdirSync(path.join(dataDir, "db_backups"))
        .find((n) => n.startsWith("pre-restore_"));
      assert.ok(safety, "a safety copy must exist");
      assert.deepEqual(readNotes(path.join(dataDir, "db_backups", safety, "storage.sqlite")), [
        "live-only-in-wal",
      ]);
    }));
});
