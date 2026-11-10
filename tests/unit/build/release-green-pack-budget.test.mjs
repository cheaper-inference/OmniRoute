import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(
  new URL("../../../scripts/quality/validate-release-green.mjs", import.meta.url),
  "utf8"
);

// Wiring regressions, not evidence that a real build finishes within this budget.
test("the full package lane keeps 90 minutes total with an independent policy budget", () => {
  const lane = source.slice(source.indexOf('id: "pack-artifact"'));
  const laneEnd = lane.indexOf("\n      });");
  assert.ok(laneEnd > 0, "the package lane must have a bounded declaration");
  assert.match(
    lane.slice(0, laneEnd),
    /run: \(timeout\) => runPackArtifactGate\(timeout, \{ independentPolicy: FULL_CI \}\),[\s\S]*timeout: 90 \* 60 \* 1000/
  );
  assert.match(source, /PACK_LANE_TIMEOUT_MS = 90 \* 60 \* 1000/);
  assert.match(source, /PACK_POLICY_TIMEOUT_MS = 3 \* 60 \* 1000/);
  assert.match(source, /g\.run\(g\.timeout\)/);
  const runner = source.slice(
    source.indexOf("async function runPackArtifactGate"),
    source.indexOf("async function runUnitShards")
  );
  assert.match(runner, /const deadline = now\(\) \+ preparationBudgetMs/);
  assert.match(
    runner,
    /independentPolicy && step\.phaseId === "validate-pack-artifact"[\s\S]*\? PACK_POLICY_TIMEOUT_MS[\s\S]*: deadline - now\(\)/
  );
  assert.match(runner, /if \(remaining <= 0\)[\s\S]*classifyRunError/);
  assert.match(runner, /timeout: remaining/);
  assert.match(runner, /if \(result\.code !== 0 \|\| result\.receipt\?\.outcome !== "PASS"\)/);
});

test("the nightly full sweep selects the full package lane, not the quick path", () => {
  const workflow = readFileSync(
    new URL("../../../.github/workflows/nightly-release-green.yml", import.meta.url),
    "utf8"
  );
  assert.match(workflow, /MODE="--with-build --full-ci --suites-from suite-results"/);
  // release-green and main-green both read hosted receipts (#18776); neither keeps a local form.
  assert.deepEqual(workflow.match(/MODE="--with-build --full-ci[^"]*"/g), [
    'MODE="--with-build --full-ci --suites-from suite-results"',
    'MODE="--with-build --full-ci --suites-from suite-results"',
  ]);
  assert.match(
    source,
    /const lanes = SUITES_FROM \? slow\.filter\(\(g\) => g\.id === "pack-artifact"\) : slow/
  );
});

test("full-mode tarball boot keeps its independent 40 minute ceiling and package dependency", () => {
  const boot = source.slice(source.indexOf("const packArtifactIndex"));
  assert.match(boot, /packArtifactResult\.code !== 0/);
  assert.match(boot, /\["run", "check:pack-boot"\], \{\s*timeout: 40 \* 60 \* 1000/);
});

// Quick mode is a separate preflight contract, not the full nightly budget.
test("quick build keeps its existing 20 minute budget", () => {
  assert.match(source, /await runPackArtifactGate\(20 \* 60 \* 1000\)/);
});
