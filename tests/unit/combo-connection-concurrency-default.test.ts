import { after, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-conn-default-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { lookupPositiveCap } = await import("../../open-sse/services/combo/concurrencyCaps.ts");
const { getProviderDefaultConnectionConcurrency, setProviderQuotaOverrides } =
  await import("../../open-sse/services/providerDefaultRateLimit.ts");
const { buildAccountSemaphoreKey } = await import("../../open-sse/services/accountSemaphore.ts");
const {
  getAdaptiveConnectionLimit,
  recordAdaptiveConnectionResponse,
  resetAdaptiveConnectionLimitsForTest,
} = await import("../../open-sse/services/adaptiveConnectionConcurrency.ts");

async function createConnection(maxConcurrent: number | null): Promise<string> {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: `openai-${String(maxConcurrent)}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "sk-test",
    maxConcurrent,
  });
  assert.ok(connection);
  assert.equal(typeof connection.id, "string");
  return connection.id as string;
}

describe("combo pre-dispatch connection cap", () => {
  beforeEach(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
    resetAdaptiveConnectionLimitsForTest();
    setProviderQuotaOverrides(null);
  });

  after(() => {
    setProviderQuotaOverrides(null);
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("uses the operator's provider default only when the connection has no cap", async () => {
    setProviderQuotaOverrides({ openai: { defaultConnectionConcurrency: 6 } });

    assert.equal(await lookupPositiveCap(await createConnection(null)), 6);
    assert.equal(await lookupPositiveCap(await createConnection(0)), 6);
    assert.equal(await lookupPositiveCap(await createConnection(2)), 2);
  });

  it("keeps connections uncapped when no provider default is configured", async () => {
    assert.equal(await lookupPositiveCap(await createConnection(null)), null);
    assert.equal(await lookupPositiveCap(await createConnection(0)), null);
  });

  it("reads the adaptive limit from the same key the chat admission gate updates", async () => {
    setProviderQuotaOverrides({ openai: { defaultConnectionConcurrency: 8 } });
    const connectionId = await createConnection(-1);
    const key = buildAccountSemaphoreKey({ provider: "openai", accountKey: connectionId });

    assert.equal(await lookupPositiveCap(connectionId), 8);
    recordAdaptiveConnectionResponse(key, 429);
    assert.equal(getAdaptiveConnectionLimit(key), 4);
    assert.equal(await lookupPositiveCap(connectionId), 4);
  });

  it("ignores non-positive provider defaults", () => {
    setProviderQuotaOverrides({ openai: { defaultConnectionConcurrency: 0 } });

    assert.equal(getProviderDefaultConnectionConcurrency("openai"), null);
    assert.equal(getProviderDefaultConnectionConcurrency("unknown"), null);
    assert.equal(getProviderDefaultConnectionConcurrency(""), null);
  });
});
