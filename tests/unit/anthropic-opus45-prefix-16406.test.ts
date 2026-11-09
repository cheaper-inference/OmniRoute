import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const directory = mkdtempSync(join(tmpdir(), "anthropic-prefix-16406-"));
process.env.DATA_DIR = directory;
process.env.API_KEY_SECRET = "anthropic-prefix-fixture-only";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { getModelInfoCore, normalizeCrossProxyModelId, parseModel } =
  await import("../../open-sse/services/model.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { applyClaudeEffortVariant } =
  await import("../../open-sse/handlers/chatCore/claudeEffortVariant.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test.before(async () => {
  await providers.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    apiKey: "fixture-provider-key",
    name: "Only Anthropic",
    isActive: true,
  });
  const connections = await providers.getProviderConnections();
  assert.deepEqual(
    connections.map((connection) => connection.provider),
    ["anthropic"]
  );
});
test.after(() => {
  core.resetDbInstance();
  rmSync(directory, { recursive: true, force: true });
});

test("explicit Anthropic Opus 4.5 retains its provider during parsing", () => {
  const parsed = parseModel("anthropic/claude-opus-4.5");
  assert.equal(parsed.provider, "anthropic");
  assert.equal(parsed.isAlias, false);
});

for (const [name, resolve] of [
  ["core", (id: string) => getModelInfoCore(id, null)],
  ["app", (id: string) => getModelInfo(id)],
] as const) {
  test(`${name}: the only configured Anthropic connection serves its explicit dotted Opus id`, async () => {
    const resolved = await resolve("anthropic/claude-opus-4.5");
    assert.equal(resolved.provider, "anthropic");
    assert.equal(resolved.model, "claude-opus-4-5");
  });
}

test("the unprefixed legacy alias still maps to the dated snapshot", () => {
  assert.equal(normalizeCrossProxyModelId("claude-opus-4.5").modelId, "claude-opus-4-5-20251101");
});

test("dashed explicit ids and effort variants retain Anthropic and dashed wire ids", async () => {
  const dashed = await getModelInfoCore("anthropic/claude-opus-4-5", null);
  assert.equal(dashed.provider, "anthropic");
  assert.equal(dashed.model, "claude-opus-4-5");
  const effort = await getModelInfoCore("anthropic/claude-opus-4.5-high", null);
  const body = { model: effort.model };
  const wire = applyClaudeEffortVariant({
    provider: effort.provider,
    effectiveModel: effort.model,
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(effort.provider, "anthropic");
  assert.equal(wire.effectiveModel, "claude-opus-4-5");
  assert.equal(body.model, "claude-opus-4-5");
});
