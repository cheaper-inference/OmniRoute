// The rolling 5-hour window must follow the same unpriced-usage and pricing-failure rules as
// the daily and weekly windows (#12341), and count what they count (search ledger spend).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-five-hour-parity-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "five-hour-parity-test-secret";
delete process.env.UNPRICED_USAGE_BUDGET_POLICY;
delete process.env.USAGE_LIMIT_IGNORE_UNPRICED;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const featureFlagsDb = await import("../../src/lib/db/featureFlags.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const usageLimits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");
const { recordLedgerEntry } = await import("../../src/lib/db/costLedger.ts");
const { getSuccessfulUsageModelGroupsSince } = await import("../../src/lib/db/usageModelGroups.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");
const usageLimitsRoute = await import("../../src/app/api/keys/[id]/usage-limits/route.ts");

const HOUR_MS = 60 * 60 * 1000;
const PRICED_PROVIDER = "openai";
const PRICED_MODEL = "gpt-4o";
const UNPRICED_PROVIDER = "grok-cli";
const UNPRICED_MODEL = "grok-composer-2.5-fast";

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  usageHistory.clearPendingRequests();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  featureFlagsDb.clearAllFeatureFlagOverrides();
}

test.beforeEach(async () => {
  await resetStorage();
  await settingsDb.updatePricing({
    [PRICED_PROVIDER]: {
      [PRICED_MODEL]: { input: 1, cached: 1, output: 1, reasoning: 1, cache_creation: 1 },
    },
  });
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function makeKey(limits: Record<string, number>) {
  const created = await apiKeysDb.createApiKey("Five Hour Parity", "machine-five-hour-parity");
  await apiKeysDb.updateApiKeyPermissions(created.id, { usageLimitEnabled: true, ...limits });
  apiKeysDb.clearApiKeyCaches();
  return created;
}

/** $1 per million input tokens on the priced model. */
async function spendPriced(apiKeyId: string, usd: number, timestampMs = Date.now()) {
  await usageHistory.saveRequestUsage({
    provider: PRICED_PROVIDER,
    model: PRICED_MODEL,
    apiKeyId,
    apiKeyName: "Five Hour Parity",
    tokens: { input: usd * 1_000_000, output: 0 },
    success: true,
    timestamp: new Date(timestampMs).toISOString(),
  });
}

async function spendUnpriced(apiKeyId: string, timestampMs = Date.now()) {
  await usageHistory.saveRequestUsage({
    provider: UNPRICED_PROVIDER,
    model: UNPRICED_MODEL,
    apiKeyId,
    apiKeyName: "Five Hour Parity",
    tokens: { input: 1_000, output: 100 },
    success: true,
    timestamp: new Date(timestampMs).toISOString(),
  });
}

function chatRequest(key: string) {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: `${PRICED_PROVIDER}/${PRICED_MODEL}`, messages: [] }),
  });
}

const fiveHourStatus = (id: string, limit: number, deps = {}) =>
  usageLimits.getApiKeyUsageLimitStatus(
    { id, usageLimitEnabled: true, fiveHourUsageLimitUsd: limit, allowedConnections: null },
    deps
  );

test("fail_closed: unpriced usage blocks the 5h window and the message names the model", async () => {
  const created = await makeKey({ fiveHourUsageLimitUsd: 100 });
  await spendUnpriced(created.id);

  const status = await fiveHourStatus(created.id, 100);

  assert.equal(status.fiveHourExceeded, true);
  assert.deepEqual(status.fiveHourUnpricedModels, [`${UNPRICED_PROVIDER}/${UNPRICED_MODEL}`]);
  assert.equal(status.fiveHourPricingFailure, false);

  const rejection = usageLimits.buildApiKeyUsageLimitRejection(chatRequest(created.key), status);
  assert.equal(rejection.status, 400, "missing pricing must not trigger automatic quota retries");
  const body = JSON.stringify(await rejection.json());
  assert.match(body, /5-hour usage includes models with no configured price/);
  assert.match(body, new RegExp(`${UNPRICED_PROVIDER}/${UNPRICED_MODEL}`));
});

test("count_as_zero: unpriced usage alone does not block the 5h window", async () => {
  const created = await makeKey({ fiveHourUsageLimitUsd: 100 });
  await spendUnpriced(created.id);
  featureFlagsDb.setFeatureFlagOverride("UNPRICED_USAGE_BUDGET_POLICY", "count_as_zero");

  const status = await fiveHourStatus(created.id, 100);

  assert.equal(status.fiveHourHasUnpricedUsage, true);
  assert.equal(status.fiveHourExceeded, false);
  assert.equal(
    (await enforceApiKeyPolicy(chatRequest(created.key), "openai/gpt-4o")).rejection,
    null
  );
});

