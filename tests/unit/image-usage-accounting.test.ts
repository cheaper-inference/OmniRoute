// Image routes must feed the same per-key accounting chat does.
//
// Before this change `/v1/images/generations` and `/v1/images/edits` never
// wrote `usage_history`, so a usage-limited API key could generate images
// without its daily/weekly USD spend ever moving (apiKeyUsageLimits re-prices
// `usage_history` only). The combo path and every edit path also wrote
// `call_logs` rows without the API key and without the selected connection.
//
// Every test drives the public route handler with a real API key and a mocked
// upstream, then reads the outcome back through the same code that enforces the
// limit (`getApiKeyUsageLimitStatus` / `enforceApiKeyPolicy` on the next call).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { CALL_LOG_SETTLE_TIMEOUT_MS } from "../helpers/callLogSettle.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-usage-accounting-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "image-usage-accounting-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const usageLimits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const imageEditRoute = await import("../../src/app/api/v1/images/edits/route.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const providerImageRoute =
  await import("../../src/app/api/v1/providers/[provider]/images/generations/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

const originalFetch = globalThis.fetch;

// $/1M tokens. 25,000 image output tokens at $40/1M = $1.00 per call.
const IMAGE_PRICE = { input: 5, output: 40, cached: 1.25 };
const IMAGE_USAGE = {
  total_tokens: 25_050,
  input_tokens: 50,
  output_tokens: 25_000,
  input_tokens_details: { text_tokens: 50, image_tokens: 0 },
};
const EXPECTED_CALL_USD = 1.00025;

type UsageRow = {
  provider: string;
  model: string;
  api_key_id: string | null;
  connection_id: string | null;
  endpoint: string | null;
  combo_strategy: string | null;
  tokens_input: number;
  tokens_output: number;
  success: number;
};

type CallLogRow = {
  path: string;
  status: number;
  api_key_id: string | null;
  api_key_name: string | null;
  connection_id: string | null;
};

async function resetStorage() {
  assert.equal(await waitForCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS), true);
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  assert.equal(await waitForCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS), true);
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedConnection(provider: string, suffix = "") {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-image-usage${suffix}`,
    apiKey: `${provider}-upstream-key${suffix}`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function createLimitedKey(weeklyUsageLimitUsd: number) {
  const created = await apiKeysDb.createApiKey("Image usage key", "machine-image-usage");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    usageLimitEnabled: true,
    weeklyUsageLimitUsd,
  });
  apiKeysDb.clearApiKeyCaches();
  return created;
}

async function spendOf(key: string) {
  const metadata = await apiKeysDb.getApiKeyMetadata(key);
  assert.ok(metadata, "API key metadata must exist");
  return usageLimits.getApiKeyUsageLimitStatus(metadata);
}

function usageRows(): UsageRow[] {
  return core
    .getDbInstance()
    .prepare(
      `SELECT provider, model, api_key_id, connection_id, endpoint, combo_strategy,
              tokens_input, tokens_output, success
         FROM usage_history ORDER BY id`
    )
    .all() as UsageRow[];
}

async function callLogRows(pathPrefix: string): Promise<CallLogRow[]> {
  assert.equal(
    await waitForCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS),
    true,
    "call log writes must settle"
  );
  return core
    .getDbInstance()
    .prepare(
      `SELECT path, status, api_key_id, api_key_name, connection_id
         FROM call_logs WHERE path LIKE ? ORDER BY timestamp`
    )
    .all(`${pathPrefix}%`) as CallLogRow[];
}

function mockOpenAiCompatibleImageUpstream(expectedUrl: string) {
  const hits: string[] = [];
  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    assert.equal(stringUrl, expectedUrl);
    hits.push(stringUrl);
    return new Response(
      JSON.stringify({
        created: 1_790_000_000,
        data: [{ b64_json: "aW1hZ2UtYnl0ZXM=" }],
        usage: IMAGE_USAGE,
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  return hits;
}

function generationRequest(key: string, model: string) {
  return new Request("http://localhost/api/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, prompt: "a lighthouse at dusk" }),
  });
}

test("direct /v1/images/generations moves the key's USD spend and the limit then blocks the key", async () => {
  await updatePricing({ openai: { "gpt-image-2": IMAGE_PRICE } });
  const connection = await seedConnection("openai");
  const key = await createLimitedKey(1);
  const hits = mockOpenAiCompatibleImageUpstream("https://api.openai.com/v1/images/generations");

  assert.equal((await spendOf(key.key)).weeklySpentUsd, 0);

  const response = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"));
  assert.equal(response.status, 200);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.usage, undefined, "client payload shape is unchanged");

  const rows = usageRows();
  assert.equal(rows.length, 1, "one usage_history row per successful image call");
  assert.equal(rows[0].provider, "openai");
  assert.equal(rows[0].model, "gpt-image-2");
  assert.equal(rows[0].api_key_id, key.id);
  assert.equal(rows[0].connection_id, connection.id);
  assert.equal(rows[0].endpoint, "/v1/images/generations");
  assert.equal(rows[0].tokens_input, 50);
  assert.equal(rows[0].tokens_output, 25_000);

  const status = await spendOf(key.key);
  assert.equal(status.weeklySpentUsd, EXPECTED_CALL_USD);
  assert.equal(status.weeklyExceeded, true);

  // The next request with the same key is refused by the existing policy check.
  const blocked = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"));
  assert.equal(blocked.status, 429, "non-Anthropic over-limit keeps the release 429 contract");
  const blockedBody = (await blocked.json()) as { error: { message: string } };
  assert.match(blockedBody.error.message, /weekly usage quota/i);
  assert.equal(hits.length, 1, "the blocked call never reaches the upstream");
});

test("image combo generation records usage and call_logs against the key and the selected connection", async () => {
  await updatePricing({ openai: { "gpt-image-2": IMAGE_PRICE } });
  const connection = await seedConnection("openai");
  const key = await createLimitedKey(100);
  await combosDb.createCombo({
    name: "image-usage-combo",
    strategy: "priority",
    models: ["openai/gpt-image-2"],
  });
  mockOpenAiCompatibleImageUpstream("https://api.openai.com/v1/images/generations");

  const response = await imageRoute.POST(generationRequest(key.key, "image-usage-combo"));
  assert.equal(response.status, 200);

  const rows = usageRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].provider, "openai");
  assert.equal(rows[0].model, "gpt-image-2");
  assert.equal(rows[0].api_key_id, key.id);
  assert.equal(rows[0].connection_id, connection.id);
  assert.equal(rows[0].combo_strategy, "priority");
  assert.equal((await spendOf(key.key)).weeklySpentUsd, EXPECTED_CALL_USD);

  const logs = await callLogRows("/v1/images/generations");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, 200);
  assert.equal(logs[0].api_key_id, key.id);
  assert.equal(logs[0].api_key_name, "Image usage key");
  assert.equal(logs[0].connection_id, connection.id);
});

test("/v1/images/edits records usage and call_logs against the key and the selected connection", async () => {
  const model = "google/gemini-3.1-flash-image-preview";
  await updatePricing({ openrouter: { [model]: IMAGE_PRICE } });
  const connection = await seedConnection("openrouter");
  const key = await createLimitedKey(100);
  mockOpenAiCompatibleImageUpstream("https://openrouter.ai/api/v1/images");

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: `Bearer ${key.key}` },
      body: JSON.stringify({
        model: `openrouter/${model}`,
        prompt: "add a red hat",
        images: [
          `data:image/png;base64,${Buffer.from([0x89, 0x50, 0x4e, 0x47, 1]).toString("base64")}`,
        ],
      }),
    })
  );
  assert.equal(response.status, 200);

  const rows = usageRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].provider, "openrouter");
  assert.equal(rows[0].model, model);
  assert.equal(rows[0].api_key_id, key.id);
  assert.equal(rows[0].connection_id, connection.id);
  assert.equal(rows[0].endpoint, "/v1/images/edits");
  assert.equal((await spendOf(key.key)).weeklySpentUsd, EXPECTED_CALL_USD);

  const logs = await callLogRows("/v1/images/edits");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].api_key_id, key.id);
  assert.equal(logs[0].connection_id, connection.id);
});

test("an image call whose upstream reports no usage does not lock a limited key through an unpriced $0 row", async () => {
  // No pricing row for the model (the fresh-install default for most image
  // models) and no `usage` in the upstream body. A zero-token row here would
  // trip the fail-closed guard for unpriced usage (#12341) and block the key
  // for the rest of the window, so the call is attributed in call_logs only.
  const connection = await seedConnection("openai");
  const key = await createLimitedKey(100);
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ created: 1, data: [{ url: "https://cdn.example.com/a.png" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  const response = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"));
  assert.equal(response.status, 200);
  assert.deepEqual(usageRows(), []);
  const status = await spendOf(key.key);
  assert.equal(status.weeklyExceeded, false);
  assert.equal(status.weeklyHasUnpricedUsage, false);

  const logs = await callLogRows("/v1/images/generations");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].api_key_id, key.id);
  assert.equal(logs[0].connection_id, connection.id);
});

test("an image call with usage but no pricing row is logged without locking the limited key", async () => {
  // A successful image response can report tokens before OmniRoute has a pricing
  // row for that model. Do not persist that row: apiKeyUsageLimits treats any
  // unpriced usage as fail-closed and would reject the key's next request.
  const connection = await seedConnection("openai");
  const key = await createLimitedKey(100);
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({ created: 1, data: [{ b64_json: "aW1hZ2U=" }], usage: IMAGE_USAGE }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );

  const response = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"));
  assert.equal(response.status, 200);
  assert.deepEqual(usageRows(), []);
  const status = await spendOf(key.key);
  assert.equal(status.weeklySpentUsd, 0);
  assert.equal(status.weeklyExceeded, false);
  assert.equal(status.weeklyHasUnpricedUsage, false);

  const logs = await callLogRows("/v1/images/generations");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].api_key_id, key.id);
  assert.equal(logs[0].connection_id, connection.id);
});

test("a failed image call records no successful usage and leaves the key's spend untouched", async () => {
  await updatePricing({ openai: { "gpt-image-2": IMAGE_PRICE } });
  await seedConnection("openai");
  const key = await createLimitedKey(100);
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "upstream exploded" } }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });

  const response = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"));
  assert.equal(response.status, 500);
  assert.deepEqual(
    usageRows().filter((row) => row.success === 1),
    []
  );
  assert.equal((await spendOf(key.key)).weeklySpentUsd, 0);
});

for (const withUsage of [false, true]) {
  test(`image with usage=${withUsage} and no price allows the same key's real priced chat 200`, async () => {
    await updatePricing({ openai: { "gpt-4o-mini": { input: 0.15, output: 0.6 } } });
    const connection = await seedConnection("openai");
    const key = await createLimitedKey(100);
    const hits: string[] = [];
    globalThis.fetch = async (url) => {
      hits.push(String(url));
      if (String(url).endsWith("/images/generations")) {
        return Response.json({
          created: 1,
          data: [{ b64_json: "aW1hZ2U=" }],
          ...(withUsage && { usage: IMAGE_USAGE }),
        });
      }
      assert.match(String(url), /\/chat\/completions$/);
      return Response.json({
        id: "chatcmpl-image-followup",
        choices: [
          { index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 2, completion_tokens: 1, total_tokens: 3 },
      });
    };
    const image = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"));
    assert.equal(image.status, 200);
    const chat = await chatRoute.POST(
      new Request("http://localhost/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key.key}` },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [{ role: "user", content: "OK?" }],
          stream: false,
        }),
      })
    );
    assert.equal(chat.status, 200, await chat.text());
    assert.equal(hits.length, 2);
    assert.equal(usageRows().filter((row) => row.model === "gpt-image-2").length, 0);
    const status = await spendOf(key.key);
    assert.equal(status.weeklyHasUnpricedUsage, false);
    const logs = await callLogRows("/v1/images/generations");
    assert.equal(logs.length, 1);
    assert.equal(logs[0].api_key_id, key.id);
    assert.equal(logs[0].connection_id, connection.id);
  });
}

