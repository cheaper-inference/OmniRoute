/**
 * Characterization of the synchronous local-tool key_value facades:
 * `cliToolState.ts`, `conductorBridge.ts` and `localCorpus.ts`.
 *
 * Pins namespace and key names, JSON serialization, tolerant parsing of
 * malformed or wrongly typed stored values, the first-write-wins initial
 * config snapshot and namespace isolation so moving persistence behind
 * repositories cannot change what the cli-tools routes, the conductor SSE
 * bridge or the local-corpus settings route observe.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-local-tool-state-char-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const cli = await import("../../../src/lib/db/cliToolState.ts");
const conductor = await import("../../../src/lib/db/conductorBridge.ts");
const corpus = await import("../../../src/lib/db/localCorpus.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
});

function synchronous<T>(value: T): T {
  assert.equal(value instanceof Promise, false, "legacy helpers must stay synchronous");
  return value;
}

function rows(namespace: string): unknown[] {
  return core
    .getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ? ORDER BY key ASC")
    .all(namespace);
}

function putRaw(namespace: string, key: string, value: string): void {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(namespace, key, value);
}

// ── cliToolLastConfig ──────────────────────────────────────────────────────

test("cli tool last-configured: stored JSON-encoded under cliToolLastConfig", () => {
  assert.equal(synchronous(cli.getCliToolLastConfigured("codex")), null);
  assert.deepEqual(synchronous(cli.getAllCliToolLastConfigured()), {});

  assert.equal(
    synchronous(cli.saveCliToolLastConfigured("codex", "2026-01-01T00:00:00.000Z")),
    undefined
  );
  assert.deepEqual(rows("cliToolLastConfig"), [
    { key: "codex", value: '"2026-01-01T00:00:00.000Z"' },
  ]);
  assert.equal(cli.getCliToolLastConfigured("codex"), "2026-01-01T00:00:00.000Z");

  cli.saveCliToolLastConfigured("codex", "2026-02-02T00:00:00.000Z");
  assert.deepEqual(rows("cliToolLastConfig"), [
    { key: "codex", value: '"2026-02-02T00:00:00.000Z"' },
  ]);
});

test("cli tool last-configured: default timestamp is the current ISO time", () => {
  const before = Date.now();
  cli.saveCliToolLastConfigured("claude");
  const after = Date.now();
  const stored = cli.getCliToolLastConfigured("claude");
  assert.equal(typeof stored, "string");
  assert.equal(new Date(stored as string).toISOString(), stored);
  const at = Date.parse(stored as string);
  assert.ok(at >= before && at <= after, "default timestamp is taken at call time");
});

test("cli tool last-configured: getAll keeps only string values; get tolerates bad JSON", () => {
  cli.saveCliToolLastConfigured("codex", "2026-01-01T00:00:00.000Z");
  cli.saveCliToolLastConfigured("kilo", "2026-01-02T00:00:00.000Z");
  putRaw("cliToolLastConfig", "broken", "{not json");
  putRaw("cliToolLastConfig", "number", "42");
  putRaw("cliToolLastConfig", "object", '{"a":1}');
  putRaw("cliToolInitialConfig", "codex", '"other namespace"');

  assert.deepEqual(cli.getAllCliToolLastConfigured(), {
    codex: "2026-01-01T00:00:00.000Z",
    kilo: "2026-01-02T00:00:00.000Z",
  });
  assert.equal(cli.getCliToolLastConfigured("broken"), null);
  assert.equal(cli.getCliToolLastConfigured("number"), null);
  assert.equal(cli.getCliToolLastConfigured("object"), null);
});

test("cli tool last-configured: delete removes only that tool in that namespace", () => {
  cli.saveCliToolLastConfigured("codex", "2026-01-01T00:00:00.000Z");
  cli.saveCliToolLastConfigured("kilo", "2026-01-02T00:00:00.000Z");
  cli.saveCliToolInitialConfig("codex", { keep: true });

  assert.equal(synchronous(cli.deleteCliToolLastConfigured("codex")), undefined);
  cli.deleteCliToolLastConfigured("never-configured");
  assert.equal(cli.getCliToolLastConfigured("codex"), null);
  assert.deepEqual(cli.getAllCliToolLastConfigured(), { kilo: "2026-01-02T00:00:00.000Z" });
  assert.deepEqual(cli.getCliToolInitialConfig("codex"), { keep: true });
});

// ── cliToolInitialConfig ───────────────────────────────────────────────────

test("cli tool initial config: first write wins and is stored as JSON", () => {
  assert.equal(synchronous(cli.getCliToolInitialConfig("codex")), null);
  assert.equal(synchronous(cli.saveCliToolInitialConfig("codex", { model: "a", n: 1 })), true);
  assert.equal(cli.saveCliToolInitialConfig("codex", { model: "b" }), false);
  assert.deepEqual(rows("cliToolInitialConfig"), [{ key: "codex", value: '{"model":"a","n":1}' }]);
  assert.deepEqual(cli.getCliToolInitialConfig("codex"), { model: "a", n: 1 });
});

test("cli tool initial config: any existing row blocks the snapshot, even malformed", () => {
  putRaw("cliToolInitialConfig", "broken", "{not json");
  assert.equal(cli.saveCliToolInitialConfig("broken", { x: 1 }), false);
  assert.equal(cli.getCliToolInitialConfig("broken"), null);
  assert.deepEqual(rows("cliToolInitialConfig"), [{ key: "broken", value: "{not json" }]);
});

test("cli tool initial config: only plain objects are returned", () => {
  putRaw("cliToolInitialConfig", "array", "[1,2]");
  putRaw("cliToolInitialConfig", "string", '"text"');
  putRaw("cliToolInitialConfig", "null", "null");
  assert.equal(cli.getCliToolInitialConfig("array"), null);
  assert.equal(cli.getCliToolInitialConfig("string"), null);
  assert.equal(cli.getCliToolInitialConfig("null"), null);
});

test("cli tool initial config: delete allows a new snapshot and leaves timestamps", () => {
  cli.saveCliToolInitialConfig("codex", { a: 1 });
  cli.saveCliToolLastConfigured("codex", "2026-01-01T00:00:00.000Z");
  assert.equal(synchronous(cli.deleteCliToolInitialConfig("codex")), undefined);
  assert.equal(cli.getCliToolInitialConfig("codex"), null);
  assert.equal(cli.getCliToolLastConfigured("codex"), "2026-01-01T00:00:00.000Z");
  assert.equal(cli.saveCliToolInitialConfig("codex", { a: 2 }), true);
  assert.deepEqual(cli.getCliToolInitialConfig("codex"), { a: 2 });
});

// ── conductor cursor ───────────────────────────────────────────────────────

test("conductor cursor: conductor/last_event_id holds a JSON string", () => {
  assert.equal(synchronous(conductor.getConductorCursor()), null);
  assert.equal(synchronous(conductor.setConductorCursor("evt-1")), undefined);
  assert.deepEqual(rows("conductor"), [{ key: "last_event_id", value: '"evt-1"' }]);
  assert.equal(conductor.getConductorCursor(), "evt-1");
  conductor.setConductorCursor("");
  assert.equal(conductor.getConductorCursor(), "");
});

test("conductor cursor: malformed or non-string values read as null", () => {
  putRaw("conductor", "last_event_id", "{oops");
  assert.equal(conductor.getConductorCursor(), null);
  putRaw("conductor", "last_event_id", "17");
  assert.equal(conductor.getConductorCursor(), null);
  putRaw("conductor", "other", '"ignored"');
  putRaw("conductor", "last_event_id", '"evt-9"');
  assert.equal(conductor.getConductorCursor(), "evt-9");
});

// ── local corpus root ──────────────────────────────────────────────────────

test("local corpus root: local_corpus/root_path holds a JSON string", () => {
  assert.equal(synchronous(corpus.getLocalCorpusRoot()), null);
  assert.deepEqual(synchronous(corpus.getLocalCorpusConfig()), {
    rootPath: null,
    configured: false,
  });

  assert.equal(synchronous(corpus.setLocalCorpusRoot("/vault/notes")), undefined);
  assert.deepEqual(rows("local_corpus"), [{ key: "root_path", value: '"/vault/notes"' }]);
  assert.equal(corpus.getLocalCorpusRoot(), "/vault/notes");
  assert.deepEqual(corpus.getLocalCorpusConfig(), { rootPath: "/vault/notes", configured: true });
});

test("local corpus root: untrimmed value returned as stored; blank reads as unset", () => {
  corpus.setLocalCorpusRoot("  /vault  ");
  assert.equal(corpus.getLocalCorpusRoot(), "  /vault  ");
  corpus.setLocalCorpusRoot("   ");
  assert.deepEqual(rows("local_corpus"), [{ key: "root_path", value: '"   "' }]);
  assert.equal(corpus.getLocalCorpusRoot(), null);
  assert.deepEqual(corpus.getLocalCorpusConfig(), { rootPath: null, configured: false });
});

test("local corpus root: malformed or non-string values read as null", () => {
  putRaw("local_corpus", "root_path", "{bad");
  assert.equal(corpus.getLocalCorpusRoot(), null);
  putRaw("local_corpus", "root_path", '["/a"]');
  assert.equal(corpus.getLocalCorpusRoot(), null);
});

test("local corpus root: clear deletes only root_path", () => {
  corpus.setLocalCorpusRoot("/vault");
  putRaw("local_corpus", "other", '"keep"');
  assert.equal(synchronous(corpus.clearLocalCorpusRoot()), undefined);
  corpus.clearLocalCorpusRoot();
  assert.equal(corpus.getLocalCorpusRoot(), null);
  assert.deepEqual(rows("local_corpus"), [{ key: "other", value: '"keep"' }]);
});

test("local corpus root: read errors are swallowed and reported as unset", () => {
  core.getDbInstance().close();
  assert.equal(corpus.getLocalCorpusRoot(), null);
  assert.deepEqual(corpus.getLocalCorpusConfig(), { rootPath: null, configured: false });
  core.resetDbInstance();
});

test("conductor cursor: read errors other than JSON parsing still propagate", () => {
  core.getDbInstance().close();
  assert.throws(() => conductor.getConductorCursor());
  core.resetDbInstance();
});