test("count_as_zero: priced spend still trips the 5h window", async () => {
  const created = await makeKey({ fiveHourUsageLimitUsd: 1 });
  await spendUnpriced(created.id);
  await spendPriced(created.id, 2);
  featureFlagsDb.setFeatureFlagOverride("UNPRICED_USAGE_BUDGET_POLICY", "count_as_zero");

  const status = await fiveHourStatus(created.id, 1);

  assert.equal(status.fiveHourSpentUsd, 2);
  assert.equal(status.fiveHourExceeded, true);
  const result = await enforceApiKeyPolicy(chatRequest(created.key), "openai/gpt-4o");
  assert.equal(result.rejection?.status, 429);
  assert.match(JSON.stringify(await result.rejection!.json()), /reached its 5-hour usage quota/);
});

test("a pricing failure blocks the 5h window under every policy, and says so", async () => {
  const created = await makeKey({ fiveHourUsageLimitUsd: 100 });
  await spendUnpriced(created.id);
  const db = core.getDbInstance();
  db.exec("ALTER TABLE key_value RENAME TO key_value_offline");
  readCache.invalidateDbCache("pricing", undefined, { skipModelCatalog: true });
  try {
    const status = await fiveHourStatus(created.id, 100, {
      getUnpricedUsagePolicy: () => "count_as_zero",
      getProviderConnectionById: async () => null,
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => null,
      getAllProviderLimitsCache: () => ({}),
    });

    assert.equal(status.fiveHourPricingFailure, true);
    assert.equal(status.fiveHourHasUnpricedUsage, false);
    assert.equal(status.fiveHourExceeded, true);

    const rejection = usageLimits.buildApiKeyUsageLimitRejection(chatRequest(created.key), status);
    assert.equal(rejection.status, 400);
    assert.match(
      JSON.stringify(await rejection.json()),
      /5-hour usage cost could not be calculated/
    );
  } finally {
    db.exec("ALTER TABLE key_value_offline RENAME TO key_value");
    readCache.invalidateDbCache("pricing", undefined, { skipModelCatalog: true });
  }
});

test("search ledger spend counts toward the 5h window and ages out by its own timestamp", async () => {
  const created = await makeKey({ fiveHourUsageLimitUsd: 1 });
  const now = Date.now();
  const ledgerAt = new Date(now - 2 * HOUR_MS).toISOString();
  recordLedgerEntry({
    apiKeyId: created.id,
    provider: "searxng-search",
    model: "search",
    amountUsd: 2,
    serviceTier: "search",
    timestamp: ledgerAt,
  });

  const status = await fiveHourStatus(created.id, 1, { now: () => now });

  assert.equal(status.fiveHourSpentUsd, 2);
  assert.equal(status.fiveHourExceeded, true);
  assert.equal(
    status.fiveHourResetAtIso,
    new Date(Date.parse(ledgerAt) + 5 * HOUR_MS).toISOString()
  );
});

test("the 5h reset is the older of usage and ledger spend", async () => {
  const created = await makeKey({ fiveHourUsageLimitUsd: 100 });
  const now = Date.now();
  await spendPriced(created.id, 1, now - HOUR_MS);
  recordLedgerEntry({
    apiKeyId: created.id,
    provider: "searxng-search",
    model: "search",
    amountUsd: 1,
    serviceTier: "search",
    timestamp: new Date(now - 3 * HOUR_MS).toISOString(),
  });
  assert.equal(
    (await fiveHourStatus(created.id, 100, { now: () => now })).fiveHourResetAtIso,
    new Date(now - 3 * HOUR_MS + 5 * HOUR_MS).toISOString()
  );

  await spendPriced(created.id, 1, now - 4 * HOUR_MS);
  assert.equal(
    (await fiveHourStatus(created.id, 100, { now: () => now })).fiveHourResetAtIso,
    new Date(now - 4 * HOUR_MS + 5 * HOUR_MS).toISOString()
  );
});

