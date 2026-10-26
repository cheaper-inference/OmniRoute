import test from "node:test";
import assert from "node:assert/strict";
import { PROVIDER_MODELS_CONFIG } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import { ollama_cloudProvider } from "../../open-sse/config/providers/registry/ollama-cloud/index.ts";

const config = PROVIDER_MODELS_CONFIG["ollama-cloud"];

test("Ollama Cloud model discovery uses the hosted Ollama tags endpoint (#16823)", () => {
  assert.equal(config.url, "https://ollama.com/api/tags");
  assert.equal(config.method, "GET");
  assert.equal(config.authHeader, "Authorization");
  assert.equal(config.authPrefix, "Bearer ");
  assert.equal(ollama_cloudProvider.modelsUrl, config.url);
});

test("Ollama Cloud tag response produces callable model ids", () => {
  const models = config.parseResponse({
    models: [
      { name: "deepseek-v4-flash:latest", model: "deepseek-v4-flash:latest", size: 100 },
      { name: "qwen3.5:397b", size: 200 },
    ],
  });
  assert.deepEqual(
    models.map((model: { id: string }) => model.id),
    ["deepseek-v4-flash:latest", "qwen3.5:397b"]
  );
  assert.equal(models[0].size, 100);
  assert.equal(models[1].name, "qwen3.5:397b");
});

test("Ollama Cloud discovery also accepts id-based catalogs and ignores invalid rows", () => {
  const models = config.parseResponse({
    data: [
      { id: "glm-5.1" },
      { model: "kimi-k2.6" },
      { id: "   ", model: "model-fallback:latest", name: "Fallback" },
      { id: 123, model: "other-fallback:latest" },
      { id: " trimmed-id:latest ", name: " Visible model " },
      null,
      {},
      { id: "   " },
    ],
  });
  assert.deepEqual(
    models.map((model: { id: string }) => model.id),
    [
      "glm-5.1",
      "kimi-k2.6",
      "model-fallback:latest",
      "other-fallback:latest",
      "trimmed-id:latest",
    ]
  );
  assert.equal(models[2].name, "Fallback");
  assert.equal(models[4].name, "Visible model");
  assert.deepEqual(config.parseResponse({ models: null }), []);
  assert.deepEqual(config.parseResponse({}), []);
});
