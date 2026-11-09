/**
 * Gateway API keys at rest.
 *
 * `api_keys.key` used to hold the usable `sk-…` secret in plaintext next to `key_hash`, and
 * the auth lookup matched on either column. Contract under test:
 *   - create / rotate / JSON import store `key` through the `enc:v1:` envelope when
 *     STORAGE_ENCRYPTION_KEY is set; `key_prefix` is the only plaintext fragment;
 *   - authentication resolves the caller by `key_hash` (SHA-256) ONLY — a row whose
 *     plaintext matches but whose hash does not must not authenticate;
 *   - legacy rows (plaintext `key`, possibly `key_hash` NULL) keep authenticating and are
 *     hashed + encrypted in place on first use, also when they appear after module init;
 *   - the admin reveal route and the operator JSON export (`getApiKeys`) still get the raw
 *     key back, so backups round-trip and a restored key is usable;
 *   - a `/v1/*` route handler still authenticates the bearer end to end.
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir before any `@/lib/db/*` module loads.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-apikey-at-rest-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Synthetic key — must be set before the encryption module derives its key.
process.env.STORAGE_ENCRYPTION_KEY = "synthetic-apikey-at-rest-storage-key-0001";
process.env.API_KEY_SECRET = "synthetic-apikey-at-rest-api-key-secret";
process.env.JWT_SECRET = "synthetic-apikey-at-rest-jwt-secret";
process.env.ALLOW_API_KEY_REVEAL = "true";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { runJsonMigration } = await import("../../src/lib/db/jsonMigration.ts");
const { opaqueTokenFingerprint } = await import("../../open-sse/utils/opaqueTokenFingerprint.ts");
const revealRoute = await import("../../src/app/api/keys/[id]/reveal/route.ts");
const filesRoute = await import("../../src/app/api/v1/files/route.ts");

type Row = Record<string, unknown>;

const ENCRYPTED = /^enc:v1:/;

function keyRow(id: string): Row {
  const row = core
    .getDbInstance()
    .prepare("SELECT id, key, key_hash, key_prefix FROM api_keys WHERE id = ?")
    .get(id) as Row | undefined;
  assert.ok(row, `api key ${id} must exist`);
  return row;
}

/** Writes a row the way pre-hash / pre-encryption releases did: plaintext `key`. */
function insertLegacyRow(opts: { id: string; key: string; withHash: boolean }) {
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO api_keys (id, name, key, machine_id, created_at, key_hash, key_prefix) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      opts.id,
      `legacy ${opts.id}`,
      opts.key,
      "machine-legacy",
      "2024-01-01T00:00:00.000Z",
      opts.withHash ? opaqueTokenFingerprint(opts.key) : null,
      opts.withHash ? opts.key.slice(0, 12) : null
    );
  apiKeysDb.clearApiKeyCaches();
}

// First use: creates the lazily-added columns the legacy inserts below rely on.
await apiKeysDb.getApiKeys();

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("createApiKey stores the secret encrypted; only key_hash and key_prefix stay in the clear", async () => {
  const created = await apiKeysDb.createApiKey("enc-key", "machine-enc", ["manage"]);
  const row = keyRow(created.id);

  assert.match(String(row.key), ENCRYPTED, "api_keys.key must carry the enc:v1: envelope");
  assert.notEqual(row.key, created.key, "the raw secret must not sit in api_keys.key");
  assert.equal(row.key_hash, opaqueTokenFingerprint(created.key));
  assert.equal(row.key_prefix, created.key.slice(0, 12));

  assert.equal(await apiKeysDb.validateApiKey(created.key), true);
  assert.equal(await apiKeysDb.validateApiKey("sk-synthetic-wrong-key"), false);
  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.equal(metadata?.id, created.id);
  assert.equal(metadata?.keyHash, row.key_hash);
});

