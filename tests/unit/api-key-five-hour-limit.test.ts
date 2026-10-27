import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-key-five-hour-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "five-hour-limit-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");
const { updatePricing } = await import("@/lib/db/settings");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const usageLimits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");

const HOUR_MS = 60 * 60 * 1000;
const NOW = Date.parse("2026-06-19T20:00:00.000Z");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  usageHistory.clearPendingRequests();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function priceOneDollarPerMillion() {
  await updatePricing({
    claude: {
      "claude-opus-4-8": { input: 1, cached: 1, output: 1, reasoning: 1, cache_creation: 1 },
    },
  });
}

async function makeFiveHourKey(limitUsd = 1) {
  const created = await apiKeysDb.createApiKey("Five Hour Key", "machine-five-hour-01");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    usageLimitEnabled: true,
    fiveHourUsageLimitUsd: limitUsd,
  });
  apiKeysDb.clearApiKeyCaches();
  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(metadata);
  return { created, metadata: metadata! };
}

async function spend(apiKeyId: string, inputTokens: number, timestamp: string, model?: string) {
  await usageHistory.saveRequestUsage({
    provider: model ? "cursor" : "claude",
    model: model ?? "claude-opus-4-8",
    apiKeyId,
    apiKeyName: "Five Hour Key",
    tokens: { input: inputTokens, output: 0 },
    success: true,
    timestamp,
  });
}

function statusAt(metadata: Record<string, unknown>, nowMs = NOW) {
  return usageLimits.getApiKeyUsageLimitStatus(
    { ...(metadata as { id: string }), allowedConnections: null },
    { now: () => nowMs }
  );
}

test("migration adds api_keys.five_hour_usage_limit_usd and re-running migrations is a no-op", () => {
  const db = core.getDbInstance();
  const columns = (db.prepare("PRAGMA table_info(api_keys)").all() as Array<{ name: string }>).map(
    (column) => column.name
  );
  assert.ok(columns.includes("five_hour_usage_limit_usd"));
  const applied = db
    .prepare("SELECT name FROM _omniroute_migrations WHERE name = ?")
    .get("api_key_five_hour_limit") as { name: string } | undefined;
  assert.equal(applied?.name, "api_key_five_hour_limit");

  assert.equal(runMigrations(db), 0);
  const after = (db.prepare("PRAGMA table_info(api_keys)").all() as Array<{ name: string }>).map(
    (column) => column.name
  );
  assert.equal(after.filter((name) => name === "five_hour_usage_limit_usd").length, 1);
});

test("5-hour USD limit persists, defaults to null and clears with null", async () => {
  const created = await apiKeysDb.createApiKey("Five Hour Key", "machine-five-hour-02");
  let metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.equal(metadata?.fiveHourUsageLimitUsd, null);

  await apiKeysDb.updateApiKeyPermissions(created.id, { fiveHourUsageLimitUsd: 2.5 });
  apiKeysDb.clearApiKeyCaches();
  metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.equal(metadata?.fiveHourUsageLimitUsd, 2.5);
  assert.equal((await apiKeysDb.getApiKeyById(created.id))?.fiveHourUsageLimitUsd, 2.5);

  await apiKeysDb.updateApiKeyPermissions(created.id, { fiveHourUsageLimitUsd: null });
  apiKeysDb.clearApiKeyCaches();
  metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.equal(metadata?.fiveHourUsageLimitUsd, null);
});

test("spend inside the rolling 5h window trips the limit; reset is the oldest spend + 5h", async () => {
  await priceOneDollarPerMillion();
  const { created, metadata } = await makeFiveHourKey(1);
  const spentAt = new Date(NOW - 2 * HOUR_MS).toISOString();
  await spend(created.id, 1_200_000, spentAt);

  const status = await statusAt(metadata);

  assert.equal(status.fiveHourLimitUsd, 1);
  assert.equal(status.fiveHourSpentUsd, 1.2);
  assert.equal(status.fiveHourExceeded, true);
  assert.equal(status.fiveHourWindowStartIso, new Date(NOW - 5 * HOUR_MS).toISOString());
  assert.equal(
    status.fiveHourResetAtIso,
    new Date(Date.parse(spentAt) + 5 * HOUR_MS).toISOString()
  );
  // The daily/weekly windows are unconfigured, so they never block on their own.
  assert.equal(status.dailyExceeded, false);
  assert.equal(status.weeklyExceeded, false);
});

test("spend older than 5h ages out of the window", async () => {
  await priceOneDollarPerMillion();
  const { created, metadata } = await makeFiveHourKey(1);
  await spend(created.id, 3_000_000, new Date(NOW - 6 * HOUR_MS).toISOString());
  await spend(created.id, 400_000, new Date(NOW - 1 * HOUR_MS).toISOString());

  const status = await statusAt(metadata);

  assert.equal(status.fiveHourSpentUsd, 0.4);
  assert.equal(status.fiveHourExceeded, false);
  assert.equal(status.fiveHourResetAtIso, new Date(NOW + 4 * HOUR_MS).toISOString());
});