test("the policy chokepoint enforces the 5h cap on a metadata object served from the cache", async () => {
  const created = await makeKey({ fiveHourUsageLimitUsd: 1 });

  // First call fills the metadata cache while the key is still under its limit.
  const allowed = await enforceApiKeyPolicy(chatRequest(created.key), "openai/gpt-4o");
  assert.equal(allowed.rejection, null);
  const cached = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.equal(cached?.fiveHourUsageLimitUsd, 1);

  await spendPriced(created.id, 2);

  const blocked = await enforceApiKeyPolicy(chatRequest(created.key), "openai/gpt-4o");
  assert.equal(blocked.rejection?.status, 429);
  assert.match(JSON.stringify(await blocked.rejection!.json()), /5-hour usage quota/);
});

test("a priced 5h overage is not masked by a window blocked only by unpriced usage", async () => {
  const created = await makeKey({ weeklyUsageLimitUsd: 100, fiveHourUsageLimitUsd: 1 });
  const now = Date.now();
  // Outside the 5 h window, inside the week: only the weekly window sees the unpriced row.
  await spendUnpriced(created.id, now - 24 * HOUR_MS);
  await spendPriced(created.id, 2, now - HOUR_MS);

  const status = await usageLimits.getApiKeyUsageLimitStatus(
    {
      id: created.id,
      usageLimitEnabled: true,
      weeklyUsageLimitUsd: 100,
      fiveHourUsageLimitUsd: 1,
      allowedConnections: null,
    },
    { now: () => now }
  );
  assert.equal(status.weeklyExceeded, true);
  assert.equal(status.fiveHourExceeded, true);

  const rejection = usageLimits.buildApiKeyUsageLimitRejection(chatRequest(created.key), status);
  assert.equal(rejection.status, 429);
  const message = JSON.stringify(await rejection.json());
  assert.match(message, /reached its 5-hour USD usage quota/);
  assert.match(message, /The weekly window also blocks this key/);
  assert.equal(rejection.headers.get("retry-after"), null, "another window can outlive this reset");
});

test("three blocked windows name the other two and promise no reset", async () => {
  const created = await makeKey({
    dailyUsageLimitUsd: 1,
    weeklyUsageLimitUsd: 1,
    fiveHourUsageLimitUsd: 1,
  });
  await spendPriced(created.id, 2);

  const status = await usageLimits.getApiKeyUsageLimitStatus({
    id: created.id,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 1,
    weeklyUsageLimitUsd: 1,
    fiveHourUsageLimitUsd: 1,
    allowedConnections: null,
  });
  const rejection = usageLimits.buildApiKeyUsageLimitRejection(chatRequest(created.key), status);

  assert.equal(rejection.status, 429);
  assert.match(
    JSON.stringify(await rejection.json()),
    /The weekly and 5-hour windows also block this key; its daily reset alone will not restore access/
  );
  assert.equal(rejection.headers.get("retry-after"), null);
});

test("a key limited only by its 5h budget counts as limited in the unpriced-usage report", async () => {
  const limited = await makeKey({ fiveHourUsageLimitUsd: 5 });
  await spendUnpriced(limited.id);

  const [group] = getSuccessfulUsageModelGroupsSince(new Date(Date.now() - HOUR_MS).toISOString());

  assert.equal(group.provider, UNPRICED_PROVIDER);
  assert.equal(group.limitedApiKeys, 1);
});

test("GET /api/keys/[id]/usage-limits echoes the 5h limit next to daily and weekly", async () => {
  const created = await makeKey({ dailyUsageLimitUsd: 4, fiveHourUsageLimitUsd: 2 });

  const response = await usageLimitsRoute.GET(
    new Request("http://localhost/api/keys/x/usage-limits"),
    {
      params: Promise.resolve({ id: created.id }),
    }
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.key.fiveHourUsageLimitUsd, 2);
  assert.equal(body.key.dailyUsageLimitUsd, 4);
  assert.equal(body.status.fiveHourLimitUsd, 2);
});

test("a key without a 5h limit keeps the tip's daily and weekly messages word for word", async () => {
  const created = await makeKey({ dailyUsageLimitUsd: 1, weeklyUsageLimitUsd: 1 });
  await spendPriced(created.id, 2);
  const status = await usageLimits.getApiKeyUsageLimitStatus({
    id: created.id,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 1,
    weeklyUsageLimitUsd: 1,
    allowedConnections: null,
  });

  assert.equal(status.fiveHourLimitUsd, null);
  assert.equal(status.fiveHourExceeded, false);
  const message = JSON.stringify(
    await usageLimits.buildApiKeyUsageLimitRejection(chatRequest(created.key), status).json()
  );
  assert.match(
    message,
    /The weekly window also blocks this key; its daily reset alone will not restore access/
  );
});
