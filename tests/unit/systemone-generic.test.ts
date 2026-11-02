import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-generic-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "systemone-generic-test-secret";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const models = await import("../../src/lib/db/models.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const { setRateLimiterTestMode } = await import("../../src/shared/utils/rateLimiter.ts");
const { POST } = await import("../../src/app/api/v1/systemone/route.ts");
const { GET } = await import("../../src/app/api/v1/systemone/models/route.ts");
const { handleSystemOneProxy, systemOneCost } =
  await import("../../open-sse/handlers/systemOne.ts");
const { systemOneUrl } = await import("../../open-sse/handlers/systemOneTransport.ts");
const { validateTypeSafeProvider } = await import("../../src/lib/providers/validation/typesafe.ts");
const { decisionOnlyChatRejection } =
  await import("../../src/lib/providerModels/decisionOnlyChatGuard.ts");
const { getModelInfoOrRetirementResponse } = await import("../../src/sse/services/model.ts");
const { applyOllamaShowCapabilities } =
  await import("../../src/lib/providerModels/ollamaCapabilities.ts");
const { applyDecisionModelCapabilities } =
  await import("../../open-sse/handlers/systemOneCatalog.ts");
const { classifyModelSupportedEndpoints } =
  await import("../../src/shared/constants/modelSupportedEndpoints.ts");
const { ProviderSchema } = await import("../../src/shared/validation/providerSchema.ts");
const { getProviderById } = await import("../../src/shared/constants/providers.ts");
const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { normalizeDiscoveredModels } =
  await import("../../src/lib/providerModels/modelDiscovery.ts");
const { getModelLockoutInfo } = await import("../../open-sse/services/accountFallback.ts");
const originalFetch = globalThis.fetch;
setRateLimiterTestMode(true);

const body = {
  model: "typesafe/jev-latest",
  state: "Help!",
  questions: { urgent: { type: "noul" } },
};
const success = {
  model: "jev-latest",
  answers: { urgent: { type: "noul", noul: 0.8 } },
  usage: { input_tokens: 1000, output_tokens: 20 },
};
const orCatalog = {
  data: [
    {
      id: "typesafe/jev-latest",
      name: "Jev",
      architecture: { output_modalities: ["decisions"] },
      pricing: { prompt: "0.000000042", completion: "0" },
    },
  ],
};
let nativeId = "";
let openrouterId = "";
let localId = "";
function post(raw: unknown, key?: string) {
  return new Request("http://localhost/v1/systemone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(key ? { Authorization: `Bearer ${key}` } : {}),
    },
    body: JSON.stringify(raw),
  });
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
  openrouterId = String(
    (
      await providers.createProviderConnection({
        provider: "openrouter",
        name: "Gateway",
        apiKey: "gateway-test-key",
        isActive: true,
      })
    ).id
  );
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
  await models.replaceSyncedAvailableModelsForConnection("ollama-local", localId, [
    { id: "clef-flash", name: "Clef Flash", supportedEndpoints: ["systemone"] },
    { id: "chat-model", name: "Chat", supportedEndpoints: ["chat"] },
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

test("same typed request uses the selected provider's endpoint, model and key", async () => {
  for (const [id, url, upstreamModel, token] of [
    [
      "typesafe/jev-latest",
      "https://api.typesafe.ai/v1/systemone",
      "jev-latest",
      "native-test-key",
    ],
    [
      "openrouter/typesafe/jev-latest",
      "https://openrouter.ai/api/v1/systemone",
      "typesafe/jev-latest",
      "gateway-test-key",
    ],
    ["ollama-local/clef-flash", "http://127.0.0.1:11434/v1/systemone", "clef-flash", null],
    [
      "jev-latest",
      "https://openrouter.ai/api/v1/systemone",
      "typesafe/jev-latest",
      "gateway-test-key",
    ],
  ]) {
    let fetched = false;
    globalThis.fetch = (async (input, init) => {
      fetched = true;
      assert.equal(String(input), url);
      assert.equal(
        new Headers(init?.headers).get("Authorization"),
        token ? `Bearer ${token}` : null
      );
      const sent = JSON.parse(String(init?.body));
      assert.equal(sent.model, upstreamModel);
      assert.deepEqual(sent.provider, { order: ["TypeSafe"] });
      return Response.json({
        ...success,
        model: upstreamModel,
        usage: { ...success.usage, cost: 0 },
      });
    }) as typeof fetch;
    const response = await POST(post({ ...body, model: id, provider: { order: ["TypeSafe"] } }));
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(fetched, true);
  }
});

test("canonical key policy and allowed connection IDs are enforced before dispatch", async () => {
  const key = await keys.createApiKey("Native only", "systemone-generic");
  await keys.updateApiKeyPermissions(key.id, {
    modelAccessMode: "restricted",
    allowedModels: ["typesafe/jev-latest"],
    allowedConnections: [nativeId],
  });
  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    return Response.json(success);
  }) as typeof fetch;
  assert.equal((await POST(post(body, key.key))).status, 200);
  assert.equal(
    (await POST(post({ ...body, model: "openrouter/typesafe/jev-latest" }, key.key))).status,
    403
  );
  assert.equal(calls, 1);
  await keys.updateApiKeyPermissions(key.id, { allowedConnections: [openrouterId] });
  assert.equal((await POST(post(body, key.key))).status, 401);
  assert.equal(calls, 1);
});

