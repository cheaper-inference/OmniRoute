// Per-key USD limits (daily / weekly / 5 h) re-price usage_history and add the
// search ledger tier. Speech, transcription and rerank calls write no
// usage_history row, so their spend never moved a limit. They now write a
// request_cost_ledger row tagged with the "modal" tier, and the limit readers
// add that tier next to "search".
//
// Every route test drives the public handler with a real key and a mocked
// upstream, then reads the result through getApiKeyUsageLimitStatus, the code
// that enforces the limit.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-modal-ledger-limits-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "modal-ledger-limits-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const costLedger = await import("../../src/lib/db/costLedger.ts");
const { saveSyncedPricing } = await import("../../src/lib/pricingSync.ts");
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const costRules = await import("../../src/domain/costRules.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const usageLimits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");
const speechRoute = await import("../../src/app/api/v1/audio/speech/route.ts");
const transcriptionRoute = await import("../../src/app/api/v1/audio/transcriptions/route.ts");
const rerankRoute = await import("../../src/app/api/v1/rerank/route.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");

const originalFetch = globalThis.fetch;
const HOUR_MS = 60 * 60 * 1000;

async function resetStorage() {
  await waitForCallLogSaves(10_000);
  globalThis.fetch = originalFetch;
  costRules.resetCostData();
  apiKeysDb.resetApiKeyState();
  usageHistory.clearPendingRequests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await waitForCallLogSaves(10_000);
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedConnection(provider: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-modal-ledger`,
    apiKey: ["modal", "ledger", provider].join("-"),
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function createLimitedKey(limits: Record<string, number>) {
  const created = await apiKeysDb.createApiKey("Modal ledger key", "machine-modal-ledger");
  await apiKeysDb.updateApiKeyPermissions(created.id, { usageLimitEnabled: true, ...limits });
  apiKeysDb.clearApiKeyCaches();
  return created;
}

async function statusOf(key: string, deps = {}) {
  const metadata = await apiKeysDb.getApiKeyMetadata(key);
  assert.ok(metadata, "API key metadata must exist");
  return usageLimits.getApiKeyUsageLimitStatus(metadata, deps);
}

function authed(url: string, key: string, body: BodyInit, json = true) {
  return new Request(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      ...(json ? { "Content-Type": "application/json" } : {}),
    },
    body,
  });
}

/** The ledger write is fire-and-forget: wait until the rows of the key are in. */
async function waitForLedgerRows(apiKeyId: string, rows: number) {
  const deadline = Date.now() + 5_000;
  const count = () =>
    Number(
      (
        core
          .getDbInstance()
          .prepare("SELECT COUNT(*) AS n FROM request_cost_ledger WHERE api_key_id = ?")
          .get(apiKeyId) as { n: number }
      ).n
    );
  while (count() < rows && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  assert.equal(count(), rows, `expected ${rows} ledger row(s) for the key`);
}

function ledgerTiers(apiKeyId: string): string[] {
  return (
    core
      .getDbInstance()
      .prepare("SELECT service_tier FROM request_cost_ledger WHERE api_key_id = ? ORDER BY id")
      .all(apiKeyId) as Array<{ service_tier: string }>
  ).map((row) => row.service_tier);
}

test("a $2 TTS call flips weeklyExceeded on a $1 weekly limit, and the next call is refused", async () => {
  saveSyncedPricing({
    openai: { "tts-1": { input: 0, output: 0, input_cost_per_character: 0.02 } },
  });
  await seedConnection("openai");
  const key = await createLimitedKey({ weeklyUsageLimitUsd: 1 });
  let upstreamCalls = 0;
  globalThis.fetch = (async (url: unknown) => {
    assert.equal(String(url), "https://api.openai.com/v1/audio/speech");
    upstreamCalls += 1;
    return new Response(new Uint8Array([1, 2, 3]), {
      status: 200,
      headers: { "content-type": "audio/mpeg" },
    });
  }) as typeof fetch;
  const speak = () =>
    speechRoute.POST(
      authed(
        "http://localhost/api/v1/audio/speech",
        key.key,
        JSON.stringify({ model: "openai/tts-1", input: "x".repeat(100), voice: "alloy" })
      ),
      {}
    );

  assert.equal((await statusOf(key.key)).weeklyExceeded, false);
  const response = await speak();
  assert.equal(response.status, 200, await response.clone().text());
  await waitForLedgerRows(key.id, 1);

  const status = await statusOf(key.key);
  assert.ok(Math.abs(status.weeklySpentUsd - 2) < 1e-9, `weekly spend ${status.weeklySpentUsd}`);
  assert.equal(status.weeklyExceeded, true);
  assert.deepEqual(ledgerTiers(key.id), ["modal"]);

  const blocked = await speak();
  assert.equal(blocked.status, 429);
  assert.equal(upstreamCalls, 1, "the blocked call never reaches the upstream");
});

test("a TTS call through a speech combo counts toward the weekly limit", async () => {
  saveSyncedPricing({
    openai: { "tts-1": { input: 0, output: 0, input_cost_per_character: 0.02 } },
  });
  await seedConnection("openai");
  await combosDb.createCombo({
    name: "modal-ledger-speech-combo",
    strategy: "priority",
    models: ["openai/tts-1"],
  });
  const key = await createLimitedKey({ weeklyUsageLimitUsd: 1 });
  globalThis.fetch = (async () =>
    new Response(new Uint8Array([1, 2, 3]), {
      status: 200,
      headers: { "content-type": "audio/mpeg" },
    })) as typeof fetch;

  const response = await speechRoute.POST(
    authed(
      "http://localhost/api/v1/audio/speech",
      key.key,
      JSON.stringify({ model: "modal-ledger-speech-combo", input: "x".repeat(100) })
    ),
    {}
  );
  assert.equal(response.status, 200, await response.clone().text());
  await waitForLedgerRows(key.id, 1);

  const status = await statusOf(key.key);
  assert.ok(Math.abs(status.weeklySpentUsd - 2) < 1e-9, `weekly spend ${status.weeklySpentUsd}`);
  assert.equal(status.weeklyExceeded, true);
});

test("a priced rerank call flips weeklyExceeded on a $1 weekly limit", async () => {
  saveSyncedPricing({ cohere: { "rerank-v3.5": { input: 0, output: 0, search_unit_cost: 0.5 } } });
  await seedConnection("cohere");
  const key = await createLimitedKey({ weeklyUsageLimitUsd: 1 });
  globalThis.fetch = (async (url: unknown) => {
    assert.equal(String(url), "https://api.cohere.com/v2/rerank");
    return new Response(
      JSON.stringify({
        id: "rerank-modal-ledger",
        results: [{ index: 0, relevance_score: 0.9 }],
        meta: { billed_units: { search_units: 3 } },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const response = await rerankRoute.POST(
    authed(
      "http://localhost/api/v1/rerank",
      key.key,
      JSON.stringify({ model: "cohere/rerank-v3.5", query: "q", documents: ["a", "b"] })
    )
  );
  assert.equal(response.status, 200, await response.clone().text());
  await waitForLedgerRows(key.id, 1);

  const status = await statusOf(key.key);
  assert.ok(Math.abs(status.weeklySpentUsd - 1.5) < 1e-9, `weekly spend ${status.weeklySpentUsd}`);
  assert.equal(status.weeklyExceeded, true);
});

test("a transcription call priced per second flips weeklyExceeded on a $1 weekly limit", async () => {
  saveSyncedPricing({
    openai: { "whisper-1": { input: 0, output: 0, input_cost_per_second: 0.02 } },
  });
  await seedConnection("openai");
  const key = await createLimitedKey({ weeklyUsageLimitUsd: 1 });
  globalThis.fetch = (async (url: unknown) => {
    assert.equal(String(url), "https://api.openai.com/v1/audio/transcriptions");
    return new Response(
      JSON.stringify({ text: "hello", usage: { type: "duration", seconds: 100 } }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const form = new FormData();
  form.set("model", "openai/whisper-1");
  form.set("file", new Blob([new Uint8Array([1, 2, 3])], { type: "audio/wav" }), "clip.wav");
  const response = await transcriptionRoute.POST(
    authed("http://localhost/api/v1/audio/transcriptions", key.key, form, false)
  );
  assert.equal(response.status, 200, await response.clone().text());
  await waitForLedgerRows(key.id, 1);

  const status = await statusOf(key.key);
  assert.ok(Math.abs(status.weeklySpentUsd - 2) < 1e-9, `weekly spend ${status.weeklySpentUsd}`);
  assert.equal(status.weeklyExceeded, true);
});

test("a transcription whose upstream reports no duration charges nothing", async () => {
  saveSyncedPricing({
    openai: { "whisper-1": { input: 0, output: 0, input_cost_per_second: 0.02 } },
  });
  await seedConnection("openai");
  const key = await createLimitedKey({ weeklyUsageLimitUsd: 1 });
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ text: "hello" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const form = new FormData();
  form.set("model", "openai/whisper-1");
  form.set("file", new Blob([new Uint8Array([1, 2, 3])], { type: "audio/wav" }), "clip.wav");
  const response = await transcriptionRoute.POST(
    authed("http://localhost/api/v1/audio/transcriptions", key.key, form, false)
  );
  assert.equal(response.status, 200, await response.clone().text());
  await new Promise((resolve) => setTimeout(resolve, 100));

  assert.deepEqual(ledgerTiers(key.id), []);
  assert.equal((await statusOf(key.key)).weeklyExceeded, false);
});

test("modal ledger spend counts in the daily, weekly and 5h windows; the 5h reset follows its timestamp", async () => {
  const key = await createLimitedKey({
    dailyUsageLimitUsd: 1,
    weeklyUsageLimitUsd: 1,
    fiveHourUsageLimitUsd: 1,
  });
  const now = Date.now();
  const at = new Date(now - 2 * HOUR_MS).toISOString();
  costLedger.recordLedgerEntry({
    apiKeyId: key.id,
    provider: "openai",
    model: "tts-1",
    amountUsd: 2,
    serviceTier: "modal",
    timestamp: at,
  });

  const status = await statusOf(key.key, { now: () => now });

  assert.equal(status.dailySpentUsd, 2);
  assert.equal(status.dailyExceeded, true);
  assert.equal(status.weeklySpentUsd, 2);
  assert.equal(status.weeklyExceeded, true);
  assert.equal(status.fiveHourSpentUsd, 2);
  assert.equal(status.fiveHourExceeded, true);
  assert.equal(status.fiveHourResetAtIso, new Date(Date.parse(at) + 5 * HOUR_MS).toISOString());
});

test("a chat call is counted once: its usage_history row counts, its standard-tier ledger row does not", async () => {
  await updatePricing({ openai: { "gpt-4o": { input: 1, cached: 1, output: 1 } } });
  const key = await createLimitedKey({ weeklyUsageLimitUsd: 100 });
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    apiKeyId: key.id,
    apiKeyName: "Modal ledger key",
    tokens: { input: 2_000_000, output: 0 },
    success: true,
    timestamp: new Date().toISOString(),
  });
  // chatCore writes the same call to the ledger under a real service tier.
  costLedger.recordLedgerEntry({
    apiKeyId: key.id,
    provider: "openai",
    model: "gpt-4o",
    amountUsd: 2,
    serviceTier: "standard",
  });

  const status = await statusOf(key.key);

  assert.equal(status.weeklySpentUsd, 2);
});

test("an image call that already writes usage_history is counted exactly once", async () => {
  // 25,000 output tokens at $40/1M = $1.00 from usage_history; the per-image price
  // would add $0.50 more if the image charge were tagged for the limit readers too.
  await updatePricing({
    openai: {
      "gpt-image-2": { input: 5, output: 40, cached: 1.25, output_cost_per_image: 0.5 },
    },
  });
  await seedConnection("openai");
  const key = await createLimitedKey({ weeklyUsageLimitUsd: 100 });
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        created: 1,
        data: [{ b64_json: "aQ==" }],
        usage: { total_tokens: 25_050, input_tokens: 50, output_tokens: 25_000 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    )) as typeof fetch;

  const response = await imageRoute.POST(
    authed(
      "http://localhost/api/v1/images/generations",
      key.key,
      JSON.stringify({ model: "openai/gpt-image-2", prompt: "a lighthouse" })
    )
  );
  assert.equal(response.status, 200, await response.clone().text());
  await waitForLedgerRows(key.id, 1);

  const status = await statusOf(key.key);
  assert.equal(status.weeklySpentUsd, 1.00025);
  assert.deepEqual(ledgerTiers(key.id), ["standard"], "the image ledger row keeps its own tier");
});
