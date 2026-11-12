#!/usr/bin/env node
/**
 * OmniRoute — i18n translation drift checker (CI gate).
 *
 * Verifies that every source file recorded in `.i18n-state.json` still has
 * the same SHA-256 hash on disk and that every produced translation file
 * exists with the recorded target hash. Does NOT call any API — purely a
 * deterministic state-vs-disk comparison.
 *
 * Modes:
 *   --strict (default)  exit 1 on any drift, print the offending paths
 *   --warn              exit 0, print warnings only
 *   --json              emit a JSON report to stdout (no human log lines)
 *
 * Recommended usage in CI:
 *   npm run i18n:check
 */

import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { sectionHashes, splitSections, stripTopHeading } from "./lib/section-cache.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const STATE_PATH = path.join(ROOT, ".i18n-state.json");
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isHash = (value) => typeof value === "string" && /^[a-f\d]{64}$/i.test(value);
const isSectionHashList = (value) =>
  Array.isArray(value) &&
  value.length > 0 &&
  Array.from(value).every((hash) => typeof hash === "string" && /^[a-f\d]{12}$/i.test(hash));
const DRIFT_BUCKETS = [
  "driftedSources",
  "missingTargets",
  "driftedTargets",
  "staleTargets",
  "inconsistentSectionCaches",
];

// Only the current source can be proved without Git history. A stale locale's
// cache belongs to another snapshot and must not be compared with today's text.
// An absent cache predates section reuse and legitimately bootstraps from Git.
function findInconsistentSectionCaches({ rel, entry, sourceHash, sourceText }) {
  if (entry.source_hash !== sourceHash) return [];
  const current = sectionHashes(splitSections(stripTopHeading(sourceText)));
  const inconsistent = [];
  for (const [locale, info] of Object.entries(entry.locales || {})) {
    if (info?.source_hash !== sourceHash || !Object.hasOwn(info, "section_hashes")) continue;
    const recorded = info.section_hashes;
    const verified = isSectionHashList(recorded);
    if (verified && JSON.stringify(recorded) === JSON.stringify(current)) continue;
    inconsistent.push({
      rel,
      locale,
      reason: verified ? "section-hashes-mismatch" : "section-hashes-unverified",
      sourceHash,
      recorded: recorded ?? null,
      current,
    });
  }
  return inconsistent;
}

// A mirror is stale when its locale record was written from an older version
// of the source than the one the top-level source_hash now records — that is
// what a partial run leaves behind (17 of 65 locales refreshed, the rest
// interrupted by an upstream quota 429): the source no longer reads as
// changed, the stale mirrors' target hashes still match, and the gate said
// PASS for 45 stale mirrors. Missing/invalid source hashes are unverified provenance,
// not evidence of a current translation. Pure over the `sources` map of .i18n-state.json.
export function findStaleTargets(sources) {
  const stale = [];
  for (const [rel, entry] of Object.entries(sources || {})) {
    for (const [locale, info] of Object.entries(entry.locales || {})) {
      const recorded = info?.source_hash;
      const current = entry.source_hash;
      if (!isHash(recorded) || !isHash(current)) {
        stale.push({
          rel,
          locale,
          reason: "source-hash-unverified",
          recorded: isHash(recorded) ? recorded : null,
          current: isHash(current) ? current : null,
        });
      } else if (recorded !== current) {
        stale.push({ rel, locale, recorded, current });
      }
    }
  }
  return stale;
}

/**
 * Pure. Splits a drift report into what the BASE branch already had (`inherited`) and what
 * only this tree adds (`fresh`). A PR gate fails on `fresh` alone: 14 sources edited without a
 * re-translation on release/v3.8.53 (translation backend down until ~2026-10-24) painted every
 * unrelated PR red, which is exactly the "never treat an inherited base-red in your branch" rule
 * the repo already applies to humans. A changed file is inherited only when its location,
 * reason and recorded/current hashes match the base. Another edit to the same path is fresh.
 * Unverified evidence also stays in `fresh`: it cannot authorize inheritance, but does not
 * establish contributor responsibility. This differential verdict is preparation evidence;
 * final queue/base admission uses the absolute verdict across all five classes.
 */
