import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

// No-auth providers (Cloudflare AI Playground, …) never get a provider_connections row:
// they are on unless listed in `blockedProviders`, and their requests are logged with
// connection_id "noauth". The #10714 guard ("only providers with a live connection row")
// therefore dropped every no-auth request from the provider metrics, and the Home
// topology's "has an active connection" filter dropped the provider itself, so a no-auth
// provider never appeared in the Provider Topology even while it served traffic.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-noauth-topology-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogStats = await import("../../src/lib/db/callLogStats.ts");
const providerMetricsRoute = await import("../../src/app/api/provider-metrics/route.ts");
const topologyUtils = await import("../../src/app/(dashboard)/home/topologyUtils.ts");

const NOAUTH_PROVIDER = "cloudflare-playground";
const NOAUTH_ALIAS = "cfp";

type ProviderMetricsResponse = {
  metrics: Record<string, { totalRequests: number }>;
  topology: { providers: string[]; lastProvider: string; errorProvider: string };
};

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function insertCallLog(id: string, provider: string, timestamp: string, status = 200) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO call_logs (id, timestamp, provider, connection_id, status, duration) VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(id, timestamp, provider, "noauth", status, 120);
}

test.beforeEach(() => {
  resetStorage();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("provider metrics count a no-auth provider's requests although it has no connection row", async () => {
  insertCallLog("cfp-1", NOAUTH_PROVIDER, "2026-10-28T19:00:00.000Z");
  insertCallLog("cfp-2", NOAUTH_PROVIDER, "2026-10-28T19:05:00.000Z");
  // A deleted (connection-backed) provider must still stay hidden (#10714).
  insertCallLog("ghost-1", "g4f-pollinations", "2026-10-28T19:10:00.000Z", 402);

  const response = await providerMetricsRoute.GET();
  const body = (await response.json()) as ProviderMetricsResponse;

  assert.equal(response.status, 200);
  assert.equal(body.metrics[NOAUTH_PROVIDER]?.totalRequests, 2);
  assert.equal(body.topology.providers.includes(NOAUTH_PROVIDER), true);
  assert.equal(body.topology.lastProvider, NOAUTH_PROVIDER);
  assert.equal(body.metrics["g4f-pollinations"], undefined);
  assert.notEqual(body.topology.errorProvider, "g4f-pollinations");
});

test("windowed provider usage counts a no-auth provider's requests too", () => {
  insertCallLog("cfp-u1", NOAUTH_PROVIDER, "2026-10-28T19:00:00.000Z");
  insertCallLog("ghost-u1", "usage-ghost", "2026-10-28T19:00:00.000Z");

  const rows = callLogStats.getProviderUsageSince("2026-10-28T00:00:00.000Z");
  assert.equal(rows.find((r) => r.provider === NOAUTH_PROVIDER)?.requests, 1);
  assert.equal(
    rows.find((r) => r.provider === "usage-ghost"),
    undefined
  );
});

test("isEnabledNoAuthProvider: a no-auth provider is available unless blocked by id or alias", () => {
  assert.equal(topologyUtils.isEnabledNoAuthProvider(NOAUTH_PROVIDER, []), true);
  assert.equal(topologyUtils.isEnabledNoAuthProvider(NOAUTH_PROVIDER, undefined), true);
  assert.equal(topologyUtils.isEnabledNoAuthProvider(NOAUTH_PROVIDER, [NOAUTH_PROVIDER]), false);
  assert.equal(topologyUtils.isEnabledNoAuthProvider(NOAUTH_PROVIDER, [NOAUTH_ALIAS]), false);
  assert.equal(topologyUtils.isEnabledNoAuthProvider("openai", []), false);
});

test("HomePageClient admits enabled no-auth providers into the topology as healthy", () => {
  const src = fs.readFileSync(
    fileURLToPath(
      new URL("../../src/app/(dashboard)/dashboard/HomePageClient.tsx", import.meta.url)
    ),
    "utf8"
  );
  assert.match(
    src,
    /hasActiveConn\s*=[\s\S]{0,200}\|\|\s*isEnabledNoAuthProvider\(canonicalProviderId,\s*blockedProviders\)/,
    "an enabled no-auth provider must pass the active-connection filter"
  );
  assert.match(
    src,
    /isEnabledNoAuthProvider\(canonical,\s*blockedProviders\)\s*\?\s*"active"/,
    "an enabled no-auth provider must render healthy, not idle grey"
  );
  assert.match(
    src,
    /setBlockedProviders\(data\.blockedProviders\)/,
    "the blocked list must come from /api/settings"
  );
  assert.match(
    src,
    /\[providerStats, providerMetrics, providerNodes, providerConnections, blockedProviders\]/,
    "topologyProviders must recompute when the blocked list changes"
  );
});
