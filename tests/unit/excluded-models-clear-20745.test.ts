// Regression guard for #20745 — clearing "Excluded Models" in Edit Connection and
// saving kept the old exclusions.
//
// Root cause: parseExcludedModelsInput("") returns `undefined`. Both edit paths
// (EditConnectionModal's OAuth branch and assignEditApiKeyProviderSpecificData)
// put that into providerSpecificData.excludedModels, JSON.stringify drops the key,
// and PUT /api/providers/[id] merges { ...existingPsd, ...incomingPsd }, so the
// stored list survived. Fix: edit saves send an explicit `[]` for a cleared field
// (parseExcludedModelsForEdit); the server normalizer then removes the empty list.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-excluded-models-20745-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = "test-jwt-secret-excluded-models-20745";
process.env.INITIAL_PASSWORD = "admin-secret";

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection, getProviderConnectionById } =
  await import("../../src/lib/db/providers.ts");
const providerByIdRoute = await import("../../src/app/api/providers/[id]/route.ts");
const { parseExcludedModelsForEdit } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/providerInputParsers.ts");
const { assignEditApiKeyProviderSpecificData } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/connectionProviderSpecificData.ts");

type StoredConnection = { id: string; providerSpecificData: Record<string, unknown> };
type EditFormData = Parameters<typeof assignEditApiKeyProviderSpecificData>[0]["formData"];

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createCodexConnection(authType: string, excludedModels: string[]) {
  return (await createProviderConnection({
    provider: "codex",
    authType,
    name: "Codex",
    email: "user@example.com",
    accessToken: "access-token-value",
    refreshToken: "refresh-token-value",
    apiKey: authType === "apikey" ? "sk-test-value" : undefined,
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    isActive: true,
    testStatus: "active",
    providerSpecificData: { workspaceId: "workspace-abc", excludedModels },
  })) as StoredConnection;
}

async function putProviderSpecificData(id: string, providerSpecificData: Record<string, unknown>) {
  // JSON round-trip, as fetch() does: `undefined` values are dropped on the wire.
  const body = JSON.parse(JSON.stringify({ providerSpecificData }));
  const request = await makeManagementSessionRequest(`http://localhost/api/providers/${id}`, {
    method: "PUT",
    body,
  });
  const response = await providerByIdRoute.PUT(request, { params: Promise.resolve({ id }) });
  assert.equal(response.status, 200, JSON.stringify(await response.clone().json()));
  return (await getProviderConnectionById(id)) as StoredConnection;
}

test("parseExcludedModelsForEdit sends [] for a cleared field (#20745)", () => {
  assert.deepEqual(parseExcludedModelsForEdit(""), []);
  assert.deepEqual(parseExcludedModelsForEdit(" , "), []);
  assert.deepEqual(parseExcludedModelsForEdit("gpt-6.1-sol, gpt-6.1-sol, o9*"), [
    "gpt-6.1-sol",
    "o9*",
  ]);
});

test("Codex OAuth edit with a cleared Excluded Models field removes the saved list (#20745)", async () => {
  const connection = await createCodexConnection("oauth", ["gpt-6.1-sol"]);
  assert.deepEqual(connection.providerSpecificData.excludedModels, ["gpt-6.1-sol"]);

  // Mirrors EditConnectionModal's OAuth branch.
  const updated = await putProviderSpecificData(connection.id, {
    ...connection.providerSpecificData,
    tag: undefined,
    excludedModels: parseExcludedModelsForEdit(""),
  });

  assert.equal(updated.providerSpecificData.excludedModels, undefined);
  assert.equal(updated.providerSpecificData.workspaceId, "workspace-abc");
});

test("API-key edit with a cleared Excluded Models field removes the saved list (#20745)", async () => {
  const connection = await createCodexConnection("apikey", ["gpt-6.1-sol"]);
  const target: Record<string, unknown> = {};
  assignEditApiKeyProviderSpecificData({
    provider: "codex",
    formData: {
      tag: "",
      routingTags: "",
      excludedModels: "",
      customUserAgent: "",
      consoleApiKey: "",
      huggingfaceBillTo: "",
      newApiUserId: "",
      cx: "",
      passthroughModels: false,
    } as unknown as EditFormData,
    target,
    extraApiKeys: [],
    openRouterPreset: { getPatch: () => ({}) },
    usesBaseUrl: false,
    validatedBaseUrl: null,
    showsRegion: false,
    defaultRegion: "",
    isGlm: false,
    isCloudflare: false,
    isAntigravityFamily: false,
    trimmedCloudCodeProjectId: "",
    isGooglePse: false,
    isCcCompatible: false,
  });
  assert.deepEqual(target.excludedModels, []);

  const updated = await putProviderSpecificData(connection.id, target);
  assert.equal(updated.providerSpecificData.excludedModels, undefined);
});

test("a partial update that omits excludedModels keeps the saved list (#20745 control)", async () => {
  const connection = await createCodexConnection("oauth", ["gpt-6.1-sol"]);
  const updated = await putProviderSpecificData(connection.id, { tag: "team-a" });
  assert.deepEqual(updated.providerSpecificData.excludedModels, ["gpt-6.1-sol"]);
});
