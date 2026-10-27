/**
 * Integration coverage for the stored discovery outcome.
 *
 * A failed discovery used to leave no trace: the next read of the same
 * connection looked healthy, and the provider page had nothing to show. The
 * outcome of the last discovery is now stored per connection, read back by
 * GET /api/providers, and cleared when the connection is deleted.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-discovery-memorized-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-discovery-state-memorized";
process.env.INITIAL_PASSWORD = "admin-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");
const discoveryRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const deletion = await import("../../src/lib/db/providers/deletion.ts");
const { recordDiscoveryOutcome } =
  await import("../../src/app/api/providers/[id]/models/discovery/discoveryOutcome.ts");
const discoveryStateDb = await import("../../src/lib/db/discoveryState.ts");
const { NOAUTH_PROVIDERS } = await import("../../src/shared/constants/providers/noauth.ts");
const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const originalFetch = globalThis.fetch;

function resetStorage() {
  core.resetDbInstance();
  globalThis.fetch = originalFetch;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createConnection(
  provider: string,
  name: string,
  providerSpecificData: Record<string, unknown> = { autoFetchModels: true }
) {
  return providersDb.createProviderConnection({
    provider,
    name,
    authType: "apikey",
    apiKey: `${provider}-${name}-key`,
    isActive: true,
    testStatus: "active",
    providerSpecificData,
  });
}

/**
 * A no-auth provider that declares a live models endpoint. The provider is
 * DERIVED from the provider registry, not hardcoded: providers come and go
 * between releases, and a stale literal would turn this test into a false
 * failure while covering no provider at all.
 */
function noAuthProviderWithLiveCatalog(): string {
  const noAuthProviders = NOAUTH_PROVIDERS as Record<string, { noAuth?: boolean }>;
  for (const id of Object.keys(noAuthProviders)) {
    if (noAuthProviders[id]?.noAuth !== true) continue;
    const modelsUrl = getRegistryEntry(id)?.modelsUrl;
    if (typeof modelsUrl === "string" && modelsUrl.length > 0) return id;
  }
  throw new Error("expected at least one no-auth provider with a live models endpoint");
}

async function listConnections(provider: string) {
  const response = await providersRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/providers?provider=${provider}`)
  );
  const body = (await response.json()) as {
    connections: Array<{
      id: string;
      provider: string;
      discoveryState: { status: string; cause: string | null; at: string } | null;
    }>;
  };
  assert.equal(response.status, 200);
  return body.connections;
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  globalThis.fetch = originalFetch;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a failed discovery is remembered for its connection", () => {
  const connection = { provider: "aimlapi", connectionId: "conn-1" };

  recordDiscoveryOutcome({
    ...connection,
    degraded: true,
    error: "HTTP 500",
    source: "cache",
    warning: "API unavailable — using cached catalog",
  });

  const states = discoveryStateDb.getDiscoveryStatesForConnections([
    { provider: connection.provider, id: connection.connectionId },
  ]);
  const stored = states.get("aimlapi:conn-1");
  assert.equal(stored?.status, "degraded");
  assert.equal(stored?.cause, "HTTP 500");
  assert.ok(Number.isFinite(Date.parse(stored?.at ?? "")));
});

test("a later read does not erase the remembered failure", async () => {
  // Auto-fetch is off: a plain read answers from the catalog WITHOUT running a
  // discovery, so it has no outcome of its own to record. (With auto-fetch on, a
  // plain read is a live discovery and legitimately records its own outcome.)
  const connection = await createConnection("aimlapi", "remembered", { autoFetchModels: false });
  recordDiscoveryOutcome({
    provider: "aimlapi",
    connectionId: connection.id,
    degraded: true,
    error: "HTTP 500",
    source: "cache",
  });

  // A plain read of the same connection (no refresh) still answers from the
  // catalog: the remembered failure must survive it.
  const response = await discoveryRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models`),
    { params: { id: connection.id } }
  );
  assert.equal(response.status, 200);

  const [row] = await listConnections("aimlapi");
  assert.equal(row.discoveryState?.status, "degraded");
  assert.equal(row.discoveryState?.cause, "HTTP 500");
});