test("an empty 5h window resets 5h from now", async () => {
  const { metadata } = await makeFiveHourKey(1);
  const status = await statusAt(metadata);
  assert.equal(status.fiveHourSpentUsd, 0);
  assert.equal(status.fiveHourExceeded, false);
  assert.equal(status.fiveHourResetAtIso, new Date(NOW + 5 * HOUR_MS).toISOString());
});

test("a key without a 5h limit is never blocked by the 5h window", async () => {
  await priceOneDollarPerMillion();
  const created = await apiKeysDb.createApiKey("No Five Hour", "machine-five-hour-03");
  await apiKeysDb.updateApiKeyPermissions(created.id, { usageLimitEnabled: true });
  apiKeysDb.clearApiKeyCaches();
  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  await spend(created.id, 50_000_000, new Date(NOW - HOUR_MS).toISOString());

  const status = await statusAt(metadata as Record<string, unknown>);
  assert.equal(status.fiveHourLimitUsd, null);
  assert.equal(status.fiveHourExceeded, false);
});

test("unpriced usage inside the 5h window fails closed unless USAGE_LIMIT_IGNORE_UNPRICED", async () => {
  const { created, metadata } = await makeFiveHourKey(100);
  await spend(created.id, 1_000_000, new Date(NOW - HOUR_MS).toISOString(), "auto");

  const closed = await statusAt(metadata);
  assert.equal(closed.fiveHourSpentUsd, 0);
  assert.equal(closed.fiveHourHasUnpricedUsage, true);
  assert.equal(closed.fiveHourExceeded, true);

  const previous = process.env.USAGE_LIMIT_IGNORE_UNPRICED;
  process.env.USAGE_LIMIT_IGNORE_UNPRICED = "true";
  try {
    const open = await statusAt(metadata);
    assert.equal(open.fiveHourHasUnpricedUsage, true);
    assert.equal(open.fiveHourExceeded, false);
  } finally {
    if (previous === undefined) delete process.env.USAGE_LIMIT_IGNORE_UNPRICED;
    else process.env.USAGE_LIMIT_IGNORE_UNPRICED = previous;
  }
});

test("policy rejection fires on the 5h window alone: 400 for Anthropic clients, 429 otherwise", async () => {
  await priceOneDollarPerMillion();
  const { created, metadata } = await makeFiveHourKey(1);
  const spentAtMs = Date.now() - 2 * HOUR_MS;
  await spend(created.id, 1_500_000, new Date(spentAtMs).toISOString());
  const expectedResetMs = spentAtMs + 5 * HOUR_MS;

  const anthropic = await usageLimits.buildApiKeyUsageLimitPolicyRejection(
    new Request("http://localhost/v1/messages", {
      headers: { "anthropic-version": "2023-06-01" },
    }),
    { ...metadata, allowedConnections: null }
  );
  assert.ok(anthropic);
  assert.equal(anthropic.status, 400);
  const anthropicBody = (await anthropic.json()) as {
    type: string;
    error: { type: string; message: string; reset_at?: string };
  };
  assert.equal(anthropicBody.type, "error");
  assert.equal(anthropicBody.error.type, "invalid_request_error");
  assert.match(anthropicBody.error.message, /5-hour usage quota/);
  assert.equal(anthropicBody.error.reset_at, new Date(expectedResetMs).toISOString());

  const openai = await usageLimits.buildApiKeyUsageLimitPolicyRejection(
    new Request("http://localhost/v1/chat/completions"),
    { ...metadata, allowedConnections: null }
  );
  assert.ok(openai);
  assert.equal(openai.status, 429);
  const openaiBody = (await openai.json()) as {
    error: { code?: string; retry_after?: number; reset_at?: string };
  };
  assert.equal(openaiBody.error.code, "usage_limit_exceeded");
  assert.equal(openaiBody.error.reset_at, new Date(expectedResetMs).toISOString());
  const expectedRetryAfter = Math.ceil((expectedResetMs - Date.now()) / 1000);
  assert.ok(Math.abs(openaiBody.error.retry_after! - expectedRetryAfter) <= 5);
  assert.equal(openai.headers.get("Retry-After"), String(openaiBody.error.retry_after));
});

