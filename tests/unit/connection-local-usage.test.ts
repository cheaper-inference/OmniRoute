import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types.ts";
import { getConnectionLocalUsage } from "../../src/lib/db/connectionLocalUsage.ts";

test("local usage isolates provider/registration, UTC dates and retained records", () => {
  const db = new DatabaseSync(":memory:");
  try {
    db.exec(`CREATE TABLE usage_history (
      provider TEXT, connection_id TEXT, timestamp TEXT, tokens_input INTEGER, tokens_output INTEGER
    )`);
    const insert = db.prepare("INSERT INTO usage_history VALUES (?, ?, ?, ?, ?)");
    insert.run("chatgpt", "a", "2026-09-01T00:00:00.000Z", 10, 20);
    insert.run("chatgpt", "a", "2026-09-30T09:00:00.000Z", 30, 40);
    insert.run("chatgpt", "a", "2026-09-30T10:00:00.000Z", null, null);
    insert.run("chatgpt", "a", "2026-08-31T23:59:59.999Z", 999, 999);
    insert.run("chatgpt", "a", "2026-09-30T12:00:00.001Z", 999, 999);
    insert.run("chatgpt", "b", "2026-09-30T10:00:00.000Z", 999, 999);
    insert.run("codex", "a", "2026-09-30T10:00:00.000Z", 999, 999);
    const usage = getConnectionLocalUsage(
      "a",
      "chatgpt",
      new Date("2026-09-30T12:00:00Z"),
      db as unknown as SqliteAdapter
    );
    assert.deepEqual(usage, {
      source: "retained_local_history",
      from: "2026-09-01T00:00:00.000Z",
      to: "2026-09-30T12:00:00.000Z",
      requests: 3,
      tokens: 100,
      activeDays: 2,
    });
    assert.equal(
      getConnectionLocalUsage(
        "empty",
        "chatgpt",
        new Date("2026-09-30T12:00:00Z"),
        db as unknown as SqliteAdapter
      ).requests,
      0
    );
    db.exec("DROP TABLE usage_history");
    assert.throws(() =>
      getConnectionLocalUsage("a", "chatgpt", new Date(), db as unknown as SqliteAdapter)
    );
  } finally {
    db.close();
  }
});
