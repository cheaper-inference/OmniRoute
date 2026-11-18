import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omni-cfp-vision-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { enrichCatalogModelEntry } = await import("../../src/lib/modelMetadataRegistry.ts");
const { filterTargetsByRequestCompatibility } = await import("../../open-sse/services/combo.ts");
const { buildAutoCandidateFilter } =
  await import("../../open-sse/services/autoCombo/suffixComposition.ts");
const { isVisionModelId } = await import("../../src/shared/constants/visionModels.ts");

test.after(() => {
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const model = "moonshotai/kimi-k2.7-code";
const noopLog = { info() {}, warn() {}, error() {}, debug() {} };
const target = (provider: string) => ({
  kind: "model" as const,
  stepId: provider,
  executionKey: provider,
  modelStr: `${provider}/${model}`,
  provider,
  providerId: provider,
  connectionId: null,
  weight: 1,
  label: null,
});

for (const provider of ["cloudflare-playground", "cfp"]) {
  test(`${provider}: transport capabilities override the underlying vision model`, () => {
    const caps = getResolvedModelCapabilities({ provider, model });
    assert.equal(caps.supportsVision, false);
    assert.equal(caps.supportsAudio, false);
    assert.equal(caps.supportsVideo, false);
    assert.equal(caps.attachment, false);
    assert.deepEqual(caps.modalitiesInput, ["text"]);
    assert.deepEqual(caps.modalitiesOutput, ["text"]);
    assert.equal(isVisionModelId(`${provider}/${model}`), false);
  });

  test(`${provider}: images in conversation history exclude the text-only target`, () => {
    for (const image of [
      { type: "image_url", image_url: { url: "data:image/png;base64,fixture" } },
      { type: "input_image", image_url: "https://example.com/image.png" },
      { type: "image", source: { type: "base64", media_type: "image/png", data: "fixture" } },
    ]) {
      const body = {
        messages: [
          { role: "user", content: [image] },
          { role: "user", content: "continue" },
        ],
      };
      assert.deepEqual(filterTargetsByRequestCompatibility([target(provider)], body, noopLog), []);
    }
    const body = {
      input: [
        {
          role: "user",
          content: [{ type: "input_image", image_url: "https://example.com/image.png" }],
        },
      ],
    };
    assert.deepEqual(filterTargetsByRequestCompatibility([target(provider)], body, noopLog), []);
  });

  test(`${provider}: vision Auto pools cannot resurrect the target from a model-name heuristic`, () => {
    for (const category of ["vision", "multimodal"] as const) {
      const filter = buildAutoCandidateFilter(category)!;
      for (const resolvedSupportsVision of [undefined, false, true]) {
        assert.equal(filter({ provider, model, resolvedSupportsVision }), false);
      }
    }
  });

  test(`${provider}: catalog enrichment corrects stale image capability declarations`, () => {
    const entry = enrichCatalogModelEntry({
      id: `${provider}/${model}`,
      root: model,
      owned_by: provider,
      capabilities: { vision: true, attachment: true },
      input_modalities: ["text", "image"],
      output_modalities: ["text"],
    });
    assert.equal(entry.capabilities.vision, false);
    assert.equal(entry.capabilities.attachment, false);
    assert.deepEqual(entry.input_modalities, ["text"]);
  });
}

test("text-only Cloudflare requests remain eligible and real Kimi vision routes retain images", () => {
  const textBody = { messages: [{ role: "user", content: "hello" }] };
  assert.equal(filterTargetsByRequestCompatibility([target("cfp")], textBody, noopLog).length, 1);
  assert.equal(getResolvedModelCapabilities("kimi/kimi-k2.7-code").supportsVision, true);
  assert.equal(isVisionModelId("kimi/kimi-k2.7-code"), true);
  assert.equal(
    buildAutoCandidateFilter("vision")!({
      provider: "kimi",
      model: "kimi-k2.7-code",
      resolvedSupportsVision: true,
    }),
    true
  );
});
