// recordKeyHealthStatus() persisted `{ ...creds.providerSpecificData, apiKeyHealth }`. In the
// chat path those credentials are a per-request copy carrying request-local keys
// (`ccSessionId`, `targetFormat`, `apiType`, the rotated `selectedKeyId`), so one request's
// values became stored connection state, and the stale snapshot overwrote concurrent edits.
// Only the apiKeyHealth slice may be written. A persisted sticky key in cooldown must also not
// be handed back by the rotator.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-health-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection, getProviderConnectionById, updateProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { recordKeyHealthStatus } = await import("../../open-sse/handlers/chatCore/keyHealth.ts");
const { recordKeyCooldown, resolveKeyForRequest, removeConnectionHealth } =
  await import("../../open-sse/services/apiKeyRotator.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const K0 = "sk-primary-key-health";
const K1 = "sk-extra-key-health";

async function seedConnection(extra: Record<string, unknown> = {}) {
  const conn = (await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: `key-health-${Math.random().toString(36).slice(2)}`,
    apiKey: K0,
    providerSpecificData: { extraApiKeys: [K1], ...extra },
  })) as { id: string };
  return conn.id;
}

async function storedPsd(id: string): Promise<Record<string, unknown>> {
  const row = (await getProviderConnectionById(id)) as {
    providerSpecificData?: Record<string, unknown>;
  };
  return row?.providerSpecificData ?? {};
}

// The write is fire-and-forget; give it a turn of the event loop and a DB round trip.
const settle = () => new Promise((resolve) => setTimeout(resolve, 150));

function requestCreds(id: string, psd: Record<string, unknown>) {
  return {
    connectionId: id,
    apiKey: K0,
    providerSpecificData: {
      ...psd,
      ccSessionId: "session-of-another-caller",
      targetFormat: "claude",
      apiType: "responses",
      selectedKeyId: "extra_0",
    },
  } as Record<string, unknown>;
}

test("a key-health write stores apiKeyHealth only, not request-local keys", async () => {
  const id = await seedConnection();
  recordKeyHealthStatus(429, requestCreds(id, await storedPsd(id)));
  await settle();
  const psd = await storedPsd(id);
  assert.ok(psd.apiKeyHealth, "apiKeyHealth was persisted");
  for (const key of ["ccSessionId", "targetFormat", "apiType", "selectedKeyId"]) {
    assert.equal(psd[key], undefined, `${key} leaked into the stored connection`);
  }
  removeConnectionHealth(id);
});

test("a key-health write keeps a concurrent change to providerSpecificData", async () => {
  const id = await seedConnection({ note: "old" });
  const snapshot = await storedPsd(id);
  await updateProviderConnection(id, { providerSpecificData: { ...snapshot, note: "new" } });
  recordKeyHealthStatus(429, requestCreds(id, snapshot));
  await settle();
  assert.equal((await storedPsd(id)).note, "new");
  removeConnectionHealth(id);
});

test("a sticky key in cooldown is not handed back by the rotator", () => {
  const id = "key-health-sticky-cooldown";
  recordKeyCooldown(id, "extra_0", 60_000);
  const resolved = resolveKeyForRequest(id, K0, [K1], "extra_0");
  assert.notEqual(resolved?.keyId, "extra_0");
  removeConnectionHealth(id);
});