test("local decision requests select only a connection whose live catalog has the model", async () => {
  const otherId = String(
    (
      await providers.createProviderConnection({
        provider: "ollama-local",
        name: "Other",
        isActive: true,
        providerSpecificData: { baseUrl: "http://127.0.0.1:22434/v1" },
      })
    ).id
  );
  await models.replaceSyncedAvailableModelsForConnection("ollama-local", otherId, [
    { id: "other-only", name: "Other", supportedEndpoints: ["systemone"] },
  ]);
  const urls: string[] = [];
  globalThis.fetch = (async (input) => {
    urls.push(String(input));
    return Response.json({ ...success, usage: { input_tokens: 1 } });
  }) as typeof fetch;
  assert.equal((await POST(post({ ...body, model: "ollama-local/other-only" }))).status, 200);
  assert.deepEqual(urls, ["http://127.0.0.1:22434/v1/systemone"]);
  await providers.updateProviderConnection(otherId, { isActive: false });
});

test("native catalog uses GET with native auth, list IDs round-trip and connection-local models stay local", async () => {
  const calls: string[] = [];
  globalThis.fetch = (async (input, init) => {
    calls.push(String(input));
    assert.equal(init?.method, "GET");
    if (String(input).includes("api.typesafe.ai")) {
      assert.equal(new Headers(init?.headers).get("Authorization"), "Bearer native-test-key");
      return Response.json({
        models: [
          { name: "jev-latest", description: "Native decision", release_date: "2026-10-01" },
        ],
      });
    }
    assert.equal(new Headers(init?.headers).get("Authorization"), null);
    return Response.json(orCatalog);
  }) as typeof fetch;
  const response = await GET(new Request("http://localhost/v1/systemone/models"));
  assert.equal(response.status, 200);
  const rows = (await response.json()).data;
  assert.deepEqual(
    new Set(rows.map((row: { id: string }) => row.id)),
    new Set(["typesafe/jev-latest", "openrouter/typesafe/jev-latest", "ollama-local/clef-flash"])
  );
  assert.equal(calls.length, 2);
});

test("catalog partial failure keeps healthy configured providers, total outage fails clearly", async () => {
  globalThis.fetch = (async (input) =>
    String(input).includes("typesafe")
      ? new Response(null, { status: 503 })
      : Response.json(orCatalog)) as typeof fetch;
  const response = await GET(new Request("http://localhost/v1/systemone/models"));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("X-OmniRoute-Catalog-Status"), "partial");
  const key = await keys.createApiKey("Native inventory", "systemone-generic-catalog");
  await keys.updateApiKeyPermissions(key.id, { allowedConnections: [nativeId] });
  const outage = await GET(
    new Request("http://localhost/v1/systemone/models", {
      headers: { Authorization: `Bearer ${key.key}` },
    })
  );
  assert.equal(outage.status, 502);
});

