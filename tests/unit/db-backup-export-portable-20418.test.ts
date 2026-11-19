// #20418 — `omniroute sync remote` uploads a copy of the database without the high-volume
// history tables (`usage_history`, `call_logs`). That copy comes from the same route as the
// dashboard's "Export database" download, so the scrub must be an explicit, Zod-validated
// opt-in (`?portable=true`): the default export stays a complete copy, and the scrub only
// ever runs on the exported temp copy, never on the live database.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import Database from "better-sqlite3";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-export-portable-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.JWT_SECRET = "export-portable-jwt-secret";
process.env.INITIAL_PASSWORD = "export-portable-password";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { stripPortableHistory } = await import("../../src/lib/db/backup.ts");
const route = await import("../../src/app/api/db-backups/export/route.ts");

const EXPORT_URL = "http://localhost:20128/api/db-backups/export";
const HISTORY_TABLES = ["usage_history", "call_logs"] as const;
const SQLITE_MAGIC = "SQLite format 3\u0000";

await updateSettings({ requireLogin: true });

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function seedLiveHistory(rows = 3): void {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  for (let i = 0; i < rows; i++) {
    db.prepare("INSERT INTO usage_history (provider, model, timestamp) VALUES (?, ?, ?)").run(
      "openai",
      "gpt-portable-test",
      now
    );
    db.prepare("INSERT INTO call_logs (id, timestamp, path, status) VALUES (?, ?, ?, ?)").run(
      `log-${randomUUID()}`,
      now,
      "/v1/chat/completions",
      200
    );
  }
}

function countRows(db: { prepare: (sql: string) => { get: () => unknown } }, table: string) {
  return (db.prepare(`SELECT COUNT(*) AS cnt FROM "${table}"`).get() as { cnt: number }).cnt;
}

function liveHistoryCounts(): Record<string, number> {
  const db = core.getDbInstance();
  return Object.fromEntries(HISTORY_TABLES.map((table) => [table, countRows(db, table)]));
}

type ExportSummary = {
  magic: string;
  integrity: string;
  counts: Record<string, number>;
};

/** Download the export to a temp file and summarize it: header, integrity and per-table rows. */
async function downloadExport(url: string): Promise<ExportSummary> {
  const response = await route.GET(await makeManagementSessionRequest(url));
  assert.equal(response.status, 200, `export should succeed: ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-export-portable-dl-"));
  const file = path.join(dir, "export.sqlite");
  try {
    fs.writeFileSync(file, bytes);
    const db = new Database(file, { readonly: true });
    try {
      const tables = (
        db
          .prepare(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'"
          )
          .all() as Array<{ name: string }>
      ).map((row) => row.name);
      return {
        magic: bytes.subarray(0, 16).toString("latin1"),
        integrity: db.pragma("integrity_check", { simple: true }) as string,
        counts: Object.fromEntries(tables.map((table) => [table, countRows(db, table)])),
      };
    } finally {
      db.close();
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("default export still carries usage_history and call_logs (dashboard contract unchanged)", async () => {
  seedLiveHistory();
  const live = liveHistoryCounts();
  assert.ok(live.usage_history > 0 && live.call_logs > 0, "fixture must seed history rows");

  for (const url of [EXPORT_URL, `${EXPORT_URL}?portable=false`]) {
    const full = await downloadExport(url);
    assert.equal(full.magic, SQLITE_MAGIC);
    assert.equal(full.integrity, "ok");
    for (const table of HISTORY_TABLES) {
      assert.equal(full.counts[table], live[table], `${url} must keep every ${table} row`);
    }
  }
});

test("?portable=true strips only the history tables and is still a valid SQLite snapshot", async () => {
  seedLiveHistory();
  const liveBefore = liveHistoryCounts();
  const full = await downloadExport(EXPORT_URL);
  const portable = await downloadExport(`${EXPORT_URL}?portable=true`);

  assert.equal(portable.magic, SQLITE_MAGIC, "the remote-sync CLI refuses non-SQLite bytes");
  assert.equal(portable.integrity, "ok");
  for (const table of HISTORY_TABLES) {
    assert.equal(portable.counts[table], 0, `portable export must empty ${table}`);
  }
  // Same schema, and every non-history table keeps all of its rows.
  assert.deepEqual(Object.keys(portable.counts).sort(), Object.keys(full.counts).sort());
  for (const [table, rows] of Object.entries(full.counts)) {
    if ((HISTORY_TABLES as readonly string[]).includes(table)) continue;
    assert.equal(portable.counts[table], rows, `portable export must keep ${table} intact`);
  }
  assert.ok(portable.counts._omniroute_migrations > 0, "migration history travels with the copy");

  // The scrub ran on the exported copy only.
  assert.deepEqual(liveHistoryCounts(), liveBefore, "the live database keeps its history");
});

test("an invalid portable value is a 400 without a stack trace", async () => {
  const response = await route.GET(
    await makeManagementSessionRequest(`${EXPORT_URL}?portable=yes`)
  );
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.deepEqual(body, { error: "Invalid export query" });
});

test("the portable export is still operator-only (auth runs before the query)", async () => {
  const response = await route.GET(new Request(`${EXPORT_URL}?portable=true`));
  await response.arrayBuffer().catch(() => undefined);
  assert.equal(response.status, 401);
});

test("stripPortableHistory empties the history tables, keeps the rest and vacuums the file", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-strip-portable-"));
  const file = path.join(dir, "copy.sqlite");
  try {
    const seed = new Database(file);
    seed.exec(`
      CREATE TABLE usage_history (id INTEGER PRIMARY KEY, payload TEXT);
      CREATE TABLE call_logs (id TEXT PRIMARY KEY, payload TEXT);
      CREATE TABLE provider_connections (id TEXT PRIMARY KEY, name TEXT);
    `);
    const filler = "x".repeat(512);
    const insertUsage = seed.prepare("INSERT INTO usage_history (payload) VALUES (?)");
    const insertLog = seed.prepare("INSERT INTO call_logs (id, payload) VALUES (?, ?)");
    seed.transaction(() => {
      for (let i = 0; i < 500; i++) {
        insertUsage.run(filler);
        insertLog.run(`log-${i}`, filler);
      }
    })();
    seed.prepare("INSERT INTO provider_connections (id, name) VALUES (?, ?)").run("c1", "kept");
    seed.close();
    const sizeBefore = fs.statSync(file).size;

    await stripPortableHistory(file);

    const check = new Database(file, { readonly: true });
    try {
      assert.equal(countRows(check, "usage_history"), 0);
      assert.equal(countRows(check, "call_logs"), 0);
      assert.deepEqual(check.prepare("SELECT id, name FROM provider_connections").all(), [
        { id: "c1", name: "kept" },
      ]);
      assert.equal(check.pragma("integrity_check", { simple: true }), "ok");
    } finally {
      check.close();
    }
    assert.ok(
      fs.statSync(file).size < sizeBefore,
      "VACUUM must give the freed history pages back (smaller bundle)"
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("stripPortableHistory refuses to run on the live database", async () => {
  seedLiveHistory(1);
  const before = liveHistoryCounts();
  await assert.rejects(() => stripPortableHistory(core.SQLITE_FILE as string), /live database/);
  assert.deepEqual(liveHistoryCounts(), before);
});
