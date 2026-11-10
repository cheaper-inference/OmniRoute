import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import Database from "better-sqlite3";
import { classifyProbeFailure, retryProbeIfTransient } from "../../src/lib/db/probeUtils.ts";

const serial = { concurrency: false };
const originalDataDir = process.env.DATA_DIR;
const dirs: string[] = [];

function tmp(prefix: string) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  dirs.push(d);
  return d;
}
function sha(file: string) {
  return fs.existsSync(file)
    ? crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex")
    : null;
}
function probeFailedFiles(dir: string) {
  return fs.readdirSync(dir).filter((n) => n.startsWith("storage.sqlite.probe-failed-"));
}
function realReadonlyError(): Error {
  const dir = tmp("om-17995-ro-");
  const db = new Database(path.join(dir, "x.sqlite"));
  db.exec("CREATE TABLE t(v)");
  db.exec("INSERT INTO t VALUES('s')");
  db.pragma("query_only=ON");
  try {
    db.exec("UPDATE t SET v='changed'");
  } catch (e) {
    db.close();
    return e as Error;
  }
  throw new Error("no readonly error produced");
}
function seedHealthyDb(file: string) {
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.exec("CREATE TABLE sentinel(v TEXT)");
  db.exec("INSERT INTO sentinel VALUES('alive')");
  db.pragma("wal_checkpoint(TRUNCATE)");
  db.close();
}
async function bootWithProbeError(dataDir: string, make: () => Error) {
  const orig = Database.prototype.prepare;
  process.env.DATA_DIR = dataDir;
  Database.prototype.prepare = function patched(sql: string, ...a: unknown[]) {
    if (String(sql).includes("schema_migrations")) throw make();
    return (orig as unknown as (...args: unknown[]) => unknown).call(this, sql, ...a);
  } as unknown as typeof Database.prototype.prepare;
  try {
    const url = pathToFileURL(path.resolve("src/lib/db/core.ts")).href;
    const core = (await import(`${url}?t=${Date.now()}-${Math.random()}`)) as {
      getDbInstance: () => unknown;
      resetDbInstance: () => void;
    };
    let thrown: unknown = null;
    try {
      core.getDbInstance();
    } catch (e) {
      thrown = e;
    }
    try {
      core.resetDbInstance();
    } catch {}
    return thrown;
  } finally {
    Database.prototype.prepare = orig;
  }
}

test.after(() => {
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  for (const d of dirs) fs.rmSync(d, { recursive: true, force: true });
});

test("classifier: real SQLITE_READONLY error must not be treated as corruption", serial, () => {
  const err = realReadonlyError();
  assert.match(
    String((err as Error & { code?: string }).code ?? err.message),
    /READONLY|readonly/i
  );
  // READONLY is not corruption: the probe must not reach the rename branch.
  // Today isTransientProbeError() is false, so retryProbeIfTransient() returns false immediately
  // and core.ts renames the DB.
  assert.equal(classifyProbeFailure(err), "readonly");
});

test("core: READONLY probe error leaves healthy storage.sqlite in place", serial, async () => {
  const dir = tmp("om-17995-core-ro-");
  const file = path.join(dir, "storage.sqlite");
  seedHealthyDb(file);
  const err = realReadonlyError();
  await bootWithProbeError(dir, () => err);
  assert.deepEqual(probeFailedFiles(dir), [], "healthy DB was renamed to probe-failed-*");
  assert.equal(fs.existsSync(file), true);
});

test("probeUtils: exhausted BUSY retries must not be reported as corruption", serial, () => {
  const busy = new Error("database is locked") as Error & { code?: string };
  busy.code = "SQLITE_BUSY";
  let attempts = 0;
  const result: unknown = retryProbeIfTransient(
    "/nonexistent/storage.sqlite",
    busy,
    () => {
      attempts += 1;
      throw busy;
    },
    () => {}
  );
  assert.equal(attempts, 3, "all three retries were attempted");
  // Today this is the boolean `false`, which core.ts reads as "corrupt -> rename the DB".
  // A typed result (recovered / transient_exhausted / corrupt) is required.
  assert.equal(result, "transient_exhausted");
});

test("control: genuinely non-SQLite bytes still preserve a preimage", serial, async () => {
  const dir = tmp("om-17995-core-corrupt-");
  const file = path.join(dir, "storage.sqlite");
  fs.writeFileSync(file, Buffer.from("this is definitely not a sqlite database ".repeat(200)));
  const before = sha(file);
  await bootWithProbeError(dir, () => new Error("file is not a database"));
  const backups = probeFailedFiles(dir);
  assert.equal(backups.length >= 1, true);
  assert.equal(sha(path.join(dir, backups[0])), before);
});
