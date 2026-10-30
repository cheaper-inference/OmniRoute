import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { partitionAgainstBase } from "../../scripts/i18n/check-translation-drift.mjs";
import { sectionHashes } from "../../scripts/i18n/lib/section-cache.mjs";

const hash = (text) => createHash("sha256").update(text).digest("hex");
const bucket = "inconsistentSectionCaches";
const item = {
  rel: "README.md",
  locale: "pt-BR",
  reason: "section-hashes-mismatch",
  sourceHash: "a".repeat(64),
  recorded: ["a".repeat(12), "b".repeat(12)],
  current: ["c".repeat(12), "d".repeat(12)],
};

test("an identical complete cache inconsistency is inherited", () => {
  const report = { [bucket]: [item] };
  const result = partitionAgainstBase(report, report);
  assert.equal(result.ok, true);
  assert.equal(result.inheritedCount, 1);
  assert.deepEqual(result.inherited[bucket], [item]);
});

test("new cache evidence at an already inconsistent path blocks a PR", () => {
  const base = { [bucket]: [item] };
  for (const change of [
    { rel: "docs/another.md" },
    { locale: "de" },
    { sourceHash: "b".repeat(64) },
    { recorded: [...item.recorded].reverse() },
    { current: [...item.current].reverse() },
    { recorded: [item.recorded[0]] },
    { current: [...item.current, "e".repeat(12)] },
  ]) {
    const report = { [bucket]: [{ ...item, ...change }] };
    const result = partitionAgainstBase(report, base);
    assert.equal(result.ok, false, JSON.stringify(change));
    assert.deepEqual(result.fresh[bucket], report[bucket]);
  }
});

test("unverified section evidence never authorizes inherited status", () => {
  const changes = [
    { sourceHash: undefined },
    { sourceHash: "not-a-hash" },
    { reason: "section-hashes-unverified" },
    { reason: "unknown-reason" },
  ];
  for (const field of ["recorded", "current"]) {
    for (const value of [
      undefined,
      null,
      {},
      [],
      Array(1),
      [null],
      ["g".repeat(12)],
      ["a".repeat(64)],
    ]) {
      changes.push({ [field]: value });
    }
  }
  for (const change of changes) {
    const report = { [bucket]: [{ ...item, ...change }] };
    assert.equal(partitionAgainstBase(report, report).ok, false, JSON.stringify(change));
  }
});

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "i18n-section-drift-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const source = "# Fixture\n\n## Storage\n\nRequests are kept in memory.\n";
  const mirror = "# Exemplo\n\n## Armazenamento\n\nSolicitações ficam na memória.\n";
  mkdirSync(join(root, "config"));
  mkdirSync(join(root, "docs/i18n/pt-BR"), { recursive: true });
  writeFileSync(join(root, "config/i18n.json"), JSON.stringify({ locales: [{ code: "pt-BR" }] }));
  writeFileSync(join(root, "README.md"), source);
  writeFileSync(join(root, "docs/i18n/pt-BR/README.md"), mirror);
  const record = { source_hash: hash(source), target_hash: hash(mirror) };
  const entry = { source_hash: hash(source), locales: { "pt-BR": record } };
  const save = () =>
    writeFileSync(
      join(root, ".i18n-state.json"),
      JSON.stringify({ sources: { "README.md": entry } })
    );
  save();
  const checker = fileURLToPath(
    new URL("../../scripts/i18n/check-translation-drift.mjs", import.meta.url)
  );
  const invoke = (...args) => {
    const result = spawnSync(process.execPath, [checker, "--root", root, "--all", ...args], {
      cwd: root,
      env: { HOME: root, LANG: "C.UTF-8" },
      encoding: "utf8",
      timeout: 5000,
    });
    assert.equal(result.error, undefined);
    assert.equal(result.signal, null);
    assert.equal(result.stderr, "");
    return result;
  };
  const run = (...args) => {
    const result = invoke("--json", ...args);
    return { status: result.status, report: JSON.parse(result.stdout) };
  };
  const baseline = (report) => {
    const basePath = join(root, "base-report.json");
    writeFileSync(basePath, JSON.stringify(report));
    return ["--base-report", basePath];
  };
  return { root, source, record, entry, save, run, invoke, baseline };
}

test("CLI accepts absent legacy caches and reports equal caches as consistent", (t) => {
  const f = fixture(t);
  const absent = f.run();
  assert.equal(absent.status, 0);
  assert.deepEqual(absent.report[bucket], []);
  f.record.section_hashes = sectionHashes(["## Storage\n\nRequests are kept in memory."]);
  f.save();
  const matching = f.run(...f.baseline(absent.report));
  assert.equal(matching.status, 0);
  assert.deepEqual(matching.report[bucket], []);
});

test("CLI blocks new cache inconsistencies while preserving global and inherited warnings", (t) => {
  const f = fixture(t);
  const cleanBase = f.run().report;
  f.record.section_hashes = sectionHashes(["## Storage\n\nRequests are saved to the database."]);
  f.save();
  const introduced = f.run(...f.baseline(cleanBase));
  assert.equal(introduced.status, 1);
  assert.equal(introduced.report.ok, false);
  assert.equal(introduced.report.fresh[bucket].length, 1);
  const global = f.run();
  assert.equal(global.status, 0);
  assert.equal(global.report.ok, true);
  assert.equal(global.report[bucket][0].reason, "section-hashes-mismatch");
  assert.deepEqual(global.report.driftedSources, []);
  assert.deepEqual(global.report.driftedTargets, []);
  assert.deepEqual(global.report.staleTargets, []);
  const human = f.invoke();
  assert.match(human.stdout, /inconsistent section caches/);
  assert.match(human.stdout, /translation-provenance warnings remain advisory/);
  const inherited = f.run(...f.baseline(global.report));
  assert.equal(inherited.status, 0);
  assert.deepEqual(inherited.report.inherited[bucket], global.report[bucket]);

  f.record.section_hashes = sectionHashes(["A different obsolete source."]);
  f.save();
  assert.equal(f.run(...f.baseline(global.report)).status, 1);
});

test("CLI requires the disk, top-level and locale source hashes to agree before comparing sections", (t) => {
  const f = fixture(t);
  f.record.section_hashes = ["a".repeat(12)];
  f.record.source_hash = hash("An older translated source.");
  f.save();
  const staleLocale = f.run();
  assert.deepEqual(staleLocale.report[bucket], []);
  assert.equal(staleLocale.report.staleTargets.length, 1);
  f.record.source_hash = f.entry.source_hash;
  f.save();
  writeFileSync(join(f.root, "README.md"), f.source + "\nSource changed again.\n");
  const changedSource = f.run();
  assert.deepEqual(changedSource.report[bucket], []);
  assert.equal(changedSource.report.driftedSources.length, 1);
});

test("CLI reports malformed caches as unverified and does not inherit them", (t) => {
  const f = fixture(t);
  f.record.section_hashes = null;
  f.save();
  const global = f.run();
  assert.equal(global.status, 0);
  assert.equal(global.report[bucket][0].reason, "section-hashes-unverified");
  assert.equal(f.run(...f.baseline(global.report)).status, 1);
});
