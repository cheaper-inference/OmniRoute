import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-media-billing-"));
process.env.DATA_DIR = directory;
process.env.API_KEY_SECRET = "synthetic-media-billing-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const originalRemoteAudio = process.env.AUDIO_REMOTE_PROVIDER_NODES;
process.env.AUDIO_REMOTE_PROVIDER_NODES = "true";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { getUsageHistory } = await import("../../src/lib/usage/usageHistory.ts");
const costRules = await import("../../src/domain/costRules.ts");
const stt = await import("../../src/app/api/v1/audio/transcriptions/route.ts");
const tts = await import("../../src/app/api/v1/audio/speech/route.ts");
const images = await import("../../src/app/api/v1/images/generations/route.ts");
const { priceMediaRequest, normalizeMediaUsage, safelyRecordMedia, recordMediaRequest } =
  await import("../../src/lib/usage/mediaRequestAccounting.ts");
const { getApiKeyUsageLimitStatus } = await import("../../src/lib/usage/apiKeyUsageLimits.ts");
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");
const originalFetch = globalThis.fetch;

async function reset() {
  await waitForCallLogSaves(10_000);
  globalThis.fetch = originalFetch;
  costRules.resetCostData();
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
}
test.beforeEach(async () => {
  await reset();
  fs.mkdirSync(directory, { recursive: true });
});
test.after(reset);
test.after(() => {
  if (originalRemoteAudio === undefined) delete process.env.AUDIO_REMOTE_PROVIDER_NODES;
  else process.env.AUDIO_REMOTE_PROVIDER_NODES = originalRemoteAudio;
});

async function seed(provider: string, model: string, pricing: Record<string, number>) {
  const connection = await providers.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: "synthetic-upstream-key",
    name: "Synthetic media billing",
    isActive: true,
    testStatus: "active",
  });
  await updatePricing({ [provider]: { [model]: pricing } });
  const key = await apiKeys.createApiKey("Media billing", "synthetic-machine");
  costRules.setBudget(key.id, { dailyLimitUsd: 10 });
  apiKeys.clearApiKeyCaches();
  return { connection, key };
}

