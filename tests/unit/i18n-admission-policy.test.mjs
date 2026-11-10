import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const checker = fileURLToPath(
  new URL("../../scripts/i18n/check-translation-drift.mjs", import.meta.url)
);
const hash = (value) => createHash("sha256").update(value).digest("hex");

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "omniroute-i18n-admission-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "config"));
  mkdirSync(join(root, "docs/i18n/pt-BR"), { recursive: true });
  writeFileSync(join(root, "config/i18n.json"), JSON.stringify({ locales: [{ code: "pt-BR" }] }));
  const source = "# Fixture\n\n## Storage\n\nRequests are kept in memory.\n";
  const mirror = "# Exemplo\n\n## Armazenamento\n\nSolicitações ficam na memória.\n";
  const sourcePath = join(root, "README.md");
  const targetPath = join(root, "docs/i18n/pt-BR/README.md");
  writeFileSync(sourcePath, source);
  writeFileSync(targetPath, mirror);
  const record = { source_hash: hash(source), target_hash: hash(mirror) };
  const entry = { source_hash: hash(source), locales: { "pt-BR": record } };
  const state = { sources: { "README.md": entry } };
  const save = () => writeFileSync(join(root, ".i18n-state.json"), JSON.stringify(state));
  save();
  function run(...args) {
    const result = spawnSync(process.execPath, [checker, "--root", root, "--json", ...args], {
      cwd: root,
      env: { HOME: root, LANG: "C.UTF-8" },
      encoding: "utf8",
      timeout: 10000,
    });
    assert.equal(result.error, undefined);
    assert.equal(result.signal, null);
    return { status: result.status, report: JSON.parse(result.stdout) };
  }
  function baseline(report = run("--baseline-evidence").report) {
    const file = join(root, "baseline.json");
    writeFileSync(file, JSON.stringify(report));
    return file;
  }
  return {
    root,
    source,
    mirror,
    sourcePath,
    targetPath,
    record,
    entry,
    state,
    save,
    run,
    baseline,
  };
}

test("absolute admission accepts a complete unchanged source and mirror", (t) => {
  const result = fixture(t).run();
  assert.equal(result.status, 0);
  assert.equal(result.report.ok, true);
  assert.equal(result.report.checkedSources, 1);
  assert.equal(result.report.checkedTargets, 1);
});

test("absolute admission blocks stale locale provenance even when all disk hashes match", (t) => {
  const f = fixture(t);
  const changed = f.source + "\nNew behavior.\n";
  writeFileSync(f.sourcePath, changed);
  f.entry.source_hash = hash(changed);
  f.save();
  const result = f.run();
  assert.equal(result.report.driftedSources.length, 0);
  assert.equal(result.report.driftedTargets.length, 0);
  assert.equal(result.report.staleTargets.length, 1);
  assert.equal(result.report.ok, false);
  assert.equal(result.status, 1);
});

test("absolute admission blocks a contradictory section cache", (t) => {
  const f = fixture(t);
  f.record.section_hashes = ["a".repeat(12)];
  f.save();
  const result = f.run();
  assert.equal(result.report.inconsistentSectionCaches.length, 1);
  assert.equal(result.status, 1);
  assert.equal(result.report.ok, false);
});

test("a target without a valid recorded hash is unverified, never green", (t) => {
  const f = fixture(t);
  for (const value of [undefined, null, "", "not-a-hash", "z".repeat(64)]) {
    f.record.target_hash = value;
    f.save();
    const result = f.run();
    assert.equal(result.status, 1, String(value));
    assert.equal(result.report.driftedTargets.length, 1);
    assert.equal(result.report.driftedTargets[0].reason, "target-hash-unverified");
  }
});

test("deleting a core source record cannot shrink admission coverage to zero", (t) => {
  const f = fixture(t);
  delete f.state.sources["README.md"];
  f.save();
  assert.equal(f.run().status, 1);
});

test("empty documentation scope cannot certify admission", (t) => {
  const f = fixture(t);
  delete f.state.sources["README.md"];
  f.save();
  unlinkSync(f.sourcePath);
  unlinkSync(f.targetPath);
  const result = f.run();
  assert.equal(result.status, 1);
  assert.equal(result.report.ok, false);
});

test("deleting a recorded core mirror cannot hide it from the default scope", (t) => {
  const f = fixture(t);
  unlinkSync(f.targetPath);
  const result = f.run();
  assert.equal(result.status, 1);
  assert.deepEqual(result.report.missingTargets, [{ rel: "README.md", locale: "pt-BR" }]);
});

