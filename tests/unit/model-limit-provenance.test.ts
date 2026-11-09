/**
 * Per-limit capability provenance (`capsSource`): the resolver can report which rule
 * supplied `contextWindow`, `maxInputTokens` and `maxOutputTokens` (persisted override,
 * static authoritative table, models.dev sync, provider registry or static spec), and
 * `GET /api/models?withLimits=1` exposes it. Opt-in only: resolved values never change.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-limit-provenance-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const contextOverridesDb = await import("../../src/lib/db/modelContextOverrides.ts");
const capabilityOverridesDb = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const { AI_MODELS } = await import("../../src/shared/constants/models.ts");
const modelsRoute = await import("../../src/app/api/models/route.ts");

const STEP = "stepfun/step-5-preview";

function syncedRow(limits: {
  limit_context?: number | null;
  limit_input?: number | null;
  limit_output?: number | null;
}) {
  return {
    tool_call: null,
    reasoning: null,
    attachment: null,
    structured_output: null,
    temperature: null,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: limits.limit_context ?? null,
    limit_input: limits.limit_input ?? null,
    limit_output: limits.limit_output ?? null,
    interleaved_field: null,
  };
}

function resetPersistedState() {
  contextOverridesDb.removeModelContextOverride("stepfun", "step-5-preview");
  capabilityOverridesDb.removeModelCapabilityOverride(STEP, "max_input_tokens");
  capabilityOverridesDb.removeModelCapabilityOverride(STEP, "max_output_tokens");
  modelsDevSync.clearModelsDevCapabilities();
}

function withSources(id: string, snapshot?: unknown) {
  return modelCapabilities.getResolvedModelCapabilitiesWithLimitSources(
    id,
    snapshot as Parameters<typeof modelCapabilities.getResolvedModelCapabilities>[2]
  );
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => resetPersistedState());

test("registry-backed limits name the registry row; a persisted context override wins", () => {
  const before = withSources(STEP);
  assert.equal(before.capabilities.contextWindow, 1_024_000);
  assert.equal(before.limitSources.contextWindow, `registry:${STEP}`);

  assert.equal(
    contextOverridesDb.setModelContextOverride("stepfun", "step-5-preview", 1_000_000),
    true
  );
  const after = withSources(STEP);
  assert.equal(after.capabilities.contextWindow, 1_000_000);
  assert.equal(after.limitSources.contextWindow, "override:context");
  // maxInputTokens has no narrower source, so it inherits the context window and its origin.
  assert.equal(after.capabilities.maxInputTokens, 1_000_000);
  assert.equal(after.limitSources.maxInputTokens, "override:context");
});

test("each limit is labelled independently (synced output, registry context)", () => {
  modelsDevSync.saveModelsDevCapabilities({
    stepfun: { "step-5-preview": syncedRow({ limit_output: 45_678 }) },
  });
  const { capabilities, limitSources } = withSources(STEP);
  assert.equal(capabilities.maxOutputTokens, 45_678);
  assert.equal(limitSources.maxOutputTokens, `synced:${STEP}`);
  assert.equal(capabilities.contextWindow, 1_024_000);
  assert.equal(limitSources.contextWindow, `registry:${STEP}`);
});

test("persisted max_input / max_output overrides are labelled as overrides", () => {
  capabilityOverridesDb.setModelCapabilityOverride(STEP, "max_input_tokens", 500_000);
  capabilityOverridesDb.setModelCapabilityOverride(STEP, "max_output_tokens", 32_000);
  const { capabilities, limitSources } = withSources(STEP);
  assert.equal(capabilities.maxInputTokens, 500_000);
  assert.equal(limitSources.maxInputTokens, "override:max_input");
  assert.equal(capabilities.maxOutputTokens, 32_000);
  assert.equal(limitSources.maxOutputTokens, "override:max_output");
});

test("an input cap clamped to the total window reports the window's source", () => {
  capabilityOverridesDb.setModelCapabilityOverride(STEP, "max_input_tokens", 2_000_000);
  const { capabilities, limitSources } = withSources(STEP);
  assert.equal(capabilities.maxInputTokens, 1_024_000);
  assert.equal(limitSources.maxInputTokens, `registry:${STEP}`);
});

test("an unknown model reports `none` and null limits", () => {
  const { capabilities, limitSources } = withSources("unknown-provider/never-seen-model");
  assert.equal(capabilities.contextWindow, null);
  assert.equal(capabilities.maxInputTokens, null);
  assert.equal(capabilities.maxOutputTokens, null);
  assert.deepEqual(limitSources, {
    contextWindow: "none",
    maxInputTokens: "none",
    maxOutputTokens: "none",
  });
});

test("effort-suffixed variants resolved from their base model carry an effort-base prefix", () => {
  // `step-5-preview-high` has no row of its own; the resolver borrows step-5-preview's.
  const { capabilities, limitSources } = withSources(`${STEP}-high`);
  assert.equal(capabilities.contextWindow, 1_024_000);
  assert.equal(limitSources.contextWindow, `effort-base:registry:${STEP}`);
  // A variant with its own spec row is NOT marked as borrowed.
  assert.equal(
    withSources("cmd/deepseek-v4-flash-max").limitSources.contextWindow,
    "spec:deepseek-v4-flash-max"
  );
});

test("collecting provenance never changes a resolved capability (all catalog models)", () => {
  contextOverridesDb.setModelContextOverride("stepfun", "step-5-preview", 1_000_000);
  capabilityOverridesDb.setModelCapabilityOverride(STEP, "max_output_tokens", 32_000);
  modelsDevSync.saveModelsDevCapabilities({
    stepfun: { "step-5-preview": syncedRow({ limit_context: 900_000, limit_output: 45_678 }) },
  });
  const snapshot = modelCapabilities.createModelCapabilityResolutionSnapshot();
  const ids = [
    ...AI_MODELS.map((m: { provider: string; model: string }) => `${m.provider}/${m.model}`),
    "cmd/deepseek-v4-flash-max",
    `${STEP}-high`,
    "unknown-provider/never-seen-model",
  ];
  assert.ok(ids.length > 50);
  for (const id of ids) {
    for (const snap of [undefined, snapshot]) {
      const plain = modelCapabilities.getResolvedModelCapabilities(id, undefined, snap);
      const traced = withSources(id, snap);
      assert.deepEqual(traced.capabilities, plain, id);
      assert.equal(typeof traced.limitSources.contextWindow, "string", id);
      assert.equal(typeof traced.limitSources.maxInputTokens, "string", id);
      assert.equal(typeof traced.limitSources.maxOutputTokens, "string", id);
    }
  }
});

type ModelRow = Record<string, unknown> & {
  fullModel: string;
  contextWindow?: number | null;
  maxInputTokens?: number | null;
  maxOutputTokens?: number | null;
  capsSource?: Record<string, string>;
};
type ModelsBody = {
  models: ModelRow[];
  error?: { message: string; details: Array<{ field: string; message: string }> };
};

async function getModels(query: string) {
  const res = await modelsRoute.GET(new Request(`http://localhost/api/models${query}`));
  return { status: res.status, body: (await res.json()) as ModelsBody };
}

const LIMIT_KEYS = ["contextWindow", "maxInputTokens", "maxOutputTokens", "capsSource"];

test("GET /api/models without withLimits keeps today's payload shape and values", async () => {
  contextOverridesDb.setModelContextOverride("stepfun", "step-5-preview", 1_000_000);
  const plain = await getModels("?all=true");
  const explicitOff = await getModels("?all=true&withLimits=0");
  const withLimits = await getModels("?all=true&withLimits=1");
  assert.equal(plain.status, 200);
  assert.ok(plain.body.models.length > 50);

  const expectedKeys = [
    ...Object.keys(AI_MODELS[0]),
    "fullModel",
    "alias",
    "available",
    "supportsVision",
  ].sort();
  for (const model of plain.body.models) {
    assert.deepEqual(Object.keys(model).sort(), expectedKeys, model.fullModel);
  }
  assert.deepEqual(explicitOff.body, plain.body);

  // Opting in only ADDS fields: stripping them yields the default payload exactly.
  const stripped = withLimits.body.models.map((model) => {
    const copy: Record<string, unknown> = { ...model };
    for (const key of LIMIT_KEYS) delete copy[key];
    return copy;
  });
  assert.deepEqual(stripped, plain.body.models);
});

test("GET /api/models?withLimits=1 exposes resolved limits with their provenance", async () => {
  contextOverridesDb.setModelContextOverride("stepfun", "step-5-preview", 1_000_000);
  const { status, body } = await getModels("?all=true&withLimits=1");
  assert.equal(status, 200);
  const step = body.models.find((model) => model.fullModel === STEP);
  assert.ok(step, "stepfun/step-5-preview must be listed");
  assert.equal(step.contextWindow, 1_000_000);
  assert.equal(step.capsSource?.contextWindow, "override:context");
  for (const model of body.models) {
    assert.deepEqual(Object.keys(model.capsSource ?? {}).sort(), [
      "contextWindow",
      "maxInputTokens",
      "maxOutputTokens",
    ]);
    const resolved = modelCapabilities.getResolvedModelCapabilities(model.fullModel);
    assert.equal(model.contextWindow, resolved.contextWindow, model.fullModel);
    assert.equal(model.maxInputTokens, resolved.maxInputTokens, model.fullModel);
    assert.equal(model.maxOutputTokens, resolved.maxOutputTokens, model.fullModel);
  }
});

test("GET /api/models rejects an invalid withLimits value with a Zod 400", async () => {
  const { status, body } = await getModels("?withLimits=yes-please");
  assert.equal(status, 400);
  assert.equal(body.error?.message, "Invalid request");
  assert.equal(body.error?.details[0]?.field, "withLimits");
});
