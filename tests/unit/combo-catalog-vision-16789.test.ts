import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omni-combo-vision-16789-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "combo-vision-16789-fixture";
process.env.REQUIRE_API_KEY = "false";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const models = await import("../../src/lib/db/models.ts");
const combos = await import("../../src/lib/db/combos.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const publicCombos = await import("../../src/app/api/v1/combos/route.ts");

type Entry = {
  id?: string;
  name?: string;
  capabilities?: {
    vision?: boolean;
    multimodal?: boolean;
    tool_calling?: boolean;
    reasoning?: boolean;
  };
  context_length?: number;
  max_output_tokens?: number;
  input_modalities?: string[];
  output_modalities?: string[];
};
let catalogRows: Entry[];
let comboRows: Entry[];

test.before(async () => {
  for (const prefix of ["ih", "si"]) {
    const nodeId = `openai-compatible-chat-${prefix}-16789`;
    await providers.createProviderNode({
      id: nodeId,
      type: "openai-compatible",
      prefix,
      name: prefix,
      apiType: "chat",
      baseUrl: "http://127.0.0.1:9/v1",
    });
    await providers.createProviderConnection({
      provider: nodeId,
      authType: "apikey",
      name: prefix,
      apiKey: "fixture-key",
      isActive: true,
      testStatus: "active",
    });
    for (const id of [
      "deepseek-v4.1-flash",
      "minimax-m3",
      "vendor/opaque-vision-16789",
      "opaque-vision-leaf-16789",
    ]) {
      await models.addCustomModel(
        nodeId,
        id,
        id,
        "manual",
        "chat-completions",
        ["chat"],
        undefined,
        {},
        true
      );
    }
    await models.addCustomModel(
      nodeId,
      "vendor/opaque-text-16789",
      "Text path",
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      false
    );
    await models.addCustomModel(
      nodeId,
      "opaque-text-16789",
      "Text",
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      false
    );
  }
  const definitions = [
    [
      "vision",
      ["ih/deepseek-v4.1-flash", "ih/minimax-m3", "si/deepseek-v4.1-flash", "si/minimax-m3"],
    ],
    ["path-vision", ["ih/vendor/opaque-vision-16789", "si/vendor/opaque-vision-16789"]],
    ["leaf-vision", ["ih/opaque-vision-leaf-16789", "si/opaque-vision-leaf-16789"]],
    ["mixed-false-path", ["ih/deepseek-v4.1-flash", "si/vendor/opaque-text-16789"]],
    ["known-plus-unknown", ["ih/deepseek-v4.1-flash", "si/unknown-16789"]],
    ["mixed-text", ["ih/vendor/opaque-vision-16789", "si/opaque-text-16789"]],
    ["mixed-unknown", ["ih/vendor/opaque-vision-16789", "si/unknown-16789"]],
  ] as const;
  for (const [name, members] of definitions) {
    await combos.createCombo({ name, strategy: "priority", models: [...members] });
  }
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  catalogRows = (await response.json()).data;
  const projected = await publicCombos.GET(new Request("http://localhost/api/v1/combos"));
  assert.equal(projected.status, 200);
  comboRows = (await projected.json()).data;
});

test.after(() => {
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const name of ["vision", "path-vision", "leaf-vision"]) {
  test(`${name}: catalog and live projection agree on proven vision members`, () => {
    const entry = catalogRows.find((row) => row.id === name);
    const live = comboRows.find((row) => row.name === name);
    assert.ok(entry);
    assert.equal(live?.capabilities?.multimodal, true);
    assert.equal(entry.capabilities?.vision, true);
    assert.ok(entry.input_modalities?.includes("image"));
    assert.ok(entry.output_modalities?.includes("text"));
    if (name !== "vision") {
      assert.equal(entry.context_length, undefined);
      assert.equal(entry.max_output_tokens, undefined);
      assert.equal(entry.capabilities?.tool_calling, undefined);
      assert.equal(entry.capabilities?.reasoning, undefined);
      const id = name === "path-vision" ? "vendor/opaque-vision-16789" : "opaque-vision-leaf-16789";
      for (const prefix of ["ih", "si"]) {
        const member = catalogRows.find((row) => row.id === `${prefix}/${id}`);
        assert.equal(member?.capabilities?.vision, true);
        assert.ok(member.input_modalities?.includes("image"));
      }
    }
  });
}

for (const name of ["mixed-text", "mixed-unknown", "mixed-false-path", "known-plus-unknown"]) {
  test(`${name}: explicit false or unknown must not advertise confirmed vision`, () => {
    const entry = catalogRows.find((row) => row.id === name);
    const live = comboRows.find((row) => row.name === name);
    assert.ok(entry);
    assert.equal(live?.capabilities?.multimodal, false);
    assert.notEqual(entry.capabilities?.vision, true);
  });
}
