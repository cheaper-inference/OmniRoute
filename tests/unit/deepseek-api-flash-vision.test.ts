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
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = !process.env.DATA_DIR
  ? fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-deepseek-test-"))
  : null;
if (testDataDir) {
  process.env.DATA_DIR = testDataDir;
}

const { ensureDbInitialized, resetDbInstance } = await import("../../src/lib/db/core.ts");
await ensureDbInitialized();

test.after(() => {
  if (testDataDir) {
    try {
      resetDbInstance();
      fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {}
  }
});

const { deepseekProvider } =
  await import("../../open-sse/config/providers/registry/deepseek/index.ts");
const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { isVisionModelId } = await import("../../src/shared/constants/visionModels.ts");
const { resolveCanonicalProviderModel } =
  await import("../../open-sse/services/modelCanonicalization.ts");
const { filterTargetsByRequestCompatibility } =
  await import("../../open-sse/services/combo/comboStructure.ts");

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
  const flashRow = findRow(deepseekProvider.models, "deepseek-flash");
  assert.ok(flashRow?.aliases?.includes("deepseek-v4.1-flash"));
  assert.ok(flashRow?.aliases?.includes("deepseek-4.1-flash"));
});

test("deepseek registry lookup exposes the vision flag", () => {
  const models = getRegistryEntry("deepseek")?.models;
  for (const id of ["deepseek-flash", "deepseek-v4-flash"]) {
    assert.equal(findRow(models, id)?.supportsVision, true, `${id} via getRegistryEntry`);
  }
  for (const alias of ["deepseek-v4.1-flash", "deepseek-4.1-flash"]) {
    const entry = (models as Row[] | undefined)?.find(
      (m) => m.id === alias || (m.aliases as string[] | undefined)?.includes(alias)
    );
    assert.ok(entry, `${alias} must resolve via deepseek registry entry`);
    assert.equal(entry.supportsVision, true, `${alias} must declare supportsVision`);
  }
});

test("deepseek-v4-pro stays text-only", () => {
  const row = findRow(deepseekProvider.models, "deepseek-v4-pro");
  assert.ok(row, "deepseek-v4-pro must still be registered");
  assert.notEqual(row.supportsVision, true);
  assert.notEqual(getResolvedModelCapabilities("deepseek/deepseek-v4-pro").supportsVision, true);
});

test("resolved capabilities: vision on the deepseek Flash ids and aliases", () => {
  for (const modelId of [
    "deepseek/deepseek-flash",
    "deepseek/deepseek-v4-flash",
    "deepseek/deepseek-v4.1-flash",
    "deepseek/deepseek-4.1-flash",
    "ds/deepseek-flash",
    "ds/deepseek-v4.1-flash",
    "ds/deepseek-4.1-flash",
  ]) {
    assert.equal(
      getResolvedModelCapabilities(modelId).supportsVision,
      true,
      `${modelId} must resolve supportsVision: true`
    );
  }

  for (const input of [
    { provider: "deepseek", model: "deepseek-flash" },
    { provider: "deepseek", model: "deepseek-v4.1-flash" },
    { provider: "deepseek", model: "deepseek-4.1-flash" },
    { provider: "ds", model: "deepseek-4.1-flash" },
  ]) {
    assert.equal(
      getResolvedModelCapabilities(input).supportsVision,
      true,
      `${JSON.stringify(input)} must resolve supportsVision: true`
    );
  }
});

test("deepseek model canonicalization maps flash aliases to deepseek-flash", () => {
  assert.deepEqual(resolveCanonicalProviderModel("deepseek", "deepseek-v4.1-flash"), {
    provider: "deepseek",
    model: "deepseek-flash",
  });
  assert.deepEqual(resolveCanonicalProviderModel("deepseek", "deepseek-4.1-flash"), {
    provider: "deepseek",
    model: "deepseek-flash",
  });
  assert.deepEqual(resolveCanonicalProviderModel("ds", "deepseek-4.1-flash"), {
    provider: "deepseek",
    model: "deepseek-flash",
  });
});

const target = (modelStr: string, providerId?: string) => ({
  kind: "model" as const,
  stepId: modelStr,
  executionKey: modelStr,
  modelStr,
  provider: modelStr.split("/")[0],
  providerId: providerId || modelStr.split("/")[0],
  connectionId: null,
  weight: 1,
  label: null,
});
const noopLog = { info() {}, warn() {}, error() {}, debug() {} };
const imageBody = {
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "What is in this image?" },
        { type: "image_url", image_url: { url: "data:image/png;base64,iVBORw0KGgo=" } },
      ],
    },
  ],
};

test("#17180 image request keeps deepseek flash targets in the combo pool", () => {
  const kept = filterTargetsByRequestCompatibility(
    [
      target("deepseek/deepseek-4.1-flash"),
      target("deepseek/deepseek-v4.1-flash"),
      target("deepseek/deepseek-flash"),
      target("deepseek/deepseek-v4-pro"),
      target("groq/llama-3.1-8b-instant"),
    ],
    imageBody,
    noopLog
  ).map((t) => t.modelStr);

  // #17289 (tip): unknown-vision targets are no longer dropped from an image
  // request; they trail the confirmed-vision tier as last-resort fallbacks.
  // The Flash ids/aliases must form that confirmed tier, in their original order.
  for (const fallback of ["deepseek/deepseek-v4-pro", "groq/llama-3.1-8b-instant"]) {
    assert.equal(
      getResolvedModelCapabilities(fallback).supportsVision,
      null,
      `${fallback} is an unknown-vision fallback, not a confirmed one`
    );
  }
  assert.deepEqual(
    kept,
    [
      "deepseek/deepseek-4.1-flash",
      "deepseek/deepseek-v4.1-flash",
      "deepseek/deepseek-flash",
      "deepseek/deepseek-v4-pro",
      "groq/llama-3.1-8b-instant",
    ],
    "the deepseek Flash ids and aliases must be the confirmed-vision tier, ahead of unknown fallbacks"
  );
});

test("the id heuristic gets no generic deepseek fragment", () => {
  assert.equal(isVisionModelId("deepseek-v4-pro"), false);
  assert.equal(isVisionModelId("deepseek-flash"), false);
});
