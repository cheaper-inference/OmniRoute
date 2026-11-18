import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const checkerSource = fileURLToPath(
  new URL("../../../scripts/check/check-env-doc-sync.mjs", import.meta.url)
);

const CI_INTERNAL_NAMES = [
  "CHANGELOG_CANDIDATE_SHA",
  "CHANGELOG_EVENT_NAME",
  "CHANGELOG_EVENT_REF",
  "CHANGELOG_MERGE_GROUP_BASE_SHA",
  "CHANGELOG_PR_BASE_SHA",
  "CHANGELOG_PUSH_BEFORE_SHA",
  "GITHUB_WORKFLOW_SHA",
  "GITHUB_JOB",
  "OMNIROUTE_REQUIRE_PREBUILT_NEXT",
];

function runFixture(t, { ci = [], runtime = [], envExample = "", envDoc = "" } = {}) {
  const root = mkdtempSync(join(tmpdir(), "omniroute env contract "));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const checker = join(root, "scripts/check/check-env-doc-sync.mjs");
  mkdirSync(dirname(checker), { recursive: true });
  copyFileSync(checkerSource, checker);
  for (const [path, names] of [
    ["scripts/quality/fixture-context.mjs", ci],
    ["src/runtimeFixture.ts", runtime],
  ]) {
    const target = join(root, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, names.map((name) => `void process.env.${name};`).join("\n"));
  }
  mkdirSync(join(root, "docs/reference"), { recursive: true });
  writeFileSync(join(root, ".env.example"), envExample);
  writeFileSync(join(root, "docs/reference/ENVIRONMENT.md"), envDoc);
  const result = spawnSync(process.execPath, [checker], {
    cwd: root,
    encoding: "utf8",
    timeout: 10_000,
    maxBuffer: 1024 * 1024,
  });
  assert.equal(result.error, undefined, "checker must start and finish, without timeout");
  assert.equal(result.signal, null, "checker must not be terminated by a signal");
  assert.ok([0, 1].includes(result.status), `unexpected checker status: ${result.status}`);
  assert.match(result.stdout, /Env var contract sync report/, "the real CLI must run");
  assert.equal(result.stderr, "");
  return result;
}

for (const name of CI_INTERNAL_NAMES) {
  test(`${name} is CI execution context, not a product .env requirement`, (t) => {
    const result = runFixture(t, { ci: [name] });
    assert.equal(result.status, 0, result.stdout);
    assert.match(result.stdout, /Env \/ docs contract is in sync/);
  });
}

test("existing runner context remains classified", (t) => {
  assert.equal(runFixture(t, { ci: ["GITHUB_SHA", "GITHUB_OUTPUT"] }).status, 0);
});

test("a new undocumented runtime setting is still a strict failure", (t) => {
  const name = "OMNIROUTE_NEW_UNDOCUMENTED_RUNTIME_SETTING";
  const result = runFixture(t, { runtime: [name] });
  assert.equal(result.status, 1);
  assert.match(result.stdout, new RegExp(`- ${name}(?:\\r?\\n|$)`));
});

for (const name of ["GITHUB_TOKEN", "OMNIROUTE_USE_TURBOPACK", "OMNIROUTE_BUILD_PROFILE"]) {
  test(`${name} remains a documented product or operator setting`, (t) => {
    const result = runFixture(t, { runtime: [name] });
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stdout, new RegExp(`- ${name}(?:\\r?\\n|$)`));
  });
}

for (const name of [
  "CHANGELOG_UNDOCUMENTED_RUNTIME_SETTING",
  "GITHUB_UNDOCUMENTED_RUNTIME_SETTING",
  "OMNIROUTE_REQUIRE_PREBUILT_NEXT_RUNTIME_SETTING",
]) {
  test(`${name} is not hidden by a prefix exclusion`, (t) => {
    const result = runFixture(t, { runtime: [name] });
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stdout, new RegExp(`- ${name}(?:\\r?\\n|$)`));
  });
}

test("a runtime setting documented in both surfaces passes", (t) => {
  const name = "OMNIROUTE_NEW_DOCUMENTED_RUNTIME_SETTING";
  assert.equal(
    runFixture(t, {
      runtime: [name],
      envExample: `${name}=fixture\n`,
      envDoc: `| \`${name}\` | fixture |\n`,
    }).status,
    0
  );
});

test("an env example still requires its documentation", (t) => {
  const result = runFixture(t, { envExample: "OMNIROUTE_NEW_RUNTIME_SETTING=fixture\n" });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /In \.env\.example but missing from ENVIRONMENT\.md: 1/);
});

test("a documented runtime setting still requires its env example", (t) => {
  const result = runFixture(t, { envDoc: "`OMNIROUTE_NEW_RUNTIME_SETTING`\n" });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /In ENVIRONMENT\.md but missing from \.env\.example: 1/);
});

test("classifying a CI input does not waive env-to-doc consistency", (t) => {
  const result = runFixture(t, { envExample: "GITHUB_WORKFLOW_SHA=fixture\n" });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /In \.env\.example but missing from ENVIRONMENT\.md: 1/);
});
