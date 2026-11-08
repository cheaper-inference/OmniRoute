import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { generateAgentSkills } from "../../src/lib/agentSkills/generator.ts";

test("published cli-keys skill matches the authenticated key-policy command registry", async () => {
  const report = await generateAgentSkills({ dryRun: true, onlyIds: ["cli-keys"] });
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.generated, [], "regenerate cli-keys after changing its command flags");
  assert.deepEqual(report.unchanged, ["cli-keys"]);

  const published = fs.readFileSync(
    new URL("../../skills/cli-keys/SKILL.md", import.meta.url),
    "utf8"
  );
  const policy = published.split("### `keys set <id>`\n")[1]?.split("\n### ")[0];
  assert.ok(policy, "the key-policy command must remain documented");
  assert.match(policy, /- `--allowed-models <list>`/);
  assert.match(policy, /- `--model-access-mode <mode>`/);
  assert.match(policy, /- `--unrestricted`/);
});
