import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const HELPER = path.join(ROOT, "scripts/i18n/check-base-health.mjs");
const hash = (text) => createHash("sha256").update(text).digest("hex");
const write = (root, rel, text) => {
  const file = path.join(root, rel);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, text);
};

function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), "omniroute-i18n-base-health-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const rel of [
    "scripts/i18n/check-translation-drift.mjs",
    "scripts/i18n/lib/docs-core-set.mjs",
    "scripts/i18n/lib/section-cache.mjs",
  ]) {
    const file = path.join(root, rel);
    mkdirSync(path.dirname(file), { recursive: true });
    cpSync(path.join(ROOT, rel), file);
  }
  const locales = ["es", "pt-BR"];
  write(
    root,
    "config/i18n.json",
    JSON.stringify({ docsExcluded: ["en"], locales: locales.map((code) => ({ code })) })
  );
  const state = { sources: {} };
  for (const rel of ["README.md", "docs/guide.md"]) {
    const source = `# Source\n\n## Setup\n\n${rel} source.\n`;
    write(root, rel, source);
    const records = {};
    for (const locale of locales) {
      const target = `# ${locale}\n\nTranslated ${rel}.\n`;
      write(root, `docs/i18n/${locale}/${rel}`, target);
      records[locale] = { source_hash: hash(source), target_hash: hash(target) };
    }
    state.sources[rel] = { source_hash: hash(source), locales: records };
  }
  const save = () => write(root, ".i18n-state.json", JSON.stringify(state));
  save();
  const git = (args) => {
    const result = spawnSync("git", args, {
      cwd: root,
      encoding: "utf8",
      env: { PATH: process.env.PATH, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: "/dev/null" },
    });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  git(["init", "-q"]);
  git(["add", "."]);
  git([
    "-c",
    "user.name=Fixture",
    "-c",
    "user.email=fixture@example.invalid",
    "-c",
    "commit.gpgsign=false",
    "-c",
    "core.hooksPath=/dev/null",
    "commit",
    "-qm",
    "fixture",
  ]);
  const sha = git(["rev-parse", "HEAD"]);
  const env = {
    PATH: process.env.PATH,
    LANG: "C.UTF-8",
    GITHUB_SHA: sha,
    GITHUB_WORKFLOW_SHA: sha,
    GITHUB_REF: "refs/heads/main",
    GITHUB_EVENT_NAME: "push",
    GITHUB_REPOSITORY: "cheaper-inference/OmniRoute",
    GITHUB_RUN_ID: "1234",
    GITHUB_RUN_ATTEMPT: "1",
  };
  return { root, state, save, env, sha };
}

function observe(f, overrides = {}) {
  const output = path.join(f.root, "_artifacts/i18n-base-health/report.json");
  const result = spawnSync(process.execPath, [HELPER, "--output", output], {
    cwd: f.root,
    env: { ...f.env, ...overrides },
    encoding: "utf8",
    timeout: 15000,
  });
  assert.ifError(result.error);
  assert.equal(result.signal, null, result.stderr);
  return { ...result, report: JSON.parse(readFileSync(output, "utf8")) };
}

test("a complete zero-drift base produces a successful receipt", (t) => {
  const f = fixture(t);
  const result = observe(f);
  assert.equal(result.status, 0, result.stderr);
});

test("a stale locale fails base health even when the drift checker exits zero", (t) => {
  const f = fixture(t);
  f.state.sources["README.md"].locales.es.source_hash = "a".repeat(64);
  f.save();
  const legacy = spawnSync(
    process.execPath,
    [path.join(f.root, "scripts/i18n/check-translation-drift.mjs"), "--json"],
    { cwd: f.root, env: { PATH: process.env.PATH }, encoding: "utf8" }
  );
  assert.equal(legacy.status, 0, legacy.stderr);
  assert.equal(JSON.parse(legacy.stdout).staleTargets.length, 1);
  const result = observe(f);
  assert.equal(result.status, 1, "the base observer must not inherit the checker advisory verdict");
});

for (const [name, context] of [
  ["another checkout SHA", { GITHUB_SHA: "b".repeat(40) }],
  ["a pull request event", { GITHUB_EVENT_NAME: "pull_request" }],
  ["a contributor branch", { GITHUB_REF: "refs/heads/fix/example" }],
  ["missing run identity", { GITHUB_RUN_ID: "" }],
]) {
  test(`rejects ${name} instead of certifying a base`, (t) => {
    const f = fixture(t);
    const result = observe(f, context);
    assert.equal(result.status, 1);
    assert.equal(result.report.verdict, "INCOMPLETE");
  });
}

