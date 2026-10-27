import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, beforeEach, test } from "node:test";
import { SignJWT } from "jose";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-unified-decisions-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "unified-decision-catalog-fixture-only";
process.env.JWT_SECRET = "unified-decision-catalog-jwt-fixture-only";
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const storedModels = await import("../../src/lib/db/models.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const settings = await import("../../src/lib/db/settings.ts");
const { GET } = await import("../../src/app/api/v1/models/route.ts");
const managementRoute = await import("../../src/app/api/models/catalog/route.ts");
const queryRoute = await import("../../src/app/api/v1/models/query/route.ts");
const { getUnifiedModelsResponse, __resetCatalogBuilderRunsForTest } =
  await import("../../src/app/api/v1/models/catalog.ts");
const { normalizeDiscoveredModels } =
  await import("../../src/lib/providerModels/modelDiscovery.ts");
const { classifyModelSupportedEndpoints } =
  await import("../../src/shared/constants/modelSupportedEndpoints.ts");
const { isNonChatCatalogSurface } = await import("../../src/lib/modelCapabilities.ts");

const originalFetch = globalThis.fetch;
let outboundCalls = 0;
let connectionSequence = 0;
globalThis.fetch = async () => {
  outboundCalls++;
  throw new Error("The local decision catalog must not make provider requests");
};

type Row = { id: string; type?: string; supported_endpoints?: string[]; [key: string]: unknown };

beforeEach(async () => {
  keys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  __resetCatalogBuilderRunsForTest();
  outboundCalls = 0;
  await settings.updateSettings({
    requireLogin: true,
    password: "fixture-only",
    requireAuthForModels: true,
  });
});

after(() => {
  globalThis.fetch = originalFetch;
  keys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

async function seed(provider = "openrouter", rows: Array<Record<string, unknown>> = []) {
  const connection = await providers.createProviderConnection({
    provider,
    authType: "apikey",
    name: `Synthetic catalog fixture ${connectionSequence}`,
    apiKey: `fixture-only-${++connectionSequence}`,
    isActive: true,
  });
  await storedModels.replaceSyncedAvailableModelsForConnection(
    provider,
    connection.id,
    normalizeDiscoveredModels(rows, provider)
  );
  return connection;
}

async function key() {
  return keys.createApiKey("Synthetic decision catalog key", "decision-catalog-fixture");
}

function request(secret: string, kind = "decision") {
  return new Request(`http://localhost/v1/models?kind=${kind}`, {
    headers: { Authorization: `Bearer ${secret}` },
  });
}

async function bodyRows(response: Response): Promise<Row[]> {
  assert.equal(response.status, 200, JSON.stringify(await response.clone().json()));
  return (await response.json()).data;
}

const makers = [
  "typesafe",
  "inception",
  "meta",
  "perplexity",
  "liquid",
  "nace-ai",
  "another-maker",
];
const makerRows = makers.map((maker) => ({
  id: `${maker}/decision-fixture`,
  name: `${maker} synthetic decision fixture`,
  architecture: { input_modalities: ["text"], output_modalities: ["decisions"] },
  context_length: 32768,
}));

test("unified decision discovery includes every declared maker with qualified identity and unknown prices", async () => {
  await seed("openrouter", makerRows);
  const caller = await key();
  const rows = await bodyRows(await GET(request(caller.key)));
  assert.deepEqual(
    rows.map((row) => row.id).sort(),
    makerRows.map((row) => `openrouter/${row.id}`).sort()
  );
  for (const row of rows) {
    assert.equal(row.type, "decision");
    assert.deepEqual(row.supported_endpoints, ["systemone"]);
    assert.equal(row.pricing_status, "unknown");
    assert.equal(row.inference_access, "unverified");
    assert.equal(row.native_adapter, "available");
    assert.equal(row.context_length, 32768);
  }
  assert.equal(outboundCalls, 0);
});

for (const alias of ["decision", "decisions", "systemone"]) {
  test(`GET and POST query normalize explicit ${alias} kind without widening scope`, async () => {
    await seed("openrouter", makerRows.slice(0, 2));
    const caller = await key();
    await keys.updateApiKeyPermissions(caller.id, {
      allowedModels: ["openrouter/typesafe/decision-fixture"],
    });
    const getRows = await bodyRows(await GET(request(caller.key, alias)));
    const postRows = await bodyRows(
      await queryRoute.POST(
        new Request("http://localhost/v1/models/query", {
          method: "POST",
          headers: { Authorization: `Bearer ${caller.key}`, "Content-Type": "application/json" },
          body: JSON.stringify({ kind: alias, limit: 1 }),
        })
      )
    );
    assert.deepEqual(
      getRows.map((row) => row.id),
      ["openrouter/typesafe/decision-fixture"]
    );
    assert.deepEqual(
      postRows.map((row) => row.id),
      ["openrouter/typesafe/decision-fixture"]
    );
    assert.equal(outboundCalls, 0);
  });
}

test("decision catalog honors endpoint ACL and connection-scoped inventories", async () => {
  const allowed = await seed("openrouter", makerRows.slice(0, 1));
  await seed("openrouter", makerRows.slice(1, 2));
  const caller = await key();
  await keys.updateApiKeyPermissions(caller.id, {
    allowedConnections: [allowed.id],
    allowedEndpoints: ["systemone"],
  });
  assert.deepEqual(
    (await bodyRows(await GET(request(caller.key)))).map((row) => row.id),
    ["openrouter/typesafe/decision-fixture"]
  );
  await keys.updateApiKeyPermissions(caller.id, { allowedEndpoints: ["chat"] });
  assert.equal((await GET(request(caller.key))).status, 403);
  assert.equal(outboundCalls, 0);
});

test("a read never reveals a blocked provider, blocked model or excluded connection model", async () => {
  const connection = await seed("openrouter", makerRows.slice(0, 2));
  const caller = await key();
  await keys.updateApiKeyPermissions(caller.id, {
    blockedModels: ["openrouter/typesafe/decision-fixture"],
  });
  assert.deepEqual(
    (await bodyRows(await GET(request(caller.key)))).map((row) => row.id),
    ["openrouter/inception/decision-fixture"]
  );
  await providers.updateProviderConnection(connection.id, {
    providerSpecificData: { excludedModels: ["inception/*"] },
  });
  assert.deepEqual(await bodyRows(await GET(request(caller.key))), []);
  await settings.updateSettings({ blockedProviders: ["openrouter"] });
  assert.deepEqual(await bodyRows(await GET(request(caller.key))), []);
  assert.equal(outboundCalls, 0);
});

test("custom native models survive local discovery and mixed chat decisions remain explicitly discoverable", async () => {
  await seed("typesafe", [{ id: "jev-fixture", supportedEndpoints: ["systemone"] }]);
  await storedModels.addCustomModel(
    "typesafe",
    "jev-custom-fixture",
    "Custom synthetic decision",
    "manual",
    "systemone",
    ["systemone"]
  );
  await seed("openrouter", [
    { id: "maker/mixed-fixture", supportedEndpoints: ["chat", "systemone"] },
  ]);
  const caller = await key();
  const rows = await bodyRows(await GET(request(caller.key)));
  assert.deepEqual(rows.map((row) => row.id).sort(), [
    "openrouter/maker/mixed-fixture",
    "typesafe/jev-custom-fixture",
    "typesafe/jev-fixture",
  ]);
  assert.ok(
    rows.every((row) => row.type === "decision" && row.supported_endpoints?.includes("systemone"))
  );
  assert.ok(rows.find((row) => row.id.includes("mixed"))?.supported_endpoints?.includes("chat"));
  assert.equal(outboundCalls, 0);
});

test("normalization and catalog classification preserve decision kind without chat capability invention", () => {
  const rows = normalizeDiscoveredModels(makerRows, "openrouter");
  assert.ok(rows.every((row) => row.modelType === "decision" && row.apiFormat === "systemone"));
  assert.deepEqual(classifyModelSupportedEndpoints(["systemone"]), { type: "decision" });
  assert.deepEqual(classifyModelSupportedEndpoints(["decisions"]), { type: "decision" });
  assert.deepEqual(classifyModelSupportedEndpoints(["chat", "systemone"]), {});
  assert.equal(isNonChatCatalogSurface("decision"), true);
});

test("invalid kinds fail before local catalog work and unauthenticated callers stay unauthorized", async () => {
  const caller = await key();
  assert.equal((await GET(request(caller.key, "made-up-decision-kind"))).status, 400);
  assert.equal((await GET(new Request("http://localhost/v1/models?kind=decision"))).status, 401);
  assert.equal(outboundCalls, 0);
});

test("explicit decisions do not enter the ordinary default chat catalog", async () => {
  await seed("typesafe", [{ id: "jev-fixture", supportedEndpoints: ["systemone"] }]);
  const caller = await key();
  const defaults = await bodyRows(
    await getUnifiedModelsResponse(
      new Request("http://localhost/v1/models", {
        headers: { Authorization: `Bearer ${caller.key}` },
      })
    )
  );
  assert.equal(
    defaults.some((row) => row.id === "typesafe/jev-fixture"),
    false
  );
});

test("management grouping preserves decision metadata and a selected key never becomes broader session scope", async () => {
  await seed("openrouter", makerRows.slice(0, 2));
  const selected = await key();
  await keys.updateApiKeyPermissions(selected.id, {
    allowedModels: ["openrouter/typesafe/decision-fixture"],
  });
  const token = await new SignJWT({ authenticated: true, sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  const headers = { cookie: `auth_token=${token}`, "x-omniroute-playground-key-id": selected.id };
  const response = await managementRoute.GET(
    new Request("http://localhost/api/models/catalog?kind=decision", { headers })
  );
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.deepEqual(
    body.catalog.openrouter.models.map((row: Row) => row.id),
    ["openrouter/typesafe/decision-fixture"]
  );
  const model = body.catalog.openrouter.models[0];
  assert.equal(model.type, "decision");
  assert.equal(model.native_adapter, "available");
  assert.equal(model.inference_access, "unverified");
  assert.equal(model.pricing_status, "unknown");
  assert.deepEqual(model.supported_endpoints, ["systemone"]);
  assert.ok(
    !JSON.stringify(body).includes("fixture-only-"),
    "provider credential values never enter catalog DTOs"
  );
  await keys.deleteApiKey(selected.id);
  assert.equal(
    (
      await managementRoute.GET(
        new Request("http://localhost/api/models/catalog?kind=decision", { headers })
      )
    ).status,
    403
  );
  assert.equal(outboundCalls, 0);
});

test("decision discovery preserves mixed direct OpenAI capability without inferring it for every chat row", async () => {
  await seed("openai", [
    { id: "gpt-6-luna", supportedEndpoints: ["chat", "responses", "systemone"] },
    { id: "gpt-chat-fixture", supportedEndpoints: ["chat", "responses"] },
  ]);
  const caller = await key();
  const rows = await bodyRows(await GET(request(caller.key)));
  assert.deepEqual(
    rows.map((row) => row.id),
    ["openai/gpt-6-luna"]
  );
  assert.deepEqual(rows[0].supported_endpoints, ["chat", "responses", "systemone"]);
  assert.equal(rows[0].type, "decision");
  assert.equal(outboundCalls, 0);
});

test("cancelled native discovery returns no inventory and makes no provider request", async () => {
  await seed("openrouter", makerRows);
  const caller = await key();
  const controller = new AbortController();
  controller.abort();
  const response = await GET(
    new Request("http://localhost/v1/models?kind=decision", {
      headers: { Authorization: `Bearer ${caller.key}` },
      signal: controller.signal,
    })
  );
  assert.equal(response.status, 499);
  assert.equal(outboundCalls, 0);
});

test("native unified inventory keeps the shared catalog CORS and diagnostics headers", async () => {
  await seed("openrouter", makerRows.slice(0, 1));
  const caller = await key();
  const response = await getUnifiedModelsResponse(request(caller.key), {
    "Access-Control-Allow-Origin": "https://synthetic.example",
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), "https://synthetic.example");
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.equal(outboundCalls, 0);
});

test("a native capability does not replace an existing non-chat media identity", () => {
  assert.deepEqual(classifyModelSupportedEndpoints(["embeddings", "systemone"]), {
    type: "embedding",
  });
  assert.deepEqual(classifyModelSupportedEndpoints(["audio-speech", "systemone"]), {
    type: "audio",
    subtype: "speech",
  });
  const rows = normalizeDiscoveredModels(
    [{ id: "mixed-media-fixture", supportedEndpoints: ["embeddings", "systemone"] }],
    "openrouter"
  );
  assert.equal(rows[0].modelType, "embedding");
  assert.equal(rows[0].apiFormat, "embeddings");
});

test("an ordinary OpenRouter connection lists explicit free and paid SKUs without implying free entitlement", async () => {
  await seed("openrouter", [
    { id: "maker/decision-fixture:free", supportedEndpoints: ["systemone"] },
    { id: "maker/decision-fixture", supportedEndpoints: ["systemone"] },
  ]);
  const caller = await key();
  await keys.updateApiKeyPermissions(caller.id, { allowedModels: ["openrouter/maker/*"] });
  const rows = await bodyRows(await GET(request(caller.key)));
  assert.deepEqual(
    rows.map((row) => row.id),
    ["openrouter/maker/decision-fixture", "openrouter/maker/decision-fixture:free"]
  );
  assert.ok(
    rows.every((row) => row.inference_access === "unverified" && row.pricing_status === "unknown")
  );
  assert.ok(rows.every((row) => row.pricing === undefined));
  assert.equal(outboundCalls, 0);
});

test("explicit free-only and paid-only OpenRouter scopes never advertise the opposite SKU", async () => {
  const connection = await seed("openrouter", [
    { id: "maker/decision-fixture:free", supportedEndpoints: ["systemone"] },
    { id: "maker/decision-fixture", supportedEndpoints: ["systemone"] },
  ]);
  const caller = await key();
  await providers.updateProviderConnection(connection.id, {
    providerSpecificData: { systemOneTier: "free" },
  });
  assert.deepEqual(
    (await bodyRows(await GET(request(caller.key)))).map((row) => row.id),
    ["openrouter/maker/decision-fixture:free"]
  );
  await providers.updateProviderConnection(connection.id, {
    providerSpecificData: { systemOneTier: "paid" },
  });
  assert.deepEqual(
    (await bodyRows(await GET(request(caller.key)))).map((row) => row.id),
    ["openrouter/maker/decision-fixture"]
  );
  assert.equal(outboundCalls, 0);
});

test("Zen free native catalog eligibility remains an explicit metadata opt-in", async () => {
  const connection = await seed("opencode-zen", [
    { id: "jev-1.13-free", supportedEndpoints: ["systemone"] },
    { id: "jev-1.13", supportedEndpoints: ["systemone"] },
  ]);
  const caller = await key();
  assert.deepEqual(
    (await bodyRows(await GET(request(caller.key)))).map((row) => row.id),
    ["opencode-zen/jev-1.13"]
  );
  await providers.updateProviderConnection(connection.id, {
    providerSpecificData: { systemOneTier: "free" },
  });
  assert.deepEqual(
    (await bodyRows(await GET(request(caller.key)))).map((row) => row.id),
    ["opencode-zen/jev-1.13-free"]
  );
  assert.equal(outboundCalls, 0);
});

test("closed documented native models are available only in explicit local discovery without provider requests", async () => {
  const { SYSTEMONE_BACKENDS, resolveSystemOneCandidates } =
    await import("../../open-sse/config/systemOneRegistry.ts");
  const closed = Object.entries(SYSTEMONE_BACKENDS).filter(
    ([, backend]) => "documentedModels" in backend || "supportedModels" in backend
  );
  for (const [provider] of closed) await seed(provider);
  await seed("fireworks");
  const caller = await key();
  const rows = await bodyRows(await GET(request(caller.key)));
  assert.deepEqual(
    rows.map((row) => row.id).sort(),
    closed
      .flatMap(([provider, backend]) =>
        ("documentedModels" in backend
          ? backend.documentedModels
          : "supportedModels" in backend
            ? backend.supportedModels
            : []
        ).map((model) => `${provider}/${model}`)
      )
      .sort()
  );
  for (const row of rows) {
    assert.ok(["documented", "registry"].includes(String(row.catalog_source)), String(row.id));
    assert.equal(row.inference_access, "unverified");
    assert.equal(row.pricing_status, "unknown");
    assert.equal(row.context_length, null);
    assert.equal(row.decision_primitives, null);
    assert.equal(row.provider, row.owned_by);
    assert.equal(row.id, `${row.provider}/${row.root}`);
    const target = resolveSystemOneCandidates(row.id);
    assert.equal(target.length, 1);
    assert.equal(target[0].provider, row.provider);
    assert.equal(target[0].model, row.root);
  }
  assert.deepEqual(rows.find((row) => row.id === "openai/gpt-6-luna")?.supported_endpoints, [
    "chat",
    "responses",
    "systemone",
  ]);
  assert.equal(
    rows.some((row) => row.provider === "fireworks"),
    false,
    "no fabricated deployment identity"
  );
  assert.equal(outboundCalls, 0);
});

test("documented seeds honor selected connection and model ACLs, hidden state, and custom metadata overlays", async () => {
  const selected = await seed("liquid");
  await seed("perplexity");
  const caller = await key();
  await keys.updateApiKeyPermissions(caller.id, {
    allowedConnections: [selected.id],
    allowedModels: ["liquid/d1.1"],
  });
  let rows = await bodyRows(await GET(request(caller.key)));
  assert.deepEqual(
    rows.map((row) => row.id),
    ["liquid/d1.1"]
  );
  storedModels.setModelIsHidden("liquid", "d1.1", true);
  assert.deepEqual(await bodyRows(await GET(request(caller.key))), []);
  storedModels.setModelIsHidden("liquid", "d1.1", false);
  await storedModels.addCustomModel(
    "liquid",
    "d1.1",
    "Operator local name",
    "manual",
    "systemone",
    ["systemone"],
    undefined,
    { inputTokenLimit: 8192 }
  );
  rows = await bodyRows(await GET(request(caller.key)));
  assert.equal(rows[0].catalog_source, "custom");
  assert.equal(rows[0].name, "Operator local name");
  assert.equal(rows[0].context_length, 8192);
  assert.equal(outboundCalls, 0);
});