test("a successful discovery makes the remembered outcome healthy again", async () => {
  const connection = await createConnection("openai", "recovered");
  recordDiscoveryOutcome({
    provider: "openai",
    connectionId: connection.id,
    degraded: true,
    error: "HTTP 500",
    source: "cache",
  });

  globalThis.fetch = async () => Response.json({ data: [{ id: "gpt-4.1", object: "model" }] });
  const response = await discoveryRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.source, "api");

  const [row] = await listConnections("openai");
  assert.equal(row.discoveryState?.status, "healthy");
  assert.equal(row.discoveryState?.cause, null);
});

test("two connections of one provider keep their own outcome", async () => {
  const degraded = await createConnection("aimlapi", "degraded");
  const healthy = await createConnection("aimlapi", "healthy");

  recordDiscoveryOutcome({
    provider: "aimlapi",
    connectionId: degraded.id,
    degraded: true,
    error: "HTTP 500",
    source: "cache",
  });

  const rows = await listConnections("aimlapi");
  const byId = new Map(rows.map((row) => [row.id, row]));
  assert.equal(byId.get(degraded.id)?.discoveryState?.status, "degraded");
  assert.equal(byId.get(degraded.id)?.discoveryState?.cause, "HTTP 500");
  assert.equal(byId.get(healthy.id)?.discoveryState, null);
});

test("a connection that was never refreshed reads as unknown, never as healthy", async () => {
  await createConnection("aimlapi", "never-refreshed");

  const [row] = await listConnections("aimlapi");
  assert.equal(row.discoveryState, null);
});

test("a local condition keeps the previous outcome and its own date", () => {
  const connection = { provider: "aimlapi", connectionId: "conn-local" };
  recordDiscoveryOutcome({
    ...connection,
    degraded: true,
    error: "HTTP 500",
    source: "cache",
  });
  const before = discoveryStateDb
    .getDiscoveryStatesForConnections([
      { provider: connection.provider, id: connection.connectionId },
    ])
    .get("aimlapi:conn-local");

  recordDiscoveryOutcome({
    ...connection,
    degraded: true,
    error: "NO_CREDENTIAL",
    source: "local_catalog",
  });

  const after = discoveryStateDb
    .getDiscoveryStatesForConnections([
      { provider: connection.provider, id: connection.connectionId },
    ])
    .get("aimlapi:conn-local");
  assert.equal(after?.status, "degraded");
  assert.equal(after?.cause, "HTTP 500");
  assert.equal(after?.at, before?.at);
});

test("a remembered failure never touches the routing fields of the connection", async () => {
  const connection = await createConnection("aimlapi", "routing-untouched");
  const before = await providersDb.getProviderConnections({ provider: "aimlapi" });

  globalThis.fetch = async () => new Response("upstream down", { status: 500 });
  const response = await discoveryRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  assert.equal(response.status, 200);

  const after = await providersDb.getProviderConnections({ provider: "aimlapi" });
  assert.equal(after[0].lastError, before[0].lastError);
  assert.equal(after[0].lastErrorType, before[0].lastErrorType);
  assert.equal(after[0].lastErrorSource, before[0].lastErrorSource);
  assert.equal(after[0].testStatus, before[0].testStatus);
});

test("a failed upstream discovery answers with its cause and is remembered", async () => {
  const connection = await createConnection("aimlapi", "upstream-failure");
  globalThis.fetch = async () => new Response("upstream down", { status: 500 });

  const response = await discoveryRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as { degraded?: unknown; error?: unknown };
  assert.equal(response.status, 200);
  assert.equal(body.degraded, true, "the response must say the discovery fell back");
  assert.equal(body.error, "HTTP 500", "the response must carry the reason of the failure");

  const [row] = await listConnections("aimlapi");
  assert.equal(row.discoveryState?.status, "degraded");
  assert.equal(row.discoveryState?.cause, "HTTP 500");
});

