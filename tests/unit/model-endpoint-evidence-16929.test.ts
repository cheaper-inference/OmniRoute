import test from "node:test";
import assert from "node:assert/strict";
import { normalizeDiscoveredModels } from "../../src/lib/providerModels/modelDiscovery.ts";
import { normalizeSyncedAvailableModels } from "../../src/lib/db/models/synced.ts";
import { parseGeminiModelsList } from "../../src/lib/providerModels/geminiModelsParser.ts";

test("#16929: endpoint provenance survives the synced catalog round trip", () => {
  const unknown = normalizeDiscoveredModels([{ id: "unknown-model" }], "openai");
  const declared = normalizeDiscoveredModels(
    [
      {
        id: "multi",
        supportedEndpoints: ["chat", "embeddings"],
        endpointCapabilitySource: "declared",
      },
    ],
    "gemini"
  );
  const inferred = normalizeDiscoveredModels(
    [{ id: "bge-reranker-large", type: "rerank" }],
    "local"
  );
  // "defaulted" is the absence of a trusted provenance: the row keeps the tip's shape.
  assert.equal("endpointCapabilitySource" in unknown[0], false);
  assert.equal(declared[0].endpointCapabilitySource, "declared");
  assert.equal(inferred[0].endpointCapabilitySource, "inferred");
  const readBack = normalizeSyncedAvailableModels(
    JSON.parse(JSON.stringify([...unknown, ...declared, ...inferred]))
  );
  assert.deepEqual(
    readBack.map((m) => m.endpointCapabilitySource),
    [undefined, "declared", "inferred"]
  );
  assert.deepEqual(readBack[1].supportedEndpoints, ["chat", "embeddings"]);
  assert.deepEqual(readBack[2].supportedEndpoints, ["rerank"]);
});

test("#16929: a bare supportedEndpoints array is not a provider declaration", () => {
  // OpenAI / OpenRouter / Ollama / compatible parsers fill supportedEndpoints from
  // heuristics or fixed defaults. Marking those "declared" would arm the endpoint
  // gate for every such provider on its next sync.
  for (const provider of ["openai", "openrouter", "ollama"]) {
    const rows = normalizeDiscoveredModels(
      [
        { id: "multi", supportedEndpoints: ["chat", "embeddings"] },
        { id: "embed-only", supportedEndpoints: ["embeddings"] },
        { id: "text-embedding-3-small", supportedEndpoints: ["embeddings"] },
      ],
      provider
    );
    for (const row of rows) {
      assert.equal(
        row.endpointCapabilitySource,
        undefined,
        `${provider}/${row.id} must not become a trusted (gating) provenance`
      );
    }
  }
  // An explicit "defaulted" stamp is normalized away (same meaning as absent).
  const defaulted = normalizeDiscoveredModels(
    [{ id: "m", supportedEndpoints: ["chat"], endpointCapabilitySource: "defaulted" }],
    "gemini"
  );
  assert.equal(defaulted[0].endpointCapabilitySource, undefined);
});

test("#16929: Gemini generic generateContent stays defaulted while specialty IDs are inferred", () => {
  const models = parseGeminiModelsList({
    models: [
      { name: "models/gemini-3.8-flash", supportedGenerationMethods: ["generateContent"] },
      { name: "models/gemini-3.5-transcribe", supportedGenerationMethods: ["generateContent"] },
      { name: "models/gemini-3.8-flash-tts", supportedGenerationMethods: ["generateContent"] },
      { name: "models/lyria-realtime-exp", supportedGenerationMethods: ["generateContent"] },
      { name: "models/text-embedding-004", supportedGenerationMethods: ["embedContent"] },
    ],
  });
  assert.deepEqual(
    models.map((m) => m.endpointCapabilitySource),
    ["defaulted", "inferred", "inferred", "inferred", "declared"]
  );
  assert.deepEqual(
    models.map((m) => m.supportedEndpoints),
    [["chat"], ["audio-transcriptions"], ["audio-speech"], ["music"], ["embeddings"]]
  );
  assert.equal(normalizeDiscoveredModels(models, "gemini")[1].endpointCapabilitySource, "inferred");
});
