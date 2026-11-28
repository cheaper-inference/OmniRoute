/**
 * @file antigravity-project-persistence.test.ts
 * @description Regression tests for Antigravity projectId persistence and account selection.
 *
 * @changes
 * - [2026-07-24] [Composer] - Initial coverage for runtime projectId persistence helpers
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-project-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "ag-project-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const {
  extractAntigravityProjectIdFromPayload,
  getStoredAntigravityProjectId,
  markAntigravityMissingCloudCodeProject,
  persistDiscoveredAntigravityProjectId,
  preferAntigravityConnectionsWithStoredProject,
} = await import("../../open-sse/services/antigravityProjectPersist.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
});

test("extractAntigravityProjectIdFromPayload reads string and object project ids", () => {
  assert.equal(
    extractAntigravityProjectIdFromPayload({ cloudaicompanionProject: "stable-theater-6thmw" }),
    "stable-theater-6thmw"
  );
  assert.equal(
    extractAntigravityProjectIdFromPayload({
      cloudaicompanionProject: { id: "subtle-processor-mxhhm" },
    }),
    "subtle-processor-mxhhm"
  );
  assert.equal(extractAntigravityProjectIdFromPayload({ cloudaicompanionProject: null }), null);
});

test("getStoredAntigravityProjectId prefers connection column then providerSpecificData", () => {
  assert.equal(
    getStoredAntigravityProjectId({
      projectId: "column-project",
      providerSpecificData: { projectId: "psd-project" },
    }),
    "column-project"
  );
  assert.equal(
    getStoredAntigravityProjectId({
      providerSpecificData: { projectId: "psd-only" },
    }),
    "psd-only"
  );
  assert.equal(getStoredAntigravityProjectId({}), null);
});

test("preferAntigravityConnectionsWithStoredProject keeps no-project pool when all lack projectId", () => {
  const connections = [
    { id: "a", projectId: "" },
    { id: "b", providerSpecificData: {} },
  ];
  assert.deepEqual(
    preferAntigravityConnectionsWithStoredProject(connections).map((c) => c.id),
    ["a", "b"]
  );
});

test("preferAntigravityConnectionsWithStoredProject prefers stored projectId accounts", () => {
  const connections = [
    { id: "broken", errorCode: "missing_project_id" },
    { id: "no-project", projectId: "" },
    { id: "healthy", projectId: "bright-ripsaw-xtq63" },
  ];
  assert.deepEqual(
    preferAntigravityConnectionsWithStoredProject(connections).map((c) => c.id),
    ["healthy"]
  );
});

test("preferAntigravityConnectionsWithStoredProject skips confirmed-missing when alternatives exist", () => {
  const connections = [
    { id: "broken", errorCode: "missing_project_id", projectId: "" },
    { id: "fallback", projectId: "" },
    { id: "healthy", projectId: "instant-haiku-j0zxb" },
  ];
  assert.deepEqual(
    preferAntigravityConnectionsWithStoredProject(connections).map((c) => c.id),
    ["healthy"]
  );
});

test("persistDiscoveredAntigravityProjectId writes projectId without reactivating the row", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "persist-project",
    email: "persist-project@example.test",
    accessToken: "token",
    refreshToken: "refresh",
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
    providerSpecificData: { tier: "legacy-tier" },
    isActive: true,
    testStatus: "active",
  });

  markAntigravityMissingCloudCodeProject(connection.id);
  await new Promise((resolve) => setTimeout(resolve, 50));
  await persistDiscoveredAntigravityProjectId(
    connection.id,
    "discovered-project-123",
    connection.providerSpecificData as Record<string, unknown>
  );

  const updated = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(updated?.projectId, "discovered-project-123");
  assert.equal(
    (updated?.providerSpecificData as Record<string, unknown>)?.projectId,
    "discovered-project-123"
  );
  assert.equal((updated?.providerSpecificData as Record<string, unknown>)?.tier, "legacy-tier");
  assert.equal(updated?.isActive, false, "a confirmed-missing row stays disabled");
  assert.equal(updated?.testStatus, "unavailable");
  assert.equal(updated?.errorCode, "missing_project_id");
  assert.equal(updated?.lastErrorType, "oauth_missing_project_id");
});

test("persistDiscoveredAntigravityProjectId keeps metadata written after the caller snapshot", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "persist-project-concurrent",
    email: "persist-project-concurrent@example.test",
    accessToken: "token",
    refreshToken: "refresh",
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
    providerSpecificData: { tier: "original-tier" },
    isActive: true,
    testStatus: "active",
  });

  const staleSnapshot = connection.providerSpecificData as Record<string, unknown>;

  // A concurrent metadata write lands after the caller captured its snapshot.
  await providersDb.updateProviderConnection(connection.id, {
    providerSpecificData: { tier: "updated-tier", clientProfile: "desktop" },
  });

  await persistDiscoveredAntigravityProjectId(
    connection.id,
    "discovered-project-concurrent",
    staleSnapshot
  );

  const updated = await providersDb.getProviderConnectionById(connection.id);
  const psd = updated?.providerSpecificData as Record<string, unknown>;
  assert.equal(updated?.projectId, "discovered-project-concurrent");
  assert.equal(psd?.projectId, "discovered-project-concurrent");
  assert.equal(psd?.tier, "updated-tier", "metadata written after the snapshot is preserved");
  assert.equal(psd?.clientProfile, "desktop");
});
