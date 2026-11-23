import { test } from "node:test";
import assert from "node:assert/strict";
import { CLAUDE_CODE_META_FLAGS } from "../../open-sse/utils/claudeCodeMetaRequests.ts";
import { FEATURE_FLAG_DEFINITIONS } from "../../src/shared/constants/featureFlagDefinitions.ts";

test("as três chaves existem, são booleanas, da categoria cli e nascem desligadas", () => {
  const expectedWarning = {
    [CLAUDE_CODE_META_FLAGS.commandPrefix]: "caution",
    [CLAUDE_CODE_META_FLAGS.suggestion]: "info",
    [CLAUDE_CODE_META_FLAGS.filepaths]: "info",
  };
  for (const key of Object.values(CLAUDE_CODE_META_FLAGS)) {
    const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === key);
    assert.ok(def, `${key} must be defined`);
    assert.equal(def.category, "cli");
    assert.equal(def.type, "boolean");
    assert.equal(def.defaultValue, "false");
    assert.equal(def.requiresRestart, false);
    assert.equal(def.warningLevel, expectedWarning[key]);
  }
});
