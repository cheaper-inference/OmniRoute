import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import {
  assertCodeqlSetup,
  selectCodeqlAnalyses,
} from "../../../scripts/quality/codeql-admission.mjs";

const policy = JSON.parse(
  fs.readFileSync(new URL("../../../config/quality/codeql-admission-policy.json", import.meta.url))
);
policy.activationStatus = "READY_AFTER_ADMIN_READBACK";
const observedAt = "2026-10-30T18:05:00Z";
const setup = {
  ...policy.reviewedSetup,
  state: "not-configured",
  updated_at: null,
  observedAt,
};
const context = {
  repository: "owner/repo",
  ref: "refs/heads/fix/recovery",
  sha: "a".repeat(40),
};
const analyses = (createdAt) =>
  policy.languages.map((language, i) => ({
    id: i + 1,
    ref: context.ref,
    commit_sha: context.sha,
    category: `/language:${language}`,
    analysis_key: policy.analysisKey,
    created_at: createdAt,
    error: "",
    warning: "",
    rules_count: policy.minimumRules[language],
    results_count: 0,
    tool: { name: "CodeQL", version: "2.27.3" },
    environment: JSON.stringify({
      language,
      category: `/language:${language}`,
      "build-mode": "none",
    }),
  }));

test("disabled Default Setup may have a null update timestamp after an observed transition", () => {
  assert.doesNotThrow(() => assertCodeqlSetup(setup, policy));
  assert.equal(
    selectCodeqlAnalyses(analyses("2026-10-30T18:06:00Z"), context, policy, setup).length,
    4
  );
});

test("a disabled setup with no valid observation still cannot activate a scan", () => {
  for (const value of [null, undefined, "", "not-a-date"]) {
    assert.throws(
      () => assertCodeqlSetup({ ...setup, observedAt: value }, policy),
      /SCAN_SETUP_READBACK_INVALID/
    );
  }
});

test("Default Setup still requires its actual configuration update timestamp", () => {
  assert.throws(
    () => assertCodeqlSetup({ ...setup, state: "configured" }, { ...policy, setup: "default" }),
    /SCAN_SETUP_DATE_INVALID/
  );
});

test("an invalid retained timestamp or a newer configuration cannot precede the readback", () => {
  assert.throws(
    () => assertCodeqlSetup({ ...setup, updated_at: "not-a-date" }, policy),
    /SCAN_SETUP_DATE_INVALID/
  );
  assert.throws(
    () => assertCodeqlSetup({ ...setup, updated_at: "2026-10-30T18:07:00Z" }, policy),
    /SCAN_SETUP_READBACK_INVALID/
  );
});

test("advanced scan evidence must follow the readback even when an older timestamp is retained", () => {
  const retained = { ...setup, updated_at: "2026-10-30T18:00:00Z" };
  assert.throws(
    () => selectCodeqlAnalyses(analyses("2026-10-30T18:04:00Z"), context, policy, retained),
    /SCAN_PROFILE_STALE/
  );
});

test("null default timestamp does not relax the four-language or query-suite contracts", () => {
  assert.throws(
    () => assertCodeqlSetup({ ...setup, languages: ["python"] }, policy),
    /SCAN_LANGUAGE_COVERAGE_CHANGED/
  );
  assert.throws(
    () => assertCodeqlSetup({ ...setup, query_suite: "extended" }, policy),
    /SCAN_SETUP_CHANGED/
  );
});
