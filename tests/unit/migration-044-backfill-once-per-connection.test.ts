import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const SQL = fs.readFileSync(
  fileURLToPath(
    new URL("../../src/lib/db/migrations/044_usage_history_api_key_backfill.sql", import.meta.url)
  ),
  "utf8"
);

type Row = [connection: string | null, keyId: string | null, keyName: string | null];

// `connection_id` is a generated column that calls a counting function, so the
// counter is the number of times the migration reads a row's connection: a
// deterministic measure of the scan work, with no clock in the test.
function seed(rows: Row[]) {
  const db = new Database(":memory:");
  const counter = { reads: 0 };
  db.function("count_read", { deterministic: true }, (value: unknown) => {
    counter.reads += 1;
    return value;
  });
  db.exec(`CREATE TABLE usage_history (
    id INTEGER PRIMARY KEY,
    raw_connection TEXT,
    connection_id TEXT GENERATED ALWAYS AS (count_read(raw_connection)) VIRTUAL,
    api_key_id TEXT,
    api_key_name TEXT,
    timestamp TEXT NOT NULL DEFAULT 't'
  )`);
  const insert = db.prepare(
    "INSERT INTO usage_history (raw_connection, api_key_id, api_key_name) VALUES (?, ?, ?)"
  );
  for (const row of rows) insert.run(...row);
  counter.reads = 0;
  return { db, counter };
}

function backfilled(rows: Row[]) {
  const { db } = seed(rows);
  db.exec(SQL);
  const out = db
    .prepare(
      "SELECT id, api_key_id AS keyId, api_key_name AS keyName FROM usage_history ORDER BY id"
    )
    .all();
  db.close();
  return out;
}

test("migration 044 reads each history row a bounded number of times, not once per missing row", () => {
  const rows: Row[] = [];
  for (let i = 0; i < 100; i += 1) rows.push(["conn-a", "key-1", "Alpha"]);
  for (let i = 0; i < 100; i += 1) rows.push(["conn-a", null, null]);
  const { db, counter } = seed(rows);
  db.exec(SQL);
  const reads = counter.reads;
  const missingLeft = db
    .prepare(
      "SELECT COUNT(*) AS n FROM usage_history WHERE api_key_name IS NULL OR api_key_name = ''"
    )
    .get() as { n: number };
  db.close();
  assert.equal(missingLeft.n, 0, "every missing row is still filled");
  assert.ok(reads <= 10 * rows.length, `read ${reads} connection values for ${rows.length} rows`);
});

test("migration 044 fills a missing row with the connection's most used key name and id", () => {
  const out = backfilled([
    ["c1", "id-a", "Alpha"],
    ["c1", "id-a", "Alpha"],
    ["c1", "id-b", "Beta"],
    ["c1", null, null],
    ["c2", "id-z", "Zeta"],
    ["c2", "", ""],
  ]);
  assert.deepEqual(out[3], { id: 4, keyId: "id-a", keyName: "Alpha" });
  assert.deepEqual(out[5], { id: 6, keyId: "id-z", keyName: "Zeta" });
});

test("migration 044 picks the name and the id independently and leaves other rows alone", () => {
  const out = backfilled([
    ["c1", "id-a", "Alpha"],
    ["c1", "id-a", null],
    ["c1", "id-b", null],
    ["c1", null, ""],
    [null, "id-x", null],
    ["c3", null, null],
  ]);
  assert.deepEqual(out[0], { id: 1, keyId: "id-a", keyName: "Alpha" });
  assert.deepEqual(out[1], { id: 2, keyId: "id-a", keyName: "Alpha" });
  assert.deepEqual(out[2], { id: 3, keyId: "id-a", keyName: "Alpha" });
  assert.deepEqual(out[3], { id: 4, keyId: "id-a", keyName: "Alpha" }, "id is also refilled");
  assert.deepEqual(out[4], { id: 5, keyId: "id-x", keyName: null }, "no connection: untouched");
  assert.deepEqual(out[5], { id: 6, keyId: null, keyName: null }, "no key anywhere: stays empty");
});

test("migration 044 breaks a count tie by the greater name, and is safe to run twice", () => {
  const rows: Row[] = [
    ["c1", "id-a", "Alpha"],
    ["c1", "id-b", "Beta"],
    ["c1", null, null],
  ];
  const first = backfilled(rows);
  assert.deepEqual(first[2], { id: 3, keyId: "id-b", keyName: "Beta" });
  const { db } = seed(rows);
  db.exec(SQL);
  db.exec(SQL);
  const again = db
    .prepare(
      "SELECT id, api_key_id AS keyId, api_key_name AS keyName FROM usage_history ORDER BY id"
    )
    .all();
  db.close();
  assert.deepEqual(again, first);
});
