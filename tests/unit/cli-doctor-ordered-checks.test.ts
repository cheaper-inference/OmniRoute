// ENVIRONMENT NOTE: this test builds a real better-sqlite3 database. Skip it where the native
// addon cannot load (see tests/unit/_helpers/betterSqlite3Availability.ts).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  betterSqlite3Available,
  BETTER_SQLITE3_SKIP_REASON,
} from "./_helpers/betterSqlite3Availability.ts";

const ROOT_DIR = path.resolve(".");
const ORIGINAL_ENV = { DATA_DIR: process.env.DATA_DIR, PORT: process.env.PORT };
const skip = betterSqlite3Available() ? false : BETTER_SQLITE3_SKIP_REASON;

const { collectDoctorChecks } = await import("../../bin/cli/commands/doctor.mjs");
const Database = skip ? null : (await import("better-sqlite3")).default;

interface Check {
  name: string;
  status: string;
  message?: string;
  details?: Record<string, unknown>;
}

function byName(checks: Check[], name: string) {
  return checks.find((check) => check.name === name);
}

async function withDataDir(fn: (dataDir: string) => Promise<void>) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-doctor-ordered-"));
  process.env.DATA_DIR = dataDir;
  delete process.env.PORT;
  try {
    await fn(dataDir);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

function makeDb(dataDir: string) {
  const db = new Database(path.join(dataDir, "storage.sqlite"));
  db.exec(`
    CREATE TABLE provider_connections (id TEXT PRIMARY KEY, provider TEXT NOT NULL, is_active INTEGER DEFAULT 1);
    CREATE TABLE key_value (namespace TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL);
  `);
  return db;
}

test("a host that does not answer makes the machine-token check skipped, not warned", async () => {
  await withDataDir(async () => {
    const result = await collectDoctorChecks(
      { rootDir: ROOT_DIR },
      { livenessUrl: "http://127.0.0.1:9/api/health/degradation" }
    );

    assert.equal(byName(result.checks, "Server liveness")?.status, "warn");
    const token = byName(result.checks, "CLI machine token");
    assert.equal(token?.status, "skip");
    assert.match(String(token?.message), /Server liveness/);
    assert.ok(result.summary.skip >= 1, "the summary counts skipped checks");
  });
});

test(
  "providers check flags an active compat connection that has no cached models",
  { skip },
  async () => {
    await withDataDir(async (dataDir) => {
      const db = makeDb(dataDir);
      const add = db.prepare(
        "INSERT INTO provider_connections (id, provider, is_active) VALUES (?, ?, ?)"
      );
      add.run("c-hollow", "openai-compatible-a", 1);
      add.run("c-synced", "openai-compatible-b", 1);
      add.run("c-custom", "anthropic-compatible-c", 1);
      add.run("c-off", "openai-compatible-d", 0); // disabled: not part of routing
      add.run("c-static", "openai", 1); // static catalog: no synced rows needed
      const put = db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)");
      put.run(
        "syncedAvailableModels",
        "openai-compatible-b:c-synced",
        JSON.stringify([{ id: "m1" }])
      );
      put.run("customModels", "anthropic-compatible-c", JSON.stringify([{ id: "m2" }]));
      db.close();

      const result = await collectDoctorChecks({ rootDir: ROOT_DIR }, { skipLiveness: true });
      const providers = byName(result.checks, "Providers");

      assert.equal(providers?.status, "warn");
      assert.deepEqual(providers?.details?.hollowConnections, ["c-hollow"]);
    });
  }
);

test("providers check is ok when every active compat connection has models", { skip }, async () => {
  await withDataDir(async (dataDir) => {
    const db = makeDb(dataDir);
    db.prepare("INSERT INTO provider_connections (id, provider, is_active) VALUES (?, ?, 1)").run(
      "c-synced",
      "openai-compatible-b"
    );
    db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      "syncedAvailableModels",
      "openai-compatible-b:c-synced",
      JSON.stringify([{ id: "m1" }])
    );
    db.close();

    const result = await collectDoctorChecks({ rootDir: ROOT_DIR }, { skipLiveness: true });

    assert.equal(byName(result.checks, "Providers")?.status, "ok");
  });
});

test("providers check is skipped, not failed, when there is no database", async () => {
  await withDataDir(async () => {
    const result = await collectDoctorChecks({ rootDir: ROOT_DIR }, { skipLiveness: true });

    const providers = byName(result.checks, "Providers");
    assert.equal(providers?.status, "skip");
    assert.match(String(providers?.message), /Database/);
    assert.equal(result.summary.fail, 0);
  });
});
