/**
 * Characterization of the cloud-agent credential store through the public exports of
 * src/lib/cloudAgent/credentials.ts only, so the same file passes against the
 * pre-repository module and against the repository-backed facade: synchronous shapes,
 * encryption at rest, decrypt fallbacks, list masking, upsert semantics, the
 * empty-key encrypt failure and delete.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "cloud-agent-credential-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.STORAGE_ENCRYPTION_KEY = "cloud-agent-credential-characterization-key";

const core = await import("../../../src/lib/db/core.ts");
const creds = await import("../../../src/lib/cloudAgent/credentials.ts");

type StoredRow = {
  provider_id: string;
  api_key_encrypted: string;
  base_url: string | null;
  updated_at: string;
};

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function storedRows(): StoredRow[] {
  return core
    .getDbInstance()
    .prepare(
      "SELECT provider_id, api_key_encrypted, base_url, updated_at FROM cloud_agent_credentials ORDER BY provider_id"
    )
    .all() as StoredRow[];
}

function insertRaw(providerId: string, apiKeyColumn: string, baseUrl: string | null): void {
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO cloud_agent_credentials (provider_id, api_key_encrypted, base_url) VALUES (?, ?, ?)"
    )
    .run(providerId, apiKeyColumn, baseUrl);
}

test("every export stays synchronous", () => {
  const saved = creds.saveCloudAgentCredential("jules", "sk-sync-1111");
  assert.equal(saved, undefined);
  const got = creds.getCloudAgentCredentialFromDb("jules");
  assert.ok(!(got instanceof Promise));
  const listed = creds.listCloudAgentCredentials();
  assert.ok(Array.isArray(listed));
  assert.equal(creds.deleteCloudAgentCredential("jules"), undefined);
  assert.equal(typeof creds.maskApiKey("abcdef"), "string");
});

test("maskApiKey: last four characters, four or fewer → ****", () => {
  assert.equal(creds.maskApiKey("sk-abcdef-9876"), "****9876");
  assert.equal(creds.maskApiKey("abcde"), "****bcde");
  assert.equal(creds.maskApiKey("abcd"), "****");
  assert.equal(creds.maskApiKey(""), "****");
});

test("save stores ciphertext, never the plaintext key, and get decrypts it", () => {
  creds.saveCloudAgentCredential("devin", "devin-secret-4321", "https://devin.example");
  const [row] = storedRows();
  assert.equal(row.provider_id, "devin");
  assert.match(row.api_key_encrypted, /^enc:v1:[0-9a-f]+:[0-9a-f]+:[0-9a-f]+$/);
  assert.ok(!row.api_key_encrypted.includes("devin-secret-4321"));
  assert.equal(row.base_url, "https://devin.example");
  assert.match(row.updated_at, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  assert.deepEqual(creds.getCloudAgentCredentialFromDb("devin"), {
    apiKey: "devin-secret-4321",
    baseUrl: "https://devin.example",
  });
});

test("get: unknown provider → null; no baseUrl key when the column is null or empty", () => {
  assert.equal(creds.getCloudAgentCredentialFromDb("missing"), null);
  creds.saveCloudAgentCredential("jules", "sk-jules-0001");
  assert.equal(storedRows()[0].base_url, null);
  const got = creds.getCloudAgentCredentialFromDb("jules");
  assert.deepEqual(got, { apiKey: "sk-jules-0001" });
  assert.equal(Object.hasOwn(got as object, "baseUrl"), false);

  insertRaw("cursor-cloud", "plain-cursor-key", "");
  assert.deepEqual(creds.getCloudAgentCredentialFromDb("cursor-cloud"), {
    apiKey: "plain-cursor-key",
  });
});

test("upsert replaces key and base URL; omitted base URL clears it to null", () => {
  creds.saveCloudAgentCredential("codex-cloud", "sk-first-1111", "https://a.example");
  const before = storedRows()[0].api_key_encrypted;
  creds.saveCloudAgentCredential("codex-cloud", "sk-second-2222");
  const rows = storedRows();
  assert.equal(rows.length, 1);
  assert.notEqual(rows[0].api_key_encrypted, before);
  assert.equal(rows[0].base_url, null);
  assert.deepEqual(creds.getCloudAgentCredentialFromDb("codex-cloud"), {
    apiKey: "sk-second-2222",
  });
});

test("legacy plaintext rows pass through; undecryptable ciphertext reads as null", () => {
  insertRaw("jules", "legacy-plain-key-7777", "https://legacy.example");
  assert.deepEqual(creds.getCloudAgentCredentialFromDb("jules"), {
    apiKey: "legacy-plain-key-7777",
    baseUrl: "https://legacy.example",
  });
  insertRaw("devin", "enc:v1:00:00:00", null);
  assert.equal(creds.getCloudAgentCredentialFromDb("devin"), null);
  insertRaw("cursor-cloud", "enc:v1:malformed", null);
  assert.equal(creds.getCloudAgentCredentialFromDb("cursor-cloud"), null);
});

test("an already encrypted value is stored as given (no double encryption)", () => {
  creds.saveCloudAgentCredential("jules", "sk-original-5555");
  const cipher = storedRows()[0].api_key_encrypted;
  creds.saveCloudAgentCredential("devin", cipher);
  const devin = storedRows().find((r) => r.provider_id === "devin");
  assert.equal(devin?.api_key_encrypted, cipher);
  assert.deepEqual(creds.getCloudAgentCredentialFromDb("devin"), { apiKey: "sk-original-5555" });
});

test("list masks decrypted keys (undecryptable → ****) and returns raw columns", () => {
  creds.saveCloudAgentCredential("devin", "devin-secret-9999", "https://d.example");
  insertRaw("jules", "enc:v1:00:00:00", null);
  insertRaw("cursor-cloud", "legacy-plain-abcd", "");
  const listed = [...creds.listCloudAgentCredentials()].sort((a, b) =>
    a.providerId.localeCompare(b.providerId)
  );
  assert.deepEqual(
    listed.map(({ providerId, apiKey, baseUrl }) => ({ providerId, apiKey, baseUrl })),
    [
      { providerId: "cursor-cloud", apiKey: "****abcd", baseUrl: "" },
      { providerId: "devin", apiKey: "****9999", baseUrl: "https://d.example" },
      { providerId: "jules", apiKey: "****", baseUrl: null },
    ]
  );
  for (const item of listed) {
    assert.deepEqual(Object.keys(item), ["providerId", "apiKey", "baseUrl", "updatedAt"]);
    assert.equal(typeof item.updatedAt, "string");
  }
  assert.ok(!JSON.stringify(listed).includes("devin-secret-9999"));
});

test("an empty API key fails to encrypt: throws and writes nothing", () => {
  assert.throws(() => creds.saveCloudAgentCredential("jules", ""), {
    message: "Failed to encrypt API key",
  });
  assert.deepEqual(storedRows(), []);
});

test("delete removes only that provider and ignores unknown ids", () => {
  creds.saveCloudAgentCredential("jules", "sk-jules-1");
  creds.saveCloudAgentCredential("devin", "sk-devin-2");
  creds.deleteCloudAgentCredential("jules");
  creds.deleteCloudAgentCredential("does-not-exist");
  assert.deepEqual(
    storedRows().map((r) => r.provider_id),
    ["devin"]
  );
  assert.equal(creds.getCloudAgentCredentialFromDb("jules"), null);
});
