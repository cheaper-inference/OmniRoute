import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-cost-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.USAGE_LIMIT_IGNORE_UNPRICED = "false";

const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { saveRequestUsage: persistUsage } = await import("../../src/lib/usage/usageHistory.ts");
const { getApiKeyUsageLimitStatus, buildApiKeyUsageLimitRejection } =
  await import("../../src/lib/usage/apiKeyUsageLimits.ts");
const { handleSystemOneProxy } = await import("../../open-sse/handlers/systemOne.ts");

// Stable release stores exact reports in the existing provider_provider_cost_usd lane.
function saveRequestUsage(entry: Record<string, unknown>) {
  const tokens = entry.tokens as Record<string, unknown> | undefined;
  return persistUsage({
    ...entry,
    tokens: { ...tokens, cost_usd: entry.costUsd ?? tokens?.cost_usd },
  });
}

const NOW = Date.parse("2026-10-14T20:00:00.000Z");
const ENTRY = {
  provider: "vercel",
  model: "systemone-unpriced-test-model",
  apiKeyId: "systemone-cost-key",
  tokens: { input: 1_000_000, output: 0 },
  success: true,
  timestamp: "2026-10-14T19:00:00.000Z",
};

function getStatus() {
  return getApiKeyUsageLimitStatus(
    {
      id: ENTRY.apiKeyId,
      usageLimitEnabled: true,
      dailyUsageLimitUsd: 1,
      weeklyUsageLimitUsd: 2,
    },
    {
      now: () => NOW,
      getProviderConnectionById: async () => null,
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => null,
      getAllProviderLimitsCache: () => ({}),
    }
  );
}