function jsonRequest(endpoint: string, key: string, body: unknown) {
  return new Request(`http://localhost/api/v1/${endpoint}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function near(value: unknown, expected: number) {
  assert.ok(Math.abs(Number(value) - expected) < 1e-9, `expected ${expected}, got ${value}`);
}

async function ledger(key: string) {
  await new Promise((resolve) => setImmediate(resolve));
  return core
    .getDbInstance()
    .prepare("SELECT * FROM request_cost_ledger WHERE api_key_id=? ORDER BY id")
    .all(key) as Array<Record<string, unknown>>;
}

test("migrated media billing counts stored charges once in five-hour budgets after tariff changes", async () => {
  const { connection, key } = await seed("openrouter", "synthetic-stt", {
    input: 100,
    output: 100,
  });
  await updatePricing({
    openrouter: {
      "synthetic-tts": { output_cost_per_character: 0.001 },
      "synthetic-image": { output_cost_per_image: 0.02 },
    },
  });
  const now = Date.now();
  const spentAt = new Date(now - 2 * 60 * 60 * 1000).toISOString();
  const requests = [
    {
      model: "synthetic-stt",
      unit: "second" as const,
      quantity: 2,
      endpoint: "/v1/audio/transcriptions",
      usage: { input_tokens: 1_000_000, cost: 0.05 },
    },
    {
      model: "synthetic-tts",
      unit: "character" as const,
      quantity: 10,
      endpoint: "/v1/audio/speech",
    },
    {
      model: "synthetic-image",
      unit: "image" as const,
      quantity: 2,
      endpoint: "/v1/images/generations",
    },
  ];
  for (const request of requests) {
    const bill = await priceMediaRequest({ provider: "openrouter", ...request });
    await recordMediaRequest(
      {
        provider: "openrouter",
        model: request.model,
        endpoint: request.endpoint,
        apiKeyId: key.id,
        connectionId: connection.id,
        startTime: now,
        requestId: `synthetic-migration-${request.unit}`,
      },
      bill
    );
  }
  const db = core.getDbInstance();
  db.prepare("UPDATE usage_history SET timestamp = ? WHERE api_key_id = ?").run(spentAt, key.id);
  await updatePricing({
    openrouter: {
      "synthetic-stt": { input: 1000, output: 1000 },
      "synthetic-tts": { output_cost_per_character: 1 },
      "synthetic-image": { output_cost_per_image: 2 },
    },
  });
  const status = await getApiKeyUsageLimitStatus(
    { id: key.id, usageLimitEnabled: true, fiveHourUsageLimitUsd: 0.09, allowedConnections: null },
    { now: () => now }
  );
  near(status.fiveHourSpentUsd, 0.1);
  assert.equal(status.fiveHourExceeded, true);
  assert.equal(status.fiveHourResetAtIso, new Date(now + 3 * 60 * 60 * 1000).toISOString());
  const rows = await getUsageHistory();
  assert.equal(rows.length, 3);
  assert.equal((await ledger(key.id)).length, 3);
  near(costRules.checkBudget(key.id).periodUsed, 0.1);
  assert.deepEqual(
    db
      .prepare(
        "SELECT version, name FROM _omniroute_migrations WHERE version >= '228' ORDER BY version"
      )
      .all(),
    [
      { version: "228", name: "purge_orphaned_provider_catalogs" },
      { version: "229", name: "api_key_five_hour_limit" },
      { version: "230", name: "call_logs_cache_write_tiers" },
      { version: "231", name: "daily_cached_input" },
      { version: "232", name: "proxy_payload_traffic" },
      { version: "233", name: "api_key_self_service_settings" },
      { version: "234", name: "agent_sessions" },
      { version: "235", name: "usage_history_agent_session_id" },
      { version: "236", name: "key_templates" },
      { version: "237", name: "usage_history_calculated_cost" },
      { version: "238", name: "usage_history_session_timestamp_index" },
    ]
  );
  assert.equal(runMigrations(db), 0);
});

test("STT records upstream dollars and measured seconds without changing the transcript", async () => {
  const { connection, key } = await seed("openrouter", "mistralai/voxtral-mini-transcribe-3-0", {
    input: 100,
    output: 100,
  });
  const payload = {
    text: "PRIVATE_SYNTHETIC_SPEECH",
    usage: { seconds: 2.5, input_tokens: 3, output_tokens: 2, cost: 0.0025 },
  };
  globalThis.fetch = async () => Response.json(payload);
  const body = new FormData();
  body.set("model", "openrouter/mistralai/voxtral-mini-transcribe-3-0");
  body.set("file", new File([new Uint8Array([1, 2, 3])], "synthetic.wav", { type: "audio/wav" }));
  const response = await stt.POST(
    new Request("http://localhost/api/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key.key}` },
      body,
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(await response.json(), payload);
  near(response.headers.get("x-omniroute-response-cost"), 0.0025);
  const rows = await getUsageHistory();
  assert.equal(rows.length, 1);
  near(rows[0].providerCostUsd, 0.0025);
  assert.equal(rows[0].connectionId, connection.id);
  assert.equal(
    core.getDbInstance().prepare("SELECT endpoint FROM usage_history").get().endpoint,
    "/v1/audio/transcriptions"
  );
  assert.equal(rows[0].billingUnit, "second");
  assert.equal(rows[0].billingQuantity, 2.5);
  assert.equal(rows[0].tokens.input, 3);
  near(costRules.checkBudget(key.id).periodUsed, 0.0025);
  const entries = await ledger(key.id);
  assert.equal(entries.length, 1);
  near(entries[0].amount_usd, 0.0025);
  assert.equal(entries[0].request_id, response.headers.get("x-omniroute-request-id"));
});

