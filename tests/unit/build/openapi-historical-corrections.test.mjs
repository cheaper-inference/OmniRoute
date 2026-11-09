import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  assessOpenapiHistoricalCorrections,
  hashOpenapiSource,
  validateOpenapiReport,
} from "../../../scripts/check/openapiHistoricalCorrections.mjs";
import { evaluateOpenapiRatchet } from "../../../scripts/check/check-openapi-breaking.mjs";

const reviewed = JSON.parse(
  readFileSync(new URL("../../fixtures/openapi/historical-correction-policy.json", import.meta.url))
);
const extra = {
  id: "api-path-removed-without-deprecation",
  level: 3,
  operation: "GET",
  path: "/unreviewed-endpoint",
  section: "paths",
  fingerprint: "abcdef012345",
};

function fixture() {
  const policy = structuredClone(reviewed);
  const entry = policy.corrections[0];
  const baseSpec = Buffer.from("old specification fixture");
  const candidateSpec = Buffer.from("corrected specification fixture");
  entry.baseSpecSha256 = hashOpenapiSource(baseSpec);
  entry.candidateSpecSha256 = hashOpenapiSource(candidateSpec);
  const sources = new Map();
  for (const source of entry.contractSources) {
    const bytes = Buffer.from("explicit pre-existing contract: " + source.path);
    source.baseSha256 = source.candidateSha256 = hashOpenapiSource(bytes);
    sources.set(source.path, { base: bytes, candidate: bytes, worktree: bytes });
  }
  return {
    report: structuredClone(entry.findings),
    policy,
    comparison: { baseSha: entry.baseSha, candidateSha: "a".repeat(40) },
    baseSpec,
    candidateSpec,
    scannerVersion: "1.19.1",
    readContract: (path) => sources.get(path),
    sources,
    now: new Date("2026-11-04T23:00:00Z"),
  };
}

test("the ten reviewed findings remain raw and are accepted only with their complete bindings", () => {
  const f = fixture();
  const before = JSON.stringify(f.report);
  const result = assessOpenapiHistoricalCorrections(f);
  assert.equal(result.rawCount, 10);
  assert.equal(result.acceptedCount, 10);
  assert.equal(result.unknownCount, 0);
  assert.deepEqual(
    result.accepted.map((row) => row.finding),
    f.report
  );
  assert.equal(JSON.stringify(f.report), before);
  assert.equal(
    evaluateOpenapiRatchet({ current: result.unknownCount, baseline: 5 }).regressed,
    false
  );
});

test("an extra finding remains blocking even when the unknown count is below five", () => {
  const f = fixture();
  f.report.push(extra);
  const result = assessOpenapiHistoricalCorrections(f);
  assert.equal(result.rawCount, 11);
  assert.equal(result.acceptedCount, 10);
  assert.deepEqual(result.unknown, [extra]);
  assert.equal(
    evaluateOpenapiRatchet({ current: result.unknownCount, baseline: 5 }).regressed,
    true
  );
});

for (const side of ["baseSpec", "candidateSpec"]) {
  test("an altered " + side + " cannot borrow the historical approval", () => {
    const f = fixture();
    f[side] = Buffer.from("changed endpoint body, status or response type");
    assert.throws(() => assessOpenapiHistoricalCorrections(f), /historical-spec-binding-mismatch/);
  });
}

for (const side of ["base", "candidate", "worktree"]) {
  test("a changed " + side + " contract source invalidates the approval", () => {
    const f = fixture();
    const bytes = f.sources.values().next().value;
    bytes[side] = Buffer.from("changed runtime contract");
    assert.throws(
      () => assessOpenapiHistoricalCorrections(f),
      /historical-contract-binding-mismatch/
    );
  });
}

test("a different immutable event base receives no suppression", () => {
  const f = fixture();
  f.comparison.baseSha = "b".repeat(40);
  f.readContract = () => assert.fail("inactive policy must not read unrelated contract sources");
  const result = assessOpenapiHistoricalCorrections(f);
  assert.equal(result.acceptedCount, 0);
  assert.equal(result.unknownCount, 10);
});

test("zero findings on a corrected base pass without a global stale-record failure", () => {
  const f = fixture();
  f.report = [];
  f.comparison.baseSha = "b".repeat(40);
  f.baseSpec = f.candidateSpec;
  f.now = new Date("2027-01-01T00:00:00Z");
  f.readContract = () => assert.fail("inactive history must not read sources");
  const result = assessOpenapiHistoricalCorrections(f);
  assert.equal(result.rawCount, 0);
  assert.equal(result.acceptedCount, 0);
  assert.equal(result.unknownCount, 0);
});

test("an active binding cannot silently accept a missing or changed expected finding", () => {
  const f = fixture();
  f.report[0].fingerprint = "123456abcdef";
  assert.throws(
    () => assessOpenapiHistoricalCorrections(f),
    /historical-finding-missing-or-changed/
  );
});

test("duplicate scanner findings are invalid rather than deduplicated into acceptance", () => {
  const f = fixture();
  f.report.push(structuredClone(f.report[0]));
  assert.throws(() => assessOpenapiHistoricalCorrections(f), /duplicate-finding/);
});

test("a reused fingerprint with a different endpoint is also ambiguous", () => {
  const f = fixture();
  f.report.push({ ...f.report[0], path: "/other" });
  assert.throws(() => assessOpenapiHistoricalCorrections(f), /duplicate-finding/);
});

for (const report of [
  null,
  {},
  [null],
  [{}],
  [{ ...extra, level: "3" }],
  [{ ...extra, operation: "*" }],
]) {
  test("invalid report is rejected: " + JSON.stringify(report), () => {
    assert.throws(() => validateOpenapiReport(report), /invalid-report|invalid-finding/);
  });
}

for (const [field, value] of [
  ["justification", ""],
  ["trackingIssue", "https://github.com/cheaper-inference/OmniRoute/issues/1"],
  ["status", "ignore"],
]) {
  test("a correction without its reviewed " + field + " is invalid", () => {
    const f = fixture();
    f.policy.corrections[0][field] = value;
    assert.throws(
      () => assessOpenapiHistoricalCorrections(f),
      /unbounded-or-undocumented-correction/
    );
  });
}

test("duplicate correction entries are rejected", () => {
  const f = fixture();
  f.policy.corrections.push(structuredClone(f.policy.corrections[0]));
  assert.throws(
    () => assessOpenapiHistoricalCorrections(f),
    /unbounded-or-undocumented-correction/
  );
});

test("a changed stored contract pin cannot authorize current source", () => {
  const f = fixture();
  f.policy.corrections[0].contractSources[0].baseSha256 = "0".repeat(64);
  assert.throws(
    () => assessOpenapiHistoricalCorrections(f),
    /historical-contract-binding-mismatch/
  );
});

test("an active expired correction cannot approve the report", () => {
  const f = fixture();
  f.now = new Date("2026-12-04T00:00:00Z");
  assert.throws(() => assessOpenapiHistoricalCorrections(f), /historical-correction-expired/);
});

test("another scanner version cannot reuse reviewed fingerprints", () => {
  const f = fixture();
  f.scannerVersion = "1.20.0";
  assert.throws(() => assessOpenapiHistoricalCorrections(f), /historical-scanner-binding-mismatch/);
});

test("source bindings cannot escape the tracked contract-source scope", () => {
  const f = fixture();
  f.policy.corrections[0].contractSources[0].path = "src/../.env";
  assert.throws(() => assessOpenapiHistoricalCorrections(f), /invalid-contract-source-binding/);
});
