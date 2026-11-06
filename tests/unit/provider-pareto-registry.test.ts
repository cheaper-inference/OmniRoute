import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { isNamedOpenAIStyleProvider } = await import(
  "../../src/app/api/providers/[id]/models/discovery/providerSets.ts"
);

const PARETO_CHAT_URL = "https://api.paretoinference.com/v1/chat/completions";
const PARETO_MODELS_URL = "https://api.paretoinference.com/v1/models";
const PARETO_MODEL_IDS = [
  "z-ai/glm-5.3-flash",
  "deepseek/deepseek-v4.1-flash",
  "xiaomi/mimo-v2.6-flash",
];

test("pareto is registered as an API-key inference host in the UI catalog", () => {
  const entry = APIKEY_PROVIDERS.pareto;
  assert.ok(entry, "APIKEY_PROVIDERS.pareto must be defined");
  assert.equal(entry.id, "pareto");
  assert.equal(entry.alias, "pareto");
  assert.equal(entry.name, "Pareto Inference");
  assert.equal(entry.website, "https://paretoinference.com");
  assert.deepEqual(entry.serviceKinds, ["llm"]);
  assert.notEqual(
    (entry as Record<string, unknown>).hasFree,
    true,
    "no free-tier claim for a prepaid provider"
  );
});

test("pareto registry entry is OpenAI format, bearer auth and streaming-only", () => {
  const entry = providerRegistry.pareto;
  assert.ok(entry, "providerRegistry.pareto must be defined");
  assert.equal(entry.id, "pareto");
  assert.equal(entry.alias, "pareto");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, PARETO_CHAT_URL);
  assert.equal(entry.modelsUrl, PARETO_MODELS_URL);
  assert.equal(entry.forceStream, true, "Pareto refuses non-streamed requests with 400");
});

test("pareto seeds its three public models with 1M context and 131,072 output", () => {
  const models = providerRegistry.pareto.models;
  assert.deepEqual(
    models.map((m: { id: string }) => m.id),
    PARETO_MODEL_IDS
  );
  for (const model of models) {
    assert.equal(model.contextLength, 1_000_000, `${model.id} context`);
    assert.equal(model.maxOutputTokens, 131_072, `${model.id} output cap`);
    assert.equal(model.toolCalling, true, `${model.id} tools`);
    assert.equal(model.supportsReasoning, true, `${model.id} reasoning`);
    assert.equal(model.interleavedField, "reasoning_content", `${model.id} reasoning field`);
    assert.equal(isValidModel("pareto", model.id), true, `${model.id} must be routable`);
  }
});

test("pareto default executor targets the Pareto chat completions endpoint", async () => {
  assert.ok((await getExecutor("pareto")) instanceof DefaultExecutor);
  assert.equal(new DefaultExecutor("pareto").buildUrl("z-ai/glm-5.3-flash", true), PARETO_CHAT_URL);
  assert.equal(
    new DefaultExecutor("pareto").buildUrl("z-ai/glm-5.3-flash", false),
    PARETO_CHAT_URL
  );
});

test("pareto model import reads the live /v1/models catalog", () => {
  assert.equal(isNamedOpenAIStyleProvider("pareto"), true);
});
