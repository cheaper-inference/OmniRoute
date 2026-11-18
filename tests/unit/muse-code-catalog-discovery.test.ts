import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-muse-code-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const { muse_codeProvider } =
  await import("../../open-sse/config/providers/registry/muse-code/index.ts");
const {
  MUSE_CODE_CATALOG_URL,
  MUSE_CODE_CLIENT_SURFACE,
  MUSE_CODE_MODELS_URL,
  museCodeClientUserAgent,
} = await import("../../open-sse/config/museCode.ts");

const originalFetch = globalThis.fetch;
const KEY = "muse-fixture-key";

const SPARK_EFFORTS = { minimal: {}, low: {}, medium: {}, high: {}, xhigh: {}, max: {} };

function catalogRow(id: string, metadata: Record<string, unknown>) {
  return { id, object: "model", created: 1, owned_by: "meta", metadata: { "muse-code": metadata } };
}

/** `/v1/models` as Meta returns it: ids only. */
const USABLE = {
  object: "list",
  data: ["muse-spark-1.3", "muse-image-1.0", "muse-spark-1.1"].map((id) => ({
    id,
    object: "model",
    created: 0,
    owned_by: "meta",
  })),
};

/** `/muse-code/models` as the Muse Code client reads it: described rows. */
const CATALOG = {
  object: "list",
  data: [
    catalogRow("muse-spark-1.3", {
      name: "muse-spark-1.3",
      is_hidden: false,
      reasoning: true,
      tool_call: true,
      modalities: { input: ["text", "image"], output: ["text"] },
      limit: { context: 1007997, output: 128000 },
      options: { reasoningEffort: "high" },
      variants: SPARK_EFFORTS,
    }),
    catalogRow("muse-image-1.0", {
      name: "Muse Image",
      is_hidden: true,
      reasoning: true,
      tool_call: false,
      modalities: { input: ["text", "image"], output: ["image"] },
    }),
    // Listed by the client but not usable with this key: never surfaced.
    catalogRow("muse-wonder-1.0", { name: "muse-wonder-1.0", is_hidden: false }),
  ],
};

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedMuseConnection(
  providerSpecificData: Record<string, unknown> = {}
): Promise<{ id: string }> {
  return (await providersDb.createProviderConnection({
    provider: "muse-code",
    authType: "apikey",
    name: "muse-fixture",
    apiKey: KEY,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true, ...providerSpecificData },
  })) as { id: string };
}

function stubListings(responses: Record<string, () => Response>, sentHeaders?: Headers[]) {
  const requested: string[] = [];
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    const target = String(url);
    requested.push(target);
    const headers = new Headers(init.headers);
    sentHeaders?.push(headers);
    assert.equal(headers.get("authorization"), `Bearer ${KEY}`, `${target} must carry the key`);
    const respond = responses[target];
    assert.ok(respond, `unexpected discovery request to ${target}`);
    return respond();
  };
  return requested;
}

