import assert from "node:assert/strict";
import test from "node:test";

import { loadConfig } from "../../scripts/merge-queue/config.mjs";
import { protectedFiles } from "../../scripts/release/derived-refresh-split.mjs";

const { protectedPaths } = loadConfig();

test("selects only protected paths using the queue config", () => {
  assert.deepEqual(
    protectedFiles(
      [
        "README.md",
        "skills/omni-inference/SKILL.md",
        "skills/omni-inference/references/endpoints.md",
        "docs/reference/derived-facts.json",
        "docs/i18n/pt/llm.txt",
        "skills/a\nb/SKILL.md",
        "AGENTS.md",
      ],
      protectedPaths
    ),
    [
      "skills/omni-inference/SKILL.md",
      "skills/omni-inference/references/endpoints.md",
      "docs/i18n/pt/llm.txt",
      "skills/a\nb/SKILL.md",
      "AGENTS.md",
    ]
  );
});

test("keeps a skill's references in the protected group only when its SKILL.md changed", () => {
  assert.deepEqual(
    protectedFiles(
      ["skills/omni-inference/references/endpoints.md", "skills/omni-api-keys/SKILL.md"],
      protectedPaths
    ),
    ["skills/omni-api-keys/SKILL.md"]
  );
});

test("uses the supplied patterns and handles empty input", () => {
  assert.deepEqual(protectedFiles(["README.md", "AGENTS.md"], ["README.md"]), ["README.md"]);
  assert.deepEqual(protectedFiles([], protectedPaths), []);
});
