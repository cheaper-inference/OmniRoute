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

const MIRROR_REFRESH_INPUTS = [
  "BASE",
  "CANDIDATE_SHA",
  "ENGINE",
  "PARTIAL",
  "REFRESH_BRANCH",
  "REFRESH_SHA",
  "REPO",
  "RUN_URL",
  "RUNNER_TEMP",
  "TRANSLATION_SHA",
];

const ATOMIC_COVERAGE_INPUTS = ["OMNIROUTE_CI_SYNC_TSX_CACHE", "TMPDIR"];
const NATIVE_COVERAGE_INPUTS = ["NODE_V8_COVERAGE"];
const COVERAGE_INPUTS = [...ATOMIC_COVERAGE_INPUTS, ...NATIVE_COVERAGE_INPUTS];

function runFixture(
  t,
  {
    ci = [],
    mirror = [],
    atomic = [],
    native = [],
    runtime = [],
    envExample = "",
    envDoc = "",
  } = {}
) {
  const root = mkdtempSync(join(tmpdir(), "omniroute env contract "));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const checker = join(root, "scripts/check/check-env-doc-sync.mjs");
  mkdirSync(dirname(checker), { recursive: true });
  copyFileSync(checkerSource, checker);
  for (const [path, names] of [
    ["scripts/quality/fixture-context.mjs", ci],
    ["scripts/i18n/mirror-refresh-safety.mjs", mirror],
    ["scripts/ci/atomic-tsx-cache.mjs", atomic],
    ["scripts/ci/native-worker-v8-layout.mjs", native],
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

test("the mirror refresh helper reads workflow inputs without a product env entry", (t) => {
  const result = runFixture(t, { mirror: MIRROR_REFRESH_INPUTS });
  assert.equal(result.status, 0, result.stdout);
});

test("mirror input names still require documentation when used by the product", (t) => {
  const result = runFixture(t, { mirror: MIRROR_REFRESH_INPUTS, runtime: MIRROR_REFRESH_INPUTS });
  assert.equal(result.status, 1);
  for (const name of MIRROR_REFRESH_INPUTS) {
    assert.match(result.stdout, new RegExp(`- ${name}(?:\r?\n|$)`));
  }
});

test("a matching name in another script stays visible to the gate", (t) => {
  const result = runFixture(t, { mirror: ["BASE"], ci: ["BASE"] });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /- BASE(?:\r?\n|$)/);
});

test("an unclassified mirror input stays visible to the gate", (t) => {
  const result = runFixture(t, { mirror: ["UNKNOWN_MIRROR_INPUT"] });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /- UNKNOWN_MIRROR_INPUT(?:\r?\n|$)/);
});

test("coverage inputs are scoped to their own producer helpers", (t) => {
  const result = runFixture(t, {
    atomic: ATOMIC_COVERAGE_INPUTS,
    native: NATIVE_COVERAGE_INPUTS,
  });
  assert.equal(result.status, 0, result.stdout);
});

for (const location of ["ci", "runtime"]) {
  test(`coverage input names still require documentation in ${location} code`, (t) => {
    const result = runFixture(t, {
      atomic: ATOMIC_COVERAGE_INPUTS,
      native: NATIVE_COVERAGE_INPUTS,
      [location]: COVERAGE_INPUTS,
    });
    assert.equal(result.status, 1);
    for (const name of COVERAGE_INPUTS) {
      assert.match(result.stdout, new RegExp(`- ${name}(?:\\r?\\n|$)`));
    }
  });
}

test("a coverage helper still reports unclassified inputs and keys owned by another helper", (t) => {
  const unknown = "OMNIROUTE_CI_UNKNOWN_COVERAGE_INPUT";
  const result = runFixture(t, {
    atomic: [...ATOMIC_COVERAGE_INPUTS, ...NATIVE_COVERAGE_INPUTS],
    native: [...NATIVE_COVERAGE_INPUTS, unknown],
  });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /- NODE_V8_COVERAGE(?:\r?\n|$)/);
  assert.match(result.stdout, new RegExp(`- ${unknown}(?:\\r?\\n|$)`));
});

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
