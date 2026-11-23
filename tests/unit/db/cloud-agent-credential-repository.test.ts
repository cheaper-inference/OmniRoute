/**
 * Contract of the cloud agent credential repository (Promise-based, SQLite
 * implementation) and of the facade wiring: encryption at rest stays inside the
 * repository, plaintext keys only come back from the single-provider read, and the
 * synchronous legacy access used by the facade is the same SQLite store.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "cloud-agent-credential-repository-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.STORAGE_ENCRYPTION_KEY = "cloud-agent-credential-repository-key";

const core = await import("../../../src/lib/db/core.ts");
const { cloudAgentRepositories } =
  await import("../../../src/lib/db/repositories/cloudAgentRepositories.ts");
const domain = await import("../../../src/domain/persistence/cloudAgentCredentialRepository.ts");
const facade = await import("../../../src/lib/cloudAgent/credentials.ts");

const repo = cloudAgentRepositories.credentials;
const legacy = cloudAgentRepositories.legacySync.credentials;

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

function storedColumn(providerId: string): string | undefined {
  const row = core
    .getDbInstance()
    .prepare("SELECT api_key_encrypted FROM cloud_agent_credentials WHERE provider_id = ?")
    .get(providerId) as { api_key_encrypted: string } | undefined;
  return row?.api_key_encrypted;
}

test("repository round-trip: save → find → listMasked → delete, all Promises", async () => {
  await promised(repo.save("devin", "devin-secret-2468", "https://devin.example"));
  assert.deepEqual(await promised(repo.findByProviderId("devin")), {
    apiKey: "devin-secret-2468",
    baseUrl: "https://devin.example",
  });
  const listed = await promised(repo.listMasked());
  assert.deepEqual(
    listed.map(({ providerId, apiKey, baseUrl }) => ({ providerId, apiKey, baseUrl })),
    [{ providerId: "devin", apiKey: "****2468", baseUrl: "https://devin.example" }]
  );
  await promised(repo.delete("devin"));
  assert.equal(await promised(repo.findByProviderId("devin")), null);
  await promised(repo.delete("devin"));
});

test("encryption at rest is owned by the repository: ciphertext stored, plaintext not", async () => {
  await repo.save("jules", "sk-jules-plain-1357");
  const column = storedColumn("jules");
  assert.match(column ?? "", /^enc:v1:/);
  assert.ok(!(column ?? "").includes("sk-jules-plain-1357"));
  const listed = await repo.listMasked();
  assert.ok(!JSON.stringify(listed).includes("sk-jules-plain-1357"));
  assert.ok(!JSON.stringify(listed).includes(column ?? "<none>"));
});

test("save rejects without writing when the key cannot be encrypted", async () => {
  await assert.rejects(repo.save("jules", ""), { message: "Failed to encrypt API key" });
  assert.equal(storedColumn("jules"), undefined);
});

test("find resolves null for undecryptable ciphertext", async () => {
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO cloud_agent_credentials (provider_id, api_key_encrypted, base_url) VALUES (?, ?, ?)"
    )
    .run("devin", "enc:v1:00:00:00", "https://devin.example");
  assert.equal(await repo.findByProviderId("devin"), null);
  const [summary] = await repo.listMasked();
  assert.equal(summary.apiKey, "****");
});

test("legacySync is the same SQLite store as the Promise repository", async () => {
  legacy.save("codex-cloud", "sk-legacy-1111");
  assert.deepEqual(await repo.findByProviderId("codex-cloud"), { apiKey: "sk-legacy-1111" });
  await repo.save("codex-cloud", "sk-async-2222", "https://c.example");
  assert.deepEqual(legacy.findByProviderId("codex-cloud"), {
    apiKey: "sk-async-2222",
    baseUrl: "https://c.example",
  });
  assert.deepEqual(legacy.listMasked(), await repo.listMasked());
  legacy.delete("codex-cloud");
  assert.equal(await repo.findByProviderId("codex-cloud"), null);
});

test("facade delegates to the composition root and re-exports the domain mask", async () => {
  assert.equal(facade.maskApiKey, domain.maskApiKey);
  facade.saveCloudAgentCredential("cursor-cloud", "sk-facade-3333");
  assert.deepEqual(await repo.findByProviderId("cursor-cloud"), { apiKey: "sk-facade-3333" });
  await repo.save("cursor-cloud", "sk-repo-4444", "https://cursor.example");
  assert.deepEqual(facade.getCloudAgentCredentialFromDb("cursor-cloud"), {
    apiKey: "sk-repo-4444",
    baseUrl: "https://cursor.example",
  });
  assert.deepEqual(facade.listCloudAgentCredentials(), await repo.listMasked());
  facade.deleteCloudAgentCredential("cursor-cloud");
  assert.equal(await repo.findByProviderId("cursor-cloud"), null);
});
