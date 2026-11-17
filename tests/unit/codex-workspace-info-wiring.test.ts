// #18412 wiring: a successful Codex usage refresh stores the ChatGPT workspace
// label on the connection, merged onto the row as it is stored at write time, so
// a field another path wrote while the accounts lookup was in flight survives.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-workspace-info-wiring-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "0";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const usage = await import("../../src/lib/usage/providerLimits.ts");
const codexUsage = await import("../../open-sse/services/usage/codex.ts");
const { CODEX_ACCOUNTS_CHECK_URL } =
  await import("../../open-sse/services/usage/codexWorkspace.ts");
const { resetCodexWorkspaceInfoBackoff } =
  await import("../../src/lib/usage/codexWorkspaceSync.ts");

test.beforeEach(() => {
  resetCodexWorkspaceInfoBackoff();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  codexUsage.setCodexUsageFetchForTests(null);
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const USAGE_OK = {
  plan_type: "team",
  rate_limit: {
    allowed: true,
    primary_window: { used_percent: 10, limit_window_seconds: 18000, reset_at: 1893456000 },
  },
};

const ACCOUNTS = {
  accounts: {
    "ws-business": {
      account: {
        name: "Acme Ltd",
        structure: "workspace",
        plan_type: "team",
        account_user_role: "standard-user",
      },
    },
  },
};

function urlOf(input: unknown): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  return (input as Request).url;
}

test("a Codex usage refresh merges the workspace label without clobbering concurrent writes", async (t) => {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    accessToken: "synthetic-workspace-access",
    isActive: true,
    providerSpecificData: { workspaceId: "ws-business" },
  });
  codexUsage.setCodexUsageFetchForTests(async () => Response.json(USAGE_OK));
  t.after(() => codexUsage.setCodexUsageFetchForTests(null));

  let lookups = 0;
  t.mock.method(globalThis, "fetch", async (input: unknown) => {
    assert.equal(urlOf(input), CODEX_ACCOUNTS_CHECK_URL);
    lookups++;
    // Another path stores a field while the accounts lookup is in flight.
    await providers.mergeConnectionProviderSpecificData(connection.id, {
      concurrentMarker: "kept",
    });
    return Response.json(ACCOUNTS);
  });

  await usage.fetchAndPersistProviderLimits(connection.id, "manual");

  assert.equal(lookups, 1);
  const stored = (await providers.getProviderConnectionById(connection.id)) as {
    providerSpecificData?: Record<string, unknown>;
  };
  const psd = stored.providerSpecificData ?? {};
  assert.equal(psd.workspaceId, "ws-business");
  assert.equal(psd.workspaceName, "Acme Ltd");
  assert.equal(psd.workspaceStructure, "workspace");
  assert.equal(psd.workspaceRole, "standard-user");
  assert.equal(typeof psd.workspaceInfoFetchedAt, "string");
  assert.equal(psd.concurrentMarker, "kept");
});

test("a failed Codex usage refresh does not look up the workspace", async (t) => {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    accessToken: "synthetic-workspace-access-2",
    isActive: true,
    providerSpecificData: { workspaceId: "ws-business" },
  });
  codexUsage.setCodexUsageFetchForTests(async () =>
    Response.json({ error: "boom" }, { status: 500 })
  );
  t.after(() => codexUsage.setCodexUsageFetchForTests(null));
  let lookups = 0;
  t.mock.method(globalThis, "fetch", async () => {
    lookups++;
    return Response.json(ACCOUNTS);
  });

  await usage.fetchAndPersistProviderLimits(connection.id, "manual").catch(() => {});

  assert.equal(lookups, 0);
  const stored = (await providers.getProviderConnectionById(connection.id)) as {
    providerSpecificData?: Record<string, unknown>;
  };
  assert.equal(stored.providerSpecificData?.workspaceName, undefined);
});