test("TTS records a character-price snapshot and preserves the binary audio", async () => {
  const { key } = await seed("openai", "tts-1", { input_cost_per_character: 0.00001 });
  const audio = new Uint8Array([82, 73, 70, 70, 1, 2, 3, 4]);
  globalThis.fetch = async () => new Response(audio, { headers: { "Content-Type": "audio/wav" } });
  const response = await tts.POST(
    jsonRequest("audio/speech", key.key, {
      model: "openai/tts-1",
      input: "Bonjour.",
      voice: "alloy",
      response_format: "wav",
    }),
    {}
  );
  assert.equal(response.status, 200);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), audio);
  assert.equal(response.headers.get("content-type"), "audio/wav");
  near(response.headers.get("x-omniroute-response-cost"), 0.00008);
  const rows = await getUsageHistory();
  assert.equal(rows.length, 1);
  near(rows[0].calculatedCostUsd, 0.00008);
  assert.equal(rows[0].providerCostUsd, null);
  assert.equal(rows[0].billingUnit, "character");
  assert.equal(rows[0].billingQuantity, 8);
  assert.equal(rows[0].tokens.input, 0);
  near(costRules.checkBudget(key.id).periodUsed, 0.00008);
  assert.equal((await ledger(key.id)).length, 1);
});

test("image combos charge upstream dollars once and count only images actually delivered", async () => {
  const { connection, key } = await seed("openai", "gpt-image-2", {
    input: 100,
    output: 100,
    output_cost_per_image: 0.03,
  });
  await createCombo({
    name: "synthetic-image-billing",
    models: [{ model: "openai/gpt-image-2", connectionId: connection.id }],
  });
  globalThis.fetch = async () =>
    Response.json({
      data: [{ b64_json: "c3ludGhldGlj" }],
      usage: { input_tokens: 2, output_tokens: 3, cost: 0.12 },
    });
  const response = await images.POST(
    jsonRequest("images/generations", key.key, {
      model: "synthetic-image-billing",
      prompt: "synthetic",
      n: 3,
    }),
    {}
  );
  assert.equal(response.status, 200, await response.clone().text());
  const body = await response.json();
  assert.equal(body.data.length, 1);
  near(response.headers.get("x-omniroute-response-cost"), 0.12);
  const rows = await getUsageHistory();
  assert.equal(rows.length, 1);
  near(rows[0].providerCostUsd, 0.12);
  assert.equal(rows[0].billingUnit, "image");
  assert.equal(rows[0].billingQuantity, 1);
  assert.equal(rows[0].connectionId, connection.id);
  near(costRules.checkBudget(key.id).periodUsed, 0.12);
  const entries = await ledger(key.id);
  assert.equal(entries.length, 1);
  near(entries[0].amount_usd, 0.12);
});

test("EU OpenRouter TTS reconciles the final charge after audio delivery on the same EU endpoint", async () => {
  const node = await providers.createProviderNode({
    type: "openai-compatible",
    name: "EU OpenRouter",
    prefix: "eu-openrouter",
    apiType: "chat",
    baseUrl: "https://eu.openrouter.ai/api/v1",
  });
  const { connection, key } = await seed(node.id, "mistralai/voxtral-mini-tts-3-0", {});
  let paidCalls = 0;
  let usageCalls = 0;
  globalThis.fetch = async (url, options) => {
    assert.equal(new URL(String(url)).hostname, "eu.openrouter.ai");
    assert.equal(
      new Headers(options?.headers).get("authorization"),
      "Bearer synthetic-upstream-key"
    );
    if (new URL(String(url)).pathname.endsWith("/audio/speech")) {
      paidCalls++;
      return new Response(new Uint8Array([1, 2, 3, 4]), {
        headers: {
          "Content-Type": "audio/wav",
          "X-Generation-Id": "gen-synthetic-tts",
        },
      });
    }
    usageCalls++;
    assert.equal(new URL(String(url)).pathname, "/api/v1/generation");
    assert.equal(new URL(String(url)).searchParams.get("id"), "gen-synthetic-tts");
    return Response.json({
      data: {
        id: "gen-synthetic-tts",
        total_cost: 0.000143,
        native_tokens_prompt: 0,
        native_tokens_completion: 0,
      },
    });
  };
  const response = await tts.POST(
    jsonRequest("audio/speech", key.key, {
      model: "eu-openrouter/mistralai/voxtral-mini-tts-3-0",
      input: "Bonjour.",
      voice: "fr_marie_neutral",
    }),
    {}
  );
  if (response.status !== 200) assert.fail(await response.text());
  assert.equal(response.headers.get("x-omniroute-cost-status"), "pending");
  assert.equal(response.headers.get("x-omniroute-response-cost"), null);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), new Uint8Array([1, 2, 3, 4]));
  for (let i = 0; i < 30 && (await getUsageHistory()).length === 0; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.equal(paidCalls, 1);
  assert.equal(usageCalls, 1);
  const rows = await getUsageHistory();
  assert.equal(rows.length, 1);
  near(rows[0].providerCostUsd, 0.000143);
  assert.equal(rows[0].calculatedCostUsd, null);
  assert.equal(rows[0].connectionId, connection.id);
  assert.equal(rows[0].model, "mistralai/voxtral-mini-tts-3-0");
  assert.equal(rows[0].billingQuantity, 8);
  near(costRules.checkBudget(key.id).periodUsed, 0.000143);
  const entries = await ledger(key.id);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].request_id, response.headers.get("x-omniroute-request-id"));
});

