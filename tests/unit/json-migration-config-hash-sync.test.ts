// bifrost-16: opt-in config hash sync for the one file -> database writer (runJsonMigration).
// OMNIROUTE_CONFIG_HASH_SYNC=1: a combo whose database copy changed since the last sync is kept, not
// overwritten by the file, and every decision is logged. Off by default (the file always wins).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-config-hash-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { runJsonMigration } = await import("../../src/lib/db/jsonMigration.ts");
const sync = await import("../../src/lib/db/jsonMigration/configHashSync.ts").catch(() => null);

const FLAG = "OMNIROUTE_CONFIG_HASH_SYNC";

const combo = (extra: Record<string, unknown> = {}) => ({
  id: "combo-sync",
  name: "combo-sync",
  strategy: "priority",
  models: ["openai/gpt-4o-mini"],
  ...extra,
});

function storedModels(): string[] {
  const row = core
    .getDbInstance()
    .prepare("SELECT data FROM combos WHERE id = 'combo-sync'")
    .get() as { data: string };
  // The importer normalises string targets into step objects: read the model of each step.
  return (JSON.parse(row.data).models as Array<string | { model: string }>).map((m) =>
    typeof m === "string" ? m : m.model
  );
}

function editInDatabase(models: string[]) {
  const db = core.getDbInstance();
  const row = db.prepare("SELECT data FROM combos WHERE id = 'combo-sync'").get() as {
    data: string;
  };
  const data = {
    ...JSON.parse(row.data),
    models: models.map((model) => ({ kind: "model", model })),
  };
  db.prepare("UPDATE combos SET data = ? WHERE id = 'combo-sync'").run(JSON.stringify(data));
}

function capture<T>(fn: () => T): { value: T; lines: string[] } {
  const lines: string[] = [];
  const original = console.log;
  console.log = (...args: unknown[]) => void lines.push(args.map(String).join(" "));
  try {
    return { value: fn(), lines };
  } finally {
    console.log = original;
  }
}

test.beforeEach(() => {
  delete process.env[FLAG];
  const db = core.getDbInstance();
  db.prepare("DELETE FROM combos").run();
  db.prepare("DELETE FROM key_value WHERE namespace = 'configHash'").run();
});
test.after(() => {
  delete process.env[FLAG];
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("flag off (default): the file overwrites a combo edited in the database", () => {
  const db = core.getDbInstance();
  runJsonMigration(db, { combos: [combo()] });
  editInDatabase(["openai/edited-in-db"]);
  runJsonMigration(db, { combos: [combo({ models: ["openai/from-file"] })] });
  assert.deepEqual(storedModels(), ["openai/from-file"]);
  assert.equal(
    db.prepare("SELECT COUNT(*) n FROM key_value WHERE namespace = 'configHash'").get().n,
    0
  );
});

test("flag on: a new combo is written and its hash recorded", () => {
  assert.ok(sync, "configHashSync module exists");
  process.env[FLAG] = "1";
  const db = core.getDbInstance();
  const { lines } = capture(() => runJsonMigration(db, { combos: [combo()] }));
  assert.deepEqual(storedModels(), ["openai/gpt-4o-mini"]);
  assert.equal(
    db.prepare("SELECT COUNT(*) n FROM key_value WHERE namespace = 'configHash'").get().n,
    1
  );
  assert.ok(
    lines.some((l) => l.includes("combo-sync") && l.includes("direction=file-to-db")),
    lines.join("\n")
  );
});

test("flag on: a combo edited in the database since the last sync is kept, and the decision is logged", () => {
  process.env[FLAG] = "1";
  const db = core.getDbInstance();
  runJsonMigration(db, { combos: [combo()] });
  editInDatabase(["openai/edited-in-db"]);
  const { lines } = capture(() =>
    runJsonMigration(db, { combos: [combo({ models: ["openai/from-file"] })] })
  );
  assert.deepEqual(storedModels(), ["openai/edited-in-db"], "the database copy survives");
  assert.ok(
    lines.some((l) => l.includes("combo-sync") && l.includes("direction=db-kept")),
    lines.join("\n")
  );
  assert.ok(!lines.join("\n").includes("from-file"), "the log never prints config content");
});

test("flag on: a combo unchanged in the database takes the new file content", () => {
  process.env[FLAG] = "1";
  const db = core.getDbInstance();
  runJsonMigration(db, { combos: [combo()] });
  const { lines } = capture(() =>
    runJsonMigration(db, { combos: [combo({ models: ["openai/from-file"] })] })
  );
  assert.deepEqual(storedModels(), ["openai/from-file"]);
  assert.ok(
    lines.some((l) => l.includes("direction=file-to-db")),
    lines.join("\n")
  );
});

test("flag on: identical file and database content is reported as in sync", () => {
  process.env[FLAG] = "1";
  const db = core.getDbInstance();
  runJsonMigration(db, { combos: [combo()] });
  const { lines } = capture(() => runJsonMigration(db, { combos: [combo()] }));
  assert.ok(
    lines.some((l) => l.includes("direction=in-sync")),
    lines.join("\n")
  );
});

test("flag on: an existing combo with no recorded baseline and different content is kept", () => {
  process.env[FLAG] = "0";
  const db = core.getDbInstance();
  runJsonMigration(db, { combos: [combo()] });
  process.env[FLAG] = "1";
  const { lines } = capture(() =>
    runJsonMigration(db, { combos: [combo({ models: ["openai/from-file"] })] })
  );
  assert.deepEqual(storedModels(), ["openai/gpt-4o-mini"]);
  assert.ok(
    lines.some((l) => l.includes("direction=db-kept")),
    lines.join("\n")
  );
});

test("the hash ignores key order and timestamps but not content", () => {
  assert.ok(sync);
  const a = sync.configHash({
    id: "x",
    name: "n",
    models: ["m"],
    updatedAt: "t1",
    createdAt: "c1",
    sortOrder: 1,
  });
  const b = sync.configHash({
    sortOrder: 9,
    models: ["m"],
    name: "n",
    id: "x",
    createdAt: "c2",
    updatedAt: "t2",
  });
  const c = sync.configHash({ id: "x", name: "n", models: ["other"] });
  assert.equal(a, b);
  assert.notEqual(a, c);
  assert.match(a, /^[0-9a-f]{64}$/);
});