test("a failed Copilot discovery is remembered with the cause derived from its structured failure", async () => {
  // The Copilot result carries the structured diagnostics (#17984); the stored
  // cause must be the closed-vocabulary one derived from them, not a generic
  // upstream error.
  const connection = await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "copilot-upstream-failure",
    accessToken: "github-access-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { copilotToken: "copilot-token" },
  });
  globalThis.fetch = async () =>
    new Response("nope", { status: 503, headers: { "content-type": "text/plain" } });

  const response = await discoveryRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as { degraded?: unknown; error?: unknown };
  assert.equal(response.status, 200);
  assert.equal(body.degraded, true);
  assert.equal(body.error, "HTTP 503");

  const [row] = await listConnections("github");
  assert.equal(row.discoveryState?.status, "degraded");
  assert.equal(row.discoveryState?.cause, "HTTP 503");
});

test("a no-auth provider whose live catalog fails is remembered too", async () => {
  const provider = noAuthProviderWithLiveCatalog();
  const connection = await createConnection(provider, "no-auth-failure");
  globalThis.fetch = async () => new Response("upstream down", { status: 500 });

  const response = await discoveryRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as { degraded?: unknown; error?: unknown };
  assert.equal(response.status, 200);
  assert.equal(body.degraded, true, "the response must say the live catalog could not be used");
  assert.equal(body.error, "HTTP 500", "the response must carry the reason of the failure");

  const [row] = await listConnections(provider);
  assert.equal(row.discoveryState?.status, "degraded");
  assert.equal(row.discoveryState?.cause, "HTTP 500");
});

test("deleting a connection drops its remembered outcome", async () => {
  const connection = await createConnection("aimlapi", "deleted");
  recordDiscoveryOutcome({
    provider: "aimlapi",
    connectionId: connection.id,
    degraded: true,
    error: "HTTP 500",
    source: "cache",
  });
  assert.equal(
    discoveryStateDb.getDiscoveryStatesForConnections([{ provider: "aimlapi", id: connection.id }])
      .size,
    1
  );

  await deletion.deleteProviderConnection(connection.id);

  assert.equal(
    discoveryStateDb.getDiscoveryStatesForConnections([{ provider: "aimlapi", id: connection.id }])
      .size,
    0
  );
});

test("a failed purge of the stored outcome leaves a trace and never fails the deletion", async () => {
  const connection = await createConnection("aimlapi", "purge-failure");
  recordDiscoveryOutcome({
    provider: "aimlapi",
    connectionId: connection.id,
    degraded: true,
    error: "HTTP 500",
    source: "cache",
  });

  const db = core.getDbInstance();
  type Prepare = typeof db.prepare;
  const originalPrepare = db.prepare;
  const realPrepare = originalPrepare.bind(db) as unknown as (...args: unknown[]) => unknown;
  // Only the store of the discovery outcomes fails: every other write of the
  // deletion path (the provider limits cache included) still works.
  (db as unknown as { prepare: Prepare }).prepare = ((sql: string) => {
    const statement = realPrepare(sql);
    if (typeof sql !== "string" || !sql.includes("DELETE FROM key_value")) return statement;
    return {
      run: (...params: unknown[]) => {
        if (params[0] === "discoveryState") {
          throw new Error("the discovery outcome store is unavailable");
        }
        return (statement.run as (...args: unknown[]) => unknown)(...params);
      },
    };
  }) as unknown as Prepare;

  const errors: unknown[][] = [];
  const log = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
  let deleted: boolean | undefined;
  try {
    deleted = await deletion.deleteProviderConnection(connection.id);
  } finally {
    console.error = log;
    (db as unknown as { prepare: Prepare }).prepare = originalPrepare;
  }

  assert.equal(deleted, true, "a failed purge must not fail the deletion");
  assert.equal(errors.length, 1, "the failed purge must leave exactly one trace");
  assert.match(String(errors[0][0]), /discovery outcome/i);
  assert.ok(errors[0][1] instanceof Error, "the trace must carry the failure");
});

test("the models list of the provider page carries no verdict of the discovery", () => {
  const modelsSection = fs.readFileSync(
    path.join(
      repoRoot,
      "src/app/(dashboard)/dashboard/providers/[id]/components/ProviderModelsSection.tsx"
    ),
    "utf8"
  );
  const modelsHook = fs.readFileSync(
    path.join(repoRoot, "src/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderModels.ts"),
    "utf8"
  );

  assert.doesNotMatch(modelsSection, /discoveryState/);
  assert.doesNotMatch(modelsHook, /discoveryState/);
});
