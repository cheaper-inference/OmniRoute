import assert from "node:assert/strict";
import test from "node:test";

import {
  EMBEDDING_PROVIDERS,
  parseEmbeddingModel,
} from "../../open-sse/config/embeddingRegistry.ts";
import {
  AUDIO_TRANSCRIPTION_PROVIDERS,
  parseTranscriptionModel,
} from "../../open-sse/config/audioRegistry.ts";
import { IMAGE_PROVIDERS } from "../../open-sse/config/imageRegistryData.ts";
import { RERANK_PROVIDERS, parseRerankModel } from "../../open-sse/config/rerankRegistry.ts";
import { getRegistryMediaKinds } from "../../open-sse/config/mediaServiceKinds.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import {
  LUNAROUTE_SYSTEM_ONE_MODELS,
  LUNAROUTE_SYSTEM_ONE_URL,
  getAllSystemOneModels,
  resolveSystemOneTarget,
} from "../../open-sse/config/systemOneRegistry.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers.ts";

const CHAT_MODELS = [
  "deepseek-4.1-flash",
  "deepseek-4.1-flash-background",
  "glm-5.3-flash",
  "glm-5.3-flash-background",
  "muse-spark-open",
  "muse-spark-open-background",
];

const EMBEDDING_MODELS = ["emb-granite", "emb-nomic-code", "emb-nomic-moe", "emb-qwen3"];

const IMAGE_MODELS = ["flux2-klein", "qwen-image-2.1", "qwen-image-2512", "qwen-image-edit-2511"];

const RERANK_MODELS = ["bge-rr-v2-m3"];
const TRANSCRIPTION_MODELS = ["whisper-large-v3"];

test("LunaRoute is a selectable API-key provider with dynamically derived media kinds", () => {
  const provider = APIKEY_PROVIDERS.lunaroute;
  assert.ok(provider);
  assert.equal(provider.name, "LunaRoute");
  assert.equal(provider.alias, "lr");
  assert.deepEqual(provider.serviceKinds, ["llm"]);
  assert.deepEqual(getRegistryMediaKinds("lunaroute").sort(), ["embedding", "image", "stt"]);
  assert.match(provider.apiHint ?? "", /\/embeddings\/models/);
  assert.match(provider.apiHint ?? "", /\/rerank\/models/);
  assert.match(provider.apiHint ?? "", /\/audio\/transcriptions\/models/);
  assert.match(provider.apiHint ?? "", /\/images\/models/);
});

test("LunaRoute registers every current chat model and every documented text protocol", () => {
  const provider = REGISTRY.lunaroute;
  assert.ok(provider);
  assert.equal(provider.baseUrl, "https://gw.lunaroute.com/v1/chat/completions");
  assert.equal(provider.modelsUrl, "https://gw.lunaroute.com/v1/models");
  assert.equal(provider.responsesBaseUrl, "https://gw.lunaroute.com/v1/responses");
  assert.equal(provider.authType, "apikey");
  assert.equal(provider.authHeader, "bearer");
  assert.equal(provider.passthroughModels, true);
  assert.deepEqual(
    provider.models.map((model) => model.id),
    CHAT_MODELS
  );

  const anthropic = provider.alternateFormats?.find((entry) => entry.format === "claude");
  assert.ok(anthropic);
  assert.equal(anthropic.baseUrl, "https://gw.lunaroute.com/v1/messages");
  assert.equal(anthropic.authHeader, "x-api-key");
});

test("LunaRoute registers the complete current embeddings surface", () => {
  const provider = EMBEDDING_PROVIDERS.lunaroute;
  assert.ok(provider);
  assert.equal(provider.baseUrl, "https://gw.lunaroute.com/v1/embeddings");
  assert.equal(provider.authType, "apikey");
  assert.equal(provider.authHeader, "bearer");
  assert.deepEqual(
    provider.models.map((model) => model.id),
    EMBEDDING_MODELS
  );
  assert.deepEqual(parseEmbeddingModel("lr/emb-qwen3"), {
    provider: "lunaroute",
    model: "emb-qwen3",
  });
});

test("LunaRoute registers the current rerank surface and short alias", () => {
  const provider = RERANK_PROVIDERS.lunaroute;
  assert.ok(provider);
  assert.equal(provider.baseUrl, "https://gw.lunaroute.com/v1/rerank");
  assert.equal(provider.authHeader, "bearer");
  assert.deepEqual(
    provider.models.map((model) => model.id),
    RERANK_MODELS
  );
  assert.deepEqual(parseRerankModel("lr/bge-rr-v2-m3"), {
    provider: "lunaroute",
    model: "bge-rr-v2-m3",
  });
});

test("LunaRoute registers the current transcription surface and short alias", () => {
  const provider = AUDIO_TRANSCRIPTION_PROVIDERS.lunaroute;
  assert.ok(provider);
  assert.equal(provider.baseUrl, "https://gw.lunaroute.com/v1/audio/transcriptions");
  assert.equal(provider.authHeader, "bearer");
  assert.deepEqual(
    provider.models.map((model) => model.id),
    TRANSCRIPTION_MODELS
  );
  assert.deepEqual(parseTranscriptionModel("lr/whisper-large-v3"), {
    provider: "lunaroute",
    model: "whisper-large-v3",
  });
});

test("LunaRoute registers the complete current image-generation surface", () => {
  const provider = IMAGE_PROVIDERS.lunaroute;
  assert.ok(provider);
  assert.equal(provider.baseUrl, "https://gw.lunaroute.com/v1/images/generations");
  assert.equal(provider.authType, "apikey");
  assert.equal(provider.authHeader, "bearer");
  assert.equal(provider.format, "openai");
  assert.deepEqual(
    provider.models.map((model) => model.id),
    IMAGE_MODELS
  );
});

test("LunaRoute registers and resolves every current System One model", () => {
  assert.deepEqual(
    LUNAROUTE_SYSTEM_ONE_MODELS.map((model) => model.id),
    ["clef-flash", "djev"]
  );
  assert.deepEqual(
    getAllSystemOneModels().map((model) => model.id),
    ["lunaroute/clef-flash", "lunaroute/djev"]
  );

  for (const model of LUNAROUTE_SYSTEM_ONE_MODELS) {
    const target = resolveSystemOneTarget(`lunaroute/${model.id}`);
    assert.equal(target?.backend, "lunaroute");
    assert.equal(target?.provider, "lunaroute");
    assert.equal(target?.upstreamModel, model.id);
    assert.equal(target?.upstreamUrl, LUNAROUTE_SYSTEM_ONE_URL);
  }
  assert.equal(resolveSystemOneTarget("lunaroute/unknown"), null);
  assert.equal(resolveSystemOneTarget("lunaroute/"), null);
});
