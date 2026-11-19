import { getModelSpec } from "../../src/shared/constants/modelSpecs.ts";
import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { getAllAudioModels, getSpeechProvider } from "../../open-sse/config/audioRegistry.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import {
  createProviderSchema,
  updateProviderConnectionSchema,
} from "../../src/shared/validation/schemas.ts";
import { validateBody } from "../../src/shared/validation/helpers.ts";

const DEPRECATED_MIMO_V2_MODELS = ["mimo-v2-pro", "mimo-v2-omni", "mimo-v2-flash", "mimo-v2-tts"];

test("xiaomi-mimo registry uses the current default base URL and the MiMo V2.6 models", () => {
  const entry = REGISTRY["xiaomi-mimo"];

  assert.ok(entry, "xiaomi-mimo should exist in registry");
  assert.equal(entry.baseUrl, "https://api.xiaomimimo.com/v1");
  for (const modelId of DEPRECATED_MIMO_V2_MODELS) {
    assert.ok(!entry.models.some((model) => model.id === modelId), `${modelId} is deprecated`);
  }
  // Vendor: V2.5 ids retired 2026-10-21; V2.6 pages list 1M context and 128K output.
  assert.deepEqual(
    entry.models.map((model) => model.id),
    ["mimo-v2.6-pro", "mimo-v2.6-flash", "mimo-v2.6-pro-ultraspeed"]
  );
  for (const model of entry.models) {
    assert.equal(model.contextLength, 1048576, `${model.id} context`);
    assert.equal(model.maxOutputTokens, 131072, `${model.id} max output`);
  }
});

test("xiaomi-mimo TTS models are registered in the audio speech registry", () => {
  const provider = getSpeechProvider("xiaomi-mimo");

  assert.ok(provider, "xiaomi-mimo should exist in speech registry");
  assert.equal(provider.id, "xiaomi-mimo");
  assert.equal(provider.authType, "apikey");
  assert.equal(provider.authHeader, "bearer");
  assert.equal(provider.format, "xiaomi-mimo-tts");
  assert.deepEqual(
    provider.models.map((model) => model.id),
    ["mimo-v2.5-tts", "mimo-v2.5-tts-voicedesign", "mimo-v2.5-tts-voiceclone"]
  );
  assert.ok(
    getAllAudioModels().some(
      (model) => model.id === "xiaomi-mimo/mimo-v2.5-tts" && model.subtype === "speech"
    )
  );
});

test("xiaomi-mimo executor appends /chat/completions for regional base URLs", () => {
  const executor = new DefaultExecutor("xiaomi-mimo");

  assert.equal(
    executor.buildUrl("mimo-v2.5-pro", true, 0, {
      providerSpecificData: {
        baseUrl: "https://token-plan-sgp.xiaomimimo.com/v1",
      },
    }),
    "https://token-plan-sgp.xiaomimimo.com/v1/chat/completions"
  );

  assert.equal(
    executor.buildUrl("mimo-v2.5-pro", true, 0, {
      providerSpecificData: {
        baseUrl: "https://token-plan-cn.xiaomimimo.com/v1/chat/completions",
      },
    }),
    "https://token-plan-cn.xiaomimimo.com/v1/chat/completions"
  );
});

test("xiaomi-mimo create schema accepts custom regional baseUrl", () => {
  const validation = validateBody(createProviderSchema, {
    provider: "xiaomi-mimo",
    apiKey: "xm-placeholder-key",
    name: "Xiaomi MiMo SGP",
    providerSpecificData: {
      baseUrl: "https://token-plan-sgp.xiaomimimo.com/v1",
    },
  });

  assert.equal(validation.success, true, "create schema should accept Xiaomi regional baseUrl");
  if (validation.success) {
    assert.equal(
      validation.data.providerSpecificData?.baseUrl,
      "https://token-plan-sgp.xiaomimimo.com/v1"
    );
  }
});

test("xiaomi-mimo update schema accepts custom regional baseUrl", () => {
  const validation = validateBody(updateProviderConnectionSchema, {
    providerSpecificData: {
      baseUrl: "https://token-plan-cn.xiaomimimo.com/v1",
    },
  });

  assert.equal(validation.success, true, "update schema should accept Xiaomi regional baseUrl");
  if (validation.success) {
    assert.equal(
      validation.data.providerSpecificData?.baseUrl,
      "https://token-plan-cn.xiaomimimo.com/v1"
    );
  }
});

test("registered Xiaomi MiMo V2.5 chat models keep capability overrides", () => {
  // models.dev mislabels the *-pro models (hermes-agent#18884); see the hard override in
  // src/lib/modelCapabilities.ts.
  assert.equal(getModelSpec("mimo-v2.5")?.supportsVision, true);
  assert.equal(getModelSpec("mimo-v2.5-pro")?.supportsVision, false);
});
