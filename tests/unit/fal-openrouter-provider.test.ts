import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { getDiscoveryClass } from "../../src/lib/providerModels/discoveryClass.ts";
import { parseModel } from "../../open-sse/services/model.ts";
import { resolveProviderAlias } from "../../open-sse/services/providerAlias.ts";
import {
  assembleProviderModelsHeaders,
  PROVIDER_MODELS_CONFIG,
} from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";

/**
 * fal.ai's OpenRouter router is an OpenAI-compatible gateway with no `/models`
 * endpoint of its own. These tests pin the three integration points that make
 * it a first-class provider instead of a local bridge:
 *
 *   1. the registry entry (+ `fal-openrouter/<id>` prefix routing),
 *   2. the OpenRouter public catalog used for discovery, without leaking the
 *      fal key to openrouter.ai,
 *   3. the chat-probe seed model used by key validation when `/models` 404s.
 */
describe("fal-openrouter provider", () => {
  it("registers fal-openrouter as an OpenAI-compatible provider", () => {
    const entry = REGISTRY["fal-openrouter"];
    assert.ok(entry, "fal-openrouter must be in the registry");
    // No short alias: `fal/` already means the image/media provider and
    // `fal.run` is the domain of every fal endpoint, not just this router.
    assert.equal(entry.alias ?? entry.id, "fal-openrouter");
    assert.equal(entry.format, "openai");
    assert.equal(entry.authType, "apikey");
    assert.equal(entry.baseUrl, "https://fal.run/openrouter/router/openai/v1/chat/completions");
    assert.equal(entry.passthroughModels, true);
  });

  it("keeps a real chat model as the validation probe seed", () => {
    const entry = REGISTRY["fal-openrouter"];
    assert.ok(entry.models.length > 0);
    // validateOpenAILikeProvider sends entry.models[0] as a 1-token chat probe
    // after the /models probe 404s. A placeholder id would fail every key test.
    assert.match(entry.models[0].id, /^[^/]+\/.+/);
  });

  it("routes fal-openrouter/<openrouter-id> to the full upstream model id", () => {
    assert.equal(resolveProviderAlias("fal-openrouter"), "fal-openrouter");

    const parsed = parseModel("fal-openrouter/anthropic/claude-sonnet-5.5");
    assert.equal(parsed.provider, "fal-openrouter");
    // The first slash belongs to the provider prefix; the rest is the model id.
    assert.equal(parsed.model, "anthropic/claude-sonnet-5.5");
  });

  it("discovers the catalog from OpenRouter without sending the fal key", () => {
    const config = PROVIDER_MODELS_CONFIG["fal-openrouter"];
    assert.ok(config, "fal-openrouter needs a discovery config");
    assert.equal(config.url, "https://openrouter.ai/api/v1/models");

    const headers = assembleProviderModelsHeaders(config, "fal-secret-key");
    assert.equal(headers.Authorization, undefined);
    assert.equal(headers.authorization, undefined);
  });

  it("never forwards fal connection custom headers to openrouter.ai", () => {
    const config = PROVIDER_MODELS_CONFIG["fal-openrouter"];
    const headers = assembleProviderModelsHeaders(config, "fal-secret-key", {
      providerSpecificData: {
        customHeaders: { "X-Auth-Token": "fal-routing-secret", "X-Fal-Workspace": "ws_1" },
      },
    });
    assert.deepEqual(Object.keys(headers).sort(), ["Content-Type"]);
    assert.ok(!Object.keys(headers).some((k) => k.toLowerCase() === "x-auth-token"));
  });

  it("classifies fal-openrouter as an openai-compat discovery provider", () => {
    assert.equal(getDiscoveryClass("fal-openrouter"), "openai-compat");
  });

  it("keeps the built-in OpenRouter discovery authenticated and customizable", () => {
    const headers = assembleProviderModelsHeaders(
      PROVIDER_MODELS_CONFIG["openrouter"],
      "openrouter-key",
      { providerSpecificData: { customHeaders: { "X-Title": "omniroute" } } }
    );
    assert.equal(headers.Authorization, "Bearer openrouter-key");
    assert.equal(headers["X-Title"], "omniroute");
  });
});