test("rejection message reports the 5h window with USD amounts for internal callers", async () => {
  const response = usageLimits.buildApiKeyUsageLimitRejection(
    new Request("http://localhost/v1/chat/completions"),
    {
      enabled: true,
      dailyLimitUsd: null,
      weeklyLimitUsd: null,
      dailySpentUsd: 1.25,
      weeklySpentUsd: 1.25,
      dailyWindowStartIso: "2026-06-19T03:00:00.000Z",
      dailyResetAtIso: "2026-06-20T03:00:00.000Z",
      weeklyWindowStartIso: "2026-06-12T20:00:00.000Z",
      weeklyResetAtIso: null,
      dailyExceeded: false,
      weeklyExceeded: false,
      fiveHourLimitUsd: 1,
      fiveHourSpentUsd: 1.25,
      fiveHourWindowStartIso: "2026-06-19T15:00:00.000Z",
      fiveHourResetAtIso: "2026-06-19T22:30:00.000Z",
      fiveHourExceeded: true,
    },
    NOW
  );
  assert.equal(response.status, 429);
  const body = (await response.json()) as { error: { message: string } };
  assert.equal(
    body.error.message,
    "This API key reached its 5-hour USD usage quota ($1.25 of $1.00, 125%). Resets in 2h 30m. Choose another allowed model after reset."
  );
});

test("usage text builders add a 5-hour block only when a 5h limit is configured", () => {
  const base = {
    enabled: true,
    dailyLimitUsd: 10,
    weeklyLimitUsd: 50,
    dailySpentUsd: 2,
    weeklySpentUsd: 5.25,
    dailyWindowStartIso: "2026-06-19T03:00:00.000Z",
    dailyResetAtIso: "2026-06-20T03:00:00.000Z",
    weeklyWindowStartIso: "2026-06-12T20:00:00.000Z",
    weeklyResetAtIso: "2026-06-25T20:00:00.000Z",
    dailyExceeded: false,
    weeklyExceeded: false,
  };
  const withFiveHour = {
    ...base,
    fiveHourLimitUsd: 4,
    fiveHourSpentUsd: 1,
    fiveHourWindowStartIso: "2026-06-19T15:00:00.000Z",
    fiveHourResetAtIso: "2026-06-19T23:00:00.000Z",
    fiveHourExceeded: false,
  };

  assert.doesNotMatch(usageLimits.buildApiKeyUsageLimitText(base, NOW), /5-hour/);
  assert.doesNotMatch(usageLimits.buildApiKeyUsageLimitPercentText(base, NOW), /5-hour/);

  const text = usageLimits.buildApiKeyUsageLimitText(withFiveHour, NOW);
  assert.ok(
    text.startsWith(
      [
        "5-hour quota",
        "$4.00",
        "5-hour spent",
        "$1.00",
        "5-hour used",
        "25%",
        "Resets in 3h 0m",
        "",
        "Daily quota",
      ].join("\n")
    ),
    text
  );
  const percent = usageLimits.buildApiKeyUsageLimitPercentText(withFiveHour, NOW);
  assert.ok(
    percent.startsWith(["5-hour", "75% left", "⏱ reset in 3h 0m", "", "Daily"].join("\n")),
    percent
  );
});

test("GET /v1/me/status reports the 5h window for a self:usage key with usage limits on", async () => {
  await priceOneDollarPerMillion();
  const created = await apiKeysDb.createApiKey("Status Key", "machine-five-hour-04", [
    "self:usage",
  ]);
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    usageLimitEnabled: true,
    fiveHourUsageLimitUsd: 2,
    weeklyUsageLimitUsd: 40,
  });
  apiKeysDb.clearApiKeyCaches();
  const spentAtMs = Date.now() - HOUR_MS;
  await spend(created.id, 500_000, new Date(spentAtMs).toISOString());

  const route = await import("../../src/app/api/v1/me/status/route.ts");
  const response = await route.GET(
    new Request("http://localhost/api/v1/me/status", {
      headers: { Authorization: `Bearer ${created.key}` },
    })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    usage: {
      limits?: {
        currency: string;
        fiveHour: Record<string, unknown>;
        daily: Record<string, unknown>;
        weekly: Record<string, unknown>;
      };
    };
  };
  assert.ok(body.usage.limits, "usage.limits is present when usage limits are enabled");
  assert.equal(body.usage.limits.currency, "USD");
  assert.equal(body.usage.limits.fiveHour.limitUsd, 2);
  assert.equal(body.usage.limits.fiveHour.usedUsd, 0.5);
  assert.equal(body.usage.limits.fiveHour.remainingUsd, 1.5);
  assert.equal(body.usage.limits.fiveHour.usedPercent, 25);
  assert.equal(body.usage.limits.fiveHour.exceeded, false);
  assert.equal(body.usage.limits.fiveHour.resetAt, new Date(spentAtMs + 5 * HOUR_MS).toISOString());
  assert.equal(body.usage.limits.weekly.limitUsd, 40);
  assert.equal(body.usage.limits.daily.limitUsd, null);
});

test("GET /v1/me/status omits usage.limits when usage limits are off", async () => {
  const created = await apiKeysDb.createApiKey("Status Key Off", "machine-five-hour-05", [
    "self:usage",
  ]);
  const route = await import("../../src/app/api/v1/me/status/route.ts");
  const response = await route.GET(
    new Request("http://localhost/api/v1/me/status", {
      headers: { Authorization: `Bearer ${created.key}` },
    })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { usage: Record<string, unknown> };
  assert.equal("limits" in body.usage, false);
});
