// Grok Build's cli-chat-proxy accepts grok-4.7-build-fast (Grok 4.7 on the faster
// lane Grok Build uses) and grok-code-fast-1, but the static grok-cli list never
// carried them, so they were missing from the catalog and the model pickers even
// though `passthroughModels` already dispatched them when typed by hand.
import test from "node:test";
import assert from "node:assert/strict";

const { grok_cliProvider } =
  await import("../../open-sse/config/providers/registry/grok-cli/index.ts");
const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");

type GrokModel = (typeof grok_cliProvider.models)[number];

function findModel(id: string): GrokModel {
  const entry = grok_cliProvider.models.find((model: GrokModel) => model.id === id);
  assert.ok(entry, `grok-cli registry must list ${id}`);
  return entry;
}

const ids = grok_cliProvider.models.map((model: GrokModel) => model.id);

test("grok-cli lists grok-4.7-build-fast and grok-code-fast-1", () => {
  assert.ok(ids.includes("grok-4.7-build-fast"));
  assert.ok(ids.includes("grok-code-fast-1"));
});

test("grok-cli static list has no duplicate ids", () => {
  assert.equal(new Set(ids).size, ids.length);
});

test("grok-4.7-build-fast mirrors grok-4.7's window, efforts and wire format", () => {
  const base = findModel("grok-4.7");
  const fast = findModel("grok-4.7-build-fast");
  assert.equal(fast.contextLength, base.contextLength);
  assert.equal(fast.supportsReasoning, base.supportsReasoning);
  assert.deepEqual(fast.supportedThinkingEfforts, base.supportedThinkingEfforts);
  assert.equal(fast.toolCalling, true);
  assert.equal(fast.targetFormat, "openai-responses");
  assert.deepEqual(fast.unsupportedParams, base.unsupportedParams);
});

test("grok-4.7-build-fast resolves the Grok 4.7 context window", () => {
  const caps = getResolvedModelCapabilities({
    provider: "grok-cli",
    model: "grok-4.7-build-fast",
  });
  assert.equal(caps.contextWindow, findModel("grok-4.7").contextLength);
});

test("unprobed vision stays undeclared on the new ids", () => {
  assert.notEqual(findModel("grok-4.7-build-fast").supportsVision, true);
  assert.notEqual(findModel("grok-code-fast-1").supportsVision, true);
});

test("grok-code-fast-1 goes over the Responses wire format with tool calling", () => {
  const code = findModel("grok-code-fast-1");
  assert.equal(code.toolCalling, true);
  assert.equal(code.targetFormat, "openai-responses");
  assert.equal(getModelTargetFormat("gc", "grok-code-fast-1"), "openai-responses");
});
