import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-health-attr-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection, getProviderConnectionById, mergeConnectionProviderSpecificData } =
  await import("../../src/lib/db/providers.ts");
const { recordKeyHealthStatus } = await import("../../open-sse/handlers/chatCore/keyHealth.ts");
const { getAllKeyHealth, removeConnectionHealth } =
  await import("../../open-sse/services/apiKeyRotator.ts");
const { DarioExecutor } = await import("../../open-sse/executors/dario.ts");

const noopLog = { warn: () => {}, error: () => {} };
const KEY = ["kh", "test", "key"].join("-");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const creds = (connectionId: string, providerSpecificData: Record<string, unknown> = {}) => ({
  connectionId,
  apiKey: KEY,
  accessToken: null,
  providerSpecificData,
});

async function waitFor<T>(read: () => Promise<T | undefined>): Promise<T> {
  for (let i = 0; i < 100; i++) {
    const value = await read();
    if (value !== undefined) return value;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error("timed out waiting for the key-health write");
}

test("a 403 for a region or policy block is not a credential failure", () => {
  const conn = "kh-forbidden-policy";
  const body = JSON.stringify({ error: { message: "Forbidden: blocked by content policy" } });
  recordKeyHealthStatus(403, creds(conn), noopLog, undefined, body);
  recordKeyHealthStatus(403, creds(conn), noopLog, undefined, "Access denied for your region");
  assert.equal(getAllKeyHealth()[`${conn}:primary`], undefined);
  removeConnectionHealth(conn);
});

test("failures behind Dario are not charged to the native connection key", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => new Response("{}", { status: 401 })) as typeof fetch;
  try {
    const result = await new DarioExecutor().execute({
      model: "claude-sonnet-4-5",
      body: { model: "claude-sonnet-4-5", messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: KEY } as never,
    });
    assert.equal(result.transport, "dario");
    const conn = "kh-dario";
    recordKeyHealthStatus(401, creds(conn), noopLog, result.transport);
    recordKeyHealthStatus(401, creds(conn), noopLog, result.transport);
    assert.equal(getAllKeyHealth()[`${conn}:primary`], undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a key-health write keeps provider data saved after the request chose its credentials", async () => {
  const created = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "key-health-stale",
    apiKey: KEY,
    isActive: true,
    providerSpecificData: { baseUrl: "https://example.test/v1", note: "operator" },
  });
  const id = String((created as { id: string }).id);
  const staleSnapshot = { baseUrl: "https://example.test/v1", note: "operator" };
  await mergeConnectionProviderSpecificData(id, { verificationUrl: "https://example.test/verify" });

  recordKeyHealthStatus(401, creds(id, staleSnapshot), noopLog);

  const stored = await waitFor(async () => {
    const psd = (await getProviderConnectionById(id))?.providerSpecificData as
      Record<string, unknown> | undefined;
    return psd?.apiKeyHealth ? psd : undefined;
  });
  assert.equal(stored.verificationUrl, "https://example.test/verify");
  assert.equal(stored.note, "operator");
  removeConnectionHealth(id);
});
