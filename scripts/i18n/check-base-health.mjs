#!/usr/bin/env node
/** Filesystem-only base observer. It never translates or adopts recorded hashes. */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const BUCKETS = [
  "driftedSources",
  "missingTargets",
  "driftedTargets",
  "staleTargets",
  "inconsistentSectionCaches",
];
const CHECKER = "scripts/i18n/check-translation-drift.mjs";
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

class HealthError extends Error {}
function requireHealth(condition, code) {
  if (!condition) throw new HealthError(code);
}

function readContext(env, root) {
  requireHealth(["push", "workflow_dispatch"].includes(env.GITHUB_EVENT_NAME), "invalid-event");
  requireHealth(
    /^refs\/heads\/(main|release\/v[^/\s]+)$/.test(env.GITHUB_REF ?? ""),
    "invalid-ref"
  );
  requireHealth(/^[a-f\d]{40}$/.test(env.GITHUB_SHA ?? ""), "invalid-candidate-sha");
  requireHealth(/^[a-f\d]{40}$/.test(env.GITHUB_WORKFLOW_SHA ?? ""), "invalid-workflow-sha");
  requireHealth(/^[\w.-]+\/[\w.-]+$/.test(env.GITHUB_REPOSITORY ?? ""), "invalid-repository");
  requireHealth(/^[1-9]\d*$/.test(env.GITHUB_RUN_ID ?? ""), "invalid-run-id");
  requireHealth(/^[1-9]\d*$/.test(env.GITHUB_RUN_ATTEMPT ?? ""), "invalid-run-attempt");
  const git = spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" });
  requireHealth(!git.error && !git.signal && git.status === 0, "git-head-unavailable");
  const checkoutSha = git.stdout.trim();
  requireHealth(checkoutSha === env.GITHUB_SHA, "checkout-sha-mismatch");
  return {
    repository: env.GITHUB_REPOSITORY,
    event: env.GITHUB_EVENT_NAME,
    ref: env.GITHUB_REF,
    sha: env.GITHUB_SHA,
    checkoutSha,
    workflowSha: env.GITHUB_WORKFLOW_SHA,
    runId: env.GITHUB_RUN_ID,
    runAttempt: env.GITHUB_RUN_ATTEMPT,
  };
}

function readCheckerReport(result) {
  requireHealth(!result.error && !result.signal, "checker-interrupted");
  requireHealth(result.status === 0 || result.status === 1, "checker-unexpected-exit");
  const report = JSON.parse(result.stdout);
  requireHealth(isObject(report) && typeof report.ok === "boolean", "invalid-checker-report");
  requireHealth(
    !Object.hasOwn(report, "fresh") && !Object.hasOwn(report, "inherited"),
    "unexpected-base-comparison"
  );
  const fields = new Set(["ok", "checkedSources", "checkedTargets", ...BUCKETS]);
  requireHealth(
    Object.keys(report).every((key) => fields.has(key)),
    "unknown-checker-field"
  );
  for (const field of ["checkedSources", "checkedTargets"]) {
    requireHealth(
      Number.isSafeInteger(report[field]) && report[field] > 0,
      "empty-or-invalid-coverage"
    );
  }
  for (const bucket of BUCKETS) {
    requireHealth(Array.isArray(report[bucket]), "missing-or-invalid-bucket");
    requireHealth(
      report[bucket].every(
        (item) =>
          isObject(item) &&
          typeof item.rel === "string" &&
          item.rel.length > 0 &&
          (bucket === "driftedSources" ||
            (typeof item.locale === "string" && item.locale.length > 0))
      ),
      "invalid-bucket-entry"
    );
  }
  const counts = Object.fromEntries(BUCKETS.map((bucket) => [bucket, report[bucket].length]));
  const fileHashesMatch = BUCKETS.slice(0, 3).every((bucket) => counts[bucket] === 0);
  requireHealth(report.ok === fileHashesMatch, "contradictory-checker-verdict");
  requireHealth(result.status === (report.ok ? 0 : 1), "contradictory-checker-exit");
  return { report, counts };
}

