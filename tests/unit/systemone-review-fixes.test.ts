import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-review-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "systemone-review-test-secret";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const models = await import("../../src/lib/db/models.ts");
const settings = await import("../../src/lib/db/settings.ts");
const { getCallLogs } = await import("../../src/lib/usage/callLogs.ts");
const { setRateLimiterTestMode } = await import("../../src/shared/utils/rateLimiter.ts");
const { POST } = await import("../../src/app/api/v1/systemone/route.ts");
const { handleSystemOneProxy, systemOneCost } =
  await import("../../open-sse/handlers/systemOne.ts");
const { resolveSystemOneTarget, nativeSystemOnePricing } =
  await import("../../open-sse/config/systemOneRegistry.ts");
const { parseTypeSafeModels } = await import("../../open-sse/handlers/systemOneCatalog.ts");
const { getProviderCredentialsWithQuotaPreflight } = await import("../../src/sse/services/auth.ts");
const { getModelLockoutInfo, lockModel, clearModelLock } =
  await import("../../open-sse/services/accountFallback.ts");
const { handleSystemOneModels } = await import("../../open-sse/handlers/systemOneModels.ts");
const { decisionOnlyChatRejection } =
  await import("../../src/lib/providerModels/decisionOnlyChatGuard.ts");
const originalFetch = globalThis.fetch;
setRateLimiterTestMode(true);

const body = {
  model: "typesafe/jev-latest",
  state: "Help!",
  questions: { urgent: { type: "noul" } },
};
const answers = { urgent: { type: "noul", noul: 0.8 } };
let nativeId = "";
let localId = "";

function post(raw: unknown) {
  return new Request("http://localhost/v1/systemone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(raw),
  });
}

function usable(credentials: unknown): boolean {
  return (
    !!credentials &&
    typeof credentials === "object" &&
    "connectionId" in credentials &&
    !("allRateLimited" in credentials)
  );
}