test("pricing store failure preserves reported image usage instead of treating it as missing price", async () => {
  const { runImageRequestWithAccounting } =
    await import("../../src/lib/usage/imageRequestAccounting.ts");
  const connection = await seedConnection("openai");
  const key = await createLimitedKey(100);
  const db = core.getDbInstance();
  db.exec("ALTER TABLE key_value RENAME TO key_value_pricing_failure_test");
  invalidateDbCache("pricing");
  try {
    const result = await runImageRequestWithAccounting(
      {
        endpoint: "/v1/images/generations",
        provider: "openai",
        model: "gpt-image-2",
        apiKeyInfo: { id: key.id, name: "Image usage key" },
        credentials: { connectionId: connection.id },
        startTime: Date.now(),
      },
      async () => ({ success: true, usage: IMAGE_USAGE })
    );
    assert.equal(result.success, true);
    const rows = usageRows();
    assert.equal(rows.length, 1, "failed lookup must keep usage evidence");
    assert.equal(rows[0].api_key_id, key.id);
    assert.equal(rows[0].connection_id, connection.id);
    assert.equal(rows[0].tokens_output, 25_000);
  } finally {
    db.exec("ALTER TABLE key_value_pricing_failure_test RENAME TO key_value");
    invalidateDbCache("pricing");
  }
  assert.equal((await spendOf(key.key)).weeklyHasUnpricedUsage, true);
});

