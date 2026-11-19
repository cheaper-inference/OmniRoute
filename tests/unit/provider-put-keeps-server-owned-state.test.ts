import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-put-server-state-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.STORAGE_ENCRYPTION_KEY = "put-server-state-synthetic-storage-key";
process.env.JWT_SECRET = "put-server-state-synthetic-management-secret";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const detailRoute = await import("../../src/app/api/providers/[id]/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const WARNING = {
  status: "warning",
  failures: 1,
  lastFailure: "2026-11-01T00:00:00.000Z",
  lastSuccess: null,
  totalRequests: 1,
  totalFailures: 1,
};
const INVALID = { ...WARNING, status: "invalid", failures: 2, totalRequests: 2, totalFailures: 2 };

type Psd = {
  tier?: string;
  apiKeyHealth?: { primary?: { status: string; failures: number } };
  verificationUrl?: string;
  alibabaFreeDrainedModels?: string[];
};

async function storedPsd(id: string): Promise<Psd> {
  return (await providers.getProviderConnectionById(id))!.providerSpecificData as Psd;
}

async function put(id: string, body: Record<string, unknown>) {
  const response = await detailRoute.PUT(
    await makeManagementSessionRequest(`http://localhost/api/providers/${id}`, {
      method: "PUT",
      body,
    }),
    { params: Promise.resolve({ id }) }
  );
  assert.equal(response.status, 200);
}

async function seed() {
  const created = await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "put-server-state",
    apiKey: "synthetic-primary-key",
    providerSpecificData: { tier: "old", apiKeyHealth: { primary: WARNING } },
  });
  assert.ok(created?.id);
  return created.id as string;
}

test("PUT with a stale form does not undo runtime key health and account state", async () => {
  const id = await seed();
  // The dashboard loads the connection here.
  const staleForm = (await providers.getProviderConnectionById(id))!.providerSpecificData;
  // Runtime writers then change server-owned state.
  await providers.updateProviderConnection(id, {
    providerSpecificData: { ...staleForm, apiKeyHealth: { primary: INVALID } },
  });
  await providers.mergeConnectionProviderSpecificData(id, {
    verificationUrl: "https://example.test/verify",
    alibabaFreeDrainedModels: ["model-a"],
  });

  await put(id, { name: "renamed", providerSpecificData: { ...staleForm, tier: "new" } });

  const stored = (await providers.getProviderConnectionById(id))!;
  const psd = stored.providerSpecificData as Psd;
  assert.equal(stored.name, "renamed");
  assert.equal(psd.tier, "new", "client-owned keys still update");
  assert.equal(psd.apiKeyHealth?.primary.status, "invalid");
  assert.equal(psd.apiKeyHealth?.primary.failures, 2);
  assert.equal(psd.verificationUrl, "https://example.test/verify");
  assert.deepEqual(psd.alibabaFreeDrainedModels, ["model-a"]);
});

test("PUT cannot inject server-owned keys the server never stored", async () => {
  const id = await seed();
  await put(id, {
    providerSpecificData: {
      verificationUrl: "https://example.test/forged",
      alibabaFreeDrainedModels: ["forged-model"],
    },
  });
  const psd = await storedPsd(id);
  assert.equal(psd.verificationUrl, undefined);
  assert.equal(psd.alibabaFreeDrainedModels, undefined);
  assert.equal(psd.apiKeyHealth?.primary.status, "warning");
});

test("PUT with a replaced primary key still clears the stored primary health", async () => {
  const id = await seed();
  await put(id, { apiKey: "synthetic-replacement-key", providerSpecificData: {} });
  const psd = await storedPsd(id);
  assert.equal(psd.apiKeyHealth, undefined);
});