test("catalog connection/model restrictions never expose another provider's inventory", async () => {
  const key = await keys.createApiKey("Local inventory", "systemone-generic-local");
  await keys.updateApiKeyPermissions(key.id, {
    allowedConnections: [localId],
    modelAccessMode: "restricted",
    allowedModels: ["ollama-local/clef-flash"],
  });
  globalThis.fetch = (async () => {
    throw new Error("must not fetch other providers");
  }) as typeof fetch;
  const response = await GET(
    new Request("http://localhost/v1/systemone/models", {
      headers: { Authorization: `Bearer ${key.key}` },
    })
  );
  assert.equal(response.status, 200);
  assert.deepEqual(
    (await response.json()).data.map((row: { id: string }) => row.id),
    ["ollama-local/clef-flash"]
  );
});

test("reported zero is known, native token pricing is estimated, missing price is unknown", async () => {
  assert.equal(
    await systemOneCost("openrouter", "missing-model", { input_tokens: 1000, cost: 0 }),
    0
  );
  assert.equal(await systemOneCost("openrouter", "missing-model", { input_tokens: 1000 }), null);
  assert.equal(await systemOneCost("typesafe", "jev-latest", { input_tokens: 1000 }), 0.000042);
  assert.equal(await systemOneCost("typesafe", "unknown-model", { input_tokens: 1000 }), null);
  assert.equal(await systemOneCost("ollama-local", "clef-flash"), 0);
  globalThis.fetch = (async () =>
    Response.json({ ...success, model: "unknown-model" })) as typeof fetch;
  const response = await handleSystemOneProxy({
    body,
    credentials: { apiKey: "test" },
    provider: "typesafe",
  });
  assert.equal(response.headers.get("X-OmniRoute-Cost-Status"), "unknown");
  assert.equal(response.headers.get("X-OmniRoute-Response-Cost"), null);
});

test("native key validation reads catalog, never invokes inference", async () => {
  let called = false;
  const result = await validateTypeSafeProvider({
    apiKey: "test",
    fetchImpl: async (url, init) => {
      called = true;
      assert.equal(url, "https://api.typesafe.ai/v1/models");
      assert.equal(init.method, "GET");
      return Response.json({ models: [{ name: "jev-latest" }] });
    },
  });
  assert.equal(called, true);
  assert.equal(result.valid, true);
  assert.equal(ProviderSchema.safeParse(getProviderById("typesafe")).success, true);
  await assert.rejects(getExecutor("typesafe"), /systemone/);
});

test("decision discovery is typed; decision-only chat rejects while mixed capability stays selectable", async () => {
  const decision = applyOllamaShowCapabilities(
    { id: "clef-flash" },
    { capabilities: ["vision", "decision"] }
  );
  assert.deepEqual(decision.supportedEndpoints, ["systemone"]);
  assert.equal(decision.apiFormat, "systemone");
  assert.equal(normalizeDiscoveredModels([decision], "ollama-local")[0].modelType, "decision");
  assert.deepEqual(classifyModelSupportedEndpoints(decision.supportedEndpoints as string[]), {
    type: "decision",
  });
  assert.equal(
    ((await getModelInfoOrRetirementResponse("ollama-local/clef-flash")) as { error?: Response })
      .error?.status,
    400
  );
  assert.equal(
    await decisionOnlyChatRejection({ provider: "openrouter", model: "mixed" }, async () => [
      { id: "mixed", name: "Mixed", source: "imported", supportedEndpoints: ["chat", "systemone"] },
    ]),
    null
  );
  assert.deepEqual(
    applyDecisionModelCapabilities({ architecture: { output_modalities: ["text", "decisions"] } })
      .supportedEndpoints,
    ["systemone", "chat"]
  );
});

