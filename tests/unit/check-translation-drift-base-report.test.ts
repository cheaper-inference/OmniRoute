import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { partitionAgainstBase } from "../../scripts/i18n/check-translation-drift.mjs";

const recorded = "a".repeat(64);
const current = "b".repeat(64);
const changedSource = (rel: string) => ({ rel, reason: "source-changed", recorded, current });

// release/v3.8.53 carried 14 sources edited without a re-translation (translation backend down
// until ~2026-10-24); every unrelated PR inherited that red. The PR gate now fails only on drift
// the PR itself introduces (2026-10-20).
const base = {
  driftedSources: [changedSource("README.md"), changedSource("docs/reference/ENVIRONMENT.md")],
  missingTargets: [{ rel: "docs/security/GUARDRAILS.md", locale: "ne" }],
  driftedTargets: [],
};

test("drift the base already carried is inherited and does not fail the gate", () => {
  const report = {
    driftedSources: [changedSource("README.md"), changedSource("docs/reference/ENVIRONMENT.md")],
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
      changedSource("README.md"),
      changedSource("docs/architecture/ARCHITECTURE.md"), // edited by the PR, not re-translated
    ],
    missingTargets: [],
    driftedTargets: [{ rel: "docs/routing/AUTO-COMBO.md", locale: "pt-BR", recorded, current }], // mirror hand-edited by the PR
  };
  const p = partitionAgainstBase(report, base);
  assert.equal(p.ok, false);
  assert.deepEqual(
    p.fresh.driftedSources.map((x) => x.rel),
    ["docs/architecture/ARCHITECTURE.md"]
  );
  assert.deepEqual(p.fresh.driftedTargets, [
    { rel: "docs/routing/AUTO-COMBO.md", locale: "pt-BR", recorded, current },
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

test("another source edit on an already drifted path is fresh", () => {
  const report = {
    ...base,
    driftedSources: [{ ...base.driftedSources[0], current: "c".repeat(64) }],
    missingTargets: [],
  };
  const partition = partitionAgainstBase(report, base);
  assert.equal(partition.ok, false);
  assert.equal(partition.inheritedCount, 0);
  assert.deepEqual(partition.fresh.driftedSources, report.driftedSources);
});

test("incomplete hash evidence never grants inherited status to changed files", () => {
  const invalidHashes = [undefined, null, "", 42, "not-a-hash", "z".repeat(64)];
  for (const bucket of ["driftedSources", "driftedTargets", "staleTargets"]) {
    for (const field of ["recorded", "current"]) {
      for (const value of invalidHashes) {
        const entry = {
          rel: "README.md",
          ...(bucket === "driftedSources" ? { reason: "source-changed" } : { locale: "pt-BR" }),
          recorded,
          current,
          [field]: value,
        };
        const report = { [bucket]: [entry] };
        const partition = partitionAgainstBase(report, report);
        assert.equal(partition.ok, false, `${bucket}.${field}: ${String(value)}`);
        assert.equal(partition.inheritedCount, 0);
        assert.equal(partition.freshCount, 1);
      }
    }
  }
});

test("unrecognized failure reasons cannot authorize inheritance", () => {
  for (const reason of [undefined, "source-read-error", "source-stale"]) {
    const report = { driftedSources: [{ ...changedSource("README.md"), reason }] };
    assert.equal(partitionAgainstBase(report, report).ok, false, String(reason));
  }
  for (const bucket of ["missingTargets", "driftedTargets"]) {
    const report = {
      [bucket]: [{ rel: "README.md", locale: "pt-BR", reason: "source-stale", recorded, current }],
    };
    assert.equal(partitionAgainstBase(report, report).ok, false, bucket);
  }
});

test("another target edit or recorded-hash change is fresh even at the same source and locale", () => {
  const target = { rel: "README.md", locale: "pt-BR", recorded, current };
  const targetBase = { driftedTargets: [target] };
  assert.equal(partitionAgainstBase(targetBase, targetBase).ok, true);
  for (const field of ["recorded", "current"]) {
    const report = { driftedTargets: [{ ...target, [field]: "c".repeat(64) }] };
    const partition = partitionAgainstBase(report, targetBase);
    assert.equal(partition.ok, false, field);
    assert.deepEqual(partition.fresh.driftedTargets, report.driftedTargets);
  }
});

test("unchanged missing sources remain inherited but changed failure reasons are fresh", () => {
  const missing = { driftedSources: [{ rel: "README.md", reason: "source-missing" }] };
  assert.equal(partitionAgainstBase(missing, missing).ok, true);
  assert.equal(partitionAgainstBase(missing, base).ok, false);
  assert.equal(
    partitionAgainstBase({ driftedSources: [base.driftedSources[0]] }, missing).ok,
    false
  );
});

test("source and locale fields cannot collide through a path delimiter", () => {
  const targetBase = { missingTargets: [{ rel: "docs/a::b", locale: "c" }] };
  const report = { missingTargets: [{ rel: "docs/a", locale: "b::c" }] };
  assert.equal(partitionAgainstBase(report, targetBase).ok, false);
});

test("CLI permits identical inherited bytes and blocks new source, target and deletion drift", (t) => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-i18n-base-identity-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const hash = (text: string) => createHash("sha256").update(text).digest("hex");
  const sourcePath = join(root, "README.md");
  const targetPath = join(root, "docs/i18n/pt-BR/README.md");
  const basePath = join(root, "base-report.json");
  const sourceText = "Base changed source.\n";
  const targetText = "Base changed translation.\n";
  mkdirSync(join(root, "docs/i18n/pt-BR"), { recursive: true });
  mkdirSync(join(root, "config"));
  writeFileSync(join(root, "config/i18n.json"), JSON.stringify({ locales: [{ code: "pt-BR" }] }));
  writeFileSync(sourcePath, sourceText);
  writeFileSync(targetPath, targetText);
  writeFileSync(
    join(root, ".i18n-state.json"),
    JSON.stringify({
      sources: {
        "README.md": {
          source_hash: hash("Original source.\n"),
          locales: {
            "pt-BR": {
              source_hash: hash("Original source.\n"),
              target_hash: hash("Original mirror.\n"),
            },
          },
        },
      },
    })
  );
  const checker = fileURLToPath(
    new URL("../../scripts/i18n/check-translation-drift.mjs", import.meta.url)
  );
  const run = (...args: string[]) => {
    const result = spawnSync(
      process.execPath,
      [checker, "--root", root, "--all", "--json", ...args],
      {
        cwd: root,
        env: { HOME: root, LANG: "C.UTF-8" },
        encoding: "utf8",
        timeout: 5000,
      }
    );
    assert.equal(result.error, undefined);
    assert.equal(result.signal, null);
    assert.equal(result.stderr, "");
    return { status: result.status, report: JSON.parse(result.stdout) };
  };

  const baseline = run("--warn");
  assert.equal(baseline.status, 0);
  assert.equal(baseline.report.driftedSources.length, 1);
  assert.equal(baseline.report.driftedTargets.length, 1);
  writeFileSync(basePath, JSON.stringify(baseline.report));
  const identical = run("--base-report", basePath);
  assert.equal(identical.status, 0);
  assert.equal(identical.report.ok, true);
  assert.equal(identical.report.inherited.driftedSources.length, 1);
  assert.equal(identical.report.inherited.driftedTargets.length, 1);

  writeFileSync(sourcePath, "The PR edits the source again.\n");
  const changedSourceReport = run("--base-report", basePath);
  assert.equal(changedSourceReport.status, 1);
  assert.equal(changedSourceReport.report.fresh.driftedSources.length, 1);
  assert.equal(changedSourceReport.report.inherited.driftedTargets.length, 1);

  writeFileSync(sourcePath, sourceText);
  writeFileSync(targetPath, "The PR edits the mirror again.\n");
  const changedTargetReport = run("--base-report", basePath);
  assert.equal(changedTargetReport.status, 1);
  assert.equal(changedTargetReport.report.fresh.driftedTargets.length, 1);
  assert.equal(changedTargetReport.report.inherited.driftedSources.length, 1);

  rmSync(sourcePath);
  const deleted = run("--base-report", basePath);
  assert.equal(deleted.status, 1);
  assert.deepEqual(deleted.report.fresh.driftedSources, [
    { rel: "README.md", reason: "source-missing" },
  ]);
});
