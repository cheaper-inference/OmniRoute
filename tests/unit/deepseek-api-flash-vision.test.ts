/**
 * DeepSeek official API (api.deepseek.com): the Flash ids read images.
 *
 * `deepseek-flash` (V4.1 Flash) and the `deepseek-v4-flash` alias it serves both
 * accept `image_url` parts (DeepSeek "Vision" guide), so the registry must flag
 * them explicitly. Without the flag `/v1/models` does not advertise vision, the
 * vision-aware combo filter skips them for image requests, and the lite
 * compression image-strip replaces the images. `deepseek-v4-pro` stays text-only,
 * which is also why no generic `deepseek` fragment goes into the id heuristic.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { deepseekProvider } =
  await import("../../open-sse/config/providers/registry/deepseek/index.ts");
const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { isVisionModelId } = await import("../../src/shared/constants/visionModels.ts");

type Row = Record<string, unknown> & { id: string };

function findRow(models: readonly unknown[] | undefined, id: string): Row | undefined {
  return (models as Row[] | undefined)?.find((m) => m.id === id);
}

test("deepseek registry flags the Flash ids as vision-capable", () => {
  for (const id of ["deepseek-flash", "deepseek-v4-flash"]) {
    const row = findRow(deepseekProvider.models, id);
    assert.ok(row, `${id} must be in the deepseek static catalog`);
    assert.equal(row.supportsVision, true, `${id} must declare supportsVision: true`);
  }
});

test("deepseek registry lookup exposes the vision flag", () => {
  const models = getRegistryEntry("deepseek")?.models;
  for (const id of ["deepseek-flash", "deepseek-v4-flash"]) {
    assert.equal(findRow(models, id)?.supportsVision, true, `${id} via getRegistryEntry`);
  }
});

test("deepseek-v4-pro stays text-only", () => {
  const row = findRow(deepseekProvider.models, "deepseek-v4-pro");
  assert.ok(row, "deepseek-v4-pro must still be registered");
  assert.notEqual(row.supportsVision, true);
  assert.notEqual(getResolvedModelCapabilities("deepseek/deepseek-v4-pro").supportsVision, true);
});

test("resolved capabilities: vision on the deepseek Flash ids", () => {
  for (const modelId of ["deepseek/deepseek-flash", "deepseek/deepseek-v4-flash"]) {
    assert.equal(
      getResolvedModelCapabilities(modelId).supportsVision,
      true,
      `${modelId} must resolve supportsVision: true`
    );
  }
});

test("the id heuristic gets no generic deepseek fragment", () => {
  assert.equal(isVisionModelId("deepseek-v4-pro"), false);
  assert.equal(isVisionModelId("deepseek-flash"), false);
});
