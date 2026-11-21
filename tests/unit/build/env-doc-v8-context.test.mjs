import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { scanCodeVars } from "../../../scripts/check/check-env-doc-sync.mjs";

const coverageHelpers = {
  "scripts/ci/atomic-tsx-cache.mjs": ["OMNIROUTE_CI_SYNC_TSX_CACHE", "TMPDIR"],
  "scripts/ci/native-worker-v8-layout.mjs": ["NODE_V8_COVERAGE"],
  "scripts/check/migration-commutation.ts": ["NODE_V8_COVERAGE", "OMNIROUTE_CI_SYNC_TSX_CACHE"],
  "scripts/perf/messages-route-memory-profile.ts": ["NODE_V8_COVERAGE"],
};

function scanFixture(t, inputs) {
  const cwd = mkdtempSync(join(tmpdir(), "omniroute-env-v8-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  for (const [file, names] of Object.entries(inputs)) {
    const path = join(cwd, file);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, names.map((name) => `void process.env.${name};\n`).join(""));
  }
  return scanCodeVars({ cwd });
}

test("coverage protocol inputs are scoped to the helper that uses them", (t) => {
  assert.deepEqual(scanFixture(t, coverageHelpers), new Set());
});

test("the same coverage protocol names remain visible in other code", (t) => {
  const names = new Set(Object.values(coverageHelpers).flat());
  assert.deepEqual(
    scanFixture(t, {
      ...coverageHelpers,
      "scripts/check/other.mjs": [...names],
      "src/other.ts": [...names],
    }),
    names
  );
});

test("coverage helpers still report unknown inputs and names scoped to another helper", (t) => {
  const native = "scripts/ci/native-worker-v8-layout.mjs";
  const profile = "scripts/perf/messages-route-memory-profile.ts";
  assert.deepEqual(
    scanFixture(t, {
      ...coverageHelpers,
      [native]: [...coverageHelpers[native], "TMPDIR", "UNKNOWN_COVERAGE_HELPER_INPUT"],
      [profile]: [...coverageHelpers[profile], "OMNIROUTE_CI_SYNC_TSX_CACHE"],
    }),
    new Set(["TMPDIR", "UNKNOWN_COVERAGE_HELPER_INPUT", "OMNIROUTE_CI_SYNC_TSX_CACHE"])
  );
});
