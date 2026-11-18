import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-pool-filter-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "ag-pool-filter-test-secret";

const {
  getStoredAntigravityProjectId,
  persistDiscoveredAntigravityProjectId,
  preferAntigravityConnectionsWithStoredProject,
} = await import("@omniroute/open-sse/services/antigravityProjectPersist.ts");
const { ANTIGRAVITY_REQUIRES_MANUAL_PROJECT } =
  await import("@omniroute/open-sse/services/antigravityProjectBootstrap.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("keeps connections with a projectId on the column or in providerSpecificData", () => {
  const kept = preferAntigravityConnectionsWithStoredProject([
    { id: "a", projectId: "projects/a" },
    { id: "b", providerSpecificData: { projectId: "projects/b" } },
  ]);

  assert.deepEqual(
    kept.map((c) => c.id),
    ["a", "b"]
  );
});

test("drops connections whose projectId is missing, blank or not a string", () => {
  const kept = preferAntigravityConnectionsWithStoredProject([
    { id: "missing" },
    { id: "blank", projectId: "   " },
    { id: "null", projectId: null },
    { id: "numeric", projectId: 42 },
    { id: "blank-psd", providerSpecificData: { projectId: "" } },
    { id: "null-psd", providerSpecificData: null },
    { id: "valid", projectId: "projects/valid" },
  ]);

  assert.deepEqual(kept, [{ id: "valid", projectId: "projects/valid" }]);
});

test("returns an empty pool for an empty input instead of throwing", () => {
  assert.deepEqual(preferAntigravityConnectionsWithStoredProject([]), []);
});

test("never prefers a stored manual-project sentinel on the column or in providerSpecificData", () => {
  const sentinelOnly = [
    { id: "column", projectId: ANTIGRAVITY_REQUIRES_MANUAL_PROJECT },
    { id: "psd", providerSpecificData: { projectId: ANTIGRAVITY_REQUIRES_MANUAL_PROJECT } },
  ];

  assert.deepEqual(preferAntigravityConnectionsWithStoredProject(sentinelOnly), sentinelOnly);
  assert.equal(getStoredAntigravityProjectId(sentinelOnly[0]), ANTIGRAVITY_REQUIRES_MANUAL_PROJECT);
});

test("discovery writes only projectId and leaves the rest of the row intact", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "pool-filter-discovery",
    email: "pool-filter-discovery@example.test",
    accessToken: "token",
    refreshToken: "refresh",
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
    providerSpecificData: { tier: "legacy-tier" },
    isActive: false,
    testStatus: "unavailable",
    errorCode: "missing_project_id",
    lastErrorType: "oauth_missing_project_id",
    lastError: "old error",
  });

  await persistDiscoveredAntigravityProjectId(
    connection.id,
    "discovered-project-456",
    connection.providerSpecificData as Record<string, unknown>
  );

  const updated = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(updated?.projectId, "discovered-project-456");
  assert.equal(
    (updated?.providerSpecificData as Record<string, unknown>)?.projectId,
    "discovered-project-456"
  );
  assert.equal((updated?.providerSpecificData as Record<string, unknown>)?.tier, "legacy-tier");
  assert.equal(updated?.isActive, false);
  assert.equal(updated?.testStatus, "unavailable");
  assert.equal(updated?.errorCode, "missing_project_id");
  assert.equal(updated?.lastError, "old error");
});

test("drops a confirmed-missing row beside a healthy sibling, keeps the pool when all are missing", () => {
  const withSibling = [
    { id: "missing", errorCode: "missing_project_id", projectId: "stale-project" },
    { id: "healthy", projectId: "healthy-project" },
  ];
  assert.deepEqual(
    preferAntigravityConnectionsWithStoredProject(withSibling).map((c) => c.id),
    ["healthy"]
  );

  const allMissing = [
    { id: "missing-one", errorCode: "missing_project_id", projectId: "stale-one" },
    { id: "missing-two", errorCode: "missing_project_id", projectId: "stale-two" },
  ];
  assert.deepEqual(preferAntigravityConnectionsWithStoredProject(allMissing), allMissing);
});
