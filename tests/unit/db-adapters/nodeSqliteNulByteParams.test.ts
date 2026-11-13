import { test, after } from "node:test";
import assert from "node:assert/strict";

const { openMemorySqliteAdapter } = await import("../_helpers/memorySqliteAdapter.ts");

const db = openMemorySqliteAdapter();
db.exec("CREATE TABLE t (id INTEGER PRIMARY KEY, a TEXT, b BLOB)");
after(() => db.close());

test("positional string params lose NUL bytes instead of being cut at the first one", () => {
  db.prepare("INSERT INTO t (id, a) VALUES (?, ?)").run(1, "ab\u0000cd");
  const row = db.prepare("SELECT a FROM t WHERE id = ?").get(1) as { a: string };
  assert.equal(row.a, "abcd");
});

test("named string params lose NUL bytes", () => {
  db.prepare("INSERT INTO t (id, a) VALUES (@id, @a)").run({ id: 2, a: "x\u0000y\u0000z" });
  const row = db.prepare("SELECT a FROM t WHERE id = 2").get() as { a: string };
  assert.equal(row.a, "xyz");
});

test("a NUL bound in a lookup string matches the stored stripped text", () => {
  db.prepare("INSERT INTO t (id, a) VALUES (3, 'keyvalue')").run();
  const rows = db.prepare("SELECT id FROM t WHERE a = ?").all("key\u0000value");
  assert.deepEqual(rows, [{ id: 3 }]);
});

test("Buffer params keep their NUL bytes", () => {
  db.prepare("INSERT INTO t (id, b) VALUES (?, ?)").run(4, Buffer.from([1, 0, 2]));
  const row = db.prepare("SELECT b FROM t WHERE id = 4").get() as { b: Uint8Array };
  assert.deepEqual([...row.b], [1, 0, 2]);
});

test("strings without NUL, numbers and null pass through unchanged", () => {
  db.prepare("INSERT INTO t (id, a) VALUES (?, ?)").run(5, "plain");
  db.prepare("INSERT INTO t (id, a) VALUES (?, ?)").run(6, null);
  const rows = db.prepare("SELECT id, a FROM t WHERE id IN (5, 6) ORDER BY id").all();
  assert.deepEqual(rows, [
    { id: 5, a: "plain" },
    { id: 6, a: null },
  ]);
});
