// Gate-exemption registry regression tests.
// Everything entering the repository is written in generic English: no issue
// numbers, no internal labels, no local paths.

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { checkGateExemptions } from "../../scripts/quality/gate-manifest.mjs";

const CHECKS = [
  "scripts/check/check-db-rules.mjs",
  "scripts/check/check-deps.mjs",
  "scripts/check/check-docs-symbols.mjs",
  "scripts/check/check-fetch-targets.mjs",
  "scripts/check/check-known-symbols.ts",
  "scripts/check/check-openapi-routes.mjs",
  "scripts/check/check-provider-consistency.ts",
  "scripts/check/check-public-creds.mjs",
  "scripts/check/check-route-guard-membership.ts",
  "scripts/check/check-migration-numbering.mjs",
  "scripts/check/check-error-helper.mjs",
];

function entry(id, overrides = {}) {
  return {
    id,
    kind: "constant",
    target: `scripts/check/example.mjs#${id.split("/").pop()}`,
    gate: "check:example",
    owner: "@maintainer",
    justification: "Pre-existing violation carried from the release branch.",
    since: "2026-11-19",
    reference: "#17028",
    scope: ["src/lib/example.ts"],
    diffScope: false,
    lastReviewedRelease: "v3.8.55",
    ...overrides,
  };
}

function fixture(overrides = {}) {
  const registry = {
    schemaVersion: 1,
    scope: "One entry per exemption. Membership does not imply execution.",
    baseline: { exemptions: 2, constants: 2, files: 0 },
    diffScopeChecks: CHECKS,
    exemptions: [entry("check:example/KNOWN_A"), entry("check:example/KNOWN_B")],
    ...overrides,
  };
  return {
    registry,
    baseLookup: "missing",
    bootstrap: true,
    detectedConstants: ["KNOWN_A", "KNOWN_B"],
    detectedFiles: [],
    knownTargets: ["scripts/check/example.mjs"],
    markerFiles: CHECKS,
    workflowText: "run: npm run check:gate-exemptions\n",
    profileAliases: ["check:example", "check:gate-manifest"],
    releases: ["v3.8.56", "v3.8.55", "v3.8.54", "v3.8.53", "v3.8.52", "v3.8.51", "v3.8.50"],
    now: "2026-11-19",
  };
}

const run = (input) => checkGateExemptions(input);

test("a declared inventory with all checks wired is green", () => {
  const result = run(fixture());
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);
  assert.deepEqual(result.summary, { new: 0, frozen: 2, total: 2, ratchet: "ok" });
});

test("a detected constant with no registry entry is refused by name", () => {
  const input = fixture();
  input.detectedConstants.push("KNOWN_NEW");
  const result = run(input);
  assert.match(result.errors.join(), /KNOWN_NEW/);
});

test("an entry pointing at a missing target is refused", () => {
  const input = fixture();
  input.registry.exemptions[0].target = "scripts/check/gone.mjs#KNOWN_A";
  const result = run(input);
  assert.match(result.errors.join(), /target.*KNOWN_A|KNOWN_A.*target/);
});

test("a missing owner, undated justification or invalid reference is refused", () => {
  const input = fixture();
  delete input.registry.exemptions[0].owner;
  input.registry.exemptions[1].reference = "later";
  const result = run(input);
  assert.match(result.errors.join(), /owner/);
  assert.match(result.errors.join(), /reference/);
});

test("the total never grows beyond the declared baseline", () => {
  const input = fixture();
  input.registry.exemptions.push(entry("check:example/KNOWN_C"));
  const result = run(input);
  assert.equal(result.summary.ratchet, "red");
  assert.match(result.errors.join(), /KNOWN_C/);
});

test("removing an entry lowers the total without turning the baseline into a floor", () => {
  const input = fixture();
  input.registry.exemptions.pop();
  input.detectedConstants.pop();
  const result = run(input);
  assert.deepEqual(result.errors, []);
  assert.equal(result.summary.total, 1);
  assert.equal(result.summary.ratchet, "ok");
});

test("storage returns to its baseline after an entry is added and removed", () => {
  const input = fixture();
  const start = input.registry.exemptions.length;
  input.registry.exemptions.push(entry("check:example/KNOWN_C"));
  input.detectedConstants.push("KNOWN_C");
  assert.equal(run(input).summary.total, start + 1);
  input.registry.exemptions.pop();
  input.detectedConstants.pop();
  assert.equal(run(input).summary.total, start);
});

test("an entry not reviewed for two releases is reported without blocking", () => {
  const input = fixture();
  input.registry.exemptions[0].lastReviewedRelease = "v3.8.50";
  const result = run(input);
  assert.deepEqual(result.errors, []);
  assert.match(result.warnings.join(), /REVIEW-DUE/);
  assert.match(result.warnings.join(), /v3\.8\.50/);
});

test("a check stripped of its diff-scope marker is refused", () => {
  const input = fixture();
  input.markerFiles = CHECKS.filter((f) => f !== "scripts/check/check-db-rules.mjs");
  const result = run(input);
  assert.match(result.errors.join(), /check-db-rules\.mjs/);
});

test("a base at job level or an exemption alias in a scan profile is refused", () => {
  const input = fixture();
  input.workflowText =
    "jobs:\n  lint:\n    env:\n      BASE: deadbeef\n    run: npm run check:gate-exemptions\n";
  input.profileAliases.push("check:gate-exemptions");
  const result = run(input);
  assert.match(result.errors.join(), /job-level BASE/);
  assert.match(result.errors.join(), /check:gate-exemptions/);
});

test("a failed base lookup is not masked by the candidate baseline", () => {
  const input = fixture();
  input.baseLookup = "invalid";
  input.bootstrap = false;
  const result = run(input);
  assert.match(result.errors.join(), /cannot verify the exemption ratchet against the base/);
  assert.match(result.errors.join(), /invalid/);
});

test("the committed registry declares every exemption found in the tree", () => {
  const registry = JSON.parse(readFileSync("config/quality/gate-exemptions.json", "utf8"));
  assert.equal(registry.schemaVersion, 1);
  // Completeness is checked by the detector/identity rules above; the ratchet
  // only requires that the committed total never exceeds the frozen baseline.
  assert.ok(registry.exemptions.length <= registry.baseline.exemptions);
  assert.equal(registry.diffScopeChecks.length, 11);
  const ids = new Set(registry.exemptions.map((e) => e.id));
  assert.equal(ids.size, registry.exemptions.length);
  for (const e of registry.exemptions) {
    assert.match(e.reference, /^(#\d+|https:\/\/)/);
    assert.match(e.since, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Array.isArray(e.scope));
  }
});
