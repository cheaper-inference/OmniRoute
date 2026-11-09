import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  findStaleTargets,
  partitionAgainstBase,
} from "../../scripts/i18n/check-translation-drift.mjs";

// A partial refresh run (17 of 65 locales retranslated before an upstream 429)
// bumps the top-level source_hash while the interrupted locales keep the old
// one. The drift gate compared only the top-level hash and reported PASS for
// 45 stale mirrors; it must list every locale record behind its source (as a
// warning — an interrupted refresh must not turn every PR's CI red).
test("a locale whose record was written from an older source is stale", () => {
  const newest = "a".repeat(64);
  const older = "b".repeat(64);
  const sources = {
    "README.md": {
      source_hash: newest,
      locales: {
        de: { source_hash: newest, target_hash: "t1" },
        hu: { source_hash: older, target_hash: "t2" },
        fr: { source_hash: older, target_hash: "t3" },
      },
    },
    "docs/x.md": {
      source_hash: newest,
      locales: { de: { source_hash: newest, target_hash: "t4" } },
    },
  };
  assert.deepEqual(
    findStaleTargets(sources).map((s) => `${s.locale}:${s.rel}`),
    ["hu:README.md", "fr:README.md"]
  );
});

test("missing or invalid source-hash evidence is reported as unverified provenance", () => {
  const newest = "a".repeat(64);
  for (const value of [undefined, null, "", 42, "not-a-hash", "z".repeat(64)]) {
    const sources = {
      "docs/y.md": {
        source_hash: newest,
        locales: { de: { source_hash: value, target_hash: "t" } },
      },
    };
    assert.deepEqual(findStaleTargets(sources), [
      {
        rel: "docs/y.md",
        locale: "de",
        reason: "source-hash-unverified",
        recorded: null,
        current: newest,
      },
    ]);
  }
  assert.deepEqual(findStaleTargets({}), []);
});

test("missing top-level source provenance is unverified even when the locale hash exists", () => {
  const recorded = "a".repeat(64);
  assert.deepEqual(
    findStaleTargets({ "README.md": { locales: { de: { source_hash: recorded } } } }),
    [{ rel: "README.md", locale: "de", reason: "source-hash-unverified", recorded, current: null }]
  );
});

test("PR stale inheritance requires the same locale and complete source-hash pair", () => {
  const stale = {
    rel: "README.md",
    locale: "de",
    recorded: "a".repeat(64),
    current: "b".repeat(64),
  };
  const base = { staleTargets: [stale] };
  assert.equal(partitionAgainstBase(base, base).inheritedCount, 1);
  for (const change of [
    { locale: "fr" },
    { recorded: "c".repeat(64) },
    { current: "c".repeat(64) },
  ]) {
    const report = { staleTargets: [{ ...stale, ...change }] };
    const partition = partitionAgainstBase(report, base);
    assert.equal(partition.ok, false);
    assert.equal(partition.inheritedCount, 0);
    assert.deepEqual(partition.fresh.staleTargets, report.staleTargets);
  }
  const unverified = {
    staleTargets: [{ ...stale, recorded: null, reason: "source-hash-unverified" }],
  };
  assert.equal(partitionAgainstBase(unverified, unverified).ok, false);
});

test("CLI blocks new stale provenance in PRs while keeping global and inherited warnings advisory", (t) => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-i18n-stale-pr-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const hash = (text: string) => createHash("sha256").update(text).digest("hex");
  const sourceText = "Current English source.\n";
  const sourceHash = hash(sourceText);
  const targetText = "Localized mirror.\n";
  const targetHash = hash(targetText);
  const oldHash = hash("Old English source.\n");
  const sourcePath = join(root, "README.md");
  const statePath = join(root, ".i18n-state.json");
  const basePath = join(root, "base-report.json");
  mkdirSync(join(root, "docs/i18n/pt-BR"), { recursive: true });
  mkdirSync(join(root, "config"));
  writeFileSync(join(root, "config/i18n.json"), JSON.stringify({ locales: [{ code: "pt-BR" }] }));
  writeFileSync(sourcePath, sourceText);
  writeFileSync(join(root, "docs/i18n/pt-BR/README.md"), targetText);
  const state = {
    sources: {
      "README.md": {
        source_hash: sourceHash,
        locales: { "pt-BR": { source_hash: sourceHash, target_hash: targetHash } },
      },
    },
  };
  const save = () => writeFileSync(statePath, JSON.stringify(state));
  save();
  const checker = fileURLToPath(
    new URL("../../scripts/i18n/check-translation-drift.mjs", import.meta.url)
  );
  const invoke = (...args: string[]) => {
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
  const run = (...args: string[]) => {
    const result = invoke("--json", ...args);
    return { status: result.status, report: JSON.parse(result.stdout) };
  };
  const baseline = run("--warn");
  assert.equal(baseline.report.staleTargets.length, 0);
  writeFileSync(basePath, JSON.stringify(baseline.report));

  state.sources["README.md"].locales["pt-BR"].source_hash = oldHash;
  save();
  const advisory = run();
  assert.equal(advisory.status, 0);
  assert.equal(advisory.report.ok, true);
  assert.deepEqual(advisory.report.staleTargets, [
    { rel: "README.md", locale: "pt-BR", recorded: oldHash, current: sourceHash },
  ]);
  const introduced = run("--base-report", basePath);
  assert.equal(introduced.status, 1);
  assert.equal(introduced.report.ok, false);
  assert.deepEqual(introduced.report.fresh.staleTargets, advisory.report.staleTargets);
  const blockedMessage = invoke("--base-report", basePath);
  assert.equal(blockedMessage.status, 1);
  assert.match(blockedMessage.stdout, /new or unverified entries block/);
  assert.doesNotMatch(blockedMessage.stdout, /PASS —/);

  writeFileSync(basePath, JSON.stringify(advisory.report));
  const inherited = run("--base-report", basePath);
  assert.equal(inherited.status, 0);
  assert.deepEqual(inherited.report.inherited.staleTargets, advisory.report.staleTargets);
  assert.deepEqual(inherited.report.fresh.staleTargets, []);
  const inheritedMessage = invoke("--base-report", basePath);
  assert.match(inheritedMessage.stdout, /PASS — no new or unverified drift against the base/);
  assert.doesNotMatch(inheritedMessage.stdout, /all sources and targets match/);

  const newerSource = "The PR changes English again.\n";
  writeFileSync(sourcePath, newerSource);
  state.sources["README.md"].source_hash = hash(newerSource);
  save();
  const changedAgain = run("--base-report", basePath);
  assert.equal(changedAgain.status, 1);
  assert.equal(changedAgain.report.fresh.staleTargets.length, 1);
  assert.deepEqual(changedAgain.report.driftedSources, []);
  assert.deepEqual(changedAgain.report.driftedTargets, []);

  Reflect.deleteProperty(state.sources["README.md"].locales["pt-BR"], "source_hash");
  save();
  const unknown = run("--base-report", basePath);
  assert.equal(unknown.status, 1);
  assert.equal(unknown.report.fresh.staleTargets[0].reason, "source-hash-unverified");
  assert.equal(unknown.report.fresh.staleTargets[0].recorded, null);
  assert.deepEqual(unknown.report.driftedSources, []);
  assert.deepEqual(unknown.report.driftedTargets, []);
  const globalUnknown = invoke();
  assert.equal(globalUnknown.status, 0);
  assert.match(globalUnknown.stdout, /translation-provenance warnings remain advisory/);
  assert.match(globalUnknown.stdout, /source-hash-unverified/);
});
