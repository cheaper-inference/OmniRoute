import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { COLLECTORS } from "../../scripts/check/check-test-discovery.mjs";
import {
  canonicalSet,
  knownUnexecuted,
  inventoryErrors,
} from "../../scripts/quality/release-acceptance/inventory.mjs";

const RELEASE_SUITES = ["test:unit:ci", "test:vitest", "test:integration"];
const baseline = JSON.parse(
  readFileSync(
    new URL("../../config/quality/test-discovery-baseline.json", import.meta.url),
    "utf8"
  )
);

test("tsx files under tests/unit are known_unexecuted for release scope, not inventory errors", () => {
  const ku = knownUnexecuted(RELEASE_SUITES, COLLECTORS, baseline);
  const tsx = ku.collectors.find((c) => c.glob === "tests/unit/**/*.test.tsx");
  assert.ok(tsx, "tsx collector must be listed as known_unexecuted");
  assert.equal(typeof tsx.count, "number");
  assert.ok(tsx.count > 0);
});

test("omitting a collector without listing it is an inventory error", () => {
  const collectors = COLLECTORS.filter((c) => c.glob !== "tests/unit/**/*.test.tsx");
  const discoveredFiles = ["tests/unit/AutoComboCatalog.test.tsx"];
  const errors = inventoryErrors(RELEASE_SUITES, collectors, baseline, discoveredFiles);
  assert.ok(errors.some((e) => e.code === "collector_omitted"));
});

test("combo-matrix glob is in release integration scope, not known_unexecuted", () => {
  const ku = knownUnexecuted(RELEASE_SUITES, COLLECTORS, baseline);
  assert.equal(
    ku.collectors.some((c) => c.glob === "tests/integration/combo-matrix/*.test.ts"),
    false
  );
  const combo = COLLECTORS.find((c) => c.glob === "tests/integration/combo-matrix/*.test.ts");
  assert.ok(combo);
});

test("unit CI inventory retains chatcore and the other public collector directories", () => {
  const selected = [
    "tests/unit/chatcore/diff-chatcore-leaves.test.ts",
    "tests/unit/api/api-catchall-json-404.test.ts",
    "tests/unit/translator/claude-web-search-blocks.test.ts",
  ];
  const files = [...selected, "tests/unit/autoCombo/out-of-scope.test.ts"];
  assert.deepEqual(canonicalSet(["test:unit:ci"], COLLECTORS, files), selected);
  const collector = COLLECTORS.find((entry) => entry.glob.includes("build,chatcore,cli"));
  assert.ok(collector, "the public collector must include chatcore");
  const unexecuted = knownUnexecuted(["test:unit:ci"], COLLECTORS, baseline, files);
  assert.equal(
    unexecuted.collectors.some((entry) => entry.glob === collector.glob),
    false,
    "a collector executed by unit CI cannot be classified as unexecuted"
  );
});
