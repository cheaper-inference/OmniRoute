import assert from "node:assert/strict";
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
    assert.equal(isAutomatedTestProcess(["node", entry], {}), true);
  });
}

for (const env of [
  { NODE_ENV: "test" },
  { VITEST: "1" },
  { NODE_TEST_CONTEXT: "child-v8" },
  { JEST_WORKER_ID: "1" },
]) {
  test(`runner environment ${Object.keys(env)[0]} is detected`, () => {
    assert.equal(isAutomatedTestProcess(["node", "probe.mjs"], env), true);
  });
}

test("the native runner child is detected without a test entry filename", () => {
  assert.equal(process.env.NODE_TEST_CONTEXT, "child-v8");
  assert.equal(isAutomatedTestProcess(["node", "probe.mjs"], process.env), true);
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