for (const [name, alter] of [
  ["one missing mirror", (f) => rmSync(path.join(f.root, "docs/i18n/es/README.md"))],
  ["one missing source", (f) => rmSync(path.join(f.root, "README.md"))],
  [
    "one missing source record",
    (f) => {
      delete f.state.sources["README.md"];
      f.save();
    },
  ],
  [
    "one missing locale record",
    (f) => {
      delete f.state.sources["README.md"].locales.es;
      f.save();
    },
  ],
  [
    "an unverified target hash",
    (f) => {
      delete f.state.sources["README.md"].locales.es.target_hash;
      f.save();
    },
  ],
]) {
  test(`does not certify contracted or incomplete coverage: ${name}`, (t) => {
    const f = fixture(t);
    alter(f);
    const result = observe(f);
    assert.equal(result.status, 1);
    assert.equal(result.report.verdict, "INCOMPLETE");
  });
}

const emptyReport = () => ({
  ok: true,
  checkedSources: 2,
  checkedTargets: 4,
  driftedSources: [],
  missingTargets: [],
  driftedTargets: [],
  staleTargets: [],
  inconsistentSectionCaches: [],
});
function replaceChecker(f, text, exitCode = 0) {
  write(
    f.root,
    "scripts/i18n/check-translation-drift.mjs",
    `process.stdout.write(${JSON.stringify(text)}); process.exit(${exitCode});\n`
  );
}

for (const bucket of [
  "driftedSources",
  "missingTargets",
  "driftedTargets",
  "staleTargets",
  "inconsistentSectionCaches",
]) {
  test(`fails base health for the ${bucket} JSON class`, (t) => {
    const f = fixture(t);
    const report = emptyReport();
    report[bucket] = [
      { rel: "README.md", ...(bucket === "driftedSources" ? {} : { locale: "es" }) },
    ];
    report.ok = ["staleTargets", "inconsistentSectionCaches"].includes(bucket);
    replaceChecker(f, JSON.stringify(report), report.ok ? 0 : 1);
    const result = observe(f);
    assert.equal(result.status, 1);
    assert.equal(result.report.verdict, "FAIL");
    assert.equal(result.report.counts[bucket], 1);
    assert.equal(result.report.checker.exitCode, report.ok ? 0 : 1);
  });
}

for (const [name, text, code] of [
  ["malformed JSON", "{", 1],
  ["missing state", JSON.stringify({ ok: false, reason: "missing-state" }), 1],
  ["a missing bucket", JSON.stringify({ ...emptyReport(), staleTargets: undefined }), 0],
  ["a non-array bucket", JSON.stringify({ ...emptyReport(), staleTargets: 0 }), 0],
  ["zero checked sources", JSON.stringify({ ...emptyReport(), checkedSources: 0 }), 0],
  ["zero checked targets", JSON.stringify({ ...emptyReport(), checkedTargets: 0 }), 0],
  ["partial source coverage", JSON.stringify({ ...emptyReport(), checkedSources: 1 }), 0],
  ["partial target coverage", JSON.stringify({ ...emptyReport(), checkedTargets: 3 }), 0],
  ["an inherited PR verdict", JSON.stringify({ ...emptyReport(), inherited: {} }), 0],
  ["a contradictory exit", JSON.stringify(emptyReport()), 1],
  ["an unexpected checker exit", JSON.stringify(emptyReport()), 2],
  ["an unknown new report class", JSON.stringify({ ...emptyReport(), futureFailures: [{}] }), 0],
]) {
  test(`retains an INCOMPLETE receipt for ${name}`, (t) => {
    const f = fixture(t);
    replaceChecker(f, text, code);
    const result = observe(f);
    assert.equal(result.status, 1);
    assert.equal(result.report.verdict, "INCOMPLETE");
    assert.equal(result.report.ok, false);
    assert.ok(result.report.errors.length > 0);
  });
}

test("a current source with a wrong section cache fails despite legacy exit zero", (t) => {
  const f = fixture(t);
  f.state.sources["README.md"].locales.es.section_hashes = ["a".repeat(12)];
  f.save();
  const result = observe(f);
  assert.equal(result.status, 1);
  assert.equal(result.report.verdict, "FAIL");
  assert.equal(result.report.checker.exitCode, 0);
  assert.equal(result.report.counts.inconsistentSectionCaches, 1);
});

