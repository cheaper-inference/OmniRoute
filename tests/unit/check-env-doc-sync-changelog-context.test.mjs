import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CHECKER = fileURLToPath(
  new URL("../../scripts/check/check-env-doc-sync.mjs", import.meta.url)
);
const DOCUMENTED_OPTION = "OMNIROUTE_FIXTURE_DOCUMENTED_OPTION";
const CHANGELOG_CONTEXT = [
  "CHANGELOG_EVENT_NAME",
  "CHANGELOG_CANDIDATE_SHA",
  "CHANGELOG_PR_BASE_SHA",
  "CHANGELOG_MERGE_GROUP_BASE_SHA",
  "CHANGELOG_PUSH_BEFORE_SHA",
];

function runFixture(t, extraReferences = []) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "env-doc-changelog-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const checker = path.join(root, "scripts/check/check-env-doc-sync.mjs");
  fs.mkdirSync(path.dirname(checker), { recursive: true });
  fs.mkdirSync(path.join(root, "docs/reference"), { recursive: true });
  fs.mkdirSync(path.join(root, "scripts/quality"), { recursive: true });
  fs.copyFileSync(CHECKER, checker);
  fs.writeFileSync(path.join(root, ".env.example"), `${DOCUMENTED_OPTION}=fixture\n`);
  fs.writeFileSync(
    path.join(root, "docs/reference/ENVIRONMENT.md"),
    `# Fixture configuration\n\nUse \`${DOCUMENTED_OPTION}\` for this fixture.\n`
  );
  fs.writeFileSync(
    path.join(root, "scripts/quality/context.mjs"),
    [DOCUMENTED_OPTION, ...extraReferences].map((name) => `void process.env.${name};`).join("\n")
  );

  // The CLI scans source names. It must not need real CI values, dotenv or a user's environment.
  const result = spawnSync(process.execPath, [checker], {
    cwd: root,
    env: {},
    encoding: "utf8",
    timeout: 10_000,
    maxBuffer: 64 * 1024,
  });
  assert.equal(result.error, undefined);
  assert.equal(result.signal, null);
  return result;
}

test("env docs CLI accepts a documented product option in an isolated fixture", (t) => {
  const result = runFixture(t);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Env \/ docs contract is in sync/);
});

test("env docs CLI accepts exactly the five immutable CHANGELOG CI context names", (t) => {
  const result = runFixture(t, CHANGELOG_CONTEXT);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /In code but missing from \.env\.example: none/);
});

test("env docs CLI still rejects an undocumented product option", (t) => {
  const result = runFixture(t, ["OMNIROUTE_UNDOCUMENTED_PRODUCT_OPTION"]);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /In code but missing from \.env\.example: 1\b/);
  assert.match(result.stdout, /- OMNIROUTE_UNDOCUMENTED_PRODUCT_OPTION\b/);
});

test("env docs CLI does not exempt new names sharing the CHANGELOG prefix", (t) => {
  const result = runFixture(t, [
    "CHANGELOG_CANDIDATE_SHA_OVERRIDE",
    "CHANGELOG_UNDOCUMENTED_APP_OPTION",
  ]);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /In code but missing from \.env\.example: 2\b/);
  assert.match(result.stdout, /- CHANGELOG_CANDIDATE_SHA_OVERRIDE\b/);
  assert.match(result.stdout, /- CHANGELOG_UNDOCUMENTED_APP_OPTION\b/);
});
