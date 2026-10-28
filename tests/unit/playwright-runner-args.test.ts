import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { buildPlaywrightArgs } from "../../scripts/dev/run-playwright-tests.mjs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

test("npm run test:e2e passes no spec glob of its own, so a caller's spec list wins", () => {
  assert.equal(pkg.scripts["test:e2e"], "node scripts/dev/run-playwright-tests.mjs");
});

test("buildPlaywrightArgs: bare run defers to the config, spec paths and flags become test args", () => {
  assert.deepEqual(buildPlaywrightArgs([]), ["test"]);
  assert.deepEqual(buildPlaywrightArgs(["tests/e2e/settings-toggles.spec.ts"]), [
    "test",
    "tests/e2e/settings-toggles.spec.ts",
  ]);
  assert.deepEqual(buildPlaywrightArgs(["--grep", "debug"]), ["test", "--grep", "debug"]);
  assert.deepEqual(buildPlaywrightArgs(["test", "tests/e2e/a11y.spec.ts"]), [
    "test",
    "tests/e2e/a11y.spec.ts",
  ]);
  assert.deepEqual(buildPlaywrightArgs(["show-report"]), ["show-report"]);
});

test("@playwright/test is pinned to the runtime playwright version (one Playwright in the tree)", () => {
  const runtime = pkg.dependencies.playwright;
  assert.match(runtime, /^\d+\.\d+\.\d+$/, "runtime playwright stays an exact pin");
  assert.equal(pkg.dependencies["playwright-core"], runtime);
  assert.equal(pkg.devDependencies["@playwright/test"], runtime);

  const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
  assert.equal(lock.packages["node_modules/@playwright/test"].version, runtime);
  assert.equal(lock.packages["node_modules/playwright"].version, runtime);
  assert.equal(lock.packages["node_modules/@playwright/test/node_modules/playwright"], undefined);
});
