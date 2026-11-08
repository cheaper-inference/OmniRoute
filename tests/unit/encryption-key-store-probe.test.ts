import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-probe-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_KEY = process.env.STORAGE_ENCRYPTION_KEY;

const core = await import("../../src/lib/db/core.ts");

// Fresh import: the encryption module caches its derived key per module instance.
async function importFreshEncryption() {
  const url = pathToFileURL(path.resolve("src/lib/db/encryption.ts")).href;
  return import(`${url}?probe=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

const NOW = new Date().toISOString();

function insertConnection(db: ReturnType<typeof core.getDbInstance>, apiKey: string | null) {
  db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, api_key, created_at, updated_at) VALUES (?, 'openai', 'apikey', ?, ?, ?)"
  ).run(`conn-${Math.random().toString(16).slice(2)}`, apiKey, NOW, NOW);
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_KEY === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
  else process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_KEY;
});

test("probe reports a key store that decrypts", async () => {
  process.env.STORAGE_ENCRYPTION_KEY = "probe-key-A";
  const enc = await importFreshEncryption();
  const db = core.getDbInstance();
  insertConnection(db, enc.encrypt("sk-real-secret"));

  assert.equal(enc.probeStoredSecrets(db), true);
  assert.equal(enc.getKeyStoreDecryptable(), true);
});

test("probe logs one error and reports false when the key does not match the database", async (t) => {
  process.env.STORAGE_ENCRYPTION_KEY = "probe-key-A";
  const encA = await importFreshEncryption();
  const db = core.getDbInstance();
  insertConnection(db, encA.encrypt("sk-real-secret"));
  insertConnection(db, encA.encrypt("sk-other-secret"));

  process.env.STORAGE_ENCRYPTION_KEY = "probe-key-B";
  const encB = await importFreshEncryption();
  const errors = t.mock.method(console, "error", () => {});

  assert.equal(encB.probeStoredSecrets(db), false);
  assert.equal(encB.getKeyStoreDecryptable(), false);
  assert.equal(errors.mock.callCount(), 1);
  assert.match(String(errors.mock.calls[0].arguments[0]), /different install/i);
});

test("probe returns null and stays silent when no secret is stored", async (t) => {
  process.env.STORAGE_ENCRYPTION_KEY = "probe-key-A";
  const enc = await importFreshEncryption();
  const db = core.getDbInstance();
  insertConnection(db, "sk-plaintext-legacy");
  insertConnection(db, null);
  const errors = t.mock.method(console, "error", () => {});

  assert.equal(enc.probeStoredSecrets(db), null);
  assert.equal(enc.getKeyStoreDecryptable(), null);
  assert.equal(errors.mock.callCount(), 0);
});

test("probe returns null when encryption is disabled", async (t) => {
  process.env.STORAGE_ENCRYPTION_KEY = "probe-key-A";
  const encA = await importFreshEncryption();
  const db = core.getDbInstance();
  insertConnection(db, encA.encrypt("sk-real-secret"));

  delete process.env.STORAGE_ENCRYPTION_KEY;
  const encOff = await importFreshEncryption();
  const errors = t.mock.method(console, "error", () => {});

  assert.equal(encOff.probeStoredSecrets(db), null);
  assert.equal(errors.mock.callCount(), 0);
});
