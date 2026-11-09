import assert from "node:assert/strict";
import { test } from "node:test";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readRefreshReport, REFRESH_BUCKETS } from "../../scripts/i18n/mirror-refresh-report.mjs";

function clean() {
  return {
    ok: true,
    checkedSources: 2,
    checkedTargets: 4,
    ...Object.fromEntries(REFRESH_BUCKETS.map((key) => [key, []])),
  };
}

for (const bucket of REFRESH_BUCKETS) {
  test(`includes ${bucket} in the work order and refuses a clean verdict`, () => {
    const report = clean();
    report[bucket] = [{ rel: "docs/guides/I18N.md", locale: "pt-BR" }];
    report.ok = !REFRESH_BUCKETS.slice(0, 3).includes(bucket);
    const result = readRefreshReport(report);
    assert.deepEqual(result.files, ["docs/guides/I18N.md"]);
    assert.equal(result.clean, false);
    assert.equal(result.counts[bucket], 1);
  });
  test(`rejects an absent ${bucket} instead of treating it as empty`, () => {
    const report = clean();
    delete report[bucket];
    assert.throws(() => readRefreshReport(report), /missing-or-invalid-bucket/);
  });
}

test("deduplicates and sorts sources without discarding any bucket", () => {
  const report = clean();
  report.staleTargets = [{ rel: "README.md", locale: "pt-BR" }];
  report.inconsistentSectionCaches = [
    { rel: "README.md", locale: "ja" },
    { rel: "AGENTS.md", locale: "ja" },
  ];
  assert.deepEqual(readRefreshReport(report).files, ["AGENTS.md", "README.md"]);
});

test("a complete clean report has an empty work order", () => {
  assert.deepEqual(readRefreshReport(clean()), {
    counts: Object.fromEntries(REFRESH_BUCKETS.map((key) => [key, 0])),
    files: [],
    clean: true,
  });
});

for (const [name, change] of [
  ["missing state", () => ({ ok: false, reason: "missing-state" })],
  ["empty source scope", (report) => ({ ...report, checkedSources: 0 })],
  ["empty target scope", (report) => ({ ...report, checkedTargets: 0 })],
  ["fractional counts", (report) => ({ ...report, checkedTargets: 1.5 })],
  ["PR comparison", (report) => ({ ...report, fresh: {}, inherited: {} })],
  ["unknown extension", (report) => ({ ...report, newBucket: [] })],
  ["contradictory clean", (report) => ({ ...report, driftedSources: [{ rel: "README.md" }] })],
  ["contradictory failure", (report) => ({ ...report, ok: false })],
  ["missing locale", (report) => ({ ...report, staleTargets: [{ rel: "README.md" }] })],
  ["missing path", (report) => ({ ...report, staleTargets: [{ locale: "ja" }] })],
  [
    "traversal path",
    (report) => ({ ...report, staleTargets: [{ rel: "../README.md", locale: "ja" }] }),
  ],
  [
    "comma path",
    (report) => ({ ...report, staleTargets: [{ rel: "README.md,AGENTS.md", locale: "ja" }] }),
  ],
  [
    "output injection",
    (report) => ({ ...report, staleTargets: [{ rel: "README.md\nfiles=other", locale: "ja" }] }),
  ],
]) {
  test(`rejects ${name}`, () => assert.throws(() => readRefreshReport(change(clean()))));
}

test("CLI distinguishes complete clean, drift and incomplete input", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "i18n-refresh-report-"));
  const cli = fileURLToPath(
    new URL("../../scripts/i18n/mirror-refresh-report.mjs", import.meta.url)
  );
  const file = path.join(directory, "report.json");
  try {
    writeFileSync(file, JSON.stringify(clean()));
    assert.equal(spawnSync(process.execPath, [cli, "check", file]).status, 0);
    const drift = clean();
    drift.inconsistentSectionCaches = [{ rel: "README.md", locale: "ja" }];
    writeFileSync(file, JSON.stringify(drift));
    assert.equal(spawnSync(process.execPath, [cli, "check", file]).status, 1);
    const selection = spawnSync(process.execPath, [cli, "select", file], { encoding: "utf8" });
    assert.equal(selection.status, 0);
    assert.equal(selection.stdout, "README.md");
    writeFileSync(file, '{"private-fixture-value":');
    const incomplete = spawnSync(process.execPath, [cli, "check", file], { encoding: "utf8" });
    assert.equal(incomplete.status, 2);
    assert.doesNotMatch(incomplete.stderr, /private-fixture-value/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
