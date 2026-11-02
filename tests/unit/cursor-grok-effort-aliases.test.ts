import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { after, afterEach } from "node:test";

const previousDataDir = process.env.DATA_DIR;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-grok-effort-aliases-"));
process.env.DATA_DIR = dataDir;

const { enrichCursorCatalog } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const { resolveRequestedModel } = await import("../../open-sse/utils/cursorAgentProtobuf.ts");
const { applyCursorReasoningEffort } =
  await import("../../open-sse/utils/cursorAgentProtobuf/requestedModelParameters.ts");
const { CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG } =
  await import("../../open-sse/utils/cursorAgentProtobuf/grok47MaxEffort.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { setFeatureFlagOverride, removeFeatureFlagOverride } =
  await import("../../src/lib/db/featureFlags.ts");
const previousFlagValue = process.env[CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG];
delete process.env[CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG];

afterEach(() => {
  removeFeatureFlagOverride(CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG);
  delete process.env[CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG];
});

after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
  if (previousFlagValue === undefined) delete process.env[CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG];
  else process.env[CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG] = previousFlagValue;
});

const base = [
  { id: "grok-4.7", name: "Grok 4.7", source: "imported" as const, inputTokenLimit: 200_000 },
];
const tiers = ["low", "medium", "high", "xhigh", "max"];

test("a live Grok 4.7 base exposes selectable verified effort aliases", () => {
  const catalog = enrichCursorCatalog("cursor", base);
  const aliases = catalog.filter((model) => model.id.startsWith("grok-4.7-"));
  assert.deepEqual(
    aliases.map((model) => model.id),
    tiers.map((tier) => `grok-4.7-${tier}`)
  );
  assert.ok(aliases.every((model) => model.inputTokenLimit === 200_000));
  assert.equal(catalog.filter((model) => model.id === "grok-4.7").length, 1);
});

test("CURSOR_GROK_47_DROP_MAX_EFFORT on: fallback aliases drop max and reuse GROK_47_EFFORTS", () => {
  process.env[CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG] = "true";
  const aliases = enrichCursorCatalog("cursor", base).filter((model) =>
    model.id.startsWith("grok-4.7-")
  );
  assert.deepEqual(
    aliases.map((model) => model.id),
    ["low", "medium", "high", "xhigh"].map((tier) => `grok-4.7-${tier}`)
  );
});

test("wire membership excludes synthetic aliases so a selected alias becomes a ModelParameter", () => {
  const wireIds = new Set(enrichCursorCatalog("cursor", base, false).map((model) => model.id));
  assert.equal(wireIds.has("grok-4.7-low"), false);
  assert.deepEqual(resolveRequestedModel("grok-4.7-low", { liveCatalogIds: wireIds }), {
    modelId: "grok-4.7",
    parameters: [{ id: "effort", value: "low" }],
  });
});

test("a provider-declared tier allowlist wins over fallback aliases and avoids duplicates", () => {
  const declared = [{ ...base[0], supportedThinkingEfforts: ["low", "high"] }];
  assert.deepEqual(
    enrichCursorCatalog("cursor", declared)
      .filter((model) => model.id.startsWith("grok-4.7-"))
      .map((model) => model.id),
    ["grok-4.7-low", "grok-4.7-high"]
  );
  const existing = [...declared, { ...base[0], id: "grok-4.7-high", name: "Upstream High" }];
  assert.equal(
    enrichCursorCatalog("cursor", existing).find((model) => model.id === "grok-4.7-high")?.name,
    "Upstream High"
  );
  assert.equal(
    enrichCursorCatalog("openai", base).some((model) => model.id === "grok-4.7-low"),
    false
  );
  assert.deepEqual(enrichCursorCatalog("cursor", []), []);
});

test("server catalog and dispatch honor database overrides before the environment", () => {
  const flag = CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG;
  const requested = { modelId: "grok-4.7", parameters: [] };
  const hasMaxAlias = () =>
    enrichCursorCatalog("cursor", base).some((model) => model.id === "grok-4.7-max");

  process.env[flag] = "false";
  setFeatureFlagOverride(flag, "true");
  assert.equal(hasMaxAlias(), false);
  assert.deepEqual(applyCursorReasoningEffort(requested, "max"), requested);

  process.env[flag] = "true";
  setFeatureFlagOverride(flag, "false");
  assert.equal(hasMaxAlias(), true);
  assert.deepEqual(applyCursorReasoningEffort(requested, "max"), {
    modelId: "grok-4.7",
    parameters: [{ id: "effort", value: "max" }],
  });

  removeFeatureFlagOverride(flag);
  assert.equal(hasMaxAlias(), false);
  assert.deepEqual(applyCursorReasoningEffort(requested, "max"), requested);
});