test("authentication resolves the caller by key_hash only, never by the plaintext column", async () => {
  // A row whose plaintext column matches the presented bearer but whose hash belongs to a
  // different secret: only the hashed secret may authenticate.
  const plainSecret = "sk-synthetic-plain-column-only";
  const hashedSecret = "sk-synthetic-hashed-secret-only";
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO api_keys (id, name, key, machine_id, created_at, key_hash, key_prefix) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      "hash-only-row",
      "hash only",
      plainSecret,
      "machine-hash-only",
      "2024-01-01T00:00:00.000Z",
      opaqueTokenFingerprint(hashedSecret),
      hashedSecret.slice(0, 12)
    );
  apiKeysDb.clearApiKeyCaches();

  assert.equal(await apiKeysDb.validateApiKey(plainSecret), false, "plaintext match must not auth");
  assert.equal(await apiKeysDb.getApiKeyMetadata(plainSecret), null);
  assert.equal(await apiKeysDb.validateApiKey(hashedSecret), true, "hash match must auth");
  assert.equal((await apiKeysDb.getApiKeyMetadata(hashedSecret))?.id, "hash-only-row");
});

test("getApiKeyById / getApiKeys and the admin reveal route return the raw key", async () => {
  const created = await apiKeysDb.createApiKey("reveal-key", "machine-reveal", []);

  const byId = (await apiKeysDb.getApiKeyById(created.id)) as Row;
  assert.equal(byId.key, created.key, "getApiKeyById must decrypt for callers");
  const listed = ((await apiKeysDb.getApiKeys()) as Row[]).find((k) => k.id === created.id);
  assert.equal(listed?.key, created.key, "getApiKeys (JSON export) must decrypt for callers");
  const paged = ((await apiKeysDb.getApiKeys(100, 0)) as Row[]).find((k) => k.id === created.id);
  assert.equal(paged?.key, created.key, "paginated getApiKeys must decrypt too");

  const response = await revealRoute.GET(
    await makeManagementSessionRequest(`http://localhost:20128/api/keys/${created.id}/reveal`),
    { params: Promise.resolve({ id: created.id }) }
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as Row;
  assert.equal(body.key, created.key);
});

test("regenerateApiKey stores the rotated secret encrypted and retires the old one", async () => {
  const created = await apiKeysDb.createApiKey("rotate-key", "machine-rotate", []);
  const rotated = await apiKeysDb.regenerateApiKey(created.id);
  assert.ok(rotated);
  apiKeysDb.clearApiKeyCaches();

  const row = keyRow(created.id);
  assert.match(String(row.key), ENCRYPTED, "rotated key must be stored encrypted");
  assert.notEqual(row.key, rotated.key);
  assert.equal(row.key_hash, opaqueTokenFingerprint(rotated.key));
  assert.equal(row.key_prefix, rotated.key.slice(0, 12));

  assert.equal(await apiKeysDb.validateApiKey(created.key), false, "old secret must be retired");
  assert.equal(await apiKeysDb.validateApiKey(rotated.key), true, "new secret must work");
  assert.equal(((await apiKeysDb.getApiKeyById(created.id)) as Row).key, rotated.key);
});

test("legacy plaintext rows (with and without key_hash) authenticate and end up hashed + encrypted", async () => {
  const withHash = "sk-synthetic-legacy-with-hash-0001";
  const noHash = "sk-synthetic-legacy-no-hash-000002";
  insertLegacyRow({ id: "legacy-with-hash", key: withHash, withHash: true });
  insertLegacyRow({ id: "legacy-no-hash", key: noHash, withHash: false });
  // Simulate a process start after the rows were written: the module re-runs its first-use pass.
  apiKeysDb.resetApiKeyState();

  assert.equal(await apiKeysDb.validateApiKey(withHash), true);
  assert.equal(await apiKeysDb.validateApiKey(noHash), true);
  assert.equal((await apiKeysDb.getApiKeyMetadata(noHash))?.id, "legacy-no-hash");

  const a = keyRow("legacy-with-hash");
  assert.match(String(a.key), ENCRYPTED, "legacy row must be encrypted in place");
  assert.equal(a.key_hash, opaqueTokenFingerprint(withHash));
  assert.equal(a.key_prefix, withHash.slice(0, 12));

  const b = keyRow("legacy-no-hash");
  assert.match(String(b.key), ENCRYPTED, "legacy row without a hash must be encrypted too");
  assert.equal(b.key_hash, opaqueTokenFingerprint(noHash), "missing key_hash must be computed");
  assert.equal(b.key_prefix, noHash.slice(0, 12), "missing key_prefix must be filled");

  assert.equal(((await apiKeysDb.getApiKeyById("legacy-no-hash")) as Row).key, noHash);

  // Idempotent: a second pass must not double-encrypt or change the hash.
  apiKeysDb.resetApiKeyState();
  assert.equal(await apiKeysDb.validateApiKey(noHash), true);
  const again = keyRow("legacy-no-hash");
  assert.equal(again.key_hash, b.key_hash);
  assert.equal(((await apiKeysDb.getApiKeyById("legacy-no-hash")) as Row).key, noHash);
});

test("a legacy row written after the first-use pass is still picked up lazily", async () => {
  // The module has already run its pass in this process (no reset here on purpose).
  const late = "sk-synthetic-legacy-late-row-0003";
  insertLegacyRow({ id: "legacy-late", key: late, withHash: false });

  assert.equal(await apiKeysDb.validateApiKey(late), true, "late legacy row must authenticate");
  const row = keyRow("legacy-late");
  assert.match(String(row.key), ENCRYPTED);
  assert.equal(row.key_hash, opaqueTokenFingerprint(late));
});

test("export -> import round-trip restores a usable key, stored encrypted and hashed", async () => {
  const created = await apiKeysDb.createApiKey("roundtrip-key", "machine-rt", ["read:usage"]);
  const exported = ((await apiKeysDb.getApiKeys()) as Row[]).filter((k) => k.id === created.id);
  assert.equal(exported[0]?.key, created.key, "export carries the raw key");
  const backup = JSON.parse(JSON.stringify(exported)) as Row[];

  const db = core.getDbInstance();
  db.prepare("DELETE FROM api_keys WHERE id = ?").run(created.id);
  runJsonMigration(db, { apiKeys: backup });
  apiKeysDb.clearApiKeyCaches();

  const row = keyRow(created.id);
  assert.match(String(row.key), ENCRYPTED, "imported key must be stored encrypted");
  assert.equal(row.key_hash, opaqueTokenFingerprint(created.key));
  assert.equal(row.key_prefix, created.key.slice(0, 12));
  assert.equal(await apiKeysDb.validateApiKey(created.key), true);
  assert.equal(((await apiKeysDb.getApiKeyById(created.id)) as Row).key, created.key);

  // A legacy backup that only carries the raw key (no hash / prefix) imports the same way.
  runJsonMigration(db, {
    apiKeys: [{ id: "legacy-backup-key", name: "legacy", key: "sk-synthetic-legacy-backup" }],
  });
  apiKeysDb.clearApiKeyCaches();
  const legacy = keyRow("legacy-backup-key");
  assert.match(String(legacy.key), ENCRYPTED);
  assert.equal(legacy.key_hash, opaqueTokenFingerprint("sk-synthetic-legacy-backup"));
  assert.equal(await apiKeysDb.validateApiKey("sk-synthetic-legacy-backup"), true);
});

test("a /v1 route handler still authenticates the bearer end to end", async () => {
  const created = await apiKeysDb.createApiKey("v1-files-key", "machine-v1", []);

  const ok = await filesRoute.GET(
    new Request("http://localhost:20128/v1/files", {
      headers: { authorization: `Bearer ${created.key}` },
    })
  );
  assert.equal(ok.status, 200);

  const denied = await filesRoute.GET(
    new Request("http://localhost:20128/v1/files", {
      headers: { authorization: "Bearer sk-synthetic-not-a-key" },
    })
  );
  assert.equal(denied.status, 401);
});
