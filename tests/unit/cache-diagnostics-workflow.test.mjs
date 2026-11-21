import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { matchesGlob } from "node:path";
import test from "node:test";
import { load } from "js-yaml";

const workflow = load(
  readFileSync(
    new URL("../../.github/workflows/compression-integrity.yml", import.meta.url),
    "utf8"
  )
);
const paths = workflow.on.pull_request.paths;

for (const changedPath of [
  "src/lib/gracefulShutdown.ts",
  "tests/fixtures/token-breakdown/shutdown-child.mjs",
  "tests/fixtures/token-breakdown/diagnostics-child.mjs",
  "tests/fixtures/token-breakdown/sink-child.mjs",
  "tests/fixtures/token-breakdown/worker.mjs",
  "tests/fixtures/token-breakdown/nested/worker.mjs",
]) {
  test(`compression integrity runs when only ${changedPath} changes`, () => {
    assert.ok(
      paths.some((pattern) => matchesGlob(changedPath, pattern)),
      `The pull-request path filter excludes ${changedPath}`
    );
  });
}

test("compression integrity keeps unrelated changes filtered out", () => {
  assert.equal(
    paths.some((pattern) => matchesGlob("docs/unrelated.md", pattern)),
    false
  );
});
