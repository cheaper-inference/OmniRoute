import assert from "node:assert/strict";
import test from "node:test";
import {
  collectCodeqlEvidence,
  compareCodeqlEvidence,
} from "../../../scripts/quality/codeql-candidate-evidence.mjs";

const base = "a".repeat(40);
const candidate = "b".repeat(40);
const workflow = "c".repeat(40);
const identity = { workflow, run: "123", attempt: "1" };
const expected = { base, candidate, ...identity };

function report(...fingerprints) {
  return {
    version: "2.1.0",
    runs: [
      {
        tool: { driver: { name: "CodeQL", semanticVersion: "2.27.5", rules: [{ id: "js/test" }] } },
        invocations: [{ executionSuccessful: true }],
        results: fingerprints.map((fingerprint) => ({
          ruleId: "js/test",
          locations: [{ physicalLocation: { artifactLocation: { uri: "src/example.ts" } } }],
          partialFingerprints: { primaryLocationLineHash: fingerprint },
        })),
      },
    ],
  };
}

function collect(document, commit) {
  return collectCodeqlEvidence(document, { ...identity, commit, tree: "d".repeat(40) });
}

test("one removed result with a stable remaining fingerprint proves a diagnostic reduction", () => {
  const before = collect(report("keep", "remove"), base);
  const after = collect(report("keep"), candidate);
  const result = compareCodeqlEvidence(before, after, expected);
  assert.equal(result.verdict, "REDUCED");
  assert.equal(result.removed, 1);
  assert.equal(result.added, 0);
  assert.equal(result.qualityAcceptance, false);
  assert.ok(!JSON.stringify(result).includes("src/example.ts"));
});

test("a lower count with a new finding does not prove a reduction without regressions", () => {
  const before = collect(report("keep", "remove", "remove"), base);
  const after = collect(report("keep", "new"), candidate);
  const result = compareCodeqlEvidence(before, after, expected);
  assert.equal(result.verdict, "NEW_FINDINGS");
  assert.equal(result.removed, 2);
  assert.equal(result.added, 1);
});

test("rejects stale identities, different engine versions and different rule inventories", () => {
  const before = collect(report("keep"), base);
  const after = collect(report(), candidate);
  assert.throws(
    () => compareCodeqlEvidence(before, { ...after, run: "124" }, expected),
    /identity/
  );
  assert.throws(() => compareCodeqlEvidence(before, { ...after, version: "2.27.4" }, expected));
  assert.throws(() => compareCodeqlEvidence(before, { ...after, rules: "0".repeat(64) }, expected));
  assert.throws(() => compareCodeqlEvidence(before, after, { ...expected, candidate: base }));
});

test("fails closed for missing fingerprints, incomplete runs and suppressed results", () => {
  const missing = report("one");
  delete missing.runs[0].results[0].partialFingerprints;
  assert.throws(() => collect(missing, base), /fingerprint/);
  const incomplete = report();
  incomplete.runs[0].invocations[0].executionSuccessful = false;
  assert.throws(() => collect(incomplete, base), /complete/);
  const suppressed = report("one");
  suppressed.runs[0].results[0].suppressions = [{ kind: "inSource" }];
  assert.throws(() => collect(suppressed, base), /suppression/);
});
