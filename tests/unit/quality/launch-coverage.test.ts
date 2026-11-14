import test from "node:test";
import assert from "node:assert/strict";

import { coverageByFunction, runCoverage } from "../../../scripts/quality/launch-quality.mjs";

const FIXTURE = "tests/unit/quality/fixtures/lazy-import.mjs";
const DRIVER = "tests/unit/quality/fixtures/lazy-import.driver.mjs";

test("crap coverage: a function below a lazy import() that its test fully calls is 100%", async () => {
  const { coverage, testsFailed } = await runCoverage({ tests: [DRIVER], files: [FIXTURE] });
  assert.equal(testsFailed, 0);
  const fileCov = Object.entries(coverage).find(([file]) => file.endsWith(FIXTURE))?.[1];
  assert.ok(fileCov, "fixture coverage missing");
  const byFn = coverageByFunction(FIXTURE, fileCov);
  assert.equal(byFn.get("classify"), 1);
  // Never called: only the declaration line (run at module load) counts as hit.
  assert.ok(byFn.get("neverCalled")! < 0.5);
  assert.ok(byFn.get("loadSep")! < 0.5);
});