export function partitionAgainstBase(report, base) {
  const key = (bucket, x) => {
    if (!x || typeof x.rel !== "string" || !x.rel) return null;
    if (bucket !== "driftedSources" && (typeof x.locale !== "string" || !x.locale)) return null;
    if (bucket === "inconsistentSectionCaches") {
      if (
        x.reason !== "section-hashes-mismatch" ||
        !isHash(x.sourceHash) ||
        !isSectionHashList(x.recorded) ||
        !isSectionHashList(x.current)
      ) {
        return null;
      }
      return JSON.stringify([x.rel, x.locale, x.reason, x.sourceHash, x.recorded, x.current]);
    }
    if (bucket === "driftedSources" && x.reason === "source-missing") {
      return JSON.stringify([x.rel, x.reason]);
    }
    if (bucket === "driftedSources" ? x.reason !== "source-changed" : x.reason !== undefined) {
      return null;
    }
    // Legacy or malformed reports without hashes cannot prove equal failure evidence.
    if (bucket !== "missingTargets" && (!isHash(x.recorded) || !isHash(x.current))) return null;
    return JSON.stringify([x.rel, x.locale, x.reason, x.recorded, x.current]);
  };
  const fresh = {};
  const inherited = {};
  for (const bucket of DRIFT_BUCKETS) {
    const seen = new Set((base?.[bucket] ?? []).map((x) => key(bucket, x)).filter(Boolean));
    fresh[bucket] = [];
    inherited[bucket] = [];
    for (const item of report?.[bucket] ?? []) {
      (seen.has(key(bucket, item)) ? inherited : fresh)[bucket].push(item);
    }
  }
  const count = (b) => DRIFT_BUCKETS.reduce((total, bucket) => total + b[bucket].length, 0);
  return {
    fresh,
    inherited,
    freshCount: count(fresh),
    inheritedCount: count(inherited),
    ok: count(fresh) === 0,
  };
}

