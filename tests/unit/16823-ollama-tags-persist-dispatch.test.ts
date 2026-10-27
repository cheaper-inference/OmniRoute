import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("16823-ollama-native");
const { handleChat, buildRequest, buildOpenAIResponse, seedConnection } = harness;
const { PROVIDER_MODELS_CONFIG } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts");
const { normalizeDiscoveredModels, persistDiscoveredModels, getCachedDiscoveredModels } =
  await import("../../src/lib/providerModels/modelDiscovery.ts");
const { getActiveSyncedCatalog } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { getModelInfoCore } = await import("../../open-sse/services/model.ts");
const core = await import("../../src/lib/db/core.ts");

// IDs from the anonymous https://ollama.com/api/tags response on 2026-10-20.
// Keep the fixture offline: no provider credential or upstream inference is needed.
const TAG_IDS = [
  "mistral-large-3:675b",
  "gemma4:31b",
  "nemotron-3-super",
  "nemotron-3-ultra",
  "glm-5.3",
  "nemotron-3-nano:30b",
  "minimax-m3.1-flash",
  "muse-spark-open",
  "glm-5.3-flash",
  "kimi-k2.7-code",
  "gpt-oss:20b",
  "minimax-m2.7",
  "clef:27b",
  "beam",
  "kimi-k3",
  "deepseek-v4.1-flash",
  "gpt-oss:120b",
  "glm-5.2",
  "minimax-m3",
  "mistral-large-4",
  "kimi-k2.6",
  "deepseek-v4-pro:0813",
  "deepseek-v4.1-flash:1017",
];
const tags = { models: TAG_IDS.map((id) => ({ name: id, model: id })) };
let connectionId: string;

test.beforeEach(async () => {
  await harness.resetStorage();
  const connection = await seedConnection("ollama-cloud");
  connectionId = connection.id;
  const config = PROVIDER_MODELS_CONFIG["ollama-cloud"];
  assert.equal(config.url, "https://ollama.com/api/tags");
  await persistDiscoveredModels("ollama-cloud", connectionId, config.parseResponse(tags));
});

test.after(() => harness.cleanup());

test("tags parser, normalization and database reopen preserve all 23 native IDs", async () => {
  const parsed = PROVIDER_MODELS_CONFIG["ollama-cloud"].parseResponse(tags);
  assert.deepEqual(
    normalizeDiscoveredModels(parsed, "ollama-cloud").map((m) => m.id),
    TAG_IDS
  );
  core.closeDbInstance();
  const cached = await getCachedDiscoveredModels("ollama-cloud", connectionId);
  assert.deepEqual(cached.map((m) => m.id).sort(), [...TAG_IDS].sort());
  const catalog = await getActiveSyncedCatalog("ollama-cloud");
  assert.equal(catalog.authoritative, true);
  assert.deepEqual(catalog.models.map((m) => m.id).sort(), [...TAG_IDS].sort());
});

async function dispatch(
  address: string
): Promise<{ response: Response; bodies: Record<string, unknown>[] }> {
  const bodies: Record<string, unknown>[] = [];
  globalThis.fetch = async (url, init) => {
    assert.equal(String(url), "https://ollama.com/v1/chat/completions");
    const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
    bodies.push(body);
    return buildOpenAIResponse("pong", String(body.model));
  };
  const response = await handleChat(
    buildRequest({
      body: { model: address, stream: false, messages: [{ role: "user", content: "say pong" }] },
    })
  );
  return { response, bodies };
}

for (const prefix of ["ollama-cloud", "ollamacloud"]) {
  test(`${prefix}/gpt-oss:120b remains available in its fresh persisted catalog`, async () => {
    const info = await getModelInfo(`${prefix}/gpt-oss:120b`);
    assert.equal(info.provider, "ollama-cloud", info.errorMessage);
    assert.equal(info.model, "gpt-oss:120b");
  });

  test(`${prefix}/gpt-oss:120b reaches dispatch with its native colon ID`, async () => {
    const { response, bodies } = await dispatch(`${prefix}/gpt-oss:120b`);
    assert.equal(response.status, 200, await response.text());
    assert.equal(bodies.length, 1);
    assert.equal(bodies[0].model, "gpt-oss:120b");
  });
}

for (const id of ["gpt-oss:20b", "mistral-large-3:675b", "deepseek-v4.1-flash:1017"]) {
  test(`control: discovered ${id} reaches dispatch unchanged`, async () => {
    const { response, bodies } = await dispatch(`ollama-cloud/${id}`);
    assert.equal(response.status, 200, await response.text());
    assert.equal(bodies.length, 1);
    assert.equal(bodies[0].model, id);
  });
}

test("control: disabling cross-proxy compatibility restores native gpt-oss dispatch", async () => {
  const before = process.env.MODEL_ALIAS_COMPAT_ENABLED;
  process.env.MODEL_ALIAS_COMPAT_ENABLED = "false";
  try {
    const { response, bodies } = await dispatch("ollama-cloud/gpt-oss:120b");
    assert.equal(response.status, 200, await response.text());
    assert.equal(bodies[0].model, "gpt-oss:120b");
  } finally {
    if (before === undefined) delete process.env.MODEL_ALIAS_COMPAT_ENABLED;
    else process.env.MODEL_ALIAS_COMPAT_ENABLED = before;
  }
});

test("control: the active catalog still rejects an unavailable native ID before dispatch", async () => {
  const { response, bodies } = await dispatch("ollama-cloud/unavailable-fixture:999b");
  assert.equal(response.status, 400);
  assert.equal(bodies.length, 0);
});

test("control: NVIDIA still requires cross-proxy dialect normalization", async () => {
  const info = await getModelInfoCore("nvidia/gpt-oss:120b", {});
  assert.equal(info.provider, "nvidia");
  assert.equal(info.model, "openai/gpt-oss-120b");
});
