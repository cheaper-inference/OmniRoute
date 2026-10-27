import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, beforeEach, test } from "node:test";
import { SignJWT } from "jose";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-native-import-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "native-import-fixture-only";
process.env.JWT_SECRET = "native-import-fixture-jwt-only";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const models = await import("../../src/lib/db/models.ts");
const settings = await import("../../src/lib/db/settings.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const discovery = await import("../../src/app/api/providers/[id]/models/route.ts");
const sync = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const { GET: listModels } = await import("../../src/app/api/v1/models/route.ts");
const { getDeclaredModelEndpoints } =
  await import("../../open-sse/services/modelEndpointPolicy.ts");

const originalFetch = globalThis.fetch;
const requests: Array<{ url: string; method: string }> = [];
let upstreamStatus = 200;
let upstreamModels: Array<Record<string, unknown>> = [];
globalThis.fetch = async (input, init) => {
  const url = String(input instanceof Request ? input.url : input);
  const method = init?.method ?? "GET";
  requests.push({ url, method });
  assert.equal(method, "GET", "discovery must never perform native decision inference");
  assert.equal(url, "https://openrouter.ai/api/v1/models?output_modalities=decisions");
  return Response.json(
    upstreamStatus === 200
      ? { data: upstreamModels }
      : {
          error: { message: "Synthetic metadata service failure", type: "fixture_error" },
        },
    { status: upstreamStatus }
  );
};

beforeEach(async () => {
  keys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  requests.length = 0;
  upstreamStatus = 200;
  upstreamModels = [
    {
      id: "inception/decision-fixture",
      name: "Synthetic maker fixture",
      context_length: 32768,
      architecture: { input_modalities: ["text", "image"], output_modalities: ["decisions"] },
      decision_primitives: ["choice"],
      pricing: { prompt: "0.000000042", completion: "0" },
    },
  ];
  await settings.updateSettings({
    requireLogin: true,
    password: "synthetic-only",
    requireAuthForModels: true,
  });
});

after(() => {
  globalThis.fetch = originalFetch;
  keys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

async function cookie() {
  const token = await new SignJWT({ authenticated: true, sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return `auth_token=${token}`;
}

async function connection() {
  return providers.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "Synthetic import fixture",
    apiKey: "fixture-only",
    isActive: true,
  });
}

function providerRequest(id: string, session?: string, method = "GET", signal?: AbortSignal) {
  return new Request(
    `http://localhost/api/providers/${id}/${method === "GET" ? "models" : "sync-models"}?kind=decision`,
    {
      method,
      headers: session ? { cookie: session } : {},
      signal,
    }
  );
}

test("explicit one-connection discovery is read-only and native import makes all makers locally discoverable", async () => {
  const selected = await connection();
  await models.replaceSyncedAvailableModelsForConnection("openrouter", selected.id, [
    {
      id: "maker/chat-fixture",
      name: "Existing chat fixture",
      supportedEndpoints: ["chat"],
      apiFormat: "chat-completions",
    },
  ]);
  const session = await cookie();
  const read = await discovery.GET(providerRequest(selected.id, session), {
    params: { id: selected.id },
  });
  assert.equal(read.status, 200, JSON.stringify(await read.clone().json()));
  const readBody = await read.json();
  assert.equal(readBody.models[0].id, "inception/decision-fixture");
  assert.equal(readBody.models[0].apiFormat, "systemone");
  assert.equal(readBody.models[0].modelType, "decision");
  assert.equal(readBody.inferenceAccess, "unverified");
  assert.deepEqual(
    (await models.getSyncedAvailableModelsForConnection("openrouter", selected.id)).map(
      (row) => row.id
    ),
    ["maker/chat-fixture"]
  );
  assert.equal(requests.length, 1);

  const imported = await sync.POST(providerRequest(selected.id, session, "POST"), {
    params: Promise.resolve({ id: selected.id }),
  });
  assert.equal(imported.status, 200, JSON.stringify(await imported.clone().json()));
  const stored = await models.getSyncedAvailableModelsForConnection("openrouter", selected.id);
  assert.deepEqual(stored.map((row) => row.id).sort(), [
    "inception/decision-fixture",
    "maker/chat-fixture",
  ]);
  const native = stored.find((row) => row.id === "inception/decision-fixture");
  assert.equal(native?.apiFormat, "systemone");
  assert.equal(native?.modelType, "decision");
  assert.deepEqual(native?.supportedEndpoints, ["systemone"]);
  assert.deepEqual(native?.inputModalities, ["text", "image"]);
  assert.deepEqual(native?.outputModalities, ["decisions"]);
  assert.deepEqual(native?.decisionPrimitives, ["choice"]);
  assert.equal(
    requests.length,
    2,
    "one catalog GET per deliberate read/import; no retry or account rotation"
  );

  const caller = await keys.createApiKey("Synthetic local catalog", "native-import-catalog");
  const local = await listModels(
    new Request("http://localhost/v1/models?kind=decision", {
      headers: { Authorization: `Bearer ${caller.key}` },
    })
  );
  assert.equal(local.status, 200);
  const localBody = await local.json();
  assert.deepEqual(
    localBody.data.map((row: { id: string }) => row.id),
    ["openrouter/inception/decision-fixture"]
  );
  assert.equal(requests.length, 2, "unified local catalog does not contact the provider");
  assert.deepEqual(localBody.data[0].input_modalities, ["text", "image"]);
  assert.deepEqual(localBody.data[0].decision_primitives, ["choice"]);
  assert.equal(localBody.data[0].pricing_status, "known");
  assert.deepEqual(localBody.data[0].pricing, { prompt: "0.000000042", completion: "0" });
  assert.equal(localBody.data[0].pricing_currency, "USD");
  assert.equal(localBody.data[0].pricing_unit, "token");
});

test("failed, cancelled and unauthenticated native discovery/import never replace existing inventories", async () => {
  const selected = await connection();
  const prior = [{ id: "maker/chat-fixture", name: "Keep fixture", supportedEndpoints: ["chat"] }];
  await models.replaceSyncedAvailableModelsForConnection("openrouter", selected.id, prior);
  assert.equal(
    (await discovery.GET(providerRequest(selected.id), { params: { id: selected.id } })).status,
    401
  );
  assert.equal(
    (
      await sync.POST(providerRequest(selected.id, undefined, "POST"), {
        params: Promise.resolve({ id: selected.id }),
      })
    ).status,
    401
  );
  assert.equal(requests.length, 0);
  const session = await cookie();
  upstreamStatus = 403;
  const denied = await sync.POST(providerRequest(selected.id, session, "POST"), {
    params: Promise.resolve({ id: selected.id }),
  });
  assert.equal(denied.status, 502);
  assert.equal(requests.length, 1);
  assert.deepEqual(
    (await models.getSyncedAvailableModelsForConnection("openrouter", selected.id)).map(
      (row) => row.id
    ),
    ["maker/chat-fixture"]
  );
  const controller = new AbortController();
  controller.abort();
  const cancelled = await sync.POST(
    providerRequest(selected.id, session, "POST", controller.signal),
    { params: Promise.resolve({ id: selected.id }) }
  );
  assert.equal(cancelled.status, 499);
  assert.equal(requests.length, 1);
  assert.deepEqual(
    (await models.getSyncedAvailableModelsForConnection("openrouter", selected.id)).map(
      (row) => row.id
    ),
    ["maker/chat-fixture"]
  );
});

test("native-only inventory merge preserves chat wire format and never turns absent capabilities into chat", () => {
  assert.deepEqual(
    sync.mergeNativeDecisionSnapshot(
      [
        { id: "dual-fixture", apiFormat: "responses", supportedEndpoints: ["responses"] },
        { id: "chat-fixture", supportedEndpoints: ["chat"] },
        { id: "old-native", supportedEndpoints: ["systemone"] },
      ],
      [
        { id: "dual-fixture", supportedEndpoints: ["chat", "responses", "systemone"] },
        { id: "native-fixture", supportedEndpoints: ["systemone"] },
      ],
      "openai"
    ),
    [
      {
        id: "dual-fixture",
        apiFormat: "responses",
        supportedEndpoints: ["responses", "chat", "systemone"],
      },
      { id: "chat-fixture", supportedEndpoints: ["chat"] },
      { id: "native-fixture", supportedEndpoints: ["systemone"] },
    ]
  );
});

for (const id of [
  "Cloudflare/clef",
  "Cloudflare/clef-flash",
  "nace-ai/drex-max",
  "nace-ai/drex-v2.0",
]) {
  test(`exact verified DeepInfra native metadata is preserved: ${id}`, () => {
    assert.deepEqual(getDeclaredModelEndpoints({ id }, "deepinfra"), ["systemone"]);
    assert.deepEqual(getDeclaredModelEndpoints({ id: `${id}-unknown` }, "deepinfra"), undefined);
  });
}

test("an empty successful native-only refresh preserves chat and mixed-model ordinary endpoints", async () => {
  const selected = await connection();
  await models.replaceSyncedAvailableModelsForConnection("openrouter", selected.id, [
    { id: "maker/chat-fixture", name: "Chat", supportedEndpoints: ["chat"] },
    {
      id: "maker/mixed-fixture",
      name: "Mixed",
      apiFormat: "responses",
      supportedEndpoints: ["responses", "systemone"],
    },
    {
      id: "maker/native-fixture",
      name: "Native",
      apiFormat: "systemone",
      supportedEndpoints: ["systemone"],
    },
  ]);
  upstreamModels = [];
  const response = await sync.POST(providerRequest(selected.id, await cookie(), "POST"), {
    params: Promise.resolve({ id: selected.id }),
  });
  assert.equal(response.status, 200);
  const snapshot = await models.getSyncedAvailableModelsForConnection("openrouter", selected.id);
  assert.deepEqual(snapshot.map((row) => row.id).sort(), [
    "maker/chat-fixture",
    "maker/mixed-fixture",
  ]);
  assert.deepEqual(snapshot.find((row) => row.id.includes("mixed"))?.supportedEndpoints, [
    "responses",
  ]);
  assert.equal(snapshot.find((row) => row.id.includes("mixed"))?.apiFormat, "responses");
  assert.equal(requests.length, 1);
});

test("native-only import never cleans provider-wide custom models, aliases or another connection", async () => {
  const selected = await connection();
  const other = await providers.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "Other synthetic account",
    apiKey: "other-fixture",
    isActive: true,
  });
  await models.replaceSyncedAvailableModelsForConnection("openrouter", other.id, [
    { id: "maker/other-native", name: "Other account", supportedEndpoints: ["systemone"] },
  ]);
  await models.addCustomModel(
    "openrouter",
    "maker/imported-chat-fixture",
    "Other imported fixture",
    "imported",
    "chat-completions",
    ["chat"]
  );
  const before = await models.getCustomModels("openrouter");
  const aliasesBefore = await models.getModelAliases();
  const result = await sync.POST(providerRequest(selected.id, await cookie(), "POST"), {
    params: Promise.resolve({ id: selected.id }),
  });
  assert.equal(result.status, 200);
  assert.deepEqual(await models.getCustomModels("openrouter"), before);
  assert.deepEqual(await models.getModelAliases(), aliasesBefore);
  assert.deepEqual(
    (await models.getSyncedAvailableModelsForConnection("openrouter", other.id)).map(
      (row) => row.id
    ),
    ["maker/other-native"]
  );
  assert.equal(requests.length, 1);
});

test("an ordinary OpenRouter key reads and imports exact free SKUs without rotating or claiming price knowledge", async () => {
  const selected = await connection();
  upstreamModels = [
    { id: "maker/native-fixture:free", architecture: { output_modalities: ["decisions"] } },
    { id: "maker/native-fixture", architecture: { output_modalities: ["decisions"] } },
  ];
  const session = await cookie();
  const read = await discovery.GET(providerRequest(selected.id, session), {
    params: { id: selected.id },
  });
  assert.equal(read.status, 200);
  const readBody = await read.json();
  assert.deepEqual(readBody.models.map((row: { id: string }) => row.id).sort(), [
    "maker/native-fixture",
    "maker/native-fixture:free",
  ]);
  assert.ok(
    readBody.models.every((row: { pricing_status: string }) => row.pricing_status === "unknown")
  );
  assert.equal(readBody.inferenceAccess, "unverified");
  assert.equal(requests.length, 1);
  assert.equal(
    (
      await sync.POST(providerRequest(selected.id, session, "POST"), {
        params: Promise.resolve({ id: selected.id }),
      })
    ).status,
    200
  );
  assert.deepEqual(
    (await models.getSyncedAvailableModelsForConnection("openrouter", selected.id))
      .map((row) => row.id)
      .sort(),
    ["maker/native-fixture", "maker/native-fixture:free"]
  );
  assert.equal(requests.length, 2);

  await providers.updateProviderConnection(selected.id, {
    providerSpecificData: { systemOneTier: "free" },
  });
  assert.equal(
    (
      await sync.POST(providerRequest(selected.id, session, "POST"), {
        params: Promise.resolve({ id: selected.id }),
      })
    ).status,
    200
  );
  assert.deepEqual(
    (await models.getSyncedAvailableModelsForConnection("openrouter", selected.id)).map(
      (row) => row.id
    ),
    ["maker/native-fixture:free"]
  );
  assert.equal(requests.length, 3);
});

for (const provider of ["kimi-web", "codebuddy-cn", "chatgpt-web", "volcengine-agent-plan"]) {
  test(`unsupported native import rejects before legacy cleanup or console access: ${provider}`, async () => {
    const selected = await providers.createProviderConnection({
      provider,
      authType: "apikey",
      name: "Selected synthetic",
      apiKey: "fixture-only",
      isActive: true,
    });
    const other = await providers.createProviderConnection({
      provider,
      authType: "apikey",
      name: "Other synthetic",
      apiKey: "fixture-other",
      isActive: true,
    });
    await models.replaceSyncedAvailableModelsForConnection(provider, selected.id, [
      { id: "keep-selected", name: "Selected", supportedEndpoints: ["chat"] },
    ]);
    await models.replaceSyncedAvailableModelsForConnection(provider, other.id, [
      { id: "keep-other", name: "Other", supportedEndpoints: ["chat"] },
    ]);
    await models.addCustomModel(provider, "keep-custom", "Custom", "imported", "responses", [
      "responses",
    ]);
    await models.setModelAlias("keep-alias", `${provider}/keep-custom`);
    const before = {
      selected: await models.getSyncedAvailableModelsForConnection(provider, selected.id),
      other: await models.getSyncedAvailableModelsForConnection(provider, other.id),
      custom: await models.getCustomModels(provider),
      aliases: await models.getModelAliases(),
    };
    const session = await cookie();
    const changesBefore = core.getDbInstance().prepare("SELECT total_changes() AS count").get();
    const response = await sync.POST(providerRequest(selected.id, session, "POST"), {
      params: Promise.resolve({ id: selected.id }),
    });
    assert.equal(response.status, 400);
    assert.deepEqual(
      core.getDbInstance().prepare("SELECT total_changes() AS count").get(),
      changesBefore,
      "no durable write, including call logs"
    );
    assert.equal(requests.length, 0, "no metadata or console network request");
    assert.deepEqual(
      {
        selected: await models.getSyncedAvailableModelsForConnection(provider, selected.id),
        other: await models.getSyncedAvailableModelsForConnection(provider, other.id),
        custom: await models.getCustomModels(provider),
        aliases: await models.getModelAliases(),
      },
      before,
      "unsupported native request performs no legacy inventory cleanup"
    );
  });
}

test("actual native-only sync preserves prior explicit responses capability on a colliding model", async () => {
  const selected = await connection();
  await models.replaceSyncedAvailableModelsForConnection("openrouter", selected.id, [
    {
      id: "inception/decision-fixture",
      name: "Dual fixture",
      apiFormat: "responses",
      supportedEndpoints: ["responses"],
      endpointCapabilitySource: "declared",
    },
  ]);
  const result = await sync.POST(providerRequest(selected.id, await cookie(), "POST"), {
    params: Promise.resolve({ id: selected.id }),
  });
  assert.equal(result.status, 200);
  const stored = (await models.getSyncedAvailableModelsForConnection("openrouter", selected.id))[0];
  assert.equal(stored.apiFormat, "responses");
  assert.deepEqual(stored.supportedEndpoints, ["responses", "systemone"]);
  assert.equal(stored.modelType, "chat");
  assert.equal(requests.length, 1);
});

test("defaulted historical chat metadata is not promoted to a proven native mixed capability", () => {
  const result = sync.mergeNativeDecisionSnapshot(
    [
      {
        id: "fixture",
        apiFormat: "chat-completions",
        supportedEndpoints: ["chat"],
        endpointCapabilitySource: "defaulted",
      },
    ],
    [
      {
        id: "fixture",
        apiFormat: "systemone",
        modelType: "decision",
        supportedEndpoints: ["systemone"],
      },
    ],
    "openrouter"
  );
  assert.deepEqual(result[0].supportedEndpoints, ["systemone"]);
  assert.equal(result[0].apiFormat, "systemone");
});