test("deleting a recorded core English source remains a source failure", (t) => {
  const f = fixture(t);
  unlinkSync(f.sourcePath);
  const result = f.run();
  assert.equal(result.status, 1);
  assert.ok(result.report.driftedSources.some((row) => row.reason === "source-missing"));
});

test("a core mirror without its locale record cannot certify admission", (t) => {
  const f = fixture(t);
  delete f.entry.locales["pt-BR"];
  f.save();
  assert.equal(f.run().status, 1);
});

test("an invalid baseline never authorizes preparation", (t) => {
  const f = fixture(t);
  for (const report of [{}, { ok: true }, { ...f.run().report, checkedTargets: 0 }]) {
    const result = f.run("--preflight", "--base-report", f.baseline(report));
    assert.equal(result.status, 1);
    assert.equal(result.report.ok, false);
  }
});

test("ordinary PR preparation permits English work with exactly unchanged state and targets", (t) => {
  const f = fixture(t);
  const base = f.baseline();
  writeFileSync(f.sourcePath, f.source + "\nNew behavior.\n");
  const result = f.run("--preflight", "--base-report", base);
  assert.equal(result.status, 0);
  assert.equal(result.report.ok, true);
  assert.equal(result.report.mergeReady, false);
  assert.deepEqual(
    result.report.preparationPending.map((row) => row.rel),
    ["README.md"]
  );
  assert.equal(f.run().status, 1, "a preparation pass must not authorize final admission");
});

test("an edited mirror still blocks ordinary preparation alongside pending English work", (t) => {
  const f = fixture(t);
  const base = f.baseline();
  writeFileSync(f.sourcePath, f.source + "\nNew behavior.\n");
  writeFileSync(f.targetPath, f.mirror + "\nUnreviewed edit.\n");
  const result = f.run("--preflight", "--base-report", base);
  assert.equal(result.status, 1);
  assert.equal(result.report.mergeReady, false);
  assert.equal(result.report.fresh.driftedTargets.length, 1);
});

test("a partial source-hash adoption is not pending English preparation", (t) => {
  const f = fixture(t);
  const base = f.baseline();
  const changed = f.source + "\nNew behavior.\n";
  writeFileSync(f.sourcePath, changed);
  f.entry.source_hash = hash(changed);
  f.save();
  const result = f.run("--preflight", "--base-report", base);
  assert.equal(result.status, 1);
  assert.equal(result.report.mergeReady, false);
  assert.equal(result.report.preparationPending.length, 0);
  assert.equal(result.report.fresh.staleTargets.length, 1);
});

test("unchanged inherited evidence permits preparation but not final admission", (t) => {
  const f = fixture(t);
  writeFileSync(f.sourcePath, f.source + "\nExisting base debt.\n");
  const base = f.baseline();
  const result = f.run("--preflight", "--base-report", base);
  assert.equal(result.status, 0);
  assert.equal(result.report.mergeReady, false);
  assert.equal(result.report.inherited.driftedSources.length, 1);
  assert.equal(result.report.preparationPending.length, 0);
  assert.equal(f.run().status, 1);
});

test("a baseline from a different scope cannot authorize preparation", (t) => {
  const f = fixture(t);
  const base = f.baseline(f.run("--all", "--baseline-evidence").report);
  const result = f.run("--preflight", "--base-report", base);
  assert.equal(result.status, 1);
  assert.equal(result.report.ok, false);
});

test("changing translation metadata removes the English-only preparation exception", (t) => {
  const f = fixture(t);
  const base = f.baseline();
  writeFileSync(f.sourcePath, f.source + "\nNew behavior.\n");
  f.record.updated_at = "2026-11-09T00:00:00.000Z";
  f.save();
  const result = f.run("--preflight", "--base-report", base);
  assert.equal(result.status, 1);
  assert.equal(result.report.preparationPending.length, 0);
});

test("missing or malformed baseline identities cannot authorize English-only preparation", (t) => {
  const f = fixture(t);
  const complete = f.run("--baseline-evidence").report;
  writeFileSync(f.sourcePath, f.source + "\nNew behavior.\n");
  for (const mutate of [
    (report) => delete report.baselineEvidence,
    (report) => {
      report.baselineEvidence.sources = [];
    },
    (report) => {
      report.baselineEvidence.sources[0].recordSha256 = "";
    },
    (report) => {
      report.baselineEvidence.sources[0].targetSetSha256 = null;
    },
    (report) => {
      report.ok = false;
    },
  ]) {
    const report = structuredClone(complete);
    mutate(report);
    const result = f.run("--preflight", "--base-report", f.baseline(report));
    assert.equal(result.status, 1);
    assert.equal(result.report.ok, false);
  }
});
