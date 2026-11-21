// Google Flow Web (#18325): a session cookie rotated during a browser run is persisted
// through the provider-connection DB module (src/lib/db/providers.ts via
// updateProviderCredentials), encrypted at rest — never by raw SQL from the executor.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-googleflow-cookie-"));
const fixtureEnv = {
  DATA_DIR: dataDir,
  NODE_ENV: "test",
  STORAGE_ENCRYPTION_KEY: "googleflow-cookie-fixture-key/with+base64==",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
  OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK: "1",
};
const previousEnv = new Map(Object.keys(fixtureEnv).map((key) => [key, process.env[key]]));
Object.assign(process.env, fixtureEnv);
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("Unexpected fetch: Google Flow cookie persistence tests must stay offline");
};

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { persistRotatedSessionCookie } = await import("../../src/sse/services/tokenRefresh.ts");

assert.equal(core.DATA_DIR, dataDir, "all persistence must use the disposable database");

test.after(() => {
  core.resetDbInstance();
  globalThis.fetch = originalFetch;
  for (const [key, value] of previousEnv) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const ORIGINAL_COOKIE = "__Secure-1PSID=sid-original; __Secure-1PSIDTS=ts-original";
const ROTATED_COOKIE = "__Secure-1PSID=sid-original; __Secure-1PSIDTS=ts-rotated";

async function createFlowConnection() {
  const created = await providers.createProviderConnection({
    provider: "googleflow-web",
    authType: "apikey",
    name: "Google Flow cookie fixture",
    apiKey: ORIGINAL_COOKIE,
  });
  return created.id as string;
}

function rawApiKey(id: string): string {
  const row = core
    .getDbInstance()
    .prepare("SELECT api_key FROM provider_connections WHERE id = ?")
    .get(id) as { api_key: string } | undefined;
  assert.ok(row, "fixture connection must exist");
  return row.api_key;
}

test("a rotated Flow session cookie replaces the stored apiKey, encrypted at rest", async () => {
  const id = await createFlowConnection();
  const persist = persistRotatedSessionCookie(id);
  assert.equal(typeof persist, "function");

  await persist!(ROTATED_COOKIE);

  const stored = await providers.getProviderConnectionById(id);
  assert.equal(stored?.apiKey, ROTATED_COOKIE);
  const raw = rawApiKey(id);
  assert.ok(raw.startsWith("enc:v1:"), "the cookie is stored through the encryption layer");
  assert.ok(!raw.includes("ts-rotated"), "the plaintext cookie never reaches the row");
});

test("an empty cookie never overwrites the stored session", async () => {
  const id = await createFlowConnection();
  await persistRotatedSessionCookie(id)!("   ");
  const stored = await providers.getProviderConnectionById(id);
  assert.equal(stored?.apiKey, ORIGINAL_COOKIE);
});

test("no persister without a stored connection id", () => {
  assert.equal(persistRotatedSessionCookie(undefined), undefined);
  assert.equal(persistRotatedSessionCookie(""), undefined);
  assert.equal(persistRotatedSessionCookie(42), undefined);
});