async function inspectScope(root, checked) {
  const configBytes = readFileSync(path.join(root, "config/i18n.json"));
  const stateBytes = readFileSync(path.join(root, ".i18n-state.json"));
  const config = JSON.parse(configBytes);
  const state = JSON.parse(stateBytes);
  requireHealth(isObject(config) && Array.isArray(config.locales), "invalid-locale-config");
  requireHealth(
    config.docsExcluded === undefined || Array.isArray(config.docsExcluded),
    "invalid-locale-exclusions"
  );
  const allLocales = config.locales.map((locale) => locale?.code);
  requireHealth(
    allLocales.every(
      (code) => typeof code === "string" && /^[a-z]{2,3}(?:-[A-Za-z]{2,4})?$/.test(code)
    ),
    "invalid-locale-code"
  );
  requireHealth(new Set(allLocales).size === allLocales.length, "duplicate-locale-code");
  const excluded = new Set(config.docsExcluded ?? ["en"]);
  requireHealth(
    [...excluded].every((code) => allLocales.includes(code) || code === "en"),
    "invalid-locale-exclusions"
  );
  const locales = allLocales.filter((code) => !excluded.has(code)).sort();
  requireHealth(locales.length > 0, "empty-locale-scope");
  requireHealth(isObject(state) && isObject(state.sources), "invalid-state-sources");
  const coreModule = "scripts/i18n/lib/docs-core-set.mjs";
  const { computeDocsCoreSet, docsLocaleDirs, CORE_SET_EXCLUDED } = await import(
    pathToFileURL(path.join(root, coreModule)).href
  );
  requireHealth(
    docsLocaleDirs({ root, config }).length === locales.length,
    "missing-locale-directory"
  );
  const core = computeDocsCoreSet({ root, config });
  requireHealth(Array.isArray(core) && core.length > 0, "empty-core-scope");
  // The tree intersection alone silently drops a deleted mirror/source. Existing
  // records covering every configured locale must still belong to that core.
  const excludedSources = new Set(CORE_SET_EXCLUDED);
  const complete = Object.entries(state.sources)
    .filter(
      ([rel, entry]) =>
        !excludedSources.has(rel) &&
        isObject(entry?.locales) &&
        locales.every((locale) => Object.hasOwn(entry.locales, locale))
    )
    .map(([rel]) => rel);
  requireHealth(
    complete.every((rel) => core.includes(rel)),
    "recorded-core-contracted"
  );
  const isHash = (value) => typeof value === "string" && /^[a-f\d]{64}$/i.test(value);
  for (const rel of core) {
    const entry = state.sources[rel];
    requireHealth(
      isObject(entry) && isHash(entry.source_hash) && isObject(entry.locales),
      "incomplete-source-record"
    );
    requireHealth(
      Object.keys(entry.locales).length === locales.length,
      "incomplete-locale-records"
    );
    requireHealth(
      locales.every(
        (locale) =>
          isObject(entry.locales[locale]) &&
          isHash(entry.locales[locale].source_hash) &&
          isHash(entry.locales[locale].target_hash)
      ),
      "unverified-target-record"
    );
  }
  requireHealth(
    checked.checkedSources === core.length &&
      checked.checkedTargets === core.length * locales.length,
    "checker-coverage-mismatch"
  );
  for (const bucket of BUCKETS) {
    requireHealth(
      checked[bucket].every(
        (item) =>
          core.includes(item.rel) && (bucket === "driftedSources" || locales.includes(item.locale))
      ),
      "checker-scope-mismatch"
    );
  }
  return {
    checkedSources: checked.checkedSources,
    checkedTargets: checked.checkedTargets,
    coreSources: core.length,
    locales: locales.length,
    sourceListSha256: sha256(JSON.stringify(core)),
    localeListSha256: sha256(JSON.stringify(locales)),
    inputsSha256: {
      state: sha256(stateBytes),
      config: sha256(configBytes),
      coreHelper: sha256(readFileSync(path.join(root, coreModule))),
      sectionHelper: sha256(readFileSync(path.join(root, "scripts/i18n/lib/section-cache.mjs"))),
      observer: sha256(readFileSync(fileURLToPath(import.meta.url))),
    },
  };
}

async function observe() {
  const root = process.cwd();
  const startedAt = new Date().toISOString();
  const receipt = {
    schemaVersion: 1,
    kind: "i18n-base-health",
    verdict: "INCOMPLETE",
    ok: false,
    context: null,
    runtime: process.version,
    startedAt,
    finishedAt: null,
    checker: null,
    counts: null,
    scope: null,
    errors: [],
  };
  let stage = "context";
  try {
    receipt.context = readContext(process.env, root);
    stage = "checker-execution";
    const started = performance.now();
    const result = spawnSync(process.execPath, [path.join(root, CHECKER), "--strict", "--json"], {
      cwd: root,
      encoding: "utf8",
      timeout: 120000,
      maxBuffer: 32 * 1024 * 1024,
      env: { PATH: process.env.PATH, LANG: "C.UTF-8" },
    });
    receipt.checker = {
      command: `node ${CHECKER} --strict --json`,
      sourceSha256: sha256(readFileSync(path.join(root, CHECKER))),
      exitCode: result.status,
      signal: result.signal,
      durationMs: Math.round(performance.now() - started),
      stdoutSha256: sha256(result.stdout ?? ""),
      stdoutBytes: Buffer.byteLength(result.stdout ?? ""),
      stderrSha256: sha256(result.stderr ?? ""),
      stderrBytes: Buffer.byteLength(result.stderr ?? ""),
    };
    stage = "checker-json";
    const { report, counts } = readCheckerReport(result);
    receipt.counts = counts;
    stage = "coverage";
    receipt.scope = await inspectScope(root, report);
    stage = "context-readback";
    requireHealth(
      JSON.stringify(readContext(process.env, root)) === JSON.stringify(receipt.context),
      "context-changed"
    );
    receipt.verdict = BUCKETS.every((bucket) => counts[bucket] === 0) ? "PASS" : "FAIL";
    receipt.ok = receipt.verdict === "PASS";
  } catch (error) {
    receipt.errors.push(error instanceof HealthError ? error.message : `${stage}-error`);
  }
  receipt.finishedAt = new Date().toISOString();
  return receipt;
}

const args = process.argv.slice(2);
if (args.length !== 2 || args[0] !== "--output" || !args[1]) {
  console.error("Usage: node scripts/i18n/check-base-health.mjs --output <receipt.json>");
  process.exitCode = 1;
} else {
  const receipt = await observe();
  try {
    const output = path.resolve(args[1]);
    mkdirSync(path.dirname(output), { recursive: true });
    writeFileSync(output, JSON.stringify(receipt, null, 2) + "\n");
    console.log(
      `[i18n-base-health] ${receipt.verdict} ${JSON.stringify(receipt.counts ?? receipt.errors)}`
    );
    process.exitCode = receipt.ok ? 0 : 1;
  } catch {
    console.error("[i18n-base-health] INCOMPLETE receipt-write-error");
    process.exitCode = 1;
  }
}
