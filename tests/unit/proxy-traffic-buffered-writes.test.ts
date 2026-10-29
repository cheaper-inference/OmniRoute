import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { createNodeSqliteAdapterFromDatabase } from "../../src/lib/db/adapters/nodeSqliteShared.ts";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types.ts";

// Hot-path guard: streamed chunks must be accumulated in memory and flushed in O(1) writes per
// settled stream, never one synchronous SQLite upsert per chunk.
fs.mkdirSync(path.resolve("_artifacts"), { recursive: true });
const fixtureDir = fs.mkdtempSync(path.resolve("_artifacts/traffic-buffer-"));
const originalEnv = { ...process.env };
for (const key of ["DATA_DIR", "HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA", "TEMP", "TMP"]) {
  process.env[key] = fixtureDir;
}
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const traffic = await import("../../src/lib/db/proxyTraffic.ts");
const { meterPayloadAttempt } = await import("../../open-sse/utils/proxyPayloadMetering.ts");
const sql = fs.readFileSync(
  new URL("../../src/lib/db/migrations/225_proxy_payload_traffic.sql", import.meta.url),
  "utf8"
);

test.after(() => {
  fs.rmSync(fixtureDir, { recursive: true, force: true });
  for (const key of Object.keys(process.env)) delete process.env[key];
  Object.assign(process.env, originalEnv);
});

function fixtureDb(name: string): { db: SqliteAdapter; writes: () => number } {
  const filename = path.join(fixtureDir, `${name}.sqlite`);
  const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(filename), filename);
  db.exec(
    "CREATE TABLE key_value (namespace TEXT, key TEXT, value TEXT, PRIMARY KEY(namespace,key)); CREATE TABLE proxy_registry(id TEXT PRIMARY KEY, name TEXT);"
  );
  db.exec(sql);
  let count = 0;
  const prepare = db.prepare.bind(db);
  db.prepare = ((statement: string) => {
    const prepared = prepare(statement);
    if (!statement.includes("INSERT INTO proxy_payload_traffic")) return prepared;
    const run = prepared.run.bind(prepared);
    prepared.run = ((...args: unknown[]) => {
      count += 1;
      return run(...args);
    }) as typeof prepared.run;
    return prepared;
  }) as typeof db.prepare;
  return { db, writes: () => count };
}

function chunkedResponse(chunks: number, size: number): Response {
  let sent = 0;
  return new Response(
    new ReadableStream<Uint8Array>({
      pull(controller) {
        if (sent >= chunks) return controller.close();
        sent += 1;
        controller.enqueue(new Uint8Array(size));
      },
    })
  );
}

test("a streamed response of N chunks is persisted with O(1) writes", async () => {
  const { db, writes } = fixtureDb("stream");
  try {
    const record = traffic.payloadTrafficRecorder(null, db);
    const response = await meterPayloadAttempt(
      async () => chunkedResponse(500, 7),
      "https://fixture.invalid/v1",
      { body: "hello" },
      record
    );
    const consumed = new Uint8Array(await response.arrayBuffer());
    assert.equal(consumed.byteLength, 3500);
    assert.ok(writes() <= 2, `expected O(1) writes for 500 chunks, got ${writes()}`);

    const report = traffic.getProxyTraffic(db);
    assert.equal(report.direct.attempts, 1);
    assert.equal(report.direct.uploadBytes, 5);
    assert.equal(report.direct.knownUploadAttempts, 1);
    assert.equal(report.direct.downloadBytes, 3500);
    assert.equal(report.direct.completedDownloads, 1);
  } finally {
    traffic.flushPayloadTraffic?.();
    db.close();
  }
});

test("unsettled chunk deltas stay in memory until a flush, and reads include them", async () => {
  const { db, writes } = fixtureDb("pending");
  try {
    const record = traffic.payloadTrafficRecorder(undefined, db);
    record({ attempts: 1, uploadBytes: 0, knownUploadAttempts: 1 });
    for (let i = 0; i < 100; i += 1) record({ downloadBytes: 3 });
    assert.equal(writes(), 0, "chunk deltas must not hit SQLite synchronously");

    const report = traffic.getProxyTraffic(db);
    assert.equal(writes(), 1, "a read flushes the pending deltas in one write per route");
    assert.equal(report.unattributed.downloadBytes, 300);
    assert.equal(report.unattributed.attempts, 1);

    traffic.flushPayloadTraffic();
    assert.equal(writes(), 1, "an empty flush writes nothing");
    assert.equal(traffic.getProxyTraffic(db).total.downloadBytes, 300);
  } finally {
    traffic.flushPayloadTraffic?.();
    db.close();
  }
});

test("invalid increments and write failures keep the incomplete-persistence warning", () => {
  const { db } = fixtureDb("failure");
  const warnings: unknown[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args);
  try {
    const record = traffic.payloadTrafficRecorder(null, db);
    record({ downloadBytes: -1 });
    assert.equal(traffic.getProxyTraffic(db).persistenceIncomplete, true);
    record({ downloadBytes: 4 });
    db.close();
    traffic.flushPayloadTraffic();
    assert.ok(warnings.length <= 1, "the warning is emitted once per process");
  } finally {
    console.warn = originalWarn;
  }
});
