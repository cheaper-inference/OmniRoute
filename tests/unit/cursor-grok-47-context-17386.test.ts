import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-grok-17386-"));
process.env.DATA_DIR = dataDir;

const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { GROK_47_CONTEXTS } =
  await import("../../open-sse/config/providers/registry/cursor/grok47.ts");
const { applyCursorReasoningEffort } =
  await import("../../open-sse/utils/cursorAgentProtobuf/requestedModelParameters.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG } =
  await import("../../open-sse/utils/cursorAgentProtobuf/grok47MaxEffort.ts");

test.afterEach(() => {
  delete process.env[CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG];
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function contextWindow(model: string) {
  return getResolvedModelCapabilities({ provider: "cursor", model }, { persistedOverrides: false })
    .contextWindow;
}

test("#17386 bare cursor grok-4.7 resolves to the 256k standard window, not the 200k provider default", () => {
  assert.equal(contextWindow("grok-4.7"), GROK_47_CONTEXTS["256k"]);
});

test("#17386 the explicit context variants keep their own windows", () => {
  assert.equal(contextWindow("cursor-grok-4.7-low-256k"), GROK_47_CONTEXTS["256k"]);
  assert.equal(contextWindow("cursor-grok-4.7-high-500k"), GROK_47_CONTEXTS["500k"]);
});

test("#17386 flag OFF (default): a Grok 4.7 request still forwards max effort", () => {
  const requested = { modelId: "grok-4.7", parameters: [] };
  assert.deepEqual(applyCursorReasoningEffort(requested, "max"), {
    modelId: "grok-4.7",
    parameters: [{ id: "effort", value: "max" }],
  });
});

test("#17386 flag ON: a Grok 4.7 request never forwards the unsupported max effort", () => {
  process.env[CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG] = "true";
  const requested = { modelId: "grok-4.7", parameters: [] };
  assert.deepEqual(applyCursorReasoningEffort(requested, "max"), requested);
  assert.deepEqual(applyCursorReasoningEffort(requested, "xhigh"), {
    modelId: "grok-4.7",
    parameters: [{ id: "effort", value: "xhigh" }],
  });
});

test("#17386 flag ON: the max guard is scoped to Grok 4.7: 4.6 keeps its generic tiers", () => {
  process.env[CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG] = "true";
  const requested = { modelId: "grok-4.6", parameters: [] };
  assert.deepEqual(applyCursorReasoningEffort(requested, "max"), {
    modelId: "grok-4.6",
    parameters: [{ id: "effort", value: "max" }],
  });
});
