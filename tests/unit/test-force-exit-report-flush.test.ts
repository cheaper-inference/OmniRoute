// Regression guard for #18045: under `node --test --test-force-exit`, the runner must count
// every test a file child ran.
//
// 1. Report flush (nodejs/node#64833). The force-exit path calls process.exit() in each file
//    child without draining its stdout pipe to the runner, so the tail of a large report was
//    dropped and the run reported fewer tests, still green. tests/_setup/isolateDataDir.ts
//    makes the child's stdout blocking. Without it this fixture set usually reports fewer
//    than 4 files x (1 parent + 400 subtests) = 1604 tests (1-66 short in local runs).
// 2. Top-level await placement. A file must finish its top-level awaits before its first
//    test(); scripts/check/check-test-tla-order.mjs enforces that statically. This runs the
//    supported shape under force-exit and expects all 3 tests.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { closeSync, mkdtempSync, openSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const FIXTURE_DIR = "tests/fixtures/test-force-exit";

function runForceExit(files: string[]) {
  const env: NodeJS.ProcessEnv = { ...process.env };
  // A nested test runner must get its own context instead of inheriting this child's.
  delete env.NODE_TEST_CONTEXT;
  // The nested runner's own stdout pipe is cut off by the same force-exit bug, so write its
  // report to a file (synchronous on POSIX) and test only the file children.
  const dir = mkdtempSync(path.join(tmpdir(), "force-exit-report-"));
  try {
    const reportPath = path.join(dir, "report.tap");
    const fd = openSync(reportPath, "w");
    let result;
    try {
      result = spawnSync(
        process.execPath,
        [
          "--import",
          "tsx/esm",
          "--import",
          "./tests/_setup/isolateDataDir.ts",
          "--test",
          "--test-force-exit",
          "--test-concurrency=4",
          "--test-reporter=tap",
          ...files,
        ],
        { cwd: REPO_ROOT, env, encoding: "utf8", stdio: ["ignore", fd, "pipe"], timeout: 120_000 }
      );
    } finally {
      closeSync(fd);
    }
    const stdout = readFileSync(reportPath, "utf8");
    const count = (name: string) => {
      const match = new RegExp(`^# ${name} (\\d+)$`, "m").exec(stdout);
      return match ? Number(match[1]) : null;
    };
    return { result, tests: count("tests"), pass: count("pass"), fail: count("fail") };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test("force-exit runner counts every subtest of large reports (#18045, nodejs/node#64833)", () => {
  const files = [1, 2, 3, 4].map((i) => `${FIXTURE_DIR}/report-flush-${i}.fixture.mjs`);
  // The truncation is a race; three runs make a missed regression very unlikely.
  for (let run = 1; run <= 3; run++) {
    const { result, tests, pass, fail } = runForceExit(files);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual({ tests, pass, fail }, { tests: 1604, pass: 1604, fail: 0 }, `run ${run}`);
  }
});

test("force-exit runs every test when the top-level await precedes the first test() (#18045)", () => {
  const { result, tests, pass, fail } = runForceExit([
    `${FIXTURE_DIR}/tla-before-tests.fixture.mjs`,
  ]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual({ tests, pass, fail }, { tests: 3, pass: 3, fail: 0 });
});