test("media pricing distinguishes missing tariffs from explicit zero and never invents tokens", async () => {
  await updatePricing({
    synthetic: {
      "nested/model": { input_cost_per_second: 0.001 },
      free: { input_cost_per_character: 0 },
      invalid: { output_cost_per_image: -1 },
    },
  });
  const seconds = await priceMediaRequest({
    provider: "synthetic",
    model: "synthetic/nested/model",
    unit: "second",
    quantity: 2.5,
  });
  near(seconds.costUsd, 0.0025);
  assert.deepEqual(seconds.usage, {});
  assert.equal(
    (
      await priceMediaRequest({
        provider: "synthetic",
        model: "free",
        unit: "character",
        quantity: 8,
      })
    ).costUsd,
    0
  );
  assert.equal(
    (
      await priceMediaRequest({
        provider: "synthetic",
        model: "unknown",
        unit: "image",
        quantity: 2,
      })
    ).costUsd,
    null
  );
  assert.equal(
    (
      await priceMediaRequest({
        provider: "synthetic",
        model: "invalid",
        unit: "image",
        quantity: 2,
      })
    ).costUsd,
    null
  );
  const exactZero = await priceMediaRequest({
    provider: "synthetic",
    model: "unknown",
    unit: "image",
    quantity: 2,
    usage: { cost: 0 },
  });
  assert.equal(exactZero.reportedCostUsd, 0);
  assert.deepEqual(
    normalizeMediaUsage({
      cost: -1,
      input_tokens: NaN,
      seconds: Infinity,
      transcript: "private",
      prompt: "private",
      data: "private",
      output_tokens: 2,
    }),
    { output_tokens: 2 }
  );
});

test("direct image generation snapshots actual per-image quantity without duplicate debits", async () => {
  const { key } = await seed("openai", "gpt-image-2", { output_cost_per_image: 0.03 });
  globalThis.fetch = async () => Response.json({ data: [{ b64_json: "c3ludGhldGlj" }] });
  const responses = await Promise.all(
    [1, 2].map(() =>
      images.POST(
        jsonRequest("images/generations", key.key, {
          model: "openai/gpt-image-2",
          prompt: "synthetic",
          n: 3,
        }),
        {}
      )
    )
  );
  for (const response of responses) {
    assert.equal(response.status, 200);
    near(response.headers.get("x-omniroute-response-cost"), 0.03);
  }
  const rows = await getUsageHistory();
  assert.equal(rows.length, 2);
  for (const row of rows) {
    near(row.calculatedCostUsd, 0.03);
    assert.equal(row.billingQuantity, 1);
  }
  near(costRules.checkBudget(key.id).periodUsed, 0.06);
  const entries = await ledger(key.id);
  assert.equal(entries.length, 2);
  assert.equal(new Set(entries.map((entry) => entry.request_id)).size, 2);
});