function parseArgs(argv) {
  const opts = {
    mode: "strict",
    json: false,
    root: null,
    baseReport: null,
    preflight: false,
    baselineEvidence: false,
  };
  const args = argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--warn") opts.mode = "warn";
    else if (arg === "--strict") opts.mode = "strict";
    else if (arg === "--json") opts.json = true;
    else if (arg === "--preflight") opts.preflight = true;
    else if (arg === "--baseline-evidence") opts.baselineEvidence = true;
    else if (arg === "--root") opts.root = args[++i];
    else if (arg.startsWith("--root=")) opts.root = arg.slice(7);
    else if (arg === "--base-report") opts.baseReport = args[++i];
    else if (arg.startsWith("--base-report=")) opts.baseReport = arg.slice(14);
    else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/i18n/check-translation-drift.mjs [--strict|--warn] [--json] [--root <dir>] [--base-report <json>]",
          "",
          "  --strict        (default) exit 1 when any source or target is out of date",
          "  --warn          report drift but exit 0",
          "  --json          write a machine-readable report to stdout",
          "  --root <dir>    check another checkout (e.g. the PR base) with THIS script",
          "  --base-report   JSON report of the base checkout: drift already present there is",
          "                  reported as inherited and does not fail the gate; only drift this",
          "                  tree introduces does (PR-scoped gate, 2026-10-20)",
          "  --baseline-evidence  include source/state/target identities for PR preparation",
          "  --preflight     permit English-only preparation against that proven baseline;",
          "                  always report mergeReady separately from preparation success",
        ].join("\n")
      );
      process.exit(0);
    }
  }
  return opts;
}

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (!isObject(value)) return JSON.stringify(value);
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
    .join(",")}}`;
}

function validBaseReport(report, scope, requireEvidence) {
  if (!isObject(report) || typeof report.ok !== "boolean") return false;
  const fields = new Set([
    "ok",
    "checkedSources",
    "checkedTargets",
    "baselineEvidence",
    ...DRIFT_BUCKETS,
  ]);
  if (Object.keys(report).some((key) => !fields.has(key))) return false;
  if (
    ![report.checkedSources, report.checkedTargets].every((n) => Number.isSafeInteger(n) && n > 0)
  )
    return false;
  for (const bucket of DRIFT_BUCKETS) {
    if (
      !Array.isArray(report[bucket]) ||
      report[bucket].some(
        (row) =>
          !isObject(row) ||
          typeof row.rel !== "string" ||
          !row.rel ||
          (bucket !== "driftedSources" && (typeof row.locale !== "string" || !row.locale))
      )
    )
      return false;
  }
  if (report.ok !== DRIFT_BUCKETS.every((bucket) => report[bucket].length === 0)) return false;
  if (!requireEvidence) return true;
  const evidence = report.baselineEvidence;
  if (
    !isObject(evidence) ||
    evidence.version !== 1 ||
    evidence.scope !== scope ||
    !Array.isArray(evidence.sources) ||
    evidence.sources.length !== report.checkedSources
  )
    return false;
  const seen = new Set();
  return evidence.sources.every((row) => {
    if (
      !isObject(row) ||
      typeof row.rel !== "string" ||
      !row.rel ||
      seen.has(row.rel) ||
      ![row.sourceHash, row.recordedSourceHash].every((value) => value === null || isHash(value)) ||
      !isHash(row.recordSha256) ||
      !isHash(row.targetSetSha256)
    )
      return false;
    seen.add(row.rel);
    return true;
  });
}

function pendingPreparation(partition, baseEvidence, currentEvidence) {
  const before = new Map(baseEvidence.sources.map((row) => [row.rel, row]));
  const now = new Map(currentEvidence.sources.map((row) => [row.rel, row]));
  const pending = [];
  for (const row of partition.fresh.driftedSources) {
    const base = before.get(row.rel);
    const current = now.get(row.rel);
    if (
      row.reason !== "source-changed" ||
      !base ||
      !current ||
      !isHash(base.sourceHash) ||
      !isHash(current.sourceHash) ||
      !isHash(base.recordedSourceHash) ||
      base.sourceHash === current.sourceHash ||
      base.recordSha256 !== current.recordSha256 ||
      base.targetSetSha256 !== current.targetSetSha256
    )
      continue;
    pending.push({
      rel: row.rel,
      reason: "english-source-pending",
      recorded: row.recorded,
      current: row.current,
    });
  }
  return pending;
}

async function main() {
  const opts = parseArgs(process.argv);
  const ROOT_DIR = opts.root ? path.resolve(opts.root) : ROOT;
  const STATE_FILE = opts.root ? path.join(ROOT_DIR, ".i18n-state.json") : STATE_PATH;

  if (!existsSync(STATE_FILE)) {
    const msg = ".i18n-state.json not found — run `npm run i18n:run` to bootstrap.";
    if (opts.json) {
      process.stdout.write(JSON.stringify({ ok: false, reason: "missing-state" }) + "\n");
    } else {
      console.error(`[i18n-check] ${msg}`);
    }
    process.exit(opts.mode === "warn" ? 0 : 1);
  }

  const state = JSON.parse(await fs.readFile(STATE_FILE, "utf8"));
  // Scope: only the documentation core set is translated on purpose (PR-0 decision, 22
  // sources); state entries for other docs (older per-locale extras) are not a CI concern.
  // `--all` restores the full-state behaviour for local inspection.
  const { computeDocsCoreSet, CORE_SET_EXCLUDED } = await import("./lib/docs-core-set.mjs");
  const config = JSON.parse(await fs.readFile(path.join(ROOT_DIR, "config", "i18n.json"), "utf8"));
  const coreSet = computeDocsCoreSet({ root: ROOT_DIR, config });
  const coreList = Array.isArray(coreSet)
    ? coreSet
    : (coreSet.coreSet ?? coreSet.files ?? Object.keys(coreSet));
  const excluded = new Set(config.docsExcluded ?? ["en"]);
  const locales = config.locales.map((locale) => locale.code).filter((code) => !excluded.has(code));
  const excludedSources = new Set(CORE_SET_EXCLUDED);
  // The on-disk intersection contracts when a mirror or its source is deleted.
  // Complete existing records still require those paths to be checked.
  const recordedCore = Object.entries(state.sources || {})
    .filter(
      ([rel, entry]) =>
        !excludedSources.has(rel) &&
        isObject(entry?.locales) &&
        locales.length > 0 &&
        locales.every((locale) => Object.hasOwn(entry.locales, locale))
    )
    .map(([rel]) => rel);
  const core = new Set([...coreList, ...recordedCore]);
  const scopeAll = process.argv.includes("--all");
  const selected = new Set([...core, ...(scopeAll ? Object.keys(state.sources || {}) : [])]);
  const sources = Object.fromEntries(
    [...selected].sort().map((rel) => [rel, state.sources?.[rel] ?? {}])
  );
  const baselineEvidence = { version: 1, scope: scopeAll ? "all" : "core", sources: [] };

  const driftedSources = [];
  const missingTargets = [];
  const driftedTargets = [];
  const inconsistentSectionCaches = [];
  let checkedSources = 0;
  let checkedTargets = 0;

  for (const [rel, entry] of Object.entries(sources)) {
    checkedSources++;
    const absSource = path.join(ROOT_DIR, rel);
    const targets = [];
    const evidence = {
      rel,
      sourceHash: null,
      recordedSourceHash: isHash(entry.source_hash) ? entry.source_hash : null,
      recordSha256: sha256(canonicalJson(entry)),
      targetSetSha256: sha256("[]"),
    };
    baselineEvidence.sources.push(evidence);
    if (!existsSync(absSource)) {
      driftedSources.push({ rel, reason: "source-missing" });
      continue;
    }
    const sourceBytes = await fs.readFile(absSource);
    const currentHash = sha256(sourceBytes);
    evidence.sourceHash = currentHash;
    if (currentHash !== entry.source_hash) {
      driftedSources.push({
        rel,
        reason: isHash(entry.source_hash) ? "source-changed" : "source-record-unverified",
        recorded: isHash(entry.source_hash) ? entry.source_hash : null,
        current: currentHash,
      });
    }
    inconsistentSectionCaches.push(
      ...findInconsistentSectionCaches({
        rel,
        entry,
        sourceHash: currentHash,
        sourceText: sourceBytes.toString("utf8"),
      })
    );

    const requiredLocales = new Set([
      ...Object.keys(entry.locales || {}),
      ...(core.has(rel) ? locales : []),
    ]);
    for (const locale of [...requiredLocales].sort()) {
      const info = entry.locales?.[locale];
      checkedTargets++;
      // Mirror the path layout used by run-translation.mjs.
      const targetAbs = rel.includes("/")
        ? path.join(ROOT_DIR, "docs", "i18n", locale, rel)
        : path.join(ROOT_DIR, "docs", "i18n", locale, rel);
      if (!existsSync(targetAbs)) {
        missingTargets.push({ rel, locale });
        targets.push([locale, null]);
        continue;
      }
      const targetHash = sha256(await fs.readFile(targetAbs));
      targets.push([locale, targetHash]);
      if (!isHash(info?.target_hash)) {
        driftedTargets.push({
          rel,
          locale,
          reason: "target-hash-unverified",
          recorded: null,
          current: targetHash,
        });
      } else if (targetHash !== info.target_hash) {
        driftedTargets.push({ rel, locale, recorded: info.target_hash, current: targetHash });
      }
    }
    evidence.targetSetSha256 = sha256(canonicalJson(targets));
  }

  if ((checkedSources === 0 || checkedTargets === 0) && driftedSources.length === 0) {
    driftedSources.push({ rel: ".i18n-state.json", reason: "empty-coverage" });
  }
  const staleTargets = findStaleTargets(sources);
  const absolute = {
    driftedSources,
    missingTargets,
    driftedTargets,
    staleTargets,
    inconsistentSectionCaches,
  };
  const mergeReady = DRIFT_BUCKETS.every((bucket) => absolute[bucket].length === 0);
  let ok = mergeReady;
  // PR-scoped gate: with the base checkout's report, only drift THIS tree introduces blocks;
  // drift the base already carried is inherited (printed, not fatal — the i18n wave owns it).
  let partition = null;
  let preparationPending = [];
  const invalidBaseline = () => {
    if (opts.json)
      process.stdout.write(JSON.stringify({ ok: false, reason: "invalid-base-report" }) + "\n");
    else console.error("[i18n-check] FAIL — a complete matching base report is required.");
    process.exit(1);
  };
  if (opts.preflight && !opts.baseReport) invalidBaseline();
  if (opts.baseReport) {
    let base;
    try {
      base = JSON.parse(await fs.readFile(path.resolve(opts.baseReport), "utf8"));
    } catch {
      invalidBaseline();
    }
    if (!validBaseReport(base, baselineEvidence.scope, opts.preflight)) invalidBaseline();
    partition = partitionAgainstBase(absolute, base);
    ok = partition.ok;
    if (opts.preflight) {
      preparationPending = pendingPreparation(partition, base.baselineEvidence, baselineEvidence);
      const missingScope = base.baselineEvidence.sources.some((row) => !selected.has(row.rel));
      ok = !missingScope && partition.freshCount === preparationPending.length;
    }
    if (!opts.json) {
      console.log(
        `[i18n-check] base-report: ${partition.inheritedCount} inherited drift item(s) (not blocking), ${partition.freshCount} new or unverified drift item(s)`
      );
      for (const b of DRIFT_BUCKETS) {
        for (const x of partition.fresh[b])
          console.log(`  ✗ NEW OR UNVERIFIED ${b}: ${x.rel}${x.locale ? ` [${x.locale}]` : ""}`);
      }
    }
  }

  if (opts.json) {
    process.stdout.write(
      JSON.stringify(
        {
          ok,
          checkedSources,
          checkedTargets,
          driftedSources,
          missingTargets,
          driftedTargets,
          staleTargets,
          inconsistentSectionCaches,
          ...(partition ? { fresh: partition.fresh, inherited: partition.inherited } : {}),
          ...(opts.preflight ? { preparationPending, mergeReady } : {}),
          ...(opts.baselineEvidence ? { baselineEvidence } : {}),
        },
        null,
        2
      ) + "\n"
    );
  } else {
    console.log(`[i18n-check] checked sources=${checkedSources}, targets=${checkedTargets}`);
    if (driftedSources.length) {
      console.log(`[i18n-check] drifted sources (${driftedSources.length}):`);
      for (const d of driftedSources) console.log(`  - ${d.rel} (${d.reason})`);
    }
    if (missingTargets.length) {
      console.log(`[i18n-check] missing targets (${missingTargets.length}):`);
      for (const m of missingTargets) console.log(`  - ${m.rel} [${m.locale}]`);
    }
    if (driftedTargets.length) {
      console.log(`[i18n-check] drifted targets (${driftedTargets.length}):`);
      for (const t of driftedTargets) console.log(`  - ${t.rel} [${t.locale}]`);
    }
    if (staleTargets.length) {
      const policy = opts.baseReport
        ? "unchanged inherited entries are advisory; new or unverified entries block"
        : "blocking for absolute admission";
      console.log(
        `[i18n-check] WARN stale or unverified targets (${staleTargets.length}) — ${policy}; refresh with npm run i18n:run:`
      );
      for (const t of staleTargets) {
        console.log(`  - ${t.rel} [${t.locale}] (${t.reason ?? "stale"})`);
      }
    }
    if (inconsistentSectionCaches.length) {
      const policy = opts.baseReport
        ? "unchanged inherited entries are advisory; new or unverified entries block"
        : "blocking for absolute admission";
      console.log(
        `[i18n-check] WARN inconsistent section caches (${inconsistentSectionCaches.length}) — ${policy}; review source provenance before rebuilding the cache:`
      );
      for (const item of inconsistentSectionCaches) {
        console.log(`  - ${item.rel} [${item.locale}] (${item.reason})`);
      }
    }
    if (ok) {
      const message = opts.preflight
        ? `preparation checks passed; ${preparationPending.length} English source(s) pending; mergeReady=${mergeReady}.`
        : partition
          ? "no new or unverified drift against the base."
          : "all sources, targets and translation provenance match.";
      console.log(`[i18n-check] PASS — ${message}`);
    } else if (opts.mode === "warn") {
      console.log("[i18n-check] WARN — drift detected (warn mode, exiting 0).");
    } else {
      console.log("[i18n-check] FAIL — drift detected. Run `npm run i18n:run` to refresh.");
    }
  }

  if (!ok && opts.mode !== "warn") process.exit(1);
}

const isDirectRun = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((err) => {
    console.error("[i18n-check] ERROR", err?.stack || err?.message || String(err));
    process.exit(1);
  });
}
