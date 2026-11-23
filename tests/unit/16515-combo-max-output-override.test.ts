import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-16515-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-test-secret";
process.env.CATALOG_BUILD_TIMEOUT_MS = process.env.CATALOG_BUILD_TIMEOUT_MS || "120000";

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const overridesDb = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

function capability(limitOutput: number) {
  return {
    tool_call: true,
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
    limit_context: 1_000_000,
    limit_input: null,
    limit_output: limitOutput,
    interleaved_field: null,
  };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#16515 a combo's max_output_tokens honours a member's max_output_tokens override", async () => {
  modelsDevSync.saveModelsDevCapabilities({
    openai: { "override-member": capability(1_048_576) },
    gemini: { "plain-member": capability(384_000) },
  });
  assert.equal(
    overridesDb.setModelCapabilityOverride("openai/override-member", "max_output_tokens", 65_536),
    true
  );
  await combosDb.createCombo({
    name: "override-router",
    strategy: "priority",
    models: ["openai/override-member", "gemini/plain-member"],
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as {
    data: Array<{ id: string; max_output_tokens?: number }>;
  };
  const combo = body.data.find((item) => item.id === "override-router");

  assert.equal(response.status, 200);
  assert.ok(combo);
  // min(65536 after the override, 384000), not min(1048576 raw, 384000)
  assert.equal(combo.max_output_tokens, 65_536);
});
