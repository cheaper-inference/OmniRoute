/**
 * DeepSeek V4 Flash Vision (exp) catalog registration.
 *
 * OpenCode Go has no `modelsUrl`, so a model missing from its static registry is
 * unreachable from the catalog. Command Code does sync a live catalog, but the
 * static list is what `/v1/models` and capability resolution fall back to. Both
 * rows declare `supportsVision: true` explicitly so the vision filter and the
 * Vision Bridge do not depend on the `-vision` id heuristic alone, while the
 * text-only `deepseek-v4-flash` sibling must stay vision-false.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { opencode_goProvider } =
  await import("../../open-sse/config/providers/registry/opencode/go/index.ts");
const { command_codeProvider } =
  await import("../../open-sse/config/providers/registry/command-code/index.ts");
const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");

type Row = Record<string, unknown> & { id: string };

function findRow(models: readonly unknown[] | undefined, id: string): Row | undefined {
  return (models as Row[] | undefined)?.find((m) => m.id === id);
}

test("opencode-go registers deepseek-v4-flash-vision-exp with explicit vision", () => {
  const row = findRow(opencode_goProvider.models, "deepseek-v4-flash-vision-exp");
  assert.ok(row, "deepseek-v4-flash-vision-exp must be in the opencode-go static catalog");
  assert.equal(row.supportsVision, true);
  assert.equal(row.supportsReasoning, true);
  // Same transport and effort vocabulary as the deepseek-v4-flash sibling.
  const sibling = findRow(opencode_goProvider.models, "deepseek-v4-flash");
  assert.ok(sibling, "deepseek-v4-flash sibling must still be registered");
  assert.equal(row.targetFormat, sibling.targetFormat);
  assert.deepEqual(row.supportedThinkingEfforts, sibling.supportedThinkingEfforts);
  assert.match(String(row.name), /exp/i, "experimental model must say so in its name");
});

test("opencode-go registry lookup resolves the vision row", () => {
  const model = findRow(getRegistryEntry("opencode-go")?.models, "deepseek-v4-flash-vision-exp");
  assert.ok(model, "the opencode-go registry entry must expose the vision row");
  assert.equal(model.supportsVision, true);
});

test("command-code registers deepseek/deepseek-v4-flash-vision-exp with explicit vision", () => {
  const row = findRow(command_codeProvider.models, "deepseek/deepseek-v4-flash-vision-exp");
  assert.ok(
    row,
    "deepseek/deepseek-v4-flash-vision-exp must be in the command-code static catalog"
  );
  assert.equal(row.supportsVision, true);
  assert.equal(row.supportsReasoning, true);
  const sibling = findRow(command_codeProvider.models, "deepseek/deepseek-v4-flash");
  assert.ok(sibling, "deepseek/deepseek-v4-flash sibling must still be registered");
  assert.deepEqual(row.supportedThinkingEfforts, sibling.supportedThinkingEfforts);
  assert.equal(row.contextLength, sibling.contextLength);
  assert.equal(row.maxOutputTokens, sibling.maxOutputTokens);
});

test("resolved capabilities: vision on the exp rows, off on the text-only flash siblings", () => {
  for (const modelId of [
    "opencode-go/deepseek-v4-flash-vision-exp",
    "command-code/deepseek/deepseek-v4-flash-vision-exp",
  ]) {
    assert.equal(
      getResolvedModelCapabilities(modelId).supportsVision,
      true,
      `${modelId} must resolve supportsVision: true`
    );
  }
  for (const modelId of [
    "opencode-go/deepseek-v4-flash",
    "command-code/deepseek/deepseek-v4-flash",
  ]) {
    assert.notEqual(
      getResolvedModelCapabilities(modelId).supportsVision,
      true,
      `${modelId} is text-only and must not claim vision`
    );
  }
});
