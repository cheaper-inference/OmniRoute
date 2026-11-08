import { test } from "node:test";
import assert from "node:assert/strict";

import { partitionAgainstBase } from "../../scripts/i18n/check-translation-drift.mjs";

// release/v3.8.53 carried 14 sources edited without a re-translation (translation backend down
// until ~2026-10-24); every unrelated PR inherited that red. The PR gate now fails only on drift
// the PR itself introduces (2026-10-20).
const base = {
  driftedSources: [
    { rel: "README.md", reason: "source-changed" },
    { rel: "docs/reference/ENVIRONMENT.md", reason: "source-changed" },
  ],
  missingTargets: [{ rel: "docs/security/GUARDRAILS.md", locale: "ne" }],
  driftedTargets: [],
};

test("drift the base already carried is inherited and does not fail the gate", () => {
  const report = {
    driftedSources: [
      { rel: "README.md", reason: "source-changed" },
      { rel: "docs/reference/ENVIRONMENT.md", reason: "source-changed" },
    ],
    missingTargets: [{ rel: "docs/security/GUARDRAILS.md", locale: "ne" }],
    driftedTargets: [],
  };
  const p = partitionAgainstBase(report, base);
  assert.equal(p.ok, true);
  assert.equal(p.inheritedCount, 3);
  assert.equal(p.freshCount, 0);
});

test("drift this tree introduces is fresh and fails the gate", () => {
  const report = {
    driftedSources: [
      { rel: "README.md", reason: "source-changed" },
      { rel: "docs/architecture/ARCHITECTURE.md", reason: "source-changed" }, // edited by the PR, not re-translated
    ],
    missingTargets: [],
    driftedTargets: [{ rel: "docs/routing/AUTO-COMBO.md", locale: "pt-BR" }], // mirror hand-edited by the PR
  };
  const p = partitionAgainstBase(report, base);
  assert.equal(p.ok, false);
  assert.deepEqual(
    p.fresh.driftedSources.map((x) => x.rel),
    ["docs/architecture/ARCHITECTURE.md"]
  );
  assert.deepEqual(p.fresh.driftedTargets, [
    { rel: "docs/routing/AUTO-COMBO.md", locale: "pt-BR" },
  ]);
  assert.deepEqual(
    p.inherited.driftedSources.map((x) => x.rel),
    ["README.md"]
  );
});

test("a missing target is identified by source AND locale", () => {
  const report = {
    driftedSources: [],
    missingTargets: [
      { rel: "docs/security/GUARDRAILS.md", locale: "ne" }, // inherited
      { rel: "docs/security/GUARDRAILS.md", locale: "yo" }, // new
    ],
    driftedTargets: [],
  };
  const p = partitionAgainstBase(report, base);
  assert.equal(p.ok, false);
  assert.deepEqual(p.fresh.missingTargets, [{ rel: "docs/security/GUARDRAILS.md", locale: "yo" }]);
});

test("a PR that repairs inherited drift is green, and no base report means nothing is inherited", () => {
  const p = partitionAgainstBase(
    { driftedSources: [], missingTargets: [], driftedTargets: [] },
    base
  );
  assert.equal(p.ok, true);
  assert.equal(p.inheritedCount, 0);
  const q = partitionAgainstBase(
    { driftedSources: [{ rel: "README.md" }], missingTargets: [], driftedTargets: [] },
    null
  );
  assert.equal(q.ok, false);
  assert.equal(q.freshCount, 1);
});
