import assert from "node:assert/strict";
import test from "node:test";

import { selectImpacted } from "../../scripts/quality/select-impacted-tests.mjs";

const HELPER = "tests/_helpers/writeReleaseGreenEslintFixture.mjs";
const CONSUMERS = [
  "tests/unit/build/release-green-eslint-measurement.test.mjs",
  "tests/unit/build/release-green-output-flush.test.mjs",
  "tests/unit/build/release-green-suite-provenance.test.mjs",
  "tests/unit/build/release-green-workflow-evidence.test.ts",
];

test("shared helper changes require the full suite with a source-only map", () => {
  assert.deepEqual(selectImpacted({ changed: [HELPER], map: { sources: {} } }), ["__RUN_ALL__"]);
});

test("a partial helper edge cannot omit direct or transitive fixture consumers", () => {
  const map = { sources: {}, artifacts: { [HELPER]: [CONSUMERS[0]] } };
  const selected = selectImpacted({ changed: [HELPER], map });
  // Full-suite authority includes every consumer, independently of import depth or syntax.
  // This expansion is the existing CI sentinel contract, not a second dependency analyzer.
  const effectiveSelection = selected.includes("__RUN_ALL__") ? CONSUMERS : selected;
  assert.deepEqual(effectiveSelection, CONSUMERS);
  assert.deepEqual(selected, ["__RUN_ALL__"]);
});

test("changing one consumer alongside its helper cannot narrow the required suite", () => {
  assert.deepEqual(selectImpacted({ changed: [CONSUMERS[0], HELPER], map: { sources: {} } }), [
    "__RUN_ALL__",
  ]);
});