async function discover(connectionId: string) {
  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models?refresh=true`),
    { params: { id: connectionId } }
  );
  return { response, body: (await response.json()) as Record<string, unknown> };
}

test.beforeEach(resetStorage);

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Muse Code discovery lists what the key can call, described by the client catalog", async () => {
  const connection = await seedMuseConnection();
  const requested = stubListings({
    [MUSE_CODE_MODELS_URL]: () => Response.json(USABLE),
    [MUSE_CODE_CATALOG_URL]: () => Response.json(CATALOG),
  });

  const { response, body } = await discover(connection.id);

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.deepEqual(requested.sort(), [MUSE_CODE_CATALOG_URL, MUSE_CODE_MODELS_URL].sort());

  const synced = await modelsDb.getSyncedAvailableModelsForConnection("muse-code", connection.id);
  const byId = new Map(synced.map((model) => [model.id, model]));
  assert.deepEqual(
    [...byId.keys()].sort(),
    ["muse-image-1.0", "muse-spark-1.1", "muse-spark-1.3"],
    "the routable set is /v1/models, not the client catalog"
  );

  const spark = byId.get("muse-spark-1.3");
  assert.equal(spark?.inputTokenLimit, 1007997);
  assert.equal(spark?.outputTokenLimit, 128000);
  assert.equal(spark?.supportsVision, true);
  assert.equal(spark?.supportsTools, true);
  assert.equal(spark?.supportsThinking, true);
  assert.deepEqual(spark?.supportedThinkingEfforts, [
    "minimal",
    "low",
    "medium",
    "high",
    "xhigh",
    "max",
  ]);
  assert.equal(spark?.defaultThinkingEffort, "high");

  const image = byId.get("muse-image-1.0");
  assert.equal(image?.modelType, "image", "an image-output model never joins the chat catalog");
  assert.equal(image?.visibility, "hide", "the client hides it, so the listing does too");
  assert.equal(image?.name, "Muse Image");

  const retired = byId.get("muse-spark-1.1");
  assert.equal(retired?.inputTokenLimit, undefined, "no catalog row, no invented limits");
});

test("Muse Code discovery keeps every callable model when the client catalog is unavailable", async () => {
  const connection = await seedMuseConnection();
  stubListings({
    [MUSE_CODE_MODELS_URL]: () => Response.json(USABLE),
    [MUSE_CODE_CATALOG_URL]: () => new Response("unavailable", { status: 503 }),
  });

  const { response, body } = await discover(connection.id);

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  const synced = await modelsDb.getSyncedAvailableModelsForConnection("muse-code", connection.id);
  assert.deepEqual(synced.map((model) => model.id).sort(), [
    "muse-image-1.0",
    "muse-spark-1.1",
    "muse-spark-1.3",
  ]);
  assert.ok(synced.every((model) => model.inputTokenLimit === undefined));
});

test("Muse Code discovery reports a failed /v1/models instead of trusting the catalog alone", async () => {
  const connection = await seedMuseConnection();
  stubListings({
    [MUSE_CODE_MODELS_URL]: () => new Response("denied", { status: 401 }),
    [MUSE_CODE_CATALOG_URL]: () => Response.json(CATALOG),
  });

  const { body } = await discover(connection.id);

  assert.notEqual(body.source, "api");
  assert.equal(body.degraded, true);
  assert.equal(body.error, "HTTP 401", "the fallback names why discovery failed");
  const synced = await modelsDb.getSyncedAvailableModelsForConnection("muse-code", connection.id);
  assert.equal(synced.length, 0, "a failed discovery never writes the catalog");
});

for (const [label, payload] of [
  ["no body fields", {}],
  ["a null data field", { data: null }],
] as const) {
  test(`Muse Code discovery treats a /v1/models answer with ${label} as a failure`, async () => {
    const connection = await seedMuseConnection();
    await modelsDb.replaceSyncedAvailableModelsForConnection("muse-code", connection.id, [
      { id: "muse-spark-1.3", name: "muse-spark-1.3", source: "imported" },
    ]);
    stubListings({
      [MUSE_CODE_MODELS_URL]: () => Response.json(payload),
      [MUSE_CODE_CATALOG_URL]: () => Response.json(CATALOG),
    });

    const { body } = await discover(connection.id);

    assert.notEqual(body.source, "api");
    assert.equal(body.degraded, true);
    assert.equal(body.error, "INVALID_RESPONSE");
    const synced = await modelsDb.getSyncedAvailableModelsForConnection("muse-code", connection.id);
    assert.deepEqual(
      synced.map((model) => model.id),
      ["muse-spark-1.3"],
      "a malformed listing never overwrites the stored catalog"
    );
  });
}

test("Muse Code discovery sends the client identity and the connection's custom headers", async () => {
  const connection = await seedMuseConnection({
    customHeaders: { "X-Routing-Hint": "west", "User-Agent": "operator-agent/2" },
  });
  const sent: Headers[] = [];
  stubListings(
    {
      [MUSE_CODE_MODELS_URL]: () => Response.json(USABLE),
      [MUSE_CODE_CATALOG_URL]: () => Response.json(CATALOG),
    },
    sent
  );

  await discover(connection.id);

  assert.equal(sent.length, 2);
  for (const headers of sent) {
    assert.equal(headers.get("x-client-id"), MUSE_CODE_CLIENT_SURFACE);
    assert.equal(headers.get("x-routing-hint"), "west");
    // An operator's User-Agent replaces the default client identity, as on inference.
    assert.equal(headers.get("user-agent"), "operator-agent/2");
    assert.notEqual(headers.get("user-agent"), museCodeClientUserAgent());
  }
});

test("Muse Code seed catalog lists only models Meta serves on the Muse Code API", () => {
  const ids = muse_codeProvider.models.map((model) => model.id);
  assert.deepEqual(
    ids.filter((id) => id.startsWith("llama-")),
    [],
    "the Muse Code key answers model_not_found for every Llama id"
  );
  for (const id of ["muse-wonder-1.0", "muse-wonder-1.0-contributor"]) {
    assert.ok(ids.includes(id), `missing ${id}`);
  }
  const spark = muse_codeProvider.models.find((model) => model.id === "muse-spark-1.3");
  assert.equal(spark?.contextLength, 1007997);
  assert.equal(spark?.maxOutputTokens, 128000);
});