test("speech combos bill only the successful physical target against the caller key", async () => {
  const { connection, key } = await seed("openai", "tts-1", { input_cost_per_character: 0.00001 });
  await createCombo({
    name: "synthetic-speech-combo",
    models: [
      { model: "openai/tts-1-hd", connectionId: connection.id },
      { model: "openai/tts-1", connectionId: connection.id },
    ],
  });
  globalThis.fetch = async (_url, options) => {
    const body = JSON.parse(String(options?.body));
    return body.model === "tts-1-hd"
      ? Response.json({ error: "temporary" }, { status: 503 })
      : new Response(new Uint8Array([7, 8, 9]));
  };
  const response = await tts.POST(
    jsonRequest("audio/speech", key.key, {
      model: "synthetic-speech-combo",
      input: "Bonjour.",
      voice: "alloy",
    }),
    {}
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(response.headers.get("x-omniroute-fallback-attempts"), "1");
  const rows = await getUsageHistory();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].model, "tts-1");
  assert.equal(rows[0].apiKeyId, key.id);
  near(rows[0].calculatedCostUsd, 0.00008);
  near(costRules.checkBudget(key.id).periodUsed, 0.00008);
  assert.equal((await ledger(key.id)).length, 1);
});

test("unavailable speech metadata uses an explicit tariff without inventing a provider charge", async () => {
  const node = await providers.createProviderNode({
    type: "openai-compatible",
    name: "EU OpenRouter",
    prefix: "eu-openrouter",
    apiType: "chat",
    baseUrl: "https://eu.openrouter.ai/api/v1",
  });
  const { key } = await seed(node.id, "mistralai/voxtral-mini-tts-3-0", {});
  await updatePricing({
    "eu-openrouter": { "mistralai/voxtral-mini-tts-3-0": { input_cost_per_character: 0.0000143 } },
  });
  globalThis.fetch = async (url) =>
    String(url).includes("/generation?")
      ? new Response(null, { status: 503 })
      : new Response(new Uint8Array([1]), {
          headers: { "X-Generation-Id": "gen-unavailable" },
        });
  const response = await tts.POST(
    jsonRequest("audio/speech", key.key, {
      model: "eu-openrouter/mistralai/voxtral-mini-tts-3-0",
      input: "Bonjour.",
      voice: "fr_marie_neutral",
    }),
    {}
  );
  assert.equal(response.status, 200);
  await response.arrayBuffer();
  for (let i = 0; i < 30 && (await getUsageHistory()).length === 0; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  const rows = await getUsageHistory();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].providerCostUsd, null);
  near(rows[0].calculatedCostUsd, 0.0001144);
  near(costRules.checkBudget(key.id).periodUsed, 0.0001144);
  assert.equal((await ledger(key.id)).length, 1);
});

test("token-priced images retain nested cache discounts without retaining arbitrary usage payloads", async () => {
  const { key } = await seed("openai", "gpt-image-2", { input: 2, output: 0, cached: 0.2 });
  globalThis.fetch = async () =>
    Response.json({
      data: [{ b64_json: "c3ludGhldGlj" }],
      usage: {
        input_tokens: 100,
        output_tokens: 0,
        input_tokens_details: { cached_tokens: 50, private_text: "must-not-persist" },
      },
    });
  const response = await images.POST(
    jsonRequest("images/generations", key.key, {
      model: "openai/gpt-image-2",
      prompt: "synthetic",
    }),
    {}
  );
  assert.equal(response.status, 200);
  near(response.headers.get("x-omniroute-response-cost"), 0.00011);
  const rows = await getUsageHistory();
  assert.equal(rows[0].tokens.cacheRead, 50);
  near(rows[0].calculatedCostUsd, 0.00011);
  near(costRules.checkBudget(key.id).periodUsed, 0.00011);
  assert.deepEqual(
    normalizeMediaUsage({
      input_tokens_details: { cached_tokens: 50, private_text: "must-not-persist" },
    }),
    { input_tokens_details: { cached_tokens: 50 } }
  );
});

test("accounting persistence failures never replace paid media responses or log sensitive diagnostics", async () => {
  const messages: unknown[] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => {
    messages.push(args);
  };
  try {
    await safelyRecordMedia(async () => {
      throw new Error("private-synthetic-diagnostic");
    });
  } finally {
    console.error = original;
  }
  assert.equal(messages.length, 1);
  assert.equal(JSON.stringify(messages).includes("private-synthetic-diagnostic"), false);
});