test("missing local model locks only that model; invalid input and caller abort leave the connection healthy", async () => {
  globalThis.fetch = (async () =>
    Response.json({ error: "model missing" }, { status: 404 })) as typeof fetch;
  const missing = await handleSystemOneProxy({
    body: { ...body, model: "missing-clef" },
    provider: "ollama-local",
    credentials: {
      connectionId: localId,
      providerSpecificData: { baseUrl: "http://127.0.0.1:11434/v1" },
    },
  });
  assert.equal(missing.status, 404);
  assert.ok(getModelLockoutInfo("ollama-local", localId, "missing-clef"));
  const before = await providers.getProviderConnections({ provider: "ollama-local" });
  assert.ok(!before[0].rateLimitedUntil);
  globalThis.fetch = (async () =>
    Response.json(
      { detail: { message: "invalid questions at /srv/secret.ts:10 Bearer sk-or-leaked" } },
      { status: 422 }
    )) as typeof fetch;
  const invalid = await handleSystemOneProxy({
    body,
    provider: "typesafe",
    credentials: { connectionId: nativeId, apiKey: "native-test-key" },
  });
  assert.equal(invalid.status, 422);
  assert.ok(!(await invalid.text()).includes("sk-or-leaked"));
  const controller = new AbortController();
  controller.abort();
  globalThis.fetch = (async () => {
    throw controller.signal.reason;
  }) as typeof fetch;
  assert.equal(
    (
      await handleSystemOneProxy({
        body,
        provider: "typesafe",
        credentials: { connectionId: nativeId, apiKey: "native-test-key" },
        signal: controller.signal,
      })
    ).status,
    499
  );
  const after = await providers.getProviderConnections({ provider: "typesafe" });
  assert.ok(!after[0].rateLimitedUntil);
});

test("native absence never falls back to gateway credentials; unconfigured inventory is distinct from outage", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    return Response.json(success);
  }) as typeof fetch;
  await providers.updateProviderConnection(nativeId, { isActive: false });
  assert.notEqual((await POST(post(body))).status, 200);
  assert.equal(calls, 0);
  await providers.updateProviderConnection(openrouterId, { isActive: false });
  await providers.updateProviderConnection(localId, { isActive: false });
  const response = await GET(new Request("http://localhost/v1/systemone/models"));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("X-OmniRoute-Catalog-Status"), "unconfigured");
  assert.deepEqual(await response.json(), { object: "list", data: [] });
  assert.equal(calls, 0);
});

test("configured local URL is guarded, request URLs cannot select an upstream, cloud is rejected", () => {
  assert.throws(
    () =>
      systemOneUrl("ollama-local", {
        providerSpecificData: { baseUrl: "http://169.254.169.254/v1" },
      }),
    /metadata/
  );
  assert.throws(
    () =>
      systemOneUrl("ollama-local", { providerSpecificData: { baseUrl: "https://ollama.com/v1" } }),
    /cloud/
  );
  assert.throws(
    () => systemOneUrl("ollama-local", { providerSpecificData: { baseUrl: "file:///etc/passwd" } }),
    /protocol/
  );
  assert.equal(
    systemOneUrl("typesafe", { providerSpecificData: { baseUrl: "https://evil.test" } }),
    "https://api.typesafe.ai/v1/systemone"
  );
});

test("caller abort and timeout propagate without turning cancellation into an account failure", async () => {
  const controller = new AbortController();
  controller.abort();
  globalThis.fetch = (async (_url, init) => {
    if (init?.signal?.aborted) throw init.signal.reason;
    return new Promise((_resolve, reject) =>
      init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true })
    );
  }) as typeof fetch;
  assert.equal(
    (
      await handleSystemOneProxy({
        body,
        provider: "typesafe",
        credentials: { apiKey: "test" },
        signal: controller.signal,
      })
    ).status,
    499
  );
  const keepAlive = setTimeout(() => {}, 100);
  assert.equal(
    (
      await handleSystemOneProxy({
        body,
        provider: "typesafe",
        credentials: { apiKey: "test" },
        timeoutMs: 5,
      })
    ).status,
    504
  );
  clearTimeout(keepAlive);
});
