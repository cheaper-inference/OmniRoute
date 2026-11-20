import { test } from "node:test";
import assert from "node:assert";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const GATE = path.resolve(here, "../../scripts/check/check-api-docs-refs.mjs");
const REPO = path.resolve(here, "../..");

// An unresolvable explicit base makes the shared resolver return status "error";
// each sub-check then reports exit code 2. The combined docs gate must carry that
// code out to the process instead of collapsing every failure to 1.
test("a refused base keeps exit code 2 through the combined docs gate", () => {
  const result = spawnSync(process.execPath, [GATE], {
    cwd: REPO,
    encoding: "utf8",
    env: { ...process.env, BASE: "missing-base-ref-for-exit-code-regression" },
  });

  assert.equal(result.error, undefined);
  assert.equal(
    result.status,
    2,
    `expected the base refusal to exit 2, got ${result.status}\n${result.stderr}\n${result.stdout}`
  );
  assert.match(result.stderr, /base refused by/);
});