test.beforeEach(() => {
  getDbInstance().exec("DELETE FROM usage_history");
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("recorded native USD cost satisfies quotas without a model pricing row", async () => {
  await saveRequestUsage({ ...ENTRY, costUsd: 0.000123 });

  const status = await getStatus();
  assert.equal(status.dailySpentUsd, 0.000123);
  assert.equal(status.weeklySpentUsd, 0.000123);
  assert.equal(status.dailyHasUnpricedUsage, false);
  assert.equal(status.weeklyHasUnpricedUsage, false);
  assert.equal(status.dailyExceeded, false);
  assert.equal(status.weeklyExceeded, false);
});

test("recorded zero cost is known and does not fail closed", async () => {
  await saveRequestUsage({ ...ENTRY, costUsd: 0 });

  const status = await getStatus();
  assert.equal(status.dailySpentUsd, 0);
  assert.equal(status.dailyHasUnpricedUsage, false);
  assert.equal(status.dailyExceeded, false);
});

test("recorded costs enforce both daily and weekly caps", async () => {
  await saveRequestUsage({ ...ENTRY, costUsd: 2 });

  const status = await getStatus();
  assert.equal(status.dailySpentUsd, 2);
  assert.equal(status.weeklySpentUsd, 2);
  assert.equal(status.dailyExceeded, true);
  assert.equal(status.weeklyExceeded, true);
});

test("mixed recorded and historical costs price only rows without a recorded cost", async () => {
  const model = "systemone-priced-test-model";
  await updatePricing({ vercel: { [model]: { input: 0.2, output: 1 } } });
  await saveRequestUsage({ ...ENTRY, model, costUsd: 0.05 });
  await saveRequestUsage({ ...ENTRY, model, timestamp: "2026-10-14T19:01:00.000Z" });
  await saveRequestUsage({ ...ENTRY, model, costUsd: 0, timestamp: "2026-10-14T19:02:00.000Z" });

  const status = await getStatus();
  assert.equal(status.dailySpentUsd, 0.25);
  assert.equal(status.weeklySpentUsd, 0.25);
  assert.equal(status.dailyHasUnpricedUsage, false);
  assert.equal(status.dailyExceeded, false);
});

test("a known cost cannot hide an unknown cost in the same provider and model group", async () => {
  await saveRequestUsage({ ...ENTRY, costUsd: 0.05 });
  await saveRequestUsage({ ...ENTRY, timestamp: "2026-10-14T19:01:00.000Z" });

  const status = await getStatus();
  assert.equal(status.dailySpentUsd, 0.05);
  assert.equal(status.weeklySpentUsd, 0.05);
  assert.equal(status.dailyHasUnpricedUsage, true);
  assert.equal(status.weeklyHasUnpricedUsage, true);
  assert.equal(status.dailyExceeded, true);
  assert.equal(status.weeklyExceeded, true);
});

test("invalid or missing native costs persist as unknown and fail closed", async () => {
  const invalidCosts = [undefined, null, -1, NaN, Infinity, -Infinity, "0.05"];
  for (const [index, costUsd] of invalidCosts.entries()) {
    await saveRequestUsage({
      ...ENTRY,
      costUsd: costUsd as number | null,
      timestamp: new Date(Date.parse(ENTRY.timestamp) + index).toISOString(),
    });
  }
  const rows = getDbInstance()
    .prepare("SELECT provider_cost_usd FROM usage_history ORDER BY id")
    .all() as Array<{ provider_cost_usd: number | null }>;
  assert.equal(rows.length, invalidCosts.length);
  assert.ok(rows.every((row) => row.provider_cost_usd === null));

  const status = await getStatus();
  assert.equal(status.dailyHasUnpricedUsage, true);
  assert.equal(status.dailyExceeded, true);
});

test("duplicate callbacks enrich missing cost once without replacing a known zero", async () => {
  await saveRequestUsage(ENTRY);
  await saveRequestUsage({ ...ENTRY, costUsd: 0 });
  await saveRequestUsage({ ...ENTRY, costUsd: 0.5 });
  await saveRequestUsage(ENTRY);
  await saveRequestUsage({ ...ENTRY, costUsd: NaN });

  const rows = getDbInstance()
    .prepare("SELECT provider_cost_usd FROM usage_history")
    .all() as Array<{
    provider_cost_usd: number | null;
  }>;
  assert.deepEqual(rows, [{ provider_cost_usd: 0 }]);
  const status = await getStatus();
  assert.equal(status.dailyHasUnpricedUsage, false);
  assert.equal(status.dailySpentUsd, 0);
});

test("recorded billed failures count while other keys and old windows are excluded", async () => {
  await saveRequestUsage({ ...ENTRY, costUsd: 0.1 });
  await saveRequestUsage({
    ...ENTRY,
    costUsd: 5,
    success: false,
    timestamp: "2026-10-14T19:01:00.000Z",
  });
  await saveRequestUsage({ ...ENTRY, costUsd: 5, apiKeyId: "another-key" });
  await saveRequestUsage({ ...ENTRY, costUsd: 5, timestamp: "2026-10-01T19:00:00.000Z" });

  const status = await getStatus();
  assert.equal(status.dailySpentUsd, 5.1);
  assert.equal(status.weeklySpentUsd, 5.1);
  assert.equal(status.dailyExceeded, true);
  assert.equal(status.weeklyExceeded, true);
});

for (const fixture of [
  { name: "both counts unknown", input: null, output: null, cost: null, unpriced: true },
  { name: "output unknown", input: 1_000_000, output: null, cost: null, unpriced: true },
  { name: "input unknown", input: null, output: 1, cost: null, unpriced: true },
  { name: "measured zero", input: 0, output: 0, cost: null, unpriced: false },
  { name: "reported zero", input: null, output: null, cost: 0, unpriced: false },
  { name: "reported positive", input: null, output: null, cost: 0.125, unpriced: false },
  { name: "reported cap", input: null, output: null, cost: 2, unpriced: false },
]) {
  test(`native response persists ${fixture.name} and enforces USD quotas`, async () => {
    await updatePricing({ openrouter: { "typesafe/jev-1.13": { input: 0.2, output: 1 } } });
    const response = await handleSystemOneProxy(
      {
        provider: "openrouter",
        canonicalModel: "openrouter/typesafe/jev-1.13",
        body: {
          model: "typesafe/jev-1.13",
          state: "test",
          questions: { accepted: { type: "noul", instructions: "Accept?" } },
        },
        credentials: { apiKey: "synthetic-key", connectionId: "synthetic-connection" },
        apiKeyInfo: { id: ENTRY.apiKeyId },
      },
      {
        withCapacity: async (_options, _signal, run) => run(),
        fetchSystemOne: async () =>
          Response.json({
            answers: { accepted: { type: "noul", noul: 0.9 } },
            usage: {
              input_tokens: fixture.input,
              output_tokens: fixture.output,
              cost: fixture.cost,
            },
          }),
        saveRequestUsage: async (entry) => {
          await saveRequestUsage({ ...entry, timestamp: ENTRY.timestamp });
        },
      }
    );
    assert.equal(response.status, 200);
    const status = await getStatus();
    assert.equal(status.dailyHasUnpricedUsage, fixture.unpriced);
    assert.equal(status.weeklyHasUnpricedUsage, fixture.unpriced);
    assert.equal(status.dailyExceeded, fixture.unpriced || fixture.cost === 2);
    assert.equal(status.weeklyExceeded, fixture.unpriced || fixture.cost === 2);
    assert.equal(status.dailySpentUsd, fixture.cost ?? 0);
    if (status.dailyExceeded) {
      assert.equal(
        buildApiKeyUsageLimitRejection(new Request("http://localhost/v1/systemone"), status, NOW)
          .status,
        429
      );
    }
    assert.equal(
      response.headers.get("X-OmniRoute-Tokens-In"),
      fixture.input === null ? null : String(fixture.input)
    );
    assert.equal(
      response.headers.get("X-OmniRoute-Tokens-Out"),
      fixture.output === null ? null : String(fixture.output)
    );
    assert.equal(
      response.headers.get("X-OmniRoute-Cost-Status"),
      fixture.unpriced ? "unknown" : "known"
    );
    assert.deepEqual(
      getDbInstance()
        .prepare("SELECT tokens_input, tokens_output, provider_cost_usd FROM usage_history")
        .all(),
      [
        {
          tokens_input: fixture.input,
          tokens_output: fixture.output,
          provider_cost_usd: fixture.cost,
        },
      ]
    );
  });
}

for (const cost of [null, 0, 0.00012]) {
  test(`native denial persists reported failure usage with cost ${cost}`, async () => {
    const model = "systemone-failure-unpriced-test-model";
    const response = await handleSystemOneProxy(
      {
        provider: "openrouter",
        canonicalModel: `openrouter/${model}`,
        body: {
          model,
          state: "test",
          questions: { accepted: { type: "noul", instructions: "Accept?" } },
        },
        credentials: { apiKey: "synthetic-key", connectionId: "synthetic-connection" },
        apiKeyInfo: { id: ENTRY.apiKeyId },
      },
      {
        withCapacity: async (_options, _signal, run) => run(),
        fetchSystemOne: async () =>
          Response.json(
            {
              error: { type: "FreeUsageLimitError", message: "Free usage limit reached." },
              usage: { input_tokens: 4, output_tokens: 0, cost },
            },
            { status: 429 }
          ),
        saveRequestUsage: async (entry) => {
          await saveRequestUsage({ ...entry, timestamp: ENTRY.timestamp });
        },
        recordCost: () => {},
      }
    );
    assert.equal(response.status, 429);
    assert.deepEqual(
      getDbInstance()
        .prepare(
          "SELECT tokens_input, tokens_output, provider_cost_usd, success FROM usage_history"
        )
        .all(),
      [{ tokens_input: 4, tokens_output: 0, provider_cost_usd: cost, success: 0 }]
    );
    const status = await getStatus();
    assert.equal(status.dailyHasUnpricedUsage, cost === null);
    assert.equal(status.dailyExceeded, cost === null);
    assert.equal(status.dailySpentUsd, cost ?? 0);
  });
}

test("historical NULL tokens fail closed even beside a complete priced row", async () => {
  const model = "historical-null-tokens";
  await updatePricing({ vercel: { [model]: { input: 0.2, output: 1 } } });
  await saveRequestUsage({ ...ENTRY, model });
  getDbInstance()
    .prepare(
      `INSERT INTO usage_history
    (provider, model, api_key_id, tokens_input, tokens_output, success, timestamp)
    VALUES ('vercel', ?, ?, NULL, 0, 1, ?)`
    )
    .run(model, ENTRY.apiKeyId, ENTRY.timestamp);
  const status = await getStatus();
  assert.equal(status.dailySpentUsd, 0.2);
  assert.equal(status.dailyHasUnpricedUsage, true);
  assert.equal(status.dailyExceeded, true);
});

test("NULL-token duplicate callbacks enrich cost without duplicating usage", async () => {
  const entry = { ...ENTRY, tokens: { prompt_tokens: null, completion_tokens: null } };
  await saveRequestUsage(entry);
  await saveRequestUsage({ ...entry, costUsd: 0 });
  await saveRequestUsage({ ...entry, costUsd: 0.125 });
  assert.deepEqual(
    getDbInstance()
      .prepare("SELECT tokens_input, tokens_output, provider_cost_usd FROM usage_history")
      .all(),
    [{ tokens_input: null, tokens_output: null, provider_cost_usd: 0 }]
  );
});

test("known alternate token aliases and omitted historical fields keep their meaning", async () => {
  await saveRequestUsage({
    ...ENTRY,
    tokens: { input: null, prompt_tokens: 10, output: null, completion_tokens: 1 },
  });
  await saveRequestUsage({ ...ENTRY, tokens: {} });
  assert.deepEqual(
    getDbInstance()
      .prepare("SELECT tokens_input, tokens_output FROM usage_history ORDER BY id")
      .all(),
    [
      { tokens_input: 10, tokens_output: 1 },
      { tokens_input: 0, tokens_output: 0 },
    ]
  );
});
