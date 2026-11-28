/**
 * Contract of the startup secret repository (Promise-based, SQLite implementation) and
 * of the facade wiring: the facade hands out the composition-root repository, its
 * synchronous exports go through legacySync, and the Promise and synchronous access
 * share one store. Unlike the facade, the repository does not swallow errors.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "startup-secrets-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.STORAGE_ENCRYPTION_KEY = "startup-secrets-repositories-key-0123456789";

const core = await import("../../../src/lib/db/core.ts");
const { startupSecretRepositories } =
  await import("../../../src/lib/db/repositories/startupSecretRepositories.ts");
const secretsFacade = await import("../../../src/lib/db/secrets.ts");

const { secrets, legacySync } = startupSecretRepositories;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

function rawValue(key: string): string | undefined {
  const row = core
    .getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = 'secrets' AND key = ?")
    .get(key) as { value?: string } | undefined;
  return row?.value;
}

test("facade hands out the composition-root repository", () => {
  assert.equal(secretsFacade.getStartupSecretRepository(), secrets);
});

test("find / insertIfAbsent round-trip through Promises and encrypt at rest", async () => {
  assert.equal(await promised(secrets.find("jwtSecret")), null);
  assert.equal(await promised(secrets.insertIfAbsent("jwtSecret", "repo-jwt")), undefined);
  assert.ok(JSON.parse(rawValue("jwtSecret") as string).startsWith("enc:v1:"));
  assert.equal(await promised(secrets.find("jwtSecret")), "repo-jwt");
});

test("insertIfAbsent keeps the first value", async () => {
  await secrets.insertIfAbsent("apiKeySecret", "first");
  await secrets.insertIfAbsent("apiKeySecret", "second");
  assert.equal(await secrets.find("apiKeySecret"), "first");
});

test("Promise, legacySync and facade access share one store", async () => {
  await secrets.insertIfAbsent("a", "from-promise");
  legacySync.insertIfAbsent("b", "from-sync");
  secretsFacade.persistSecret("c", "from-facade");
  for (const [key, value] of [
    ["a", "from-promise"],
    ["b", "from-sync"],
    ["c", "from-facade"],
  ]) {
    assert.equal(await secrets.find(key), value);
    assert.equal(legacySync.find(key), value);
    assert.equal(secretsFacade.getPersistedSecret(key), value);
  }
});

test("repository surfaces storage and malformed-row errors; the facade maps them", async () => {
  core
    .getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES ('secrets', ?, ?)")
    .run("broken", "not-json");
  await assert.rejects(secrets.find("broken"), SyntaxError);
  assert.throws(() => legacySync.find("broken"), SyntaxError);
  assert.equal(secretsFacade.getPersistedSecret("broken"), null);

  core.getDbInstance().exec("DROP TABLE key_value");
  await assert.rejects(secrets.find("jwtSecret"));
  await assert.rejects(secrets.insertIfAbsent("jwtSecret", "x"));
  assert.throws(() => legacySync.insertIfAbsent("jwtSecret", "x"));
  assert.equal(secretsFacade.getPersistedSecret("jwtSecret"), null);
  assert.doesNotThrow(() => secretsFacade.persistSecret("jwtSecret", "x"));
});

test("facade sync exports delegate to legacySync at call time", () => {
  const originalFind = legacySync.find;
  const originalInsert = legacySync.insertIfAbsent;
  const calls: string[] = [];
  try {
    legacySync.find = (name: string) => {
      calls.push(`find:${name}`);
      return "stubbed";
    };
    legacySync.insertIfAbsent = (name: string, value: string) => {
      calls.push(`insert:${name}:${value}`);
    };
    assert.equal(secretsFacade.getPersistedSecret("jwtSecret"), "stubbed");
    secretsFacade.persistSecret("jwtSecret", "v");
  } finally {
    legacySync.find = originalFind;
    legacySync.insertIfAbsent = originalInsert;
  }
  assert.deepEqual(calls, ["find:jwtSecret", "insert:jwtSecret:v"]);
  assert.equal(rawValue("jwtSecret"), undefined, "the stub, not the store, handled the write");
});
