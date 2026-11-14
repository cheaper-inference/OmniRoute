import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-family-"));
process.env.DATA_DIR = dataDir;
const { REGISTRY } = await import("../../../open-sse/config/providerRegistry.ts");
// Seed two real catalog candidates before the resolver builds its static inference index.
for (const provider of ["kimi", "deepseek"])
  REGISTRY[provider].models.push({ id: "mimo-family-fixture", name: "fixture" });
const { resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { resolveModelOrError } = await import("../../../src/sse/handlers/chatHelpers.ts");
const { getModelInfo } = await import("../../../src/sse/services/model.ts");
test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});
test("ambiguous Kimi/Mimo families select the canonical API candidate", async () => {
  const bare = await getModelInfo("mimo-family-fixture");
  assert.equal(bare.errorType, "ambiguous_model");
  for (const model of ["kimi-k3", "mimo-family-fixture"]) {
    const result = await resolveModelOrError("codex/" + model, {
      messages: [{ role: "user", content: "fixture" }],
    });
    assert.equal(result.provider, "kimi");
    assert.equal(result.model, model);
  }
});