test("provider-scoped image generation attributes the provider-local model, key and connection", async () => {
  await updatePricing({ openai: { "gpt-image-2": IMAGE_PRICE } });
  const connection = await seedConnection("openai");
  const key = await createLimitedKey(100);
  mockOpenAiCompatibleImageUpstream("https://api.openai.com/v1/images/generations");
  const response = await providerImageRoute.POST(generationRequest(key.key, "gpt-image-2"), {
    params: Promise.resolve({ provider: "openai" }),
  });
  assert.equal(response.status, 200);
  const rows = usageRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].model, "gpt-image-2");
  assert.equal(rows[0].api_key_id, key.id);
  assert.equal(rows[0].connection_id, connection.id);
});

for (const requestedModel of [
  "flux-2-dev",
  "together/flux-2-dev",
  "together/black-forest-labs/FLUX.2-dev",
]) {
  test(`provider-scoped ${requestedModel} accounts the canonical upstream model and blocks the next call`, async () => {
    const model = "black-forest-labs/FLUX.2-dev";
    await updatePricing({ together: { [model]: IMAGE_PRICE } });
    const connection = await seedConnection("together");
    const key = await createLimitedKey(1);
    let hits = 0;
    globalThis.fetch = async (url, init) => {
      assert.equal(String(url), "https://api.together.xyz/v1/images/generations");
      assert.equal(JSON.parse(String(init?.body)).model, model);
      hits++;
      return Response.json({ created: 1, data: [{ b64_json: "aW1hZ2U=" }], usage: IMAGE_USAGE });
    };
    const call = () =>
      providerImageRoute.POST(generationRequest(key.key, requestedModel), {
        params: Promise.resolve({ provider: "together" }),
      });
    const response = await call();
    assert.equal(response.status, 200);
    const rows = usageRows();
    assert.equal(rows.length, 1);
    assert.equal(rows[0].provider, "together");
    assert.equal(rows[0].model, model);
    assert.equal(rows[0].api_key_id, key.id);
    assert.equal(rows[0].connection_id, connection.id);
    assert.equal(rows[0].endpoint, "/v1/images/generations");
    assert.equal(rows[0].tokens_input, 50);
    assert.equal(rows[0].tokens_output, 25_000);
    const status = await spendOf(key.key);
    assert.equal(status.weeklySpentUsd, EXPECTED_CALL_USD);
    assert.equal(status.weeklyExceeded, true);
    const blocked = await call();
    assert.equal(blocked.status, 429);
    assert.match((await blocked.json()).error.message, /weekly usage quota/i);
    assert.equal(hits, 1, "over-limit request must not reach upstream");
    assert.equal(usageRows().length, 1);
  });
}