test.before(async () => {
  await core.ensureDbInitialized();
  nativeId = String(
    (
      await providers.createProviderConnection({
        provider: "typesafe",
        name: "Native",
        apiKey: "native-test-key",
        isActive: true,
      })
    ).id
  );
  await providers.createProviderConnection({
    provider: "openrouter",
    name: "Gateway",
    apiKey: "gateway-test-key",
    isActive: true,
  });
  localId = String(
    (
      await providers.createProviderConnection({
        provider: "ollama-local",
        name: "Local",
        isActive: true,
        providerSpecificData: { baseUrl: "http://127.0.0.1:11434/v1" },
      })
    ).id
  );
  // Rows as written by /api/show discovery: Clef reports ["vision", "decision"],
  // the text decider only ["decision"].
  await models.replaceSyncedAvailableModelsForConnection("ollama-local", localId, [
    {
      id: "clef-flash",
      name: "Clef Flash",
      supportedEndpoints: ["systemone"],
      supportsVision: true,
    },
    { id: "text-decider", name: "Text decider", supportedEndpoints: ["systemone"] },
  ]);
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(async () => {
  await new Promise<void>((resolve) => setImmediate(resolve));
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("a native 404 for a mistyped model locks only that model; the key keeps serving others", async () => {
  globalThis.fetch = (async () =>
    Response.json(
      { error: { message: "Model jev-typo not found" } },
      { status: 404 }
    )) as typeof fetch;
  const response = await POST(post({ ...body, model: "typesafe/jev-typo" }));
  assert.equal(response.status, 404);

  const [connection] = await providers.getProviderConnections({ provider: "typesafe" });
  assert.ok(!connection.rateLimitedUntil, "the connection must not be cooled down");
  assert.notEqual(connection.testStatus, "unavailable");
  assert.ok(getModelLockoutInfo("typesafe", nativeId, "jev-typo"));
  assert.equal(getModelLockoutInfo("typesafe", nativeId, "jev-latest"), null);

  assert.equal(
    usable(await getProviderCredentialsWithQuotaPreflight("typesafe", null, null, "jev-latest")),
    true
  );
  assert.equal(
    usable(await getProviderCredentialsWithQuotaPreflight("typesafe", null, null, "jev-typo")),
    false
  );
});

test("an upstream body without model is priced and logged with the selected upstream model", async () => {
  globalThis.fetch = (async () =>
    Response.json({ answers, usage: { input_tokens: 1000, output_tokens: 3 } })) as typeof fetch;
  const response = await POST(post(body));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("X-OmniRoute-Cost-Status"), "known");
  assert.equal(response.headers.get("X-OmniRoute-Model"), "jev-latest");
  assert.ok(Math.abs(Number(response.headers.get("X-OmniRoute-Response-Cost")) - 0.000042) < 1e-9);

  const logs = await getCallLogs({ model: "jev-latest" });
  const row = logs.find(
    (entry: { path?: string; status?: number }) => entry.path === "/v1/systemone"
  );
  assert.ok(row, "the call is logged");
  assert.equal(row.model, "jev-latest");
  assert.equal(row.requestedModel, "typesafe/jev-latest");
});

test("the legacy ~typesafe alias stays on OpenRouter while typesafe/ stays native", async () => {
  const legacy = resolveSystemOneTarget("~typesafe/jev-latest");
  assert.equal(legacy.provider, "openrouter");
  assert.equal(legacy.model, "~typesafe/jev-latest");
  assert.equal(legacy.canonicalModel, "openrouter/typesafe/jev-latest");
  assert.equal(resolveSystemOneTarget("typesafe/jev-latest").provider, "typesafe");

  const urls: string[] = [];
  globalThis.fetch = (async (input, init) => {
    urls.push(String(input));
    assert.equal(JSON.parse(String(init?.body)).model, "~typesafe/jev-latest");
    return Response.json({ model: "typesafe/jev-latest", answers, usage: { cost: 0 } });
  }) as typeof fetch;
  const response = await POST(post({ ...body, model: "~typesafe/jev-latest" }));
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(urls, ["https://openrouter.ai/api/v1/systemone"]);
});

test("native Jev uses one published rate and an operator pricing override wins", async () => {
  const published = nativeSystemOnePricing("typesafe", "jev-latest");
  assert.ok(published);
  assert.equal(nativeSystemOnePricing("typesafe", "other-family"), null);
  assert.equal(nativeSystemOnePricing("openrouter", "jev-latest"), null);
  const [catalogRow] = parseTypeSafeModels({ models: [{ name: "jev-1.13" }] });
  assert.equal(catalogRow.pricing?.prompt, "0.000000042");
  assert.ok(Math.abs(Number(catalogRow.pricing?.prompt) - published.input / 1_000_000) < 1e-18);
  assert.equal(catalogRow.pricing?.completion, "0");

  const estimate = await systemOneCost("typesafe", "jev-latest", { input_tokens: 1000 });
  assert.ok(estimate !== null && Math.abs(estimate - 0.000042) < 1e-12);

  await settings.updatePricing({ typesafe: { "jev-latest": { input: 1, output: 0 } } });
  try {
    const overridden = await systemOneCost("typesafe", "jev-latest", { input_tokens: 1000 });
    assert.ok(overridden !== null && Math.abs(overridden - 0.001) < 1e-12);
  } finally {
    await settings.resetPricing("typesafe", "jev-latest");
  }
  // Other providers' lookups are not given a synthetic Jev row.
  assert.equal(await settings.getPricingForModel("openrouter", "jev-latest"), null);
});

test("images follow the configured model's discovered input capability", async () => {
  let calls = 0;
  globalThis.fetch = (async (_input, init) => {
    calls++;
    assert.deepEqual(JSON.parse(String(init?.body)).images, ["aGVsbG8="]);
    return Response.json({ model: "clef-flash", answers });
  }) as typeof fetch;

  const textOnly = await POST(
    post({ ...body, model: "ollama-local/text-decider", images: ["aGVsbG8="] })
  );
  assert.equal(textOnly.status, 400);
  assert.match((await textOnly.json()).error.message, /images/);
  assert.equal(calls, 0);

  const vision = await POST(
    post({ ...body, model: "ollama-local/clef-flash", images: ["aGVsbG8="] })
  );
  assert.equal(vision.status, 200, await vision.clone().text());
  assert.equal(calls, 1);

  const native = await POST(post({ ...body, images: ["aGVsbG8="] }));
  assert.equal(native.status, 400);
  assert.equal(calls, 1);
});

test("a 200 without a non-empty answers object is an invalid upstream body", async () => {
  for (const payload of [{ answers: [] }, { answers: {} }, { model: "jev-latest" }, []]) {
    globalThis.fetch = (async () => Response.json(payload)) as typeof fetch;
    const response = await handleSystemOneProxy({
      body,
      provider: "typesafe",
      credentials: { apiKey: "test" },
    });
    assert.equal(response.status, 502, JSON.stringify(payload));
  }
});

test("catalog listing reads lockouts without writing selection state, fetching OpenRouter once", async () => {
  await providers.createProviderConnection({
    provider: "openrouter",
    name: "Gateway 2",
    apiKey: "gateway-test-key-2",
    isActive: true,
  });
  const before = new Map(
    (await providers.getProviderConnections({})).map((row: { id: string; lastUsedAt?: string }) => [
      row.id,
      row.lastUsedAt ?? null,
    ])
  );
  lockModel("typesafe", nativeId, "jev-preview", "not_found", 60_000);
  const urls: string[] = [];
  globalThis.fetch = (async (input) => {
    urls.push(String(input));
    if (String(input).includes("api.typesafe.ai")) {
      return Response.json({ models: [{ name: "jev-latest" }, { name: "jev-preview" }] });
    }
    return Response.json({
      data: [
        {
          id: "typesafe/jev-latest",
          name: "Jev",
          architecture: { output_modalities: ["decisions"] },
        },
      ],
    });
  }) as typeof fetch;
  try {
    const response = await handleSystemOneModels();
    assert.equal(response.status, 200);
    const ids = (await response.json()).data.map((row: { id: string }) => row.id);
    assert.ok(ids.includes("typesafe/jev-latest"));
    assert.ok(!ids.includes("typesafe/jev-preview"), "a locked model is not listed");
    assert.equal(urls.filter((url) => url.includes("openrouter.ai")).length, 1);
    const after = await providers.getProviderConnections({});
    for (const row of after as Array<{ id: string; lastUsedAt?: string }>) {
      assert.equal(row.lastUsedAt ?? null, before.get(row.id) ?? null, `lastUsedAt of ${row.id}`);
    }
  } finally {
    clearModelLock("typesafe", nativeId, "jev-preview");
  }
});

test("catalog caps rows per backend", async () => {
  globalThis.fetch = (async (input) =>
    String(input).includes("api.typesafe.ai")
      ? Response.json({
          models: Array.from({ length: 1500 }, (_, index) => ({ name: `jev-${index}` })),
        })
      : Response.json({ data: [] })) as typeof fetch;
  const response = await handleSystemOneModels();
  const rows = (await response.json()).data.filter((row: { id: string }) =>
    row.id.startsWith("typesafe/")
  );
  assert.ok(rows.length <= 1000, `listed ${rows.length}`);
});

test("chat guard reuses resolved model metadata without rescanning the synced catalog", async () => {
  let reads = 0;
  const readModels = async () => {
    reads++;
    return [];
  };
  assert.equal(
    (
      await decisionOnlyChatRejection(
        { provider: "ollama-local", model: "clef-flash", supportedEndpoints: ["systemone"] },
        readModels
      )
    )?.status,
    400
  );
  assert.equal(
    await decisionOnlyChatRejection(
      { provider: "ollama-local", model: "chat-model", supportedEndpoints: ["chat"] },
      readModels
    ),
    null
  );
  // Hot path for every other provider never touches the DB.
  assert.equal(
    await decisionOnlyChatRejection({ provider: "openai", model: "gpt-x" }, readModels),
    null
  );
  assert.equal(reads, 0);
});

test("a local selection marker never dispatches to the default Ollama host", async () => {
  const otherLocal = String(
    (
      await providers.createProviderConnection({
        provider: "ollama-local",
        name: "Expired local",
        isActive: true,
        testStatus: "expired",
        providerSpecificData: { baseUrl: "http://127.0.0.1:33434/v1" },
      })
    ).id
  );
  await providers.updateProviderConnection(localId, { testStatus: "banned" });
  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    return Response.json({ model: "clef-flash", answers });
  }) as typeof fetch;
  try {
    const response = await POST(post({ ...body, model: "ollama-local/clef-flash" }));
    assert.notEqual(response.status, 200);
    assert.equal(calls, 0);
    const direct = await handleSystemOneProxy({
      body: { ...body, model: "clef-flash" },
      provider: "ollama-local",
      credentials: { leaseFenceStale: true } as never,
    });
    assert.equal(direct.status, 401);
    assert.equal(calls, 0);
  } finally {
    await providers.updateProviderConnection(localId, { testStatus: "active" });
    await providers.updateProviderConnection(otherLocal, { isActive: false });
  }
});

test("an invalid 200 body is logged as a failed call", async () => {
  globalThis.fetch = (async () =>
    Response.json({ model: "jev-logged", answers: [] })) as typeof fetch;
  const response = await handleSystemOneProxy({
    body: { ...body, model: "jev-logged" },
    provider: "typesafe",
    credentials: { apiKey: "test" },
  });
  assert.equal(response.status, 502);
  const rows = await getCallLogs({ model: "jev-logged" });
  const row = rows.find((entry: { path?: string }) => entry.path === "/v1/systemone");
  assert.ok(row, "the failure is logged");
  assert.equal(row.status, 502);
});

test("the native catalog lists the operator price override instead of the published rate", async () => {
  globalThis.fetch = (async (input) =>
    String(input).includes("api.typesafe.ai")
      ? Response.json({ models: [{ name: "jev-latest" }, { name: "jev-1.13" }] })
      : Response.json({ data: [] })) as typeof fetch;
  await settings.updatePricing({ typesafe: { "jev-latest": { input: 2, output: 1 } } });
  try {
    const rows = (await (await handleSystemOneModels()).json()).data as Array<{
      id: string;
      pricing?: { prompt: string; completion: string };
      pricing_source?: string;
    }>;
    const overridden = rows.find((row) => row.id === "typesafe/jev-latest");
    assert.deepEqual(overridden?.pricing, { prompt: "0.000002", completion: "0.000001" });
    assert.equal(overridden?.pricing_source, "operator");
    const published = rows.find((row) => row.id === "typesafe/jev-1.13");
    assert.equal(published?.pricing?.prompt, "0.000000042");
    // Billing honours the same override.
    const cost = await systemOneCost("typesafe", "jev-latest", {
      input_tokens: 1000,
      output_tokens: 1000,
      cost: 99,
    });
    assert.ok(cost !== null && Math.abs(cost - 0.003) < 1e-12);
  } finally {
    await settings.resetPricing("typesafe", "jev-latest");
  }
});
