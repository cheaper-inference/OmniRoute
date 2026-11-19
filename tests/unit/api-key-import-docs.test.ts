import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { buildApiOperationExample } from "../../src/lib/agentSkills/apiOperationExample.ts";

test("generated import example supplies required name/key without publishing a reusable secret", () => {
  const example = buildApiOperationExample(
    { method: "POST", path: "/api/keys/import" },
    false
  ).join("\n");
  assert.match(example, /IMPORTED_API_KEY/);
  assert.match(example, /name/);
  assert.doesNotMatch(example, /-d '\{\}'/);
  const key = "sk-syntheticDocumentationImportKey000000000000";
  const shell = spawnSync("bash", ["-c", `curl() { printf '%s\\n' "$@"; };\n${example}`], {
    env: { ...process.env, IMPORTED_API_KEY: key },
    encoding: "utf8",
  });
  assert.equal(shell.status, 0, shell.stderr);
  const args = shell.stdout.trim().split("\n");
  assert.deepEqual(JSON.parse(args[args.indexOf("-d") + 1]), { name: "Imported key", key });
});
