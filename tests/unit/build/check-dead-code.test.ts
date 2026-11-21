import test from "node:test";
import assert from "node:assert/strict";
// @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
import { parseKnipMetrics } from "../../../scripts/check/check-dead-code.mjs";

// ---------------------------------------------------------------------------
// Fixtures — synthetic JSON with knip format --reporter json
// O reporter emite: { issues: Array<{ file, exports?, files?, types?, ... }> }
// ---------------------------------------------------------------------------

/** Returns a valid empty JSON (no problems found). */
function makeEmptyReport() {
  return { issues: [] };
}

/** File with 2 dead exports and 1 dead type. */
function makeReportWithExports() {
  return {
    issues: [
      {
        file: "src/lib/utils.ts",
        exports: [
          { name: "unusedHelper", line: 10, col: 0 },
          { name: "deadFn", line: 20, col: 0 },
        ],
        types: [
          { name: "DeadType", line: 5, col: 0 },
        ],
      },
    ],
  };
}

/** Archive file (entire not imported anywhere). */
function makeReportWithDeadFile() {
  return {
    issues: [
      {
        file: "src/lib/orphan.ts",
        files: [{ name: "src/lib/orphan.ts" }],
      },
    ],
  };
}

/** Mixed: 1 archive file + 3 exports archived in another file. */
function makeReportMixed() {
  return {
    issues: [
      {
        file: "src/lib/orphan.ts",
        files: [{ name: "src/lib/orphan.ts" }],
      },
      {
        file: "src/lib/active.ts",
        exports: [
          { name: "deadExport1", line: 1, col: 0 },
          { name: "deadExport2", line: 2, col: 0 },
        ],
        nsExports: [
          { name: "deadNsExport", line: 3, col: 0 },
        ],
      },
    ],
  };
}

/** Multiple types of dead exports: types, nsExports, nsTypes, enumMembers. */
function makeReportAllExportTypes() {
  return {
    issues: [
      {
        file: "src/lib/all-types.ts",
        exports: [{ name: "e1", line: 1, col: 0 }],
        types: [{ name: "t1", line: 2, col: 0 }],
        nsExports: [{ name: "ns1", line: 3, col: 0 }],
        nsTypes: [{ name: "nst1", line: 4, col: 0 }],
        enumMembers: [{ name: "em1", line: 5, col: 0 }],
        namespaceMembers: [{ name: "nm1", line: 6, col: 0 }],
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Testes
// ---------------------------------------------------------------------------

test("parseKnipMetrics: empty report returns all zero", () => {
  const result = parseKnipMetrics(makeEmptyReport());
  assert.deepEqual(result, { deadExports: 0, deadFiles: 0, deadTotal: 0 });
});

test("parseKnipMetrics: counts dead exports and dead types correctly", () => {
  const result = parseKnipMetrics(makeReportWithExports());
  // 2 exports + 1 type = 3 deadExports, 0 deadFiles
  assert.equal(result.deadExports, 3);
  assert.equal(result.deadFiles, 0);
  assert.equal(result.deadTotal, 3);
});

test("parseKnipMetrics: counts archive files correctly", () => {
  const result = parseKnipMetrics(makeReportWithDeadFile());
  assert.equal(result.deadExports, 0);
  assert.equal(result.deadFiles, 1);
  assert.equal(result.deadTotal, 1);
});

test("parseKnipMetrics: mixed report — archive files + archive exports", () => {
  const result = parseKnipMetrics(makeReportMixed());
  // 1 archive file + (2 exports + 1 nsExport) = 4 total
  assert.equal(result.deadExports, 3);
  assert.equal(result.deadFiles, 1);
  assert.equal(result.deadTotal, 4);
});

test("parseKnipMetrics: sum all dead export types (exports/types/nsExports/nsTypes/enumMembers/namespaceMembers)", () => {
  const result = parseKnipMetrics(makeReportAllExportTypes());
  // 1 of each type × 6 types = 6 deadExports
  assert.equal(result.deadExports, 6);
  assert.equal(result.deadFiles, 0);
  assert.equal(result.deadTotal, 6);
});

test("parseKnipMetrics: null returns zeros (invalid input)", () => {
  const result = parseKnipMetrics(null);
  assert.deepEqual(result, { deadExports: 0, deadFiles: 0, deadTotal: 0 });
});

test("parseKnipMetrics: input sem campo issues retorna zeros", () => {
  const result = parseKnipMetrics({ otherField: 123 });
  assert.deepEqual(result, { deadExports: 0, deadFiles: 0, deadTotal: 0 });
});

test("parseKnipMetrics: entry without export fields does not increment counter", () => {
  // File that appears in the list but with no dead exports and no files
  const report = {
    issues: [
      { file: "src/lib/clean.ts" },
    ],
  };
  const result = parseKnipMetrics(report);
  assert.deepEqual(result, { deadExports: 0, deadFiles: 0, deadTotal: 0 });
});

test("parseKnipMetrics: deadTotal == deadExports + deadFiles always", () => {
  const report = makeReportMixed();
  const result = parseKnipMetrics(report);
  assert.equal(result.deadTotal, result.deadExports + result.deadFiles);
});

test("parseKnipMetrics: multiple archives in the same report", () => {
  const report = {
    issues: [
      { file: "src/lib/orphan1.ts", files: [{ name: "src/lib/orphan1.ts" }] },
      { file: "src/lib/orphan2.ts", files: [{ name: "src/lib/orphan2.ts" }] },
      { file: "src/lib/orphan3.ts", files: [{ name: "src/lib/orphan3.ts" }] },
    ],
  };
  const result = parseKnipMetrics(report);
  assert.equal(result.deadFiles, 3);
  assert.equal(result.deadExports, 0);
  assert.equal(result.deadTotal, 3);
});
