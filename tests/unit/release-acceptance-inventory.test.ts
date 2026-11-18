import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { COLLECTORS, globToRegExp } from "../../scripts/check/check-test-discovery.mjs";
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
const UNIT_SUBDIRECTORY_FILES = [
  "tests/unit/chatcore/streaming-response.test.ts",
  "tests/unit/authz/routeGuard.test.ts",
  "tests/unit/db/api-keys.test.ts",
];

test("unit CI canonical set includes chatcore, authz and DB without widening suite scope", () => {
  const excluded = [
    "tests/unit/AutoComboCatalog.test.tsx",
    "tests/unit/autoCombo/builtin-discovery-contract.test.ts",
  ];
  const files = [...UNIT_SUBDIRECTORY_FILES, ...excluded];
  for (const file of files) {
    assert.ok(existsSync(new URL(`../../${file}`, import.meta.url)), `${file} exists`);
  }
  assert.deepEqual(canonicalSet(["test:unit:ci"], COLLECTORS, files), UNIT_SUBDIRECTORY_FILES);
});

test("the current unit subdirectory collector is not known_unexecuted in release scope", () => {
  const collector = COLLECTORS.find((candidate) =>
    UNIT_SUBDIRECTORY_FILES.every((file) => globToRegExp(candidate.glob).test(file))
  );
  assert.ok(collector, "the current collector covers the representative subdirectories");
  const ku = knownUnexecuted(RELEASE_SUITES, COLLECTORS, baseline, UNIT_SUBDIRECTORY_FILES);
  assert.equal(
    ku.collectors.some((candidate) => candidate.glob === collector.glob),
    false,
    "the CI collector must be canonical, not an unexecuted exception"
  );
});

test("unit CI inventory stays aligned with the globs executed by test:unit:ci:shard", () => {
  const { scripts } = JSON.parse(
    readFileSync(new URL("../../package.json", import.meta.url), "utf8")
  );
  const shard = scripts["test:unit:ci:shard"];
  assert.equal(typeof shard, "string", "the CI shard command exists");
  const globs = [...new Set(shard.match(/tests\/unit\/[^\s"']+/g) ?? [])];
  assert.ok(globs.length > 0, "the shard command declares its unit test globs");
  const ku = knownUnexecuted(["test:unit:ci"], COLLECTORS, baseline, []);
  for (const glob of globs) {
    assert.ok(
      COLLECTORS.some((collector) => collector.glob === glob),
      `${glob} has a registered collector`
    );
    assert.equal(
      ku.collectors.some((collector) => collector.glob === glob),
      false,
      `${glob} is executed by CI and must belong to its acceptance scope`
    );
  }
});

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
