import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { isAutomatedTestProcess } from "@/shared/utils/testProcess";

for (const entry of [
  "/opt/omniroute-test/server.js",
  "/srv/test/omniroute/bin/omniroute.mjs",
  "/srv/app.test.release/server.js",
  "/srv/omniroute-test/_artifacts/db-health-deferred-x/probe.mjs",
  "C:\\apps\\test\\omniroute\\server.js",
  "/srv/tests/server.js",
]) {
  test(`production entry ${entry} is not a test runner`, () => {
    assert.equal(isAutomatedTestProcess(["node", entry], {}, []), false);
  });
}

for (const arg of ["--test", "tests/unit/x.test.ts", "/repo/node_modules/.bin/vitest"]) {
  test(`application argument ${arg} is not runner evidence`, () => {
    assert.equal(isAutomatedTestProcess(["node", "server.js", arg], {}, []), false);
  });
}

for (const entry of [
  "tests/unit/x.test.ts",
  "tests/unit/x.spec.ts",
  "C:\\repo\\x.test.mjs",
  "/repo/node_modules/.bin/vitest",
  "/repo/node_modules/vitest/vitest.mjs",
  "/repo/node_modules/.bin/jest",
  "/repo/node_modules/.bin/mocha",
  "/repo/node_modules/.bin/ava",
  "/repo/node_modules/.bin/tap",
]) {
  test(`runner entry ${entry} is detected`, () => {
    // An empty execArgv keeps this run's own `--test` flag from deciding the case.
    assert.equal(isAutomatedTestProcess(["node", entry], {}, []), true);
  });
}

for (const env of [
  { NODE_ENV: "test" },
  { VITEST: "1" },
  { NODE_TEST_CONTEXT: "child-v8" },
  { JEST_WORKER_ID: "1" },
]) {
  test(`runner environment ${Object.keys(env)[0]} is detected`, () => {
    assert.equal(isAutomatedTestProcess(["node", "probe.mjs"], env, []), true);
  });
}

test("the native runner child is detected without a test entry filename", () => {
  // Read the context the real `node --test` runner gives its child, whatever runner
  // (and isolation mode) this file itself runs under.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-runner-context-"));
  const probe = path.join(dir, "probe.mjs");
  fs.writeFileSync(
    probe,
    'console.log(`RUNNER_CONTEXT=${process.env.NODE_TEST_CONTEXT ?? ""}`);\n'
  );
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  try {
    const child = spawnSync(process.execPath, ["--test", "--test-isolation=process", probe], {
      env,
      encoding: "utf8",
    });
    const context = /RUNNER_CONTEXT=(\S*)/.exec(`${child.stdout}${child.stderr}`)?.[1] ?? "";
    assert.ok(context.startsWith("child"), `runner child context: ${JSON.stringify(context)}`);
    assert.equal(
      isAutomatedTestProcess(["node", "probe.mjs"], { NODE_TEST_CONTEXT: context }, []),
      true
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("only an exact native --test execution flag enables test mode", () => {
  assert.equal(isAutomatedTestProcess(["node", "server.js"], {}, ["--test"]), true);
  for (const flag of [
    "--test-name-pattern=test",
    "--test-force-exit",
    "--import=/srv/test/setup.mjs",
  ]) {
    assert.equal(isAutomatedTestProcess(["node", "server.js"], {}, [flag]), false);
  }
});

test("empty node:test context is not a runner signal", () => {
  assert.equal(isAutomatedTestProcess(["node", "server.js"], { NODE_TEST_CONTEXT: "" }, []), false);
});