test("combo image edits attribute the winning attempt without leaking internal usage", async () => {
  const model = "google/gemini-3.1-flash-image-preview";
  await updatePricing({ openrouter: { [model]: IMAGE_PRICE } });
  const connection = await seedConnection("openrouter");
  const key = await createLimitedKey(100);
  await combosDb.createCombo({
    name: "image-edits-usage-combo",
    strategy: "priority",
    models: [`openrouter/${model}`],
  });
  mockOpenAiCompatibleImageUpstream("https://openrouter.ai/api/v1/images");
  const response = await imageEditRoute.POST(
    new Request("http://localhost/v1/images/edits", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key.key}` },
      body: JSON.stringify({
        model: "image-edits-usage-combo",
        prompt: "add a hat",
        images: ["data:image/png;base64,iVBORwE="],
      }),
    })
  );
  assert.equal(response.status, 200, response.status === 200 ? undefined : await response.text());
  assert.equal((await response.json()).usage, undefined);
  const rows = usageRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].model, model);
  assert.equal(rows[0].api_key_id, key.id);
  assert.equal(rows[0].connection_id, connection.id);
  assert.equal(rows[0].endpoint, "/v1/images/edits");
  const logs = await callLogRows("/v1/images/edits");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].api_key_id, key.id);
  assert.equal(logs[0].connection_id, connection.id);
});

test("Codex dedicated images usage is accounted without changing the release public envelope", async () => {
  await updatePricing({ codex: { "gpt-image-2": IMAGE_PRICE } });
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-images",
    accessToken: "test-codex-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { chatgptPlanType: "plus" },
  });
  const key = await createLimitedKey(100);
  const usage = { ...IMAGE_USAGE, output_tokens_details: { image_tokens: 25_000, text_tokens: 0 } };
  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://chatgpt.com/backend-api/codex/images/generations");
    return Response.json({ created: 1, data: [{ b64_json: "aW1hZ2U=" }], usage });
  };
  const response = await imageRoute.POST(generationRequest(key.key, "codex/gpt-image-2"));
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).usage, usage, "Codex release public usage is preserved");
  const rows = usageRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].provider, "codex");
  assert.equal(rows[0].model, "gpt-image-2");
  assert.equal(rows[0].tokens_output, 25_000);
  assert.equal(rows[0].api_key_id, key.id);
  assert.equal(rows[0].connection_id, connection.id);
});

test("combo fallback records only the successful target and keeps both call-log contexts", async () => {
  const model = "google/gemini-3.1-flash-image-preview";
  await updatePricing({
    openai: { "gpt-image-2": IMAGE_PRICE },
    openrouter: { [model]: IMAGE_PRICE },
  });
  const failed = await seedConnection("openai");
  const winner = await seedConnection("openrouter");
  const key = await createLimitedKey(100);
  await combosDb.createCombo({
    name: "image-usage-fallback",
    strategy: "priority",
    models: ["openai/gpt-image-2", `openrouter/${model}`],
  });
  const hits: string[] = [];
  globalThis.fetch = async (url) => {
    hits.push(String(url));
    if (new URL(String(url)).hostname === "api.openai.com")
      return Response.json(
        { error: { message: "upstream unavailable" }, usage: IMAGE_USAGE },
        { status: 500 }
      );
    return Response.json({ created: 1, data: [{ b64_json: "aW1hZ2U=" }], usage: IMAGE_USAGE });
  };
  const response = await imageRoute.POST(generationRequest(key.key, "image-usage-fallback"));
  assert.equal(response.status, 200);
  assert.equal(hits.length, 2);
  const rows = usageRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].provider, "openrouter");
  assert.equal(rows[0].connection_id, winner.id);
  assert.equal(rows[0].api_key_id, key.id);
  assert.equal((await spendOf(key.key)).weeklySpentUsd, EXPECTED_CALL_USD);
  const logs = await callLogRows("/v1/images/generations");
  assert.equal(logs.length, 2);
  assert.ok(
    logs.some(
      (row) => row.connection_id === failed.id && row.status === 500 && row.api_key_id === key.id
    )
  );
  assert.ok(
    logs.some(
      (row) => row.connection_id === winner.id && row.status === 200 && row.api_key_id === key.id
    )
  );
});

test("credential retry accounts only the real successful attempt", async () => {
  const { runImageRequestWithAccounting } =
    await import("../../src/lib/usage/imageRequestAccounting.ts");
  const { executeImageWithCredentialFallback } =
    await import("../../src/sse/services/imageCredentialRetry.ts");
  const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
  await updatePricing({ openai: { "gpt-image-2": IMAGE_PRICE } });
  const first = await seedConnection("openai");
  const second = await seedConnection("openai", "-retry");
  assert.notEqual(first.id, second.id, "retry fixture must use distinct provider accounts");
  const key = await createLimitedKey(100);
  let hits = 0;
  globalThis.fetch = async () =>
    ++hits === 1
      ? Response.json(
          { error: { message: "expired account" }, usage: IMAGE_USAGE },
          { status: 401 }
        )
      : Response.json({ created: 1, data: [{ b64_json: "aW1hZ2U=" }], usage: IMAGE_USAGE });
  const result = await executeImageWithCredentialFallback({
    provider: "openai",
    requestedModel: "gpt-image-2",
    credentials: { connectionId: first.id, apiKey: "test-first" },
    selectNextCredentials: async () => ({ connectionId: second.id, apiKey: "test-second" }),
    execute: (credentials) =>
      runImageRequestWithAccounting(
        {
          endpoint: "/v1/images/generations",
          provider: "openai",
          model: "gpt-image-2",
          apiKeyInfo: { id: key.id, name: "Image usage key" },
          credentials,
          startTime: Date.now(),
        },
        () =>
          handleImageGeneration({
            body: { model: "openai/gpt-image-2", prompt: "retry" },
            credentials,
            log: null,
          })
      ),
  });
  assert.equal(result.result.success, true);
  assert.equal(hits, 2);
  const rows = usageRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].connection_id, second.id);
  assert.equal(rows[0].api_key_id, key.id);
  const logs = await callLogRows("/v1/images/generations");
  assert.equal(logs.length, 2);
  assert.ok(logs.some((row) => row.connection_id === first.id && row.status === 401));
  assert.ok(logs.some((row) => row.connection_id === second.id && row.status === 200));
});

test("parallel image requests do not cross key or connection attribution", async () => {
  const model = "google/gemini-3.1-flash-image-preview";
  await updatePricing({
    openai: { "gpt-image-2": IMAGE_PRICE },
    openrouter: { [model]: IMAGE_PRICE },
  });
  const a = await seedConnection("openai");
  const b = await seedConnection("openrouter");
  const keyA = await createLimitedKey(100);
  const keyB = await createLimitedKey(100);
  let releaseFirst: (() => void) | undefined;
  const bothStarted = new Promise<void>((resolve) => {
    releaseFirst = resolve;
  });
  let hits = 0;
  globalThis.fetch = async () => {
    if (++hits === 2) releaseFirst?.();
    await bothStarted;
    return Response.json({ created: 1, data: [{ b64_json: "aW1hZ2U=" }], usage: IMAGE_USAGE });
  };
  const responses = await Promise.all([
    imageRoute.POST(generationRequest(keyA.key, "openai/gpt-image-2")),
    imageRoute.POST(generationRequest(keyB.key, `openrouter/${model}`)),
  ]);
  assert.deepEqual(
    responses.map((response) => response.status),
    [200, 200]
  );
  const rows = usageRows();
  assert.equal(rows.length, 2);
  assert.ok(
    rows.some(
      (row) => row.provider === "openai" && row.api_key_id === keyA.id && row.connection_id === a.id
    )
  );
  assert.ok(
    rows.some(
      (row) =>
        row.provider === "openrouter" && row.api_key_id === keyB.id && row.connection_id === b.id
    )
  );
  const logs = await callLogRows("/v1/images/generations");
  assert.equal(logs.length, 2);
  assert.ok(logs.some((row) => row.api_key_id === keyA.id && row.connection_id === a.id));
  assert.ok(logs.some((row) => row.api_key_id === keyB.id && row.connection_id === b.id));
});

test("same-millisecond priced image attempts each persist usage and spend", async (t) => {
  await updatePricing({ openai: { "gpt-image-2": IMAGE_PRICE } });
  const connection = await seedConnection("openai");
  const key = await createLimitedKey(100);
  const hits = mockOpenAiCompatibleImageUpstream("https://api.openai.com/v1/images/generations");
  t.mock.timers.enable({ apis: ["Date"], now: 1_791_705_600_000 });
  try {
    const first = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"));
    const second = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"));

    assert.equal(first.status, 200);
    assert.equal(second.status, 200);
    assert.equal(hits.length, 2);
    assert.equal((await callLogRows("/v1/images/generations")).length, 2);
    assert.equal(usageRows().length, 2);
    assert.ok(usageRows().every((row) => row.connection_id === connection.id));
    assert.equal((await spendOf(key.key)).weeklySpentUsd, EXPECTED_CALL_USD * 2);
  } finally {
    t.mock.timers.reset();
  }
});

test("real-clock parallel priced image burst persists every physical attempt", async () => {
  await updatePricing({ openai: { "gpt-image-2": IMAGE_PRICE } });
  await seedConnection("openai");
  const key = await createLimitedKey(100);
  const hits = mockOpenAiCompatibleImageUpstream("https://api.openai.com/v1/images/generations");
  const responses = await Promise.all(
    Array.from({ length: 20 }, () =>
      imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"))
    )
  );

  assert.ok(responses.every((response) => response.status === 200));
  assert.equal(hits.length, 20);
  assert.equal((await callLogRows("/v1/images/generations")).length, 20);
  assert.equal(usageRows().length, 20);
  // The quota API rounds the Decimal total; avoid binary multiplication residue.
  assert.equal((await spendOf(key.key)).weeklySpentUsd, 20.005);
});
