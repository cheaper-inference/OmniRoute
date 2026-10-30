import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codex-quota-signals-"));
process.env.DATA_DIR = directory;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = "0";
const { parseCodexQuotaHeaders, getCodexDualWindowCooldownMs } =
  await import("../../open-sse/executors/codex/quota.ts");
const fetcher = await import("../../open-sse/services/codexQuotaFetcher.ts");
const { buildCodexUsageQuotas } = await import("../../open-sse/services/codexUsageQuotas.ts");
const { getCodexUsage, setCodexUsageFetchForTests } =
  await import("../../open-sse/services/usage/codex.ts");
const { persistCodexChildQuotaResponse, persistCodexChildCooldown, getCodexChildCooldown } =
  await import("../../open-sse/services/codexAccount/index.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

type JsonRecord = Record<string, unknown>;
const originalFetch = globalThis.fetch;
const sparkModel = "gpt-5.3-codex-spark";
const connections = new Set<string>();
const soon = Math.floor((Date.now() + 60_000) / 1000);
const later = Math.floor((Date.now() + 600_000) / 1000);
const iso = (seconds: number) => new Date(seconds * 1000).toISOString();
const official = (primary = "99", secondary = "20", family = "codex") => ({
  [`x-${family}-primary-used-percent`]: primary,
  [`x-${family}-primary-window-minutes`]: "300",
  [`x-${family}-primary-reset-at`]: String(soon),
  [`x-${family}-secondary-used-percent`]: secondary,
  [`x-${family}-secondary-window-minutes`]: "10080",
  [`x-${family}-secondary-reset-at`]: String(later),
});

async function fetchPayload(payload: unknown, requestedModel = "gpt-5.5") {
  const id = `quota-signals-${connections.size}`;
  connections.add(id);
  globalThis.fetch = async () => Response.json(payload);
  return fetcher.fetchCodexQuota(id, {
    accessToken: "synthetic-quota-signal-token",
    providerSpecificData: { workspaceId: "synthetic-workspace" },
    requestedModel,
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  setCodexUsageFetchForTests(null);
});
test.after(() => {
  for (const id of connections) fetcher.unregisterCodexConnection(id);
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

test("official primary headers convert percentages once and use epoch seconds", () => {
  const result = parseCodexQuotaHeaders(official());
  assert.ok(result);
  assert.equal(result.usage5h, 99);
  assert.equal(result.limit5h, 100);
  assert.equal(result.resetAt5h, iso(soon));
  assert.equal(result.usage7d, 20);
  assert.equal(result.limit7d, 100);
  assert.equal(result.resetAt7d, iso(later));
  const cooldown = getCodexDualWindowCooldownMs(result);
  assert.equal(cooldown.window, "5h");
  assert.ok(cooldown.cooldownMs > 0 && cooldown.cooldownMs <= 60_000);
});

test("official secondary exhaustion wins without confusing percent and token counts", () => {
  const result = parseCodexQuotaHeaders(official("1", "100"));
  assert.ok(result);
  assert.equal(getCodexDualWindowCooldownMs(result).window, "7d");
});

test("official fractional and explicit zero percentages are preserved", () => {
  const result = parseCodexQuotaHeaders(official("23.75", "0"));
  assert.ok(result);
  assert.equal(result.usage5h / result.limit5h, 0.2375);
  assert.equal(result.usage7d, 0);
  assert.equal(result.limit7d, 100);
});

test("HTTP header names are case insensitive", () => {
  const headers = Object.fromEntries(
    Object.entries(official()).map(([k, v]) => [k.toUpperCase(), v])
  );
  assert.equal(parseCodexQuotaHeaders(headers)?.usage5h, 99);
});

test("actual duration descriptors, not primary position, select the fixed legacy slots", () => {
  const headers = {
    ...official("100", "10"),
    "x-codex-primary-window-minutes": "10080",
    "x-codex-secondary-window-minutes": "300",
  };
  const result = parseCodexQuotaHeaders(headers);
  assert.ok(result);
  assert.equal(result.usage7d, 100);
  assert.equal(result.resetAt7d, iso(soon));
  assert.equal(result.usage5h, 10);
  assert.equal(result.resetAt5h, iso(later));
});

test("a nonstandard duration is not falsely persisted as a 5h window", () => {
  assert.equal(
    parseCodexQuotaHeaders({
      "x-codex-primary-used-percent": "100",
      "x-codex-primary-window-minutes": "60",
      "x-codex-primary-reset-at": String(soon),
    }),
    null
  );
});

test("unknown meter families and credits-only headers are not normal subscription health", () => {
  assert.equal(parseCodexQuotaHeaders(official("100", "100", "future-meter")), null);
  assert.equal(
    parseCodexQuotaHeaders({
      "x-codex-credits-unlimited": "true",
      "x-codex-credits-has-credits": "true",
    }),
    null
  );
});

test("legacy token-count headers keep their units", () => {
  const result = parseCodexQuotaHeaders({
    "x-codex-5h-usage": "150",
    "x-codex-5h-limit": "200",
    "x-codex-5h-reset-at": iso(soon),
  });
  assert.ok(result);
  assert.equal(result.usage5h, 150);
  assert.equal(result.limit5h, 200);
  assert.equal(result.resetAt5h, iso(soon));
});

for (const usage of ["", "NaN", "98junk", "Infinity", "-1"]) {
  test(`malformed legacy usage ${JSON.stringify(usage)} remains unknown`, () => {
    assert.equal(
      parseCodexQuotaHeaders({ "x-codex-5h-usage": usage, "x-codex-5h-limit": "100" }),
      null
    );
  });
}

test("a legacy reset with no usage/limit evidence is unknown, not zero used", () => {
  assert.equal(parseCodexQuotaHeaders({ "x-codex-5h-reset-at": iso(soon) }), null);
});

test("impossible legacy reset timestamps cannot create an absurd cooldown", () => {
  const result = parseCodexQuotaHeaders({
    "x-codex-5h-usage": "100",
    "x-codex-5h-limit": "100",
    "x-codex-5h-reset-at": "9999-01-01T00:00:00.000Z",
  });
  assert.ok(result);
  assert.equal(result.resetAt5h, null);
  assert.equal(getCodexDualWindowCooldownMs(result).cooldownMs, 0);
});

for (const value of [undefined, null, "", "garbage", "12junk", true, -1, 101, [], {}]) {
  test(`malformed usage percentage ${JSON.stringify(value)} is not healthy`, async () => {
    const window = { limit_window_seconds: 18000, used_percent: value, reset_after_seconds: 60 };
    const payload = { rate_limit: { primary_window: window } };
    assert.equal(await fetchPayload(payload), null);
    assert.deepEqual(buildCodexUsageQuotas(payload).quotas, {});
  });
}

test("one malformed window cannot fabricate health or hide a valid exhausted sibling", async () => {
  const payload = {
    rate_limit: {
      primary_window: { limit_window_seconds: 18000, used_percent: "bad", reset_after_seconds: 60 },
      secondary_window: {
        limit_window_seconds: 604800,
        used_percent: 100,
        reset_after_seconds: 600,
      },
    },
  };
  const result = await fetchPayload(payload);
  assert.ok(result);
  assert.equal(result.percentUsed, 1);
  assert.equal(result.windows?.session, undefined);
  assert.equal(result.windows?.weekly.percentUsed, 1);
  const display = buildCodexUsageQuotas(payload).quotas;
  assert.equal(display.session, undefined);
  assert.equal(display.weekly.used, 100);
});

test("explicit zero and camelCase compatibility are evidence, not missing data", async () => {
  const result = await fetchPayload({
    rateLimit: {
      primaryWindow: { limitWindowSeconds: 18000, usedPercent: "0", resetAfterSeconds: 60 },
    },
  });
  assert.ok(result);
  assert.equal(result.percentUsed, 0);
  assert.equal(result.windows?.session.percentUsed, 0);
});

test("usage allowed=false is an explicit hard stop, even below the percentage threshold", async () => {
  const result = await fetchPayload({
    rate_limit: {
      allowed: false,
      primary_window: { limit_window_seconds: 18000, used_percent: 20 },
    },
  });
  assert.equal(result?.limitReached, true);
});

test("usage API projects explicit allowed=false as a hard stop", async () => {
  setCodexUsageFetchForTests(async () =>
    Response.json({
      rate_limit: {
        allowed: false,
        primary_window: { limit_window_seconds: 18000, used_percent: 20 },
      },
    })
  );
  const result = await getCodexUsage("synthetic-usage-token");
  assert.equal("limitReached" in result && result.limitReached, true);
});

test("usage string false is not a boolean hard stop", async () => {
  const result = await fetchPayload({
    rate_limit: {
      limit_reached: "false",
      primary_window: { limit_window_seconds: 18000, used_percent: 20 },
    },
  });
  assert.equal(result?.limitReached, false);
});

for (const reset of ["12junk", -1, 1e20, Date.now() + 60_000]) {
  test(`usage reset_at is epoch seconds, not milliseconds or parseFloat ${reset}`, async () => {
    const payload = {
      rate_limit: {
        primary_window: { limit_window_seconds: 18000, used_percent: 100, reset_at: reset },
      },
    };
    const result = await fetchPayload(payload);
    assert.ok(result, "valid exhaustion evidence survives a malformed optional reset");
    assert.equal(result.percentUsed, 1);
    assert.equal(result.resetAt, null);
    assert.equal(buildCodexUsageQuotas(payload).quotas.session.resetAt, null);
  });
}

test("paid/unlimited credits and banked reset credits do not erase subscription exhaustion", async () => {
  const payload = {
    rate_limit: {
      primary_window: { limit_window_seconds: 18000, used_percent: 100, reset_after_seconds: 60 },
    },
    credits: { has_credits: true, unlimited: true, balance: "42" },
    rate_limit_reset_credits: { available_count: 3 },
  };
  const result = await fetchPayload(payload);
  assert.equal(result?.percentUsed, 1);
  assert.equal(result?.bankedResetCredits, 3);
  assert.equal(buildCodexUsageQuotas(payload).quotas.session.unlimited, false);
});

test("normal and Spark usage stay independent when one scope is malformed", async () => {
  const payload = {
    rate_limit: { primary_window: { limit_window_seconds: 18000, used_percent: "bad" } },
    additional_rate_limits: [
      {
        limit_id: "codex_bengalfox",
        rate_limit: {
          primary_window: {
            limit_window_seconds: 18000,
            used_percent: 100,
            reset_after_seconds: 60,
          },
        },
      },
    ],
  };
  assert.equal(await fetchPayload(payload), null);
  const spark = await fetchPayload(payload, sparkModel);
  assert.equal(spark?.percentUsed, 1);
  assert.equal(spark?.windows?.session, undefined);
  assert.equal(spark?.windows?.gpt_5_3_codex_spark_session.percentUsed, 1);
});

test("official headers reach scoped persistence without clearing a sibling cooldown", async () => {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "signal-consumer-fixture",
    accessToken: "synthetic-consumer-token",
    providerSpecificData: { unrelated: "keep" },
  });
  const id = String(connection.id);
  const sparkUntil = iso(later);
  await persistCodexChildCooldown({
    connectionId: id,
    model: sparkModel,
    rateLimitedUntil: sparkUntil,
  });
  const result = await persistCodexChildQuotaResponse({
    connectionId: id,
    model: "gpt-5.5",
    status: 429,
    headers: official(),
  });
  assert.ok(result);
  assert.equal(result.scope, "codex");
  const current = await providers.getProviderConnectionById(id);
  assert.equal(getCodexChildCooldown(current as never, "gpt-5.5"), iso(soon));
  assert.equal(getCodexChildCooldown(current as never, sparkModel), sparkUntil);
  assert.equal((current.providerSpecificData as JsonRecord).unrelated, "keep");
});

test("normal HTTP telemetry is not written to the Spark child just because Spark was requested", async () => {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "signal-spark-fixture",
    accessToken: "synthetic-spark-token",
  });
  const result = await persistCodexChildQuotaResponse({
    connectionId: String(connection.id),
    model: sparkModel,
    status: 429,
    headers: official(),
  });
  assert.equal(result, null);
});
