/**
 * Characterization of the startup secret store through its public exports only, so the
 * same file passes against the pre-repository module and against the repository-backed
 * facade: synchronous reads and writes, the "secrets" namespace, encryption at rest with
 * a configured key, legacy plaintext rows, insert-only first write, and the fallback that
 * turns any storage or decoding failure into "missing" / "not persisted".
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "startup-secrets-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.STORAGE_ENCRYPTION_KEY = "startup-secrets-characterization-key-0123456789";

const core = await import("../../../src/lib/db/core.ts");
const secretsDb = await import("../../../src/lib/db/secrets.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function rawValue(namespace: string, key: string): string | undefined {
  const row = core
    .getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(namespace, key) as { value?: string } | undefined;
  return row?.value;
}

function insertRaw(namespace: string, key: string, value: string): void {
  core
    .getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(namespace, key, value);
}

test("reads and writes are synchronous and a missing secret is null", () => {
  const missing = secretsDb.getPersistedSecret("jwtSecret");
  assert.equal(missing, null);
  const written = secretsDb.persistSecret("jwtSecret", "first-jwt");
  assert.equal(written, undefined, "persistSecret returns nothing, not a Promise");
  assert.equal(secretsDb.getPersistedSecret("jwtSecret"), "first-jwt");
});

test("with a configured key the row holds the JSON-encoded enc:v1 ciphertext", () => {
  secretsDb.persistSecret("apiKeySecret", "hex-secret-value");
  const raw = rawValue("secrets", "apiKeySecret");
  assert.equal(typeof raw, "string");
  const stored = JSON.parse(raw as string);
  assert.equal(typeof stored, "string");
  assert.ok(stored.startsWith("enc:v1:"), "stored value is encrypted");
  assert.ok(!(raw as string).includes("hex-secret-value"), "plaintext never reaches the row");
  assert.equal(secretsDb.getPersistedSecret("apiKeySecret"), "hex-secret-value");
});

test("first write wins: an existing secret is never overwritten", () => {
  secretsDb.persistSecret("jwtSecret", "winner");
  const before = rawValue("secrets", "jwtSecret");
  secretsDb.persistSecret("jwtSecret", "loser");
  assert.equal(rawValue("secrets", "jwtSecret"), before, "row is untouched by the second write");
  assert.equal(secretsDb.getPersistedSecret("jwtSecret"), "winner");
});

test("each secret name is stored independently", () => {
  secretsDb.persistSecret("jwtSecret", "jwt-value");
  assert.equal(secretsDb.getPersistedSecret("apiKeySecret"), null);
  secretsDb.persistSecret("apiKeySecret", "api-value");
  assert.equal(secretsDb.getPersistedSecret("jwtSecret"), "jwt-value");
  assert.equal(secretsDb.getPersistedSecret("apiKeySecret"), "api-value");
});

test("only the secrets namespace is read or written", () => {
  insertRaw("other", "jwtSecret", JSON.stringify("from-other-namespace"));
  assert.equal(secretsDb.getPersistedSecret("jwtSecret"), null);
  secretsDb.persistSecret("jwtSecret", "in-secrets");
  assert.equal(rawValue("other", "jwtSecret"), JSON.stringify("from-other-namespace"));
  assert.equal(secretsDb.getPersistedSecret("jwtSecret"), "in-secrets");
});

test("legacy plaintext rows are returned unchanged", () => {
  insertRaw("secrets", "jwtSecret", JSON.stringify("legacy-plaintext"));
  assert.equal(secretsDb.getPersistedSecret("jwtSecret"), "legacy-plaintext");
});

test("non-string JSON, malformed JSON and undecryptable ciphertext read as missing", () => {
  insertRaw("secrets", "number", "42");
  insertRaw("secrets", "object", JSON.stringify({ value: "x" }));
  insertRaw("secrets", "nullish", "null");
  insertRaw("secrets", "broken", "not-json");
  insertRaw("secrets", "bad-cipher", JSON.stringify("enc:v1:00:zz:00"));
  insertRaw("secrets", "short-cipher", JSON.stringify("enc:v1:only-two:parts"));
  for (const key of ["number", "object", "nullish", "broken", "bad-cipher", "short-cipher"]) {
    assert.equal(secretsDb.getPersistedSecret(key), null, key);
  }
});

test("a malformed existing row still blocks the first write", () => {
  insertRaw("secrets", "jwtSecret", "not-json");
  secretsDb.persistSecret("jwtSecret", "replacement");
  assert.equal(rawValue("secrets", "jwtSecret"), "not-json");
  assert.equal(secretsDb.getPersistedSecret("jwtSecret"), null);
});

test("storage failures fall back: read is null, write does not throw", () => {
  secretsDb.persistSecret("jwtSecret", "before-drop");
  core.getDbInstance().exec("DROP TABLE key_value");
  assert.equal(secretsDb.getPersistedSecret("jwtSecret"), null);
  assert.doesNotThrow(() => secretsDb.persistSecret("jwtSecret", "after-drop"));
});
