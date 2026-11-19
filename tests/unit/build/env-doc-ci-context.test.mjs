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

const ATOMIC_COVERAGE_INPUTS = ["OMNIROUTE_CI_SYNC_TSX_CACHE", "TMPDIR"];
const NATIVE_COVERAGE_INPUTS = ["NODE_V8_COVERAGE"];
const MIGRATION_COVERAGE_INPUTS = ["NODE_V8_COVERAGE", "OMNIROUTE_CI_SYNC_TSX_CACHE"];
const COVERAGE_INPUTS = [...ATOMIC_COVERAGE_INPUTS, ...NATIVE_COVERAGE_INPUTS];

function runFixture(
  t,
  {
    ci = [],
    migration = [],
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
    ["scripts/check/migration-commutation.ts", migration],
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

test("coverage inputs are scoped to their own producer helpers", (t) => {
  const result = runFixture(t, {
    atomic: ATOMIC_COVERAGE_INPUTS,
    native: NATIVE_COVERAGE_INPUTS,
    migration: MIGRATION_COVERAGE_INPUTS,
  });
  assert.equal(result.status, 0, result.stdout);
});

for (const location of ["ci", "runtime"]) {
  test(`coverage input names still require documentation in ${location} code`, (t) => {
    const result = runFixture(t, {
      atomic: ATOMIC_COVERAGE_INPUTS,
      native: NATIVE_COVERAGE_INPUTS,
      migration: MIGRATION_COVERAGE_INPUTS,
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
    migration: [...MIGRATION_COVERAGE_INPUTS, "TMPDIR"],
  });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /- NODE_V8_COVERAGE(?:\r?\n|$)/);
  assert.match(result.stdout, /- TMPDIR(?:\r?\n|$)/);
  assert.match(result.stdout, new RegExp(`- ${unknown}(?:\\r?\\n|$)`));
});