test("manual dispatch binds the receipt to the selected release SHA and run attempt", (t) => {
  const f = fixture(t);
  const result = observe(f, {
    GITHUB_EVENT_NAME: "workflow_dispatch",
    GITHUB_REF: "refs/heads/release/v3.8.53",
    GITHUB_RUN_ATTEMPT: "2",
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.report.verdict, "PASS");
  assert.deepEqual(result.report.context, {
    repository: "cheaper-inference/OmniRoute",
    event: "workflow_dispatch",
    ref: "refs/heads/release/v3.8.53",
    sha: f.sha,
    checkoutSha: f.sha,
    workflowSha: f.sha,
    runId: "1234",
    runAttempt: "2",
  });
  assert.equal(result.report.scope.coreSources, 2);
  assert.equal(result.report.scope.locales, 2);
  assert.equal(result.report.scope.checkedTargets, 4);
});

test("legacy partial extras do not silently widen the existing core policy", (t) => {
  const f = fixture(t);
  f.state.sources["AGENTS.md"] = {
    source_hash: "a".repeat(64),
    locales: { es: { source_hash: "a".repeat(64), target_hash: "b".repeat(64) } },
  };
  f.save();
  const result = observe(f);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.report.scope.coreSources, 2);
});

test("missing configured locale directories cannot certify a smaller locale set", (t) => {
  const f = fixture(t);
  rmSync(path.join(f.root, "docs/i18n/es"), { recursive: true });
  const result = observe(f);
  assert.equal(result.status, 1);
  assert.equal(result.report.verdict, "INCOMPLETE");
  assert.ok(result.report.errors.includes("missing-locale-directory"));
});

test("checker failures retain hashes and counts without copying raw diagnostics or environment", (t) => {
  const f = fixture(t);
  const sentinel = "test-only-sensitive-sentinel";
  write(f.root, ".env", `NOT_A_REAL_SECRET=${sentinel}\n`);
  write(
    f.root,
    "scripts/i18n/check-translation-drift.mjs",
    `process.stderr.write(${JSON.stringify(sentinel)}); process.exit(2);\n`
  );
  const result = observe(f, { NOT_A_REAL_SECRET: sentinel });
  assert.equal(result.status, 1);
  assert.equal(result.report.verdict, "INCOMPLETE");
  assert.ok(result.report.checker.stderrBytes > 0);
  assert.doesNotMatch(JSON.stringify(result.report), new RegExp(sentinel));
  assert.doesNotMatch(result.stdout + result.stderr, new RegExp(sentinel));
});

for (const changedTarget of [false, true]) {
  test(`HEAD movement during observation invalidates a ${changedTarget ? "drifted" : "clean"} receipt`, (t) => {
    const f = fixture(t);
    if (changedTarget) write(f.root, "docs/i18n/es/README.md", "Changed translation.\n");
    const original = path.join(f.root, "scripts/i18n/check-translation-drift.original.mjs");
    cpSync(path.join(f.root, "scripts/i18n/check-translation-drift.mjs"), original);
    write(
      f.root,
      "scripts/i18n/check-translation-drift.mjs",
      `import { spawnSync } from "node:child_process";
const result = spawnSync(process.execPath, [${JSON.stringify(original)}, ...process.argv.slice(2)], { encoding: "utf8" });
const options = { encoding: "utf8", env: { PATH: process.env.PATH, GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_NOSYSTEM: "1" } };
const next = spawnSync("git", ["-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit-tree", "HEAD^{tree}", "-p", "HEAD", "-m", "moved during observation"], options);
if (next.status !== 0) throw new Error("Fixture commit failed");
const update = spawnSync("git", ["update-ref", "HEAD", next.stdout.trim()], options);
if (update.status !== 0) throw new Error("Fixture ref move failed");
process.stdout.write(result.stdout);
process.stderr.write(result.stderr);
process.exit(result.status);
`
    );
    const result = observe(f);
    const head = spawnSync("git", ["rev-parse", "HEAD"], { cwd: f.root, encoding: "utf8" });
    assert.equal(head.status, 0, head.stderr);
    assert.notEqual(head.stdout.trim(), f.sha, "the fixture must move HEAD during the checker");
    assert.equal(result.report.checker.exitCode, changedTarget ? 1 : 0);
    assert.equal(result.report.counts.driftedTargets, changedTarget ? 1 : 0);
    assert.equal(result.status, 1, "a moved checkout cannot certify the initial candidate");
    assert.equal(result.report.verdict, "INCOMPLETE");
    assert.equal(result.report.ok, false);
    assert.ok(result.report.errors.includes("checkout-sha-mismatch"));
  });
}
