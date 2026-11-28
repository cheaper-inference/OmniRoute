import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { test, type TestContext } from "node:test";

import { getModelConfig, updateModelConfig } from "@/lib/cli-helper/clientModelConfig";

function directory(t: TestContext, variable: string) {
  const root = mkdtempSync(path.join(os.tmpdir(), "omni-models-"));
  const saved = process.env[variable];
  process.env[variable] = root;
  t.after(() => {
    if (saved === undefined) delete process.env[variable];
    else process.env[variable] = saved;
    rmSync(root, { recursive: true, force: true });
  });
  return root;
}

test("Kimi selects a configured alias, preserves comments, and restores byte for byte", (t) => {
  const file = path.join(directory(t, "KIMI_CODE_HOME"), "config.toml");
  const source =
    '# comment\ndefault_model = "first" # keep this\n[models.first]\nprovider = "vendor"\n[models.second]\nprovider = "vendor"\n';
  writeFileSync(file, source);
  const before = getModelConfig("kimi-code");
  assert.deepEqual(before.options, ["first", "second"]);
  assert.throws(() =>
    updateModelConfig({
      client: "kimi-code",
      action: "save",
      revision: before.revision,
      models: ["unknown"],
    })
  );
  const after = updateModelConfig({
    client: "kimi-code",
    action: "save",
    revision: before.revision,
    models: ["second"],
  });
  assert.deepEqual(after.models, ["second"]);
  assert.match(readFileSync(file, "utf8"), /"second" # keep this/);
  updateModelConfig({ client: "kimi-code", action: "restore", revision: after.revision });
  assert.equal(readFileSync(file, "utf8"), source);
});

test("CodeBuddy changes visible models without returning or rewriting a provider key", (t) => {
  const file = path.join(directory(t, "CODEBUDDY_CONFIG_DIR"), "models.json");
  const source =
    '{"models":[{"id":"custom","apiKey":"private-placeholder"}],"availableModels":["custom"]}\n';
  writeFileSync(file, source);
  const before = getModelConfig("codebuddy");
  assert.doesNotMatch(JSON.stringify(before), /private-placeholder/);
  assert.deepEqual(before.models, ["custom"]);
  const after = updateModelConfig({
    client: "codebuddy",
    action: "save",
    revision: before.revision,
    models: ["builtin"],
  });
  assert.deepEqual(after.models, ["builtin"]);
  assert.equal(JSON.parse(readFileSync(file, "utf8")).models[0].apiKey, "private-placeholder");
  assert.throws(() =>
    updateModelConfig({ client: "codebuddy", action: "restore", revision: before.revision })
  );
});
